import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          response = NextResponse.next({
            request,
          });

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

  // IMPORTANT:
  // getUser() validates the Supabase user
  // and refreshes the auth session when needed.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log(
    "🔐 Middleware:",
    request.nextUrl.pathname,
    "User:",
    user?.email ?? "NO USER",
    "Error:",
    error?.message ?? "none"
  );

  // =========================================================
  // PROTECTED ROUTES
  // =========================================================

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/orders",
    "/checkout",
    "/wishlist",
    "/cart",
  ];

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

  // =========================================================
  // NOT LOGGED IN
  // =========================================================

  if (isProtectedRoute && !user) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    return NextResponse.redirect(
      loginUrl
    );
  }

  // =========================================================
  // LOGGED IN USER VISITS LOGIN
  // =========================================================

  if (
    request.nextUrl.pathname === "/login" &&
    user
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/wishlist/:path*",
    "/cart/:path*",
    "/login",
  ],
};
