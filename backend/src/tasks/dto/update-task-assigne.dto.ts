import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class UpdateTaskAssigneeDto {
  @ApiProperty({
    example: ["userId1", "userId2"],
    description: "Array of user IDs to be assigned to the task",
  })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
