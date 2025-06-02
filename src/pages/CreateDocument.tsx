
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, LogIn, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateDocument = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📄');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload PDF, TXT, DOC, or DOCX files only.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setIsProcessingFile(true);

    try {
      await processFile(file);
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error processing file",
        description: "Could not extract content from the file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingFile(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type === 'text/plain') {
      const text = await file.text();
      setContent(text);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
      if (!excerpt) setExcerpt(text.substring(0, 200) + (text.length > 200 ? '...' : ''));
    } else if (file.type === 'application/pdf') {
      // For PDF files, we'll store the file and show a message
      setContent(`PDF file uploaded: ${file.name}\n\nTo view the full content, the PDF would need to be processed by a PDF parser.`);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
      if (!excerpt) setExcerpt(`PDF document: ${file.name}`);
    } else {
      // For other file types
      setContent(`Document uploaded: ${file.name}\n\nFile type: ${file.type}`);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
      if (!excerpt) setExcerpt(`Document: ${file.name}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a document.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields or upload a file.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('prompts')
        .insert({
          title: title.trim(),
          emoji: emoji || '📄',
          excerpt: excerpt.trim(),
          content: content.trim(),
          tags,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Document created",
        description: "Your document has been successfully created.",
      });

      navigate('/vault');
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: "Error",
        description: "Failed to create document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to sign in to create and share documents in the Creative Vault.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/auth')} className="w-full">
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold">Create New Document</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <Card className="glass glass-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  disabled={isProcessingFile}
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {isProcessingFile ? 'Processing file...' : 'Click to upload a document'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, TXT, DOC, DOCX files up to 10MB
                    </p>
                  </div>
                </label>
                {selectedFile && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      ✓ {selectedFile.name} uploaded successfully
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="glass glass-dark">
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
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
                    placeholder="Enter document title..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your document..."
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
              <CardTitle>Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Document content will appear here after upload, or you can write manually..."
                rows={15}
                className="font-mono"
                required
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isProcessingFile}
            >
              {isSubmitting ? 'Creating...' : 'Create Document'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
