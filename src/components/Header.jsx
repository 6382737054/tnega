import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';

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
    <header className="bg-gradient-to-r from-[#036FAA] to-[#025580] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full p-1">
              <img 
                src="images/tnlogo.png" 
                alt="Tamil Nadu Government Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-['Poppins']">
                Tamil Nadu NOC Portal
              </h1>
              <p className="text-sm text-blue-100 font-medium">
                Tank Renovation and Water Conservation
              </p>
            </div>
          </div>

          {/* Right Side - Notification and User */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-white hover:bg-white/10 rounded-lg transition duration-200">
              <Bell className="w-6 h-6" />
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#036FAA] font-semibold text-sm">
                    {userInfo.role ? userInfo.role.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{getRoleDisplayName(userInfo.role)}</div>
                  <div className="text-xs text-blue-100">{userInfo.email}</div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{getRoleDisplayName(userInfo.role)}</div>
                      <div className="text-xs text-gray-500">{userInfo.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
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