import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from 'src/users/users.module';
import * as process from "process";
import {User} from "src/users/users.model";

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
            models: [User],
            // Это поле нужно, чтобы секвалайз создавал таблицы в БД на основании тех моделей, которые мы будем создавать
            autoLoadModels: true
        }),
        UsersModule,
    ],
    // controllers: [AppController],
    // В провайдере может быть реализован любой переиспользуемый компонент приложения
    // Либо сервисы с логикой, имплементация паттрнов, стратегий
    // Все что содержит какую-то логику и может использоваться в других компонентах
    // providers: [AppService]
})
export class AppModule {}
