import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Card from '../ui/Card';

const YieldChart = ({ data }) => {
  const chartData = data || [
    { month: 'Jan', yield: 45, prediction: 48 },
    { month: 'Feb', yield: 52, prediction: 55 },
    { month: 'Mar', yield: 49, prediction: 51 },
    { month: 'Apr', yield: 62, prediction: 65 },
    { month: 'May', yield: 55, prediction: 58 },
    { month: 'Jun', yield: 68, prediction: 72 }
  ];

  return (
    <Card title="Yield Prediction Trend" className="p-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Yield (tons)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="yield" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Actual Yield"
            />
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#3B82F6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Yield"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default YieldChart;