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
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack,
  Notifications,
  WaterDrop,
  Eco,
  TrendingUp,
  Map
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`region-tabpanel-${index}`}
      aria-labelledby={`region-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function RegionDashboard() {
  const router = useRouter();
  const { region } = router.query;
  const [tabValue, setTabValue] = useState(0);
  const [regionData, setRegionData] = useState(null);

  useEffect(() => {
    if (region) {
      // Mock region data based on the region parameter
      const mockData = {
        'north': {
          name: 'Northern Region',
          crops: ['Wheat', 'Rice', 'Sugarcane', 'Cotton'],
          soilType: 'Alluvial',
          climate: 'Subtropical',
          rainfall: '800-1200mm'
        },
        'south': {
          name: 'Southern Region',
          crops: ['Rice', 'Coconut', 'Spices', 'Coffee'],
          soilType: 'Red & Laterite',
          climate: 'Tropical',
          rainfall: '1000-3000mm'
        },
        'east': {
          name: 'Eastern Region',
          crops: ['Rice', 'Jute', 'Tea', 'Potato'],
          soilType: 'Alluvial & Laterite',
          climate: 'Tropical',
          rainfall: '1200-2500mm'
        },
        'west': {
          name: 'Western Region',
          crops: ['Cotton', 'Groundnut', 'Millet', 'Pulses'],
          soilType: 'Black & Red',
          climate: 'Arid & Semi-arid',
          rainfall: '400-800mm'
        }
      };

      setRegionData(mockData[region] || mockData.north);
    }
  }, [region]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const cropRecommendations = [
    { name: 'Wheat', suitability: 85, season: 'Rabi' },
    { name: 'Rice', suitability: 90, season: 'Kharif' },
    { name: 'Cotton', suitability: 75, season: 'Kharif' },
    { name: 'Vegetables', suitability: 95, season: 'All Year' }
  ];

  const weatherForecast = [
    { day: 'Today', temp: 28, condition: 'Sunny', rain: '10%' },
    { day: 'Tomorrow', temp: 26, condition: 'Cloudy', rain: '30%' },
    { day: 'Day 3', temp: 24, condition: 'Rain', rain: '70%' },
    { day: 'Day 4', temp: 25, condition: 'Partly Cloudy', rain: '20%' }
  ];

  if (!regionData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {regionData.name} Dashboard
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Region Overview */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32' }}>
                  {regionData.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Soil Type:</strong> {regionData.soilType}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Climate:</strong> {regionData.climate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Annual Rainfall:</strong> {regionData.rainfall}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {regionData.crops.map((crop, index) => (
                    <Chip
                      key={index}
                      label={crop}
                      variant="outlined"
                      sx={{ borderColor: '#2e7d32' }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Map sx={{ fontSize: 80, color: '#2e7d32', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Agricultural Zone
                  </Typography>
                  <Typography variant="body1">
                    Optimized for {regionData.climate.toLowerCase()} climate
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Crop Recommendations" />
            <Tab label="Weather Forecast" />
            <Tab label="Soil Health" />
            <Tab label="Market Trends" />
          </Tabs>

          {/* Crop Recommendations Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {cropRecommendations.map((crop, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Eco sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        {crop.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Season: {crop.season}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={crop.suitability}
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                      />
                      <Typography variant="body2">
                        Suitability: {crop.suitability}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Weather Forecast Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {weatherForecast.map((day, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {day.day}
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#ff9800' }} gutterBottom>
                        {day.temp}°C
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {day.condition}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rain: {day.rain}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Soil Health Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Soil Nutrients
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">Nitrogen (N)</Typography>
                      <LinearProgress variant="determinate" value={75} sx={{ height: 8, mb: 2 }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">Phosphorus (P)</Typography>
                      <LinearProgress variant="determinate" value={60} sx={{ height: 8, mb: 2 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2">Potassium (K)</Typography>
                      <LinearProgress variant="determinate" value={80} sx={{ height: 8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Soil Recommendations
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Add organic compost to improve soil structure
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Consider NPK fertilizer in 4:2:1 ratio
                    </Typography>
                    <Typography variant="body2">
                      • Maintain pH level between 6.0-7.0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Market Trends Tab */}
          <TabPanel value={tabValue} index={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Market Prices
                </Typography>
                <Typography variant="body2" paragraph>
                  • Wheat: ₹2,100 per quintal
                </Typography>
                <Typography variant="body2" paragraph>
                  • Rice: ₹1,800 per quintal
                </Typography>
                <Typography variant="body2" paragraph>
                  • Cotton: ₹6,500 per quintal
                </Typography>
                <Typography variant="body2">
                  • Vegetables: Varies by type (₹40-80 per kg)
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
}