import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../db/connectToDatabase";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("employee_management");

    const employees = await db.collection("employee").find().toArray();

    const responseData = {
      success: "Employees From Server",
      employees: employees
    };

    return NextResponse.json(responseData);
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong! Try Again!" });
  }
}
