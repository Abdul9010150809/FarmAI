import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Chip,
  LinearProgress,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  LocationOn,
  CalendarToday,
  Phone,
  Email,
  Farm,
  TrendingUp,
  WaterDrop,
  Eco
} from '@mui/icons-material';

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [farmStats, setFarmStats] = useState(null);

  useEffect(() => {
    // Mock user data
    setUserData({
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 9876543210',
      location: 'Punjab, India',
      joinDate: 'January 15, 2023',
      farmName: 'Green Fields Farm',
      farmSize: '5 hectares',
      experience: '8 years',
      crops: ['Wheat', 'Rice', 'Vegetables']
    });

    // Mock farm statistics
    setFarmStats({
      cropHealth: 85,
      waterEfficiency: 75,
      soilQuality: 90,
      yieldPrediction: 88
    });
  }, []);

  const profileSections = [
    {
      title: 'Field Management',
      description: 'Manage your farm fields and crop details',
      icon: <Farm sx={{ fontSize: 30 }} />,
      route: '/profile/fields',
      color: '#4caf50'
    },
    {
      title: 'Subscription',
      description: 'View and manage your subscription plan',
      icon: <TrendingUp sx={{ fontSize: 30 }} />,
      route: '/profile/subscription',
      color: '#2196f3'
    },
    {
      title: 'Settings',
      description: 'Account and application settings',
      icon: <Eco sx={{ fontSize: 30 }} />,
      route: '/profile/settings',
      color: '#ff9800'
    }
  ];

  if (!userData || !farmStats) {
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
            My Profile
          </Typography>
          <Button
            color="inherit"
            startIcon={<Edit />}
            onClick={() => router.push('/profile/settings')}
          >
            Edit
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* User Profile Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: '3rem',
                    bgcolor: '#2e7d32',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {userData.name.charAt(0)}
                </Avatar>
                <Button variant="outlined" size="small">
                  Change Photo
                </Button>
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32' }}>
                  {userData.name}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">{userData.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">{userData.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">{userData.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      Member since {userData.joinDate}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {userData.crops.map((crop, index) => (
                    <Chip
                      key={index}
                      label={crop}
                      variant="outlined"
                      sx={{ borderColor: '#2e7d32' }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Farm Information */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Farm Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Farm Name:</strong> {userData.farmName}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Farm Size:</strong> {userData.farmSize}
                </Typography>
                <Typography variant="body1">
                  <strong>Farming Experience:</strong> {userData.experience}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Farm Statistics
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Crop Health
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={farmStats.cropHealth}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {farmStats.cropHealth}% Excellent
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Water Efficiency
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={farmStats.waterEfficiency}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {farmStats.waterEfficiency}% Good
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" gutterBottom>
                    Soil Quality
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={farmStats.soilQuality}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {farmStats.soilQuality}% Excellent
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Profile Sections */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Manage Your Account
        </Typography>

        <Grid container spacing={3}>
          {profileSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
                onClick={() => router.push(section.route)}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: section.color, mb: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {section.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: section.color, color: section.color }}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box>
              {[
                'Updated field irrigation schedule',
                'Completed soil health assessment',
                'Received crop health report',
                'Scheduled harvest for next week'
              ].map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < 3 ? '1px solid #e0e0e0' : 'none'
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#4caf50',
                      mr: 2
                    }}
                  />
                  <Typography variant="body2">{activity}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}