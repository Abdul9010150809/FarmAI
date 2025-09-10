import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function MarketDemand() {
  const { t } = useLanguage();
  const [demandData, setDemandData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    // Mock demand data - replace with API call
    const mockDemandData = [
      {
        id: 1,
        crop: 'wheat',
        region: 'North India',
        demand: 'high',
        trend: 'increasing',
        forecast: 'Continue rising for next 2 weeks',
        reason: 'Export orders increased'
      },
      {
        id: 2,
        crop: 'rice',
        region: 'South India',
        demand: 'medium',
        trend: 'stable',
        forecast: 'Remain stable',
        reason: 'Adequate local supply'
      },
      {
        id: 3,
        crop: 'cotton',
        region: 'West India',
        demand: 'very high',
        trend: 'increasing',
        forecast: 'Sharp increase expected',
        reason: 'Textile industry expansion'
      },
      {
        id: 4,
        crop: 'soybean',
        region: 'Central India',
        demand: 'low',
        trend: 'decreasing',
        forecast: 'Continue declining',
        reason: 'Import competition'
      },
      {
        id: 5,
        crop: 'vegetables',
        region: 'East India',
        demand: 'high',
        trend: 'increasing',
        forecast: 'Seasonal increase',
        reason: 'Festival season demand'
      }
    ];
    setDemandData(mockDemandData);
  }, []);

  const filteredData = demandData.filter(item =>
    selectedRegion === 'all' || item.region === selectedRegion
  );

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'very high': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Market Demand')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Market Demand Analysis')}</h1>
            <p className="text-gray-600">{t('Current demand trends and forecasts')}</p>
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Regions</option>
            <option value="North India">North India</option>
            <option value="South India">South India</option>
            <option value="East India">East India</option>
            <option value="West India">West India</option>
            <option value="Central India">Central India</option>
          </select>
        </div>

        {/* Demand Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {['wheat', 'rice', 'cotton', 'vegetables'].map(crop => {
            const cropData = demandData.find(d => d.crop === crop);
            return (
              <Card key={crop} className="p-6 text-center">
                <div className="text-2xl mb-2">🌾</div>
                <h3 className="font-semibold mb-2">{t(crop)}</h3>
                {cropData && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(cropData.demand)}`}>
                    {t(cropData.demand)}
                  </span>
                )}
              </Card>
            );
          })}
        </div>

        {/* Demand Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('Detailed Demand Analysis')}</h2>
          <div className="space-y-4">
            {filteredData.map(item => (
              <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{t(item.crop)}</h3>
                    <p className="text-gray-600">{item.region}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(item.demand)}`}>
                    {t(item.demand)}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t('Trend')}:</span> {t(item.trend)}
                  </div>
                  <div>
                    <span className="font-medium">{t('Forecast')}:</span> {item.forecast}
                  </div>
                  <div>
                    <span className="font-medium">{t('Reason')}:</span> {item.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Demand Forecast Chart */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Demand Forecast')}</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">Demand Forecast Chart</span>
          </div>
        </Card>

        {/* Best Selling Opportunities */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Best Selling Opportunities')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData
              .filter(item => item.demand === 'high' || item.demand === 'very high')
              .map(item => (
                <div key={item.id} className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{t(item.crop)}</h3>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-sm rounded">
                      {t('Recommended')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.region}</p>
                  <div className="text-sm">
                    <p><strong>{t('Demand')}:</strong> {t(item.demand)}</p>
                    <p><strong>{t('Forecast')}:</strong> {item.forecast}</p>
                  </div>
                  <Button variant="primary" className="w-full mt-3">
                    {t('View Selling Options')}
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}