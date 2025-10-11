import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep("upload-file", "10s");
    
    await step.sleep("parse-file", "10s");

    await step.sleep("transribe-file", "10s");

    await step.sleep("generate-summary", "10s");
    return { message: `Hello, ${event.data.email}!` }
  }
)