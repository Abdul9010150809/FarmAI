import { useState } from 'react';
import Head from 'next/head';
import { useChatBot } from '../hooks/useChatBot';
import { useLanguage } from '../hooks/useLanguage';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function ChatBotPage() {
  const { t } = useLanguage();
  const { chatHistory, isLoading, sendMessage, clearChat, getQuickResponses } = useChatBot();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleQuickQuestion = async (question) => {
    setInputMessage(question);
    await sendMessage(question);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FarmAI - {t('ChatBot Assistant')}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('FarmAI Assistant')}</h1>
            <p className="text-gray-600">{t('Get instant farming advice and support')}</p>
          </div>
          <Button variant="outline" onClick={clearChat}>
            {t('Clear Chat')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-lg font-semibold mb-2">{t('Welcome to FarmAI Assistant!')}</h3>
                    <p>{t('Ask me anything about farming, weather, yields, or market prices.')}</p>
                  </div>
                ) : (
                  chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('Type your farming question...')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  {isLoading ? t('Sending...') : t('Send')}
                </Button>
              </div>
            </Card>

            {/* Quick Questions */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-3">{t('Quick Questions')}</h3>
              <div className="flex flex-wrap gap-2">
                {getQuickResponses().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Farming Tips */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">{t('Farming Tips')}</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">🌱 {t('Planting Season')}</p>
                  <p className="text-gray-600">{t('Best time to plant wheat is October-November')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">💧 {t('Irrigation')}</p>
                  <p className="text-gray-600">{t('Water early morning to reduce evaporation')}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium">🐞 {t('Pest Control')}</p>
                  <p className="text-gray-600">{t('Use neem oil as natural pesticide')}</p>
                </div>
              </div>
            </Card>

            {/* Chat History */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">{t('Recent Chats')}</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{t('Weather inquiry')}</p>
                  <p className="text-gray-600">2 hours ago</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{t('Yield prediction')}</p>
                  <p className="text-gray-600">1 day ago</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{t('Fertilizer advice')}</p>
                  <p className="text-gray-600">3 days ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}