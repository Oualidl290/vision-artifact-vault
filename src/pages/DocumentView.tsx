
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import PromptViewer from '@/components/PromptViewer';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  title: string;
  emoji: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  content: string;
  user_id: string;
}

const DocumentView = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const fetchDocument = async () => {
    if (!documentId) return;

    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Document not found",
            description: "The document you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate('/vault');
          return;
        }
        throw error;
      }

      setDocument(data);
    } catch (error) {
      console.error('Error fetching document:', error);
      toast({
        title: "Error",
        description: "Failed to load the document. Please try again.",
        variant: "destructive",
      });
      navigate('/vault');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToVault = () => {
    navigate('/vault');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Modern Header */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Creative Vault
                </span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Loading Document
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Fetching your content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Modern Header */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToVault}
                className="flex items-center space-x-2 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Vault</span>
              </Button>
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Creative Vault
                </span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center animate-fade-in bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-slate-200/20 dark:border-slate-800/20">
            <div className="text-6xl mb-6">📄</div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Document Not Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg max-w-md">
              The document you're looking for doesn't exist or may have been removed.
            </p>
            <Button
              onClick={handleBackToVault}
              className="rounded-xl px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Back to Vault
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Convert the document to match PromptViewer's expected format
  const promptForViewer = {
    ...document,
    date: new Date(document.created_at).toLocaleDateString(),
    readTime: `${Math.ceil(document.content.length / 1000)} min read`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <PromptViewer
        prompt={promptForViewer}
        onBack={handleBackToVault}
      />
    </div>
  );
};

export default DocumentView;
