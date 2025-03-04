import { Input } from '@/components/ui/input'

interface SearchNameProps {
  search: string
  setSearch: (value: string) => void
}

export const SearchName = ({ search, setSearch }: SearchNameProps) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm"
      />
    </>
  )
}
