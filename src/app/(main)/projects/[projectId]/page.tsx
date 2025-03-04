/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react'
import sampleData from '@/data/sample_data.json'
import ProjectDatasets from './_components/project-datasets'

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  const project = sampleData?.projects?.filter((p) => p?.id === projectId)?.[0]

  return (
    <Suspense>
      <div className="p-4">
        <ProjectDatasets project={project as any} />
      </div>
    </Suspense>
  )
}
