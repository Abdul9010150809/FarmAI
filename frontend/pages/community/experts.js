import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Button,
  Grid,
  TextField,
  Rating
} from '@mui/material';
import {
  ArrowBack,
  Message,
  Phone,
  Email,
  Search
} from '@mui/icons-material';

export default function ExpertDirectory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const experts = [
    {
      id: 1,
      name: 'Dr. Anil Sharma',
      specialty: 'Soil Science & Fertilizers',
      experience: '15 years',
      rating: 4.8,
      avatar: 'AS',
      contact: '+91 9876543210',
      email: 'anil.sharma@agriculture.com',
      expertise: ['Soil Health', 'Nutrient Management', 'Organic Farming'],
      location: 'Punjab'
    },
    {
      id: 2,
      name: 'Prof. Meena Patel',
      specialty: 'Crop Protection & Pest Management',
      experience: '12 years',
      rating: 4.7,
      avatar: 'MP',
      contact: '+91 9876543211',
      email: 'meena.patel@cropscience.com',
      expertise: ['IPM', 'Organic Pest Control', 'Disease Management'],
      location: 'Gujarat'
    },
    {
      id: 3,
      name: 'Rajesh Singh',
      specialty: 'Modern Irrigation Techniques',
      experience: '10 years',
      rating: 4.6,
      avatar: 'RS',
      contact: '+91 9876543212',
      email: 'rajesh.singh@irrigation.com',
      expertise: ['Drip Irrigation', 'Water Conservation', 'Smart Farming'],
      location: 'Maharashtra'
    },
    {
      id: 4,
      name: 'Dr. Sunita Reddy',
      specialty: 'Horticulture & Greenhouse Farming',
      experience: '18 years',
      rating: 4.9,
      avatar: 'SR',
      contact: '+91 9876543213',
      email: 'sunita.reddy@horticulture.com',
      expertise: ['Greenhouse Management', 'Floriculture', 'Protected Cultivation'],
      location: 'Karnataka'
    }
  ];

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/community')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expert Directory
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search */}
        <Card sx={{ mb: 4, p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search experts by name, specialty, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Card>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Agricultural Experts
        </Typography>

        <Grid container spacing={3}>
          {filteredExperts.map((expert) => (
            <Grid item xs={12} md={6} key={expert.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#2e7d32',
                        width: 60,
                        height: 60,
                        mr: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {expert.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {expert.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {expert.specialty}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Rating value={expert.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {expert.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" paragraph>
                    <strong>Experience:</strong> {expert.experience}
                  </Typography>

                  <Typography variant="body2" paragraph>
                    <strong>Location:</strong> {expert.location}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Areas of Expertise:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {expert.expertise.map((exp, index) => (
                        <Chip
                          key={index}
                          label={exp}
                          size="small"
                          sx={{ bgcolor: '#e8f5e8' }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Contact:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{expert.contact}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{expert.email}</Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Message />}
                    sx={{
                      bgcolor: '#2e7d32',
                      '&:hover': { bgcolor: '#1b5e20' }
                    }}
                  >
                    Send Message
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredExperts.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No experts found matching your search
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}