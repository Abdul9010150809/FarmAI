import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Notifications,
  Language,
  Security,
  PrivacyTip
} from '@mui/icons-material';

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      cropAlerts: true,
      weatherAlerts: true,
      marketUpdates: false
    },
    preferences: {
      language: 'en',
      theme: 'light',
      units: 'metric',
      timezone: 'Asia/Kolkata'
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      location: true,
      profileVisibility: 'private'
    }
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Mock user data
    setUserInfo({
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 9876543210',
      location: 'Punjab, India'
    });
  }, []);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const handleNotificationChange = (key) => (event) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: event.target.checked
      }
    });
  };

  const handlePreferenceChange = (key, value) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  const handlePrivacyChange = (key) => (event) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: event.target.checked
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/profile')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
          <Button
            color="inherit"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {saveStatus === 'saved' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}

        {/* Personal Information */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PrivacyTip sx={{ mr: 1 }} />
              Personal Information
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location"
                value={userInfo.location}
                onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Notifications sx={{ mr: 1 }} />
              Notifications
            </Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={handleNotificationChange('email')}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.push}
                    onChange={handleNotificationChange('push')}
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={handleNotificationChange('sms')}
                  />
                }
                label="SMS Alerts"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Alert Types
            </Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.cropAlerts}
                    onChange={handleNotificationChange('cropAlerts')}
                  />
                }
                label="Crop Health Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.weatherAlerts}
                    onChange={handleNotificationChange('weatherAlerts')}
                  />
                }
                label="Weather Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.marketUpdates}
                    onChange={handleNotificationChange('marketUpdates')}
                  />
                }
                label="Market Price Updates"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Language sx={{ mr: 1 }} />
              Preferences
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                select
                fullWidth
                label="Language"
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                sx={{ mb: 2 }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="pa">Punjabi</option>
              </TextField>
              <TextField
                select
                fullWidth
                label="Theme"
                value={settings.preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                sx={{ mb: 2 }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </TextField>
              <TextField
                select
                fullWidth
                label="Units"
                value={settings.preferences.units}
                onChange={(e) => handlePreferenceChange('units', e.target.value)}
                sx={{ mb: 2 }}
              >
                <option value="metric">Metric (hectares, kg)</option>
                <option value="imperial">Imperial (acres, lbs)</option>
              </TextField>
              <TextField
                select
                fullWidth
                label="Timezone"
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              >
                <option value="Asia/Kolkata">India Standard Time</option>
                <option value="UTC">UTC</option>
              </TextField>
            </Box>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ mr: 1 }} />
              Privacy & Security
            </Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onChange={handlePrivacyChange('dataSharing')}
                  />
                }
                label="Share anonymous farming data for research"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.analytics}
                    onChange={handlePrivacyChange('analytics')}
                  />
                }
                label="Allow analytics and usage tracking"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.location}
                    onChange={handlePrivacyChange('location')}
                  />
                }
                label="Share location for localized recommendations"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}