import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Todo } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo
      .create({
        data: {
          userId,
          ...createTodoDto,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate todo title')
          }
        }
        throw error
      })
  }

  findAll() {
    return `This action returns all todo`
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`
  }

  async update(userId: number, todoId: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.prisma.todo.findUnique({
        where: { id: todoId },
      })

      if (!todo || todo.userId !== userId) {
        throw new ForbiddenException('Access to resource is denied')
      }

      const updatedTodo = this.prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          ...updateTodoDto,
        },
      })
      return updatedTodo
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} todo`
  }
}
