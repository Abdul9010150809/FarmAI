import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import Button from '../ui/Button';

const VoiceAssistant = () => {
  const { speak, isSpeechAvailable } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!isSpeechAvailable()) {
      console.warn('Speech recognition not available');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleListen = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      setTranscript('');
    }
  };

  const handleSpeak = (text) => {
    speak(text, {
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0
    });
  };

  const predefinedCommands = [
    {
      command: 'What is the weather today?',
      action: () => handleSpeak('The weather is sunny with a high of 28 degrees.')
    },
    {
      command: 'Tell me about yield prediction',
      action: () => handleSpeak('Based on current conditions, expect excellent yields this season.')
    },
    {
      command: 'Give irrigation advice',
      action: () => handleSpeak('Water your crops early morning for best results.')
    }
  ];

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">🎤</div>
        <h3 className="font-semibold mb-2">Voice Assistant</h3>
        <p className="text-gray-600 text-sm">Speak your farming questions</p>
      </div>

      <Button
        onClick={handleListen}
        variant={isListening ? 'danger' : 'primary'}
        className="w-full mb-4"
      >
        {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
      </Button>

      {transcript && (
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-800">{transcript}</p>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Try saying:</p>
        {predefinedCommands.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full text-left p-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100"
          >
            "{item.command}"
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoiceAssistant;