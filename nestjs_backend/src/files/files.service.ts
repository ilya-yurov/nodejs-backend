import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = v4() + '.jpg';
            const filePath = resolve(__dirname, '..', 'static');
            if (!existsSync(filePath)) {
                mkdirSync(filePath, { recursive: true });
            }

            writeFileSync(join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            console.log(e);

            throw new HttpException('Произошла ошибка при записи', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
