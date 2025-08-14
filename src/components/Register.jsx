import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

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
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-2 flex flex-col">
      {/* Title, Logo and Subheading - Top Center */}
      <div className="flex items-center justify-center mb-3">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10">
            <img src="images/tnlogo.png" alt="Tamil Nadu Government Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#036FAA] font-['Poppins']">Tamil Nadu Government</h1>
            <h2 className="text-xs text-[#036FAA] font-medium font-['Poppins']">NOC Application System</h2>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border-2 border-blue-500 rounded-lg flex-1 flex flex-col min-h-0">
        
        {/* Radio Buttons Header */}
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex-shrink-0">            
          <div className="flex items-center justify-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sector"
                value="organized"
                checked={sectorType === 'organized'}
                onChange={(e) => setSectorType(e.target.value)}
                className="w-3 h-3 text-blue-600"
              />
              <span className="text-sm text-gray-700">Organized Sector</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sector"
                value="non-organized"
                checked={sectorType === 'non-organized'}
                onChange={(e) => setSectorType(e.target.value)}
                className="w-3 h-3 text-blue-600"
              />
              <span className="text-sm text-gray-700">Non - Organized Sector</span>
            </label>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-3 flex-1 flex flex-col min-h-0">
          
          {/* Back Button and Title */}
          <div className="flex items-center space-x-2 mb-2">
            <button 
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded transition duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h3 className="text-sm font-semibold text-black">Back to Login</h3>
          </div>

          {/* Input Fields Section - Compact Layout */}
          <div className="mb-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
              
              {/* Email-ID */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email-ID <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Email-Id"
                  />
                  <button 
                    type="button"
                    className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-r hover:bg-blue-700"
                  >
                    OTP
                  </button>
                </div>
              </div>

              {/* Enter Code */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Enter Code <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={formData.enterCode}
                    onChange={(e) => handleInputChange('enterCode', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter code"
                  />
                  <button 
                    type="button"
                    className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-r hover:bg-blue-700"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Name"
                />
              </div>

              {/* Phone No / Contact Person Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  {sectorType === 'organized' ? 'Phone No' : 'Contact Person'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={sectorType === 'organized' ? formData.phoneNo : formData.contactPersonName}
                  onChange={(e) => handleInputChange(sectorType === 'organized' ? 'phoneNo' : 'contactPersonName', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={sectorType === 'organized' ? 'Phone No' : 'Contact person'}
                />
              </div>
{/* PAN No */}
<div>
  <label className="block text-sm font-medium text-black mb-1">
    PAN No {sectorType === 'organized' ? <span className="text-red-500">*</span> : <span className="text-black">(Optional)</span>}
  </label>
  <input
    type="text"
    value={formData.panNo}
    onChange={(e) => handleInputChange('panNo', e.target.value)}
    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
    placeholder="PAN No"
  />
</div>
            </div>

            {/* Conditional Fields Row */}
            {sectorType === 'organized' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
                {/* GST No */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">GST No (Optional)</label>
                  <input
                    type="text"
                    value={formData.gstNo}
                    onChange={(e) => handleInputChange('gstNo', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="GST No"
                  />
                </div>

                {/* Actual Turn over */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Annual Turn over (Optional)</label>
                  <input
                    type="text"
                    value={formData.actualTurnOver}
                    onChange={(e) => handleInputChange('actualTurnOver', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Turn over"
                  />
                </div>
                <div></div>
              </div>
            )}

            {sectorType === 'non-organized' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNo}
                    onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Phone Number"
                  />
                </div>

                {/* GST No */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">GST No (Optional)</label>
                  <input
                    type="text"
                    value={formData.gstNo}
                    onChange={(e) => handleInputChange('gstNo', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="GST No"
                  />
                </div>
                <div></div>
              </div>
            )}
          </div>

          {/* Separator Line */}
          <div className="my-2 border-t border-gray-300"></div>

          {/* Document Upload Section */}
          <div className="mb-3 flex-1">
            <h3 className="text-sm font-semibold text-black mb-2">Document Upload</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Registration Copy / Resolution Copy */}
              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  {sectorType === 'organized' ? 'Registration Copy' : 'Resolution Copy'} <span className="text-red-500">*</span>
                </label>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center hover:border-blue-400 transition duration-200">
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
                  <label htmlFor="registrationFile" className="flex flex-col items-center space-y-1 w-full cursor-pointer">
                    <Upload className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-blue-600 truncate">
                      {uploadedFiles.registrationFile ? uploadedFiles.registrationFile.name : 'Choose file'}
                    </span>
                    <p className="text-xs text-red-500">Mandatory</p>
                  </label>
                </div>
              </div>

              {/* PAN Card */}
              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  PAN Card {sectorType === 'organized' && <span className="text-red-500">*</span>}
                </label>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center hover:border-blue-400 transition duration-200">
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
                  <label htmlFor="panFile" className="flex flex-col items-center space-y-1 w-full cursor-pointer">
                    <Upload className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-blue-600 truncate">
                      {uploadedFiles.panFile ? uploadedFiles.panFile.name : 'Choose file'}
                    </span>
                    <p className={`text-xs ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                      {sectorType === 'organized' ? 'Mandatory' : 'Optional'}
                    </p>
                  </label>
                </div>
              </div>

              {/* NGO Profile */}
              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  NGO Profile {sectorType === 'organized' && <span className="text-red-500">*</span>}
                </label>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center hover:border-blue-400 transition duration-200">
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
                  <label htmlFor="ngoFile" className="flex flex-col items-center space-y-1 w-full cursor-pointer">
                    <Upload className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-blue-600 truncate">
                      {uploadedFiles.ngoFile ? uploadedFiles.ngoFile.name : 'Choose file'}
                    </span>
                    <p className={`text-xs ${sectorType === 'organized' ? 'text-red-500' : 'text-gray-500'}`}>
                      {sectorType === 'organized' ? 'Mandatory' : 'Optional'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Similar Project Details */}
              <div>
                <label className="block text-xs font-medium text-black mb-1">Similar Project Details</label>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center hover:border-blue-400 transition duration-200">
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
                  <label htmlFor="projectFile" className="flex flex-col items-center space-y-1 w-full cursor-pointer">
                    <Upload className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-blue-600 truncate">
                      {uploadedFiles.projectFile ? uploadedFiles.projectFile.name : 'Choose file'}
                    </span>
                    <p className="text-xs text-gray-500">Optional</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 text-sm rounded hover:bg-blue-700 transition duration-200 font-medium"
            >
              Submit Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}