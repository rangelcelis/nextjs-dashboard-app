import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      console.log('nextUrl', nextUrl);

      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log('isOnDashboard - isLoggedIn');
          return true;
        }
        console.log('isOnDashboard - isLoggedIn NOT');
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log('isLoggedIn');
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
