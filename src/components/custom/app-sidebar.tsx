'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  // Database,
  FolderKanban,
  // Package,
  SquareTerminal,
} from 'lucide-react'
import { useMemo } from 'react'
import Logo from './logo'
import { NavMain } from './nav-main'
// import { NavProjects } from './nav-projects'
import { useUser } from '@/hooks/useUser'
import sampleData from '@/data/sample_data.json'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser()
  // const role = getRoleFromLocalStorage()
  // console.log(role)

  const data = useMemo(() => {
    const userProjectIds = user?.projects?.map((p) => p?.project_id) ?? []
    const projects = sampleData?.projects?.filter((p) => userProjectIds.includes(p?.id))

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
        // {
        //   title: 'Datasets',
        //   url: '/datasets',
        //   icon: Database,
        //   items: [
        //     {
        //       title: 'Genesis',
        //       url: '#',
        //     },
        //     {
        //       title: 'Explorer',
        //       url: '#',
        //     },
        //     {
        //       title: 'Quantum',
        //       url: '#',
        //     },
        //   ],
        // },
        // {
        //   title: 'Model Versions',
        //   url: '/modals',
        //   icon: Package,
        //   items: [
        //     {
        //       title: 'Genesis',
        //       url: '#',
        //     },
        //     {
        //       title: 'Explorer',
        //       url: '#',
        //     },
        //     {
        //       title: 'Quantum',
        //       url: '#',
        //     },
        //   ],
        // },
      ],
    }
    return data
  }, [user?.projects])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
