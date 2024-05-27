import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";
import { UsersService } from "src/users/users.service";
import { PaginatedResult } from "src/common/interfaces/paginated-result.interface";

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly userService: UsersService
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  async findAll(
    status?: string,
    page?: number,
    limit?: number
  ): Promise<{ total: number; result: Task[] }> {
    const query = this.taskModel.find();

    if (status) {
      query.where({ status });
    }

    const total = await this.taskModel.countDocuments(query.getQuery());
    const result = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      total,
      result,
    };
  }

  async findByID(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);

    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  async delete(id: ObjectId) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async addAssignee(taskId: string, userIds: string[]) {
    const task = await this.findByID(taskId);
    if (!task) {
      throw new NotFoundException({
        status: 404,
        message: `Task with ID ${taskId} not found`,
      });
    }

    if (!userIds || userIds.length === 0) {
      throw new NotFoundException({
        status: 400,
        message: "At least one user ID must be provided",
      });
    }

    const users: any = await this.userService.findByIds(userIds);

    const missingUsers = userIds.filter(
      (id) => !users.some((user) => user._id.toString() === id)
    );

    if (missingUsers.length > 0) {
      throw new NotFoundException({
        status: 404,
        message: `Users with IDs ${missingUsers.join(", ")} not found`,
      });
    }

    return this.addAssignees(taskId, userIds);
  }

  async addAssignees(taskid: string, userIds: string[]) {
    return await this.taskModel.updateOne(
      { _id: taskid },
      { assignedTo: userIds }
    );
  }
}
