
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CreatePrompt from "./pages/CreatePrompt";
import CreateDocument from "./pages/CreateDocument";
import EditPrompt from "./pages/EditPrompt";
import MyPrompts from "./pages/MyPrompts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ModernLanding from "./pages/ModernLanding";
import ProtectedRoute from "./components/ProtectedRoute";
import DocumentView from "./pages/DocumentView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModernLanding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/vault" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/vault/:documentId" element={
              <ProtectedRoute>
                <DocumentView />
              </ProtectedRoute>
            } />
            <Route path="/create-prompt" element={
              <ProtectedRoute>
                <CreatePrompt />
              </ProtectedRoute>
            } />
            <Route path="/create-document" element={
              <ProtectedRoute>
                <CreateDocument />
              </ProtectedRoute>
            } />
            <Route path="/edit-prompt/:id" element={
              <ProtectedRoute>
                <EditPrompt />
              </ProtectedRoute>
            } />
            <Route path="/my-prompts" element={
              <ProtectedRoute>
                <MyPrompts />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
