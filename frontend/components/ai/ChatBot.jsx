import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when chatbot opens
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t('Hello! I am FarmAI Assistant. How can I help with your farming today?'),
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, t]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual chatbot API
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
    }
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather')) {
      return t('The weather looks perfect for farming today! Temperature is around 28°C with no rain expected.');
    } else if (lowerMessage.includes('yield') || lowerMessage.includes('production')) {
      return t('Based on current conditions, I predict excellent yields this season. Make sure to monitor soil moisture regularly.');
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
      return t('For optimal growth, consider using organic compost and balanced NPK fertilizers. Would you like specific recommendations?');
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      return t('I can help with pest identification. Please describe the symptoms or upload a photo of the affected plants.');
    } else if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) {
      return t('Most crops need about 1-2 inches of water per week. Drip irrigation can improve efficiency by up to 90%.');
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return t('Hello! How can I assist with your farming operations today?');
    } else {
      return t('I understand you\'re asking about farming. Could you provide more specific details so I can help you better?');
    }
  };

  const quickQuestions = [
    'What is the weather forecast?',
    'Yield prediction for wheat',
    'Fertilizer recommendations',
    'Pest control advice',
    'Irrigation schedule'
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-4 shadow-lg"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">🤖</span>
            <span>FarmAI Assistant</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="shadow-xl">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">FarmAI Assistant</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="small"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="p-3 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(t(question))}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50"
              >
                {t(question)}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('Type your message...')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? '...' : '↑'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;