import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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

  async getAllTodo(userId: number) {
    try {
      const allTodo = await this.prisma.todo.findMany({
        where: {
          userId: userId,
        },
      })
      return allTodo
    } catch (error) {
      throw error
    }
  }

  async getTodoById(todoId: number, userId: number) {
    try {
      const foundTodo = await this.prisma.todo.findFirst({
        where: {
          id: todoId,
          userId,
        },
      })
      if (!foundTodo) throw new NotFoundException('Not found')
      return foundTodo
    } catch (error) {
      throw error
    }
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
