const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhkMDVlYTYwOWMwYzcyOGQzZTQ3YjkiLCJpYXQiOjE2NzAxODY0ODAsImV4cCI6MTY3MDc5MTI4MH0.Yy-wO0S7mB9-HGMVcMuAja0YjjOVx-diBzB9pp_dWjI'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'dev-secret-key'; // вставьте сюда секретный ключ для разработки из кода
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
