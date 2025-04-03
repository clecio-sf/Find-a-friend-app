import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets/search', search)
  app.get('/pets/search/:id', details)
}
