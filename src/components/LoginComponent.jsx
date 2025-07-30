import React, { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';

const LoginComponent = ({ onLogin, onGoToRegistration }) => {
  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    password: '',
    captcha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const newErrors = {};
    if (!formData.userType) newErrors.userType = 'User type is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.captcha) newErrors.captcha = 'Captcha is required';

    if (Object.keys(newErrors).length === 0) {
      // Use the selected user type from dropdown
      onLogin(formData.userType, formData.email);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-white" />
          <h1 className="text-2xl font-bold text-white mb-2">Tamil Nadu Government</h1>
          <p className="text-sky-100 text-sm">NOC Application System</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
          
          <div className="space-y-6">
            {/* User Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type *
              </label>
              <select
                value={formData.userType}
                onChange={(e) => setFormData({...formData, userType: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all ${
                  errors.userType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select User Type</option>
                <option value="ngo">NGO User</option>
                <option value="admin">Admin User</option>
                <option value="departmental">Departmental User</option>
              </select>
              {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Official Email ID
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your official email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Captcha Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Captcha
              </label>
              <div className="flex gap-3">
                <div className="bg-gray-100 px-4 py-3 rounded-lg border flex-1 text-center font-mono text-lg tracking-widest">
                  7X9K2
                </div>
                <input
                  type="text"
                  value={formData.captcha}
                  onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                  className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all w-24 ${
                    errors.captcha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter"
                />
              </div>
              {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-sky-800 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sky-600 hover:text-sky-800 text-sm font-medium transition-colors"
              >
                Forgot/Update Password?
              </button>
            </div>
          </div>

          {/* Registration Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm mb-3">New NGO? Register here</p>
            <button 
              onClick={onGoToRegistration}
              className="text-sky-600 hover:text-sky-800 font-medium transition-colors"
            >
              NGO Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;