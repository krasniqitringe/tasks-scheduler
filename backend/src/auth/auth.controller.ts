import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common /interceptors/response.interceptor';
import { AllExceptionsFilter } from 'src/common /filters/all-exceptions.filter';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  @ApiOperation({ summary: 'Sign in user and return a token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful sign-in',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'jwt.token.here' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return { token: await this.authService.signIn(email, password) };
  }
}
