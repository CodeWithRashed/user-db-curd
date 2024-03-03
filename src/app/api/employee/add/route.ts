import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../db/connectToDatabase";

export async function POST(request: NextRequest) {

    try {
      //GETTING DATA FROM REQUEST
      const reqBody = await request.json();
      const employee = {
        key: reqBody.key,
        name: reqBody.name,
        email: reqBody.email,
        phone: reqBody.phone,
        isBlocked: reqBody.isBlocked,
      };
  
      //CONNECTING TO MONGO DB
      const client = await clientPromise;
      const db = client.db("employee_management");
  
      const result = await db.collection("employee").insertOne(employee);
      const newEmployee = {
        ...employee,
      };
  
      //RETURNING NEW EMPLOYEE
      return NextResponse.json({ message: "Employee Created Successfully!!", newEmployee });
    } catch (err: any) {
      return NextResponse.json({ error: "Something went wrong While Creating Employee! Try Again!" });
    }
  }
  