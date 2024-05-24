import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
    required: false,
  })
  description: string;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The start date of the task',
    required: false,
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-05-20T00:00:00Z',
    description: 'The due date of the task',
    required: false,
  })
  dueDate: Date;

  @ApiProperty({
    example: 'to_do',
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty()
  assignedTo: string;
}
