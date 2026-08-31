import React, { useState } from 'react';
import { 
  X, 
  User, 
  Users, 
  Plus, 
  Trash2, 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Edit2,
  CheckCircle2,
  Lock,
  Table,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ProfileModal = () => {
  const { 
    currentUser, 
    profiles, 
    updateProfile, 
    createProfile, 
    deleteProfile, 
    switchActiveProfile 
  } = useAuth();
  
  const { isProfileModalOpen, setIsProfileModalOpen, showToast } = useData();

  const [activeTab, setActiveTab] = useState('current'); // 'current' | 'team' | 'raci' | 'new'
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  const [newUserData, setNewUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: 'password123',
    role: 'PIC Warehouse Pos Indonesia',
    branch: 'KCU JAKARTA PUSAT - 10000',
    phone: '+62 812-0000-0000',
    department: 'KCU Warehouse Operations',
    bio: 'Petugas operasional WMS.'
  });

  if (!isProfileModalOpen) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(currentUser.id, formData);
    setEditing(false);
    showToast('Profil pengguna berhasil diperbarui!', 'success');
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) {
      showToast('Nama dan email wajib diisi!', 'warning');
      return;
    }
    const created = createProfile(newUserData);
    switchActiveProfile(created.id);
    setActiveTab('current');
    showToast(`Pengguna baru ${newUserData.name} (${newUserData.role}) berhasil ditambahkan!`, 'success');
  };

  const raciData = [
    { no: 1, activity: 'Penetapan kebutuhan bisnis WMS', mora: 'C', slp: 'C', pic: 'C', spv: 'C', ds: 'R', admin: 'I', biz: 'A' },
    { no: 2, activity: 'Pembuatan DO/WO Inbound', mora: 'A/R', slp: 'I', pic: 'I', spv: 'I', ds: 'I', admin: 'I', biz: 'C' },
    { no: 3, activity: 'Pickup barang dari Warehouse Mora', mora: 'C', slp: 'A/R', pic: 'I', spv: 'C', ds: 'I', admin: 'I', biz: 'I' },
    { no: 4, activity: 'Pengiriman Middle Mile ke Gudang Tujuan', mora: 'I', slp: 'R', pic: 'I', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 5, activity: 'Receiving dan validasi barang inbound', mora: 'I', slp: 'C', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 6, activity: 'Upload BAST / Surat Jalan / Evidence', mora: 'I', slp: 'C', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 7, activity: 'Put Away dan penentuan lokasi rak', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 8, activity: 'Update dan monitoring inventory', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'C', admin: 'C', biz: 'I' },
    { no: 9, activity: 'Stock Opname', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'C', biz: 'I' },
    { no: 10, activity: 'Stock Adjustment (Approval)', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'C', admin: 'C', biz: 'I' },
    { no: 11, activity: 'Pembuatan DO/WO Outbound', mora: 'A/R', slp: 'I', pic: 'I', spv: 'I', ds: 'I', admin: 'I', biz: 'C' },
    { no: 12, activity: 'Picking barang di rak', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 13, activity: 'Validasi Serial Number / Barcode', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'C', admin: 'I', biz: 'I' },
    { no: 14, activity: 'Packing barang & QC', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 15, activity: 'Outbound Processing & Handover', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 16, activity: 'Last Mile Delivery (PosAja)', mora: 'I', slp: 'C', pic: 'C', spv: 'A/R', ds: 'I', admin: 'I', biz: 'I' },
    { no: 17, activity: 'Update status pengiriman real-time', mora: 'I', slp: 'I', pic: 'C', spv: 'A/R', ds: 'C', admin: 'I', biz: 'I' },
    { no: 18, activity: 'Receiving barang retur', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'I', biz: 'I' },
    { no: 19, activity: 'Update inventory barang retur / triage', mora: 'I', slp: 'I', pic: 'R', spv: 'A', ds: 'I', admin: 'C', biz: 'I' },
    { no: 20, activity: 'Penanganan exception operasional', mora: 'C', slp: 'C', pic: 'R', spv: 'A', ds: 'C', admin: 'I', biz: 'I' },
    { no: 21, activity: 'Monitoring SLA & performa fulfillment', mora: 'I', slp: 'I', pic: 'C', spv: 'R', ds: 'C', admin: 'I', biz: 'A' },
    { no: 22, activity: 'Dashboard Telemetri & Reporting', mora: 'I', slp: 'I', pic: 'C', spv: 'C', ds: 'R', admin: 'C', biz: 'A' },
    { no: 23, activity: 'Integrasi WMS dengan sistem Mora', mora: 'C', slp: 'I', pic: 'I', spv: 'C', ds: 'A/R', admin: 'C', biz: 'C' },
    { no: 24, activity: 'Integrasi WMS dengan sistem PosAja', mora: 'I', slp: 'I', pic: 'C', spv: 'C', ds: 'A/R', admin: 'C', biz: 'C' },
    { no: 25, activity: 'Pengelolaan user & hak akses (RBAC)', mora: 'I', slp: 'I', pic: 'I', spv: 'C', ds: 'C', admin: 'A/R', biz: 'I' },
    { no: 26, activity: 'Audit Trail & Activity Log', mora: 'I', slp: 'I', pic: 'I', spv: 'C', ds: 'A', admin: 'R', biz: 'I' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#091c52] via-[#0e2b7a] to-[#123896] text-white">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-[#ff5900]" />
            <div>
              <h3 className="font-bold text-base tracking-tight">
                Manajemen Pengguna & Matriks RACI (SKB 5.4)
              </h3>
              <p className="text-[11px] text-sky-200">
                Hak Akses Berbasis Peran (RBAC) • Mora Republic ✕ Pos Indonesia
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'current'
                ? 'bg-[#ff5900] text-white shadow-md shadow-orange-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil Aktif</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'team'
                ? 'bg-[#0e2b7a] text-white shadow-md shadow-blue-900/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Daftar 7 Peran Resmi SKB ({profiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('raci')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'raci'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Matriks RACI (SKB 5.4)</span>
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Akun</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: CURRENT ACTIVE PROFILE */}
          {activeTab === 'current' && (
            <div className="space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#ff5900]/30 shadow-md"
                />
                <div className="text-center sm:text-left space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      {currentUser.name}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5900] text-white">
                      {currentUser.role}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {currentUser.department}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Cabang: <span className="font-semibold text-slate-700 dark:text-slate-200">{currentUser.branch}</span>
                  </p>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Email Resmi</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">No. Kontak / Telepon</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Penugasan / Cabang</label>
                    <input
                      type="text"
                      value={formData.branch || ''}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Deskripsi Tugas</label>
                  <textarea
                    rows="2"
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white font-bold shadow-md shadow-orange-500/25"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: 7 OFFICIAL SKB ROLES SWITCHER */}
          {activeTab === 'team' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih peran untuk mensimulasikan hak akses & tampilan dashboard secara real-time:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profiles.map((p) => {
                  const isActive = currentUser.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        switchActiveProfile(p.id);
                        showToast(`Beralih ke profil ${p.name} (${p.role})`, 'info');
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-orange-50 dark:bg-[#4a1c06]/30 border-[#ff5900] shadow-md'
                          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-[#ff5900]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <p className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</p>
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5900]" />}
                          </div>
                          <span className="text-[10px] font-bold text-[#ff5900] block">{p.role}</span>
                          <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{p.branch}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#ff5900] text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isActive ? 'Aktif' : 'Pilih'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: RACI MATRIX (SKB BAB 5.4) */}
          {activeTab === 'raci' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 text-xs text-purple-900 dark:text-purple-200">
                <span className="font-bold">Keterangan RACI SKB Bab 5.4: </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">R</span> = Responsible (Pelaksana), 
                <span className="font-bold text-blue-600 dark:text-blue-400 ml-1">A</span> = Accountable (Penanggung Jawab), 
                <span className="font-bold text-amber-600 dark:text-amber-400 ml-1">C</span> = Consulted (Dikonsultasikan), 
                <span className="font-bold text-slate-600 dark:text-slate-400 ml-1">I</span> = Informed (Menerima Info).
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#091c52] text-white font-bold text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-10">No</th>
                      <th className="py-2.5 px-3 min-w-[200px]">Aktivitas / Fungsi Utama</th>
                      <th className="py-2.5 px-2 text-center text-[#ff5900]">Mora</th>
                      <th className="py-2.5 px-2 text-center text-sky-300">SLP</th>
                      <th className="py-2.5 px-2 text-center">PIC WH</th>
                      <th className="py-2.5 px-2 text-center">SPV</th>
                      <th className="py-2.5 px-2 text-center">DS</th>
                      <th className="py-2.5 px-2 text-center">Admin</th>
                      <th className="py-2.5 px-2 text-center">Bisnis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                    {raciData.map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="py-2 px-3 text-center font-bold text-slate-400">{row.no}</td>
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">{row.activity}</td>
                        <td className="py-2 px-2 text-center font-bold text-[#ff5900]">{row.mora}</td>
                        <td className="py-2 px-2 text-center font-bold text-sky-500">{row.slp}</td>
                        <td className="py-2 px-2 text-center font-bold">{row.pic}</td>
                        <td className="py-2 px-2 text-center font-bold">{row.spv}</td>
                        <td className="py-2 px-2 text-center font-bold">{row.ds}</td>
                        <td className="py-2 px-2 text-center font-bold">{row.admin}</td>
                        <td className="py-2 px-2 text-center font-bold">{row.biz}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ADD NEW USER */}
          {activeTab === 'new' && (
            <form onSubmit={handleCreateNew} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian Pratama"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Peran Akun (Role)</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Mora Republic Partner">Mora Republic Partner (Client Facing)</option>
                    <option value="SLP KC Tangerang Selatan">SLP KC Tangerang Selatan</option>
                    <option value="PIC Warehouse Pos Indonesia">PIC Warehouse Pos Indonesia</option>
                    <option value="Supervisor Operasional">Supervisor Operasional</option>
                    <option value="Administrator WMS">Administrator WMS</option>
                    <option value="Bisnis / Account Management">Bisnis / Account Management</option>
                    <option value="Digital Services (DS)">Digital Services (DS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@posindonesia.co.id"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">Penugasan Cabang / Unit</label>
                  <input
                    type="text"
                    value={newUserData.branch}
                    onChange={(e) => setNewUserData({ ...newUserData, branch: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Daftarkan Akun Baru</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
