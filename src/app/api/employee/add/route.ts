import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../db/connectToDatabase";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const employee = {
      key: reqBody.key,
      name: reqBody.name,
      email: reqBody.email,
      phone: reqBody.phone,
      isBlocked: reqBody.isBlocked,
    };

    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db("employee_management");

    const result = await db.collection("employee").insertOne(employee);
    const newEmployee = {
      ...employee,
    };

    return NextResponse.json({ message: "Employee Created Successfully!!", newEmployee });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong While Creating Employee! Try Again!" });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("employee_management");
    console.log(client);

    return NextResponse.json(
      { success: "Response From API Server" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong! Try Again!" });
  }
}
