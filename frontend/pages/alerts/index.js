import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';

export default function Alerts() {
  const { user } = useAuth();
  const { t, formatDate } = useLanguage();
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock alerts data - replace with API call
    const mockAlerts = [
      {
        id: 1,
        type: 'weather',
        severity: 'high',
        title: 'Heavy Rainfall Alert',
        message: 'Heavy rainfall expected in your region tomorrow. Take necessary precautions.',
        timestamp: new Date('2024-03-15T10:00:00'),
        read: false
      },
      {
        id: 2,
        type: 'pest',
        severity: 'medium',
        title: 'Pest Outbreak Warning',
        message: 'Increased pest activity detected in nearby farms. Monitor your crops closely.',
        timestamp: new Date('2024-03-14T15:30:00'),
        read: true
      },
      {
        id: 3,
        type: 'irrigation',
        severity: 'low',
        title: 'Irrigation System Check',
        message: 'Irrigation system requires maintenance. Schedule inspection soon.',
        timestamp: new Date('2024-03-13T09:15:00'),
        read: true
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.type === filter
  );

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const columns = [
    {
      key: 'severity',
      header: 'Severity',
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          item.severity === 'high' ? 'bg-red-100 text-red-800' :
          item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {item.severity}
        </span>
      )
    },
    {
      key: 'title',
      header: 'Alert'
    },
    {
      key: 'timestamp',
      header: 'Time',
      render: (item) => formatDate(item.timestamp)
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex space-x-2">
          {!item.read && (
            <Button
              size="small"
              variant="outline"
              onClick={() => markAsRead(item.id)}
            >
              Mark Read
            </Button>
          )}
          <Button
            size="small"
            variant="danger"
            onClick={() => deleteAlert(item.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Alerts')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Alerts & Notifications')}</h1>
            <p className="text-gray-600">{t('Stay informed about your farm')}</p>
          </div>
          <Button onClick={markAllAsRead}>
            {t('Mark All as Read')}
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          {['all', 'weather', 'pest', 'irrigation', 'market'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg ${
                filter === type
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {t(type.charAt(0).toUpperCase() + type.slice(1))}
            </button>
          ))}
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredAlerts.slice(0, 2).map(alert => (
            <Card
              key={alert.id}
              className={`p-6 border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500' :
                alert.severity === 'medium' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              } ${!alert.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{alert.title}</h3>
                {!alert.read && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{alert.message}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formatDate(alert.timestamp)}
                </span>
                <div className="flex space-x-2">
                  {!alert.read && (
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Alerts Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t('All Alerts')}</h2>
          <DataTable
            data={filteredAlerts}
            columns={columns}
            pageSize={10}
            searchable={true}
          />
        </Card>

        {/* Alert Settings */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Alert Preferences')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('Notification Types')}</h3>
              {['weather', 'pest', 'irrigation', 'market', 'system'].map(type => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2">{t(type.charAt(0).toUpperCase() + type.slice(1))}</span>
                </label>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('Delivery Methods')}</h3>
              {['push', 'email', 'sms'].map(method => (
                <label key={method} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    defaultChecked={method !== 'sms'}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2">{t(method.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>
          <Button className="mt-4">
            {t('Save Preferences')}
          </Button>
        </Card>
      </div>
    </div>
  );
}