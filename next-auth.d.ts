import { ProviderType, RoleType } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      avatar: string | null;
    };
  }
}
