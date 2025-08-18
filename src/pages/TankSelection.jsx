import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, CheckCircle, Circle, ChevronLeft, ChevronRight, Upload, CheckSquare, Square } from 'lucide-react';

// Tank Selection Component
function TankSelection({ onTanksSelected, selectedTanks, setSelectedTanks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [areaType, setAreaType] = useState('rural'); // 'urban' or 'rural'
  const [filters, setFilters] = useState({
    district: '',
    // Rural filters
    block: '',
    panchayat: '',
    village: '',
    // Urban filters
    ulbType: '',
    ulbName: '',
    zone: '',
    ward: '',
    // Common
    department: '',
    searchTerm: ''
  });

  const tanksPerPage = 10;

  // Dropdown options
  const districts = ['Chennai', 'Vellore', 'Madurai', 'Erode', 'Thanjavur', 'Coimbatore', 'Salem', 'Trichy'];
  
  // Rural options
  const ruralBlocks = {
    'Chennai': ['Tambaram', 'Pallavaram', 'Alandur'],
    'Vellore': ['Gudiyatham', 'Vaniyambadi', 'Ambur'],
    'Madurai': ['Usilampatti', 'Melur', 'Vadipatti'],
    'Erode': ['Bhavani', 'Perundurai', 'Kodumudi'],
    'Thanjavur': ['Kumbakonam', 'Papanasam', 'Thiruvidaimarudur'],
    'Coimbatore': ['Pollachi', 'Valparai', 'Udumalaipettai'],
    'Salem': ['Attur', 'Omalur', 'Sankagiri'],
    'Trichy': ['Srirangam', 'Lalgudi', 'Musiri']
  };

  const ruralPanchayats = {
    'Tambaram': ['Tambaram East', 'Tambaram West', 'Selaiyur'],
    'Gudiyatham': ['Gudiyatham Town', 'Melakottaiyur', 'Palar'],
    'Usilampatti': ['Usilampatti Town', 'Vaigai', 'Sholavandan'],
    'Bhavani': ['Bhavani Town', 'Amaravathi', 'Noyyal'],
    'Kumbakonam': ['Kumbakonam Town', 'Cauvery', 'Kollidam'],
    'Pollachi': ['Pollachi Town', 'Noyyal Basin', 'Aliyar'],
    'Attur': ['Attur Town', 'Mettur', 'Krishnagiri'],
    'Srirangam': ['Srirangam Town', 'Kallanai', 'Kollidam']
  };

  const ruralVillages = {
    'Tambaram East': ['Kamakshi Village', 'Selaiyur Village', 'Chitlapakkam Village'],
    'Gudiyatham Town': ['Palar Village', 'Vellar Village', 'Gadilam Village'],
    'Usilampatti Town': ['Vaigai Village', 'Periyar Village', 'Sankarankovil Village'],
    'Bhavani Town': ['Bhavani Village', 'Amaravathi Village', 'Bhavanisagar Village'],
    'Kumbakonam Town': ['Cauvery Village', 'Kollidam Village', 'Kallanai Village'],
    'Pollachi Town': ['Noyyal Village', 'Aliyar Village', 'Siruvani Village'],
    'Attur Town': ['Mettur Village', 'Salem Village', 'Krishnagiri Village'],
    'Srirangam Town': ['Trichy Village', 'Cauvery Village', 'Kallanai Village']
  };

  // Urban options
  const ulbTypes = ['Corporation', 'Municipality', 'Town Panchayat'];
  
  const ulbNames = {
    'Chennai': {
      'Corporation': ['Greater Chennai Corporation'],
      'Municipality': ['Tambaram Municipality', 'Avadi Municipality'],
      'Town Panchayat': ['Pallavaram', 'Chromepet']
    },
    'Vellore': {
      'Corporation': ['Vellore Corporation'],
      'Municipality': ['Gudiyatham Municipality', 'Vaniyambadi Municipality'],
      'Town Panchayat': ['Ambur', 'Tirupattur']
    },
    'Madurai': {
      'Corporation': ['Madurai Corporation'],
      'Municipality': ['Usilampatti Municipality', 'Melur Municipality'],
      'Town Panchayat': ['Vadipatti', 'Sholavandan']
    },
    'Coimbatore': {
      'Corporation': ['Coimbatore Corporation'],
      'Municipality': ['Pollachi Municipality', 'Valparai Municipality'],
      'Town Panchayat': ['Udumalaipettai', 'Mettupalayam']
    }
  };

  const zones = {
    'Greater Chennai Corporation': ['Zone 1 - Anna Nagar', 'Zone 2 - Teynampet', 'Zone 3 - Kodambakkam', 'Zone 4 - Tondiarpet'],
    'Vellore Corporation': ['Zone A - Fort', 'Zone B - Katpadi', 'Zone C - Gandhi Nagar'],
    'Madurai Corporation': ['Zone 1 - Central', 'Zone 2 - Anna Nagar', 'Zone 3 - KK Nagar'],
    'Coimbatore Corporation': ['Zone 1 - Central', 'Zone 2 - East', 'Zone 3 - West', 'Zone 4 - North']
  };

  const wards = {
    'Zone 1 - Anna Nagar': ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'],
    'Zone 2 - Teynampet': ['Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10'],
    'Zone 3 - Kodambakkam': ['Ward 11', 'Ward 12', 'Ward 13', 'Ward 14', 'Ward 15'],
    'Zone 4 - Tondiarpet': ['Ward 16', 'Ward 17', 'Ward 18', 'Ward 19', 'Ward 20'],
    'Zone A - Fort': ['Ward A1', 'Ward A2', 'Ward A3', 'Ward A4'],
    'Zone B - Katpadi': ['Ward B1', 'Ward B2', 'Ward B3', 'Ward B4'],
    'Zone C - Gandhi Nagar': ['Ward C1', 'Ward C2', 'Ward C3', 'Ward C4'],
    'Zone 1 - Central': ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'],
    'Zone 2 - Anna Nagar': ['Ward 5', 'Ward 6', 'Ward 7', 'Ward 8'],
    'Zone 3 - KK Nagar': ['Ward 9', 'Ward 10', 'Ward 11', 'Ward 12'],
    'Zone 2 - East': ['Ward E1', 'Ward E2', 'Ward E3', 'Ward E4'],
    'Zone 3 - West': ['Ward W1', 'Ward W2', 'Ward W3', 'Ward W4'],
    'Zone 4 - North': ['Ward N1', 'Ward N2', 'Ward N3', 'Ward N4']
  };

  // Updated departments list
  const departments = ['GCC', 'DTP', 'WRD', 'DMA', 'Forest', 'HR & CE'];

  // Department color mapping
  const departmentColors = {
    'GCC': 'bg-blue-50',
    'DTP': 'bg-green-50', 
    'WRD': 'bg-cyan-50',
    'DMA': 'bg-orange-50',
    'Forest': 'bg-emerald-50',
    'HR & CE': 'bg-purple-50'
  };

  // Expanded tanks data with updated departments
  const tanksData = [
    { id: 'T001', name: 'Palar Tank', areaType: 'rural', location: 'Vellore', block: 'Gudiyatham', panchayat: 'Gudiyatham Town', village: 'Palar Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority' },
    { id: 'T002', name: 'Kamakshi Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 1 - Anna Nagar', ward: 'Ward 1', ownershipName: 'Greater Chennai Corporation', department: 'GCC', status: 'Priority' },
    { id: 'T003', name: 'Vaigai Tank', areaType: 'rural', location: 'Madurai', block: 'Usilampatti', panchayat: 'Usilampatti Town', village: 'Vaigai Village', ownershipName: 'District Town Panchayat', department: 'DTP', status: 'Priority' },
    { id: 'T004', name: 'Cooum Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 2 - Teynampet', ward: 'Ward 6', ownershipName: 'Forest Department', department: 'Forest', status: 'Normal' },
    { id: 'T005', name: 'Bhavani Tank', areaType: 'rural', location: 'Erode', block: 'Bhavani', panchayat: 'Bhavani Town', village: 'Bhavani Village', ownershipName: 'District Town Panchayat', department: 'DTP', status: 'Priority' },
    { id: 'T006', name: 'Cauvery Tank', areaType: 'rural', location: 'Thanjavur', block: 'Kumbakonam', panchayat: 'Kumbakonam Town', village: 'Cauvery Village', ownershipName: 'Disaster Management Authority', department: 'DMA', status: 'Normal' },
    { id: 'T007', name: 'Adyar Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 3 - Kodambakkam', ward: 'Ward 11', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority' },
    { id: 'T008', name: 'Ponnaiyar Tank', areaType: 'rural', location: 'Vellore', block: 'Gudiyatham', panchayat: 'Gudiyatham Town', village: 'Palar Village', ownershipName: 'HR & CE Department', department: 'HR & CE', status: 'Normal' },
    { id: 'T009', name: 'Noyyal Tank', areaType: 'rural', location: 'Coimbatore', block: 'Pollachi', panchayat: 'Pollachi Town', village: 'Noyyal Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority' },
    { id: 'T010', name: 'Amaravathi Tank', areaType: 'rural', location: 'Erode', block: 'Bhavani', panchayat: 'Bhavani Town', village: 'Amaravathi Village', ownershipName: 'District Town Panchayat', department: 'DTP', status: 'Normal' },
    { id: 'T011', name: 'Kollidam Tank', areaType: 'rural', location: 'Thanjavur', block: 'Kumbakonam', panchayat: 'Kumbakonam Town', village: 'Kollidam Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority' },
    { id: 'T012', name: 'Salem Tank', areaType: 'rural', location: 'Salem', block: 'Attur', panchayat: 'Attur Town', village: 'Salem Village', ownershipName: 'Forest Department', department: 'Forest', status: 'Normal' },
    { id: 'T013', name: 'Trichy Tank', areaType: 'rural', location: 'Trichy', block: 'Srirangam', panchayat: 'Srirangam Town', village: 'Trichy Village', ownershipName: 'District Town Panchayat', department: 'DTP', status: 'Priority' },
    { id: 'T014', name: 'Vellar Tank', areaType: 'rural', location: 'Vellore', block: 'Gudiyatham', panchayat: 'Gudiyatham Town', village: 'Palar Village', ownershipName: 'HR & CE Department', department: 'HR & CE', status: 'Normal' },
    { id: 'T015', name: 'Korttalaiyar Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 4 - Tondiarpet', ward: 'Ward 16', ownershipName: 'Greater Chennai Corporation', department: 'GCC', status: 'Priority' },
    { id: 'T016', name: 'Thamirabarani Tank', areaType: 'rural', location: 'Madurai', block: 'Usilampatti', panchayat: 'Usilampatti Town', village: 'Vaigai Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Normal' },
    { id: 'T017', name: 'Gadilam Tank', areaType: 'rural', location: 'Vellore', block: 'Gudiyatham', panchayat: 'Gudiyatham Town', village: 'Palar Village', ownershipName: 'Disaster Management Authority', department: 'DMA', status: 'Priority' },
    { id: 'T018', name: 'Buckingham Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 1 - Anna Nagar', ward: 'Ward 2', ownershipName: 'Greater Chennai Corporation', department: 'GCC', status: 'Normal' },
    { id: 'T019', name: 'Siruvani Tank', areaType: 'rural', location: 'Coimbatore', block: 'Pollachi', panchayat: 'Pollachi Town', village: 'Noyyal Village', ownershipName: 'Forest Department', department: 'Forest', status: 'Priority' },
    { id: 'T020', name: 'Mettur Tank', areaType: 'rural', location: 'Salem', block: 'Attur', panchayat: 'Attur Town', village: 'Mettur Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Normal' },
    { id: 'T021', name: 'Krishnagiri Tank', areaType: 'rural', location: 'Salem', block: 'Attur', panchayat: 'Attur Town', village: 'Krishnagiri Village', ownershipName: 'HR & CE Department', department: 'HR & CE', status: 'Priority' },
    { id: 'T022', name: 'Kallanai Tank', areaType: 'rural', location: 'Trichy', block: 'Srirangam', panchayat: 'Srirangam Town', village: 'Kallanai Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Normal' },
    { id: 'T023', name: 'Periyar Tank', areaType: 'rural', location: 'Madurai', block: 'Usilampatti', panchayat: 'Usilampatti Town', village: 'Vaigai Village', ownershipName: 'Forest Department', department: 'Forest', status: 'Priority' },
    { id: 'T024', name: 'Sankarankovil Tank', areaType: 'rural', location: 'Madurai', block: 'Usilampatti', panchayat: 'Usilampatti Town', village: 'Vaigai Village', ownershipName: 'Disaster Management Authority', department: 'DMA', status: 'Normal' },
    { id: 'T025', name: 'Aliyar Tank', areaType: 'rural', location: 'Coimbatore', block: 'Pollachi', panchayat: 'Pollachi Town', village: 'Aliyar Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Priority' },
    { id: 'T026', name: 'Bhavanisagar Tank', areaType: 'rural', location: 'Erode', block: 'Bhavani', panchayat: 'Bhavani Town', village: 'Bhavanisagar Village', ownershipName: 'Water Resources Department', department: 'WRD', status: 'Normal' },
    { id: 'T027', name: 'Stanley Tank', areaType: 'urban', location: 'Chennai', ulbType: 'Corporation', ulbName: 'Greater Chennai Corporation', zone: 'Zone 2 - Teynampet', ward: 'Ward 7', ownershipName: 'Greater Chennai Corporation', department: 'GCC', status: 'Priority' }
  ];

const handleAreaTypeChange = (type) => {
    setAreaType(type);
    // Reset all filters when switching area type
    setFilters({
      district: '',
      block: '',
      panchayat: '',
      village: '',
      ulbType: '',
      ulbName: '',
      zone: '',
      ward: '',
      department: '',
      searchTerm: ''
    });
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    
    // Reset dependent filters when parent changes
    if (field === 'district') {
      newFilters.block = '';
      newFilters.panchayat = '';
      newFilters.village = '';
      newFilters.ulbType = '';
      newFilters.ulbName = '';
      newFilters.zone = '';
      newFilters.ward = '';
    } else if (field === 'block') {
      newFilters.panchayat = '';
      newFilters.village = '';
    } else if (field === 'panchayat') {
      newFilters.village = '';
    } else if (field === 'ulbType') {
      newFilters.ulbName = '';
      newFilters.zone = '';
      newFilters.ward = '';
    } else if (field === 'ulbName') {
      newFilters.zone = '';
      newFilters.ward = '';
    } else if (field === 'zone') {
      newFilters.ward = '';
    }
    
    setFilters(newFilters);
  };

const clearFilters = () => {
 setFilters({
   district: '',
   block: '',
   panchayat: '',
   village: '',
   ulbType: '',
   ulbName: '',
   zone: '',
   ward: '',
   department: '',
   searchTerm: ''
 });
};

// Filter tanks based on search, area type and hierarchical filters
const filteredTanks = tanksData.filter(tank => {
 // Filter by area type first
 if (tank.areaType !== areaType) return false;

 const matchesSearch = filters.searchTerm === '' || 
   tank.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
   tank.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
   
 const matchesDistrict = filters.district === '' || 
   tank.location.toLowerCase().includes(filters.district.toLowerCase());

 const matchesDepartment = filters.department === '' || 
   tank.department === filters.department;

 if (areaType === 'rural') {
   const matchesBlock = filters.block === '' || 
     tank.block?.toLowerCase().includes(filters.block.toLowerCase());
     
   const matchesPanchayat = filters.panchayat === '' || 
     tank.panchayat?.toLowerCase().includes(filters.panchayat.toLowerCase());
     
   const matchesVillage = filters.village === '' || 
     tank.village?.toLowerCase().includes(filters.village.toLowerCase());

   return matchesSearch && matchesDistrict && matchesBlock && matchesPanchayat && matchesVillage && matchesDepartment;
 } else {
   // Urban filters
   const matchesUlbType = filters.ulbType === '' || 
     tank.ulbType === filters.ulbType;
     
   const matchesUlbName = filters.ulbName === '' || 
     tank.ulbName === filters.ulbName;
     
   const matchesZone = filters.zone === '' || 
     tank.zone === filters.zone;
     
   const matchesWard = filters.ward === '' || 
     tank.ward === filters.ward;

   return matchesSearch && matchesDistrict && matchesUlbType && matchesUlbName && matchesZone && matchesWard && matchesDepartment;
 }
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

  // Get available options based on current selections
  const getAvailableBlocks = () => {
    return filters.district ? (ruralBlocks[filters.district] || []) : [];
  };

  const getAvailablePanchayats = () => {
    return filters.block ? (ruralPanchayats[filters.block] || []) : [];
  };

  const getAvailableVillages = () => {
    return filters.panchayat ? (ruralVillages[filters.panchayat] || []) : [];
  };

  const getAvailableUlbNames = () => {
    if (filters.district && filters.ulbType) {
      return ulbNames[filters.district]?.[filters.ulbType] || [];
    }
    return [];
  };

  const getAvailableZones = () => {
    return filters.ulbName ? (zones[filters.ulbName] || []) : [];
  };

  const getAvailableWards = () => {
    return filters.zone ? (wards[filters.zone] || []) : [];
  };

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter',sans-serif] pt-16 sm:pt-20">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center py-3">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Tamil Nadu NOC Portal</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">NGO Dashboard</span>
              <span className="text-gray-300">→</span>
              <span className="text-indigo-600 font-medium">Tank Selection</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
        {/* Clean Page Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Choose tanks for your NOC application</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredTanks.length)} of {filteredTanks.length} tanks
          </p>
        </div>

  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg shadow-sm p-4 mb-4 border border-teal-200">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-3 lg:space-y-0">
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-indigo-600" />
        <span className="font-semibold text-gray-800">Filters</span>
      </div>
      
      {/* Area Type Selection inline with Filters */}
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-800">Area Type:</span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="areaType"
              value="rural"
              checked={areaType === 'rural'}
              onChange={(e) => handleAreaTypeChange(e.target.value)}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-900">Rural</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="areaType"
              value="urban"
              checked={areaType === 'urban'}
              onChange={(e) => handleAreaTypeChange(e.target.value)}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-900">Urban</span>
          </label>
        </div>
      </div>
    </div>
    
    <button 
      onClick={clearFilters}
      className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors self-start lg:self-auto"
    >
      Clear All
    </button>
  </div>

          {areaType === 'rural' ? (
            /* Rural Filters */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              <select value={filters.district} onChange={(e) => handleFilterChange('district', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Districts</option>
                {districts.map(district => (<option key={district} value={district}>{district}</option>))}
              </select>
              <select value={filters.block} onChange={(e) => handleFilterChange('block', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.district}>
                <option value="">All Blocks</option>
                {getAvailableBlocks().map(block => (<option key={block} value={block}>{block}</option>))}
              </select>
              <select value={filters.panchayat} onChange={(e) => handleFilterChange('panchayat', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.block}>
                <option value="">All Panchayat Villages</option>
                {getAvailablePanchayats().map(panchayat => (<option key={panchayat} value={panchayat}>{panchayat}</option>))}
              </select>
         
              <select value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Departments</option>
                {departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}
              </select>
              <div className="relative">
                <input type="text" placeholder="Search tanks..." value={filters.searchTerm} onChange={(e) => handleFilterChange('searchTerm', e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          ) : (
            /* Urban Filters */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3">
              <select value={filters.district} onChange={(e) => handleFilterChange('district', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Districts</option>
                {districts.map(district => (<option key={district} value={district}>{district}</option>))}
              </select>
              <select value={filters.ulbType} onChange={(e) => handleFilterChange('ulbType', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.district}>
                <option value="">All ULB Types</option>
                {ulbTypes.map(type => (<option key={type} value={type}>{type}</option>))}
              </select>
              <select value={filters.ulbName} onChange={(e) => handleFilterChange('ulbName', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.ulbType}>
                <option value="">All ULB Names</option>
                {getAvailableUlbNames().map(name => (<option key={name} value={name}>{name}</option>))}
              </select>
              <select value={filters.zone} onChange={(e) => handleFilterChange('zone', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.ulbName}>
                <option value="">All Zones</option>
                {getAvailableZones().map(zone => (<option key={zone} value={zone}>{zone}</option>))}
              </select>
              <select value={filters.ward} onChange={(e) => handleFilterChange('ward', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={!filters.zone}>
                <option value="">All Wards</option>
                {getAvailableWards().map(ward => (<option key={ward} value={ward}>{ward}</option>))}
              </select>
              <select value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Departments</option>
                {departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}
              </select>
              <div className="relative">
                <input type="text" placeholder="Search tanks..." value={filters.searchTerm} onChange={(e) => handleFilterChange('searchTerm', e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Selected Tanks Summary */}
        {selectedTanks.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-100 border border-indigo-200 rounded-lg p-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{selectedTanks.length}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">Selected ({selectedTanks.length}) tanks</h3>
                  <p className="text-sm text-indigo-700">{selectedTanks.slice(0, 3).map(tank => tank.name).join(', ')}{selectedTanks.length > 3 && ` +${selectedTanks.length - 3} more`}</p>
                </div>
              </div>
              <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">Continue</button>
            </div>
          </div>
        )}

        {/* Tank Cards Grid with Department Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {currentTanks.map((tank) => {
            const isSelected = selectedTanks.find(t => t.id === tank.id);
            const isPriority = tank.status === 'Priority';
            const departmentColor = departmentColors[tank.department] || 'bg-gray-50';
            
return (
  <div key={tank.id} onClick={() => handleTankSelection(tank)} className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 group overflow-hidden ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-100' : isPriority ? 'border-red-500' : 'border-gray-200'} hover:border-gray-300`}>
    {/* Department Color Header extending to district */}
    <div className={`p-4 ${departmentColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">
            {isSelected ? (<CheckCircle className="w-5 h-5 text-indigo-600" />) : (<Circle className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{tank.name}</h3>
            <p className="text-xs text-gray-600 mt-1">{tank.location}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${isPriority ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
          {tank.status}
        </span>
      </div>
    </div>
    
    <div className="p-4">
                  <div className="space-y-2 text-sm">
                    {areaType === 'rural' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Block:</span>
                          <span className="font-medium text-gray-900">{tank.block}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Village:</span>
                          <span className="font-medium text-gray-900">{tank.village}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-500">ULB:</span>
                          <span className="font-medium text-gray-900 text-xs">{tank.ulbName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Ward:</span>
                          <span className="font-medium text-gray-900">{tank.ward}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs">Department:</span>
                        <span className="font-medium text-gray-900 text-xs text-right">{tank.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 text-center sm:text-left">
              <span>Page {currentPage} of {totalPages}</span><span>•</span><span>{filteredTanks.length} total tanks</span>
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /><span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex space-x-1">
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  let page;
                  if (totalPages <= 5) {
                    page = index + 1;
                  } else if (currentPage <= 3) {
                    page = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + index;
                  } else {
                    page = currentPage - 2 + index;
                  }
                  
                  return (<button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}`}>{page}</button>);
                })}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="hidden sm:inline">Next</span><ChevronRight className="w-4 h-4" />
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

const handleFileUpload = (tankId, files, fileType) => {
  if (fileType === 'beforePhoto') {
    // Handle multiple photo uploads
    const validFiles = [];
    const errors = [];
    
    // Check if total files exceed limit
    const currentFiles = tankConfigs[tankId]?.beforePhoto || [];
    const totalFiles = currentFiles.length + files.length;
    
    if (totalFiles > 5) {
      alert(`Maximum 5 photos allowed. You can add ${5 - currentFiles.length} more photos.`);
      return;
    }
    
    // Validate each file
    Array.from(files).forEach(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image file`);
        return;
      }
      
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        errors.push(`${file.name} exceeds 1MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
        return;
      }
      
      validFiles.push(file);
    });
    
    // Show errors if any
    if (errors.length > 0) {
      alert('Upload errors:\n' + errors.join('\n'));
      if (validFiles.length === 0) return;
    }
    
    // Update state with valid files
    setTankConfigs(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        beforePhoto: [...(prev[tankId]?.beforePhoto || []), ...validFiles]
      }
    }));
  } else {
    // Handle single file uploads for other file types
    setTankConfigs(prev => ({
      ...prev,
      [tankId]: {
        ...prev[tankId],
        [fileType]: files
      }
    }));
  }
};
const removePhoto = (tankId, photoIndex) => {
  setTankConfigs(prev => ({
    ...prev,
    [tankId]: {
      ...prev[tankId],
      beforePhoto: prev[tankId]?.beforePhoto?.filter((_, index) => index !== photoIndex) || []
    }
  }));
};
  const handleSubmitClick = () => {
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
if (!config?.beforePhoto || config.beforePhoto.length === 0) {
  alert(`Please upload at least one before photo for ${tank.name}`);
  return;
}
      if (!config?.projectProposal) {
        alert(`Please upload project proposal for ${tank.name}`);
        return;
      }
    }
    
    // Show terms modal
    setShowTermsModal(true);
  };

  const handleFinalSubmit = () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions before submitting');
      return;
    }
    setShowTermsModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen font-['Inter',sans-serif] pt-16 sm:pt-20">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
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
              <span className="text-indigo-600 font-medium">NOC Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NOC Application Details</h1>
            <p className="text-gray-600">Complete the form for each selected tank</p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-sm text-gray-500">Tanks to configure</span>
            <div className="text-xl font-bold text-indigo-600">{selectedTanks.length}</div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Per Tank Configuration */}
          {selectedTanks.map((tank, index) => (
            <div key={tank.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tank Header */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Tank #{index + 1}: {tank.name}</h3>
                    <p className="text-sm text-gray-600">{tank.location} • {tank.village}</p>
                  </div>
           
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Compact Activity Categories */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Select Activities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {activityCategories.map((category) => (
                      <div key={category.id} className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-indigo-300 transition-all duration-200 h-80 flex flex-col">
                        <div className="flex flex-col h-full">
                          {/* Category Header */}
                          <div className="border-b border-gray-100 pb-2 mb-3 flex-shrink-0">
                            <h5 className="font-semibold text-gray-800 text-sm leading-tight">{category.title}</h5>
                          </div>
                          
                          {/* Sub-activities or main category checkbox */}
                          <div className="flex-1 overflow-y-auto min-h-0">
                            {category.subActivities.length > 0 ? (
                              <div className="space-y-1">
                                {category.subActivities.map((subActivity) => {
                                  const isSelected = tankConfigs[tank.id]?.selectedActivities?.[category.id]?.includes(subActivity);
                                  return (
                                    <div 
                                      key={subActivity}
                                      onClick={() => handleActivityToggle(tank.id, category.id, subActivity)}
                                      className={`flex items-start space-x-2 p-1.5 rounded cursor-pointer transition-colors ${
                                        isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                                      }`}
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="w-3 h-3 text-indigo-600 mt-0.5 flex-shrink-0" />
                                      ) : (
                                        <Square className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                      )}
                                      <span className={`text-xs leading-tight ${
                                        isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'
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
                                  tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                                }`}
                              >
                                {tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? (
                                  <CheckSquare className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                )}
                                <span className={`text-xs ${
                                  tankConfigs[tank.id]?.selectedActivities?.[category.id] === true ? 'text-indigo-900 font-medium' : 'text-gray-700'
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

                {/* Amount and File Uploads - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Lumpsum Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lumpsum Amount (₹)</label>
                    <input
                      type="number"
                      value={tankConfigs[tank.id]?.lumpsumAmount || ''}
                      onChange={(e) => handleAmountChange(tank.id, e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 focus:bg-white transition-all duration-200"
                    />
                  </div>

{/* Before Photos Upload - Multiple */}
<div className="col-span-1 sm:col-span-2 lg:col-span-2">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Before Photos * (Max 5 photos, 1MB each)
  </label>
  
  {/* Upload Area */}
  <div className="border-2 border-dashed border-indigo-300 rounded-lg p-3 text-center hover:border-indigo-400 transition-colors bg-indigo-50 hover:bg-indigo-100 mb-3">
    <div className="space-y-2">
      <Upload className="w-5 h-5 text-indigo-400 mx-auto" />
      <div className="text-gray-600 text-xs">
        Upload Photos ({(tankConfigs[tank.id]?.beforePhoto || []).length}/5)
      </div>
    </div>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => handleFileUpload(tank.id, e.target.files, 'beforePhoto')}
      className="hidden"
      id={`before-photo-${tank.id}`}
      disabled={(tankConfigs[tank.id]?.beforePhoto || []).length >= 5}
    />
    <label 
      htmlFor={`before-photo-${tank.id}`} 
      className={`mt-2 inline-flex items-center px-3 py-1 border border-indigo-300 rounded text-xs font-medium transition-colors ${
        (tankConfigs[tank.id]?.beforePhoto || []).length >= 5 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'text-indigo-700 bg-white hover:bg-indigo-50 cursor-pointer'
      }`}
    >
      {(tankConfigs[tank.id]?.beforePhoto || []).length >= 5 ? 'Maximum Reached' : 'Choose Photos'}
    </label>
  </div>

  {/* Display Uploaded Photos */}
  {tankConfigs[tank.id]?.beforePhoto && tankConfigs[tank.id].beforePhoto.length > 0 && (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-700">
        Uploaded Photos ({tankConfigs[tank.id].beforePhoto.length}/5):
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
        {tankConfigs[tank.id].beforePhoto.map((photo, index) => (
          <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-2">
            <div className="flex-1 min-w-0">
              <div className="text-green-700 font-medium text-xs truncate">
                {photo.name}
              </div>
              <div className="text-xs text-green-600">
                {(photo.size / (1024 * 1024)).toFixed(2)}MB
              </div>
            </div>
            <button
              onClick={() => removePhoto(tank.id, index)}
              className="ml-2 text-red-500 hover:text-red-700 transition-colors"
              title="Remove photo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

                  {/* KML File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">KML File (Optional)</label>
                    <div className="border-2 border-dashed border-indigo-300 rounded-lg p-3 text-center hover:border-indigo-400 transition-colors bg-indigo-50 hover:bg-indigo-100">
                      {tankConfigs[tank.id]?.kmlFile ? (
                        <div className="space-y-1">
                          <div className="text-green-600 font-medium text-xs truncate">{tankConfigs[tank.id].kmlFile.name}</div>
                          <div className="text-xs text-gray-500">File uploaded</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-5 h-5 text-indigo-400 mx-auto" />
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
                      <label htmlFor={`kml-upload-${tank.id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-indigo-300 rounded text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50 cursor-pointer transition-colors">
                        Choose File
                      </label>
                    </div>
                  </div>

                  {/* Project Proposal Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Proposal *</label>
                    <div className="border-2 border-dashed border-indigo-300 rounded-lg p-3 text-center hover:border-indigo-400 transition-colors bg-indigo-50 hover:bg-indigo-100">
                      {tankConfigs[tank.id]?.projectProposal ? (
                        <div className="space-y-1">
                          <div className="text-green-600 font-medium text-xs truncate">{tankConfigs[tank.id].projectProposal.name}</div>
                          <div className="text-xs text-gray-500">File uploaded</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-5 h-5 text-indigo-400 mx-auto" />
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
                      <label htmlFor={`proposal-upload-${tank.id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-indigo-300 rounded text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50 cursor-pointer transition-colors">
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Global Submit Button */}
          <div className="text-center pt-6">
            <button
              onClick={handleSubmitClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit All NOC Applications ({selectedTanks.length} tanks)
            </button>
          </div>
        </div>

        {/* Terms & Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
                <h3 className="text-lg font-semibold text-white">Terms & Conditions - NOC for Water Body Management</h3>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">By submitting this application, the organisation agrees to:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                      <p>Undertake only the approved activities at approved locations.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                      <p>Follow all laws, environmental norms, and departmental guidelines.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                      <p>Maintain quality and safety standards, without harming the water body or surroundings.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                      <p>Allow government inspections and accept that the NOC may be revoked for non-compliance or false information.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">5</span>
                      <p>Submit required progress and completion reports.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">6</span>
                      <p>Make no ownership or exclusive claims over the water body.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">7</span>
                      <p>Bear all costs unless otherwise sanctioned in writing.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">8</span>
                      <p>Take full responsibility for damages caused and indemnify the Government.</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        id="agreeTerms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="agreeTerms" className="text-sm font-medium text-gray-900 cursor-pointer">
                        I have read and agree to the full Terms & Conditions. 
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline ml-1">(Link to full version)</a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!agreedToTerms}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                >
                  Submit Applications
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
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