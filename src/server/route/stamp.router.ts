import { createStampSchema, getSingleStampSchema } from "@/schema/stamp.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";

export const stampRouter = createRouter() 
.mutation('create-stamp', {
  input: createStampSchema,
  async resolve({ctx, input}) {
    if(!ctx.user){
      new trpc.TRPCError({

        code: 'FORBIDDEN',
        message: 'Can not create a stamp while logged out',
      })
    }
  
    const stamp = await ctx.prisma.stamp.create({
      data: {
        ...input,
        user: {
          connect: {
            id: ctx.user?.id
          }
        }
      }      
    })
    return stamp
  }
})
.query('stamps', {
  resolve({ ctx }) {
    return ctx.prisma.stamp.findMany()
  }
})
.query('single-stamp', {
  input: getSingleStampSchema,
  resolve({input, ctx}) {
    return ctx.prisma.stamp.findUnique({
      where: {
        id: input.stampId
      }
    })
  }
})