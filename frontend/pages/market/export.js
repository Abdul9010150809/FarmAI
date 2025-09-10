import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../../hooks/useLanguage';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';

export default function ExportMarket() {
  const { t, formatCurrency } = useLanguage();
  const [exportData, setExportData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    // Mock export data - replace with API call
    const mockExportData = [
      {
        id: 1,
        crop: 'basmati_rice',
        country: 'Saudi Arabia',
        price: 85000,
        domesticPrice: 45000,
        premium: '89%',
        demand: 'very_high',
        requirements: 'Organic certification, Grade A quality',
        shipping: '15-20 days',
        minOrder: 1000
      },
      {
        id: 2,
        crop: 'cotton',
        country: 'China',
        price: 72000,
        domesticPrice: 62000,
        premium: '16%',
        demand: 'high',
        requirements: 'Long staple, GOTS certified',
        shipping: '25-30 days',
        minOrder: 5000
      },
      {
        id: 3,
        crop: 'spices',
        country: 'USA',
        price: 125000,
        domesticPrice: 75000,
        premium: '67%',
        demand: 'medium',
        requirements: 'FDA approved, Organic certification',
        shipping: '30-35 days',
        minOrder: 2000
      },
      {
        id: 4,
        crop: 'tea',
        country: 'UK',
        price: 95000,
        domesticPrice: 55000,
        premium: '73%',
        demand: 'high',
        requirements: 'Fair Trade, Rainforest Alliance',
        shipping: '20-25 days',
        minOrder: 1500
      },
      {
        id: 5,
        crop: 'organic_wheat',
        country: 'Germany',
        price: 68000,
        domesticPrice: 42000,
        premium: '62%',
        demand: 'medium',
        requirements: 'EU Organic certification',
        shipping: '35-40 days',
        minOrder: 3000
      }
    ];
    setExportData(mockExportData);
  }, []);

  const filteredData = exportData.filter(item =>
    selectedCountry === 'all' || item.country === selectedCountry
  );

  const columns = [
    {
      key: 'crop',
      header: 'Crop',
      render: (item) => t(item.crop.split('_').join(' '))
    },
    {
      key: 'country',
      header: 'Country'
    },
    {
      key: 'price',
      header: 'Export Price',
      render: (item) => formatCurrency(item.price)
    },
    {
      key: 'premium',
      header: 'Premium',
      render: (item) => (
        <span className="text-green-600 font-medium">{item.premium}</span>
      )
    },
    {
      key: 'demand',
      header: 'Demand',
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          item.demand === 'very_high' ? 'bg-red-100 text-red-800' :
          item.demand === 'high' ? 'bg-orange-100 text-orange-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {t(item.demand.split('_').join(' '))}
        </span>
      )
    }
  ];

  const countries = ['all', 'Saudi Arabia', 'China', 'USA', 'UK', 'Germany'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Export Market')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Export Opportunities')}</h1>
            <p className="text-gray-600">{t('International market prices and requirements')}</p>
          </div>
          <Button variant="primary">
            {t('Find Export Partners')}
          </Button>
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-lg ${
                selectedCountry === country
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {country === 'all' ? t('All Countries') : country}
            </button>
          ))}
        </div>

        {/* Export Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredData.slice(0, 4).map(item => (
            <Card key={item.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{t(item.crop.split('_').join(' '))}</h3>
                  <p className="text-gray-600">{item.country}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                  {item.premium} {t('premium')}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('Export Price')}:</span>
                  <span className="font-semibold">{formatCurrency(item.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('Domestic Price')}:</span>
                  <span>{formatCurrency(item.domesticPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('Min Order')}:</span>
                  <span>{item.minOrder} kg</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                {t('View Requirements')}
              </Button>
            </Card>
          ))}
        </div>

        {/* Export Market Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('All Export Opportunities')}</h2>
          <DataTable
            data={filteredData}
            columns={columns}
            pageSize={10}
            searchable={true}
          />
        </Card>

        {/* Export Requirements */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Export Requirements')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('Certifications Needed')}</h3>
              <div className="space-y-2">
                {['Organic Certification', 'ISO 22000', 'HACCP', 'Fair Trade', 'GlobalG.A.P.'].map(cert => (
                  <div key={cert} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">📋</span>
                    <span className="ml-2">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('Shipping & Logistics')}</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">🌡️ {t('Temperature Control')}</h4>
                  <p className="text-sm text-gray-600">Required for perishable goods</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">📦 {t('Packaging Standards')}</h4>
                  <p className="text-sm text-gray-600">Food-grade packaging required</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">📄 {t('Documentation')}</h4>
                  <p className="text-sm text-gray-600">Certificate of Origin, Phytosanitary</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Export Readiness Assessment */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Export Readiness')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">65%</div>
              <div className="text-sm text-gray-600">{t('Documentation Ready')}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">80%</div>
              <div className="text-sm text-gray-600">{t('Quality Standards')}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45%</div>
              <div className="text-sm text-gray-600">{t('Logistics Ready')}</div>
            </div>
          </div>
          <Button className="w-full mt-4">
            {t('Complete Export Readiness')}
          </Button>
        </Card>
      </div>
    </div>
  );
}