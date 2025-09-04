import { Bundle, EPSData, Patient, AllergyIntolerance, MedicationStatement, Condition } from '../types/fhir';

export class FHIRParser {
  static parseEPS(bundle: Bundle): EPSData {
    if (!bundle.entry) {
      throw new Error('Invalid FHIR Bundle: No entries found');
    }

    const patient = this.extractPatient(bundle);
    const allergies = this.extractAllergies(bundle);
    const medications = this.extractMedications(bundle);
    const conditions = this.extractConditions(bundle);

    return {
      patient,
      allergies,
      medications,
      conditions,
      lastUpdated: bundle.meta?.lastUpdated
    };
  }

  private static extractPatient(bundle: Bundle): Patient {
    const patientEntry = bundle.entry?.find(
      entry => entry.resource?.resourceType === 'Patient'
    );

    if (!patientEntry?.resource) {
      throw new Error('No patient resource found in bundle');
    }

    return patientEntry.resource as Patient;
  }

  private static extractAllergies(bundle: Bundle): AllergyIntolerance[] {
    return bundle.entry
      ?.filter(entry => entry.resource?.resourceType === 'AllergyIntolerance')
      .map(entry => entry.resource as AllergyIntolerance) || [];
  }

  private static extractMedications(bundle: Bundle): MedicationStatement[] {
    return bundle.entry
      ?.filter(entry => entry.resource?.resourceType === 'MedicationStatement')
      .map(entry => entry.resource as MedicationStatement) || [];
  }

  private static extractConditions(bundle: Bundle): Condition[] {
    return bundle.entry
      ?.filter(entry => entry.resource?.resourceType === 'Condition')
      .map(entry => entry.resource as Condition) || [];
  }

  static getDisplayName(patient: Patient): string {
    const name = patient.name?.[0];
    if (!name) return 'Unknown Patient';

    const given = name.given?.join(' ') || '';
    const family = name.family || '';
    const prefix = name.prefix?.join(' ') || '';

    return [prefix, given, family].filter(Boolean).join(' ').trim();
  }

  static getCodeDisplay(coding?: Array<{ display?: string; code?: string }>, fallbackText?: string): string {
    if (coding && coding.length > 0) {
      return coding[0].display || coding[0].code || 'Unknown';
    }
    return fallbackText || 'Unknown';
  }

  static formatDate(dateString?: string): string {
    if (!dateString) return 'Unknown';
    
    try {
      return new Date(dateString).toLocaleDateString('en-EU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  static getSeverityColor(severity?: string): string {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
      case 'mild':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  static getStatusColor(status?: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'completed':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'stopped':
      case 'entered-in-error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'on-hold':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }
}