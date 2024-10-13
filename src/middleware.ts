import { type NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

/**
 * Using withAuth middleware to handle business logic need here
 */
export default withAuth(
  async (_request: NextRequest) => {

    // const token = await getToken({ req: request });

    return NextResponse.next();
  },
  // {
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
  // }
);

/**
 * Middleware will be triggered ONLY config Match all request paths
 */
export const config = {
  // Match all request paths except for the ones starting with:
  //  - _next/static (static files)
  //  - _next/image (image optimization files)
  //  - favicon.ico
  //
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // https://github.com/vercel/next.js/blob/v13.4.17/examples/app-dir-i18n-routing/middleware.ts#L63
  // https://github.com/i18next/next-13-app-dir-i18next-example/blob/3d653a46ae33f46abc011b6186f7a4595b84129f/middleware.js#L9
  // https://github.com/amannn/next-intl/blob/v2.19.1/examples/example-next-13/src/middleware.tsx#L10
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
