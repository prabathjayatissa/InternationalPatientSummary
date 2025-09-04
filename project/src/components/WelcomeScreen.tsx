import React from 'react';
import { Heart, Shield, Database, Globe, FileText, Users } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { Bundle } from '../types/fhir';

interface WelcomeScreenProps {
  onFileLoad: (bundle: Bundle) => void;
  onLoadSample: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFileLoad, onLoadSample }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            European Patient Summary
            <span className="block text-2xl font-normal text-indigo-600 mt-2">Visualizer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Parse, process, and clearly display standardized EPS data encoded with HL7 FHIR 
            for healthcare providers, patients, and next-of-kin
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">HL7 FHIR Compatible</h3>
            <p className="text-gray-600">
              Fully compliant with HL7 FHIR standards ensuring interoperability across healthcare systems
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross-Border Ready</h3>
            <p className="text-gray-600">
              Designed for seamless healthcare data exchange across European Union member states
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Audience</h3>
            <p className="text-gray-600">
              Clear visualization for healthcare providers, patients, and authorized family members
            </p>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What is EPS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Essential Medical Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Allergies and intolerances</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>Current medications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-orange-500" />
                  <span>Past and current medical conditions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Technical Standards</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HL7 FHIR R4 compliant</li>
                <li>• Structured data exchange</li>
                <li>• Cross-border interoperability</li>
                <li>• Standardized terminology</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <FileUploader onFileLoad={onFileLoad} />
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Don't have EPS data? Try our sample dataset</p>
            <button
              onClick={onLoadSample}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Load Sample EPS Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};