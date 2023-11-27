import {v4} from "uuid";
import path from "path";

class FileService {
    // Функция, которая ассинхронно сохраняет файл на диск
    async saveFile(file) {
        try {
            const fileName = v4() + '.jpg';
            const filePath = path.resolve('static', fileName);

            await file.mv(filePath);

            return fileName;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FileService();
