interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const {projectId} = await params;

  return (
    <div>
      <h1>Project {projectId}</h1>
    </div>
  )
}