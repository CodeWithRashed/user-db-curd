import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../db/connectToDatabase";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }) {
//GETTING ID AND UPDATED DATA
  const id = params.id;
  const reqBody = await request.json();

  try {
    //CONNECTING TO DB
    const client = await clientPromise;
    const db = client.db("employee_management");

    //UPDATING DATA
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
