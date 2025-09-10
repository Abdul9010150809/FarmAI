import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function Sustainability() {
  const { t, formatNumber } = useLanguage();
  const [sustainabilityData, setSustainabilityData] = useState({});
  const [selectedMetric, setSelectedMetric] = useState('water');

  useEffect(() => {
    // Mock sustainability data - replace with API call
    const mockData = {
      water: {
        usage: 1250000,
        saved: 250000,
        unit: 'liters',
        trend: 'down',
        efficiency: '85%',
        goal: 'Reduce by 15% next year'
      },
      carbon: {
        footprint: 45,
        saved: 12,
        unit: 'tons CO₂',
        trend: 'down',
        efficiency: '78%',
        goal: 'Carbon neutral by 2025'
      },
      chemicals: {
        usage: 1200,
        saved: 300,
        unit: 'kg',
        trend: 'down',
        efficiency: '80%',
        goal: 'Reduce by 25% next season'
      },
      biodiversity: {
        score: 82,
        improvement: 15,
        unit: 'points',
        trend: 'up',
        efficiency: 'N/A',
        goal: 'Reach 90+ score'
      }
    };
    setSustainabilityData(mockData);
  }, []);

  const currentData = sustainabilityData[selectedMetric] || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Sustainability')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Sustainability Metrics')}</h1>
            <p className="text-gray-600">{t('Environmental impact and resource management')}</p>
          </div>
          <Button variant="outline">{t('Download Report')}</Button>
        </div>

        {/* Metric Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['water', 'carbon', 'chemicals', 'biodiversity'].map(metric => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`p-4 rounded-lg text-center ${
                selectedMetric === metric
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              <div className="text-lg mb-1">{t(metric)}</div>
              <div className="text-sm">{t('Efficiency')}: {sustainabilityData[metric]?.efficiency || 'N/A'}</div>
            </button>
          ))}
        </div>

        {/* Current Metric Details */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{t(selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1))} {t('Metrics')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatNumber(currentData.usage || 0)}
              </div>
              <div className="text-gray-600">{t('Current Usage')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatNumber(currentData.saved || 0)}
              </div>
              <div className="text-gray-600">{t('Saved This Year')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {currentData.efficiency || 'N/A'}
              </div>
              <div className="text-gray-600">{t('Efficiency Score')}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${
                currentData.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {currentData.trend === 'up' ? '↑' : '↓'}
              </div>
              <div className="text-gray-600">{t('Trend')}</div>
            </div>
          </div>
        </Card>

        {/* Sustainability Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('Sustainability Progress')}</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">Sustainability Metrics Chart</span>
          </div>
        </Card>

        {/* Goals and Recommendations */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('Goals & Recommendations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('Current Goal')}</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">{currentData.goal || 'No specific goal set'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('Recommendations')}</h3>
              <div className="space-y-2">
                {selectedMetric === 'water' && (
                  <>
                    <p className="text-sm">💧 Install drip irrigation systems</p>
                    <p className="text-sm">🌧️ Implement rainwater harvesting</p>
                    <p className="text-sm">📊 Monitor soil moisture regularly</p>
                  </>
                )}
                {selectedMetric === 'carbon' && (
                  <>
                    <p className="text-sm">🌱 Use cover crops to sequester carbon</p>
                    <p className="text-sm">🔄 Implement crop rotation</p>
                    <p className="text-sm">☀️ Consider solar power for operations</p>
                  </>
                )}
                {selectedMetric === 'chemicals' && (
                  <>
                    <p className="text-sm">🐞 Use integrated pest management</p>
                    <p className="text-sm">🍃 Switch to organic fertilizers</p>
                    <p className="text-sm">🔍 Regular soil testing</p>
                  </>
                )}
                {selectedMetric === 'biodiversity' && (
                  <>
                    <p className="text-sm">🌼 Plant native flowering plants</p>
                    <p className="text-sm">🦉 Create wildlife habitats</p>
                    <p className="text-sm">🌳 Maintain hedgerows and trees</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Sustainability Certifications')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Organic', 'Rainforest Alliance', 'Fair Trade'].map(cert => (
              <div key={cert} className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-medium mb-2">{cert}</div>
                <div className="text-sm text-gray-600">In Progress</div>
                <Button size="small" className="mt-2">Learn More</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}