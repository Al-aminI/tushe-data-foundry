import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  HelpCircle, 
  Info, 
  ChevronRight,
  LogOut,
  Trash2,
  Download
} from "lucide-react";

export default function Settings() {
  const { t, isHausa, language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    taskReminders: true,
    achievements: true,
    marketing: false,
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.settings.title}</h1>
          <p className="text-muted-foreground">
            {isHausa ? "Sarrafa asusunku da abubuwan da kuke so" : "Manage your account and preferences"}
          </p>
        </div>

        {/* Language */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {t.settings.language}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
                className="flex-1"
              >
                English
              </Button>
              <Button
                variant={language === "ha" ? "default" : "outline"}
                onClick={() => setLanguage("ha")}
                className="flex-1"
              >
                Hausa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              {t.settings.theme}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{theme === "dark" ? t.settings.dark : t.settings.light}</p>
                <p className="text-sm text-muted-foreground">
                  {isHausa ? "Canza kamannin app" : "Change app appearance"}
                </p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              {t.settings.notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{isHausa ? "Sanarwar Push" : "Push Notifications"}</p>
                <p className="text-sm text-muted-foreground">
                  {isHausa ? "Karɓi sanarwa akan wayar ku" : "Receive notifications on your device"}
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{isHausa ? "Tunatarwar Ayyuka" : "Task Reminders"}</p>
                <p className="text-sm text-muted-foreground">
                  {isHausa ? "Sami sanarwa game da sabbin ayyuka" : "Get notified about new tasks"}
                </p>
              </div>
              <Switch
                checked={notifications.taskReminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{isHausa ? "Nasarori" : "Achievements"}</p>
                <p className="text-sm text-muted-foreground">
                  {isHausa ? "Sanarwa lokacin da kuka buɗe nasara" : "Get notified when you unlock achievements"}
                </p>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t.settings.privacy}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <span>{isHausa ? "Canja Kalmar Sirri" : "Change Password"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <span>{isHausa ? "Tabbatarwa a matakai biyu" : "Two-Factor Authentication"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>{isHausa ? "Fitar da Bayanan" : "Export Data"}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Help */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              {t.settings.help}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <span>FAQ</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <span>{isHausa ? "Tuntubi Tallafi" : "Contact Support"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              {t.settings.about}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.settings.version}</span>
              <span className="font-medium">1.0.0</span>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardContent className="p-4 space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="w-4 h-4" />
              {t.nav.logout}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              {isHausa ? "Share Asusu" : "Delete Account"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
