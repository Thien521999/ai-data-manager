'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useDebounce } from '@/hooks/use-debounce'
import { ProjectDataType } from '@/lib/types'
import { useMemo, useState } from 'react'
import { DataTable } from './data-table'
import DatasetFilter from './dataset-filter'
import { DatasetTable } from './dataset-table'
import { SearchName } from './search-name'

interface ProjectDatasetsProps {
  project: ProjectDataType
}

const ProjectDatasets = ({ project }: ProjectDatasetsProps) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  // ✅ Debounce input để tránh lọc liên tục
  const debouncedSearch = useDebounce(search, 400)

  // ✅ Lọc danh sách dataset dựa vào search & filter
  const filteredDatasets = useMemo(() => {
    return project?.datasets
      ?.filter((dataset) => dataset.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      ?.filter((dataset) => (filter === 'all' ? true : dataset.is_locked.toString() === filter))
  }, [debouncedSearch, filter, project?.datasets])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{project?.name}</h1>

      {/* 🔍 Search & Filter */}
      <Card className="p-2.5 md:p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <SearchName search={search} setSearch={setSearch} />
          <DatasetFilter filter={filter} setFilter={setFilter} />
        </div>
      </Card>

      <DatasetTable datasets={filteredDatasets} />

      {filteredDatasets?.map((dataset) => (
        <Card key={dataset?.id} className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {dataset?.name} - Data
              <Badge variant={dataset.is_locked ? 'destructive' : 'outline'}>
                {dataset.is_locked ? '🔒 Locked' : '🔓 Open'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={dataset?.data} />

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ProjectDatasets
