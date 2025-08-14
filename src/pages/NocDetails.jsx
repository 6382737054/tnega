import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, CheckSquare, Square } from 'lucide-react';

export default function NOCDetails({ selectedTanks: propTanks = [] }) {
  const [selectedTanks, setSelectedTanks] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [lumpsumAmount, setLumpsumAmount] = useState('');
  const [kmlFile, setKmlFile] = useState(null);
  const [projectProposal, setProjectProposal] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

useEffect(() => {
  // Get tanks from global variable set by tank selection component
  const storedTanks = window.selectedTanksData || [];
  if (storedTanks.length > 0) {
    setSelectedTanks(storedTanks);
  }
}, []); // 

  // Activity categories with their options - in exact order
  const activityCategories = [
    {
      category: 'Desilting/ Deepening',
      activities: [
        'Strengthening of bund',
        'Desilting of channel',
        'Formation of island',
        'Excavation of channels'
      ]
    },
    {
      category: 'Repair/ Rehabilitation of hydraulic structure',
      activities: [
        'Surplus weir',
        'Sluice -inlet/outlet'
      ]
    },
    {
      category: 'Removal of obstruction in water bodies',
      activities: [
        'Removal of water hyacinth/weeds',
        'Removal of garbage / solid waste materials'
      ]
    },
    {
      category: 'Infrastructure Arrangements',
      activities: [
        'Solar lights',
        'Walking track',
        'Watchtman shed',
        'Fencing',
        'Sitting benches',
        'Name board/ Sign board',
        'Watch towers',
        'Bathing ghats',
        'Floating wetlands',
        'Plantation',
        'Some planting investment',
        'Park formation'
      ]
    },
    {
      category: 'Quality checking of water',
      activities: [
        'Quality checking of water'
      ]
    },
    {
      category: 'Five years AMC by any organization',
      activities: [
        'Five years AMC by any organization'
      ]
    }
  ];

  const handleActivityToggle = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0];
    if (fileType === 'kml') {
      setKmlFile(file);
    } else if (fileType === 'proposal') {
      setProjectProposal(file);
    }
  };

  const handleBack = () => {
    window.location.href = '/new-noc-request';
  };

  const handleSubmit = () => {
    if (selectedTanks.length === 0) {
      alert('No tanks selected. Please go back and select tanks first.');
      return;
    }
    if (selectedActivities.length === 0) {
      alert('Please select at least one activity');
      return;
    }
    if (!lumpsumAmount || lumpsumAmount <= 0) {
      alert('Please enter a valid lumpsum amount');
      return;
    }
    if (!projectProposal) {
      alert('Please upload project proposal');
      return;
    }

    // Store all data and submit
    const nocData = {
      selectedTanks,
      selectedActivities,
      lumpsumAmount,
      kmlFile: kmlFile?.name || null,
      projectProposal: projectProposal.name,
      submittedAt: new Date().toISOString()
    };

    setShowSuccessModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center py-3">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mr-4 transition-colors"
            >
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Choose activities for selected tanks</h1>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Tanks selected</span>
            <div className="text-xl font-bold text-blue-600">{selectedTanks.length}</div>
          </div>
        </div>

        {/* Show message if no tanks selected */}
        {selectedTanks.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Tanks Selected</h3>
              <p className="text-yellow-700 mb-4">Please go back to the tank selection page and select tanks first.</p>
              <button
                onClick={handleBack}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Go Back to Tank Selection
              </button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        {selectedTanks.length > 0 && (
          <div className="space-y-8">
            {/* Selected Tanks Display */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <h3 className="font-semibold text-lg text-center">Selected Tanks</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {selectedTanks.map((tank) => (
                    <div key={tank.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-blue-100">
                      <div>
                        <span className="font-medium text-gray-900">{tank.name}</span>
                        <span className="text-gray-500 ml-2">- {tank.location}</span>
                      </div>
                      <span className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">{tank.department}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities Selection */}
            <div className="space-y-6">
              {activityCategories.map(({ category, activities }) => (
                <div key={category} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 border-b border-blue-100">
                    <h3 className="font-semibold text-gray-900 text-lg">{category}</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {activities.map((activity) => (
                        <div
                          key={activity}
                          onClick={() => handleActivityToggle(activity)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                        >
                          {selectedActivities.includes(activity) ? (
                            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            selectedActivities.includes(activity) 
                              ? 'text-blue-900 font-medium' 
                              : 'text-gray-700'
                          }`}>
                            {activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lumpsum Amount */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Lumpsum Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(e.target.value)}
                    placeholder="Enter total project amount"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 focus:bg-white transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter the total budget for all selected activities</p>
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* KML File Upload */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Upload KML File <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                    {kmlFile ? (
                      <div className="space-y-3">
                        <div className="text-green-600 font-medium">{kmlFile.name}</div>
                        <div className="text-sm text-gray-500">File uploaded successfully</div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-8 h-8 text-blue-400 mx-auto" />
                        <div className="text-gray-600">Click to upload the KML file</div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".kml"
                      onChange={(e) => handleFileUpload(e, 'kml')}
                      className="hidden"
                      id="kml-upload"
                    />
                    <label
                      htmlFor="kml-upload"
                      className="mt-4 inline-flex items-center px-6 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              {/* Project Proposal Upload */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Upload Project Proposal</h3>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                    {projectProposal ? (
                      <div className="space-y-3">
                        <div className="text-green-600 font-medium">{projectProposal.name}</div>
                        <div className="text-sm text-gray-500">File uploaded successfully</div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-8 h-8 text-blue-400 mx-auto" />
                        <div className="text-gray-600">Click to upload the project proposal</div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'proposal')}
                      className="hidden"
                      id="proposal-upload"
                    />
                    <label
                      htmlFor="proposal-upload"
                      className="mt-4 inline-flex items-center px-6 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit NOC Application
              </button>
            </div>
          </div>
        )}
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
              <p className="text-gray-600 mb-6">Your NOC request has been submitted successfully. </p>
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
  );
}