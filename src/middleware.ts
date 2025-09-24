import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      if (request.nextUrl.pathname === "/forgotpassword/resetpassword") {
        const verified = request.cookies.get("resetVerified")?.value;
        if (!verified) {
          return NextResponse.redirect(new URL("/forgotpassword", request.url));
        }
      }
      return NextResponse.next();
    }
  } else {
    if (
      request.nextUrl.pathname === "/cart" ||
      request.nextUrl.pathname === "/profile" ||
      request.nextUrl.pathname === "/allorders" ||
      request.nextUrl.pathname === "/wishlist"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (request.nextUrl.pathname === "/forgotpassword/resetpassword") {
        const verified = request.cookies.get("resetVerified")?.value;
        if (!verified) {
          return NextResponse.redirect(new URL("/forgotpassword", request.url));
        }
      }
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/cart",
    "/profile",
    "/allorders",
    "/wishlist",
    "/forgotpassword/resetpassword",
  ],
};
