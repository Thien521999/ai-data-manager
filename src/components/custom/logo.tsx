import { SidebarMenuButton } from '@/components/ui/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'

export default function Logo() {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">AI Data Manager</span>
      </div>
    </SidebarMenuButton>
  )
}
