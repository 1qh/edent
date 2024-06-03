import { z } from 'zod'

export const unused = z.string().describe(
  `Currently not used as we use drizzle-zod, If you need other
  validators to share between back/frontend, put them in here
  `
)
