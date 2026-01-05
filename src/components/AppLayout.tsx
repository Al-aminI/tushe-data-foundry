import { ReactNode, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
      <AppSidebar 
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
      
      <BottomNav />
    </div>
  );
}

