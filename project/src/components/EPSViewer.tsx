import React from 'react';
import { EPSData } from '../types/fhir';
import { PatientHeader } from './PatientHeader';
import { AllergiesSection } from './AllergiesSection';
import { MedicationsSection } from './MedicationsSection';
import { ConditionsSection } from './ConditionsSection';
import { Download, Share2, Printer as Print } from 'lucide-react';

interface EPSViewerProps {
  epsData: EPSData;
  onReset: () => void;
}

export const EPSViewer: React.FC<EPSViewerProps> = ({ epsData, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(epsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eps-${epsData.patient.id || 'export'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">European Patient Summary</h1>
            <p className="text-gray-600">HL7 FHIR Standardized Healthcare Data</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Print className="w-4 h-4 mr-2" />
              Print
            </button>
            
            <button
              onClick={handleExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            
            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Load New EPS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <PatientHeader patient={epsData.patient} lastUpdated={epsData.lastUpdated} />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <AllergiesSection allergies={epsData.allergies} />
              <MedicationsSection medications={epsData.medications} />
            </div>
            
            <div className="space-y-6">
              <ConditionsSection conditions={epsData.conditions} />
              
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">EPS Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{epsData.allergies.length}</div>
                    <div className="text-sm text-gray-600">Allergies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{epsData.medications.length}</div>
                    <div className="text-sm text-gray-600">Medications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{epsData.conditions.length}</div>
                    <div className="text-sm text-gray-600">Conditions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {epsData.lastUpdated ? '✓' : '?'}
                    </div>
                    <div className="text-sm text-gray-600">Data Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};