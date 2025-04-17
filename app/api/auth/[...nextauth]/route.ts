import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
            throw new Error(errorData.detail || "Authentication failed");
          }

          // authenticated user
          const data = await res.json();

          return {
            id: data.user.id, // Ensure the 'id' field is included
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
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.access = token.access;
      session.refresh = token.refresh;
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
