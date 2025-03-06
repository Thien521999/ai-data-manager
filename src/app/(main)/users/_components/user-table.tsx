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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import sampleData from '@/data/sample_data.json'
import { useUser } from '@/hooks/useUser'
import { UserRoleType } from '@/lib/types'
import { Trash, XCircle } from 'lucide-react'
import { useState } from 'react'
import AddUserForm from './add-user-form'

export default function UserTable() {
  const currentUser = useUser()
  const isAdmin = currentUser?.role === 'admin'

  // Lọc danh sách users theo yêu cầu
  const [users, setUsers] = useState(() =>
    isAdmin ? sampleData?.users : sampleData?.users?.filter((user) => user?.role !== 'admin'),
  )

  // Kiểm tra user có phải Owner của project đó không
  const isOwner = (userId: string, projectId: string) => {
    return currentUser?.projects?.some((p) => p?.project_id === projectId && p?.role === 'owner')
  }

  // Xóa user khỏi project
  const handleRemoveUserFromProject = (userId: string, projectId: string) => {
    const updatedUsers = users?.map((user) => {
      if (user?.id === userId) {
        return {
          ...user,
          projects: user?.projects?.filter((p) => p?.project_id !== projectId),
        }
      }
      return user
    })

    setUsers(updatedUsers)
  }

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">User Management</h2>
      {/* Form thêm user */}
      <AddUserForm userRole={currentUser?.role as UserRoleType} />

      <Dialog>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Projects</TableHead>
              {isAdmin && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.role === 'admin' ? 'bg-orange-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell>
                  {user.projects.map((p) => (
                    <div key={p.project_id} className="flex items-center justify-between">
                      <span className="text-sm">
                        {p.project_id} ({p.role})
                      </span>
                      {(isAdmin || isOwner(user.id, p.project_id)) && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleRemoveUserFromProject(user.id, p.project_id)}
                              >
                                <XCircle size={16} className="text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Xoá user ra khỏi project</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {isAdmin && (
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn xóa user này?</DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác. User sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
