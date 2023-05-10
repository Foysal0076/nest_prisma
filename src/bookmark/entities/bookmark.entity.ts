import { TodoStatus } from '@prisma/client'

export class Bookmark {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  link: string
  userId: number
  status: TodoStatus = 'DONE'
}
