// Extend Window interface to include __env
declare global {
  interface Window {
    __env?: {
      apiUrl: string;
    };
  }
}

export const environment = {
  production: false,
  apiUrl: (typeof window !== 'undefined' && window.__env?.apiUrl) || 'https://localhost:7244/api/Auth'
};