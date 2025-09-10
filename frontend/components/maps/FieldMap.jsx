import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Card from '../ui/Card';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FieldMap = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [map, setMap] = useState(null);

  // Mock field data with coordinates (latitude, longitude)
  const fields = [
    {
      id: 1,
      name: 'North Field',
      coordinates: [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12], [51.505, -0.12]],
      crop: 'Wheat',
      area: '5 acres',
      health: 85,
      soilMoisture: 65,
      lastIrrigation: '2024-03-15'
    },
    {
      id: 2,
      name: 'South Field',
      coordinates: [[51.5, -0.08], [51.505, -0.08], [51.505, -0.1], [51.5, -0.1]],
      crop: 'Corn',
      area: '8 acres',
      health: 92,
      soilMoisture: 72,
      lastIrrigation: '2024-03-14'
    },
    {
      id: 3,
      name: 'East Field',
      coordinates: [[51.51, -0.06], [51.515, -0.06], [51.515, -0.08], [51.51, -0.08]],
      crop: 'Soybean',
      area: '6 acres',
      health: 78,
      soilMoisture: 58,
      lastIrrigation: '2024-03-13'
    }
  ];

  const getHealthColor = (score) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 80) return '#84CC16'; // lime
    if (score >= 70) return '#F59E0B'; // amber
    if (score >= 60) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  const getHealthStatus = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Poor';
    return 'Critical';
  };

  // Fit map to show all fields when component mounts
  useEffect(() => {
    if (map && fields.length > 0) {
      const bounds = L.latLngBounds(fields.flatMap(field => field.coordinates));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, fields]);

  return (
    <Card title="Field Map Overview" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            ref={setMap}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {fields.map(field => (
              <Polygon
                key={field.id}
                positions={field.coordinates}
                pathOptions={{
                  color: getHealthColor(field.health),
                  fillColor: getHealthColor(field.health),
                  fillOpacity: 0.4,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => setSelectedField(field)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{field.name}</h3>
                    <p>Crop: {field.crop}</p>
                    <p>Area: {field.area}</p>
                    <p>Health: {field.health}% ({getHealthStatus(field.health)})</p>
                  </div>
                </Popup>
              </Polygon>
            ))}

            {/* Weather station marker */}
            <Marker position={[51.507, -0.1]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Weather Station</h3>
                  <p>Temperature: 22°C</p>
                  <p>Humidity: 65%</p>
                  <p>Wind: 12 km/h</p>
                </div>
              </Popup>
            </Marker>

            {/* Soil sensor marker */}
            <Marker position={[51.508, -0.095]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Soil Sensor</h3>
                  <p>Moisture: 68%</p>
                  <p>pH: 6.8</p>
                  <p>Last update: 2 hours ago</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Field Details Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Field Information</h3>
          
          {selectedField ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg">{selectedField.name}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-sm text-gray-600">Crop:</span>
                    <p className="font-medium">{selectedField.crop}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Area:</span>
                    <p className="font-medium">{selectedField.area}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Health Status</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Score: {selectedField.health}%</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedField.health >= 80 ? 'bg-green-100 text-green-800' :
                    selectedField.health >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getHealthStatus(selectedField.health)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${selectedField.health}%`,
                      backgroundColor: getHealthColor(selectedField.health)
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold mb-2">Soil Conditions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Moisture:</span>
                    <span className="font-medium">{selectedField.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Irrigation:</span>
                    <span className="font-medium">{selectedField.lastIrrigation}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Detailed Analysis
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🌍</div>
              <p>Click on a field on the map to see details</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Map Legend</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Excellent (90-100%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-lime-500 rounded mr-2"></div>
                <span>Good (80-89%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                <span>Fair (70-79%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span>Poor (60-69%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Critical (Below 60%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FieldMap;