import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from 'src/pipes/validation.pipe';

const PORT = process.env.PORT || 5000;

async function start() {
    // В NestFactory нужно передать некий модуль
    const app = await NestFactory.create(AppModule);

    // Инициализируем конфиги для документации
    // Builder - это такой паттерн, который постепенно позволяет задавать параметры для объекта
    const config = new DocumentBuilder()
        .setTitle('Урок по написанию бэка на NestJS')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('NestJS')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    // Первым параметром передаем адрес, по которому можно будет прочитать доку
    SwaggerModule.setup('/api/docs', app, document);
    // app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`)
    );
}

start().then();
