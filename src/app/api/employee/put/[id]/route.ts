import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../db/connectToDatabase";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }) {
  const id = params.id;
  const reqBody = await request.json();
  console.log(id, reqBody);

  try {
    const client = await clientPromise;
    const db = client.db("employee_management");

    const result = await db.collection("employee").updateOne(
        { _id: new ObjectId(id) },
        { $set: reqBody }
      );
    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: "Employee updated successfully" });
    } else {
      return NextResponse.json({ error: "Failed to update employee" });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong! Try Again!" });
  }
}
