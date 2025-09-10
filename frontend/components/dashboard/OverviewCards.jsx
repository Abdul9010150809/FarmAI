import React from 'react';
import Card from '../ui/Card';

const OverviewCards = ({ farmData }) => {
  const cards = [
    {
      title: 'Total Yield Prediction',
      value: `${farmData?.predictedYield || 0} tons`,
      icon: '🌾',
      trend: farmData?.yieldTrend || 0,
      color: 'text-green-600'
    },
    {
      title: 'Soil Health Score',
      value: `${farmData?.soilHealth || 0}/100`,
      icon: '🌱',
      trend: farmData?.soilTrend || 0,
      color: 'text-blue-600'
    },
    {
      title: 'Water Usage',
      value: `${farmData?.waterUsage || 0} L`,
      icon: '💧',
      trend: farmData?.waterTrend || 0,
      color: 'text-blue-400'
    },
    {
      title: 'Crop Health',
      value: `${farmData?.cropHealth || 0}%`,
      icon: '📊',
      trend: farmData?.healthTrend || 0,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className={`text-sm ${card.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {card.trend >= 0 ? '↑' : '↓'} {Math.abs(card.trend)}% from last week
              </p>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;