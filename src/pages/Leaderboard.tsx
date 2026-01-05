import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockLeaderboard, mockUser } from "@/lib/mockData";
import { Trophy, Medal, Award, Crown } from "lucide-react";

export default function Leaderboard() {
  const { t, isHausa } = useLanguage();
  const [activeTab, setActiveTab] = useState("weekly");

  // Find current user's rank
  const userRank = mockLeaderboard.findIndex((u) => u.name === mockUser.name) + 1;
  const userEntry = mockLeaderboard.find((u) => u.name === mockUser.name);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t.leaderboard.title}</h1>
          <p className="text-muted-foreground">
            {isHausa ? "Duba matsayinku a tsakanin masu gudummawa" : "See how you rank among contributors"}
          </p>
        </div>

        {/* Top 3 Podium */}
        <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
            <div className="flex items-end justify-center gap-2 sm:gap-4">
              {/* 2nd Place */}
              <div className="text-center flex-1 max-w-[100px] sm:max-w-[140px]">
                <div className="relative mx-auto mb-2 sm:mb-3">
                  <img
                    src={mockLeaderboard[1].avatar}
                    alt={mockLeaderboard[1].name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-slate-300 mx-auto"
                  />
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-300 flex items-center justify-center">
                    <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-slate-700" />
                  </div>
                </div>
                <p className="font-medium text-foreground text-xs sm:text-sm truncate px-1">{mockLeaderboard[1].name}</p>
                <p className="text-xs sm:text-sm text-primary font-bold">{mockLeaderboard[1].points.toLocaleString()}</p>
                <div className="h-16 sm:h-20 bg-slate-200 dark:bg-slate-700 rounded-t-xl mt-2 sm:mt-3 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-300">2</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center flex-1 max-w-[120px] sm:max-w-[160px]">
                <div className="relative mx-auto mb-2 sm:mb-3">
                  <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2">
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                  </div>
                  <img
                    src={mockLeaderboard[0].avatar}
                    alt={mockLeaderboard[0].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 sm:border-4 border-yellow-400 mx-auto ring-2 sm:ring-4 ring-yellow-200"
                  />
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-gold">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-900" />
                  </div>
                </div>
                <p className="font-semibold text-foreground text-xs sm:text-base truncate px-1">{mockLeaderboard[0].name}</p>
                <p className="text-xs sm:text-sm text-primary font-bold">{mockLeaderboard[0].points.toLocaleString()}</p>
                <div className="h-20 sm:h-28 bg-yellow-400 dark:bg-yellow-500 rounded-t-xl mt-2 sm:mt-3 flex items-center justify-center shadow-gold">
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-900">1</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center flex-1 max-w-[100px] sm:max-w-[140px]">
                <div className="relative mx-auto mb-3">
                  <img
                    src={mockLeaderboard[2].avatar}
                    alt={mockLeaderboard[2].name}
                    className="w-16 h-16 rounded-full border-4 border-amber-600 mx-auto"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-100" />
                  </div>
                </div>
                <p className="font-medium text-foreground text-sm truncate">{mockLeaderboard[2].name}</p>
                <p className="text-sm text-primary font-bold">{mockLeaderboard[2].points.toLocaleString()}</p>
                <div className="h-16 bg-amber-600 dark:bg-amber-700 rounded-t-xl mt-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-100">3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rank */}
        {userEntry && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  #{userRank}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.leaderboard.yourRank}</p>
                  <p className="font-semibold text-foreground">
                    {userEntry.points.toLocaleString()} {t.leaderboard.points}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="daily">{t.leaderboard.tabs.daily}</TabsTrigger>
                <TabsTrigger value="weekly">{t.leaderboard.tabs.weekly}</TabsTrigger>
                <TabsTrigger value="monthly">{t.leaderboard.tabs.monthly}</TabsTrigger>
                <TabsTrigger value="allTime">{t.leaderboard.tabs.allTime}</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {mockLeaderboard.map((entry) => (
                <LeaderboardCard
                  key={entry.id}
                  rank={entry.rank}
                  name={entry.name}
                  avatar={entry.avatar}
                  points={entry.points}
                  region={entry.region}
                  isCurrentUser={entry.name === mockUser.name}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
