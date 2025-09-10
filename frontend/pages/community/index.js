import { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Community() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('forum');

  const forumPosts = [
    {
      id: 1,
      title: 'Best practices for organic wheat farming',
      author: 'Rajesh Kumar',
      replies: 24,
      views: 156,
      timestamp: '2 hours ago',
      category: 'wheat'
    },
    {
      id: 2,
      title: 'Dealing with pest infestation in cotton',
      author: 'Priya Sharma',
      replies: 18,
      views: 89,
      timestamp: '5 hours ago',
      category: 'cotton'
    },
    {
      id: 3,
      title: 'Irrigation techniques for water conservation',
      author: 'Dr. Singh',
      replies: 42,
      views: 234,
      timestamp: '1 day ago',
      category: 'irrigation'
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Amit Verma',
      specialization: 'Soil Science',
      rating: 4.9,
      reviews: 127,
      online: true
    },
    {
      id: 2,
      name: 'Prof. Sunita Patel',
      specialization: 'Crop Protection',
      rating: 4.8,
      reviews: 89,
      online: false
    },
    {
      id: 3,
      name: 'Dr. Ramesh Gupta',
      specialization: 'Agricultural Economics',
      rating: 4.7,
      reviews: 156,
      online: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('Community')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Community Hub')}</h1>
            <p className="text-gray-600">{t('Connect with farmers and experts worldwide')}</p>
          </div>
          <Button variant="primary">
            {t('Start Discussion')}
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['forum', 'experts', 'qna', 'marketplace'].map(tab => (
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

        {activeTab === 'forum' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('Recent Discussions')}</h2>
              <div className="space-y-4">
                {forumPosts.map(post => (
                  <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.replies} replies</span>
                      <span className="mx-2">•</span>
                      <span>{post.views} views</span>
                      <span className="mx-2">•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('Popular Categories')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['wheat', 'rice', 'cotton', 'vegetables', 'irrigation', 'pest', 'soil', 'market'].map(category => (
                  <div key={category} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="text-lg font-medium">{t(category)}</div>
                    <div className="text-sm text-gray-600">256 discussions</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'experts' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Agricultural Experts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map(expert => (
                <Card key={expert.id} className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👨‍🌾</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{expert.name}</h3>
                  <p className="text-gray-600 mb-2">{expert.specialization}</p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1">{expert.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{expert.reviews} reviews</span>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    expert.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {expert.online ? 'Online' : 'Offline'}
                  </div>
                  <Button className="w-full mt-4" size="small">
                    {t('Consult Now')}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'qna' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('Questions & Answers')}</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">How to control aphids in wheat crops?</h3>
                <p className="text-gray-600 mb-3">I'm noticing aphid infestation in my wheat field. What are the best organic methods to control them?</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span>By Farmer Raj</span>
                  <span className="mx-2">•</span>
                  <span>8 answers</span>
                  <span className="mx-2">•</span>
                  <span>2 days ago</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Best irrigation schedule for summer crops?</h3>
                <p className="text-gray-600 mb-3">Looking for optimal irrigation timing for tomatoes and peppers in hot weather.</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span>By Green Farms</span>
                  <span className="mx-2">•</span>
                  <span>12 answers</span>
                  <span className="mx-2">•</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}