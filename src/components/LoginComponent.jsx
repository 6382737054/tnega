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
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-2 overflow-hidden">
      {/* Title, Logo and Subheading - Top Center */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12">
            <img src="images/tnlogo.png" alt="Tamil Nadu Government Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#036FAA] font-['Poppins']">Tamil Nadu Government</h1>
            <h2 className="text-sm text-[#036FAA] font-medium font-['Poppins']">NOC Application System</h2>
          </div>
        </div>
      </div>

      {/* Compact Login Card */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl w-full grid md:grid-cols-2 h-[calc(100vh-140px)]">
          
          {/* Left Side - Illustration */}
          <div className="bg-gradient-to-br from-[#036FAA] to-[#025580] p-8 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#036FAA] opacity-10"></div>
            <div className="relative z-10 text-center">
              <div className="bg-white backdrop-blur-sm rounded-3xl p-6 border border-white/30 w-64 h-64 flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4">
                  <img src="/images/login.png" alt="Government Illustration" className="w-full h-full object-contain rounded-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Compact Login Form */}
          <div className="p-6 flex flex-col justify-center">
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
                      className="p-1 text-[#036FAA] hover:text-[#025580] hover:bg-blue-50 rounded transition duration-200"
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
  );
}