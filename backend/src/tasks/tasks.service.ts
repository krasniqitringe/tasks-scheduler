import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findByID(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  async delete(id: ObjectId) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async addAssignees(taskid: string, userid: string[]) {
    return await this.taskModel.updateOne(
      { _id: taskid },
      { assignedTo: userid },
    );
  }
}
