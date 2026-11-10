import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const isProtectedApiRoute = (pathname: string) => pathname.startsWith('/api/admin');

const i18nMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Non API routes
  if (!pathname.startsWith('/api')) {
    return i18nMiddleware(req);
  }

  // API routes
  if (isProtectedApiRoute(pathname)) {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      return new Response(null, { status: 401 });
    }
  }
});

export const config = {
  matcher: [
     // Skip Next.js internals and all static files, unless found in search params
     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}