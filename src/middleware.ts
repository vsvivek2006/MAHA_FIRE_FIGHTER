import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export function sanitizeAdminRedirect(path: string | null | undefined): string {
  if (!path) return "/admin/blog/generate";
  // Must start with /admin, cannot start with // (protocol-relative), and cannot have : (scheme injection)
  if (path.startsWith("/admin") && !path.startsWith("//") && !path.includes(":")) {
    return path;
  }
  return "/admin/blog/generate";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets, next internals, api, and files with extensions bypass middleware
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Normalize path (strip trailing slashes)
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  // Only protect /admin routes; all public routes bypass
  const isAdminPath = normalizedPath.startsWith("/admin");
  if (!isAdminPath) {
    return NextResponse.next();
  }

  const isLoginPage = normalizedPath === "/admin/login";

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      if (!isLoginPage) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        loginUrl.search = "";
        loginUrl.searchParams.set("redirectTo", sanitizeAdminRedirect(normalizedPath));
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // If unauthenticated:
    if (!user || userError) {
      if (!isLoginPage) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        loginUrl.search = "";
        loginUrl.searchParams.set("redirectTo", sanitizeAdminRedirect(normalizedPath));
        return NextResponse.redirect(loginUrl);
      }
      return supabaseResponse;
    }

    // If authenticated and visiting login page: redirect to admin area
    if (isLoginPage) {
      const redirectParam = request.nextUrl.searchParams.get("redirectTo");
      const target = sanitizeAdminRedirect(redirectParam);
      const destinationUrl = request.nextUrl.clone();
      destinationUrl.pathname = target;
      destinationUrl.search = "";
      return NextResponse.redirect(destinationUrl);
    }

    // Preserve any cookies refreshed by Supabase
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      supabaseResponse.cookies.set(cookie);
    });

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware auth error:", error);
    if (!isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      loginUrl.searchParams.set("redirectTo", sanitizeAdminRedirect(normalizedPath));
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
}

export default middleware;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
