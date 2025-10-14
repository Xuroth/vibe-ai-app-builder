import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure
    .query(async () => {
      const messages = await prisma.project.findMany({
        orderBy: {
          updatedAt: "desc"
        }
      })
      return messages;
    }
    ),
  create: baseProcedure
    .input(z.object({
      value: z.string()
        .min(1, { error: "Value is required" })
        .max(10000, { error: "Value is too long" }),
    }))
    .mutation(async ({ input }) => {

      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab"
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT"
            }
          }
        }
      })

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        }
      });

      return createdProject;
    }),
})