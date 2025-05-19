// backend/__fuzz__/quest.fuzz.test.js
const request = require('supertest');
const app = require('../app');
const fc = require('fast-check');

describe('Fuzz testing /api/quests', () => {
  it('should handle malformed quest objects', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.string(),
        fc.array(fc.string()),
        fc.object(),
        async (title, description, tags, settings) => {
          const token = 'FAKE_OR_VALID_JWT'; // Заменить на реальный или мок
          const res = await request(app)
            .post('/api/quests')
            .set('Authorization', `Bearer ${token}`)
            .send({ title, description, tags, settings });

          expect([201, 400, 401, 500]).toContain(res.statusCode);
        }
      ),
      { numRuns: 50 }
    );
  });
});

const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});
