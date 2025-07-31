import React, { useState } from 'react';
import { 
  FileText, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowLeft,
  User,
  Upload,
  MessageSquare
} from 'lucide-react';

const DepartmentalDashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState('');
  const [remarks, setRemarks] = useState('');
  const [returnTo, setReturnTo] = useState('');
  const [filters, setFilters] = useState({
    dateRange: '',
    status: '',
    district: '',
    taluk: '',
    ngoName: ''
  });

  // Return hierarchy mapping based on departments
  const returnHierarchy = {
    Forest: [
      { value: 'ngo', label: 'NGO' },
      { value: 'forest_range_officer', label: 'Forest Range Officer (L1)' },
      { value: 'district_forest_officer', label: 'District Forest Officer/Deputy Director/Wildlife Warden (L2)' }
    ],
    DTP: [
      { value: 'ngo', label: 'NGO' },
      { value: 'eo', label: 'EO (L1)' },
      { value: 'ae_ee', label: 'AE/EE (L2)' }
    ],
    Municipality: [
      { value: 'ngo', label: 'NGO' },
      { value: 'ae_municipal', label: 'AE (L1)' },
      { value: 'municipal_engineer', label: 'Municipal Engineer (L2)' }
    ],
    Corporation: [
      { value: 'ngo', label: 'NGO' },
      { value: 'ae_corp', label: 'AE (L1)' },
      { value: 'aee_corp', label: 'AEE (L2)' },
      { value: 'city_engineer', label: 'City Engineer (L3)' }
    ],
    RD: [
      { value: 'ngo', label: 'NGO' },
      { value: 'ae_rd', label: 'AE (L1)' },
      { value: 'pd_ee_drda', label: 'PD/EE, DRDA (L2)' },
      { value: 'district_level', label: 'District Level (L3)' }
    ],
    WRD: [
      { value: 'ngo', label: 'NGO' },
      { value: 'ae_je_wrd', label: 'AE/JE (L1)' },
      { value: 'aee_wrd', label: 'AEE (L2)' },
      { value: 'ee_wrd', label: 'EE (L3)' }
    ],
    DMA: [
      { value: 'ngo', label: 'NGO' },
      { value: 'assistant_dma', label: 'Assistant (L1)' },
      { value: 'ae_dma', label: 'AE (L2)' },
      { value: 'municipality_engineer_city_engineer', label: 'Municipality Engineer/City Engineer (L3)' }
    ]
  };

  // Sample data
  const pendingApplications = [
    {
      id: 'NOC001',
      projectId: 'PID001',
      ngo: 'Green Earth Foundation',
      ngoEmail: 'contact@greenearth.org',
      ngoPhone: '+91 98765 43210',
      tank: 'Palar Tank',
      district: 'Vellore',
      taluk: 'Gudiyatham',
      block: 'Gudiyatham',
      department: 'WRD',
      submittedDate: '2025-07-15',
      activities: [
        { name: 'Manual De-silting', quantity: 500, rate: 150, amount: 75000 },
        { name: 'Stone Pitching', quantity: 100, rate: 2500, amount: 250000 }
      ],
      totalAmount: 325000,
      documents: ['Proposal.pdf', 'Technical_Drawings.pdf'],
      priority: 'High'
    },
    {
      id: 'NOC003',
      projectId: 'PID003',
      ngo: 'Water Conservation Trust',
      ngoEmail: 'info@waterconserve.org',
      ngoPhone: '+91 98765 43212',
      tank: 'Pennai Tank',
      district: 'Cuddalore',
      taluk: 'Panruti',
      block: 'Panruti',
      department: 'Forest',
      submittedDate: '2025-07-12',
      activities: [
        { name: 'Major Reconstruction', quantity: 1, rate: 75000, amount: 75000 }
      ],
      totalAmount: 75000,
      documents: ['Proposal.pdf'],
      priority: 'High'
    }
  ];

  const processedApplications = [
    {
      id: 'NOC002',
      projectId: 'PID002',
      ngo: 'Rural Development Org',
      tank: 'Cheyyar Tank',
      district: 'Tiruvannamalai',
      status: 'Approved',
      processedDate: '2025-07-10',
      processedBy: 'Rajesh Kumar',
      remarks: 'All documents verified. Project approved for implementation.'
    },
    {
      id: 'NOC004',
      projectId: 'PID004',
      ngo: 'Eco Warriors Foundation',
      tank: 'Vellar Tank',
      district: 'Villupuram',
      status: 'Rejected',
      processedDate: '2025-07-08',
      processedBy: 'Priya Selvam',
      remarks: 'Incomplete technical specifications. Please resubmit with proper documentation.'
    },
    {
      id: 'NOC005',
      projectId: 'PID005',
      ngo: 'Community Development Trust',
      tank: 'Cooum Tank',
      district: 'Chennai',
      status: 'Returned',
      processedDate: '2025-07-05',
      processedBy: 'Kumar Swamy',
      remarks: 'Additional environmental clearance required.',
      returnedTo: 'NGO'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Returned': return 'text-yellow-600 bg-yellow-100';
      case 'Pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Returned': return <ArrowLeft className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleReviewSubmit = () => {
    const actionText = reviewAction === 'Return' ? `returned to ${returnTo}` : reviewAction.toLowerCase();
    alert(`Application ${selectedApplication.id} has been ${actionText} successfully!`);
    setShowReviewModal(false);
    setSelectedApplication(null);
    setRemarks('');
    setReviewAction('');
    setReturnTo('');
  };

  const calculateTotalEstimation = (activities) => {
    return activities.reduce((total, activity) => total + activity.amount, 0);
  };

  if (selectedApplication) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={() => setSelectedApplication(null)}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Applications
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Application ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Project ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.projectId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Tank Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.tank}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Location</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedApplication.district}, {selectedApplication.taluk}, {selectedApplication.block}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Department</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Submitted Date</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.submittedDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Priority</label>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedApplication.priority === 'High' ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100'
                    }`}>
                      {selectedApplication.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Activities and Estimation */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities & Estimation</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (₹)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedApplication.activities.map((activity, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm text-gray-900">{activity.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{activity.quantity}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{activity.rate.toLocaleString()}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{activity.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900">Total Estimation</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          ₹{selectedApplication.totalAmount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{doc}</span>
                      </div>
                      <button className="text-sky-600 hover:text-sky-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NGO Information & Actions */}
            <div className="space-y-6">
              {/* NGO Profile */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">NGO Profile</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Organization</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.ngo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.ngoEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.ngoPhone}</p>
                  </div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
                  <User className="w-4 h-4 inline mr-2" />
                  View Full Profile
                </button>
              </div>

              {/* Review Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setReviewAction('Approve');
                      setShowReviewModal(true);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Approve Application
                  </button>
                  <button
                    onClick={() => {
                      setReviewAction('Return');
                      setShowReviewModal(true);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Return for Revision
                  </button>
                  <button
                    onClick={() => {
                      setReviewAction('Reject');
                      setShowReviewModal(true);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
                  >
                    <XCircle className="w-4 h-4 inline mr-2" />
                    Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {reviewAction} Application
              </h3>
              
              {/* Return To Dropdown - only show for Return action */}
              {reviewAction === 'Return' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return To *
                  </label>
                  <select
                    value={returnTo}
                    onChange={(e) => setReturnTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select level to return to</option>
                    {returnHierarchy[selectedApplication.department]?.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks *
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Enter your remarks..."
                  required
                />
              </div>
              
              {reviewAction === 'Approve' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload MOU Template
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <input
                      type="file"
                      id="mou"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <button
                      onClick={() => document.getElementById('mou').click()}
                      className="flex items-center gap-2 text-sky-600 hover:text-sky-800"
                    >
                      <Upload className="w-4 h-4" />
                      Upload MOU
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={handleReviewSubmit}
                  disabled={reviewAction === 'Return' && !returnTo}
                  className="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 text-white py-2 rounded-lg font-semibold hover:from-sky-700 hover:to-sky-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit {reviewAction}
                </button>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setRemarks('');
                    setReviewAction('');
                    setReturnTo('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'pending'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Review ({pendingApplications.length})
              </button>
              <button
                onClick={() => setActiveTab('processed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'processed'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Processed Applications
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium text-gray-800">Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Returned">Returned</option>
              </select>
              <input
                type="text"
                placeholder="District"
                value={filters.district}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Taluk"
                value={filters.taluk}
                onChange={(e) => setFilters({...filters, taluk: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="NGO Name"
                value={filters.ngoName}
                onChange={(e) => setFilters({...filters, ngoName: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Review</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NGO Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tank Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.ngo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.tank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.district}, {app.taluk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{app.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          app.priority === 'High' ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100'
                        }`}>
                          {app.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.submittedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedApplication(app)}
                          className="text-sky-600 hover:text-sky-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Processed Applications */}
        {activeTab === 'processed' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Processed Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NGO Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tank Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Processed By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.ngo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.tank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.processedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.processedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-sky-600 hover:text-sky-900 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentalDashboard;