import { ProjectDataType } from '@/lib/types'
import { DataTable } from './data-table'
import { DatasetTable } from './dataset-table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ProjectDatasetsProps {
  project: ProjectDataType
}

const ProjectDatasets = ({ project }: ProjectDatasetsProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{project?.name}</h1>

      <DatasetTable datasets={project?.datasets} />

      {project?.datasets?.map((dataset) => (
        <div key={dataset?.id}>
          <h2 className="text-xl font-semibold">{dataset?.name} - Data</h2>
          <DataTable data={dataset?.data} />

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
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ))}
    </div>
  )
}

export default ProjectDatasets
