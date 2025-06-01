
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Prompt {
  id: string;
  title: string;
  emoji: string;
  excerpt: string;
  content: string;
  tags: string[];
  user_id: string;
}

const EditPrompt = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📄');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (id) {
      fetchPrompt();
    }
  }, [id, user, navigate]);

  const fetchPrompt = async () => {
    if (!id || !user) return;

    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Not found",
            description: "Prompt not found or you don't have permission to edit it.",
            variant: "destructive",
          });
          navigate('/my-prompts');
          return;
        }
        throw error;
      }

      setPrompt(data);
      setTitle(data.title);
      setEmoji(data.emoji || '📄');
      setExcerpt(data.excerpt);
      setContent(data.content);
      setTags(data.tags || []);
    } catch (error) {
      console.error('Error fetching prompt:', error);
      toast({
        title: "Error",
        description: "Failed to load prompt. Please try again.",
        variant: "destructive",
      });
      navigate('/my-prompts');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !prompt) return;

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('prompts')
        .update({
          title: title.trim(),
          emoji: emoji || '📄',
          excerpt: excerpt.trim(),
          content: content.trim(),
          tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', prompt.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt updated successfully!",
      });

      navigate('/my-prompts');
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to update prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !prompt) return;

    if (!confirm(`Are you sure you want to delete "${prompt.title}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', prompt.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt deleted successfully!",
      });

      navigate('/my-prompts');
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to delete prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please sign in to edit prompts.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading prompt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/my-prompts')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to My Prompts</span>
            </Button>
            <h1 className="text-2xl font-bold">Edit Prompt</h1>
          </div>
          
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card className="glass glass-dark">
            <CardHeader>
              <CardTitle>Prompt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Emoji</label>
                  <Input
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    placeholder="📄"
                    className="text-center text-2xl"
                    maxLength={2}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter prompt title..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your prompt..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-xs hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass glass-dark">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your prompt content here..."
                rows={20}
                className="font-mono"
                required
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-prompts')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPrompt;
