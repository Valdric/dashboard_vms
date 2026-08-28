import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PROFILES } from '../data/defaultProfiles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load profiles from localStorage or defaults
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('myrepublic_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing saved profiles', e);
      }
    }
    return DEFAULT_PROFILES;
  });

  // Current active user
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('myrepublic_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed parsing current user', e);
      }
    }
    return DEFAULT_PROFILES[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('myrepublic_auth') === 'true';
  });

  // Theme state: dark or light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('myrepublic_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('myrepublic_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('myrepublic_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('myrepublic_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('myrepublic_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('myrepublic_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Login handler
  const login = (identifier, password) => {
    // Find matching profile by email or username
    const found = profiles.find(
      p => p.email.toLowerCase() === identifier.toLowerCase() || 
           p.username.toLowerCase() === identifier.toLowerCase()
    );

    if (found) {
      // Validate password if profile has one set
      if (found.password && found.password !== password) {
        return { success: false, message: 'Password salah! Coba lagi.' };
      }
      setCurrentUser(found);
      setIsAuthenticated(true);
      return { success: true, user: found };
    } else {
      // Fallback: create temporary session if logging in with valid email
      if (identifier.includes('@')) {
        const newUser = {
          id: `usr-${Date.now()}`,
          name: identifier.split('@')[0],
          username: identifier.split('@')[0],
          email: identifier,
          role: 'Staff Operator',
          branch: 'KCU JAKARTA PUSAT - 10000',
          phone: '+62 812-0000-1111',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          department: 'General Logistics',
          status: 'Active',
          bio: 'Operator logistik terdaftar.',
          joinedDate: new Date().toISOString().split('T')[0]
        };
        setProfiles(prev => [newUser, ...prev]);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        return { success: true, user: newUser };
      }
      return { success: false, message: 'Akun tidak ditemukan. Periksa email atau username!' };
    }
  };

  // Quick 1-click Demo Login
  const quickLogin = (roleName) => {
    let target = profiles.find(p => p.role.toLowerCase().includes(roleName.toLowerCase()));
    if (!target) target = profiles[0];
    setCurrentUser(target);
    setIsAuthenticated(true);
    return { success: true, user: target };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // PROFILE CRUD OPERATIONS
  // 1. Create Profile
  const createProfile = (profileData) => {
    const newProfile = {
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      avatar: profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profileData.name || 'User')}`,
      ...profileData
    };
    setProfiles(prev => [newProfile, ...prev]);
    return newProfile;
  };

  // 2. Update Profile
  const updateProfile = (id, updatedData) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedData };
        if (currentUser && currentUser.id === id) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  // 3. Delete Profile
  const deleteProfile = (id) => {
    if (profiles.length <= 1) {
      return { success: false, message: 'Tidak dapat menghapus profile terakhir.' };
    }
    const filtered = profiles.filter(p => p.id !== id);
    setProfiles(filtered);
    if (currentUser && currentUser.id === id) {
      setCurrentUser(filtered[0]);
    }
    return { success: true };
  };

  // 4. Switch Active Profile
  const switchActiveProfile = (id) => {
    const target = profiles.find(p => p.id === id);
    if (target) {
      setCurrentUser(target);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      profiles,
      isAuthenticated,
      theme,
      login,
      quickLogin,
      logout,
      toggleTheme,
      createProfile,
      updateProfile,
      deleteProfile,
      switchActiveProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
