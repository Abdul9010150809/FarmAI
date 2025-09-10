import { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    farmName: user?.farmName || '',
    location: user?.location || '',
    farmSize: user?.farmSize || '',
    mainCrops: user?.mainCrops || []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Profile')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Profile Settings')}</h1>
            <p className="text-gray-600">{t('Manage your account and farm details')}</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              {t('Edit Profile')}
            </Button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['personal', 'farm', 'preferences', 'security'].map(tab => (
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

        <Card className="p-6">
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">{t('Personal Information')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('First Name')}
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Last Name')}
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Phone Number')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-3">
                  <Button type="submit" variant="primary">
                    {t('Save Changes')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    {t('Cancel')}
                  </Button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'farm' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('Farm Details')}</h2>
              {/* Farm details form */}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('Preferences')}</h2>
              {/* Preferences form */}
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('Security')}</h2>
              {/* Security settings */}
            </div>
          )}
        </Card>

        {/* Account Stats */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{t('Account Statistics')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">{t('Fields')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">{t('Crop Types')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">{t('Success Rate')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2Y</div>
              <div className="text-sm text-gray-600">{t('Member Since')}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}