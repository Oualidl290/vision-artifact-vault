
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share, Bookmark } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  emoji: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime?: string;
  content: string;
}

interface PromptViewerProps {
  prompt: Prompt;
  onBack: () => void;
}

const PromptViewer = ({ prompt, onBack }: PromptViewerProps) => {
  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mb-6 mt-8 first:mt-0">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mb-4 mt-6">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mb-3 mt-5">{line.slice(4)}</h3>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="ml-6 mb-2">{line.slice(2)}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={index} className="ml-6 mb-2 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
        }
        if (line.startsWith('```')) {
          return <div key={index} className="bg-muted p-4 rounded-lg font-mono text-sm my-4">{line.slice(3)}</div>;
        }
        if (line.trim() === '') {
          return <div key={index} className="h-4"></div>;
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b glass glass-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Vault</span>
              </Button>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{prompt.date}</span>
                {prompt.readTime && (
                  <>
                    <Clock className="w-4 h-4 ml-4" />
                    <span>{prompt.readTime}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl">{prompt.emoji}</span>
            <h1 className="text-4xl font-bold leading-tight">
              {prompt.title}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {prompt.excerpt}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {formatContent(prompt.content)}
        </div>
      </article>
    </div>
  );
};

export default PromptViewer;
