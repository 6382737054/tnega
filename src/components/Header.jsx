import React, { useState, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';

export default function AppHeader() {
  const [userInfo, setUserInfo] = useState({ email: '', role: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const role = localStorage.getItem('userRole') || '';
    
    setUserInfo({
      email: storedUserInfo.email || '',
      role: role
    });
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedTanks');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'ngo': return 'NGO User';
      case 'department': return 'Department User';
      case 'admin': return 'Admin User';
      default: return 'User';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-xl border-b border-slate-600 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full p-1 shadow-lg ring-2 ring-white/20">
              <img 
                src="images/tnlogo.png" 
                alt="Tamil Nadu Government Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-['Inter',sans-serif] tracking-tight">
                Tamil Nadu NOC Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Tank Renovation and Water Conservation
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-white font-['Inter',sans-serif] tracking-tight">
                TN NOC Portal
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Tank Renovation
              </p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {userInfo.role ? userInfo.role.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-semibold text-white">{getRoleDisplayName(userInfo.role)}</div>
                  <div className="text-xs text-slate-300 truncate max-w-32 lg:max-w-none">{userInfo.email}</div>
                </div>
                <div className="text-left sm:hidden">
                  <div className="text-xs font-semibold text-white">
                    {userInfo.role ? userInfo.role.toUpperCase() : 'USER'}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden backdrop-blur-sm">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-sm">
                            {userInfo.role ? userInfo.role.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">{getRoleDisplayName(userInfo.role)}</div>
                          <div className="text-xs text-gray-600 truncate">{userInfo.email}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200 group"
                    >
                      <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  );
}