'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DatasetsType } from '@/lib/types'

interface DatasetTableProps {
  datasets: DatasetsType[]
}

export function DatasetTable({ datasets }: DatasetTableProps) {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Locked</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datasets.map((dataset) => (
            <TableRow key={dataset.id}>
              <TableCell>{dataset.name}</TableCell>
              <TableCell>{dataset.description}</TableCell>
              <TableCell>{dataset.is_locked ? '🔒 Locked' : '🔓 Open'}</TableCell>
              <TableCell>{new Date(dataset.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
