// Mock Prisma client for development when Prisma can't be generated
/* eslint-disable @typescript-eslint/no-explicit-any */
export const prisma = {
  presentation: {
    findMany: async (_options: any) => {
      return [
        {
          id: "1",
          title: "Sample Presentation",
          updatedAt: new Date(),
        },
        {
          id: "2", 
          title: "Another Presentation",
          updatedAt: new Date(),
        }
      ]
    },
    findFirst: async (options: any) => {
      return {
        id: options.where.id,
        title: "Sample Presentation",
        prompt: "This is a sample presentation",
        slides: [
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
          }
        ],
        userId: options.where.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    },
    create: async (data: any) => {
      return {
        id: Date.now().toString(),
        ...data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    },
    update: async (options: any) => {
      return {
        id: options.where.id,
        title: "Updated Presentation",
        slides: options.data.slides,
        userId: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  }
}