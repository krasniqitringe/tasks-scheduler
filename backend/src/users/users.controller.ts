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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ObjectId } from "mongoose";
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { User } from "./schemas/user.schema";
import { ResponseInterceptor } from "src/common /interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/common /filters/all-exceptions.filter";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("users")
@Controller("users")
@UseInterceptors(ResponseInterceptor)
@UseFilters(AllExceptionsFilter)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard("jwt"))
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

  @ApiParam({ name: "id", type: String })
  @ApiResponse({
    status: 200,
    description: "User found successfully",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get("/:id")
  findOne(@Param("id") id: ObjectId) {
    return this.usersService.findByID(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  update(@Param("id") id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id") id: ObjectId) {
    return this.usersService.delete(id);
  }
}
