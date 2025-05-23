import { JWT } from "next-auth/jwt";
import { beautifyErrors } from "@/lib/utils";
import NextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ refresh: token.refresh }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return {
      ...token,
      access: data.access,
      refresh: data.refresh,
    };
  } catch (error: any) {
    console.log("RefreshAccessTokenError => ", error.message);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function googleAccessToken(token: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-google-login`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    // console.log("data => ", data, " \n");
    // console.log("response => ", response, " \n");

    if (!response.ok) {
      // Handle specific error status
      console.log("GoogleAccessToken failed response =>", data);
      return Promise.reject({
        error: "GoogleAccessTokenFailed",
        status: response.status,
        data,
      });
    }

    return data;
  } catch (error: any) {
    console.log("GoogleAccessTokenError => ", error);
    return {
      error: "GoogleAccessTokenError",
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/access-token`;

          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          // unauthenticated user
          if (!res.ok) {
            const errorData = await res.json();
            console.log("Error in auth: ", errorData);
            throw new Error(
              beautifyErrors(errorData) || "Authentication failed"
            );
          }

          // authenticated user
          const data = await res.json();

          return {
            id: data.user.id,
            access: data.access,
            refresh: data.refresh,
            user: data.user,
          };
        } catch (error: any) {
          console.error("Error in auth: ", error.message);
          throw new Error(error.message);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Google sign-in
      if (account?.provider === "google" && user) {
        const response = await googleAccessToken(account?.id_token as string);

        return {
          ...token,
          access: response.access_token,
          refresh: response.refresh_token,
          user: response.user,
        };
      }

      if (user && "access" in user && "refresh" in user) {
        return {
          ...token,
          access: user.access,
          refresh: user.refresh,
          user: user.user,
        };
      }

      // Refresh only for credentials-based tokens
      if (
        token.access &&
        token.refresh &&
        token.accessTokenExpires &&
        Date.now() > token.accessTokenExpires
      ) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.access = token.access;
      session.refresh = token.refresh;
      session.user = token.user;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
