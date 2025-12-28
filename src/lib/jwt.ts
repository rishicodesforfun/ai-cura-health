import { JWTPayload } from "./types";

// Secret key for JWT (in a real app, this should be on the server)
// WARNING: This client-side JWT implementation is for demonstration purposes only.
// In a production application, JWTs should be signed and verified on a secure server.
const SECRET_KEY = 'aicura-jwt-secret-key';

// Generate a JWT token
export const generateToken = (payload: Omit<JWTPayload, 'exp'>): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload: JWTPayload = {
    ...payload,
    exp: now + (24 * 60 * 60) // 24 hours expiration
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(tokenPayload));
  
  // Create signature (in a real app, this should be done with proper crypto)
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${SECRET_KEY}`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Verify a JWT token
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    
    // Verify signature (simplified for demo)
    const expectedSignature = btoa(`${encodedHeader}.${encodedPayload}.${SECRET_KEY}`);
    if (signature !== expectedSignature) {
      return null;
    }
    
    const payload = JSON.parse(atob(encodedPayload));
    
    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
};

// Get current user from JWT token
export const getCurrentUser = (): JWTPayload | null => {
  const token = localStorage.getItem('aicura_jwt_token');
  if (!token) return null;
  
  return verifyToken(token);
};

// Set JWT token
export const setAuthToken = (token: string) => {
  localStorage.setItem('aicura_jwt_token', token);
};

// Remove JWT token
export const removeAuthToken = () => {
  localStorage.removeItem('aicura_jwt_token');
};