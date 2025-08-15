import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, XCircle, RotateCcw, FileText, MapPin, Building2, Eye, Download } from 'lucide-react';

export default function WorkflowPage() {
  const [selectedAction, setSelectedAction] = useState('');
  const [remarks, setRemarks] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnTo, setReturnTo] = useState('');
  const [showNGOProfile, setShowNGOProfile] = useState(false);

  // Sample NOC data
  const nocData = {
    id: 'NOC001',
    tankName: 'Palar Tank',
    location: 'Vellore, Gudiyatham',
    activities: ['Strengthening of bund', 'Desilting of channel'],
    status: 'pending',
    department: 'WRD',
    submittedBy: 'Tamil Nadu Water Conservation NGO',
    submittedDate: '2025-08-14',
    lumpsumAmount: '₹2,50,000',
    beforePhoto: 'tank_before_photo.jpg',
    projectProposal: 'project_proposal.pdf',
    kmlFile: 'tank_location.kml'
  };

  // NGO Profile data
  const ngoProfile = {
    organizationName: 'Tamil Nadu Water Conservation NGO',
    email: 'contact@tnwaterconservation.org',
    registrationCertificate: 'ngo_registration_cert.pdf',
    panCard: 'ngo_pan_card.pdf',
    similarProjectDetails: 'similar_project_details.pdf'
  };

  const handleBack = () => {
    window.location.href = '/dashboard';
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowModal(true);
    setRemarks('');
    setUploadedFile(null);
    setReturnTo('');
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleViewPhoto = () => {
    alert('Opening before photo: ' + nocData.beforePhoto);
  };

  const handleViewProposal = () => {
    alert('Opening project proposal: ' + nocData.projectProposal);
  };

  const handleViewKML = () => {
    alert('Downloading KML file: ' + nocData.kmlFile);
  };

  const handleViewNGOProfile = () => {
    setShowNGOProfile(true);
  };

  const handleViewNGODocument = (docName) => {
    alert(`Opening NGO document: ${docName}`);
  };

  const handleSubmit = () => {
    if (!remarks.trim()) {
      alert('Please enter remarks/reason');
      return;
    }

    if ((selectedAction === 'approve' || selectedAction === 'reject') && !uploadedFile) {
      alert('Please upload a file for this action');
      return;
    }

    if (selectedAction === 'return' && !returnTo) {
      alert('Please select where to return the application');
      return;
    }

    console.log('Action:', selectedAction);
    console.log('Remarks:', remarks);
    console.log('File:', uploadedFile);
    if (selectedAction === 'return') {
      console.log('Return to:', returnTo);
    }

    if (selectedAction === 'return') {
      alert(`Application returned to ${returnTo} successfully!`);
    } else {
      alert(`NOC ${selectedAction}d successfully!`);
    }
    setShowModal(false);
    window.location.href = '/dashboard';
  };

  const getActionConfig = (action) => {
    switch(action) {
      case 'approve':
        return {
          title: 'Approve NOC Application',
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          buttonColor: 'bg-green-600 hover:bg-green-700',
          icon: CheckCircle,
          requiresFile: true,
          label: 'Remarks & Supporting Documents'
        };
      case 'reject':
        return {
          title: 'Reject NOC Application',
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          buttonColor: 'bg-red-600 hover:bg-red-700',
          icon: XCircle,
          requiresFile: true,
          label: 'Remarks & Supporting Documents'
        };
      case 'return':
        return {
          title: 'Return Application',
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          buttonColor: 'bg-orange-600 hover:bg-orange-700',
          icon: RotateCcw,
          requiresFile: false,
          label: 'Reason for Return'
        };
      default:
        return {};
    }
  };

  const actionConfig = getActionConfig(selectedAction);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen font-['Inter',sans-serif] pt-16 sm:pt-20">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center py-3">
            <button onClick={handleBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mr-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">Department Dashboard</span>
              <span className="text-gray-300">→</span>
              <span className="text-indigo-600 font-medium">NOC Workflow</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NOC Application Review</h1>
          <p className="text-gray-600">Review and take action on the NOC application</p>
        </div>

        {/* NOC Details Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6 sm:mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">NOC ID: {nocData.id}</h2>
             
              </div>
              <div className="text-left sm:text-right">
                <span className="text-indigo-100 text-sm">Submitted on</span>
                <div className="text-white font-medium">{new Date(nocData.submittedDate).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tank Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Tank Details</h3>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tank Name</label>
                    <p className="text-base font-semibold text-gray-900">{nocData.tankName}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-base text-gray-900">{nocData.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Department</label>
                    <p className="text-base text-gray-900">{nocData.department}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submitted By</label>
                    <div className="flex items-center justify-between">
                      <p className="text-base text-gray-900">{nocData.submittedBy}</p>
                      <button
                        onClick={handleViewNGOProfile}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-lg hover:bg-indigo-200 transition-colors"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Profile
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Lumpsum Amount</label>
                    <p className="text-lg font-bold text-indigo-600">{nocData.lumpsumAmount}</p>
                  </div>
                </div>
              </div>

              {/* Activities & Documents */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Activities & Documents</h3>
                </div>
                
                {/* Proposed Activities */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-2">Proposed Activities</label>
                  <div className="flex flex-wrap gap-2">
                    {nocData.activities.map((activity, idx) => (
                      <span key={idx} className="inline-flex px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submitted Documents */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <label className="text-sm font-medium text-gray-600 block">Submitted Documents</label>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Before Photo</p>
                          <p className="text-xs text-gray-500">{nocData.beforePhoto}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleViewPhoto}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Project Proposal</p>
                          <p className="text-xs text-gray-500">{nocData.projectProposal}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleViewProposal}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        View
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">KML File</p>
                          <p className="text-xs text-gray-500">{nocData.kmlFile}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleViewKML}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Action</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleActionClick('approve')}
              className="flex items-center justify-center space-x-3 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Approve</span>
            </button>

            <button
              onClick={() => handleActionClick('reject')}
              className="flex items-center justify-center space-x-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Reject</span>
            </button>

            <button
              onClick={() => handleActionClick('return')}
              className="flex items-center justify-center space-x-3 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">Return</span>
            </button>
          </div>
        </div>

        {/* Action Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className={`px-6 py-4 border-b border-gray-200 ${actionConfig.bgColor}`}>
                <div className="flex items-center space-x-3">
                  <actionConfig.icon className={`w-6 h-6 text-${actionConfig.color}-600`} />
                  <h3 className={`text-lg font-semibold text-${actionConfig.color}-900`}>{actionConfig.title}</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {actionConfig.label} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Enter ${actionConfig.label.toLowerCase()}...`}
                  />
                </div>

                {/* Return To Dropdown for Return Action */}
                {selectedAction === 'return' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return To <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={returnTo}
                      onChange={(e) => setReturnTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select where to return</option>
                      <option value="AE">Assistant Engineer (AE)</option>
                      <option value="NGO">NGO</option>
                    </select>
                  </div>
                )}

                {/* File Upload for Approve/Reject */}
                {actionConfig.requiresFile && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Supporting Document <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed ${actionConfig.borderColor} rounded-lg p-6 text-center hover:border-${actionConfig.color}-400 transition-colors ${actionConfig.bgColor}`}>
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <div className={`text-${actionConfig.color}-600 font-medium`}>{uploadedFile.name}</div>
                          <div className="text-sm text-gray-500">File uploaded successfully</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className={`w-8 h-8 text-${actionConfig.color}-400 mx-auto`} />
                          <div className="text-gray-600">Upload supporting document</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className={`mt-3 inline-flex items-center px-4 py-2 border border-${actionConfig.color}-300 rounded-lg text-sm font-medium text-${actionConfig.color}-700 bg-white hover:bg-${actionConfig.color}-50 cursor-pointer transition-colors`}>
                        Choose File
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${actionConfig.buttonColor}`}
                >
                  {selectedAction === 'approve' ? 'Approve Application' : 
                   selectedAction === 'reject' ? 'Reject Application' : 
                   'Return Application'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NGO Profile Modal */}
        {showNGOProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">NGO Profile</h3>
                  </div>
                  <button
                    onClick={() => setShowNGOProfile(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Organization Name</label>
                        <p className="text-base font-semibold text-gray-900">{ngoProfile.organizationName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-base text-indigo-600">{ngoProfile.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Registration Documents
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Registration Certificate</p>
                            <p className="text-xs text-gray-500">{ngoProfile.registrationCertificate}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewNGODocument(ngoProfile.registrationCertificate)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">PAN Card Copy</p>
                            <p className="text-xs text-gray-500">{ngoProfile.panCard}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewNGODocument(ngoProfile.panCard)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 border border-orange-200 rounded-lg hover:bg-orange-200 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Similar Project Details</p>
                            <p className="text-xs text-gray-500">{ngoProfile.similarProjectDetails}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewNGODocument(ngoProfile.similarProjectDetails)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setShowNGOProfile(false)}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}