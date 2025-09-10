import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Notifications,
  AccountCircle,
  LocationOn,
  CalendarToday,
  TrendingUp,
  WaterDrop,
  Eco,
  Warning
} from '@mui/icons-material';

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Mock user data
    setUserData({
      name: 'Rajesh Kumar',
      farm: 'Green Fields Farm',
      location: 'Punjab, India',
      crops: ['Wheat', 'Rice', 'Vegetables'],
      farmSize: '5 hectares'
    });

    // Mock weather data
    setWeatherData({
      temperature: 28,
      humidity: 65,
      rainfall: '15mm',
      condition: 'Partly Cloudy',
      forecast: 'Moderate rain expected in 2 days'
    });
  }, []);

  const quickActions = [
    {
      title: 'Crop Health',
      description: 'Monitor crop health status',
      icon: <Eco sx={{ fontSize: 30, color: '#4caf50' }} />,
      action: () => router.push('/dashboard/crop-health')
    },
    {
      title: 'Irrigation',
      description: 'Manage water resources',
      icon: <WaterDrop sx={{ fontSize: 30, color: '#2196f3' }} />,
      action: () => router.push('/dashboard/irrigation')
    },
    {
      title: 'Weather',
      description: 'Check weather forecast',
      icon: <TrendingUp sx={{ fontSize: 30, color: '#ff9800' }} />,
      action: () => router.push('/dashboard/weather')
    },
    {
      title: 'Alerts',
      description: 'View farm alerts',
      icon: <Warning sx={{ fontSize: 30, color: '#f44336' }} />,
      action: () => router.push('/dashboard/alerts')
    }
  ];

  const recentActivities = [
    { id: 1, activity: 'Soil test completed', time: '2 hours ago', status: 'completed' },
    { id: 2, activity: 'Irrigation scheduled', time: '5 hours ago', status: 'scheduled' },
    { id: 3, activity: 'Pest alert detected', time: '1 day ago', status: 'alert' },
    { id: 4, activity: 'Harvest planning', time: '2 days ago', status: 'planned' }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FarmAI Dashboard
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Card sx={{ mb: 4, bgcolor: '#e8f5e8' }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32' }}>
                  Welcome back, {userData?.name}!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: '#757575' }} />
                  <Typography variant="body1">{userData?.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ mr: 1, color: '#757575' }} />
                  <Typography variant="body1">
                    {new Date().toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {userData?.crops?.map((crop, index) => (
                    <Chip key={index} label={crop} variant="outlined" sx={{ borderColor: '#2e7d32' }} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                {weatherData && (
                  <Card sx={{ bgcolor: 'white' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Weather Update
                      </Typography>
                      <Typography variant="h3" sx={{ color: '#ff9800' }}>
                        {weatherData.temperature}°C
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {weatherData.condition}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Humidity: {weatherData.humidity}% • Rainfall: {weatherData.rainfall}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {weatherData.forecast}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{action.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activities */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <Box>
                  {recentActivities.map((activity) => (
                    <Box
                      key={activity.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2,
                        borderBottom: '1px solid #e0e0e0',
                        '&:last-child': { borderBottom: 'none' }
                      }}
                    >
                      <Box>
                        <Typography variant="body1">{activity.activity}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                      <Chip
                        label={activity.status}
                        size="small"
                        color={
                          activity.status === 'completed' ? 'success' :
                          activity.status === 'alert' ? 'error' :
                          activity.status === 'scheduled' ? 'warning' : 'default'
                        }
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Farm Status
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Soil Moisture
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Crop Health
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={85} 
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Pest Risk
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={30} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}