// HL7 FHIR Types for European Patient Summary
export interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: {
    profile?: string[];
    lastUpdated?: string;
  };
}

export interface Patient extends FHIRResource {
  resourceType: 'Patient';
  identifier?: Array<{
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  name?: Array<{
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
  address?: Array<{
    use?: string;
    line?: string[];
    city?: string;
    postalCode?: string;
    country?: string;
  }>;
  telecom?: Array<{
    system?: 'phone' | 'email';
    value?: string;
    use?: string;
  }>;
}

export interface AllergyIntolerance extends FHIRResource {
  resourceType: 'AllergyIntolerance';
  patient: {
    reference: string;
  };
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  criticality?: 'low' | 'high' | 'unable-to-assess';
  reaction?: Array<{
    manifestation?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    severity?: 'mild' | 'moderate' | 'severe';
  }>;
  recordedDate?: string;
}

export interface MedicationStatement extends FHIRResource {
  resourceType: 'MedicationStatement';
  subject: {
    reference: string;
  };
  medicationCodeableConcept?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  status: 'active' | 'completed' | 'entered-in-error' | 'intended' | 'stopped' | 'on-hold' | 'unknown' | 'not-taken';
  effectiveDateTime?: string;
  effectivePeriod?: {
    start?: string;
    end?: string;
  };
  dosage?: Array<{
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    doseAndRate?: Array<{
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;
}

export interface Condition extends FHIRResource {
  resourceType: 'Condition';
  subject: {
    reference: string;
  };
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  severity?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  onsetDateTime?: string;
  recordedDate?: string;
}

export interface Bundle extends FHIRResource {
  resourceType: 'Bundle';
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
  entry?: Array<{
    resource?: Patient | AllergyIntolerance | MedicationStatement | Condition;
    fullUrl?: string;
  }>;
}

export interface EPSData {
  patient: Patient;
  allergies: AllergyIntolerance[];
  medications: MedicationStatement[];
  conditions: Condition[];
  lastUpdated?: string;
}