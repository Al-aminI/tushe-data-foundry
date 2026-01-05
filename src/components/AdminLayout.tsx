import { ReactNode, useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminBottomNav } from "@/components/AdminBottomNav";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={cn(
        "flex-1 min-h-screen pb-20 md:pb-0 overflow-x-hidden",
        className
      )}>
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </main>
      
      <AdminBottomNav />
    </div>
  );
}

