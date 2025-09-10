import { useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Analytics() {
  const { t, formatNumber, formatCurrency } = useLanguage();
  const [timeRange, setTimeRange] = useState('30d');

  const analyticsData = {
    yield: {
      current: 1250,
      previous: 1100,
      trend: 'up'
    },
    revenue: {
      current: 125000,
      previous: 110000,
      trend: 'up'
    },
    costs: {
      current: 75000,
      previous: 80000,
      trend: 'down'
    },
    efficiency: {
      current: 85,
      previous: 78,
      trend: 'up'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Analytics')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Farm Analytics')}</h1>
            <p className="text-gray-600">{t('Comprehensive insights into your farm performance')}</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(analyticsData).map(([key, data]) => (
            <Card key={key} className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {key === 'revenue' || key === 'costs' ? formatCurrency(data.current) : formatNumber(data.current)}
                {key === 'efficiency' && '%'}
              </div>
              <div className="text-sm text-gray-600 mb-2">{t(key.charAt(0).toUpperCase() + key.slice(1))}</div>
              <div className={`text-sm ${
                data.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.trend === 'up' ? '↑' : '↓'} {Math.abs(((data.current - data.previous) / data.previous) * 100).toFixed(1)}%
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Yield Trend')}</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">Yield Chart</span>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Revenue vs Costs')}</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">Revenue Chart</span>
            </div>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('Detailed Reports')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Yield Analysis', 'Cost Breakdown', 'Profitability', 'Efficiency', 'Market Comparison', 'Sustainability'].map(report => (
              <Card key={report} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-lg font-medium mb-2">{t(report)}</div>
                <Button variant="outline" size="small">
                  {t('View Report')}
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Export Data')}</h2>
          <div className="flex space-x-4">
            <Button variant="outline">
              {t('Download CSV')}
            </Button>
            <Button variant="outline">
              {t('Download PDF')}
            </Button>
            <Button variant="outline">
              {t('Export to Excel')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}