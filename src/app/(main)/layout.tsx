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
        <div className="flex gap-3 items-center mt-3 sm:mt-0">
          <SidebarTrigger className="pl-4" />
          <span className="truncate font-bold text-xl block md:hidden leading-tight">
            AI Data Manager
          </span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
