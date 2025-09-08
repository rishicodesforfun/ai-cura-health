// Default users for demo purposes
const DEFAULT_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    age: "30",
    gender: "male",
    weight: "70",
    height: "175",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    age: "25",
    gender: "female",
    weight: "60",
    height: "165",
    createdAt: new Date().toISOString()
  }
];

// Initialize localStorage with default users if empty
export const initializeUsers = () => {
  const users = localStorage.getItem("aicura_users");
  if (!users) {
    localStorage.setItem("aicura_users", JSON.stringify(DEFAULT_USERS));
  }
};

// Get all users
export const getUsers = () => {
  const users = localStorage.getItem("aicura_users");
  return users ? JSON.parse(users) : [];
};

// Add a new user
export const addUser = (user: any) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("aicura_users", JSON.stringify(users));
};

// Find user by email
export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((user: any) => user.email === email);
};

// Find user by email and password
export const findUserByEmailAndPassword = (email: string, password: string) => {
  const users = getUsers();
  return users.find((user: any) => user.email === email && user.password === password);
};