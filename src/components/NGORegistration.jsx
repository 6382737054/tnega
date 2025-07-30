import React, { useState } from 'react';
import { Upload, FileText, ArrowLeft, Building } from 'lucide-react';

const NGORegistration = ({ onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    ngoName: '',
    ownerName: '',
    pan: '',
    aadhaar: '',
    phone: '',
    gst: '',
    turnover: '',
    classification: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    gstCard: null,
    panCard: null,
    aadhaarCard: null,
    balanceSheet: null,
    ngoProfile: null,
    projectDetails: null
  });

  const classifications = [
    'Environmental Conservation',
    'Rural Development',
    'Water Management',
    'Agricultural Development',
    'Community Welfare'
  ];

  const handleFileUpload = (docType, file) => {
    setUploadedDocs({...uploadedDocs, [docType]: file});
  };

  const handleSubmit = () => {
    // Registration logic
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-white hover:bg-sky-800 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">NGO Registration</h1>
                <p className="text-sky-100">Register your organization</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official Email ID *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="ngo@organization.org"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NGO Name *
                  </label>
                  <input
                    type="text"
                    value={formData.ngoName}
                    onChange={(e) => setFormData({...formData, ngoName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner/Promoter Name *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number *
                    </label>
                    <input
                      type="text"
                      value={formData.pan}
                      onChange={(e) => setFormData({...formData, pan: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number *
                    </label>
                    <input
                      type="text"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="1234 5678 9012"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Registration Number *
                  </label>
                  <input
                    type="text"
                    value={formData.gst}
                    onChange={(e) => setFormData({...formData, gst: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Turnover *
                  </label>
                  <input
                    type="number"
                    value={formData.turnover}
                    onChange={(e) => setFormData({...formData, turnover: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter amount in INR"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NGO Classification *
                  </label>
                  <select
                    value={formData.classification}
                    onChange={(e) => setFormData({...formData, classification: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select Classification</option>
                    {classifications.map((cls, index) => (
                      <option key={index} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Document Upload
              </h2>

              <div className="space-y-4">
                {/* Mandatory Documents */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Mandatory Documents</h3>
                  
                  {[
                    { key: 'gstCard', label: 'GST Registration Card' },
                    { key: 'panCard', label: 'PAN Card' },
                    { key: 'aadhaarCard', label: 'Aadhaar Card' },
                    { key: 'balanceSheet', label: 'Balance Sheet' }
                  ].map(doc => (
                    <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label} *
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => document.getElementById(doc.key).click()}
                          className="flex items-center gap-2 px-4 py-2 border border-sky-300 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Choose File
                        </button>
                        <input
                          id={doc.key}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        {uploadedDocs[doc.key] && (
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {uploadedDocs[doc.key].name}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Documents */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Optional Documents</h3>
                  
                  {[
                    { key: 'ngoProfile', label: 'NGO Profile' },
                    { key: 'projectDetails', label: 'Similar Project Details' }
                  ].map(doc => (
                    <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label}
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => document.getElementById(doc.key).click()}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Choose File
                        </button>
                        <input
                          id={doc.key}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        {uploadedDocs[doc.key] && (
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {uploadedDocs[doc.key].name}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-sky-800 transition-all transform hover:scale-[1.02] shadow-lg"
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
};

export default NGORegistration;