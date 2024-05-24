import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'to_do',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  DONE = 'done',
}

@Schema({ timestamps: true })
export class Task {
  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The start date of the task',
    required: false,
  })
  @Prop()
  startDate: Date;

  @ApiProperty({
    example: '2023-05-20T00:00:00Z',
    description: 'The due date of the task',
    required: false,
  })
  @Prop()
  dueDate: Date;

  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  //   assignedTo: User[];

  @ApiProperty({
    example: 'to_do',
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @Prop({ enum: TaskStatus, default: TaskStatus.BACKLOG })
  status: TaskStatus;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The creation date of the task',
    required: false,
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The last update date of the task',
    required: false,
  })
  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
