import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../db/connectToDatabase";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest, { params }) {
  const id = params.id;

  try {
    const client = await clientPromise;
    const db = client.db("employee_management");

    const result = await db.collection("employee").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: "Employee deleted successfully" });
    } else {
      return NextResponse.json({ error: "Failed to delete employee" });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong! Try Again!" });
  }
}
