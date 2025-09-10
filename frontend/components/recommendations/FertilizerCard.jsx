import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DataTable from '../ui/DataTable';

const FertilizerCard = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [soilData, setSoilData] = useState({
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    pH: 6.8,
    organicMatter: 2.5
  });

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'corn', name: 'Corn', icon: '🌽' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'soybean', name: 'Soybean', icon: '🫘' }
  ];

  const fertilizerRecommendations = {
    wheat: [
      { stage: 'Pre-planting', npk: '60-40-20', amount: '120 kg/ha', type: 'DAP + Urea' },
      { stage: 'Tillering', npk: '30-0-0', amount: '60 kg/ha', type: 'Urea' },
      { stage: 'Stem Extension', npk: '0-0-20', amount: '40 kg/ha', type: 'MOP' }
    ],
    corn: [
      { stage: 'Pre-planting', npk: '80-60-40', amount: '180 kg/ha', type: 'NPK Complex' },
      { stage: 'V6 Stage', npk: '40-0-0', amount: '80 kg/ha', type: 'Urea' },
      { stage: 'Tasseling', npk: '0-0-30', amount: '60 kg/ha', type: 'SOP' }
    ],
    rice: [
      { stage: 'Basal', npk: '60-40-20', amount: '150 kg/ha', type: 'DAP' },
      { stage: 'Tillering', npk: '40-0-0', amount: '80 kg/ha', type: 'Urea' },
      { stage: 'Panicle Initiation', npk: '0-0-25', amount: '50 kg/ha', type: 'MOP' }
    ],
    soybean: [
      { stage: 'Pre-planting', npk: '20-60-20', amount: '100 kg/ha', type: 'SSP' },
      { stage: 'Flowering', npk: '0-0-30', amount: '60 kg/ha', type: 'MOP' },
      { stage: 'Pod Formation', npk: '0-20-0', amount: '40 kg/ha', type: 'SSP' }
    ]
  };

  const nutrientDeficiency = {
    wheat: 'Phosphorus deficiency detected. Recommend DAP application.',
    corn: 'Nitrogen levels optimal. Maintain current schedule.',
    rice: 'Potassium levels low. Recommend MOP application.',
    soybean: 'Phosphorus levels adequate. Monitor nitrogen fixation.'
  };

  const handleSoilInputChange = (nutrient, value) => {
    setSoilData(prev => ({
      ...prev,
      [nutrient]: Math.max(0, Math.min(100, value))
    }));
  };

  const columns = [
    { key: 'stage', header: 'Growth Stage' },
    { key: 'npk', header: 'NPK Ratio' },
    { key: 'amount', header: 'Amount' },
    { key: 'type', header: 'Fertilizer Type' }
  ];

  return (
    <Card title="Fertilizer Recommendations" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Selection and Soil Input */}
        <div>
          <h3 className="font-semibold mb-4">Crop Selection</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {crops.map(crop => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                  selectedCrop === crop.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <span className="text-2xl mr-2">{crop.icon}</span>
                <span className="font-medium">{crop.name}</span>
              </button>
            ))}
          </div>

          <h3 className="font-semibold mb-4">Soil Nutrient Levels</h3>
          <div className="space-y-3">
            {['nitrogen', 'phosphorus', 'potassium'].map(nutrient => (
              <div key={nutrient}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {nutrient} ({soilData[nutrient]}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soilData[nutrient]}
                  onChange={(e) => handleSoilInputChange(nutrient, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>Optimal</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ {nutrientDeficiency[selectedCrop]}
            </p>
          </div>
        </div>

        {/* Recommendations Table */}
        <div>
          <h3 className="font-semibold mb-4">Fertilization Schedule</h3>
          
          <DataTable
            data={fertilizerRecommendations[selectedCrop]}
            columns={columns}
            pageSize={5}
            className="mb-4"
          />

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Application Guidelines</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li>Apply fertilizers during early morning or late evening</li>
              <li>Ensure proper soil moisture before application</li>
              <li>Use protective gear when handling chemicals</li>
              <li>Monitor soil pH regularly (optimal: 6.0-7.0)</li>
              <li>Consider organic alternatives for sustainable farming</li>
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="primary">
              Download Schedule
            </Button>
            <Button variant="outline">
              Set Reminders
            </Button>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-semibold mb-3">Environmental Impact Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-2xl text-green-600">🌱</div>
            <div className="font-semibold">Carbon Footprint</div>
            <div className="text-sm text-gray-600">12% lower than average</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl text-blue-600">💧</div>
            <div className="font-semibold">Water Usage</div>
            <div className="text-sm text-gray-600">Optimized for efficiency</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl text-purple-600">🔄</div>
            <div className="font-semibold">Sustainability</div>
            <div className="text-sm text-gray-600">85% score</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FertilizerCard;