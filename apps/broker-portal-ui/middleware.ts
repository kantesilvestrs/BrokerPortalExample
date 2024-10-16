import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.url.includes("/logout")) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/logout"],
};
