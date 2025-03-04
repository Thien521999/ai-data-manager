'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import sampleData from '@/data/sample_data.json'
import { useDebounce } from '@/hooks/use-debounce'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { SearchForm } from './search-form'

export default function Dashboard() {
  const router = useRouter()
  const user = useUser()
  const [search, setSearch] = useState('')

  // ✅ Debounce input để tránh lọc liên tục
  const debouncedSearch = useDebounce(search, 400)

  const projects = useMemo(() => {
    if (!user?.projects) return []
    const userProjectIds = user.projects?.map((p) => p?.project_id) ?? []
    const data = sampleData?.projects?.filter((p) => userProjectIds?.includes(p.id)) || []
    return data
  }, [user?.projects])

  // 🔍 Lọc theo tên project
  const filteredProjects = useMemo(() => {
    return projects?.filter((project) =>
      project?.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }, [debouncedSearch, projects])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full">
      {/* Tổng quan */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng số Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{projects?.length}</p>
        </CardContent>
      </Card>

      {/* Danh sách Projects */}
      <div className="col-span-1 md:col-span-3 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Projects</CardTitle>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <SearchForm search={search} setSearch={setSearch} />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>

                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
