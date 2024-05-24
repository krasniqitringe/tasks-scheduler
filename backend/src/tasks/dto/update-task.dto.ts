import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
  })
  description: string;

  @ApiProperty({
    example: 'to_do',
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;
}
