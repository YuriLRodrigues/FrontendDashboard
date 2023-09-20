import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
  
  console.log(token)

  try {
    const res = await fetch(
      "https://backend-dashboard-opal.vercel.app/newdeposit",
      {
        method: "POST",
        body: JSON.stringify(await req.json()),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res)
    const expense = await res.json();
    console.log(expense)
    NextResponse.json(expense);
  } catch (error) {
    NextResponse.json({ error: "Erro ao fazer um novo depósito" });
  }
}