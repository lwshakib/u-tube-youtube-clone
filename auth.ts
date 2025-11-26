import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      console.log("[auth] user name:", user?.name ?? "unknown");
      return true;
    },
  },
});
