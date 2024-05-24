import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { ResponseInterceptor } from "./common /interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common /filters/all-exceptions.filter";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Tasks scheduler")
    .setDescription("The tasks scheduler web application")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("tasks")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
