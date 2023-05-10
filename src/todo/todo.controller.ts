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
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtAuthGuard } from '../auth/guard'
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { TodoEntity } from './entities/todo.entity'

@UseGuards(JwtAuthGuard)
@Controller('todo')
@ApiTags('Todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The created record',
    type: TodoEntity,
  })
  create(@GetUser('id') userId: number, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(userId, createTodoDto)
  }

  @Get()
  @ApiBearerAuth()
  getAllTodo(@GetUser('id') userId: number) {
    return this.todoService.getAllTodo(userId)
  }

  @Get(':id')
  @ApiBearerAuth()
  getTodoById(
    @Param('id', ParseIntPipe) todoId: number,
    @GetUser('id') userId: number
  ) {
    return this.todoService.getTodoById(todoId, userId)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The updated record',
    type: TodoEntity,
  })
  update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    return this.todoService.update(userId, todoId, updateTodoDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No content' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id)
  }
}
