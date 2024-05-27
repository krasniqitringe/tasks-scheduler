import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../schemas/task.schema";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import mongoose from "mongoose";

export class CreateTaskDto {
  @ApiProperty({ example: "Task Title", description: "The title of the task" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Task description",
    description: "The description of the task",
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "2023-05-19T00:00:00Z",
    description: "The start date of the task",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: "2023-05-20T00:00:00Z",
    description: "The due date of the task",
    required: false,
  })
  @IsDate()
  @IsOptional()
  dueDate: Date;

  @ApiProperty({
    example: "to_do",
    description: "The status of the task",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  assignedTo: Array<mongoose.Schema.Types.ObjectId>;
}
