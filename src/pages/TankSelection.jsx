import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, CheckCircle, Circle, ChevronLeft, ChevronRight, Upload, CheckSquare, Square } from 'lucide-react';

// Tank Selection Component
function TankSelection({ onTanksSelected, selectedTanks, setSelectedTanks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    district: '',
    taluk: '',
    block: '',
    village: '',
    department: '',
    searchTerm: ''
  });

  const tanksPerPage = 10;

  // Dropdown options
  const districts = ['Chennai', 'Vellore', 'Madurai', 'Erode', 'Thanjavur'];
  const taluks = ['Tambaram', 'Egmore', 'Gudiyatham', 'Usilampatti', 'Bhavani', 'Kumbakonam'];
  const blocks = ['Tambaram', 'Egmore', 'Gudiyatham', 'Usilampatti', 'Bhavani', 'Kumbakonam'];
  const villages = ['Kamakshi Village', 'Cooum Village', 'Palar Village', 'Vaigai Village', 'Bhavani Village', 'Cauvery Village'];

  // Sample tanks data
  const tanksData = [
    {
      id: 'T001', name: 'Palar Tank', location: 'Vellore', taluk: 'Gudiyatham', block: 'Gudiyatham', village: 'Palar Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority'
    },
    {
      id: 'T002', name: 'Kamakshi Tank', location: 'Chennai', taluk: 'Tambaram', block: 'Tambaram', village: 'Kamakshi Village', ownershipName: 'Greater Chennai Corporation', department: 'GCC', status: 'Priority'
    },
    {
      id: 'T003', name: 'Vaigai Tank', location: 'Madurai', taluk: 'Usilampatti', block: 'Usilampatti', village: 'Vaigai Village', ownershipName: 'Revenue Department', department: 'RD', status: 'Priority'
    },
    {
      id: 'T004', name: 'Cooum Tank', location: 'Chennai', taluk: 'Egmore', block: 'Egmore', village: 'Cooum Village', ownershipName: 'Forest Department', department: 'Forest', status: 'Priority'
    },
    {
      id: 'T005', name: 'Bhavani Tank', location: 'Erode', taluk: 'Bhavani', block: 'Bhavani', village: 'Bhavani Village', ownershipName: 'Highways & Rural Development', department: 'HR & CE', status: 'Priority'
    },
    {
      id: 'T006', name: 'Cauvery Tank', location: 'Thanjavur', taluk: 'Kumbakonam', block: 'Kumbakonam', village: 'Cauvery Village', ownershipName: 'Directorate of Town Planning', department: 'DTP', status: 'Priority'
    },
    {
      id: 'T007', name: 'Adyar Tank', location: 'Chennai', taluk: 'Tambaram', block: 'Tambaram', village: 'Kamakshi Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority'
    },
    {
      id: 'T008', name: 'Ponnaiyar Tank', location: 'Vellore', taluk: 'Gudiyatham', block: 'Gudiyatham', village: 'Palar Village', ownershipName: 'Revenue Department', department: 'RD', status: 'Priority'
    }
  ];

  // Filter tanks based on search and filters
  const filteredTanks = tanksData.filter(tank => {
    const matchesSearch = filters.searchTerm === '' || 
      tank.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      tank.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesDistrict = filters.district === '' || 
      tank.location.toLowerCase().includes(filters.district.toLowerCase());
    
    const matchesTaluk = filters.taluk === '' || 
      tank.taluk.toLowerCase().includes(filters.taluk.toLowerCase());
    
    const matchesBlock = filters.block === '' || 
      tank.block.toLowerCase().includes(filters.block.toLowerCase());
    
    const matchesVillage = filters.village === '' || 
      tank.village.toLowerCase().includes(filters.village.toLowerCase());

    const matchesDepartment = filters.department === '' || 
      tank.department === filters.department;

    return matchesSearch && matchesDistrict && matchesTaluk && matchesBlock && matchesVillage && matchesDepartment;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTanks.length / tanksPerPage);
  const startIndex = (currentPage - 1) * tanksPerPage;
  const endIndex = startIndex + tanksPerPage;
  const currentTanks = filteredTanks.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleTankSelection = (tank) => {
    if (selectedTanks.find(t => t.id === tank.id)) {
      setSelectedTanks(selectedTanks.filter(t => t.id !== tank.id));
    } else {
      setSelectedTanks([...selectedTanks, tank]);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      district: '',
      taluk: '',
      block: '',
      village: '',
      department: '',
      searchTerm: ''
    });
  };

  const handleNext = () => {
    if (selectedTanks.length === 0) {
      alert('Please select at least one tank');
      return;
    }
    onTanksSelected();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getDepartmentColor = (department) => {
    switch(department) {
      case 'WRD': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'RD': return 'bg-green-100 text-green-700 border-green-200';
      case 'GCC': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Forest': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'HR & CE': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'DTP': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'DMA': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center py-3">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">NGO Dashboard</span>
              <span className="text-gray-300">→</span>
              <span className="text-blue-600 font-medium">Tank Selection</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Clean Page Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Choose tanks for your NOC application</h1>
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredTanks.length)} of {filteredTanks.length} tanks
          </p>
        </div>

        {/* Compact Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-800">Filters</span>
            </div>
            <button 
              onClick={clearFilters}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-6 gap-3">
            <select value={filters.district} onChange={(e) => handleFilterChange('district', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Districts</option>
              {districts.map(district => (<option key={district} value={district}>{district}</option>))}
            </select>
            <select value={filters.taluk} onChange={(e) => handleFilterChange('taluk', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Taluks</option>
              {taluks.map(taluk => (<option key={taluk} value={taluk}>{taluk}</option>))}
            </select>
            <select value={filters.block} onChange={(e) => handleFilterChange('block', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Blocks</option>
              {blocks.map(block => (<option key={block} value={block}>{block}</option>))}
            </select>
            <select value={filters.village} onChange={(e) => handleFilterChange('village', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Villages</option>
              {villages.map(village => (<option key={village} value={village}>{village}</option>))}
            </select>
            <select value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Departments</option>
              <option value="WRD">WRD</option>
              <option value="RD">RD</option>
              <option value="GCC">GCC</option>
              <option value="Forest">Forest</option>
              <option value="HR & CE">HR & CE</option>
              <option value="DTP">DTP</option>
              <option value="DMA">DMA</option>
            </select>
            <div className="relative">
              <input type="text" placeholder="Search tanks..." value={filters.searchTerm} onChange={(e) => handleFilterChange('searchTerm', e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Selected Tanks Summary */}
        {selectedTanks.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{selectedTanks.length}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Selected ({selectedTanks.length}) tanks</h3>
                  <p className="text-sm text-blue-700">{selectedTanks.slice(0, 3).map(tank => tank.name).join(', ')}{selectedTanks.length > 3 && ` +${selectedTanks.length - 3} more`}</p>
                </div>
              </div>
              <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">Continue</button>
            </div>
          </div>
        )}

        {/* Tank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {currentTanks.map((tank) => {
            const isSelected = selectedTanks.find(t => t.id === tank.id);
            return (
              <div key={tank.id} onClick={() => handleTankSelection(tank)} className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 group ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'} hover:border-gray-300`}>
                <div className={`p-2 border-b border-gray-100 ${isSelected ? 'bg-blue-50' : tank.department === 'WRD' ? 'bg-blue-100' : tank.department === 'RD' ? 'bg-green-100' : tank.department === 'GCC' ? 'bg-purple-100' : tank.department === 'Forest' ? 'bg-emerald-100' : tank.department === 'HR & CE' ? 'bg-orange-100' : tank.department === 'DTP' ? 'bg-indigo-100' : tank.department === 'DMA' ? 'bg-red-100' : 'bg-gray-100'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {isSelected ? (<CheckCircle className="w-5 h-5 text-blue-600" />) : (<Circle className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{tank.name}</h3>
                        <p className="text-xs text-gray-600">{tank.location}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full border bg-red-100 text-black-700 border-red-200">{tank.status}</span>
                  </div>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div><span className="text-gray-500 block text-xs">Taluk</span><span className="font-medium text-gray-900">{tank.taluk}</span></div>
                    <div><span className="text-gray-500 block text-xs">Block</span><span className="font-medium text-gray-900">{tank.block}</span></div>
                    <div className="col-span-2"><span className="text-gray-500 block text-xs">Village</span><span className="font-medium text-gray-900">{tank.village}</span></div>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-500 text-xs block mb-1">Ownership</span>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 text-xs">{tank.ownershipName}</span>
                      <span className={`text-xs px-2 py-1 rounded border font-medium ${getDepartmentColor(tank.department)}`}>{tank.department}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Page {currentPage} of {totalPages}</span><span>•</span><span>{filteredTanks.length} total tanks</span>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /><span>Previous</span>
              </button>
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (<button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}`}>{page}</button>);
                })}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Next</span><ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTanks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No tanks found</div>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  );
}

// NOC Details Component - Per Tank Configuration
function NOCDetails({ selectedTanks, onBack }) {
  const [tankConfigs, setTankConfigs] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Activities organized by categories with sub-activities
  const activityCategories = [
    {
      id: 1,
      title: 'Desilting/ Deepening',
      subActivities: [
        'Strengthening of bund',
        'Desilting of channel',
        'Formation of island',
        'Excavation of channels'
      ]
    },
    {
      id: 2,
      title: 'Repair/ rehabilitation of hydraulic structure',
      subActivities: [
        'Surplus weir',
        'Sluice -inlet/outlet'
      ]
    },
    {
      id: 3,
      title: 'Removal of obstruction in water bodies',
      subActivities: [
        'Jungle clearance',
        'Removal of water hyacinth/weeds',
        'Removal of garbage / solid waste materials'
      ]
    },
    {
      id: 4,
      title: 'Infrastructure Arrangements',
      subActivities: [
        'Solar lights',
        'Fencing',
        'Watch towers',
        'Plantation',
        'Walking track',
        'Sitting benches',
        'Bathing ghats',
        'Name picking/investment',
        'Watchman shed',
        'Name board/ Sign board',
        'Floating wetland',
        'Park formation'
      ]
    },
    {
      id: 5,
      title: 'Quality checking of water',
      subActivities: []
    },
    {
      id: 6,
      title: 'Five years AMC by any organization',
      subActivities: []
    }
  ];

  const handleActivityToggle = (tankId, categoryId, activity = null) => {
    setTankConfigs(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        selectedActivities: {
          ...prev[tankId]?.selectedActivities,
          [categoryId]: activity 
            ? (prev[tankId]?.selectedActivities?.[categoryId]?.includes(activity)
                ? prev[tankId].selectedActivities[categoryId].filter(a => a !== activity)
                : [...(prev[tankId]?.selectedActivities?.[categoryId] || []), activity])
            : !(prev[tankId]?.selectedActivities?.[categoryId] === true)
        }
      }
    }));
  };

  const handleAmountChange = (tankId, amount) => {
    setTankConfigs(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        lumpsumAmount: amount
      }
    }));
  };

  const handleFileUpload = (tankId, file, fileType) => {
    setTankConfigs(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        [fileType]: file
      }
    }));
  };

  const handleSubmit = () => {
    // Validate all tanks have required data
    for (const tank of selectedTanks) {
      const config = tankConfigs[tank.id];
      if (!config?.selectedActivities || Object.keys(config.selectedActivities).length === 0) {
        alert(`Please select at least one activity for ${tank.name}`);
        return;
      }
      if (!config?.lumpsumAmount || config.lumpsumAmount <= 0) {
        alert(`Please enter a valid amount for ${tank.name}`);
        return;
      }
      if (!config?.beforePhoto) {
        alert(`Please upload before photo for ${tank.name}`);
        return;
      }
      if (!config?.projectProposal) {
        alert(`Please upload project proposal for ${tank.name}`);
        return;
      }
    }
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center py-3">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mr-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">NGO Dashboard</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">Tank Selection</span>
              <span className="text-gray-300">→</span>
              <span className="text-blue-600 font-medium">NOC Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>

            <p className="text-gray-600">Complete the form for each selected tank</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Tanks to configure</span>
            <div className="text-xl font-bold text-blue-600">{selectedTanks.length}</div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Per Tank Configuration */}
          {selectedTanks.map((tank, index) => (
            <div key={tank.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tank Header */}
              <div className={`p-4 ${tank.department === 'WRD' ? 'bg-blue-100' : tank.department === 'RD' ? 'bg-green-100' : tank.department === 'GCC' ? 'bg-purple-100' : tank.department === 'Forest' ? 'bg-emerald-100' : tank.department === 'HR & CE' ? 'bg-orange-100' : tank.department === 'DTP' ? 'bg-indigo-100' : tank.department === 'DMA' ? 'bg-red-100' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Tank #{index + 1}: {tank.name}</h3>
                    <p className="text-sm text-gray-600">{tank.location} - {tank.department}</p>
                  </div>
                  <span className="text-sm text-gray-600">ID: {tank.id}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Activity Categories in Single Row */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Select Activities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {activityCategories.map((category) => (
                      <div key={category.id} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-200 h-80 flex flex-col">
                        <div className="flex flex-col h-full">
                          {/* Category Header */}
                          <div className="border-b border-gray-100 pb-2 mb-3">
                            <h5 className="font-semibold text-gray-800 text-sm leading-tight">{category.title}</h5>
                          </div>
                          
                          {/* Sub-activities or main category checkbox */}
                          <div className="flex-1 overflow-y-auto">
                            {category.subActivities.length > 0 ? (
                              <div className="space-y-1">
                                {/* Chunk sub-activities into groups of 3 for better display */}
                                {category.subActivities.map((subActivity, index) => {
                                  const isSelected = tankConfigs[tank.id]?.selectedActivities?.[category.id]?.includes(subActivity);
                                  return (
                                    <div 
                                      key={subActivity}
                                      onClick={() => handleActivityToggle(tank.id, category.id, subActivity)}
                                      className={`flex items-start space-x-2 p-1.5 rounded cursor-pointer transition-colors ${
                                        isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                      } ${index % 3 === 2 ? 'mb-2' : ''}`}
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                      ) : (
                                        <Square className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                      )}
                                      <span className={`text-xs leading-tight ${
                                        isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'
                                      }`}>
                                        {subActivity}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div 
                                onClick={() => handleActivityToggle(tank.id, category.id)}
                                className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                                  tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                }`}
                              >
                                {tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? (
                                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                )}
                                <span className={`text-xs ${
                                  tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? 'text-blue-900 font-medium' : 'text-gray-700'
                                }`}>
                                  Select this category
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amount and File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Lumpsum Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lumpsum Amount (₹)</label>
                    <input
                      type="number"
                      value={tankConfigs[tank.id]?.lumpsumAmount || ''}
                      onChange={(e) => handleAmountChange(tank.id, e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  {/* Before Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Before Photo *</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                      {tankConfigs[tank.id]?.beforePhoto ? (
                        <div className="space-y-1">
                          <div className="text-green-600 font-medium text-xs">{tankConfigs[tank.id].beforePhoto.name}</div>
                          <div className="text-xs text-gray-500">Photo uploaded</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-5 h-5 text-blue-400 mx-auto" />
                          <div className="text-gray-600 text-xs">Upload Photo</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(tank.id, e.target.files[0], 'beforePhoto')}
                        className="hidden"
                        id={`before-photo-${tank.id}`}
                      />
                      <label htmlFor={`before-photo-${tank.id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-blue-300 rounded text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors">
                        Choose Photo
                      </label>
                    </div>
                  </div>

                  {/* KML File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">KML File (Optional)</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                      {tankConfigs[tank.id]?.kmlFile ? (
                        <div className="space-y-1">
                          <div className="text-green-600 font-medium text-xs">{tankConfigs[tank.id].kmlFile.name}</div>
                          <div className="text-xs text-gray-500">File uploaded</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-5 h-5 text-blue-400 mx-auto" />
                          <div className="text-gray-600 text-xs">Upload KML</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".kml"
                        onChange={(e) => handleFileUpload(tank.id, e.target.files[0], 'kmlFile')}
                        className="hidden"
                        id={`kml-upload-${tank.id}`}
                      />
                      <label htmlFor={`kml-upload-${tank.id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-blue-300 rounded text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors">
                        Choose File
                      </label>
                    </div>
                  </div>

                  {/* Project Proposal Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Proposal *</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                      {tankConfigs[tank.id]?.projectProposal ? (
                        <div className="space-y-1">
                          <div className="text-green-600 font-medium text-xs">{tankConfigs[tank.id].projectProposal.name}</div>
                          <div className="text-xs text-gray-500">File uploaded</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-5 h-5 text-blue-400 mx-auto" />
                          <div className="text-gray-600 text-xs">Upload Proposal</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(tank.id, e.target.files[0], 'projectProposal')}
                        className="hidden"
                        id={`proposal-upload-${tank.id}`}
                      />
                      <label htmlFor={`proposal-upload-${tank.id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-blue-300 rounded text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors">
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tank Summary */}
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                  <strong>Summary:</strong> {Object.keys(tankConfigs[tank.id]?.selectedActivities || {}).length} activity categories selected, 
               
                </div>
              </div>
            </div>
          ))}

          {/* Global Submit Button */}
          <div className="text-center pt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit All NOC Applications ({selectedTanks.length} tanks)
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform transition-all">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 mb-6">All {selectedTanks.length} NOC requests have been submitted successfully.</p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.href = '/dashboard';
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
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

// Parent Component that manages the flow
export default function NOCRequestFlow() {
  const [currentStep, setCurrentStep] = useState('selection');
  const [selectedTanks, setSelectedTanks] = useState([]);

  const handleTanksSelected = () => {
    setCurrentStep('details');
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  return (
    <div>
      {currentStep === 'selection' && (
        <TankSelection 
          onTanksSelected={handleTanksSelected}
          selectedTanks={selectedTanks}
          setSelectedTanks={setSelectedTanks}
        />
      )}
      {currentStep === 'details' && (
        <NOCDetails 
          selectedTanks={selectedTanks}
          onBack={handleBackToSelection}
        />
      )}
    </div>
  );
}