import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Fetch User ChekIns E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to fetch all check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const responseCreateGym = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'msanchao Gym',
        description: 'Some description',
        phone: '911',

        latitude: -22.2258845,
        longitude: -48.3157508,
      })

    await request(app.server)
      .post(`/gym/${responseCreateGym.body.gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.2258845,
        longitude: -48.3157508,
      })

    const response = await request(app.server)
      .get(`/check-in/history`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(1)
  })
})
