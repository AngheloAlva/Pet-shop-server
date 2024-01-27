import { envs } from './config/envs'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

void (async () => {
  await main()
})()

export async function main (): Promise<void> {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })

  await server.start()
}
