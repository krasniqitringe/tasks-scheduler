import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
  @ApiProperty({
    example: "jwt.token.here",
    description: "JWT token returned after successful sign-in",
  })
  token: string;
}
