import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { jwtVerify } from '@/http/middlewares/verify-jwt'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'
import { validate } from './validate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/login', authenticate)

  // Authenticate routes

  app.get(
    '/orgs/validate/:orgId',
    { onRequest: [jwtVerify, verifyOrgRole('ADMIN')] },
    validate,
  )
}
