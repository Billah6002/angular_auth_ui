// Extend Window interface to include __env
declare global {
  interface Window {
    __env?: {
      apiUrl: string;
    };
  }
}

export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined' && window.__env?.apiUrl) || 'http://localhost:8080/api/Auth'
};