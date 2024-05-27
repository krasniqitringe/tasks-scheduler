import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ObjectId } from "mongoose";
import { Task } from "./schemas/task.schema";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/common/filters/all-exceptions.filter";
import { AuthGuard } from "@nestjs/passport";
import { UpdateTaskAssigneeDto } from "./dto/update-task-assigne.dto";
import { IdValidationMiddleware } from "src/common/middlewares/guard.middleware";
import { PaginatedResult } from "src/common/interfaces/paginated-result.interface";
import { PaginationInterceptor } from "src/common/interceptors/pagination.interceptor";
import { PaginatedTaskResult } from "./dto/paginated-task-result.dto";

@ApiTags("tasks")
@Controller("tasks")
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({
    status: 200,
    description: "Successful response",
    type: PaginatedTaskResult,
  })
  @ApiQuery({ name: "status", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @UseInterceptors(PaginationInterceptor)
  async getTasks(
    @Query("status") status?: string,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    return this.taskService.findAll(status, page, limit);
  }

  @Get("/:id")
  @UseGuards(IdValidationMiddleware)
  @ApiOperation({ summary: "Get task by ID" })
  @ApiResponse({ status: 200, description: "Successful response", type: Task })
  @ApiResponse({ status: 404, description: "Task not found" })
  async getTaskByID(@Param("id") id: string) {
    return this.taskService.findByID(id);
  }

  @Post("/")
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({
    status: 201,
    description: "Task created successfully",
    type: Task,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Put("/:id")
  @UseGuards(IdValidationMiddleware)
  @ApiOperation({ summary: "Update a task" })
  @ApiResponse({
    status: 200,
    description: "Task updated successfully",
    type: Task,
  })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param("id") id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete("/:id")
  @UseGuards(IdValidationMiddleware)
  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({ status: 200, description: "Task deleted successfully" })
  @ApiResponse({ status: 404, description: "Task not found" })
  async delete(@Param("id") id: ObjectId) {
    return this.taskService.delete(id);
  }

  @Put("/:id/assignees")
  @UseGuards(IdValidationMiddleware)
  @ApiOperation({ summary: "Update task assignees" })
  @ApiResponse({
    status: 200,
    description: "Assignees updated successfully",
  })
  @ApiResponse({ status: 404, description: "Task or users not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: UpdateTaskAssigneeDto })
  @ApiParam({ name: "id", type: String })
  async updateAssignees(
    @Param("id") id: ObjectId,
    @Body() updateAssigneesDto: UpdateTaskAssigneeDto
  ) {
    const { userIds } = updateAssigneesDto;
    return this.taskService.addAssignee(id.toString(), userIds);
  }
}
