//Класс
const Emitter = require('events');

const emitter = new Emitter();

const callback = (data, second, third) => {
    console.log('Вы прислали сообщение ' + data);
    console.log('Второй аргумент ' + second);
    console.log('Третий ' + third);
}

// Обработчик события message, если использовать .once то отработает только один раз
emitter.on('message', callback)

const MESSAGE = process.env.MESSAGE || '';

if (MESSAGE) {
    // Генерация события
    emitter.emit('message', MESSAGE, 'second', 'third')
} else {
    emitter.emit('message', 'Нет сообщения')
}

//Удаляет все слушатели
// emitter.removeAllListeners()

//Удаляет конкретный слушатель
emitter.removeListener('message', callback)

//На эту генерацию callback уже не отработает
emitter.emit('message', 'secondCall')
