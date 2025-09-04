import { Bundle } from '../types/fhir';

// Sample EPS data for demonstration
export const sampleEPSBundle: Bundle = {
  resourceType: 'Bundle',
  id: 'eps-example-001',
  type: 'document',
  meta: {
    profile: ['http://hl7.eu/fhir/eps/StructureDefinition/Bundle-eps'],
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  entry: [
    {
      fullUrl: 'urn:uuid:patient-001',
      resource: {
        resourceType: 'Patient',
        id: 'patient-001',
        identifier: [
          {
            system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
            value: '123456789',
            type: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                  code: 'NI',
                  display: 'National identifier'
                }
              ]
            }
          }
        ],
        name: [
          {
            use: 'official',
            family: 'Schmidt',
            given: ['Maria', 'Elena'],
            prefix: ['Dr.']
          }
        ],
        gender: 'female',
        birthDate: '1985-03-15',
        address: [
          {
            use: 'home',
            line: ['Hauptstraße 123'],
            city: 'Berlin',
            postalCode: '10115',
            country: 'DE'
          }
        ],
        telecom: [
          {
            system: 'email',
            value: 'maria.schmidt@email.com',
            use: 'home'
          },
          {
            system: 'phone',
            value: '+49 30 12345678',
            use: 'mobile'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:allergy-001',
      resource: {
        resourceType: 'AllergyIntolerance',
        id: 'allergy-001',
        patient: {
          reference: 'Patient/patient-001'
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '387517004',
              display: 'Penicillin'
            }
          ]
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
              code: 'active',
              display: 'Active'
            }
          ]
        },
        verificationStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
              code: 'confirmed',
              display: 'Confirmed'
            }
          ]
        },
        criticality: 'high',
        reaction: [
          {
            manifestation: [
              {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '247472004',
                    display: 'Hives'
                  }
                ]
              }
            ],
            severity: 'severe'
          }
        ],
        recordedDate: '2023-08-15'
      }
    },
    {
      fullUrl: 'urn:uuid:allergy-002',
      resource: {
        resourceType: 'AllergyIntolerance',
        id: 'allergy-002',
        patient: {
          reference: 'Patient/patient-001'
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '762952008',
              display: 'Peanuts'
            }
          ]
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
              code: 'active',
              display: 'Active'
            }
          ]
        },
        criticality: 'high',
        reaction: [
          {
            manifestation: [
              {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '39579001',
                    display: 'Anaphylaxis'
                  }
                ]
              }
            ],
            severity: 'severe'
          }
        ],
        recordedDate: '2022-03-10'
      }
    },
    {
      fullUrl: 'urn:uuid:medication-001',
      resource: {
        resourceType: 'MedicationStatement',
        id: 'medication-001',
        subject: {
          reference: 'Patient/patient-001'
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: 'http://www.whocc.no/atc',
              code: 'C09AA02',
              display: 'Enalapril'
            }
          ],
          text: 'Enalapril 10mg'
        },
        status: 'active',
        effectiveDateTime: '2023-01-15',
        dosage: [
          {
            text: '10mg once daily',
            timing: {
              repeat: {
                frequency: 1,
                period: 1,
                periodUnit: 'd'
              }
            },
            route: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '26643006',
                  display: 'Oral'
                }
              ]
            },
            doseAndRate: [
              {
                doseQuantity: {
                  value: 10,
                  unit: 'mg',
                  system: 'http://unitsofmeasure.org',
                  code: 'mg'
                }
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:medication-002',
      resource: {
        resourceType: 'MedicationStatement',
        id: 'medication-002',
        subject: {
          reference: 'Patient/patient-001'
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: 'http://www.whocc.no/atc',
              code: 'A10BA02',
              display: 'Metformin'
            }
          ],
          text: 'Metformin 500mg'
        },
        status: 'active',
        effectiveDateTime: '2022-11-20',
        dosage: [
          {
            text: '500mg twice daily with meals',
            timing: {
              repeat: {
                frequency: 2,
                period: 1,
                periodUnit: 'd'
              }
            },
            route: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '26643006',
                  display: 'Oral'
                }
              ]
            }
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:condition-001',
      resource: {
        resourceType: 'Condition',
        id: 'condition-001',
        subject: {
          reference: 'Patient/patient-001'
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '38341003',
              display: 'Hypertension'
            }
          ]
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'active',
              display: 'Active'
            }
          ]
        },
        verificationStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
              code: 'confirmed',
              display: 'Confirmed'
            }
          ]
        },
        severity: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '24484000',
              display: 'Severe'
            }
          ]
        },
        onsetDateTime: '2020-05-12',
        recordedDate: '2020-05-12'
      }
    },
    {
      fullUrl: 'urn:uuid:condition-002',
      resource: {
        resourceType: 'Condition',
        id: 'condition-002',
        subject: {
          reference: 'Patient/patient-001'
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '44054006',
              display: 'Type 2 Diabetes Mellitus'
            }
          ]
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'active',
              display: 'Active'
            }
          ]
        },
        verificationStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
              code: 'confirmed',
              display: 'Confirmed'
            }
          ]
        },
        severity: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '255604002',
              display: 'Mild'
            }
          ]
        },
        onsetDateTime: '2022-08-03',
        recordedDate: '2022-08-03'
      }
    }
  ]
};