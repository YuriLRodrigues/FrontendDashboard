import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;

  try {
    const res = await fetch(
      "https://backend-dashboard-opal.vercel.app/newexpense",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const expense = await res.json();
    console.log(expense)
    NextResponse.json(expense);
  } catch (error) {
    NextResponse.json({ error: "A finança não pode ser criada" });
  }
}
