import { NextRequest, NextResponse } from "next/server"
import { requireUser } from "@/lib/auth-guard"
import { prisma } from "@/lib/prisma"

interface GenerateRequest {
  title: string
  prompt: string
}

// Mock slide generation for now
function generateSlides(_prompt: string) {
  const slides = [
    {
      id: "1",
      title: "Introduction",
      bullets: [
        "Welcome to the presentation",
        "Overview of key topics",
        "What you'll learn today"
      ]
    },
    {
      id: "2", 
      title: "Main Content",
      bullets: [
        "Key point number one",
        "Important information here",
        "Supporting details and examples"
      ]
    },
    {
      id: "3",
      title: "Conclusion",
      bullets: [
        "Summary of main points",
        "Key takeaways",
        "Thank you for your attention"
      ]
    }
  ]
  return slides
}

export async function POST(req: NextRequest) {
  const auth = await requireUser(req)
  if (auth instanceof NextResponse) {
    return auth // Return error response
  }

  try {
    const body: GenerateRequest = await req.json()
    
    if (!body.title || !body.prompt) {
      return NextResponse.json(
        { error: "Title and prompt are required" },
        { status: 400 }
      )
    }

    // Generate slides based on prompt (mock implementation)
    const slides = generateSlides(body.prompt)

    // Save to database
    const presentation = await prisma.presentation.create({
      data: {
        title: body.title,
        prompt: body.prompt,
        slides: slides,
        userId: auth.user.id,
      },
    })

    return NextResponse.json({ 
      id: presentation.id,
      message: "Presentation generated successfully" 
    })
  } catch (error) {
    console.error("Error generating presentation:", error)
    return NextResponse.json(
      { error: "Failed to generate presentation" },
      { status: 500 }
    )
  }
}