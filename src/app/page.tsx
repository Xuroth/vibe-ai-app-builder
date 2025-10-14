"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Render a centered input and submit button that creates a new project from the input value and navigates to the created project's page.
 *
 * The Submit button triggers a project-creation mutation; on success the page navigates to `/projects/{id}`, and on error an error toast is shown.
 *
 * @returns The React element for the home UI containing the input and submit button
 */
export default  function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError: (error) => {
      console.error(error);
      toast.error("Error creating project");
    },
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`);
    }
  }));
  
  return (
    <div className="h-screen w-screen flex flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={createProject.isPending} onClick={() => createProject.mutate({ value: value })}>Submit</Button>
      </div>
    </div>
  );
}