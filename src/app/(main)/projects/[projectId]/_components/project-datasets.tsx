/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import sampleData from '@/data/sample_data.json'
import { useMemo } from 'react'
import ProjectTabs from './project-tabs'

interface ProjectDatasetsProps {
  projectId: string
}

const ProjectDatasets = ({ projectId }: ProjectDatasetsProps) => {
  const project = useMemo(() => {
    return sampleData?.projects?.filter((p) => p?.id === projectId)?.[0]
  }, [projectId])

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-lg md:text-xl font-bold">{project?.name}</h1>

      <ProjectTabs project={project as any} />
    </div>
  )
}

export default ProjectDatasets
