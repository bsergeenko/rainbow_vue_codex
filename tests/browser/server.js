import { createServer } from 'vite'
export default async function setupServer() {
  const server = await createServer({ configLoader: 'native', server: { port: 5180, host: 'localhost', strictPort: true }, logLevel: 'error' })
  await server.listen()
  return async () => { await server.close() }
}
