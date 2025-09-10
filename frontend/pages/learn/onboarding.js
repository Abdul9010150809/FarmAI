import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Nature,
  WaterDrop,
  Eco,
  TrendingUp
} from '@mui/icons-material';

const steps = [
  {
    label: 'Farm Setup',
    icon: <Nature />,
    content: [
      'Register your farm details including size and location',
      'Set up soil type and current crop information',
      'Configure irrigation system details',
      'Add farm equipment and resources'
    ]
  },
  {
    label: 'System Configuration',
    icon: <WaterDrop />,
    content: [
      'Connect weather monitoring devices',
      'Set up soil moisture sensors',
      'Configure irrigation automation',
      'Install crop monitoring cameras'
    ]
  },
  {
    label: 'Crop Planning',
    icon: <Eco />,
    content: [
      'Select suitable crops for your region',
      'Plan crop rotation schedule',
      'Set planting and harvesting dates',
      'Configure fertilizer and pesticide schedule'
    ]
  },
  {
    label: 'Monitoring Setup',
    icon: <TrendingUp />,
    content: [
      'Set up alerts for critical conditions',
      'Configure daily reports and notifications',
      'Establish maintenance schedules',
      'Set up market price monitoring'
    ]
  }
];

export default function OnboardingGuide() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/learn');
    }
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
            Farm Setup Guide
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Box sx={{ color: '#2e7d32', mb: 3 }}>
              {steps[activeStep].icon}
            </Box>
            
            <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', mb: 4 }}>
              {steps[activeStep].label}
            </Typography>

            <Box sx={{ textAlign: 'left', mb: 4 }}>
              {steps[activeStep].content.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 2 }} />
                  <Typography variant="body1">{item}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
              >
                {activeStep === steps.length - 1 ? 'Finish Setup' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Progress Tips */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Tips
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Complete each step carefully to ensure optimal farm setup
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • You can always modify these settings later from the dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Contact support if you need assistance with any setup step
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}