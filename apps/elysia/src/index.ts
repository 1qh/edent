import { compile as c, trpc } from '@elysiajs/trpc'
import { initTRPC } from '@trpc/server'
import { Elysia, t as T } from 'elysia'

const t = initTRPC.create()
const p = t.procedure

const router = t.router({
  greet: p.input(c(T.String())).query(({ input }) => input)
})

const app = new Elysia().use(trpc(router)).listen(2999)

export type Router = typeof router
export type App = typeof app
