// app/api/verifyResetCodeWithCookie/route.ts
import verifyResetCode from "@/api/verifyResetCode.api";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { resetCode } = await req.json();

  const result = await verifyResetCode({ resetCode });

  if (result.status === "Success") {
    const response = NextResponse.json({ status: "Success" });

    // Set a secure, HTTP-only cookie
    response.cookies.set("resetVerified", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 10 * 60, // expires in 10 minutes
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }

  return NextResponse.json(
    { status: "Error", message: result.message },
    { status: 400 }
  );
}
