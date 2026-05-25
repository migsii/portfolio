import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/portfolio";
import portfolioData from "@/data/portfolioData.json";

export async function GET() {
  try {
    const response: ApiResponse = portfolioData;
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio data" },
      { status: 500 },
    );
  }
}
