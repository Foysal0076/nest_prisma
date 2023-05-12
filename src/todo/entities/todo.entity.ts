export class TodoEntity {
  id: number
  title: string
  description?: string | null
  status: string
  userId: number
  createdAt: Date
  updatedAt: Date
}
