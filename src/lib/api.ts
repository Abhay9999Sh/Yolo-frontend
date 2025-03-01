import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to handle API responses
async function handleResponse(response: any) {
  const data = response.data;

  if (!response.status.toString().startsWith("2")) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

// Authentication API calls
export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token); // Store the token
  return handleResponse(response);
};

export const signupUser = async (userData: {
  username: string;
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}) => {
  const response = await api.post("/auth/signup", userData);
  localStorage.setItem("token", response.data.token); // Store the token
  return handleResponse(response);
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  localStorage.removeItem("token"); // Remove the token
  return handleResponse(response);
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return handleResponse(response);
};

// User profile API calls
export const getUserProfile = async () => {
  const response = await api.get("/user/profile");
  return handleResponse(response);
};

export const updateUserProfile = async (profileData: {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}) => {
  const response = await api.put("/user/profile", profileData);
  return handleResponse(response);
};
