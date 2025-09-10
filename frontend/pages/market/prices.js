import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';

export default function MarketPrices() {
  const { t, formatCurrency } = useLanguage();
  const [prices, setPrices] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Mock market data - replace with API call
    const mockPrices = [
      {
        id: 1,
        crop: 'wheat',
        market: 'Local Mandi',
        price: 2250,
        previousPrice: 2200,
        unit: 'quintal',
        timestamp: '2024-03-15T10:00:00',
        trend: 'up'
      },
      {
        id: 2,
        crop: 'rice',
        market: 'Regional Market',
        price: 1850,
        previousPrice: 1900,
        unit: 'quintal',
        timestamp: '2024-03-15T09:30:00',
        trend: 'down'
      },
      {
        id: 3,
        crop: 'cotton',
        market: 'National Exchange',
        price: 6200,
        previousPrice: 6000,
        unit: 'quintal',
        timestamp: '2024-03-15T11:15:00',
        trend: 'up'
      },
      {
        id: 4,
        crop: 'soybean',
        market: 'Local Mandi',
        price: 4500,
        previousPrice: 4400,
        unit: 'quintal',
        timestamp: '2024-03-15T08:45:00',
        trend: 'up'
      },
      {
        id: 5,
        crop: 'corn',
        market: 'Regional Market',
        price: 1950,
        previousPrice: 2000,
        unit: 'quintal',
        timestamp: '2024-03-15T10:30:00',
        trend: 'down'
      }
    ];
    setPrices(mockPrices);
  }, []);

  const filteredPrices = prices.filter(price => 
    selectedCrop === 'all' || price.crop === selectedCrop
  );

  const columns = [
    {
      key: 'crop',
      header: 'Crop',
      render: (item) => t(item.crop)
    },
    {
      key: 'market',
      header: 'Market'
    },
    {
      key: 'price',
      header: 'Current Price',
      render: (item) => formatCurrency(item.price)
    },
    {
      key: 'previousPrice',
      header: 'Previous Price',
      render: (item) => formatCurrency(item.previousPrice)
    },
    {
      key: 'trend',
      header: 'Trend',
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.trend === 'up' ? '↑' : '↓'} {Math.abs(((item.price - item.previousPrice) / item.previousPrice) * 100).toFixed(1)}%
        </span>
      )
    },
    {
      key: 'timestamp',
      header: 'Last Updated',
      render: (item) => new Date(item.timestamp).toLocaleTimeString()
    }
  ];

  const crops = ['all', 'wheat', 'rice', 'cotton', 'soybean', 'corn', 'vegetables'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Market Prices')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Live Market Prices')}</h1>
            <p className="text-gray-600">{t('Real-time commodity prices across different markets')}</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="1d">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <Button variant="outline">{t('Refresh')}</Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          {crops.map(crop => (
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

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPrices.slice(0, 3).map(price => (
            <Card key={price.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{t(price.crop)}</h3>
                  <p className="text-gray-600 text-sm">{price.market}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  price.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {price.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(price.price)}
              </div>
              <div className="text-sm text-gray-600">
                {t('Previous')}: {formatCurrency(price.previousPrice)}
              </div>
            </Card>
          ))}
        </div>

        {/* Prices Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('All Market Prices')}</h2>
          <DataTable
            data={filteredPrices}
            columns={columns}
            pageSize={10}
            searchable={true}
          />
        </Card>

        {/* Price Alerts */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Price Alerts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('Set Price Alerts')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Cotton</option>
                  </select>
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Above</option>
                    <option>Below</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <Button variant="primary" className="w-full">
                  {t('Create Alert')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('Active Alerts')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium">Wheat above ₹2300</div>
                    <div className="text-sm text-gray-600">Local Mandi</div>
                  </div>
                  <Button size="small" variant="danger">Remove</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium">Cotton below ₹6000</div>
                    <div className="text-sm text-gray-600">National Exchange</div>
                  </div>
                  <Button size="small" variant="danger">Remove</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}