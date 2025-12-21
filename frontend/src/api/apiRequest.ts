import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5001";

const publicInstance = axios.create({
  baseURL: API_BASE_URL
});

const privateInstance = axios.create({
  baseURL: API_BASE_URL
});

export const publicApi = publicInstance;
export const privateApi = privateInstance;

export function setApiAuthorizationHeader(token: string) {
  if (token)
    privateInstance.defaults.headers.common[
      "Authorization"
    ] = `bearer ${token}`;
}
