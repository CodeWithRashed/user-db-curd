import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  const responseData = {
    success: true,
    message: "Server is up and running..",
  };

  return NextResponse.json(responseData);
}
