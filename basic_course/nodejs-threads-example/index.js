// В этом примере 4 первые вызова будут параллельно вызваны, а 5я будет выполнена, как только освободится первый поток
// Такое поведение из-за того, что libuv выделяет по дефолту 4 потока

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('123', '5', 1000000, 64, 'sha512', () => {
    console.log('1 end', Date.now() - start)
})

crypto.pbkdf2('123', '5', 1000000, 64, 'sha512', () => {
    console.log('2 end', Date.now() - start)
})

crypto.pbkdf2('123', '5', 1000000, 64, 'sha512', () => {
    console.log('3 end', Date.now() - start)
})

crypto.pbkdf2('123', '5', 1000000, 64, 'sha512', () => {
    console.log('4 end', Date.now() - start)
})

crypto.pbkdf2('123', '5', 1000000, 64, 'sha512', () => {
    console.log('5 end', Date.now() - start)
})

console.log(start)