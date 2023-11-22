const index = require('basic_course/path/index');

// TODO: path.join() позволяет соединить пути использую сепаратор
//console.log(path.join('first', 'second')); //first/second

// TODO: Глобальная переменная __dirname - Содержит путь к текущей дирректории,
//console.log(path.join(__dirname, '..', __filename));

// TODO: path.resolve() как join, но возвращает абсолютный путь
//console.log(path.resolve('first', 'second')); //first/second

//TODO: Парсинг пути через участок пути
const fullPath = index.resolve('first', 'second.js');
console.log('Парсинг пути: ', index.parse(fullPath));
console.log('Разделитель в ОС: ', index.sep);
console.log('Проверка на абсолютный путь: ', index.isAbsolute('first/second'));
console.log('Название файла: ', index.basename(fullPath))
console.log('Расширение файла: ', index.extname(fullPath))

// -------------------------------------------

const siteURL = 'http://localhost:3000/users?id=5123'
const url = new URL(siteURL);

console.log(url)