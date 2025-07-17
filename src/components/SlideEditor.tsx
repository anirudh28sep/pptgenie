"use client"

import { useState } from "react"
import { Slide } from "@/types"

interface SlideEditorProps {
  slides: Slide[]
  onSlidesChange: (slides: Slide[]) => void
}

export default function SlideEditor({ slides, onSlidesChange }: SlideEditorProps) {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)

  const updateSlideTitle = (index: number, title: string) => {
    const updatedSlides = [...slides]
    updatedSlides[index] = { ...updatedSlides[index], title }
    onSlidesChange(updatedSlides)
  }

  const updateSlideBullet = (slideIndex: number, bulletIndex: number, text: string) => {
    const updatedSlides = [...slides]
    const updatedBullets = [...updatedSlides[slideIndex].bullets]
    updatedBullets[bulletIndex] = text
    updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], bullets: updatedBullets }
    onSlidesChange(updatedSlides)
  }

  const addBullet = (slideIndex: number) => {
    const updatedSlides = [...slides]
    updatedSlides[slideIndex] = {
      ...updatedSlides[slideIndex],
      bullets: [...updatedSlides[slideIndex].bullets, "New bullet point"]
    }
    onSlidesChange(updatedSlides)
  }

  const removeBullet = (slideIndex: number, bulletIndex: number) => {
    const updatedSlides = [...slides]
    const updatedBullets = updatedSlides[slideIndex].bullets.filter((_, i) => i !== bulletIndex)
    updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], bullets: updatedBullets }
    onSlidesChange(updatedSlides)
  }

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "New Slide",
      bullets: ["Bullet point 1", "Bullet point 2"]
    }
    onSlidesChange([...slides, newSlide])
  }

  const removeSlide = (index: number) => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, i) => i !== index)
      onSlidesChange(updatedSlides)
      if (selectedSlideIndex >= updatedSlides.length) {
        setSelectedSlideIndex(updatedSlides.length - 1)
      }
    }
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No slides available</p>
        <button
          onClick={addSlide}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add First Slide
        </button>
      </div>
    )
  }

  const currentSlide = slides[selectedSlideIndex]

  return (
    <div className="flex h-full">
      {/* Slide List */}
      <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Slides</h3>
            <button
              onClick={addSlide}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedSlideIndex === index
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedSlideIndex(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Slide {index + 1}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {slide.title}
                    </div>
                  </div>
                  {slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSlide(index)
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Editor */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Title
          </label>
          <input
            type="text"
            value={currentSlide.title}
            onChange={(e) => updateSlideTitle(selectedSlideIndex, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Bullet Points
            </label>
            <button
              onClick={() => addBullet(selectedSlideIndex)}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              + Add Bullet
            </button>
          </div>
          <div className="space-y-2">
            {currentSlide.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex items-center space-x-2">
                <span className="text-gray-400">•</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateSlideBullet(selectedSlideIndex, bulletIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {currentSlide.bullets.length > 1 && (
                  <button
                    onClick={() => removeBullet(selectedSlideIndex, bulletIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}