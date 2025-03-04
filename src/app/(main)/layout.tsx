import { AppSidebar } from '@/components/custom/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex gap-3 items-center">
          <SidebarTrigger className="pl-4" />
          <span className="truncate font-semibold text-lg block md:hidden leading-tight">
            AI Manager
          </span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
