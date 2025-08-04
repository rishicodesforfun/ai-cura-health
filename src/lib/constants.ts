// AIcura Application Constants

export const APP_NAME = 'AIcura';
export const APP_DESCRIPTION = 'AI-Powered Health Assistant';

// API Configuration
export const API_ENDPOINTS = {
  GEMINI_API: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
  CUSTOM_MODEL: '/api/analyze', // Future custom model endpoint
  USER_PROFILE: '/api/user/profile',
  DIAGNOSIS_HISTORY: '/api/user/history'
};

// Health Assessment Severity Levels
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

// Health Assessment Confidence Thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 80,
  MEDIUM: 60,
  LOW: 40
} as const;

// Emergency Keywords (symptoms that require immediate attention)
export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'difficulty breathing',
  'severe bleeding',
  'unconscious',
  'stroke',
  'heart attack',
  'severe allergic reaction',
  'poisoning',
  'severe burn',
  'severe trauma'
];

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

// Age Ranges for Health Assessment
export const AGE_RANGES = [
  { min: 0, max: 12, category: 'child' },
  { min: 13, max: 17, category: 'adolescent' },
  { min: 18, max: 64, category: 'adult' },
  { min: 65, max: 120, category: 'senior' }
];

// Maximum file size for image uploads (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Supported image file types
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'aicura-user',
  DIAGNOSIS_HISTORY: 'aicura-history',
  USER_PREFERENCES: 'aicura-preferences'
};

// Default number of history items to keep
export const MAX_HISTORY_ITEMS = 50;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};
