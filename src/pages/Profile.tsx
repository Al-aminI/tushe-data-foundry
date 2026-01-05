import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockUser } from "@/lib/mockData";
import { 
  MapPin, 
  Calendar, 
  CheckCircle,
  Coins,
  Settings,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { t, isHausa } = useLanguage();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-primary" />
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
              <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="text-2xl">AM</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mockUser.dialect}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {isHausa ? "Memba tun" : "Member since"} {new Date(mockUser.memberSince).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to="/settings">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    {t.profile.edit}
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{mockUser.tasksCompleted}</p>
              <p className="text-sm text-muted-foreground">{t.profile.stats.tasksCompleted}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">₦{mockUser.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{t.profile.stats.totalEarnings}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
