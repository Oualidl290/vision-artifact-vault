
// Production configuration helpers
export const config = {
  supabase: {
    url: 'https://mqnndwfntcvcccrmrbzd.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbm5kd2ZudGN2Y2Njcm1yYnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODU1NjgsImV4cCI6MjA2NDI2MTU2OH0.rTlYEn2k5bci_zeWhf-_N85aNkZAmMya1ZltaZndpNI',
  },
  app: {
    name: 'Creative Vault',
    description: 'A personal collection of ideas, product visions, AI prompts, UI breakdowns, and inspiration documents.',
    version: '1.0.0',
  },
  features: {
    emailVerification: false, // Set to true in production if needed
    allowSignUp: true,
    maxDocuments: 1000, // Per user limit
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
} as const;

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:8080';
};

export const isProduction = () => {
  return getBaseUrl().includes('lovable.app') || getBaseUrl().includes('your-domain.com');
};
