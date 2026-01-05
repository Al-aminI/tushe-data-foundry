import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockUser, mockTransactions } from "@/lib/mockData";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ChevronRight,
  Smartphone,
  Building2,
  Gift,
  TrendingUp,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Wallet() {
  const { t, isHausa } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (activeTab === "all") return true;
    if (activeTab === "earnings") return tx.type === "earning" || tx.type === "bonus";
    if (activeTab === "withdrawals") return tx.type === "withdrawal";
    return true;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earning":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      case "bonus":
        return <Gift className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earning":
      case "bonus":
        return "text-green-600";
      case "withdrawal":
        return "text-orange-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.wallet.title}</h1>
          <p className="text-muted-foreground">
            {isHausa ? "Duba samun kuɗinku da cire kuɗi" : "Manage your earnings and withdrawals"}
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="md:col-span-2 bg-gradient-to-br from-primary to-hausa-green-dark text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">{t.wallet.balance}</p>
                  <p className="text-4xl font-bold mt-1">₦{mockUser.availableBalance.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+₦2,450 {isHausa ? "yau" : "today"}</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <WalletIcon className="w-7 h-7" />
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full mt-6 h-12 font-semibold">
                    {t.wallet.withdraw}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.wallet.withdraw}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>{isHausa ? "Adadin" : "Amount"}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isHausa ? "Mafi ƙaranci: ₦500" : "Minimum: ₦500"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.wallet.paymentMethod}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={isHausa ? "Zaɓi hanyar biyan kuɗi" : "Select payment method"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-4 h-4" />
                              MTN Mobile Money
                            </div>
                          </SelectItem>
                          <SelectItem value="bank">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              Bank Transfer
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full h-12">{t.wallet.withdraw}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">{t.wallet.pending}</p>
              <p className="text-3xl font-bold text-foreground mt-1">
                ₦{mockUser.pendingBalance.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{isHausa ? "Ana bita" : "Under review"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{t.wallet.history}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">
                  {isHausa ? "Duka" : "All"}
                </TabsTrigger>
                <TabsTrigger value="earnings">
                  {t.wallet.earnings}
                </TabsTrigger>
                <TabsTrigger value="withdrawals">
                  {t.wallet.withdrawals}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {filteredTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          tx.type === "earning" && "bg-green-100 dark:bg-green-900/30",
                          tx.type === "withdrawal" && "bg-orange-100 dark:bg-orange-900/30",
                          tx.type === "bonus" && "bg-purple-100 dark:bg-purple-900/30",
                          tx.status === "pending" && "bg-muted"
                        )}>
                          {getTransactionIcon(tx.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{tx.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className={cn("font-semibold", getTransactionColor(tx.type))}>
                            {tx.type === "withdrawal" ? "-" : "+"}₦{tx.amount.toLocaleString()}
                          </p>
                          {tx.status === "pending" && (
                            <Badge variant="secondary" className="text-xs">
                              {isHausa ? "Jiran" : "Pending"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.wallet.noTransactions}</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{t.wallet.paymentMethod}</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                {isHausa ? "Ƙara" : "Add"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">MTN Mobile Money</p>
                  <p className="text-sm text-muted-foreground">+234 801 *** 5678</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {isHausa ? "Babban" : "Primary"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
