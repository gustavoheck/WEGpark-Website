import axios from "axios";
import Cookies from "js-cookie";

import { AUTH_UNAUTHORIZED_EVENT } from "@/shared/constants/authEvents";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      Cookies.get("auth_token")
    ) {
      Cookies.remove("auth_token");
      Cookies.remove("auth_role");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
      }
    }

    return Promise.reject(error);
  },
);
