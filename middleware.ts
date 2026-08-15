import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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
          // Update request cookies
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Create new response with updated request
          response = NextResponse.next({
            request,
          });

          // Update response cookies
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
   * IMPORTANT
   * getUser() validates the Supabase session.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  /*
   * ============================================================
   * PROTECTED ROUTES
   * ============================================================
   */

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/orders",
    "/checkout",
    "/wishlist",
    "/cart",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  /*
   * ============================================================
   * USER IS NOT LOGGED IN
   * ============================================================
   *
   * If user tries to access:
   *
   * /dashboard
   * /profile
   * /orders
   * /checkout
   * /wishlist
   * /cart
   *
   * without authentication,
   * redirect to /login.
   */

  if (isProtectedRoute && !user) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    /*
     * Remember the page the user wanted.
     *
     * Example:
     * /dashboard
     *
     * becomes:
     * /login?redirect=/dashboard
     */

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  /*
   * ============================================================
   * LOGIN / REGISTER
   * ============================================================
   *
   * VERY IMPORTANT:
   *
   * DO NOT redirect /login to /dashboard here.
   *
   * This allows:
   *
   * Login button
   *      ↓
   * /login
   *      ↓
   * Email + Password
   *      ↓
   * Login Now
   *      ↓
   * Successful authentication
   *      ↓
   * /dashboard
   *
   * The actual login redirect is handled
   * inside the login page after signInWithPassword().
   */

  if (
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return response;
  }

  /*
   * ============================================================
   * EVERYTHING ELSE
   * ============================================================
   */

  return response;
}

/*
 * ==============================================================
 * MIDDLEWARE MATCHER
 * ==============================================================
 *
 * Middleware will run only on these routes.
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
