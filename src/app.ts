import fastify from 'fastify'

import { userRoutes } from './http/controller/user/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymRoutes } from './http/controller/gym/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(userRoutes)
app.register(gymRoutes)

app.setErrorHandler((error, _, response) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: log this error somewhere
  }
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  return response.status(500).send({ message: 'Internal Server Error' })
})
