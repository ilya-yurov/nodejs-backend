const http = require('http');

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3200;

//Создаем сервер, req - readable stream на чтение, res - writable stream на запись
const server = http.createServer((req, res) => {
    //По умолчанию кириллица не воспринимается, поэтому нужно указать заголовки
    res.writeHead(200, {
        'Content-Type': 'text/html',
    })

    //Чтобы пользователь мог получить ответ от сервера, нужно закрыть стрим и передать туда какие-то данные, которые получит пользователь
    // Если 'Content-Type': 'text/html' можно передавать гипертекстовую разметку, получается SSR - server-side rendering
    res.end('<h1>Hello world!</h1>')
})

// Слушаем входящие соединения, на порту PORT (1 аргумент). 2 аргумент - callback если сервер запустился успешно
server.listen(PORT, () => console.log(`Server start on port ${PORT}`));

const server2 = http
    .createServer((req, res) => {
        //Указываем для браузера заголовок, сообщающий, что мы отправляем JSON
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        // req.url - это тот урл, на который стучится пользователь
        // Можно генерировать ряд эндпоинтов, со своей логикой
        if(req.url === '/users') {
            return res.end(JSON.stringify([
                {
                    id: 1,
                    name: 'Ivan',
                    city: 'Tver',
                }
            ]))
        }

        res.end(req.url)
    })

server2.listen(PORT2, () => console.log(`Server start on port ${PORT2}`));
