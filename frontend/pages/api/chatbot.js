export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simulate AI response - replace with actual AI service integration
    const responses = {
      'hello': 'Hello! How can I help with your farming today?',
      'weather': 'The weather looks good for farming today!',
      'yield': 'Based on current conditions, expect good yields this season.',
      'default': 'I understand you\'re asking about farming. Could you provide more details?'
    };

    const response = responses[message.toLowerCase()] || responses['default'];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      success: true,
      response: {
        text: response,
        timestamp: new Date().toISOString()
      },
      sessionId: sessionId || `sess_${Date.now()}`
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
