'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import sampleData from '@/data/sample_data.json'
import { useUser } from '@/hooks/useUser'
import { UserRoleType } from '@/lib/types'
import { useMemo, useState } from 'react'

interface AddUserFormProps {
  userRole: UserRoleType
}

export default function AddUserForm({ userRole }: AddUserFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [projectId, setProjectId] = useState('')
  const user = useUser()

  const handleAddUser = () => {
    console.log(`Thêm user ${email} với role ${role}`)
  }

  const userProjects = useMemo(() => {
    return user?.projects?.filter((p) => p.role === 'owner')?.map((p) => p.project_id) || []
  }, [user?.projects])

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold mb-3">Add User to Project</h3>
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />

          <Select value={projectId} onValueChange={setProjectId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Project Name" />
            </SelectTrigger>
            <SelectContent>
              {sampleData.projects
                .filter((p) => userRole === 'admin' || userProjects.includes(p.id)) // Admin thấy tất cả, owner thấy project của họ
                .map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddUser} className="w-full md:w-[120px]">
          Add
        </Button>
      </div>
    </div>
  )
}
