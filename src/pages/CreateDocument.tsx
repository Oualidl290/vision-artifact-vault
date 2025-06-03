
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, FileText, Tag, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateDocument = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a document.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert({
          title: title.trim(),
          content: content.trim(),
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          is_public: isPublic,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your document has been created successfully.",
      });

      navigate(`/vault/${data.id}`);
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: "Error",
        description: "Failed to create document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center space-x-4 mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/vault')}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vault</span>
          </Button>
          <div className="h-6 w-px bg-slate-300" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Create New Document
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
          <Card className="glass-card border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span>Document Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your document title..."
                  className="h-12 rounded-xl border-slate-200/50 bg-white/60 backdrop-blur-sm focus:bg-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your document content here..."
                  rows={12}
                  className="rounded-xl border-slate-200/50 bg-white/60 backdrop-blur-sm focus:bg-white transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Tags (comma-separated)</span>
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="react, javascript, tutorial, guide..."
                  className="h-12 rounded-xl border-slate-200/50 bg-white/60 backdrop-blur-sm focus:bg-white transition-all duration-300"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                <Globe className="w-5 h-5 text-slate-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">Public Document</h4>
                  <p className="text-sm text-slate-600">Make this document visible to everyone in the vault</p>
                </div>
                <Button
                  type="button"
                  variant={isPublic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPublic(!isPublic)}
                  className="rounded-lg"
                >
                  {isPublic ? "Public" : "Private"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/vault')}
              className="h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              Create Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
