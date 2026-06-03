import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  try {
    await dbConnect();

    const portfolioData = await Portfolio.findOne({});

    if (!portfolioData) {
      return NextResponse.json(
        { success: false, error: "No portfolio records found in database." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: portfolioData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio data" },
      { status: 500 },
    );
  }
}
