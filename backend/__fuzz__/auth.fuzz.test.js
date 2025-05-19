const request = require('supertest');
const app = require('../app'); // обязательно app.js
const fc = require('fast-check');

describe('Fuzz testing /api/auth/login', () => {
  it(
    'should not crash on random email/password',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ maxLength: 100 }), 
          fc.string({ maxLength: 100 }),
          async (email, password) => {
            const res = await request(app)
              .post('/api/auth/login')
              .send({ email, password });

            expect([200, 400, 401, 500]).toContain(res.statusCode);
          }
        ),
        {
          numRuns: 30,
          endOnFailure: true,
        }
      );
    },
  );
});
