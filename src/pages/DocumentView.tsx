
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import PromptViewer from '@/components/PromptViewer';
import { useToast } from '@/hooks/use-toast';

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
    if (documentId && user) {
      fetchDocument();
    }
  }, [documentId, user]);

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
            description: "The document you're looking for doesn't exist or you don't have access to it.",
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-semibold mb-2">Document not found</h3>
          <p className="text-muted-foreground mb-4">
            The document you're looking for doesn't exist or you don't have access to it.
          </p>
          <button
            onClick={handleBackToVault}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Vault
          </button>
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
    <PromptViewer
      prompt={promptForViewer}
      onBack={handleBackToVault}
    />
  );
};

export default DocumentView;
