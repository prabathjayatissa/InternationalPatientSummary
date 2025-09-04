import React from 'react';
import { User, Calendar, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { Patient } from '../types/fhir';
import { FHIRParser } from '../utils/fhirParser';

interface PatientHeaderProps {
  patient: Patient;
  lastUpdated?: string;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ patient, lastUpdated }) => {
  const displayName = FHIRParser.getDisplayName(patient);
  const primaryAddress = patient.address?.[0];
  const primaryPhone = patient.telecom?.find(t => t.system === 'phone');
  const primaryEmail = patient.telecom?.find(t => t.system === 'email');
  const nationalId = patient.identifier?.find(id => 
    id.type?.coding?.[0]?.code === 'NI'
  );

  const age = patient.birthDate ? 
    Math.floor((new Date().getTime() - new Date(patient.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 
    null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              {patient.gender && (
                <span className="capitalize">{patient.gender}</span>
              )}
              {patient.birthDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{FHIRParser.formatDate(patient.birthDate)}</span>
                  {age && <span className="text-gray-500">({age} years)</span>}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="text-right">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>Last updated</span>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {FHIRParser.formatDate(lastUpdated)}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        {nationalId && (
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">National ID</p>
              <p className="text-sm font-medium text-gray-900">{nationalId.value}</p>
            </div>
          </div>
        )}

        {primaryAddress && (
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
              <p className="text-sm font-medium text-gray-900">
                {primaryAddress.line?.join(', ')}
                {primaryAddress.line && <br />}
                {primaryAddress.city} {primaryAddress.postalCode}
                {primaryAddress.country && <br />}
                {primaryAddress.country}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {primaryPhone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-sm font-medium text-gray-900">{primaryPhone.value}</p>
              </div>
            </div>
          )}

          {primaryEmail && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-gray-900">{primaryEmail.value}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};