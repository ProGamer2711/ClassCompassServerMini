import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector))
	);

	const config = new DocumentBuilder()
		.setTitle("Class Compass API")
		.setDescription("An API for the Class Compass application")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.useGlobalFilters(new PrismaClientExceptionFilter());

	await app.listen(process.env.PORT ?? 8393);
}

bootstrap();
