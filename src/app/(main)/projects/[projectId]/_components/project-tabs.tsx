/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectDataType } from '@/lib/types'
import { useState } from 'react'
import Datasets from './datasets'
import ModelVersionTable from './model-version-table'

interface ProjectTabsProps {
  project: ProjectDataType
}

export default function ProjectTabs({ project }: ProjectTabsProps) {
  const [tab, setTab] = useState('datasets')

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="datasets">Datasets</TabsTrigger>
        <TabsTrigger value="models">Model Versions</TabsTrigger>
      </TabsList>

      <TabsContent value="datasets">
        <Datasets project={project as any} />
      </TabsContent>

      <TabsContent value="models">
        <ModelVersionTable projectId={project?.id} />
      </TabsContent>
    </Tabs>
  )
}
