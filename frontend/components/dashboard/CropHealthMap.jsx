import React, { useState } from 'react';
import Card from '../ui/Card';

const CropHealthMap = () => {
  const [selectedField, setSelectedField] = useState(null);

  // Mock field data with health scores
  const fields = [
    { id: 1, name: 'North Field', health: 85, crop: 'Wheat', area: '5 acres' },
    { id: 2, name: 'South Field', health: 92, crop: 'Corn', area: '8 acres' },
    { id: 3, name: 'East Field', health: 78, crop: 'Soybean', area: '6 acres' },
    { id: 4, name: 'West Field', health: 65, crop: 'Rice', area: '7 acres' },
    { id: 5, name: 'Central Field', health: 88, crop: 'Barley', area: '4 acres' }
  ];

  const getHealthColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-green-400';
    if (score >= 70) return 'bg-yellow-400';
    if (score >= 60) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getHealthStatus = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Poor';
    return 'Critical';
  };

  return (
    <Card title="Field Health Overview" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Field Map Visualization */}
        <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2">
            {fields.map(field => (
              <div
                key={field.id}
                className={`p-3 rounded cursor-pointer transition-all hover:scale-105 ${
                  selectedField === field.id ? 'ring-2 ring-green-500' : ''
                } ${getHealthColor(field.health)} text-white text-center`}
                onClick={() => setSelectedField(field.id)}
              >
                <div className="text-sm font-semibold">{field.name}</div>
                <div className="text-lg font-bold">{field.health}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Click on a field to see details
          </div>
        </div>

        {/* Field Details */}
        <div>
          {selectedField ? (
            <div className="space-y-4">
              {fields.filter(f => f.id === selectedField).map(field => (
                <div key={field.id}>
                  <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Crop Type</div>
                      <div className="font-semibold">{field.crop}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Area</div>
                      <div className="font-semibold">{field.area}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Health Score</span>
                      <span className="font-semibold">{getHealthStatus(field.health)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getHealthColor(field.health)}`}
                        style={{ width: `${field.health}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">
                      {field.health}%
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {field.health >= 80 ? (
                        <>
                          <li>Continue current practices</li>
                          <li>Monitor for pest activity</li>
                          <li>Schedule soil test in 2 weeks</li>
                        </>
                      ) : (
                        <>
                          <li>Apply nutrient-rich fertilizer</li>
                          <li>Increase irrigation frequency</li>
                          <li>Schedule immediate soil analysis</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              <div>
                <div className="text-4xl mb-2">🌾</div>
                <p>Select a field to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-semibold mb-2">Health Legend</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>90-100% (Excellent)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
            <span>80-89% (Good)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
            <span>70-79% (Fair)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-400 rounded mr-2"></div>
            <span>60-69% (Poor)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
            <span>Below 60% (Critical)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CropHealthMap;