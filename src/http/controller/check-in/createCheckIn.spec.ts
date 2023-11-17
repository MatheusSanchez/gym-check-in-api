import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create ChekIn  E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create a check-in', async () => {
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

    const response = await request(app.server)
      .post(`/gym/${responseCreateGym.body.gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.2258845,
        longitude: -48.3157508,
      })

    expect(response.statusCode).toEqual(201)
  })
})
