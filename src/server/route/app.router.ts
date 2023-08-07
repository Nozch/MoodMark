import { createRouter } from "../createRouter"
import { stampRouter } from "./stamp.router"
import { userRouter } from "./user.router"

export const appRouter = createRouter()
.merge('users.', userRouter)
.merge('stamps.', stampRouter)


export type AppRouter = typeof appRouter