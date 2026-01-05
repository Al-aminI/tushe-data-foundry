import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Settings,
  Shield,
  DollarSign,
  Users,
  Database,
  Mail,
  Bell,
  Key,
  Globe,
} from "lucide-react";

export default function AdminSettings() {
  const { isHausa } = useLanguage();
  const [settings, setSettings] = useState({
    platformName: "Tushe",
    platformDescription: "Community-driven data foundry for Hausa Language AI",
    minRewardPerTask: 50,
    maxRewardPerTask: 500,
    defaultQualityThreshold: 80,
    autoApproveThreshold: 95,
    maxTasksPerUser: 100,
    payoutMinimum: 1000,
    payoutProcessingDays: 3,
    emailFrom: "noreply@tushe.ai",
    supportEmail: "support@tushe.ai",
    maintenanceMode: false,
    registrationOpen: true,
    requireVerification: true,
  });

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isHausa ? "Saitunan Gudanarwa" : "Admin Settings"}
          </h1>
          <p className="text-muted-foreground">
            {isHausa ? "Sarrafa saitunan tsarin" : "Manage platform settings"}
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">{isHausa ? "Gabaɗaya" : "General"}</TabsTrigger>
            <TabsTrigger value="rewards">{isHausa ? "Lada" : "Rewards"}</TabsTrigger>
            <TabsTrigger value="security">{isHausa ? "Tsaro" : "Security"}</TabsTrigger>
            <TabsTrigger value="system">{isHausa ? "Tsarin" : "System"}</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Bayani na Tsarin" : "Platform Information"}</CardTitle>
                <CardDescription>
                  {isHausa ? "Canza bayanan tsarin" : "Update platform information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{isHausa ? "Sunan Tsarin" : "Platform Name"}</Label>
                  <Input
                    value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Bayani" : "Description"}</Label>
                  <Textarea
                    value={settings.platformDescription}
                    onChange={(e) => setSettings({ ...settings, platformDescription: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Saitunan Imel" : "Email Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{isHausa ? "Imel Daga" : "Email From"}</Label>
                  <Input
                    value={settings.emailFrom}
                    onChange={(e) => setSettings({ ...settings, emailFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Imel Taimako" : "Support Email"}</Label>
                  <Input
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Saitunan Lada" : "Reward Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isHausa ? "Lada Mafi ƙanƙanta (₦)" : "Min Reward (₦)"}</Label>
                    <Input
                      type="number"
                      value={settings.minRewardPerTask}
                      onChange={(e) => setSettings({ ...settings, minRewardPerTask: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isHausa ? "Lada Mafi Girma (₦)" : "Max Reward (₦)"}</Label>
                    <Input
                      type="number"
                      value={settings.maxRewardPerTask}
                      onChange={(e) => setSettings({ ...settings, maxRewardPerTask: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Iyakar Cire Kuɗi (₦)" : "Payout Minimum (₦)"}</Label>
                  <Input
                    type="number"
                    value={settings.payoutMinimum}
                    onChange={(e) => setSettings({ ...settings, payoutMinimum: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Kwanaki na Sarrafa Biyan Kuɗi" : "Payout Processing Days"}</Label>
                  <Input
                    type="number"
                    value={settings.payoutProcessingDays}
                    onChange={(e) => setSettings({ ...settings, payoutProcessingDays: parseInt(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Saitunan Tsaro" : "Security Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isHausa ? "Bukatar Tabbatarwa" : "Require Verification"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isHausa ? "Bukatar masu gudummawa su tabbatar da asusunsu" : "Require contributors to verify their accounts"}
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireVerification: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Iyakar Ayyuka ga Kowane Mai Amfani" : "Max Tasks Per User"}</Label>
                  <Input
                    type="number"
                    value={settings.maxTasksPerUser}
                    onChange={(e) => setSettings({ ...settings, maxTasksPerUser: parseInt(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Saitunan Tsarin" : "System Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isHausa ? "Yanayin Kula" : "Maintenance Mode"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isHausa ? "Kashe tsarin don kula" : "Disable platform for maintenance"}
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isHausa ? "Buɗe Rajista" : "Registration Open"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isHausa ? "Bari mutane su yi rajista" : "Allow new user registrations"}
                    </p>
                  </div>
                  <Switch
                    checked={settings.registrationOpen}
                    onCheckedChange={(checked) => setSettings({ ...settings, registrationOpen: checked })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isHausa ? "Matsakaicin Inganci" : "Default Quality Threshold (%)"}</Label>
                    <Input
                      type="number"
                      value={settings.defaultQualityThreshold}
                      onChange={(e) => setSettings({ ...settings, defaultQualityThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isHausa ? "Iyakar Amincewa ta Atomatik (%)" : "Auto Approve Threshold (%)"}</Label>
                    <Input
                      type="number"
                      value={settings.autoApproveThreshold}
                      onChange={(e) => setSettings({ ...settings, autoApproveThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3">
          <Button variant="outline">
            {isHausa ? "Soke" : "Cancel"}
          </Button>
          <Button>
            {isHausa ? "Ajiye Saituna" : "Save Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

