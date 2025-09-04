import React from 'react';
import { AlertTriangle, Shield, Clock } from 'lucide-react';
import { AllergyIntolerance } from '../types/fhir';
import { FHIRParser } from '../utils/fhirParser';
import clsx from 'clsx';

interface AllergiesSectionProps {
  allergies: AllergyIntolerance[];
}

export const AllergiesSection: React.FC<AllergiesSectionProps> = ({ allergies }) => {
  if (allergies.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Allergies & Intolerances</h2>
        </div>
        <div className="text-center py-8">
          <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">No known allergies or intolerances recorded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Allergies & Intolerances</h2>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {allergies.length} {allergies.length === 1 ? 'allergy' : 'allergies'}
        </span>
      </div>

      <div className="space-y-4">
        {allergies.map((allergy, index) => {
          const allergenName = FHIRParser.getCodeDisplay(allergy.code?.coding, allergy.code?.text);
          const clinicalStatus = allergy.clinicalStatus?.coding?.[0]?.display || 'Unknown';
          const criticality = allergy.criticality || 'unknown';
          const reactions = allergy.reaction || [];
          
          const criticalityColor = criticality === 'high' ? 'border-red-300 bg-red-50' : 
                                 criticality === 'low' ? 'border-yellow-300 bg-yellow-50' : 
                                 'border-gray-300 bg-gray-50';

          return (
            <div key={allergy.id || index} className={clsx(
              'border-l-4 rounded-lg p-4 transition-all duration-200 hover:shadow-md',
              criticalityColor
            )}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{allergenName}</h3>
                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full border',
                      criticality === 'high' ? 'text-red-700 bg-red-100 border-red-200' :
                      criticality === 'low' ? 'text-yellow-700 bg-yellow-100 border-yellow-200' :
                      'text-gray-700 bg-gray-100 border-gray-200'
                    )}>
                      {criticality.toUpperCase()} RISK
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className={clsx(
                      'px-2 py-1 rounded-full text-xs font-medium border',
                      FHIRParser.getStatusColor(clinicalStatus)
                    )}>
                      {clinicalStatus}
                    </span>
                    {allergy.recordedDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Recorded {FHIRParser.formatDate(allergy.recordedDate)}</span>
                      </div>
                    )}
                  </div>

                  {reactions.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Known Reactions:</h4>
                      <div className="space-y-1">
                        {reactions.map((reaction, reactionIndex) => (
                          <div key={reactionIndex} className="flex items-center space-x-2">
                            {reaction.manifestation?.map((manifestation, manifestationIndex) => {
                              const reactionName = FHIRParser.getCodeDisplay(manifestation.coding, manifestation.text);
                              const severity = reaction.severity || 'unknown';
                              
                              return (
                                <span key={manifestationIndex} className={clsx(
                                  'text-xs px-2 py-1 rounded-full border font-medium',
                                  FHIRParser.getSeverityColor(severity)
                                )}>
                                  {reactionName} ({severity})
                                </span>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};