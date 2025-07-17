import { NextRequest, NextResponse } from "next/server"
import { requireUser } from "@/lib/auth-guard"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const auth = await requireUser(req)
  if (auth instanceof NextResponse) {
    return auth // Return error response
  }

  try {
    const presentation = await prisma.presentation.findFirst({
      where: {
        id: params.id,
        userId: auth.user.id,
      },
    })

    if (!presentation) {
      return NextResponse.json(
        { error: "Presentation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ presentation })
  } catch (error) {
    console.error("Error fetching presentation:", error)
    return NextResponse.json(
      { error: "Failed to fetch presentation" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const auth = await requireUser(req)
  if (auth instanceof NextResponse) {
    return auth // Return error response
  }

  try {
    const body = await req.json()
    
    // Verify the presentation belongs to the user
    const existingPresentation = await prisma.presentation.findFirst({
      where: {
        id: params.id,
        userId: auth.user.id,
      },
    })

    if (!existingPresentation) {
      return NextResponse.json(
        { error: "Presentation not found" },
        { status: 404 }
      )
    }

    // Update the presentation
    const updatedPresentation = await prisma.presentation.update({
      where: {
        id: params.id,
      },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slides && { slides: body.slides }),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ presentation: updatedPresentation })
  } catch (error) {
    console.error("Error updating presentation:", error)
    return NextResponse.json(
      { error: "Failed to update presentation" },
      { status: 500 }
    )
  }
}