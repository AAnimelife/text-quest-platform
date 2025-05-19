const request = require('supertest');
const app = require('../app'); // обязательно app.js
const fc = require('fast-check');

describe('Fuzz testing /api/auth/login', () => {
  it(
    'should not crash on random email/password',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ maxLength: 100 }), // ограничим длину строки
          fc.string({ maxLength: 100 }),
          async (email, password) => {
            const res = await request(app)
              .post('/api/auth/login')
              .send({ email, password });

            // Проверим, что сервер не упал
            expect([200, 400, 401, 500]).toContain(res.statusCode);
          }
        ),
        {
          numRuns: 30, // ограничим количество попыток
          endOnFailure: true,
        }
      );
    },
    15000 // общий таймаут на тест
  );
});
