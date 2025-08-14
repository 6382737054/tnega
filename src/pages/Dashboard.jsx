import React, { useState, useEffect } from 'react';
import { Filter, FileText, CheckCircle, Clock, XCircle, Calendar, Search, X, ArrowRight, Download, Eye } from 'lucide-react';

export default function Dashboard() {
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem('userRole') || 'ngo';
    const storedEmail = localStorage.getItem('userEmail') || 'user@example.com';
    
    setUserRole(storedRole);
    setUserEmail(storedEmail);
  }, []);

  const handleNewNOCRequest = () => {
    // Navigate to new NOC request form
    window.location.href = '/new-noc-request';
  };

  const handleWorkflowView = (applicationId) => {
    // Navigate to workflow page
    window.location.href = '/workflow';
  };

  const handleDownload = (applicationId) => {
    // Create a sample PDF content
    const pdfContent = `NOC Certificate\n\nApplication ID: ${applicationId}\nStatus: Approved\nDate: ${new Date().toLocaleDateString()}\n\nThis is to certify that the NOC has been approved.`;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NOC_${applicationId}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sample application data with proper hierarchy timeline
  const applications = [
    {
      id: 'NOC001',
      tankName: 'Palar Tank',
      location: 'Vellore, Gudiyatham',
      activities: ['Strengthening of bund', 'Desilting of channel'],
      status: 'pending',
      department: 'WRD',
      timeline: [
        { date: '2025-08-18', status: 'pending_ee', level: 'EE', remarks: 'Remarks will come' },
        { date: '2025-08-16', status: 'approved_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-15', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-14', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC002',
      tankName: 'Kamakshi Tank',
      location: 'Chennai, Tambaram',
      activities: ['Formation of island', 'Plantation'],
      status: 'approved',
      department: 'RD',
      timeline: [
        { date: '2025-08-14', status: 'approved_dc', level: 'District Collector', remarks: 'Remarks will come' },
        { date: '2025-08-13', status: 'approved_ee', level: 'EE', remarks: 'Remarks will come' },
        { date: '2025-08-12', status: 'approved_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-11', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-10', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC003',
      tankName: 'Vaigai Tank',
      location: 'Madurai, Usilampatti',
      activities: ['Excavation of channels', 'Fencing'],
      status: 'rejected',
      department: 'Forest',
      timeline: [
        { date: '2025-08-12', status: 'rejected_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-08', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-05', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC004',
      tankName: 'Cooum Tank',
      location: 'Chennai, Egmore',
      activities: ['Walking track', 'Sitting benches'],
      status: 'pending',
      department: 'GCC',
      timeline: [
        { date: '2025-08-13', status: 'pending_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-12', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-12', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC005',
      tankName: 'Bhavani Tank',
      location: 'Erode, Bhavani',
      activities: ['Bathing ghats', 'Desilting of channel'],
      status: 'approved',
      department: 'HR & CE',
      timeline: [
        { date: '2025-08-03', status: 'approved_dc', level: 'District Collector', remarks: 'Remarks will come' },
        { date: '2025-08-02', status: 'approved_ee', level: 'EE', remarks: 'Remarks will come' },
        { date: '2025-08-02', status: 'approved_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-01', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-01', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC006',
      tankName: 'Palar Tank',
      location: 'Vellore, Gudiyatham',
      activities: ['Strengthening of bund', 'Desilting of channel'],
      status: 'pending',
      department: 'WRD',
      timeline: [
        { date: '2025-08-18', status: 'pending_ee', level: 'EE', remarks: 'Remarks will come' },
        { date: '2025-08-16', status: 'approved_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-15', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-14', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC007',
      tankName: 'Kamakshi Tank',
      location: 'Chennai, Tambaram',
      activities: ['Formation of island', 'Plantation'],
      status: 'approved',
      department: 'RD',
      timeline: [
        { date: '2025-08-14', status: 'approved_dc', level: 'District Collector', remarks: 'Remarks will come' },
        { date: '2025-08-13', status: 'approved_ee', level: 'EE', remarks: 'Remarks will come' },
        { date: '2025-08-12', status: 'approved_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-11', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-10', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    },
    {
      id: 'NOC008',
      tankName: 'Vaigai Tank',
      location: 'Madurai, Usilampatti',
      activities: ['Excavation of channels', 'Fencing'],
      status: 'pending',
      department: 'Forest',
      timeline: [
        { date: '2025-08-12', status: 'pending_aee', level: 'AEE', remarks: 'Remarks will come' },
        { date: '2025-08-08', status: 'approved_ae_je', level: 'AE/JE', remarks: 'Remarks will come' },
        { date: '2025-08-05', status: 'submitted', level: 'NGO', remarks: 'Remarks will come' }
      ]
    }
  ];

  // Filter applications based on search and filters
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tankName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    if (selectedDistrict) {
      filtered = filtered.filter(app => 
        app.location.toLowerCase().includes(selectedDistrict.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [searchTerm, selectedStatus, selectedDistrict]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate('');
    setSelectedDistrict('');
    setSelectedStatus('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTimelineStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'bg-indigo-500';
      case 'approved_ae_je': return 'bg-green-400';
      case 'approved_aee': return 'bg-green-500';
      case 'approved_ee': return 'bg-green-600';
      case 'approved_dc': return 'bg-emerald-600';
      case 'pending_ae_je': return 'bg-orange-400';
      case 'pending_aee': return 'bg-orange-500';
      case 'pending_ee': return 'bg-orange-600';
      case 'pending_dc': return 'bg-orange-700';
      case 'rejected_ae_je': return 'bg-red-400';
      case 'rejected_aee': return 'bg-red-500';
      case 'rejected_ee': return 'bg-red-600';
      case 'rejected_dc': return 'bg-red-700';
      default: return 'bg-gray-500';
    }
  };

  const getTimelineStatusText = (status) => {
    switch(status) {
      case 'submitted': return 'Submitted by NGO';
      case 'approved_ae_je': return 'Approved by AE/JE';
      case 'approved_aee': return 'Approved by AEE';
      case 'approved_ee': return 'Approved by EE';
      case 'approved_dc': return 'Approved by District Collector';
      case 'pending_ae_je': return 'Pending with AE/JE';
      case 'pending_aee': return 'Pending with AEE';
      case 'pending_ee': return 'Pending with EE';
      case 'pending_dc': return 'Pending with District Collector';
      case 'rejected_ae_je': return 'Rejected by AE/JE';
      case 'rejected_aee': return 'Rejected by AEE';
      case 'rejected_ee': return 'Rejected by EE';
      case 'rejected_dc': return 'Rejected by District Collector';
      default: return status;
    }
  };

  const handleStatusClick = (application) => {
    setSelectedTimeline(application);
    setShowTimeline(true);
  };

  const getDashboardTitle = () => {
    switch(userRole) {
      case 'ngo': return 'NGO Dashboard';
      case 'department': return 'Department Dashboard';
      case 'admin': return 'Admin Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen font-['Inter',sans-serif] pt-16 sm:pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-xs sm:text-sm font-medium">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">•</span>
              <span className="text-indigo-600 text-sm sm:text-base font-semibold">{getDashboardTitle()}</span>
            </div>
            
            {userRole === 'ngo' && (
              <button 
                onClick={handleNewNOCRequest}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                <span className="text-lg font-bold">+</span>
                <span>New NOC Request</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs opacity-90 font-medium">Total NOCs</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">{userRole === 'department' ? '45' : '12'}</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs opacity-90 font-medium">Approved</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">{userRole === 'department' ? '32' : '8'}</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs opacity-90 font-medium">Pending</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">{userRole === 'department' ? '11' : '3'}</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs opacity-90 font-medium">Rejected</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">{userRole === 'department' ? '2' : '1'}</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Quick Filters</span>
            </div>
            <button onClick={clearFilters} className="text-indigo-600 text-sm font-medium hover:text-indigo-700 self-start sm:self-auto">Clear All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by NOC ID or Tank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Calendar className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="District"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900">My NOC Applications</h3>
              <span className="text-sm text-gray-600">{filteredApplications.length} applications found</span>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {filteredApplications.map((app, index) => (
              <div key={app.id} className="border-b border-gray-200 p-4 hover:bg-indigo-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-indigo-600 mb-1">{app.id}</div>
                    <div className="text-base font-medium text-gray-900">{app.tankName}</div>
                    <div className="text-sm text-gray-600">{app.location}</div>
                    <div className="text-sm text-gray-500 mt-1">{app.department}</div>
                  </div>
                  <button
                    onClick={() => handleStatusClick(app)}
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(app.status)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </button>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-gray-600 font-medium mb-2">Activities:</div>
                  <div className="flex flex-wrap gap-1">
                    {app.activities.map((activity, idx) => (
                      <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded border border-indigo-200">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                
                {userRole === 'ngo' && app.status === 'approved' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDownload(app.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-all duration-200"
                      title="Download NOC Certificate"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </button>
                  </div>
                )}
                
                {userRole === 'department' && (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleWorkflowView(app.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-lg hover:bg-indigo-200 transition-all duration-200"
                      title="View Workflow"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </button>
                    {app.status === 'approved' && (
                      <button
                        onClick={() => handleDownload(app.id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-all duration-200"
                        title="Download NOC Certificate"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">NOC ID</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Tank Details</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider hidden lg:table-cell">Activities</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app, index) => (
                  <tr key={app.id} className={`hover:bg-indigo-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="text-sm font-semibold text-indigo-600">{app.id}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.tankName}</div>
                        <div className="text-xs text-gray-600">{app.location}</div>
                        <div className="text-xs text-gray-500 mt-1">{app.department}</div>
                        {/* Show activities on tablet */}
                        <div className="lg:hidden mt-2">
                          <div className="flex flex-wrap gap-1">
                            {app.activities.slice(0, 2).map((activity, idx) => (
                              <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded border border-indigo-200">
                                {activity}
                              </span>
                            ))}
                            {app.activities.length > 2 && (
                              <span className="text-xs text-gray-500">+{app.activities.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {app.activities.map((activity, idx) => (
                          <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded border border-indigo-200">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <button
                        onClick={() => handleStatusClick(app)}
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(app.status)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      {userRole === 'ngo' && app.status === 'approved' && (
                        <button
                          onClick={() => handleDownload(app.id)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-all duration-200"
                          title="Download NOC Certificate"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          <span className="hidden md:inline">Download</span>
                        </button>
                      )}
                      {userRole === 'department' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleWorkflowView(app.id)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-lg hover:bg-indigo-200 transition-all duration-200"
                            title="View Workflow"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            <span className="hidden lg:inline">View</span>
                          </button>
                          {app.status === 'approved' && (
                            <button
                              onClick={() => handleDownload(app.id)}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-all duration-200"
                              title="Download NOC Certificate"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              <span className="hidden lg:inline">Download</span>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimeline && selectedTimeline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">{selectedTimeline.tankName} - Timeline</h3>
                  <p className="text-indigo-100 text-sm">NOC ID: {selectedTimeline.id}</p>
                </div>
                <button
                  onClick={() => setShowTimeline(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                {selectedTimeline.timeline.reverse().map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${getTimelineStatusColor(item.status)} mt-1`}></div>
                      {index < selectedTimeline.timeline.length - 1 && (
                        <div className="w-0.5 h-16 sm:h-20 bg-gray-300 ml-1.5 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                        <span className="text-sm font-semibold text-gray-900">
                          {getTimelineStatusText(item.status)}
                        </span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded self-start">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{new Date(item.date).toLocaleDateString('en-IN')}</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-medium mb-1">Remarks:</p>
                        <p className="text-sm text-gray-800">{item.remarks}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}