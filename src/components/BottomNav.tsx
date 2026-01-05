import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, ListTodo, Wallet, Trophy, User } from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: Home, labelEn: "Home", labelHa: "Gida" },
  { path: "/tasks", icon: ListTodo, labelEn: "Tasks", labelHa: "Ayyuka" },
  { path: "/wallet", icon: Wallet, labelEn: "Wallet", labelHa: "Kuɗi" },
  { path: "/leaderboard", icon: Trophy, labelEn: "Rank", labelHa: "Matsayi" },
  { path: "/profile", icon: User, labelEn: "Profile", labelHa: "Bayanai" },
];

export function BottomNav() {
  const location = useLocation();
  const { isHausa } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors touch-target",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-colors",
                isActive && "bg-primary/10"
              )}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
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

