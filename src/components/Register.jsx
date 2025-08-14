import React, { useState } from 'react';
import { ArrowLeft, Upload, Building2, Users } from 'lucide-react';

export default function RegisterPage() {
  const [sectorType, setSectorType] = useState('organized');
  const [formData, setFormData] = useState({
    email: '',
    enterCode: '',
    password: '',
    name: '',
    phoneNo: '',
    panNo: '',
    gstNo: '',
    actualTurnOver: '',
    contactPersonName: '',
    ngoClassification: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    registrationFile: null,
    panFile: null,
    ngoFile: null,
    projectFile: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
    console.log(`${fileType} uploaded:`, file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', { sectorType, ...formData, files: uploadedFiles });
  };

  const handleBack = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="w-full px-3 sm:px-6 py-4 sm:py-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between sm:justify-center relative">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors sm:absolute sm:left-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-medium hidden sm:inline">Back to Login</span>
              <span className="text-xs font-medium sm:hidden">Back</span>
            </button>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0">
                <img src="images/tnlogo.png" alt="Tamil Nadu Government Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-[#036FAA] font-['Poppins'] leading-tight">Tamil Nadu Government</h1>
                <h2 className="text-xs sm:text-sm text-[#036FAA] font-medium font-['Poppins'] leading-tight">NOC Application System</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Sector Type Tabs */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSectorType('organized')}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-3 sm:px-6 text-sm font-medium transition-all relative ${
                  sectorType === 'organized'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Organized Sector</span>
                {sectorType === 'organized' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
                )}
              </button>
              <button
                onClick={() => setSectorType('non-organized')}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-3 sm:px-6 text-sm font-medium transition-all relative ${
                  sectorType === 'non-organized'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Non-Organized Sector</span>
                {sectorType === 'non-organized' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
                )}
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-8">
              
              {/* Basic Information */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Email with OTP */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 min-w-0 px-3 py-3 text-sm border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter email address"
                      />
                      <button 
                        type="button"
                        className="px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-r-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  {/* Verification Code */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <input
                        type="text"
                        value={formData.enterCode}
                        onChange={(e) => handleInputChange('enterCode', e.target.value)}
                        className="flex-1 min-w-0 px-3 py-3 text-sm border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter 6-digit code"
                      />
                      <button 
                        type="button"
                        className="px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-r-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500"
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Create password"
                    />
                  </div>

                  {/* Organization/Name */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {sectorType === 'organized' ? 'Organization Name' : 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={sectorType === 'organized' ? 'Enter organization name' : 'Enter full name'}
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {sectorType === 'organized' ? 'Primary Contact' : 'Contact Person'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={sectorType === 'organized' ? formData.phoneNo : formData.contactPersonName}
                      onChange={(e) => handleInputChange(sectorType === 'organized' ? 'phoneNo' : 'contactPersonName', e.target.value)}
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={sectorType === 'organized' ? 'Phone number' : 'Contact person name'}
                    />
                  </div>

                  {/* PAN Number */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number {sectorType === 'organized' ? <span className="text-red-500">*</span> : <span className="text-gray-500">(Optional)</span>}
                    </label>
                    <input
                      type="text"
                      value={formData.panNo}
                      onChange={(e) => handleInputChange('panNo', e.target.value)}
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter PAN number"
                    />
                  </div>
                </div>

                {/* Additional Fields for Organized Sector */}
                {sectorType === 'organized' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.gstNo}
                        onChange={(e) => handleInputChange('gstNo', e.target.value)}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter GST number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Turnover <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.actualTurnOver}
                        onChange={(e) => handleInputChange('actualTurnOver', e.target.value)}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter annual turnover"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Fields for Non-Organized Sector */}
                {sectorType === 'non-organized' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNo}
                        onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.gstNo}
                        onChange={(e) => handleInputChange('gstNo', e.target.value)}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter GST number"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Document Upload Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Document Upload
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Registration/Resolution Copy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {sectorType === 'organized' ? 'Registration Certificate' : 'Resolution Copy'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="registrationFile"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('registrationFile', file);
                          }
                        }}
                      />
                      <label 
                        htmlFor="registrationFile" 
                        className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group"
                      >
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm text-blue-600 font-medium truncate max-w-full px-2 text-center">
                          {uploadedFiles.registrationFile ? uploadedFiles.registrationFile.name : 'Choose file'}
                        </span>
                        <span className="text-xs text-red-500 mt-1">Required</span>
                      </label>
                    </div>
                  </div>

                  {/* PAN Card */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      PAN Card Copy {sectorType === 'organized' && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="panFile"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('panFile', file);
                          }
                        }}
                      />
                      <label 
                        htmlFor="panFile" 
                        className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group"
                      >
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm text-blue-600 font-medium truncate max-w-full px-2 text-center">
                          {uploadedFiles.panFile ? uploadedFiles.panFile.name : 'Choose file'}
                        </span>
                        <span className={`text-xs mt-1 ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                          {sectorType === 'organized' ? 'Required' : 'Optional'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* NGO Profile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Organization Profile {sectorType === 'organized' && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="ngoFile"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('ngoFile', file);
                          }
                        }}
                      />
                      <label 
                        htmlFor="ngoFile" 
                        className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group"
                      >
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm text-blue-600 font-medium truncate max-w-full px-2 text-center">
                          {uploadedFiles.ngoFile ? uploadedFiles.ngoFile.name : 'Choose file'}
                        </span>
                        <span className={`text-xs mt-1 ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                          {sectorType === 'organized' ? 'Required' : 'Optional'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Similar Project Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Similar Project Details <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="projectFile"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('projectFile', file);
                          }
                        }}
                      />
                      <label 
                        htmlFor="projectFile" 
                        className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group"
                      >
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm text-blue-600 font-medium truncate max-w-full px-2 text-center">
                          {uploadedFiles.projectFile ? uploadedFiles.projectFile.name : 'Choose file'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">Optional</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Submit Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}