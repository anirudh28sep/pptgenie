"use client"

import { useState } from "react"
import SlideEditor from "@/components/SlideEditor"
import SlidePreview from "@/components/SlidePreview"
import { Slide } from "@/types"

const mockSlides: Slide[] = [
  {
    id: "1",
    title: "Introduction to AI",
    bullets: [
      "Welcome to the world of Artificial Intelligence",
      "Overview of machine learning concepts",
      "What you'll learn in this presentation"
    ]
  },
  {
    id: "2",
    title: "Core Concepts",
    bullets: [
      "Understanding neural networks",
      "Deep learning fundamentals",
      "Real-world applications"
    ]
  },
  {
    id: "3",
    title: "Future Outlook",
    bullets: [
      "Emerging trends in AI",
      "Potential impact on society",
      "Thank you for your attention"
    ]
  }
]

export default function DemoPage() {
  const [slides, setSlides] = useState<Slide[]>(mockSlides)
  const [selectedSlideIndex] = useState(0)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              PPT Genie Demo - Live Editor & Preview
            </h1>
            <p className="text-sm text-gray-500">
              Demonstration of the slide editor and preview components
            </p>
          </div>
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
            Demo Mode
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Editor */}
        <div className="w-1/2 border-r border-gray-300">
          <SlideEditor slides={slides} onSlidesChange={setSlides} />
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2">
          <SlidePreview slides={slides} currentSlideIndex={selectedSlideIndex} />
        </div>
      </div>
    </div>
  )
}