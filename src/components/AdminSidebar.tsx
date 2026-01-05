import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUser } from "@/lib/mockData";
import {
  LayoutDashboard,
  Folder,
  Database,
  CheckCircle,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Languages,
  Shield,
  FileText,
} from "lucide-react";

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const mainNavItems = [
  { path: "/admin", icon: LayoutDashboard, labelEn: "Dashboard", labelHa: "Gida" },
  { path: "/admin/projects", icon: Folder, labelEn: "Projects", labelHa: "Ayyukan" },
  { path: "/admin/datasets", icon: Database, labelEn: "Datasets", labelHa: "Bayanan" },
  { path: "/admin/quality", icon: CheckCircle, labelEn: "Quality Review", labelHa: "Bitar Inganci" },
  { path: "/admin/contributors", icon: Users, labelEn: "Contributors", labelHa: "Masu Gudummawa" },
];

const systemNavItems = [
  { path: "/admin/reports", icon: FileText, labelEn: "Reports", labelHa: "Rahotanni" },
  { path: "/admin/moderation", icon: Shield, labelEn: "Moderation", labelHa: "Kula" },
  { path: "/admin/settings", icon: Settings, labelEn: "Settings", labelHa: "Saituna" },
];

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { isHausa, language, setLanguage } = useLanguage();

  const NavLink = ({ item }: { item: typeof mainNavItems[0] }) => {
    const isActive = location.pathname === item.path ||
      (item.path !== "/admin" && location.pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
      <Link to={item.path}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-11 transition-all",
            collapsed && "justify-center px-2",
            isActive
              ? "bg-accent/20 text-accent"
              : "text-foreground/70 hover:text-foreground hover:bg-muted"
          )}
        >
          <Icon className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span className="truncate">{isHausa ? item.labelHa : item.labelEn}</span>
          )}
        </Button>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border",
        collapsed && "justify-center px-2"
      )}>
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center glow-green">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-display font-bold text-xl text-foreground">Tushe</span>
              <span className="ml-1.5 text-xs font-medium text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>

        {!collapsed && (
          <div className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {isHausa ? "Tsarin" : "System"}
          </div>
        )}
        <div className="space-y-1">
          {systemNavItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>
      </ScrollArea>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-1">
        {/* Back to App */}
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-11 text-primary hover:text-primary hover:bg-primary/10",
              collapsed && "justify-center px-2"
            )}
          >
            <ChevronLeft className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span>{isHausa ? "Komawa App" : "Back to App"}</span>
            )}
          </Button>
        </Link>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          onClick={() => setLanguage(language === "en" ? "ha" : "en")}
          className={cn(
            "w-full justify-start gap-3 h-11 text-foreground/70 hover:text-foreground hover:bg-muted",
            collapsed && "justify-center px-2"
          )}
        >
          <Languages className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span>{isHausa ? "English" : "Hausa"}</span>
          )}
        </Button>

        {/* Logout */}
        <Link to="/">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-11 text-foreground/70 hover:text-foreground hover:bg-destructive/20",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span>{isHausa ? "Fita" : "Logout"}</span>
            )}
          </Button>
        </Link>

        {/* User info */}
        {!collapsed && (
          <div className="flex items-center gap-3 p-2 mt-2 rounded-lg bg-accent/10 border border-accent/20">
            <Avatar className="w-9 h-9 border border-accent/30">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="bg-accent/20 text-accent">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-accent">
                {isHausa ? "Manaja" : "Administrator"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute top-20 -right-3 w-6 h-6 rounded-full bg-muted border border-border shadow-sm hover:bg-muted"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-foreground" />
        )}
      </Button>
    </aside>
  );
}

