import React from 'react';
import { useState } from 'react';
import { Bundle, EPSData } from './types/fhir';
import { FHIRParser } from './utils/fhirParser';
import { WelcomeScreen } from './components/WelcomeScreen';
import { EPSViewer } from './components/EPSViewer';
import { sampleEPSBundle } from './data/sampleEPS';

function App() {
  const [epsData, setEpsData] = useState<EPSData | null>(null);

  const handleFileLoad = (bundle: Bundle) => {
    try {
      const parsedData = FHIRParser.parseEPS(bundle);
      setEpsData(parsedData);
    } catch (error) {
      console.error('Error parsing EPS data:', error);
      alert('Error parsing EPS data. Please check the file format.');
    }
  };
    
  const handleLoadSample = () => {
    const parsedData = FHIRParser.parseEPS(sampleEPSBundle);
    setEpsData(parsedData);
  };

  const handleReset = () => {
    setEpsData(null);
  };

  if (epsData) {
    return <EPSViewer epsData={epsData} onReset={handleReset} />;
  }

  return (
    <WelcomeScreen onFileLoad={handleFileLoad} onLoadSample={handleLoadSample} />
  );
}

export default App;
