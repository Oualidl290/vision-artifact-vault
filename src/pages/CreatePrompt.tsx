
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, FileText, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreatePrompt = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    emoji: '📝',
    excerpt: '',
    content: '',
    tags: [] as string[],
  });
  
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('prompts')
        .insert({
          title: formData.title,
          emoji: formData.emoji,
          excerpt: formData.excerpt,
          content: formData.content,
          tags: formData.tags,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt created successfully!",
      });

      navigate('/vault');
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to create prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-96 backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/20 dark:border-slate-800/20 shadow-2xl rounded-3xl">
          <CardContent className="pt-12 pb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Authentication Required
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Please sign in to create prompts.</p>
            <Button onClick={() => navigate('/auth')} className="rounded-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/vault')}
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Create New Prompt
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl animate-fade-in">
        <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/20 dark:border-slate-800/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 border-b border-slate-200/20 dark:border-slate-800/20">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span>Create a New Prompt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emoji" className="text-sm font-medium text-slate-700 dark:text-slate-300">Emoji</Label>
                  <Input
                    id="emoji"
                    value={formData.emoji}
                    onChange={(e) => setFormData(prev => ({ ...prev, emoji: e.target.value }))}
                    placeholder="📝"
                    className="text-center text-2xl h-14 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                    maxLength={2}
                  />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter prompt title..."
                    required
                    className="h-14 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your prompt..."
                  required
                  className="h-14 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-300">Content</Label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your detailed prompt content here..."
                  className="w-full min-h-[300px] p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 h-12 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddTag} 
                    size="sm"
                    className="h-12 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-500 transition-colors duration-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/vault')}
                  className="px-8 py-3 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-8 py-3 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Create Prompt</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreatePrompt;
