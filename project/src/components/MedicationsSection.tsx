import React from 'react';
import { Pill, Clock, Route, Zap } from 'lucide-react';
import { MedicationStatement } from '../types/fhir';
import { FHIRParser } from '../utils/fhirParser';
import clsx from 'clsx';

interface MedicationsSectionProps {
  medications: MedicationStatement[];
}

export const MedicationsSection: React.FC<MedicationsSectionProps> = ({ medications }) => {
  if (medications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Current Medications</h2>
        </div>
        <div className="text-center py-8">
          <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No current medications recorded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Pill className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Current Medications</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {medications.length} {medications.length === 1 ? 'medication' : 'medications'}
        </span>
      </div>

      <div className="grid gap-4">
        {medications.map((medication, index) => {
          const medicationName = FHIRParser.getCodeDisplay(
            medication.medicationCodeableConcept?.coding,
            medication.medicationCodeableConcept?.text
          );
          const status = medication.status;
          const dosage = medication.dosage?.[0];
          const route = dosage?.route?.coding?.[0]?.display || 'Unknown route';
          const dose = dosage?.doseAndRate?.[0]?.doseQuantity;
          const timing = dosage?.timing?.repeat;

          let frequencyText = '';
          if (timing?.frequency && timing?.period && timing?.periodUnit) {
            const periodMap: Record<string, string> = {
              'd': 'day',
              'h': 'hour',
              'wk': 'week',
              'mo': 'month'
            };
            const periodUnit = periodMap[timing.periodUnit] || timing.periodUnit;
            frequencyText = `${timing.frequency}x per ${periodUnit}`;
          }

          return (
            <div key={medication.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{medicationName}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full border',
                      FHIRParser.getStatusColor(status)
                    )}>
                      {status.toUpperCase()}
                    </span>
                    {medication.effectiveDateTime && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Since {FHIRParser.formatDate(medication.effectiveDateTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {dosage && (
                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Dosage Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    {dosage.text && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-900">{dosage.text}</span>
                      </div>
                    )}
                    
                    {dose && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{dose.value} {dose.unit}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Route className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700">{route}</span>
                    </div>

                    {frequencyText && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700">{frequencyText}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};