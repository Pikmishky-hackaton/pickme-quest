import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              access_token: account.access_token,
            }
          );

          if (res.status === 200) {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            return true;
          }
        } catch (error) {
          console.error("Django auth error:", error);
          return false;
        }
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
