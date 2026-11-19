/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID || process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
        const apiUrl = `${baseUrl}/api/signindj`;
        const provider = account?.provider || 'oauth';

        // Independent account identification per provider
        const rawName = user.name || (profile as any)?.login || user.email?.split('@')[0] || "User";
        const email = user.email || `${(profile as any)?.login || 'user'}@github.local`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: rawName,
                email: email,
                mode: provider,
                provider: provider,
            }),
        });

        if (!response.ok) {
            console.error("Error in POST request:", response.statusText);
        }
      } catch (error) {
        console.error("Error in middleware POST request:", error);
      }

      return true;
    },

    async session({ session, token, user }) {
      return session;
    },
  },
});
