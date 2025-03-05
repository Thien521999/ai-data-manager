'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import sampleData from '@/data/sample_data.json'
import { useUser } from '@/hooks/useUser'
import {
  // Database,
  FolderKanban,
  // Package,
  SquareTerminal,
  UsersIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import Logo from './logo'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser()

  const data = useMemo(() => {
    if (!user?.projects)
      return {
        navMain: [],
      }
    const userProjectIds = user?.projects?.map((p) => p?.project_id) ?? []
    const projects = sampleData?.projects?.filter((p) => userProjectIds?.includes(p?.id))
    const isAdmin = user?.role === 'admin'
    const isOwnerOfAnyProject = user?.projects?.some((p) => p.role === 'owner')

    const data = {
      navMain: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: SquareTerminal,
          isActive: true,
          items: [],
        },
        {
          title: 'Projects',
          url: '/projects',
          icon: FolderKanban,
          items: projects.map((p) => ({
            title: p.name,
            url: `/projects/${p.id}`,
          })),
        },
        ...(isAdmin || isOwnerOfAnyProject // Chỉ hiển thị nếu là Admin hoặc là Owner của ít nhất một Project
          ? [
              {
                title: 'User Management',
                url: '/users',
                icon: UsersIcon,
                items: [],
              },
            ]
          : []),
      ],
    }
    return data
  }, [user?.projects, user?.role])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
