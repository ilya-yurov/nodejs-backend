import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import * as process from 'process';
import { User } from 'src/users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/models/common/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from 'src/posts/posts.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
    // Когда мы хотим в наш модуль импортировать какие-то другие модули, то мы создаем массив импортов и добавляем туда все необходимые модули
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post],
            // Это поле нужно, чтобы секвалайз создавал таблицы в БД на основании тех моделей, которые мы будем создавать
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        // Модуль нужен для того, чтобы сервер мог раздавать статику
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
    ],
    // В провайдере может быть реализован любой переиспользуемый компонент приложения
    // Либо сервисы с логикой, имплементация паттрнов, стратегий
    // Все что содержит какую-то логику и может использоваться в других компонентах
    // providers: [AppService]
})
export class AppModule {}
