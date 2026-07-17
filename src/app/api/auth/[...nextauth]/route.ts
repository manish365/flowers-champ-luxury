import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { backendURL } from '@/lib/api/server'; 

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET || 'fallback-secret-for-dev',
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials) {
            return null; 
        }
        const { username, password } = credentials as any;
        const email = username;

        // Use the old backend URL
        const serverUrl = backendURL || "https://flowerschamp-service-prod.up.railway.app";
        const res = await fetch(`${serverUrl}/user-auth/login`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });

        const dataResult = await res.json();
        
        if (dataResult?.success) {
          const user: any = {
            id: dataResult?.data?.user?._id,
            name: dataResult?.data?.user?.profile?.name,
            email: dataResult?.data?.user?.email?.address,
            status: dataResult?.data?.user?.status,
            accountType: dataResult?.data?.user?.accountType,
            accessToken: dataResult?.data?.token
          }

          if (res.ok && user) {
            return user;
          } else {
            return null;
          }
        } else {
          console.error(dataResult?.error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      const userData: any = user;
      if (userData) {
        token.accessToken = userData.accessToken;
        token.status = userData.status;
        token.accountType = userData.accountType;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const sessionData: any = session;
      if (sessionData?.user) {
        sessionData.user.id = token.sub;
        sessionData.user.accessToken = token.accessToken;
        sessionData.user.status = token.status;
        sessionData.user.accountType = token.accountType;
      }
      return sessionData;
    },
  },
  pages: {
    signIn: '/auth/login'
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
