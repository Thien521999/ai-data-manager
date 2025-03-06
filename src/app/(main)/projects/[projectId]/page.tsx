import { Suspense } from 'react'
import ProjectDatasets from './_components/project-datasets'

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params

  return (
    <Suspense>
      <ProjectDatasets projectId={projectId} />
    </Suspense>
  )
}
