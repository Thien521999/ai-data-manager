import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DatasetFilterProps {
  filter: string
  setFilter: (value: string) => void
}

export default function DatasetFilter({ filter, setFilter }: DatasetFilterProps) {
  return (
    <Select onValueChange={setFilter} value={filter}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Lọc datasets" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả</SelectItem>
        <SelectItem value="true">🔒 Locked</SelectItem>
        <SelectItem value="false">🔓 Open</SelectItem>
      </SelectContent>
    </Select>
  )
}
