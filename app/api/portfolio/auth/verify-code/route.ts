import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/Otp";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback_secret_make_sure_to_change_this",
);

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 },
      );
    }

    await dbConnect();

    const activeOtp = await Otp.findOne({ email, code });

    if (!activeOtp) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired verification code" },
        { status: 400 },
      );
    }

    await Otp.deleteOne({ _id: activeOtp._id });

    const token = await new SignJWT({ email: ADMIN_EMAIL, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
