import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseFilters,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

//Common
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/common/filters/all-exceptions.filter";
//Schemas
import { User } from "src/users/schemas/user.schema";

//Dtos
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInResponseDto } from "./dto/sign-in-response.dto";

//Services
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}
  @Post("signin")
  @ApiOperation({ summary: "Sign in user and return a token" })
  @ApiResponse({
    status: 200,
    description: "Successful sign-in",
    type: SignInResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );
    return { token };
  }

  @Post("signup")
  @ApiOperation({ summary: "Sign up user " })
  @ApiResponse({
    status: 200,
    description: "Successful sign-up",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
