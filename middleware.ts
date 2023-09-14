import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
} from 'next/server';

const secret = process.env.JWT_SECRET;

export async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const session = await getToken({
    req,
    secret,
    raw: true,
  });
  const { href } = req.nextUrl;

  // if user does not login, force to login page
  // (when not in login or join page)
  if (!href.includes('/api')) {
    if (
      !href.includes('/login') &&
      !href.includes('/join') &&
      !session
    ) {
      return NextResponse.redirect(
        new URL('/login', req.url),
      );
    }

    // when user is logged in and tries to go login or join page, force to home page
    if (href.includes('/login') || href.includes('/join')) {
      if (session) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
  ],
};
