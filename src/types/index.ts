export interface Slide {
  id: string
  title: string
  bullets: string[]
}

export interface Presentation {
  id: string
  title: string
  prompt?: string
  slides?: Slide[]
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface PresentationSummary {
  id: string
  title: string
  updatedAt: Date
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}