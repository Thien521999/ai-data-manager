'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUser } from '@/hooks/useUser'
import { DatasetsType } from '@/lib/types'
import { Lock, Unlock } from 'lucide-react'
import { useState } from 'react'

interface DatasetTableProps {
  datasets: DatasetsType[]
}

export function DatasetTable({ datasets }: DatasetTableProps) {
  const user = useUser()
  const canLockUnlock = user?.role === 'admin'
  const [selectedDataset, setSelectedDataset] = useState<DatasetsType | null>(null)

  return (
    <div className="">
      <Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Locked</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              {canLockUnlock && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets?.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell>{dataset.name}</TableCell>
                <TableCell>{dataset.description}</TableCell>
                <TableCell>{dataset.is_locked ? '🔒 Locked' : '🔓 Open'}</TableCell>
                <TableCell>{new Date(dataset.created_at).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>{new Date(dataset.updated_at).toLocaleDateString('vi-VN')}</TableCell>
                {canLockUnlock && (
                  <TableCell>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDataset(dataset)}
                      >
                        {dataset.is_locked ? <Unlock size={20} /> : <Lock size={20} />}
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <Dialog> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDataset?.is_locked ? 'Mở khóa Dataset' : 'Khóa Dataset'}
            </DialogTitle>
            <DialogDescription>
              {`Bạn có chắc chắn muốn ${selectedDataset?.is_locked ? 'mở khóa' : 'khóa'} dataset "${
                selectedDataset?.name
              }" không?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
