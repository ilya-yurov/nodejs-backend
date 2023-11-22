const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// TODO: Создаем дирректорию (синхронно)
// fs.mkdirSync(path.resolve(__dirname, 'dir'))

// TODO: Создаем вложенную дирректорию (синхронно)
// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true})

// TODO: Создаем дирректорию (асинхронно)
// console.log('START');
//
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         console.log(err);
//
//         return
//     }
//
//     console.log('Папка создана');
// })
//
// console.log('END');

// TODO: Удаляем дирректорию
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         throw err;
//     }
// })

// TODO: Создаем и пишем в файл. Функция перезаписывает содержимое файла
// fs.writeFile(path.resolve(__dirname, 'test.txt'), 'Data text', (err) => {
//     if (err) {
//         throw err;
//     }
//
//     console.log('Файл записан')
//     // TODO: Если нужно дозаписать
//     fs.appendFile(path.resolve(__dirname, 'test.txt'), ' Advanced text', (err) => {
//         if (err) {
//             throw err;
//         }
//
//         console.log('Файл дозаписан')
//     })
// })

// TODO: Делаем через промисы самостоятельно
// const writeFileAsync = async (path, data) => {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(path, data, (err) => {
//             if (err) {
//                 reject(err.message)
//             }
//
//             resolve('Файл записан');
//         })
//     })
// }

// const appendFileAsync = async (path, data) => {
//     return new Promise((resolve, reject) => {
//         fs.appendFile(path, data, (err) => {
//             if (err) {
//                 reject(err.message)
//             }
//
//             resolve('Файл дозаписан');
//         })
//     })
// }
//
// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'Data text')
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'Advanced text'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'MOAR text'))
//     .catch(err => console.log(err))

// TODO: А это с fs/promises

// fsPromises.mkdir(path.resolve(__dirname, 'dir'))
//     .then(() => fsPromises.writeFile(path.resolve(__dirname, 'dir', 'text.txt'), 'First text'))
//     .then(() => fsPromises.appendFile(path.resolve(__dirname, 'dir', 'text.txt'), 'Advanced text'))
//     .catch(err => console.log(err))

// TODO: Чтение файла (сами пишем)

// const readFileAsync = async (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
//             if (err) {
//                 reject(err.message)
//             }
//
//             resolve(data);
//         })
//     })
// }
//
// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'Data text')
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'Advanced text'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'MOAR text'))
//     .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// TODO: чтение ts/promises
// fsPromises.mkdir(path.resolve(__dirname, 'dir'))
//     .then(() => fsPromises.writeFile(path.resolve(__dirname, 'dir', 'text.txt'), 'I write a text'))
//     .then(() => fsPromises.readFile(path.resolve(__dirname, 'dir', 'text.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// TODO: Удаление файла
// fsPromises.mkdir(path.resolve(__dirname, 'dir')).then()
// fsPromises.rm(path.resolve(__dirname, 'dir', 'text.txt')).then(() => {
//     fsPromises.rmdir(path.resolve(__dirname, 'dir')).then()
// })

// TODO: Задача: через переменную окружения передаем строку, записываем ее в файл, читаем файл, считаем кол-во слов и записываем их в новый файл count.txt, затем удаляем первый файл
// TODO: Мое решение:
// const readCountFunc = async (data) => {
//     try {
//         await fsPromises.writeFile(path.resolve(__dirname, 'text.txt'), data);
//
//         const read = await fsPromises.readFile(path.resolve(__dirname, 'text.txt'), {encoding: "utf-8"})
//
//         await fsPromises.writeFile(path.resolve(__dirname, 'count.txt'), read.split(' ').length.toString());
//         await fsPromises.rm(path.resolve(__dirname, 'text.txt'));
//     } catch {
//         console.log('Ошибка выполнения функции чтения')
//     }
// }
//
// readCountFunc(process.env.STRING || '').then();
