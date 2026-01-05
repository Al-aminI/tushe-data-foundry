import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockDialects } from "@/lib/mockData";
import { ArrowRight, ArrowLeft, Globe, Check, User, Phone, MapPin } from "lucide-react";

export default function Register() {
  const { t, isHausa, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    dialect: "",
    region: "",
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/onboarding");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercent = (step / totalSteps) * 100;

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
          <CardHeader className="pb-4">
            {/* Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {isHausa ? `Mataki ${step} na ${totalSteps}` : `Step ${step} of ${totalSteps}`}
                </span>
                <span className="text-primary font-medium">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <CardTitle className="text-2xl">{t.auth.register}</CardTitle>
            <CardDescription>
              {step === 1 && (isHausa ? "Shigar da bayananku" : "Enter your personal details")}
              {step === 2 && (isHausa ? "Saita lambar waya da kalmar sirri" : "Set up your phone and password")}
              {step === 3 && (isHausa ? "Zaɓi yarenku da yanki" : "Choose your dialect and region")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {isHausa ? "Sunan Cikakke" : "Full Name"}
                    </Label>
                    <Input
                      id="fullName"
                      placeholder={isHausa ? "Shigar da sunanka" : "Enter your full name"}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Phone & Password */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t.auth.phone}
                    </Label>
                    <div className="flex gap-2">
                      <div className="w-20 flex items-center justify-center bg-muted rounded-lg text-sm font-medium">
                        +234
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.auth.password}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      {isHausa ? "Akalla haruffa 8" : "At least 8 characters"}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Dialect & Region */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {isHausa ? "Yaren Hausa" : "Hausa Dialect"}
                    </Label>
                    <Select
                      value={formData.dialect}
                      onValueChange={(value) => setFormData({ ...formData, dialect: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isHausa ? "Zaɓi yaren ku" : "Select your dialect"} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDialects.map((dialect) => (
                          <SelectItem key={dialect.id} value={dialect.id}>
                            {isHausa ? dialect.nameHa : dialect.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{isHausa ? "Jihar" : "State/Region"}</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isHausa ? "Zaɓi jihar ku" : "Select your state"} />
                      </SelectTrigger>
                      <SelectContent>
                        {["Kano", "Kaduna", "Sokoto", "Katsina", "Bauchi", "Jigawa", "Zamfara", "Kebbi"].map((state) => (
                          <SelectItem key={state} value={state.toLowerCase()}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1 h-12">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.common.back}
                  </Button>
                )}
                <Button type="submit" className="flex-1 h-12 gap-2">
                  {step === totalSteps ? (
                    <>
                      {t.common.done}
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      {t.common.next}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t.auth.hasAccount}{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  {t.auth.login}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
