import React, { useState } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  FileText, 
  Users, 
  Building, 
  Phone, 
  Mail,
  Download,
  HelpCircle,
  Globe,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';

const NavBar = ({ userType, userEmail, onLogout, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#', icon: Shield },
    { name: 'NGO Registration', href: '#', icon: Users },
    { name: 'Application Status', href: '#', icon: FileText },
    { name: 'Downloads', href: '#', icon: Download },
    { name: 'Help & Support', href: '#', icon: HelpCircle },
    { name: 'Contact', href: '#', icon: Phone }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  // Show different navigation based on login status and user type
  const isLoggedIn = userType && userEmail;
  
  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 h-1"></div>
      
      {/* Government Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Government of Tamil Nadu</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Helpline: 1800-425-0000</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => {
                          setIsLanguageDropdownOpen(false);
                          // Language change logic here
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-3 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tamil Nadu NOC Portal</h1>
                  <p className="text-sm text-gray-600">Tank Renovation & Water Conservation</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {!isLoggedIn && navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-sky-600 font-medium transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </a>
              ))}
              
              {/* Search Bar for public pages */}
              {!isLoggedIn && (
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent w-64"
                  />
                </div>
              )}
            </div>

            {/* User Profile Section (for logged in users) */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center gap-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-sky-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 capitalize">{userType} User</p>
                      <p className="text-xs text-gray-600 truncate max-w-32">{userEmail}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                        <p className="text-xs text-gray-600 capitalize">{userType} Dashboard</p>
                      </div>
                      <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Profile Settings
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Change Password
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Help & Support
                        </a>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile User Profile (if logged in) */}
              {isLoggedIn && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-600 to-sky-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{userType} User</p>
                    <p className="text-sm text-gray-600">{userEmail}</p>
                  </div>
                </div>
              )}
              
              {/* Mobile Navigation Items */}
              {!isLoggedIn && navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Search */}
              {!isLoggedIn && (
                <div className="relative px-4">
                  <Search className="w-4 h-4 text-gray-400 absolute left-7 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {/* Mobile Logout (if logged in) */}
              {isLoggedIn && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                  >
                    <Shield className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb for logged in users */}
      {isLoggedIn && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Tamil Nadu NOC Portal</span>
              <span>/</span>
              <span className="capitalize text-sky-600 font-medium">
                {userType} Dashboard
              </span>
              {currentView === 'tank-selection' && (
                <>
                  <span>/</span>
                  <span className="text-sky-600 font-medium">Tank Selection</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;