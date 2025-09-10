import { useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function ROICalculator() {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    area: 10,
    yieldPerHectare: 40,
    marketPrice: 2250,
    productionCost: 15000,
    laborCost: 5000,
    fertilizerCost: 3000,
    irrigationCost: 2000,
    otherCosts: 1000
  });

  const calculateROI = () => {
    const totalCost = formData.productionCost + formData.laborCost + 
                     formData.fertilizerCost + formData.irrigationCost + 
                     formData.otherCosts;
    
    const totalRevenue = formData.area * formData.yieldPerHectare * formData.marketPrice;
    const netProfit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    
    return {
      totalCost,
      totalRevenue,
      netProfit,
      roi,
      breakEven: totalCost / (formData.yieldPerHectare * formData.marketPrice)
    };
  };

  const results = calculateROI();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const crops = [
    { value: 'wheat', label: 'Wheat', icon: '🌾' },
    { value: 'rice', label: 'Rice', icon: '🍚' },
    { value: 'cotton', label: 'Cotton', icon: '🧵' },
    { value: 'soybean', label: 'Soybean', icon: '🫘' },
    { value: 'corn', label: 'Corn', icon: '🌽' },
    { value: 'vegetables', label: 'Vegetables', icon: '🥦' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('ROI Calculator')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('ROI Calculator')}</h1>
          <p className="text-gray-600">{t('Calculate return on investment for your crops')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Crop Details')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Crop Type')}
                </label>
                <select
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {crops.map(crop => (
                    <option key={crop.value} value={crop.value}>
                      {crop.icon} {t(crop.label)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Area (hectares)')}
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Yield/Hectare (quintals)')}
                  </label>
                  <input
                    type="number"
                    value={formData.yieldPerHectare}
                    onChange={(e) => handleInputChange('yieldPerHectare', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Market Price (₹/quintal)')}
                </label>
                <input
                  type="number"
                  value={formData.marketPrice}
                  onChange={(e) => handleInputChange('marketPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">{t('Cost Breakdown')}</h3>
            
            <div className="space-y-3">
              {[
                { key: 'productionCost', label: 'Production Costs' },
                { key: 'laborCost', label: 'Labor Costs' },
                { key: 'fertilizerCost', label: 'Fertilizer Costs' },
                { key: 'irrigationCost', label: 'Irrigation Costs' },
                { key: 'otherCosts', label: 'Other Costs' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(label)} (₹)
                  </label>
                  <input
                    type="number"
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('ROI Analysis')}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalRevenue)}
                  </div>
                  <div className="text-sm text-gray-600">{t('Total Revenue')}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(results.totalCost)}
                  </div>
                  <div className="text-sm text-gray-600">{t('Total Cost')}</div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(results.netProfit)}
                </div>
                <div className="text-lg font-semibold text-green-800">{t('Net Profit')}</div>
              </div>

              <div className="text-center">
                <div className={`text-4xl font-bold ${
                  results.roi >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatNumber(results.roi)}%
                </div>
                <div className="text-gray-600">{t('Return on Investment (ROI)')}</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t('Break-even Analysis')}</h4>
                <p className="text-sm">
                  {t('You need to sell')} {formatNumber(results.breakEven)} {t('quintals per hectare to break even')}
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t('Recommendations')}</h4>
                <ul className="text-sm space-y-1">
                  {results.roi < 20 && (
                    <li>• {t('Consider optimizing production costs')}</li>
                  )}
                  {results.yieldPerHectare < 30 && (
                    <li>• {t('Improve yield through better farming practices')}</li>
                  )}
                  {results.netProfit > 0 && (
                    <li>• {t('Good profitability - consider expanding this crop')}</li>
                  )}
                </ul>
              </div>

              <Button variant="primary" className="w-full">
                {t('Save Calculation')}
              </Button>
              <Button variant="outline" className="w-full">
                {t('Export to PDF')}
              </Button>
            </div>
          </Card>
        </div>

        {/* Historical Comparison */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('Historical Comparison')}</h2>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">ROI Comparison Chart</span>
          </div>
        </Card>
      </div>
    </div>
  );
}