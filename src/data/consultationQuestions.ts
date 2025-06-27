
export const generalQuestions = [
  {
    id: 'age',
    text: 'What is your age?',
    type: 'number' as const,
    required: true,
    validation: (value: number) => value >= 18 && value <= 80
  },
  {
    id: 'weight',
    text: 'What is your current weight in pounds?',
    type: 'number' as const,
    required: true
  },
  {
    id: 'height_feet',
    text: 'What is your height in feet?',
    type: 'select' as const,
    options: ['4', '5', '6', '7'],
    required: true
  },
  {
    id: 'height_inches',
    text: 'How many additional inches?',
    type: 'select' as const,
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    required: true
  },
  {
    id: 'biological_sex',
    text: 'What is your biological sex?',
    type: 'radio' as const,
    options: ['Male', 'Female'],
    required: true
  },
  {
    id: 'conditions',
    text: 'Do you have any of the following medical conditions? (Select all that apply)',
    type: 'multi-checkbox' as const,
    options: [
      'Diabetes (Type 1 or 2)',
      'Heart disease or cardiovascular issues',
      'Kidney disease',
      'Liver disease',
      'Thyroid disorders',
      'Eating disorders',
      'Mental health conditions',
      'None of the above'
    ],
    required: false
  },
  {
    id: 'medications',
    text: 'Please list all medications, supplements, and vitamins you are currently taking:',
    type: 'textarea' as const,
    required: false
  }
];

export const productIntakeQuestions = [
  {
    id: 'primary_goal',
    text: 'What is your primary goal with this treatment?',
    type: 'radio' as const,
    options: [
      'Weight loss',
      'Blood sugar control',
      'Both weight loss and blood sugar control'
    ],
    required: true
  },
  {
    id: 'weight_goal',
    text: 'What is your target weight loss goal? (if applicable)',
    type: 'select' as const,
    options: ['5-10 lbs', '10-20 lbs', '20-30 lbs', '30-50 lbs', '50+ lbs', 'Not applicable'],
    required: true
  },
  {
    id: 'previous_medications',
    text: 'Have you tried weight loss medications before?',
    type: 'radio' as const,
    options: [
      'No, this is my first time',
      'Yes, GLP-1 medications (Ozempic, Wegovy, etc.)',
      'Yes, other weight loss medications'
    ],
    required: true
  },
  {
    id: 'eating_habits',
    text: 'Please describe your current eating habits and any challenges you face with appetite control:',
    type: 'textarea' as const,
    required: true
  },
  {
    id: 'exercise_frequency',
    text: 'How often do you exercise?',
    type: 'select' as const,
    options: [
      'Never/Rarely',
      '1-2 times per week',
      '3-4 times per week',
      '5+ times per week',
      'Daily'
    ],
    required: true
  },
  {
    id: 'gi_issues',
    text: 'Do you experience any gastrointestinal issues? (Select all that apply)',
    type: 'multi-checkbox' as const,
    options: [
      'Frequent nausea',
      'Chronic diarrhea',
      'Severe constipation',
      'GERD/Acid reflux',
      'Gastroparesis',
      'None of the above'
    ],
    required: false
  },
  {
    id: 'allergies',
    text: 'Please list any known allergies or adverse reactions to medications, foods, or other substances:',
    type: 'textarea' as const,
    required: false
  }
];
