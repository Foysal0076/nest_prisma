import { TodoStatus } from '@prisma/client'

export class Bookmark {
  id: number
  title: string
  description: string
  status: TodoStatus = 'DONE'
}
