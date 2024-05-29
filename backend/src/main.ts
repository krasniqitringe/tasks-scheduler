import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { SeedDataService } from "./common/providers/seed-data.service";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.use(cookieParser());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Tasks Scheduler")
    .setDescription("The tasks scheduler web application")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("tasks")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  const seedDataService = app.get(SeedDataService);

  await seedDataService.seedIfNoUsersExist();

  await app.listen(3000);
}
bootstrap();
