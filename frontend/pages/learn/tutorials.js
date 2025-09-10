import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import {
  ArrowBack,
  PlayCircle,
  Article,
  VideoLibrary,
  Book
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tutorial-tabpanel-${index}`}
      aria-labelledby={`tutorial-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const tutorials = {
  videos: [
    {
      id: 1,
      title: 'Smart Irrigation System Setup',
      duration: '15:30',
      category: 'Irrigation',
      level: 'Beginner',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Crop Health Monitoring',
      duration: '22:15',
      category: 'Monitoring',
      level: 'Intermediate',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Soil Testing Techniques',
      duration: '18:45',
      category: 'Soil Health',
      level: 'Beginner',
      thumbnail: '/api/placeholder/300/200'
    }
  ],
  articles: [
    {
      id: 1,
      title: 'Organic Farming Best Practices',
      readTime: '8 min',
      category: 'Organic Farming',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Pest Management Guide',
      readTime: '12 min',
      category: 'Pest Control',
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Water Conservation Methods',
      readTime: '6 min',
      category: 'Irrigation',
      level: 'Beginner'
    }
  ],
  guides: [
    {
      id: 1,
      title: 'Complete Farm Automation Guide',
      pages: '24',
      category: 'Automation',
      level: 'Advanced'
    },
    {
      id: 2,
      title: 'Seasonal Crop Planning',
      pages: '18',
      category: 'Planning',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Market Analysis for Farmers',
      pages: '15',
      category: 'Business',
      level: 'Intermediate'
    }
  ]
};

export default function Tutorials() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/learn')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Learning Center
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#2e7d32', mb: 2 }}>
          FarmAI Learning Center
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Learn modern farming techniques and maximize your farm's potential
        </Typography>

        <Card>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<VideoLibrary />} label="Video Tutorials" />
            <Tab icon={<Article />} label="Articles" />
            <Tab icon={<Book />} label="Guides" />
          </Tabs>

          {/* Video Tutorials Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {tutorials.videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card sx={{ cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip label={video.category} size="small" />
                        <Chip label={video.level} size="small" color="primary" />
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {video.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <PlayCircle sx={{ mr: 1, fontSize: 16 }} />
                        <Typography variant="body2">{video.duration}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Articles Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {tutorials.articles.map((article) => (
                <Grid item xs={12} md={6} key={article.id}>
                  <Card sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip label={article.category} size="small" />
                      <Chip label={article.level} size="small" color="primary" />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {article.readTime} read
                    </Typography>
                    <Button variant="outlined" size="small">
                      Read Article
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Guides Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {tutorials.guides.map((guide) => (
                <Grid item xs={12} md={6} key={guide.id}>
                  <Card sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip label={guide.category} size="small" />
                      <Chip label={guide.level} size="small" color="primary" />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {guide.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {guide.pages} pages
                    </Typography>
                    <Button variant="outlined" size="small">
                      Download Guide
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Card>

        {/* Learning Paths */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Learning Paths
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Beginner Farmer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start your farming journey with basic concepts and practices
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Advanced Techniques
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learn advanced farming methods and technology integration
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Business Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Master farm business management and market strategies
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}