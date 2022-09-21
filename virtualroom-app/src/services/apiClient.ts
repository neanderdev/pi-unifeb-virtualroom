import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue: any[] = [];

interface IResponseData {
  message: string;
  code: string;
}

export function setupAPIClient() {
  const api = axios.create({
    baseURL: "http://192.168.1.11:8000",
  });

  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("@token");

      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error?.response?.status === 401) {
        // refresh token
        const data = error?.response?.data as IResponseData;

        if (data?.code === "token.expired") {
          const token = await AsyncStorage.getItem("@refresh_token");

          let originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("refresh-token", {
                token,
              })
              .then(async (response) => {
                const { token_atual, refresh_token } = response.data;

                await AsyncStorage.setItem("@token", token_atual);
                await AsyncStorage.setItem("@refresh_token", refresh_token);

                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          // Fila de Requisição no Axios
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers = {
                  Authorization: `Bearer ${token}`,
                };

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
