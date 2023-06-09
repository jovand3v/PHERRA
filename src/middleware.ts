import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware: NextMiddleware = async (req: NextRequest) => {
  if (process.env.JWT_SECRET && req.cookies.has("jwt_token")) {
    const jwtToken = req.cookies.get("jwt_token")?.value ?? "";
    try {
      await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
      if (!req.nextUrl.pathname.startsWith("/admin/dashboard")) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.next();
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (req.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  } else {
    return NextResponse.next();
  }
};

export const config = {
  matcher: "/admin/:path*",
};
