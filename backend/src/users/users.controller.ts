import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

//Common
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/common/filters/all-exceptions.filter";
import { IdValidationMiddleware } from "src/common/middlewares/guard.middleware";

//Dtos
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

//Schemas
import { User } from "./schemas/user.schema";

//Services
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  @ApiResponse({ status: 200, description: "List of users", type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("/:id")
  @UseGuards(IdValidationMiddleware)
  @ApiParam({ name: "id", type: String })
  @ApiResponse({
    status: 200,
    description: "User found successfully",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id") id: string) {
    return this.usersService.findByID(id);
  }

  @Patch(":id")
  @UseGuards(IdValidationMiddleware)
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(IdValidationMiddleware)
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
