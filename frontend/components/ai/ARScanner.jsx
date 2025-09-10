import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const ARScanner = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    
    // Simulate AR scanning process
    setTimeout(() => {
      const results = [
        {
          plant: 'Wheat',
          health: 85,
          issues: ['Slight nutrient deficiency', 'Minor leaf discoloration'],
          recommendations: ['Apply nitrogen-rich fertilizer', 'Monitor for rust signs']
        },
        {
          plant: 'Tomato',
          health: 92,
          issues: ['Good health'],
          recommendations: ['Continue current practices', 'Monitor for aphids']
        }
      ];
      
      setScanResult(results[Math.floor(Math.random() * results.length)]);
      setIsScanning(false);
      setShowModal(true);
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">📱</div>
        <h3 className="font-semibold mb-2">AR Plant Scanner</h3>
        <p className="text-gray-600 text-sm">Scan plants for health analysis</p>
      </div>

      {!isScanning ? (
        <Button onClick={startScan} className="w-full">
          Start AR Scan
        </Button>
      ) : (
        <div className="text-center">
          <div className="relative mx-auto w-64 h-64 bg-gray-200 rounded-lg mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-green-600 text-lg">Scanning...</div>
            </div>
          </div>
          <p className="text-gray-600">Point your camera at the plants</p>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Scan Results"
        size="large"
      >
        {scanResult && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Plant Identified</h4>
              <p className="text-lg font-bold">{scanResult.plant}</p>
              <p>Health Score: <strong>{scanResult.health}%</strong></p>
            </div>

            {scanResult.issues.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Detected Issues</h4>
                <ul className="list-disc list-inside space-y-1">
                  {scanResult.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {scanResult.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <Button onClick={() => setShowModal(false)} className="w-full">
              Close
            </Button>
          </div>
        )}
      </Modal>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">How to use:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>Click "Start AR Scan"</li>
          <li>Allow camera access when prompted</li>
          <li>Point camera at plants</li>
          <li>Hold steady for 3 seconds</li>
          <li>View instant analysis results</li>
        </ol>
      </div>
    </div>
  );
};

export default ARScanner;