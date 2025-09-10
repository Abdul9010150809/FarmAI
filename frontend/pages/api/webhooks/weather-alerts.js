export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { alertType, severity, message, coordinates } = req.body;

    console.log('Weather alert received:', {
      alertType,
      severity,
      message,
      coordinates,
      timestamp: new Date().toISOString()
    });

    // Here you would typically:
    // 1. Store the alert in database
    // 2. Send push notifications
    // 3. Trigger email/SMS alerts
    // 4. Update farmer dashboards

    res.status(200).json({
      success: true,
      message: 'Weather alert processed successfully',
      alertId: `alert_${Date.now()}`
    });

  } catch (error) {
    console.error('Weather alert webhook error:', error);
    res.status(500).json({ error: 'Failed to process weather alert' });
  }
}