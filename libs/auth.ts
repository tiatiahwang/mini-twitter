import * as bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {
  NextAuthOptions,
  getServerSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Something went wrong.');
        }

        const user = await db.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error(
            JSON.stringify({
              error: 'Invalid Email.',
            }),
          );
        }

        const checkPassword = await bcrypt.compare(
          credentials?.password,
          user?.password,
        );

        if (!checkPassword) {
          throw new Error(
            JSON.stringify({
              error: 'Invalid Password',
            }),
          );
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      const user = await db.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
        },
      });
      session.user = user!;
      return session;
    },
  },
};

export const getAuthSession = () =>
  getServerSession(authOptions);
