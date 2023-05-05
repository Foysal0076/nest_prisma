import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtAuthGuard } from '../auth/guard'

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(userId, createTodoDto)
  }

  @Get()
  findAll() {
    return this.todoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id)
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    return this.todoService.update(userId, todoId, updateTodoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id)
  }
}
