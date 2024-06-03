/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getToken = () => {
  const storage: string | null = localStorage.getItem("authToken");
  return storage;
};

const api = async (path: string, method: string, body?: any) => {
  const localStorageToken: string | null = getToken();

  const accessToken: string | null = localStorageToken
    ? `Bearer ${localStorageToken}`
    : null;

  const options = {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    method,
    url: BASE_URL + path,
    ...(body && { data: body }),
  };

  return await axios(options)
    .then(async (response: any) => {
      return await Promise.resolve(response.data);
    })
    .catch(async (error: any) => {
      const customError = {
        ...error.response.data,
        status: error.response.status,
      };

      return await Promise.reject(customError);
    });
};
export default api;
