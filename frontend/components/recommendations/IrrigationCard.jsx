import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const IrrigationCard = ({ recommendation }) => {
  const data = recommendation || {
    status: 'optimal',
    recommendedWater: 2500,
    currentUsage: 2800,
    schedule: [
      { time: '06:00', duration: '30 min', zone: 'North Field' },
      { time: '18:00', duration: '45 min', zone: 'South Field' }
    ],
    savingsPotential: 12
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card title="Irrigation Recommendations" className="p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Current Status</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Current Usage</div>
            <div className="text-xl font-bold">{data.currentUsage} L/day</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Recommended</div>
            <div className="text-xl font-bold">{data.recommendedWater} L/day</div>
          </div>
        </div>

        {data.savingsPotential > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-sm text-yellow-800">
              💧 You can save {data.savingsPotential}% water by following recommendations
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Recommended Schedule</h4>
        <div className="space-y-2">
          {data.schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{item.time}</span>
              <span>{item.duration}</span>
              <span className="text-sm text-gray-600">{item.zone}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="primary" size="small">
          Apply Recommendations
        </Button>
        <Button variant="outline" size="small">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default IrrigationCard;