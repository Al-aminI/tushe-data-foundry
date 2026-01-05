import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUser } from "@/lib/mockData";
import {
  Home,
  ListTodo,
  Wallet,
  User,
  History,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const mainNavItems = [
  { path: "/dashboard", icon: Home, labelEn: "Dashboard", labelHa: "Gida" },
  { path: "/tasks", icon: ListTodo, labelEn: "Tasks", labelHa: "Ayyuka" },
  { path: "/wallet", icon: Wallet, labelEn: "Wallet", labelHa: "Jakar Kuɗi" },
  { path: "/history", icon: History, labelEn: "History", labelHa: "Tarihi" },
];

const bottomNavItems = [
  { path: "/profile", icon: User, labelEn: "Profile", labelHa: "Bayanai" },
  { path: "/settings", icon: Settings, labelEn: "Settings", labelHa: "Saituna" },
  { path: "/help", icon: HelpCircle, labelEn: "Help", labelHa: "Taimako" },
];

export function AppSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const { isHausa, language, setLanguage } = useLanguage();

  const NavLink = ({ item }: { item: typeof mainNavItems[0] }) => {
    const isActive = location.pathname === item.path ||
      (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
      <Link to={item.path}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-11 transition-all",
            collapsed && "justify-center px-2",
            isActive
              ? "bg-primary/20 text-primary"
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
        "hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 relative h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border",
        collapsed && "justify-center px-2"
      )}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-gold">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-xl text-gradient-gold">Tushe</span>
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
      </ScrollArea>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}

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
          <div className="flex items-center gap-3 p-2 mt-2 rounded-lg bg-muted/50">
            <Avatar className="w-9 h-9 border border-border">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="bg-accent text-accent-foreground">AM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Level {mockUser.level}
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

