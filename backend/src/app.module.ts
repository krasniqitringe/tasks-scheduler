import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//Common
import { DatabaseProvider } from "./common/providers/database.provider";
import { SeedDataService } from "./common/providers/seed-data.service";

//Modules
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TasksModule } from "./tasks/tasks.module";

//Schemas
import { User, UserSchema } from "./users/schemas/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";

//Services
import { AppService } from "./app.service";

//Controllers
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: DatabaseProvider,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedDataService],
})
export class AppModule {}
