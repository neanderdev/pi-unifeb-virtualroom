import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import decode from "jwt-decode";

import { AuthTokenError } from "../services/errors/AuthTokenError";

import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  roles?: string;
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["nextauth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ roles: string }>(token);
      const { roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        roles,
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: "/rooms",
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token");
        destroyCookie(ctx, "nextauth.refreshToken");
        destroyCookie(ctx, "access_token");
        destroyCookie(ctx, "refresh_token");

        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }
  };
}
