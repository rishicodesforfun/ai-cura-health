import { User } from "./types";

// Default users for demo purposes
// WARNING: In a real application, never store passwords in plain text!
// This is a mock implementation using localStorage.
const DEFAULT_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Test User",
    email: "test@example.com",
    password: "test123",
    createdAt: new Date().toISOString()
  }
];

const STORAGE_KEY = "aicura_users";

// Initialize localStorage with default users if empty
export const initializeUsers = () => {
  if (typeof window === "undefined") return; // Server-side safety check
  
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    if (!users) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    }
  } catch (error) {
    console.error("Failed to access localStorage:", error);
  }
};

// Get all users
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Failed to get users:", error);
    return [];
  }
};

// Add a new user
export const addUser = (user: User) => {
  if (typeof window === "undefined") return;
  
  try {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to add user:", error);
  }
};

// Find user by email
export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user: User) => user.email === email);
};

// Find user by email and password
export const findUserByEmailAndPassword = (email: string, password: string): User | undefined => {
  const users = getUsers();
  // Simple plain text comparison for demo
  return users.find((user: User) => user.email === email && user.password === password);
};

// Get default credentials for demo
export const getDefaultCredentials = () => {
  return {
    email: "john@example.com",
    password: "password123"
  };
};