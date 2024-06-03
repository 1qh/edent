import { edenTreaty } from '@elysiajs/eden'
import type { App } from '@a/elysia'

const api = edenTreaty<App>('http://0.0.0.0:2999/')

export default api
