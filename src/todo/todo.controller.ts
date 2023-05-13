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
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
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
import { ApiPaginatedResponse } from '../shared/decorator/api-paginated-response.decorator'
import {
  PaginatedDto,
  PaginationOptionsDto,
  PaginationParametersDto,
} from '../shared/dto/pagination'

@UseGuards(JwtAuthGuard)
@Controller('todo')
@ApiTags('Todo')
@UseInterceptors(ClassSerializerInterceptor)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create bookmark' })
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
  @ApiPaginatedResponse(TodoEntity)
  @ApiOperation({ summary: 'Get paginated todo' })
  getAllTodo(
    @GetUser('id') userId: number,
    @Query() queryParams: PaginationOptionsDto
  ): Promise<PaginatedDto<TodoEntity>> {
    return this.todoService.getAllTodo(userId, queryParams)
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a todo by id' })
  getTodoById(
    @Param('id', ParseIntPipe) todoId: number,
    @GetUser('id') userId: number
  ) {
    return this.todoService.getTodoById(todoId, userId)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a todo' })
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
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiNoContentResponse({ description: 'No content' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id)
  }
}
