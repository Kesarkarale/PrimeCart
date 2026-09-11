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
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

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

  // If user is not logged in and tries to access
  // a protected route, redirect to login.
  if (isProtectedRoute && !user) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
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
    "/register",
  ],
};
