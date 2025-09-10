import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const RegionSelector = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [customCoordinates, setCustomCoordinates] = useState('');

  const regions = [
    {
      id: 'north',
      name: 'Northern Region',
      coordinates: '51.505, -0.09 | 51.51, -0.1 | 51.51, -0.12 | 51.505, -0.12',
      crops: ['Wheat', 'Barley', 'Canola'],
      soilType: 'Loamy',
      avgYield: '68 tons'
    },
    {
      id: 'south',
      name: 'Southern Region',
      coordinates: '51.5, -0.08 | 51.505, -0.08 | 51.505, -0.1 | 51.5, -0.1',
      crops: ['Corn', 'Soybean', 'Sunflower'],
      soilType: 'Sandy Loam',
      avgYield: '72 tons'
    },
    {
      id: 'east',
      name: 'Eastern Region',
      coordinates: '51.51, -0.06 | 51.515, -0.06 | 51.515, -0.08 | 51.51, -0.08',
      crops: ['Rice', 'Cotton', 'Sugarcane'],
      soilType: 'Clay',
      avgYield: '65 tons'
    },
    {
      id: 'west',
      name: 'Western Region',
      coordinates: '51.495, -0.11 | 51.5, -0.11 | 51.5, -0.13 | 51.495, -0.13',
      crops: ['Grapes', 'Olives', 'Almonds'],
      soilType: 'Rocky',
      avgYield: '58 tons'
    }
  ];

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    const region = regions.find(r => r.id === regionId);
    onRegionChange?.(region);
  };

  const handleCustomRegion = () => {
    if (customCoordinates.trim()) {
      const customRegion = {
        id: 'custom',
        name: 'Custom Region',
        coordinates: customCoordinates,
        crops: ['Mixed'],
        soilType: 'Unknown',
        avgYield: 'N/A'
      };
      onRegionChange?.(customRegion);
    }
  };

  const selectedRegionData = regions.find(r => r.id === selectedRegion);

  return (
    <Card title="Region Selection" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Selection */}
        <div>
          <h3 className="font-semibold mb-4">Select Farming Region</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => handleRegionSelect(region.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRegion === region.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-left">
                  <h4 className="font-semibold">{region.name}</h4>
                  <p className="text-sm text-gray-600">{region.crops.join(', ')}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Coordinates */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom coordinates:
            </label>
            <textarea
              value={customCoordinates}
              onChange={(e) => setCustomCoordinates(e.target.value)}
              placeholder="Enter coordinates in format: lat1, lng1 | lat2, lng2 | ..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
            />
            <Button
              onClick={handleCustomRegion}
              disabled={!customCoordinates.trim()}
              variant="outline"
              className="mt-2"
            >
              Use Custom Region
            </Button>
          </div>
        </div>

        {/* Region Details */}
        <div>
          <h3 className="font-semibold mb-4">Region Details</h3>
          
          {selectedRegionData ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Basic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Region Name:</span>
                    <span className="font-medium">{selectedRegionData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Soil Type:</span>
                    <span className="font-medium">{selectedRegionData.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Yield:</span>
                    <span className="font-medium">{selectedRegionData.avgYield}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Suitable Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegionData.crops.map(crop => (
                    <span
                      key={crop}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Coordinates</h4>
                <code className="text-sm text-gray-600 bg-white p-2 rounded">
                  {selectedRegionData.coordinates}
                </code>
              </div>

              <Button variant="primary" className="w-full">
                Apply to All Fields
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🗺️</div>
              <p>Select a region to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Weather and Soil Tips */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-semibold mb-3">Regional Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h5 className="font-semibold text-yellow-800 mb-1">🌤️ Weather Advisory</h5>
            <p className="text-sm text-yellow-700">
              Expect moderate rainfall in the next 48 hours. Schedule irrigation accordingly.
            </p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-1">🌱 Soil Preparation</h5>
            <p className="text-sm text-blue-700">
              Recommended soil treatment: Add organic compost and adjust pH to 6.5-7.0.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RegionSelector;