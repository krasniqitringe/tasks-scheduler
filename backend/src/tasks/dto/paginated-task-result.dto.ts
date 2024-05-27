import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../schemas/task.schema";

export class PaginatedTaskResult {
  @ApiProperty({ type: [Task] })
  data: Task[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
