import { useState, useCallback } from 'react';
import { useLanguage } from './useLanguage';

export const useChatBot = () => {
  const { t } = useLanguage();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API call to backend chatbot
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          sessionId: `sess_${Date.now()}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.response.text,
          sender: 'bot',
          timestamp: new Date(data.response.timestamp)
        };
        setChatHistory(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: t('Sorry, I am unable to respond at the moment. Please try again later.'),
        sender: 'bot',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  const getQuickResponses = useCallback(() => {
    return [
      t('What is the weather forecast?'),
      t('Yield prediction for my crops'),
      t('Fertilizer recommendations'),
      t('Pest control advice'),
      t('Irrigation schedule'),
      t('Market prices today')
    ];
  }, [t]);

  return {
    chatHistory,
    isLoading,
    sendMessage,
    clearChat,
    getQuickResponses
  };
};