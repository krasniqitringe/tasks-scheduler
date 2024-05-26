import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { Task, TaskSchema } from "./schemas/task.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UsersModule,
  ],

  controllers: [TasksController],
  providers: [TasksService, Task],
})
export class TasksModule {}
