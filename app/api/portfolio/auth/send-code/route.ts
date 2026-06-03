import { NextResponse } from "next/server";
import { Resend } from "resend";
import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/Otp";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 },
      );
    }

    await dbConnect();

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });
    await Otp.create({ email, code: otpCode });

    await resend.emails.send({
      from: "Portfolio Admin <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: "Your Dashboard Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 24px; background-color: #09090b; color: #f4f4f5; max-width: 480px; margin: 0 auto; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #22c55e; margin-bottom: 8px;">Dashboard Access</h2>
          <p style="color: #a1a1aa; font-size: 14px;">Use the verification code below to securely sign into your administration control panel. This code expires in 5 minutes.</p>
          <div style="background-color: #18181b; padding: 16px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #ffffff; margin: 24px 0; border-radius: 8px; border: 1px solid #3f3f46;">
            ${otpCode}
          </div>
          <p style="color: #71717a; font-size: 12px;">If you did not request this login attempt, ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error("Resend/DB Auth Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
