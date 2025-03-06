'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import sampleData from '@/data/sample_data.json'
import { useMemo } from 'react'

interface ModelVersionProps {
  projectId: string
}

export default function ModelVersionTable({ projectId }: ModelVersionProps) {
  const modalVersion = useMemo(() => {
    return sampleData.model_versions.filter((item) => item.project_id === projectId)
  }, [projectId])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Version</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Training Datasets</TableHead>
          {/* <TableHead>Testing Datasets</TableHead> */}
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modalVersion.map((model) => (
          <TableRow key={model.id}>
            <TableCell>{model.version}</TableCell>
            <TableCell>{model.status}</TableCell>
            <TableCell>
              {model.datasets
                .filter((ds) => ds.type === 'training')
                .map((ds) => ds.id)
                .join(', ')}
            </TableCell>
            {/* <TableCell>
              {model.datasets
                .filter((ds) => ds.type === 'testing')
                .map((ds) => ds.id)
                .join(', ')}
            </TableCell> */}
            <TableCell>{new Date(model.created_at).toLocaleDateString('vi-VN')}</TableCell>
            <TableCell>{new Date(model.updated_at).toLocaleDateString('vi-VN')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
