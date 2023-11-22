const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

// Читаем файл целиком
// fsPromises.readFile(path.resolve(__dirname, 'text.txt'))
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// TODO: Читаем файл по стримам
// Создаем стрим. Можно указать кодировку, в которой будем считывать, например utf-8, также можно отключить самозакрытие стрима
// const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: "utf-8"})

// Стримы работают по принципу событий, работают ассинхронно
// stream.on('data', (chunk) => {
//     console.log('chunk is ', chunk);
// })
// stream.on('open', () => console.log('Начали читать'))
// stream.on('end', () => console.log('Закончили читать'))

//Важно обрабатывать ошибки, а том может упасть весь NodeJS процесс
// stream.on('error', (err) => console.log(err))

// TODO: Предназначен для записи
const writableStream = fs.createWriteStream(path.resolve(__dirname, 'text2.txt'))
for (let i = 0; i < 20; i++) {
    writableStream.write(i + '\n');
}

// Методы закрывающие стрим, вызывающие разные события, на которые можно подписаться
writableStream.close()
// writableStream.close()
// writableStream.destroy()

// На закрытие можно повесить обработчик
writableStream.on('close', () => console.log('Stream is closed'))

const http = require('http');

http.createServer((req, res) => {
    //req - readable stream
    //res - writable stream
})