import * as Hapi from '@hapi/hapi'
import routes from './routes.js'

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  })
  server.route(routes)

  await server.start()
  console.log('Server Running on Port: %s', server.info.uri)
}
export default init
