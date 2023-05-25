import { Router } from 'express'
import { IRouteInterface } from '../../../interfaces'
import { AuthRouter } from './authRoutes'
import { DocumentRouter } from './documentRoutes'
import { UserPinRouter } from './userPinRoutes'
import { CustomerRouter } from './customerRoutes'

class ProxyRouter {
  private static instance: ProxyRouter
  private router: Router = Router()
  private readonly routes = [
    { segment: '/auth', provider: AuthRouter },
    { segment: '/user-pins', provider: UserPinRouter },
    { segment: '/document', provider: DocumentRouter },
    { segment: '/customers', provider: CustomerRouter },
  ]

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter()
    }
    return ProxyRouter.instance
  }

  map(): Router {
    this.routes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router }
      this.router.use(route.segment, instance.router)
    })
    return this.router
  }
}

const proxyRouter = ProxyRouter.get()

export { proxyRouter as ProxyRouter }
