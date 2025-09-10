import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  LocationOn,
  WaterDrop,
  Eco
} from '@mui/icons-material';

export default function FieldManagement() {
  const router = useRouter();
  const [fields, setFields] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    // Mock field data
    setFields([
      {
        id: 1,
        name: 'North Field',
        size: '2 hectares',
        crop: 'Wheat',
        soilType: 'Alluvial',
        irrigation: 'Drip',
        status: 'Active',
        plantingDate: '2024-10-01',
        harvestDate: '2025-03-15'
      },
      {
        id: 2,
        name: 'South Field',
        size: '1.5 hectares',
        crop: 'Vegetables',
        soilType: 'Loamy',
        irrigation: 'Sprinkler',
        status: 'Active',
        plantingDate: '2024-09-15',
        harvestDate: '2025-01-30'
      },
      {
        id: 3,
        name: 'East Field',
        size: '1 hectare',
        crop: 'Rice',
        soilType: 'Clay',
        irrigation: 'Flood',
        status: 'Planning',
        plantingDate: '2025-06-01',
        harvestDate: '2025-11-30'
      }
    ]);
  }, []);

  const handleAddField = () => {
    setEditField(null);
    setOpenDialog(true);
  };

  const handleEditField = (field) => {
    setEditField(field);
    setOpenDialog(true);
  };

  const handleDeleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const handleSaveField = (fieldData) => {
    if (editField) {
      setFields(fields.map(field => 
        field.id === editField.id ? { ...field, ...fieldData } : field
      ));
    } else {
      setFields([...fields, { id: Date.now(), ...fieldData }]);
    }
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Planning': return 'warning';
      case 'Harvesting': return 'info';
      case 'Fallow': return 'default';
      default: return 'default';
    }
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
            Field Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddField}
            sx={{ bgcolor: 'white', color: '#2e7d32', '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            Add Field
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', mb: 4 }}>
          Your Farm Fields
        </Typography>

        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid item xs={12} md={6} lg={4} key={field.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {field.name}
                    </Typography>
                    <Chip
                      label={field.status}
                      size="small"
                      color={getStatusColor(field.status)}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">{field.size}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Eco sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">{field.crop}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WaterDrop sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">{field.irrigation} Irrigation</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    Soil: {field.soilType}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" display="block">
                    Planting: {field.plantingDate}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Harvest: {field.harvestDate}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEditField(field)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteField(field.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {fields.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No fields added yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add your first field to start managing your farm
            </Typography>
          </Box>
        )}

        {/* Add/Edit Field Dialog */}
        <FieldDialog
          open={openDialog}
          field={editField}
          onClose={() => setOpenDialog(false)}
          onSave={handleSaveField}
        />
      </Container>
    </Box>
  );
}

function FieldDialog({ open, field, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    crop: '',
    soilType: '',
    irrigation: '',
    status: 'Planning',
    plantingDate: '',
    harvestDate: ''
  });

  useEffect(() => {
    if (field) {
      setFormData(field);
    } else {
      setFormData({
        name: '',
        size: '',
        crop: '',
        soilType: '',
        irrigation: '',
        status: 'Planning',
        plantingDate: '',
        harvestDate: ''
      });
    }
  }, [field]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {field ? 'Edit Field' : 'Add New Field'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Field Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Size (hectares)"
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Crop Type</InputLabel>
            <Select
              value={formData.crop}
              label="Crop Type"
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
            >
              <MenuItem value="Wheat">Wheat</MenuItem>
              <MenuItem value="Rice">Rice</MenuItem>
              <MenuItem value="Vegetables">Vegetables</MenuItem>
              <MenuItem value="Cotton">Cotton</MenuItem>
              <MenuItem value="Sugarcane">Sugarcane</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Soil Type</InputLabel>
            <Select
              value={formData.soilType}
              label="Soil Type"
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
            >
              <MenuItem value="Alluvial">Alluvial</MenuItem>
              <MenuItem value="Loamy">Loamy</MenuItem>
              <MenuItem value="Clay">Clay</MenuItem>
              <MenuItem value="Sandy">Sandy</MenuItem>
              <MenuItem value="Laterite">Laterite</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Irrigation Type</InputLabel>
            <Select
              value={formData.irrigation}
              label="Irrigation Type"
              onChange={(e) => setFormData({ ...formData, irrigation: e.target.value })}
            >
              <MenuItem value="Drip">Drip</MenuItem>
              <MenuItem value="Sprinkler">Sprinkler</MenuItem>
              <MenuItem value="Flood">Flood</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Planning">Planning</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Harvesting">Harvesting</MenuItem>
              <MenuItem value="Fallow">Fallow</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Planting Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.plantingDate}
            onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Harvest Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.harvestDate}
            onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {field ? 'Update' : 'Add'} Field
        </Button>
      </DialogActions>
    </Dialog>
  );
}