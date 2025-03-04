import { Input } from '@/components/ui/input'

interface SearchFormProps {
  search: string
  setSearch: (value: string) => void
}

export const SearchForm = ({ search, setSearch }: SearchFormProps) => {
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
