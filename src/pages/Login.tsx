import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, ArrowRight, Globe } from "lucide-react";

export default function Login() {
  const { t, isHausa, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Language toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "ha" : "en")}
        className="absolute top-4 right-4 gap-1.5"
      >
        <Globe className="w-4 h-4" />
        {isHausa ? "English" : "Hausa"}
      </Button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">T</span>
            </div>
            <span className="font-bold text-2xl text-foreground">Tushe</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{t.auth.login}</CardTitle>
            <CardDescription>
              {isHausa ? "Shiga asusunku don ci gaba" : "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "phone" | "email")}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="w-4 h-4" />
                  {t.auth.phone}
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="w-4 h-4" />
                  {t.auth.email}
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                <TabsContent value="phone" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.auth.phone}</Label>
                    <div className="flex gap-2">
                      <div className="w-20 flex items-center justify-center bg-muted rounded-lg text-sm font-medium">
                        +234
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="801 234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="password">{t.auth.password}</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <Button type="submit" className="w-full h-12 text-base gap-2">
                  {loginMethod === "phone" ? t.auth.sendOtp : t.auth.login}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t.auth.noAccount}{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  {t.auth.register}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
