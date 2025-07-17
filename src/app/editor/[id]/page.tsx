"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import SlideEditor from "@/components/SlideEditor"
import SlidePreview from "@/components/SlidePreview"
import { Slide, Presentation } from "@/types"

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const { status } = useSession()
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [selectedSlideIndex] = useState(0)

  const fetchPresentation = useCallback(async () => {
    try {
      const response = await fetch(`/api/present/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch presentation")
      }

      setPresentation(data.presentation)
      setSlides(data.presentation.slides || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && params.id) {
      fetchPresentation()
    }
  }, [status, params.id, router, fetchPresentation])

  const handleSlidesChange = (newSlides: Slide[]) => {
    setSlides(newSlides)
    // Auto-save could be implemented here
  }

  const savePresentation = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/present/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      })

      if (!response.ok) {
        throw new Error("Failed to save presentation")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Presentation not found</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {presentation.title}
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(presentation.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={savePresentation}
              disabled={saving}
              className={`px-4 py-2 rounded font-medium ${
                saving
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Editor */}
        <div className="w-1/2 border-r border-gray-300">
          <SlideEditor slides={slides} onSlidesChange={handleSlidesChange} />
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2">
          <SlidePreview slides={slides} currentSlideIndex={selectedSlideIndex} />
        </div>
      </div>
    </div>
  )
}