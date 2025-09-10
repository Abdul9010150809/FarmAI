import React from 'react';
import Card from '../ui/Card';

const SoilHealthCard = ({ soilData }) => {
  const soil = soilData || {
    pH: 6.8,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    moisture: 65,
    healthScore: 82
  };

  const getStatusColor = (value, type) => {
    const ranges = {
      pH: { low: 6.0, high: 7.0 },
      nitrogen: { low: 40, high: 60 },
      phosphorus: { low: 30, high: 50 },
      potassium: { low: 40, high: 60 },
      moisture: { low: 50, high: 70 }
    };

    if (value < ranges[type].low) return 'text-red-600';
    if (value > ranges[type].high) return 'text-yellow-600';
    return 'text-green-600';
  };

  const ProgressBar = ({ value, max = 100, color = 'bg-green-600' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <Card title="Soil Health Analysis" className="p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Health Score</span>
          <span className="text-lg font-bold text-green-600">{soil.healthScore}/100</span>
        </div>
        <ProgressBar value={soil.healthScore} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">pH Level</span>
            <span className={`text-sm font-medium ${getStatusColor(soil.pH, 'pH')}`}>
              {soil.pH}
            </span>
          </div>
          <ProgressBar value={(soil.pH / 14) * 100} color="bg-blue-600" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Nitrogen (N)</span>
            <span className={`text-sm font-medium ${getStatusColor(soil.nitrogen, 'nitrogen')}`}>
              {soil.nitrogen}%
            </span>
          </div>
          <ProgressBar value={soil.nitrogen} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Phosphorus (P)</span>
            <span className={`text-sm font-medium ${getStatusColor(soil.phosphorus, 'phosphorus')}`}>
              {soil.phosphorus}%
            </span>
          </div>
          <ProgressBar value={soil.phosphorus} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Potassium (K)</span>
            <span className={`text-sm font-medium ${getStatusColor(soil.potassium, 'potassium')}`}>
              {soil.potassium}%
            </span>
          </div>
          <ProgressBar value={soil.potassium} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Moisture</span>
            <span className={`text-sm font-medium ${getStatusColor(soil.moisture, 'moisture')}`}>
              {soil.moisture}%
            </span>
          </div>
          <ProgressBar value={soil.moisture} color="bg-blue-400" />
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 Recommendation: Consider adding phosphorus-rich fertilizer to improve soil nutrients.
        </p>
      </div>
    </Card>
  );
};

export default SoilHealthCard;