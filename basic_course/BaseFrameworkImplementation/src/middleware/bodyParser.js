// Самописный middleware для парсинга body
module.exports = (req, res) => {
    let body = '';

    // Помни, что req - это readable stream, поэтому для того, чтобы получить тело запроса, его нужно прочитать с помощью стрима
    req.on('data', (chunk) => {
        body += chunk;
    })

    //После того, как мы прочитали все тело запроса, отрабатывает событие end
    req.on('end', () => {
        if (body) {
            req.body = JSON.parse(body)
        }
    })
}
