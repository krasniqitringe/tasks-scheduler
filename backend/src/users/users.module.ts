import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//Schemas
import { User, UserSchema } from "./schemas/user.schema";

//Services
import { UsersService } from "./users.service";

//Controllers
import { UsersController } from "./users.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [UsersService],
})
export class UsersModule {}
