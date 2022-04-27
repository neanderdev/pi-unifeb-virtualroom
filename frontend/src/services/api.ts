import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

import { signOut } from "../contexts/AuthContext";

import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

interface IResponseData {
  message: string;
  code: string;
}

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // refresh token
        const data = error.response.data as IResponseData;

        if (data?.code === "token.expired") {
          cookies = parseCookies(ctx);

          const { "nextauth.refreshToken": token } = cookies;

          let originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("refresh-token", {
                token,
              })
              .then((response) => {
                const { token_atual, refresh_token } = response.data;

                setCookie(ctx, "nextauth.token", token_atual, {
                  maxAge: 60 * 60 * 15, // 15 hours
                  path: "/",
                });
                setCookie(ctx, "nextauth.refreshToken", refresh_token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                api.defaults.headers["Authorization"] = `Beared ${token_atual}`;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          // Fila de Requisição no Axios
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          // deslogar o usuário
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
