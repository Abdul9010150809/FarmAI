import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';

export default function YieldHistory() {
  const { t, formatNumber } = useLanguage();
  const [yieldData, setYieldData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [timeRange, setTimeRange] = useState('1y');

  useEffect(() => {
    // Mock yield history data - replace with API call
    const mockYieldData = [
      {
        id: 1,
        crop: 'wheat',
        season: 'Winter 2023',
        yield: 45,
        unit: 'quintal/hectare',
        previousYield: 42,
        change: '+7.1%',
        trend: 'up',
        date: '2023-12-15'
      },
      {
        id: 2,
        crop: 'rice',
        season: 'Monsoon 2023',
        yield: 65,
        unit: 'quintal/hectare',
        previousYield: 68,
        change: '-4.4%',
        trend: 'down',
        date: '2023-09-20'
      },
      {
        id: 3,
        crop: 'cotton',
        season: 'Summer 2023',
        yield: 28,
        unit: 'quintal/hectare',
        previousYield: 25,
        change: '+12.0%',
        trend: 'up',
        date: '2023-06-30'
      },
      {
        id: 4,
        crop: 'soybean',
        season: 'Spring 2023',
        yield: 32,
        unit: 'quintal/hectare',
        previousYield: 30,
        change: '+6.7%',
        trend: 'up',
        date: '2023-03-15'
      },
      {
        id: 5,
        crop: 'wheat',
        season: 'Winter 2022',
        yield: 42,
        unit: 'quintal/hectare',
        previousYield: 40,
        change: '+5.0%',
        trend: 'up',
        date: '2022-12-10'
      }
    ];
    setYieldData(mockYieldData);
  }, []);

  const filteredData = yieldData.filter(item =>
    selectedCrop === 'all' || item.crop === selectedCrop
  );

  const columns = [
    {
      key: 'crop',
      header: 'Crop',
      render: (item) => t(item.crop)
    },
    {
      key: 'season',
      header: 'Season'
    },
    {
      key: 'yield',
      header: 'Yield',
      render: (item) => `${formatNumber(item.yield)} ${item.unit}`
    },
    {
      key: 'previousYield',
      header: 'Previous Yield',
      render: (item) => `${formatNumber(item.previousYield)} ${item.unit}`
    },
    {
      key: 'change',
      header: 'Change',
      render: (item) => (
        <span className={`font-medium ${
          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {item.change}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Harvest Date'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Yield History')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Yield History Analysis')}</h1>
            <p className="text-gray-600">{t('Historical yield data and performance trends')}</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="1y">Last Year</option>
              <option value="2y">Last 2 Years</option>
              <option value="5y">Last 5 Years</option>
            </select>
            <Button variant="outline">{t('Export Data')}</Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['all', 'wheat', 'rice', 'cotton', 'soybean'].map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 rounded-lg ${
                selectedCrop === crop
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {crop === 'all' ? t('All Crops') : t(crop)}
            </button>
          ))}
        </div>

        {/* Yield Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatNumber(filteredData.reduce((sum, item) => sum + item.yield, 0) / filteredData.length || 0)}
            </div>
            <div className="text-gray-600">{t('Average Yield')}</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatNumber(Math.max(...filteredData.map(item => item.yield)) || 0)}
            </div>
            <div className="text-gray-600">{t('Highest Yield')}</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              +{formatNumber(filteredData.filter(item => item.trend === 'up').length / filteredData.length * 100 || 0)}%
            </div>
            <div className="text-gray-600">{t('Improvement Rate')}</div>
          </Card>
        </div>

        {/* Yield History Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('Yield History')}</h2>
          <DataTable
            data={filteredData}
            columns={columns}
            pageSize={10}
            searchable={true}
          />
        </Card>

        {/* Yield Trend Chart */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Yield Trend Analysis')}</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">Yield Trend Chart</span>
          </div>
        </Card>

        {/* Performance Insights */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Performance Insights')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('Top Performing Crops')}</h3>
              <div className="space-y-2">
                {filteredData
                  .filter(item => item.trend === 'up')
                  .sort((a, b) => b.yield - a.yield)
                  .slice(0, 3)
                  .map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">{t(item.crop)}</span>
                      <span className="text-green-600">+{item.change}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('Areas for Improvement')}</h3>
              <div className="space-y-2">
                {filteredData
                  .filter(item => item.trend === 'down')
                  .map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">{t(item.crop)}</span>
                      <span className="text-red-600">{item.change}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}