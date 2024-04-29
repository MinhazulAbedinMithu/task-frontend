import { useId } from "react";

// export const BASE_URL = `http://localhost:8000/api`;
export const BASE_URL = `https://taskmanagementapi-one.vercel.app/api`;

export const AUTH_API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  PROFILE: `${BASE_URL}/auth/profile`,
};

export const TASK_API = {
  CREATE: `${BASE_URL}/tasks/create`,
  ALL: `${BASE_URL}/tasks`,
  SINGLE: (id: string) => `${BASE_URL}/tasks/${id}`,
  UPDATE: (id: string) => `${BASE_URL}/tasks/${id}`,
  DELETE: (id: string) => `${BASE_URL}/tasks/${id}`,
};

export const CHAT_API = `${BASE_URL}/chat`;
