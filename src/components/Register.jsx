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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="w-full px-4 py-4 sm:py-6 mb-4">
          <div className="flex items-center justify-center relative">
            <button 
              onClick={handleBack}
              className="absolute left-0 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Login</span>
            </button>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <img src="images/tnlogo.png" alt="Tamil Nadu Government Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-base sm:text-lg font-bold text-[#036FAA] font-['Poppins'] leading-tight">Tamil Nadu Government</h1>
                <h2 className="text-xs sm:text-sm text-[#036FAA] font-medium font-['Poppins'] leading-tight">NOC Application System</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Type Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setSectorType('organized')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all ${
                sectorType === 'organized'
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-b border-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Organized Sector</span>
            </button>
            <button
              onClick={() => setSectorType('non-organized')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all ${
                sectorType === 'non-organized'
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-b border-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Non-Organized Sector</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-b-xl shadow-lg border-2 border-gray-300 p-6">
          <div className="space-y-6">
            
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Email with OTP */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter email address"
                    />
                    <button 
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-r-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                {/* Verification Code */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={formData.enterCode}
                      onChange={(e) => handleInputChange('enterCode', e.target.value)}
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter 6-digit code"
                    />
                    <button 
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-r-md hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Create password"
                  />
                </div>

                {/* Organization/Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {sectorType === 'organized' ? 'Organization Name' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={sectorType === 'organized' ? 'Enter organization name' : 'Enter full name'}
                  />
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {sectorType === 'organized' ? 'Primary Contact' : 'Contact Person'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={sectorType === 'organized' ? formData.phoneNo : formData.contactPersonName}
                    onChange={(e) => handleInputChange(sectorType === 'organized' ? 'phoneNo' : 'contactPersonName', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={sectorType === 'organized' ? 'Phone number' : 'Contact person name'}
                  />
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number {sectorType === 'organized' ? <span className="text-red-500">*</span> : <span className="text-gray-500">(Optional)</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.panNo}
                    onChange={(e) => handleInputChange('panNo', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter PAN number"
                  />
                </div>
              </div>

              {/* Additional Fields for Organized Sector */}
              {sectorType === 'organized' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.gstNo}
                      onChange={(e) => handleInputChange('gstNo', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter GST number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Turnover <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.actualTurnOver}
                      onChange={(e) => handleInputChange('actualTurnOver', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter annual turnover"
                    />
                  </div>
                </div>
              )}

              {/* Additional Fields for Non-Organized Sector */}
              {sectorType === 'non-organized' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNo}
                      onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.gstNo}
                      onChange={(e) => handleInputChange('gstNo', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter GST number"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Document Upload Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Document Upload
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Registration/Resolution Copy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-blue-600 font-medium truncate max-w-full px-2">
                        {uploadedFiles.registrationFile ? uploadedFiles.registrationFile.name : 'Choose file'}
                      </span>
                      <span className="text-xs text-red-500">Required</span>
                    </label>
                  </div>
                </div>

                {/* PAN Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-blue-600 font-medium truncate max-w-full px-2">
                        {uploadedFiles.panFile ? uploadedFiles.panFile.name : 'Choose file'}
                      </span>
                      <span className={`text-xs ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                        {sectorType === 'organized' ? 'Required' : 'Optional'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* NGO Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-blue-600 font-medium truncate max-w-full px-2">
                        {uploadedFiles.ngoFile ? uploadedFiles.ngoFile.name : 'Choose file'}
                      </span>
                      <span className={`text-xs ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                        {sectorType === 'organized' ? 'Required' : 'Optional'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Similar Project Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-blue-600 font-medium truncate max-w-full px-2">
                        {uploadedFiles.projectFile ? uploadedFiles.projectFile.name : 'Choose file'}
                      </span>
                      <span className="text-xs text-gray-500">Optional</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}