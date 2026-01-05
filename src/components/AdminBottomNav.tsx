import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LayoutDashboard, Folder, Database, Users, CheckCircle } from "lucide-react";

const navItems = [
  { path: "/admin", icon: LayoutDashboard, labelEn: "Dashboard", labelHa: "Gida" },
  { path: "/admin/projects", icon: Folder, labelEn: "Projects", labelHa: "Ayyukan" },
  { path: "/admin/datasets", icon: Database, labelEn: "Datasets", labelHa: "Bayanan" },
  { path: "/admin/quality", icon: CheckCircle, labelEn: "Quality", labelHa: "Inganci" },
  { path: "/admin/contributors", icon: Users, labelEn: "Contributors", labelHa: "Masu Gudummawa" },
];

export function AdminBottomNav() {
  const location = useLocation();
  const { isHausa } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/admin" && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors touch-target",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-colors",
                isActive && "bg-accent/10"
              )}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium">
                {isHausa ? item.labelHa : item.labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

