import { Input } from '@/components/ui/input'

interface SearchFormProps {
  search: string
  setSearch: (value: string) => void
  placeholder: string
}

export const SearchForm = ({ search, setSearch, placeholder }: SearchFormProps) => {
  return (
    <>
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm"
      />
    </>
  )
}
