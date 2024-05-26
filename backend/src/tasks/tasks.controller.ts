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
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ObjectId } from "mongoose";
import { Task } from "./schemas/task.schema";
import { ResponseInterceptor } from "src/common /interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/common /filters/all-exceptions.filter";
import { AuthGuard } from "@nestjs/passport";
import { UpdateTaskAssigneeDto } from "./dto/update-task-assigne.dto";

@ApiTags("tasks")
@Controller("tasks")
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({
    status: 200,
    description: "Successful response",
    type: [Task],
  })
  @Get("/")
  async getTasks() {
    return this.taskService.findAll();
  }

  @ApiOperation({ summary: "Get task by ID" })
  @ApiResponse({ status: 200, description: "Successful response", type: Task })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Get("/:id")
  async getTaskByID(@Param("id") id: string) {
    return this.taskService.findByID(id);
  }

  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({
    status: 201,
    description: "Task created successfully",
    type: Task,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: CreateTaskDto })
  @Post("/")
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiOperation({ summary: "Update a task" })
  @ApiResponse({
    status: 200,
    description: "Task updated successfully",
    type: Task,
  })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateTaskDto })
  @Put("/:id")
  async update(
    @Param("id") id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({ status: 200, description: "Task deleted successfully" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Delete("/:id")
  async delete(@Param("id") id: ObjectId) {
    return this.taskService.delete(id);
  }

  @ApiOperation({ summary: "Update task assignees" })
  @ApiResponse({
    status: 200,
    description: "Assignees updated successfully",
  })
  @ApiResponse({ status: 404, description: "Task or users not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: UpdateTaskAssigneeDto })
  @Put("/:id/assignees")
  @ApiParam({ name: "id", type: String })
  async updateAssignees(
    @Param("id") id: ObjectId,
    @Body() updateAssigneesDto: UpdateTaskAssigneeDto
  ) {
    const { userIds } = updateAssigneesDto;
    return this.taskService.addAssignee(id.toString(), userIds);
  }
}
