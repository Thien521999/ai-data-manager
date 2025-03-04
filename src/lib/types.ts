export type ProjectRoleType = 'owner' | 'developer' | 'viewer'
export type UserRoleType = 'admin' | 'user'
export type Status = 'Pending' | 'Process' | 'Submitted'

export interface ProjectType {
  project_id: string
  role: ProjectRoleType
}

export interface UserType {
  email: string
  id: string
  name: string
  projects: ProjectType[]
  role: UserRoleType
}

export interface MetadataType {
  resolution?: string
  language?: string
  source: string
}

export interface DataType {
  created_at: string
  dataset_id: string
  id: string
  metadata: MetadataType
  status: Status
  updated_at: string
  value: {
    image_path: string
    label: string
  }
}

export interface DatasetsType {
  created_at: string
  data: DataType[]
  description: string
  id: string
  is_locked: boolean
  metadata: MetadataType
  name: string
  project_id: string
  updated_at: string
}

export interface ProjectDataType {
  created_at: string
  datasets: DatasetsType[]
  id: string
  metadata: MetadataType
  name: string
  updated_at: string
}
