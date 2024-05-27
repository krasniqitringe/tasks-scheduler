import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../schemas/task.schema";
import { IsEnum, IsOptional, IsString, Validate } from "class-validator";

export class UpdateTaskDto {
  @ApiProperty({ example: "Task Title", description: "The title of the task" })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: "Task description",
    description: "The description of the task",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: "to_do",
    description: "The status of the task",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
