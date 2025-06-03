
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search, Plus, FileText, Edit, Trash2, Eye, Globe, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const MyPrompts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchMyPrompts();
  }, [user, navigate]);

  const fetchMyPrompts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast({
        title: "Error",
        description: "Failed to load your documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPrompts(prompts.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Document deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-slate-600 mb-4">Please sign in to view your documents.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 text-lg">Loading your documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
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
              My Documents
            </h1>
          </div>
          
          <Link to="/create-document">
            <Button className="flex items-center space-x-2 rounded-xl h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Plus className="w-5 h-5" />
              <span>New Document</span>
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-8 animate-fade-in">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Search your documents..." 
            className="pl-12 h-14 rounded-2xl border-slate-200/50 bg-white/60 backdrop-blur-sm focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>

        {/* Documents Grid */}
        {filteredPrompts.length === 0 ? (
          <Card className="glass-card border border-slate-200/50 shadow-lg animate-fade-in">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {searchQuery ? 'No matching documents' : 'No documents yet'}
              </h3>
              <p className="text-slate-600 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search terms.' 
                  : 'Create your first document to get started.'
                }
              </p>
              {!searchQuery && (
                <Link to="/create-document">
                  <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Document
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="glass-card border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                      {prompt.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1 ml-2">
                      {prompt.is_public ? (
                        <Globe className="w-4 h-4 text-green-500" title="Public" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" title="Private" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {prompt.content}
                  </p>
                  
                  {prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {prompt.tags.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                          +{prompt.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="text-xs text-slate-500">
                    Updated {new Date(prompt.updated_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Link to={`/vault/${prompt.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full rounded-lg">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-prompt/${prompt.id}`}>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(prompt.id)}
                      className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrompts;
