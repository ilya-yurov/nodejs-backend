const os = require('os');
const cluster = require('cluster');

// TODO: Возвращает платформу
// console.log(os.platform());

// TODO: Архитектура процессора
// console.log(os.arch());

// TODO: Описание ядер процессора
// console.log(os.cpus());
// и их кол-во
// console.log(os.cpus().length);
// const cpus = os.cpus();

//TODO: Можно итерироваться по ядрам
//for (let i = 0; i < cpus.length - 2; i++) {
//     console.log('Запускаем процесс node.js');
// }

const numCPUs = os.cpus().length;

//Проверяем, главный ли процесс
if (cluster.isPrimary) {
    // Если главный, то запускаем дочерние процессы
    for (let i = 0; i < numCPUs - 2; i++) {
        // Запуск процесса
        cluster.fork()
    }

    // Подписываемся на событие exit (если умер процесс)
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Воркер с pid: ${worker.process.pid} умер`)
        cluster.fork()
    })
} else {
    // Отрабатывает, когда запускются дочерние процессы
    console.log(`Воркер с pid: ${process.pid} создан`)

    //Каждый из воркеров отрабатывает с интервалом 5000ms
    setInterval(() => {
        console.log(`Воркер с pid: ${process.pid} все еще работает`);
    }, 5000)
}