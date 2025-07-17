"use client"

import { Slide } from "@/types"

interface SlidePreviewProps {
  slides: Slide[]
  currentSlideIndex?: number
}

export default function SlidePreview({ slides, currentSlideIndex = 0 }: SlidePreviewProps) {
  if (!slides || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">No slides to preview</p>
      </div>
    )
  }

  const currentSlide = slides[currentSlideIndex]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-300 bg-gray-50">
        <h3 className="text-lg font-semibold">Preview</h3>
        <p className="text-sm text-gray-600">
          Slide {currentSlideIndex + 1} of {slides.length}
        </p>
      </div>
      
      <div className="flex-1 p-6 bg-white">
        <div className="h-full border-2 border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-white shadow-lg">
          <div className="h-full p-8 flex flex-col">
            {/* Slide Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 text-center">
                {currentSlide.title}
              </h1>
              <div className="mt-4 h-1 bg-blue-500 rounded-full mx-auto w-24"></div>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-4">
                {currentSlide.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Number */}
            <div className="flex justify-end mt-8">
              <span className="text-sm text-gray-500">
                {currentSlideIndex + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {slides.length > 1 && (
        <div className="p-4 border-t border-gray-300 bg-gray-50">
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlideIndex
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => {
                  // This would need to be passed as a prop to make it interactive
                  // For now it's just visual
                }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Click dots to navigate (feature coming soon)
          </p>
        </div>
      )}
    </div>
  )
}