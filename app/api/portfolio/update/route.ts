import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await dbConnect();

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true },
    );

    return NextResponse.json({ success: true, data: updatedPortfolio });
  } catch (error) {
    console.error("Database Save Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update portfolio data" },
      { status: 500 },
    );
  }
}
