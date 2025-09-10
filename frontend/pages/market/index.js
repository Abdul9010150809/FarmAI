import { useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';

export default function Market() {
  const { t, formatCurrency } = useLanguage();
  const [activeTab, setActiveTab] = useState('prices');

  const marketData = {
    wheat: { current: 2250, previous: 2200, trend: 'up' },
    rice: { current: 1850, previous: 1900, trend: 'down' },
    cotton: { current: 6200, previous: 6000, trend: 'up' },
    soybean: { current: 4500, previous: 4400, trend: 'up' },
    corn: { current: 1950, previous: 2000, trend: 'down' }
  };

  const priceHistory = [
    { date: '2024-03-15', wheat: 2250, rice: 1850, cotton: 6200, soybean: 4500, corn: 1950 },
    { date: '2024-03-14', wheat: 2230, rice: 1870, cotton: 6150, soybean: 4480, corn: 1970 },
    { date: '2024-03-13', wheat: 2200, rice: 1900, cotton: 6000, soybean: 4400, corn: 2000 }
  ];

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'wheat', header: 'Wheat', render: (item) => formatCurrency(item.wheat) },
    { key: 'rice', header: 'Rice', render: (item) => formatCurrency(item.rice) },
    { key: 'cotton', header: 'Cotton', render: (item) => formatCurrency(item.cotton) },
    { key: 'soybean', header: 'Soybean', render: (item) => formatCurrency(item.soybean) },
    { key: 'corn', header: 'Corn', render: (item) => formatCurrency(item.corn) }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Market')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Market Intelligence')}</h1>
            <p className="text-gray-600">{t('Real-time market prices and trends')}</p>
          </div>
          <div className="flex space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>Local Market</option>
              <option>Regional</option>
              <option>National</option>
            </select>
            <Button variant="outline">{t('Refresh')}</Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['prices', 'trends', 'demand', 'export'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
            </button>
          ))}
        </div>

        {activeTab === 'prices' && (
          <div className="space-y-6">
            {/* Current Prices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(marketData).map(([crop, data]) => (
                <Card key={crop} className="p-4 text-center">
                  <div className="text-lg font-semibold mb-2">{t(crop)}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCurrency(data.current)}
                  </div>
                  <div className={`text-sm ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.trend === 'up' ? '↑' : '↓'} {formatCurrency(Math.abs(data.current - data.previous))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Price History Table */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('Price History')}</h2>
              <DataTable
                data={priceHistory}
                columns={columns}
                pageSize={5}
                searchable={true}
              />
            </Card>

            {/* Market News */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('Market News')}</h2>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-semibold">Wheat prices rise due to export demand</h3>
                  <p className="text-gray-600 text-sm">Increased international demand driving wheat prices upward...</p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-semibold">Government announces new procurement policy</h3>
                  <p className="text-gray-600 text-sm">New policy expected to stabilize rice prices in coming weeks...</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'trends' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Market Trends')}</h2>
            <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">Price Trends Chart</span>
            </div>
          </Card>
        )}

        {/* Best Time to Sell */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Best Time to Sell')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(marketData).map(([crop, data]) => (
              <div key={crop} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{t(crop)}</div>
                  <div className="text-sm text-gray-600">Best time: Next 2 weeks</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">+12% expected</div>
                  <div className="text-sm text-gray-600">Optimal window</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}