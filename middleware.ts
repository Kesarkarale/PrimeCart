import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(
  request: NextRequest
) {
  /*
   * Create the initial response.
   * Supabase may update cookies while refreshing
   * the user's session.
   */
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          /*
           * Update request cookies first.
           */
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          /*
           * Re-create response with updated request.
           */
          response = NextResponse.next({
            request,
          });

          /*
           * Copy refreshed cookies to response.
           */
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  /*
   * IMPORTANT:
   * getUser() validates the Supabase session
   * on the server.
   */
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  /*
   * Routes that require login.
   */
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/orders",
    "/checkout",
    "/wishlist",
    "/cart",
  ];

  const isProtectedRoute =
    protectedRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`)
    );

  /*
   * ---------------------------------------------------------
   * NOT LOGGED IN
   * ---------------------------------------------------------
   *
   * If someone tries to open:
   *
   * /dashboard
   *
   * without authentication,
   * send them to login.
   */
  if (
    isProtectedRoute &&
    (!user || error)
  ) {
    const loginUrl =
      new URL(
        "/login",
        request.url
      );

    /*
     * Remember where the user wanted to go.
     */
    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(
      loginUrl
    );
  }

  /*
   * ---------------------------------------------------------
   * ALREADY LOGGED IN
   * ---------------------------------------------------------
   *
   * If authenticated user manually opens:
   *
   * /login
   *
   * or
   *
   * /register
   *
   * send them directly to dashboard.
   */
  if (
    user &&
    (
      pathname === "/login" ||
      pathname === "/register"
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  /*
   * Return response containing
   * refreshed Supabase cookies.
   */
  return response;
}

/*
 * Middleware only runs on these routes.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/wishlist/:path*",
    "/cart/:path*",
    "/login",
    "/register",
  ],
};
