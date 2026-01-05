import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";

// Main app pages
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

// Task interfaces
import TranslationTask from "./pages/tasks/TranslationTask";
import AudioRecordingTask from "./pages/tasks/AudioRecordingTask";
import AudioTranscriptionTask from "./pages/tasks/AudioTranscriptionTask";
import TextClassificationTask from "./pages/tasks/TextClassificationTask";
import SentimentAnalysisTask from "./pages/tasks/SentimentAnalysisTask";
import ImageCaptioningTask from "./pages/tasks/ImageCaptioningTask";
import NERTask from "./pages/tasks/NERTask";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Contributors from "./pages/admin/Contributors";
import Reports from "./pages/admin/Reports";
import Moderation from "./pages/admin/Moderation";
import Projects from "./pages/Projects";
import ProjectWizard from "./pages/ProjectWizard";
import Datasets from "./pages/Datasets";
import QualityWorkbench from "./pages/QualityWorkbench";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Main app pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            
            {/* Task interfaces */}
            <Route path="/tasks/translation" element={<TranslationTask />} />
            <Route path="/tasks/audioRecording" element={<AudioRecordingTask />} />
            <Route path="/tasks/audioTranscription" element={<AudioTranscriptionTask />} />
            <Route path="/tasks/textClassification" element={<TextClassificationTask />} />
            <Route path="/tasks/sentimentAnalysis" element={<SentimentAnalysisTask />} />
            <Route path="/tasks/imageCaptioning" element={<ImageCaptioningTask />} />
            <Route path="/tasks/ner" element={<NERTask />} />
            
            {/* Admin pages */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/projects/new" element={<ProjectWizard />} />
            <Route path="/admin/datasets" element={<Datasets />} />
            <Route path="/admin/quality" element={<QualityWorkbench />} />
            <Route path="/admin/contributors" element={<Contributors />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/moderation" element={<Moderation />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
