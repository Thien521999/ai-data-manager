'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataType } from '@/lib/types'
import Image from 'next/image'

interface DataTableProps {
  data: DataType[]
}

export function DataTable({ data }: DataTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white'
      case 'Process':
        return 'bg-blue-500 text-white'
      case 'Submitted':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={`https://picsum.photos/id/2/48/48`}
                  alt="Dataset Image"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-md"
                />
              </TableCell>
              <TableCell>{item.value.label}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>{new Date(item.created_at).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>{new Date(item.updated_at).toLocaleDateString('vi-VN')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
