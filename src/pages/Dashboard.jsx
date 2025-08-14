import React, { useState, useEffect } from 'react';
import { Filter, FileText, CheckCircle, Clock, XCircle, Calendar, Search, X, ArrowRight, Download } from 'lucide-react';

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
    // Get user info from memory (instead of localStorage for Claude.ai compatibility)
    const userInfo = { email: 'user@example.com' };
    const role = 'ngo';
    
    setUserRole(role);
    setUserEmail(userInfo.email || '');
  }, []);

const handleNewNOCRequest = () => {
  // Navigate to new NOC request form
  window.location.href = '/new-noc-request';
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
        { date: '2025-08-18', status: 'pending_ee', level: 'EE' },
        { date: '2025-08-16', status: 'approved_aee', level: 'AEE' },
        { date: '2025-08-15', status: 'approved_ae_je', level: 'AE/JE' },
        { date: '2025-08-14', status: 'submitted', level: 'NGO' }
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
        { date: '2025-08-14', status: 'approved_dc', level: 'District Collector' },
        { date: '2025-08-13', status: 'approved_ee', level: 'EE' },
        { date: '2025-08-12', status: 'approved_aee', level: 'AEE' },
        { date: '2025-08-11', status: 'approved_ae_je', level: 'AE/JE' },
        { date: '2025-08-10', status: 'submitted', level: 'NGO' }
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
        { date: '2025-08-12', status: 'rejected_aee', level: 'AEE' },
        { date: '2025-08-08', status: 'approved_ae_je', level: 'AE/JE' },
        { date: '2025-08-05', status: 'submitted', level: 'NGO' }
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
        { date: '2025-08-13', status: 'pending_aee', level: 'AEE' },
        { date: '2025-08-12', status: 'approved_ae_je', level: 'AE/JE' },
        { date: '2025-08-12', status: 'submitted', level: 'NGO' }
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
        { date: '2025-08-03', status: 'approved_dc', level: 'District Collector' },
        { date: '2025-08-02', status: 'approved_ee', level: 'EE' },
        { date: '2025-08-02', status: 'approved_aee', level: 'AEE' },
        { date: '2025-08-01', status: 'approved_ae_je', level: 'AE/JE' },
        { date: '2025-08-01', status: 'submitted', level: 'NGO' }
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
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTimelineStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'bg-blue-500';
      case 'approved_ae_je': return 'bg-green-400';
      case 'approved_aee': return 'bg-green-500';
      case 'approved_ee': return 'bg-green-600';
      case 'approved_dc': return 'bg-emerald-600';
      case 'pending_ae_je': return 'bg-amber-400';
      case 'pending_aee': return 'bg-amber-500';
      case 'pending_ee': return 'bg-amber-600';
      case 'pending_dc': return 'bg-amber-700';
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
    <div className="bg-gray-50 min-h-screen">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">•</span>
              <span className="text-blue-600 text-sm font-semibold">{getDashboardTitle()}</span>
            </div>
            
            {userRole === 'ngo' && (
              <button 
                onClick={handleNewNOCRequest}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-lg font-bold">+</span>
                <span>New NOC Request</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Compact Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs opacity-90 font-medium">Total NOCs</span>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs opacity-90 font-medium">Approved</span>
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs opacity-90 font-medium">Pending</span>
                </div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs opacity-90 font-medium">Rejected</span>
                </div>
                <div className="text-2xl font-bold">1</div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-800">Quick Filters</span>
            </div>
            <button onClick={clearFilters} className="text-blue-600 text-sm font-medium hover:text-blue-700">Clear All</button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by NOC ID or Tank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="District"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Enhanced Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">My NOC Applications</h3>
              <span className="text-sm text-gray-600">{filteredApplications.length} applications found</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">NOC ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Tank Details</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Activities</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app, index) => (
                  <tr key={app.id} className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-blue-600">{app.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.tankName}</div>
                        <div className="text-xs text-gray-600">{app.location}</div>
                        <div className="text-xs text-gray-500 mt-1">{app.department}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {app.activities.map((activity, idx) => (
                          <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded border border-blue-200">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStatusClick(app)}
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(app.status)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {app.status === 'approved' && (
                        <button
                          onClick={() => handleDownload(app.id)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-lg hover:bg-emerald-200 transition-all duration-200"
                          title="Download NOC Certificate"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedTimeline.tankName} - Timeline</h3>
                  <p className="text-blue-100 text-sm">NOC ID: {selectedTimeline.id}</p>
                </div>
                <button
                  onClick={() => setShowTimeline(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {selectedTimeline.timeline.reverse().map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${getTimelineStatusColor(item.status)} mt-1`}></div>
                      {index < selectedTimeline.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-300 ml-1.5 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {getTimelineStatusText(item.status)}
                        </span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString('en-IN')}</p>
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