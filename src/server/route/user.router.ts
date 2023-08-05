import { createUserOutputSchema, createUserSchema } from "@/schema/user.schema";
import { createRouter } from "../createRouter";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,

  async resolve({ ctx, input }) {
    const { email, name } = input;
    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if ((e.code = "P2002")) {
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User already exist",
          });
        }
      }
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  },
});
