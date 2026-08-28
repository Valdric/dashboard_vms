import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  WAREHOUSES, 
  PRODUCTS_LIST, 
  INITIAL_SERIAL_NUMBERS,
  INITIAL_WORK_ORDERS,
  INITIAL_PUTAWAY,
  INITIAL_STOCK_ON_HAND,
  INITIAL_OUTBOUND,
  INITIAL_SUMMARY
} from '../data/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Filters
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [dateRange, setDateRange] = useState({
    start: '2026-08-28',
    end: '2026-08-28'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Stock On Hand'); // default to Stock On Hand or Work Order

  // Data Collections (saved to localStorage with vms_ prefix)
  const [workOrderData, setWorkOrderData] = useState(() => {
    const saved = localStorage.getItem('vms_work_orders');
    return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
  });

  const [putawayData, setPutawayData] = useState(() => {
    const saved = localStorage.getItem('vms_putaway');
    return saved ? JSON.parse(saved) : INITIAL_PUTAWAY;
  });

  const [stockOnHandData, setStockOnHandData] = useState(() => {
    const saved = localStorage.getItem('vms_stock');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_ON_HAND;
  });

  const [outboundData, setOutboundData] = useState(() => {
    const saved = localStorage.getItem('vms_outbound');
    return saved ? JSON.parse(saved) : INITIAL_OUTBOUND;
  });

  const [summaryData, setSummaryData] = useState(() => {
    const saved = localStorage.getItem('vms_summary');
    return saved ? JSON.parse(saved) : INITIAL_SUMMARY;
  });

  const [serialNumbers, setSerialNumbers] = useState(() => {
    const saved = localStorage.getItem('vms_serials');
    return saved ? JSON.parse(saved) : INITIAL_SERIAL_NUMBERS;
  });

  // Modal States
  const [isSNModalOpen, setIsSNModalOpen] = useState(false);
  const [selectedStockForSN, setSelectedStockForSN] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vms_work_orders', JSON.stringify(workOrderData));
    localStorage.setItem('vms_putaway', JSON.stringify(putawayData));
    localStorage.setItem('vms_stock', JSON.stringify(stockOnHandData));
    localStorage.setItem('vms_outbound', JSON.stringify(outboundData));
    localStorage.setItem('vms_summary', JSON.stringify(summaryData));
    localStorage.setItem('vms_serials', JSON.stringify(serialNumbers));
  }, [workOrderData, putawayData, stockOnHandData, outboundData, summaryData, serialNumbers]);

  // Open SN Modal
  const openSNModal = (stockItem) => {
    setSelectedStockForSN(stockItem);
    setIsSNModalOpen(true);
  };

  const closeSNModal = () => {
    setIsSNModalOpen(false);
    setSelectedStockForSN(null);
  };

  // Add / Remove / Edit Serial Numbers for an SKU
  const addSerialNumber = (sku, serialObj) => {
    setSerialNumbers(prev => {
      const existing = prev[sku] || [];
      const newEntry = {
        id: Date.now(),
        receivedDate: new Date().toISOString().split('T')[0],
        ...serialObj
      };
      return {
        ...prev,
        [sku]: [newEntry, ...existing]
      };
    });
    // Also increment stock total & ready
    setStockOnHandData(prev => prev.map(item => {
      if (item.sku === sku && (selectedWarehouse === 'All' || item.warehouse === selectedWarehouse)) {
        return {
          ...item,
          ready: item.ready + 1,
          total: item.total + 1
        };
      }
      return item;
    }));
    showToast(`Serial Number ${serialObj.serial} berhasil diterbitkan untuk SKU ${sku}!`, 'success');
  };

  // Batch generate Serial Numbers from a Work Order
  const generateSerialsForWO = (woId, qtyToGenerate = 5) => {
    const wo = workOrderData.find(w => w.id === woId);
    if (!wo) return;

    const count = Math.min(qtyToGenerate, wo.totalQty);
    const newSerials = [];
    const now = new Date().toISOString().split('T')[0];

    for (let i = 0; i < count; i++) {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      newSerials.push({
        id: Date.now() + i,
        serial: `32466${randomSuffix}`,
        status: 'Ready',
        location: `Rack WO-${wo.id}`,
        receivedDate: now,
        woNumber: wo.woNumber
      });
    }

    setSerialNumbers(prev => ({
      ...prev,
      [wo.sku]: [...newSerials, ...(prev[wo.sku] || [])]
    }));

    setWorkOrderData(prev => prev.map(w => {
      if (w.id === woId) {
        return {
          ...w,
          generatedSerialsCount: (w.generatedSerialsCount || 0) + count,
          status: 'Complete'
        };
      }
      return w;
    }));

    // Update Stock on Hand as well
    setStockOnHandData(prev => {
      const exists = prev.find(s => s.sku === wo.sku && s.warehouse === wo.warehouse);
      if (exists) {
        return prev.map(s => s.sku === wo.sku && s.warehouse === wo.warehouse
          ? { ...s, ready: s.ready + count, total: s.total + count }
          : s
        );
      } else {
        return [{
          id: Date.now(),
          sku: wo.sku,
          product: wo.product,
          category: wo.category || 'Modem / Device',
          uom: 'PCS',
          warehouse: wo.warehouse,
          ready: count,
          booked: 0,
          damage: 0,
          total: count
        }, ...prev];
      }
    });

    showToast(`Berhasil menerbitkan ${count} Serial Number dari Work Order ${wo.woNumber}!`, 'success');
  };

  const updateSerialNumber = (sku, serialId, updatedObj) => {
    setSerialNumbers(prev => {
      const existing = prev[sku] || [];
      return {
        ...prev,
        [sku]: existing.map(item => item.id === serialId ? { ...item, ...updatedObj } : item)
      };
    });
    showToast('Status Serial Number berhasil diperbarui', 'info');
  };

  const deleteSerialNumber = (sku, serialId) => {
    setSerialNumbers(prev => {
      const existing = prev[sku] || [];
      return {
        ...prev,
        [sku]: existing.filter(item => item.id !== serialId)
      };
    });
    showToast('Serial Number berhasil dihapus', 'warning');
  };

  // Add Transaction (Work Order / Outbound / Putaway / Stock)
  const addTransaction = (type, payload) => {
    if (type === 'Work Order') {
      const newWO = {
        id: Date.now(),
        date: payload.date || new Date().toISOString().split('T')[0],
        woNumber: payload.woNumber || `WO/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`,
        warehouse: payload.warehouse,
        product: payload.product,
        sku: payload.sku || '100002650',
        category: payload.category || 'Modem / CPE Router',
        totalQty: Number(payload.totalQty) || 1,
        generatedSerialsCount: Number(payload.generatedSerialsCount) || Number(payload.totalQty) || 1,
        status: payload.status || 'Complete',
        notes: payload.notes || 'Penerbitan Work Order SKU baru'
      };

      setWorkOrderData(prev => [newWO, ...prev]);

      // Auto generate serial numbers for this SKU if requested
      if (payload.autoGenerateSN) {
        const count = Number(payload.totalQty) || 1;
        const newSerials = [];
        const now = new Date().toISOString().split('T')[0];
        for (let i = 0; i < count; i++) {
          newSerials.push({
            id: Date.now() + i,
            serial: `32466${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'Ready',
            location: 'Rack Primary',
            receivedDate: now,
            woNumber: newWO.woNumber
          });
        }
        setSerialNumbers(prev => ({
          ...prev,
          [newWO.sku]: [...newSerials, ...(prev[newWO.sku] || [])]
        }));
      }

      // Also ensure stock item exists
      setStockOnHandData(prev => {
        const exists = prev.find(s => s.sku === newWO.sku && s.warehouse === newWO.warehouse);
        if (exists) {
          return prev.map(s => s.sku === newWO.sku && s.warehouse === newWO.warehouse
            ? { ...s, ready: s.ready + newWO.totalQty, total: s.total + newWO.totalQty }
            : s
          );
        } else {
          return [{
            id: Date.now(),
            sku: newWO.sku,
            product: newWO.product,
            category: newWO.category,
            uom: payload.uom || 'PCS',
            warehouse: newWO.warehouse,
            ready: newWO.totalQty,
            booked: 0,
            damage: 0,
            total: newWO.totalQty
          }, ...prev];
        }
      });

      showToast(`Work Order ${newWO.woNumber} berhasil diterbitkan dengan SKU ${newWO.sku}!`, 'success');
    } else if (type === 'Outbound') {
      const newOutbound = {
        id: Date.now(),
        date: payload.date || new Date().toISOString().split('T')[0],
        poNumber: payload.poNumber || `POT${Date.now().toString().slice(-6)}/AIR${Date.now().toString().slice(-6)}`,
        warehouse: payload.warehouse,
        consignee: payload.consignee || 'Pelanggan POS IND',
        product: payload.product,
        sku: payload.sku || '100002650',
        totalQty: Number(payload.totalQty) || 1,
        serialNumber: payload.serialNumber || '-',
        status: payload.status || 'Request'
      };
      setOutboundData(prev => [newOutbound, ...prev]);
      showToast(`Outbound Order ${newOutbound.poNumber} berhasil dibuat!`, 'success');
    } else if (type === 'Stock') {
      const newStock = {
        id: Date.now(),
        sku: payload.sku,
        product: payload.product,
        category: payload.category || 'Barang / Device',
        uom: payload.uom || 'PCS',
        warehouse: payload.warehouse,
        ready: Number(payload.ready) || 0,
        booked: Number(payload.booked) || 0,
        damage: Number(payload.damage) || 0,
        total: (Number(payload.ready) || 0) + (Number(payload.booked) || 0) + (Number(payload.damage) || 0)
      };
      setStockOnHandData(prev => [newStock, ...prev]);
      showToast(`SKU ${newStock.sku} (${newStock.product}) ditambahkan ke Stock On Hand!`, 'success');
    }
  };

  // Delete transaction
  const deleteTransaction = (type, id) => {
    if (type === 'Work Order') {
      setWorkOrderData(prev => prev.filter(i => i.id !== id));
      showToast('Work Order dihapus', 'info');
    } else if (type === 'Outbound') {
      setOutboundData(prev => prev.filter(i => i.id !== id));
      showToast('Data Outbound dihapus', 'info');
    } else if (type === 'Putaway') {
      setPutawayData(prev => prev.filter(i => i.id !== id));
      showToast('Data Putaway dihapus', 'info');
    } else if (type === 'Stock') {
      setStockOnHandData(prev => prev.filter(i => i.id !== id));
      showToast('Data Stock dihapus', 'info');
    }
  };

  // Reset to default data
  const resetToDemoData = () => {
    setWorkOrderData(INITIAL_WORK_ORDERS);
    setPutawayData(INITIAL_PUTAWAY);
    setStockOnHandData(INITIAL_STOCK_ON_HAND);
    setOutboundData(INITIAL_OUTBOUND);
    setSummaryData(INITIAL_SUMMARY);
    setSerialNumbers(INITIAL_SERIAL_NUMBERS);
    showToast('Data VMS berhasil di-reset ke data bawaan Danantara x POS IND!', 'info');
  };

  // Filtered Collections based on selectedWarehouse & search
  const filteredStockOnHand = useMemo(() => {
    return stockOnHandData.filter(item => {
      const matchWarehouse = selectedWarehouse === 'All' || item.warehouse.toLowerCase().includes(selectedWarehouse.toLowerCase());
      const matchSearch = searchQuery === '' || 
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWarehouse && matchSearch;
    });
  }, [stockOnHandData, selectedWarehouse, searchQuery]);

  const filteredWorkOrders = useMemo(() => {
    return workOrderData.filter(item => {
      const matchWarehouse = selectedWarehouse === 'All' || item.warehouse.toLowerCase().includes(selectedWarehouse.toLowerCase());
      const matchSearch = searchQuery === '' || 
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.woNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWarehouse && matchSearch;
    });
  }, [workOrderData, selectedWarehouse, searchQuery]);

  const filteredOutbound = useMemo(() => {
    return outboundData.filter(item => {
      const matchWarehouse = selectedWarehouse === 'All' || item.warehouse.toLowerCase().includes(selectedWarehouse.toLowerCase());
      const matchSearch = searchQuery === '' || 
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.consignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchWarehouse && matchSearch;
    });
  }, [outboundData, selectedWarehouse, searchQuery]);

  const filteredPutaway = useMemo(() => {
    return putawayData.filter(item => {
      const matchWarehouse = selectedWarehouse === 'All' || item.warehouse.toLowerCase().includes(selectedWarehouse.toLowerCase());
      const matchSearch = searchQuery === '' || 
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWarehouse && matchSearch;
    });
  }, [putawayData, selectedWarehouse, searchQuery]);

  const filteredSummary = useMemo(() => {
    return summaryData.filter(item => {
      const matchWarehouse = selectedWarehouse === 'All' || item.warehouse.toLowerCase().includes(selectedWarehouse.toLowerCase());
      const matchSearch = searchQuery === '' || 
        item.warehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.includes(searchQuery);
      return matchWarehouse && matchSearch;
    });
  }, [summaryData, selectedWarehouse, searchQuery]);

  // COMPUTED KPI METRICS (11 cards)
  const metrics = useMemo(() => {
    const stockTotal = filteredStockOnHand.reduce((acc, curr) => acc + curr.total, 0);
    const stockReady = filteredStockOnHand.reduce((acc, curr) => acc + curr.ready, 0);
    const stockDamage = filteredStockOnHand.reduce((acc, curr) => acc + curr.damage, 0);
    const stockBooked = filteredStockOnHand.reduce((acc, curr) => acc + curr.booked, 0);

    const woReq = filteredWorkOrders.filter(i => i.status === 'Request').length;
    const woReal = filteredWorkOrders.filter(i => i.status === 'Complete').length;
    const woPartial = filteredWorkOrders.filter(i => i.status === 'Partial').length;

    const outboundReq = filteredOutbound.filter(o => o.status === 'Request').length;
    const outboundReal = filteredOutbound.filter(o => o.status === 'Realization').length;
    const outboundDelivery = filteredOutbound.filter(o => o.status === 'Delivery').length;
    const outboundDelivered = filteredOutbound.filter(o => o.status === 'Delivered').length;

    return {
      workOrderRequest: selectedWarehouse === 'All' ? 0 : woReq,
      workOrderRealization: selectedWarehouse === 'All' ? 0 : woReal,
      stockItem: selectedWarehouse === 'All' ? 4577 : stockTotal,
      outboundRequest: selectedWarehouse === 'All' ? 2 : outboundReq,
      outboundRealization: selectedWarehouse === 'All' ? 5 : outboundReal,
      delivery: selectedWarehouse === 'All' ? 2 : outboundDelivery,
      onProcess: selectedWarehouse === 'All' ? 2 : (outboundReal + woPartial),
      irregularity: 0,
      retur: 0,
      canceled: 0,
      delivered: selectedWarehouse === 'All' ? 0 : outboundDelivered,

      // Gauge stats
      workOrderStats: {
        request: selectedWarehouse === 'All' ? 0 : woReq,
        partial: selectedWarehouse === 'All' ? 0 : woPartial,
        complete: selectedWarehouse === 'All' ? 0 : woReal,
      },
      stockStats: {
        ready: selectedWarehouse === 'All' ? 4577 : stockReady,
        damage: selectedWarehouse === 'All' ? 0 : stockDamage,
        booked: selectedWarehouse === 'All' ? 20 : stockBooked
      },
      outboundStats: {
        request: selectedWarehouse === 'All' ? 2 : outboundReq,
        realization: selectedWarehouse === 'All' ? 5 : outboundReal,
        delivery: selectedWarehouse === 'All' ? 2 : outboundDelivery,
        delivered: selectedWarehouse === 'All' ? 0 : outboundDelivered
      }
    };
  }, [filteredStockOnHand, filteredWorkOrders, filteredOutbound, selectedWarehouse]);

  // Export to CSV generator
  const exportToCSV = (tableName) => {
    let rows = [];
    let filename = `VMS_Danantara_POS_${tableName}_${new Date().toISOString().slice(0,10)}.csv`;

    if (tableName === 'Stock On Hand') {
      rows.push(['No', 'SKU', 'Product', 'Category', 'UoM', 'Warehouse', 'Ready', 'Booked', 'Damage', 'Total']);
      filteredStockOnHand.forEach((item, index) => {
        rows.push([index + 1, item.sku, `"${item.product}"`, `"${item.category || '-'}"`, item.uom, `"${item.warehouse}"`, item.ready, item.booked, item.damage, item.total]);
      });
    } else if (tableName === 'Outbound') {
      rows.push(['No', 'Date', 'ID/PO Number', 'Warehouse', 'Consignee', 'Product', 'Total Qty', 'Serial Number', 'Status']);
      filteredOutbound.forEach((item, index) => {
        rows.push([index + 1, item.date, `"${item.poNumber}"`, `"${item.warehouse}"`, `"${item.consignee}"`, `"${item.product}"`, item.totalQty, `"${item.serialNumber}"`, item.status]);
      });
    } else if (tableName === 'Work Order') {
      rows.push(['No', 'Date', 'WO Number', 'Warehouse', 'SKU', 'Product', 'Category', 'Total Qty', 'Issued SN Count', 'Status']);
      filteredWorkOrders.forEach((item, index) => {
        rows.push([index + 1, item.date, `"${item.woNumber}"`, `"${item.warehouse}"`, item.sku, `"${item.product}"`, `"${item.category}"`, item.totalQty, item.generatedSerialsCount || 0, item.status]);
      });
    } else if (tableName === 'Putaway') {
      rows.push(['No', 'Date', 'WO Number', 'Warehouse', 'Product', 'Total Qty', 'Putaway Qty', 'Status']);
      filteredPutaway.forEach((item, index) => {
        rows.push([index + 1, item.date, `"${item.poNumber}"`, `"${item.warehouse}"`, `"${item.product}"`, item.totalQty, item.putawayQty, item.status]);
      });
    } else {
      rows.push(['No', 'Code', 'Warehouse', 'WO Complete', 'Stock Ready', 'Stock Booked', 'Stock Damaged', 'Stock Total', 'Outbound Request', 'Outbound Realization']);
      filteredSummary.forEach((item, index) => {
        rows.push([index + 1, item.code, `"${item.warehouse}"`, item.woComplete || item.inboundComplete, item.stockReady, item.stockBooked, item.stockDamaged, item.stockTotal, item.outboundRequest, item.outboundRealization]);
      });
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`File ${filename} berhasil diunduh!`, 'success');
  };

  return (
    <DataContext.Provider value={{
      warehouses: WAREHOUSES,
      products: PRODUCTS_LIST,
      selectedWarehouse,
      setSelectedWarehouse,
      dateRange,
      setDateRange,
      searchQuery,
      setSearchQuery,
      activeTab,
      setActiveTab,
      metrics,
      // Data collections
      workOrderData: filteredWorkOrders,
      putawayData: filteredPutaway,
      stockOnHandData: filteredStockOnHand,
      outboundData: filteredOutbound,
      summaryData: filteredSummary,
      serialNumbers,
      // SN Modal & Actions
      isSNModalOpen,
      selectedStockForSN,
      openSNModal,
      closeSNModal,
      addSerialNumber,
      generateSerialsForWO,
      updateSerialNumber,
      deleteSerialNumber,
      // Profile Modal
      isProfileModalOpen,
      setIsProfileModalOpen,
      // Transaction Modal
      isAddTxModalOpen,
      setIsAddTxModalOpen,
      addTransaction,
      deleteTransaction,
      resetToDemoData,
      // Export & Toast
      exportToCSV,
      toast,
      showToast
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
