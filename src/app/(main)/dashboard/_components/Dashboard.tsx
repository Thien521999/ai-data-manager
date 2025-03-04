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
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import sampleData from '@/data/sample_data.json'
import { useMemo } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const user = useUser()

  const projects = useMemo(() => {
    const userProjectIds = user?.projects?.map((p) => p?.project_id) ?? []
    const data = sampleData?.projects?.filter((p) => userProjectIds?.includes(p.id))
    return data
  }, [user?.projects])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full">
      {/* Tổng quan */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng số Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{projects.length}</p>
        </CardContent>
      </Card>

      {/* Danh sách Projects */}
      <div className="col-span-1 md:col-span-3 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên</TableHead>
                  {/* <TableHead>Trạng thái</TableHead> */}
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    {/* <TableCell>
                      <Badge variant="outline"></Badge>
                    </TableCell> */}
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
