import { NextRequest, NextResponse } from "next/server"
import { requireUser } from "@/lib/auth-guard"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const auth = await requireUser(req)
  if (auth instanceof NextResponse) {
    return auth // Return error response
  }

  try {
    const presentations = await prisma.presentation.findMany({
      where: {
        userId: auth.user.id,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json({ presentations })
  } catch (error) {
    console.error("Error fetching presentations:", error)
    return NextResponse.json(
      { error: "Failed to fetch presentations" },
      { status: 500 }
    )
  }
}