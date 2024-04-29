import { useId } from "react";

// export const BASE_URL = `http://localhost:8000/api`;
export const BASE_URL = `https://taskmanagementapi-one.vercel.app/api`;

export const AUTH_API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const TASK_API = {
  CREATE: `${BASE_URL}/tasks/create`,
  ALL: `${BASE_URL}/tasks`,
  COUNT: `${BASE_URL}/users/count`,
  SINGLE: (id: string) => `${BASE_URL}/users/profile/${id}`,
  UPDATE: (id: string) => `${BASE_URL}/cities/:${id}`,
  DELETE: (id: string) => `${BASE_URL}/cities/:${id}`,
};

export const CHAT_API = `${BASE_URL}/chat`;
