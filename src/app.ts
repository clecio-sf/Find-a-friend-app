import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
<<<<<<< HEAD
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(orgsRoutes)

=======

export const app = fastify()

>>>>>>> 1d1672036a4a579a9e9a5eaefa73d30b711c5260
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
