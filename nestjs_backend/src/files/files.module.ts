import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  // Таким образом импортируя модуль мы импортируем и сервис
  exports: [FilesService]
})
export class FilesModule {}
