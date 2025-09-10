import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const DiseaseDetector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        disease: 'Leaf Rust',
        confidence: 87.5,
        description: 'Fungal disease causing orange-brown pustules on leaves',
        treatment: [
          'Apply fungicide containing tebuconazole',
          'Remove and destroy infected leaves',
          'Improve air circulation around plants',
          'Avoid overhead watering'
        ],
        prevention: [
          'Plant resistant varieties',
          'Maintain proper spacing',
          'Apply preventive fungicide in early season'
        ],
        severity: 'Moderate'
      };
      
      setResults(mockResults);
      setShowResultsModal(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card title="Crop Disease Detection" className="p-6">
      <div className="text-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Selected crop"
                className="max-h-64 mx-auto rounded-lg"
              />
              <button
                onClick={clearSelection}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="text-gray-500">
              <div className="text-4xl mb-2">🌿</div>
              <p className="mb-2">Upload an image of your crop leaves</p>
              <p className="text-sm text-gray-400">Supported formats: JPG, PNG, WebP</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            {selectedImage ? 'Change Image' : 'Select Image'}
          </Button>
          
          <Button
            onClick={analyzeImage}
            disabled={!selectedImage || isAnalyzing}
            variant="primary"
          >
            {isAnalyzing ? 'Analyzing...' : 'Detect Disease'}
          </Button>
        </div>

        {results && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              ✅ Analysis complete! Click to view detailed results.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        title="Disease Analysis Results"
        size="large"
      >
        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800">Disease Detected</h4>
                <p className="text-lg font-bold">{results.disease}</p>
                <p className="text-sm">Confidence: {results.confidence}%</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800">Severity</h4>
                <p className="text-lg font-bold">{results.severity}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{results.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommended Treatment</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {results.treatment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Prevention Tips</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {results.prevention.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default DiseaseDetector;