import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DataTable from '../ui/DataTable';

const PestControlCard = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [riskLevel, setRiskLevel] = useState('medium');

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'corn', name: 'Corn', icon: '🌽' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' }
  ];

  const pestData = {
    wheat: [
      { pest: 'Aphids', risk: 'High', damage: 'Sap sucking, virus transmission', treatment: 'Imidacloprid spray' },
      { pest: 'Armyworm', risk: 'Medium', damage: 'Leaf chewing', treatment: 'Chlorantraniliprole' },
      { pest: 'Rust Fungus', risk: 'Low', damage: 'Leaf discoloration', treatment: 'Triazole fungicide' }
    ],
    corn: [
      { pest: 'Corn Borer', risk: 'High', damage: 'Stem tunneling', treatment: 'Bt corn or insecticides' },
      { pest: 'Earworm', risk: 'Medium', damage: 'Kernel feeding', treatment: 'Pyrethroids' },
      { pest: 'Rootworm', risk: 'Low', damage: 'Root damage', treatment: 'Crop rotation' }
    ],
    rice: [
      { pest: 'Stem Borer', risk: 'High', damage: 'White heads', treatment: 'Cartap hydrochloride' },
      { pest: 'Leaf Folder', risk: 'Medium', damage: 'Leaf folding', treatment: 'Chlorpyriphos' },
      { pest: 'Brown Plant Hopper', risk: 'Low', damage: 'Hopper burn', treatment: 'Imidacloprid' }
    ],
    vegetables: [
      { pest: 'Whitefly', risk: 'High', damage: 'Sap sucking, sooty mold', treatment: 'Neonicotinoids' },
      { pest: 'Thrips', risk: 'Medium', damage: 'Leaf silvering', treatment: 'Spinosad' },
      { pest: 'Mites', risk: 'Low', damage: 'Leaf stippling', treatment: 'Abamectin' }
    ]
  };

  const preventiveMeasures = {
    wheat: [
      'Use resistant varieties',
      'Practice crop rotation',
      'Remove weed hosts',
      'Monitor fields weekly'
    ],
    corn: [
      'Plant early to avoid peak pest periods',
      'Use Bt hybrids',
      'Destroy crop residues',
      'Use pheromone traps'
    ],
    rice: [
      'Maintain proper water level',
      'Use light traps',
      'Practice synchronous planting',
      'Conserve natural enemies'
    ],
    vegetables: [
      'Use row covers',
      'Practice intercropping',
      'Remove infected plants',
      'Use yellow sticky traps'
    ]
  };

  const columns = [
    { key: 'pest', header: 'Pest Name' },
    { 
      key: 'risk', 
      header: 'Risk Level',
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          item.risk === 'High' ? 'bg-red-100 text-red-800' :
          item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {item.risk}
        </span>
      )
    },
    { key: 'damage', header: 'Damage Type' },
    { key: 'treatment', header: 'Recommended Treatment' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card title="Pest Control Recommendations" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Selection and Risk Assessment */}
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

          <h3 className="font-semibold mb-4">Pest Risk Assessment</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Current Risk Level: Medium</h4>
              <p className="text-sm text-red-700">
                🚨 Increased pest activity detected due to recent weather conditions. 
                Monitor fields closely and be prepared for treatment.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Weather Impact</h4>
              <p className="text-sm text-blue-700">
                Warm and humid conditions are favorable for pest multiplication. 
                Expect increased activity in the next 7-10 days.
              </p>
            </div>
          </div>
        </div>

        {/* Pest Information and Treatments */}
        <div>
          <h3 className="font-semibold mb-4">Pest Management</h3>
          
          <DataTable
            data={pestData[selectedCrop]}
            columns={columns}
            pageSize={5}
            className="mb-4"
          />

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Preventive Measures</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
              {preventiveMeasures[selectedCrop].map((measure, index) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="primary">
              Schedule Treatment
            </Button>
            <Button variant="outline">
              Request Expert Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Integrated Pest Management */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-semibold mb-3">Integrated Pest Management (IPM)</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <div className="text-2xl">👁️</div>
            <div className="font-semibold">Monitoring</div>
            <div className="text-sm text-gray-600">Regular field inspections</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl">🛡️</div>
            <div className="font-semibold">Prevention</div>
            <div className="text-sm text-gray-600">Cultural practices</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-2xl">🐞</div>
            <div className="font-semibold">Biological</div>
            <div className="text-sm text-gray-600">Natural predators</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-center">
            <div className="text-2xl">🧪</div>
            <div className="font-semibold">Chemical</div>
            <div className="text-sm text-gray-600">Last resort</div>
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🚨</span>
          <div>
            <h4 className="font-semibold text-red-800">Emergency Alert</h4>
            <p className="text-sm text-red-700">
              High risk of armyworm outbreak predicted in your region. 
              <strong> Immediate action recommended.</strong>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PestControlCard;