import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  // Static users with roles
  const staticUsers = {
    'ngo@gmail.com': { password: '123456', role: 'ngo' },
    'department@gmail.com': { password: '123456', role: 'department' },
    'admin@gmail.com': { password: '123456', role: 'admin' }
  };

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptcha('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!email || !password || !captcha) {
      alert('Please fill all fields');
      return;
    }
    
    // Verify captcha
    if (captcha !== captchaText) {
      alert('Invalid captcha');
      refreshCaptcha();
      return;
    }

    // Check if user exists and password matches
    const user = staticUsers[email.toLowerCase()];
    if (!user || user.password !== password) {
      alert('Invalid email or password');
      return;
    }

    // Store user info in localStorage
    const userInfo = {
      email: email,
      role: user.role,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', user.role);

    console.log('Login successful:', userInfo);
    window.location.href = '/dashboard';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <div className="w-full px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <img src="images/tnlogo.png" alt="Tamil Nadu Government Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-sm sm:text-base font-bold text-[#036FAA] font-['Poppins'] leading-tight">Tamil Nadu Government</h1>
              <h2 className="text-xs text-[#036FAA] font-medium font-['Poppins'] leading-tight">NOC Application System</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Flexible container that takes remaining space */}
      <div className="flex-1 flex items-center justify-center px-4 pb-3 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl h-full max-h-full flex items-center justify-center">
          
          {/* Mobile Layout (Single Column) */}
          <div className="md:hidden w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-h-full flex flex-col">
              {/* Mobile Header Image - Reduced height */}
              <div className="bg-gradient-to-br from-[#036FAA] to-[#025580] p-4 flex items-center justify-center flex-shrink-0">
                <div className="bg-white backdrop-blur-sm rounded-2xl p-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/images/login.png" alt="Government Illustration" className="w-full h-full object-contain rounded-xl" />
                </div>
              </div>

              {/* Mobile Form - Scrollable if needed */}
              <div className="p-4 flex-1 overflow-y-auto">
                <h2 className="text-lg sm:text-xl font-bold text-[#036FAA] mb-4 text-center">Login</h2>
                
                <div className="space-y-3">
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email ID</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Captcha */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Captcha</label>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2 font-mono text-sm tracking-wider text-black select-none flex-1 text-center">
                        {captchaText}
                      </div>
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="p-2 text-[#036FAA] hover:text-[#025580] hover:bg-blue-50 rounded transition duration-200 flex-shrink-0"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                      placeholder="Enter captcha"
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-[#036FAA] to-[#025580] text-white py-2.5 px-4 rounded hover:from-[#025580] hover:to-[#014060] focus:outline-none focus:ring-2 focus:ring-[#036FAA] focus:ring-offset-1 font-medium text-sm transition duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Login
                  </button>
                </div>

                {/* Registration Link */}
                <div className="mt-4 text-center">
                  <p className="text-[#036FAA] text-sm mb-1">New NGO / Organization?</p>
                  <button
                    onClick={handleRegister}
                    className="text-[#036FAA] hover:text-[#025580] font-medium text-sm underline decoration-1 underline-offset-2 hover:decoration-[#025580] transition duration-200"
                  >
                    Register here →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (Two Columns) */}
          <div className="hidden md:block w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2 h-[85vh] max-h-[600px] lg:max-h-[650px]">
              
              {/* Left Side - Illustration */}
              <div className="bg-gradient-to-br from-[#036FAA] to-[#025580] p-6 lg:p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#036FAA] opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="bg-white backdrop-blur-sm rounded-3xl p-6 border border-white/30 w-40 h-40 lg:w-48 lg:h-48 flex flex-col items-center justify-center">
                    <div className="flex justify-center mb-4">
                      <img src="/images/login.png" alt="Government Illustration" className="w-full h-full object-contain rounded-2xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="max-w-xs mx-auto w-full">
                  <h2 className="text-2xl font-bold text-[#036FAA] mb-6 text-center">Login</h2>
                  
                  <div className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Email ID</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                        placeholder="Enter your password"
                      />
                    </div>

                    {/* Compact Captcha */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Captcha</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-blue-50 border border-blue-200 rounded px-3 py-1 font-mono text-sm tracking-wider text-black select-none flex-1">
                          {captchaText}
                        </div>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="p-1 text-[#036FAA] hover:text-[#025580] hover:bg-blue-50 rounded transition duration-200 flex-shrink-0"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={captcha}
                        onChange={(e) => setCaptcha(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-[#036FAA] focus:border-transparent transition duration-200"
                        placeholder="Enter captcha"
                      />
                    </div>

                    {/* Login Button */}
                    <button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-[#036FAA] to-[#025580] text-white py-2.5 px-4 rounded hover:from-[#025580] hover:to-[#014060] focus:outline-none focus:ring-2 focus:ring-[#036FAA] focus:ring-offset-1 font-medium text-sm transition duration-200 transform hover:scale-[1.01]"
                    >
                      Login
                    </button>
                  </div>

                  {/* Compact Registration Link */}
                  <div className="mt-6 text-center">
                    <p className="text-[#036FAA] text-sm mb-2">New NGO / Organization?</p>
                    <button
                      onClick={handleRegister}
                      className="text-[#036FAA] hover:text-[#025580] font-medium text-sm underline decoration-1 underline-offset-2 hover:decoration-[#025580] transition duration-200"
                    >
                      Register here →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}