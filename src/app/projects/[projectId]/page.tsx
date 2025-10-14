interface ProjectPageProps {
  params: {
    projectId: string
  }
}

/**
 * Render the project page for a given projectId.
 *
 * Displays a heading that includes the provided `projectId`.
 *
 * @param params - Route params object containing `projectId`
 * @returns A JSX element for the project page; top-level div containing an `h1` with `Project {projectId}`
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const {projectId} = await params;

  return (
    <div>
      <h1>Project {projectId}</h1>
    </div>
  )
}