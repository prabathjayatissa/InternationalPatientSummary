import React from 'react';
import { Activity, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Condition } from '../types/fhir';
import { FHIRParser } from '../utils/fhirParser';
import clsx from 'clsx';

interface ConditionsSectionProps {
  conditions: Condition[];
}

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  if (conditions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Medical Conditions</h2>
        </div>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">No active medical conditions recorded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Medical Conditions</h2>
        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {conditions.length} {conditions.length === 1 ? 'condition' : 'conditions'}
        </span>
      </div>

      <div className="grid gap-4">
        {conditions.map((condition, index) => {
          const conditionName = FHIRParser.getCodeDisplay(condition.code?.coding, condition.code?.text);
          const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.display || 'Unknown';
          const verificationStatus = condition.verificationStatus?.coding?.[0]?.display || 'Unknown';
          const severity = condition.severity?.coding?.[0]?.display || condition.severity?.text || 'Unknown';
          
          const isActive = clinicalStatus.toLowerCase() === 'active';
          const isConfirmed = verificationStatus.toLowerCase() === 'confirmed';

          return (
            <div key={condition.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{conditionName}</h3>
                    {isActive && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full border',
                      FHIRParser.getStatusColor(clinicalStatus)
                    )}>
                      {clinicalStatus.toUpperCase()}
                    </span>
                    
                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full border',
                      isConfirmed ? 'text-green-700 bg-green-100 border-green-200' : 'text-gray-700 bg-gray-100 border-gray-200'
                    )}>
                      {isConfirmed ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>CONFIRMED</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{verificationStatus.toUpperCase()}</span>
                        </div>
                      )}
                    </span>

                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full border',
                      FHIRParser.getSeverityColor(severity)
                    )}>
                      {severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {condition.onsetDateTime && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <div>
                      <span className="text-gray-500">Onset: </span>
                      <span className="font-medium text-gray-900">
                        {FHIRParser.formatDate(condition.onsetDateTime)}
                      </span>
                    </div>
                  </div>
                )}

                {condition.recordedDate && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Recorded: </span>
                      <span className="font-medium text-gray-900">
                        {FHIRParser.formatDate(condition.recordedDate)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};