import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workFlow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "kanjariyaharshit@gmail.com",
      },
    });

    return prisma.workFlow.create({
      data: {
        name: "Test Workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
