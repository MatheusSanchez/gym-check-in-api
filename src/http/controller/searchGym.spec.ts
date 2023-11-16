import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Gym E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to search a Gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'msanchao Gym',
        description: 'Some description',
        phone: '911',

        latitude: -22.2258845,
        longitude: -48.3157508,
      })

    const response = await request(app.server)
      .get('/gym/search')
      .query({
        q: 'msanchao',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'msanchao Gym',
      }),
    ])
  })
})
