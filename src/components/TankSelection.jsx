import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Plus,
  Upload,
  FileText
} from 'lucide-react';

const TankSelection = ({ onBack, onProceed }) => {
  const [selectedTanks, setSelectedTanks] = useState([]);
  const [filters, setFilters] = useState({
    district: '',
    taluk: '',
    block: ''
  });
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState({});
  const [estimations, setEstimations] = useState({});
  const [proposal, setProposal] = useState(null);

  // Sample tank data
  const priorityTanks = [
    { 
      id: 1, 
      name: 'Palar Tank', 
      district: 'Vellore', 
      taluk: 'Gudiyatham', 
      block: 'Gudiyatham', 
      priority: 'High',
      capacity: '500 acre-ft',
      condition: 'Requires immediate attention',
      latitude: '12.9716',
      longitude: '78.6569'
    },
    { 
      id: 2, 
      name: 'Cheyyar Tank', 
      district: 'Tiruvannamalai', 
      taluk: 'Cheyyar', 
      block: 'Cheyyar', 
      priority: 'Medium',
      capacity: '300 acre-ft',
      condition: 'Moderate silting',
      latitude: '12.3288',
      longitude: '79.5438'
    },
    { 
      id: 3, 
      name: 'Pennai Tank', 
      district: 'Cuddalore', 
      taluk: 'Panruti', 
      block: 'Panruti', 
      priority: 'High',
      capacity: '750 acre-ft',
      condition: 'Structural damage',
      latitude: '11.7730',
      longitude: '79.6011'
    },
    { 
      id: 4, 
      name: 'Vellar Tank', 
      district: 'Villupuram', 
      taluk: 'Tindivanam', 
      block: 'Tindivanam', 
      priority: 'Medium',
      capacity: '400 acre-ft',
      condition: 'Bund strengthening needed',
      latitude: '12.2316',
      longitude: '79.6502'
    }
  ];

  const activities = [
    {
      id: 1,
      name: 'De-silting',
      subActivities: [
        { name: 'Manual De-silting', rate: 150, unit: 'cubic meter' },
        { name: 'Machine De-silting', rate: 80, unit: 'cubic meter' }
      ]
    },
    {
      id: 2,
      name: 'Bund Strengthening',
      subActivities: [
        { name: 'Stone Pitching', rate: 2500, unit: 'square meter' },
        { name: 'Cement Concrete', rate: 4500, unit: 'cubic meter' }
      ]
    },
    {
      id: 3,
      name: 'Waste Weir Repair',
      subActivities: [
        { name: 'Minor Repair', rate: 15000, unit: 'number' },
        { name: 'Major Reconstruction', rate: 75000, unit: 'number' }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleTankSelection = (tank) => {
    const isSelected = selectedTanks.find(t => t.id === tank.id);
    if (isSelected) {
      setSelectedTanks(selectedTanks.filter(t => t.id !== tank.id));
    } else {
      setSelectedTanks([...selectedTanks, tank]);
    }
  };

  const handleActivitySelection = (activityId, subActivityName, tankId) => {
    const key = `${tankId}-${activityId}-${subActivityName}`;
    setSelectedActivities({
      ...selectedActivities,
      [key]: !selectedActivities[key]
    });
  };

  const handleEstimationChange = (key, field, value) => {
    setEstimations({
      ...estimations,
      [key]: {
        ...estimations[key],
        [field]: value
      }
    });
  };

  const handleSubmit = () => {
    alert(`NOC request submitted for ${selectedTanks.length} tank(s)! Project IDs have been generated.`);
    onProceed();
  };

  const filteredTanks = priorityTanks.filter(tank => {
    return (
      (!filters.district || tank.district.toLowerCase().includes(filters.district.toLowerCase())) &&
      (!filters.taluk || tank.taluk.toLowerCase().includes(filters.taluk.toLowerCase())) &&
      (!filters.block || tank.block.toLowerCase().includes(filters.block.toLowerCase()))
    );
  });

  if (showActivities) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowActivities(false)}
                  className="text-sky-600 hover:bg-sky-50 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Select Activities</h1>
                  <p className="text-gray-600">Choose activities for selected tanks</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {selectedTanks.length} tank(s) selected
              </div>
            </div>
          </div>

          {/* Activities Selection */}
          <div className="space-y-6">
            {selectedTanks.map(tank => (
              <div key={tank.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-4">
                  <h3 className="text-lg font-semibold">{tank.name}</h3>
                  <p className="text-sky-100">{tank.district}, {tank.taluk}, {tank.block}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {activities.map(activity => (
                      <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">{activity.name}</h4>
                        <div className="space-y-3">
                          {activity.subActivities.map((subActivity, subIndex) => {
                            const key = `${tank.id}-${activity.id}-${subActivity.name}`;
                            const isSelected = selectedActivities[key];
                            
                            return (
                              <div key={subIndex} className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={isSelected || false}
                                    onChange={() => handleActivitySelection(activity.id, subActivity.name, tank.id)}
                                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                                  />
                                  <span className="text-sm font-medium text-gray-700">{subActivity.name}</span>
                                </label>
                                
                                <div className="text-xs text-gray-500 ml-6">
                                  Rate: ₹{subActivity.rate} per {subActivity.unit}
                                </div>
                                
                                {isSelected && (
                                  <div className="ml-6 grid grid-cols-2 gap-2">
                                    <input
                                      type="number"
                                      placeholder="Quantity"
                                      value={estimations[key]?.quantity || ''}
                                      onChange={(e) => handleEstimationChange(key, 'quantity', e.target.value)}
                                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-sky-500 focus:border-transparent"
                                    />
                                    <div className="px-2 py-1 text-sm bg-gray-50 border border-gray-300 rounded">
                                      ₹{((estimations[key]?.quantity || 0) * subActivity.rate).toLocaleString()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proposal Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Proposal (Optional)</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload project proposal</p>
              <input
                type="file"
                id="proposal"
                className="hidden"
                onChange={(e) => setProposal(e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
              <button
                onClick={() => document.getElementById('proposal').click()}
                className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
              >
                Choose File
              </button>
              {proposal && (
                <div className="mt-3 flex items-center justify-center gap-2 text-green-600">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{proposal.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Submit NOC Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="text-sky-600 hover:bg-sky-50 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Select Priority Tanks</h1>
                <p className="text-gray-600">Choose tanks for your NOC application</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
              <MapPin className="w-4 h-4" />
              View on Map
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-800">Filter Tanks</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="District"
              value={filters.district}
              onChange={(e) => setFilters({...filters, district: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Taluk"
              value={filters.taluk}
              onChange={(e) => setFilters({...filters, taluk: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Block"
              value={filters.block}
              onChange={(e) => setFilters({...filters, block: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Selected Tanks Summary */}
        {selectedTanks.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  {selectedTanks.length} tank(s) selected
                </span>
              </div>
              <button
                onClick={() => setShowActivities(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Continue to Activities
              </button>
            </div>
          </div>
        )}

        {/* Tanks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTanks.map(tank => {
            const isSelected = selectedTanks.find(t => t.id === tank.id);
            
            return (
              <div 
                key={tank.id} 
                className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${
                  isSelected ? 'border-sky-500 bg-sky-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTankSelection(tank)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{tank.name}</h3>
                      <p className="text-sm text-gray-600">{tank.district}, {tank.taluk}</p>
                    </div>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(tank.priority)}`}>
                      {tank.priority}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{tank.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Block:</span>
                      <span className="font-medium">{tank.block}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">{tank.condition}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {tank.latitude}, {tank.longitude}
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-sky-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TankSelection;