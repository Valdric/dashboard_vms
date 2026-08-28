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
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ProfileModal = () => {
  const { 
    currentUser, 
    profiles, 
    createProfile, 
    updateProfile, 
    deleteProfile, 
    switchActiveProfile 
  } = useAuth();

  const { isProfileModalOpen, setIsProfileModalOpen, warehouses, showToast } = useData();

  const [activeSubTab, setActiveSubTab] = useState('edit'); // 'edit' | 'team' | 'create'

  // Edit current profile state
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: currentUser?.password || '',
    role: currentUser?.role || 'Logistics Manager',
    branch: currentUser?.branch || 'KCU JAKARTA PUSAT - 10000',
    phone: currentUser?.phone || '',
    department: currentUser?.department || 'Danantara x POS IND Sovereign Logistics',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || ''
  });

  // Create new profile state
  const [newUserData, setNewUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: 'password123',
    role: 'Warehouse Operator',
    branch: 'KCU MEDAN - 20000',
    phone: '',
    department: 'Regional Operations',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const [searchTeam, setSearchTeam] = useState('');

  if (!isProfileModalOpen) return null;

  // Handle Edit Profile Save (Update)
  const handleUpdateCurrentProfile = (e) => {
    e.preventDefault();
    updateProfile(currentUser.id, formData);
    showToast('Profil pengguna VMS berhasil diperbarui!', 'success');
  };

  // Handle Create New Profile (Create)
  const handleCreateNewUser = (e) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.email.trim()) {
      showToast('Mohon isi nama dan email pengguna baru!', 'warning');
      return;
    }
    const created = createProfile(newUserData);
    showToast(`Pengguna baru ${created.name} berhasil dibuat!`, 'success');
    setNewUserData({
      name: '',
      username: '',
      email: '',
      password: 'password123',
      role: 'Warehouse Operator',
      branch: 'KCU MEDAN - 20000',
      phone: '',
      department: 'Regional Operations',
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
    setActiveSubTab('team');
  };

  // Handle Delete User (Delete)
  const handleDeleteUser = (id, name) => {
    const res = deleteProfile(id);
    if (res.success) {
      showToast(`Pengguna ${name} berhasil dihapus.`, 'info');
    } else {
      showToast(res.message, 'warning');
    }
  };

  // Avatar Presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  ];

  const filteredTeam = profiles.filter(p => 
    p.name.toLowerCase().includes(searchTeam.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTeam.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTeam.toLowerCase()) ||
    p.branch.toLowerCase().includes(searchTeam.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up bg-white dark:bg-[#0d1527]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#091329]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#0e2b7a] to-[#ff5900] text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Manajemen Profil & Akses VMS</span>
                <span className="text-[10px] font-mono font-bold bg-orange-100 dark:bg-orange-950 text-[#ff5900] px-2 py-0.5 rounded-full">
                  Danantara x POS IND
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Kelola identitas akun aktif dan kontrol wewenang personel KCU
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center space-x-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527]">
          <button
            onClick={() => setActiveSubTab('edit')}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeSubTab === 'edit'
                ? 'border-[#ff5900] text-[#ff5900]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profil Aktif (Update)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('team')}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeSubTab === 'team'
                ? 'border-[#ff5900] text-[#ff5900]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Daftar Pengguna ({profiles.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('create')}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeSubTab === 'create'
                ? 'border-[#ff5900] text-[#ff5900]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Anggota (Create)</span>
          </button>
        </div>

        {/* Tab 1: Edit Current Profile (UPDATE) */}
        {activeSubTab === 'edit' && (
          <form onSubmit={handleUpdateCurrentProfile} className="p-6 space-y-6">
            
            {/* Top User Card Preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-orange-50/70 dark:from-[#091c52]/60 dark:via-[#0d1527] dark:to-orange-950/20 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group">
                <img
                  src={formData.avatar || currentUser?.avatar}
                  alt={formData.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#ff5900]/40 shadow-md"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {formData.name || 'Nama Pengguna'}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0e2b7a] text-white">
                    {formData.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formData.email}</p>
                <div className="text-xs text-[#0e2b7a] dark:text-sky-300 font-semibold">
                  📍 {formData.branch} • {formData.department}
                </div>
              </div>

              {/* Avatar Preset Selector */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {avatarPresets.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className={`w-8 h-8 rounded-lg object-cover cursor-pointer transition-all hover:scale-110 ${
                      formData.avatar === url ? 'ring-2 ring-[#ff5900] scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    alt="Preset"
                  />
                ))}
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Korporat
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Peran / Hak Akses
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="Super Admin">Super Admin (Danantara x POS)</option>
                  <option value="Logistics Manager">Logistics Manager (Kepala Gudang KCU)</option>
                  <option value="Warehouse Operator">Warehouse Operator (Staff Gudang)</option>
                  <option value="Field Dispatcher">Field Dispatcher (Kurir POS IND)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Penempatan Cabang KCU
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="Headquarters - All KCU">Headquarters - All KCU</option>
                  {warehouses.filter(w => w !== 'All').map(wh => (
                    <option key={wh} value={wh}>{wh}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0e2b7a] via-[#1639ac] to-[#ff5900] hover:from-[#091c52] hover:to-[#ea4e00] text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Team List & Switch User */}
        {activeSubTab === 'team' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Cari nama, email, atau KCU..."
                value={searchTeam}
                onChange={(e) => setSearchTeam(e.target.value)}
                className="w-full sm:w-72 px-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs text-slate-500 font-medium">
                Total {profiles.length} Pengguna Terdaftar
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredTeam.map((prof) => {
                const isCurrent = currentUser?.id === prof.id;

                return (
                  <div
                    key={prof.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-orange-50/80 dark:bg-orange-950/30 border-[#ff5900]/40 shadow-sm'
                        : 'bg-slate-50/50 dark:bg-[#070c18] border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-[#ff5900]/40"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              {prof.name}
                            </h5>
                            {isCurrent && (
                              <span className="text-[9px] bg-[#ff5900] text-white px-1.5 py-0.2 rounded font-bold">
                                Aktif
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{prof.username}</p>
                          <span className="inline-block text-[10px] font-semibold text-[#0e2b7a] dark:text-sky-300 mt-1">
                            {prof.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {!isCurrent && (
                          <button
                            onClick={() => {
                              switchActiveProfile(prof.id);
                              showToast(`Berganti ke akun: ${prof.name}`, 'info');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#0e2b7a] text-[#0e2b7a] dark:text-sky-200 text-[10px] font-bold transition-all"
                          >
                            Pilih
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteUser(prof.id, prof.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Hapus Akun"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span className="truncate max-w-[200px]">📍 {prof.branch}</span>
                      <span>{prof.phone || '-'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Create New Profile (CREATE) */}
        {activeSubTab === 'create' && (
          <form onSubmit={handleCreateNewUser} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Personel *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rian Pratama"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="rian.pratama"
                  value={newUserData.username}
                  onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Korporat *
                </label>
                <input
                  type="email"
                  placeholder="rian@vms.posindonesia.co.id"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Peran & Hak Akses
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Logistics Manager">Logistics Manager</option>
                  <option value="Warehouse Operator">Warehouse Operator</option>
                  <option value="Field Dispatcher">Field Dispatcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cabang KCU
                </label>
                <select
                  value={newUserData.branch}
                  onChange={(e) => setNewUserData({ ...newUserData, branch: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  {warehouses.filter(w => w !== 'All').map(wh => (
                    <option key={wh} value={wh}>{wh}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Pengguna Baru</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
