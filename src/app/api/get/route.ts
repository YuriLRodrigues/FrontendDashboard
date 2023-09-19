
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  // const token = await request.json()
  const token = await getServerSession(authOptions)
  console.log(token)

  // const authorization = request.headers.get('authorization')

  // const token = authorization?.split(" ")[1]

  const res = await fetch(
    "https://backend-dashboard-opal.vercel.app/mydatauser",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userData = await res.json()

  return NextResponse.json(userData)
}
