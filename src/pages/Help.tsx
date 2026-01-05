import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Mail, 
  Phone,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  ExternalLink
} from "lucide-react";

const faqData = [
  {
    id: "1",
    questionEn: "How do I get paid for my work?",
    questionHa: "Yaya zan sami kuɗi don aikina?",
    answerEn: "You can withdraw your earnings to your mobile money account (MTN, Airtel) or bank account once you reach ₦500 minimum balance. Payments are processed within 24-48 hours.",
    answerHa: "Za ku iya cire samun kuɗinku zuwa asusun kuɗin wayar ku (MTN, Airtel) ko asusun banki da zarar kun kai mafi ƙarancin ₦500. Ana sarrafa biyan kuɗi a cikin awanni 24-48."
  },
  {
    id: "2",
    questionEn: "What types of tasks are available?",
    questionHa: "Wane irin ayyuka ake samu?",
    answerEn: "We offer various tasks including text translation, audio recording, audio transcription, text classification, sentiment analysis, image captioning, and named entity recognition.",
    answerHa: "Muna ba da ayyuka daban-daban da suka haɗa da fassarar rubutu, rikodin sauti, rubuta sauti, rarraba rubutu, nazarin ji, bayyana hotuna, da gane sunaye."
  },
  {
    id: "3",
    questionEn: "How is my quality score calculated?",
    questionHa: "Yaya ake ƙididdige makin ingancina?",
    answerEn: "Your quality score is based on the accuracy of your work reviewed by our quality team. Maintaining a score above 80% unlocks higher-paying tasks and bonuses.",
    answerHa: "Makin ingancin ku ya dogara ne akan daidaiton aikin ku da ƙungiyar ingancin mu ta duba. Riƙe maki sama da 80% yana buɗe ayyukan da ke biyan kuɗi mafi girma da karin lada."
  },
  {
    id: "4",
    questionEn: "Can I work from my phone?",
    questionHa: "Zan iya aiki daga wayar hannu?",
    answerEn: "Yes! Our platform is fully optimized for mobile devices. You can complete most tasks directly from your smartphone.",
    answerHa: "Eh! An inganta dandamalin mu sosai don na'urorin wayar hannu. Kuna iya kammala yawancin ayyuka kai tsaye daga wayar ku."
  },
  {
    id: "5",
    questionEn: "How do I level up?",
    questionHa: "Yaya zan haura matsayi?",
    answerEn: "Complete tasks to earn XP. The more tasks you complete and the higher your quality score, the faster you'll level up. Higher levels unlock special rewards and exclusive tasks.",
    answerHa: "Kammala ayyuka don samun XP. Yadda kuke kammala ayyuka da yawa kuma matsayin ingancin ku ya fi girma, haka zaku haura matsayi da sauri. Matsayin da ya fi girma yana buɗe lada na musamman da ayyukan keɓanta."
  },
  {
    id: "6",
    questionEn: "What languages are supported?",
    questionHa: "Wane harsuna ake tallafawa?",
    answerEn: "Currently, we focus on Hausa language tasks with various dialects including Kano, Sokoto, Katsina, Zaria, and more. We're expanding to support more African languages soon.",
    answerHa: "A halin yanzu, muna mayar da hankali kan ayyukan harshen Hausa tare da yaruka daban-daban da suka haɗa da Kano, Sakkwato, Katsina, Zariya, da sauransu. Za mu faɗaɗa don tallafawa ƙarin harsunan Afirka nan ba da jimawa ba."
  },
];

const guides = [
  {
    titleEn: "Getting Started Guide",
    titleHa: "Jagorar Farawa",
    descEn: "Learn the basics of the platform",
    descHa: "Koyi asalin dandamalin",
    icon: BookOpen,
  },
  {
    titleEn: "Recording Audio Tips",
    titleHa: "Shawarwarin Rikodi Sauti",
    descEn: "Best practices for audio quality",
    descHa: "Mafi kyawun ayyuka don ingancin sauti",
    icon: Video,
  },
  {
    titleEn: "Translation Guidelines",
    titleHa: "Jagoran Fassara",
    descEn: "How to produce quality translations",
    descHa: "Yadda ake samar da fassara mai inganci",
    icon: FileText,
  },
];

export default function Help() {
  const { t, isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = faqData.filter((faq) => {
    const question = isHausa ? faq.questionHa : faq.questionEn;
    return question.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t.settings.help}</h1>
          <p className="text-muted-foreground mt-2">
            {isHausa ? "Samun amsoshi da taimako da kuke buƙata" : "Get the answers and support you need"}
          </p>
        </div>

        {/* Search */}
        {/* <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={isHausa ? "Bincika tambayoyi..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg"
          />
        </div> */}

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          {guides.map((guide, i) => (
            <a
              key={i}
              href="https://discord.gg/VRxBxgYCs8"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="group cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {isHausa ? guide.titleHa : guide.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {isHausa ? guide.descHa : guide.descEn}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isHausa ? "Tambayoyin da Ake Yawan Yi" : "Frequently Asked Questions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaq.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    {isHausa ? faq.questionHa : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {isHausa ? faq.answerHa : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

       
        {/* Community Link */}
        <a
          href="https://discord.gg/VRxBxgYCs8"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isHausa ? "Shiga Al'ummarmu" : "Join Our Community"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "Haɗu da sauran masu gudummawa" : "Connect with other contributors"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </a>
      </div>
    </AppLayout>
  );
}
