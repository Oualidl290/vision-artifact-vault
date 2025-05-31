
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface PromptCardProps {
  id: string;
  title: string;
  emoji: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime?: string;
  onClick: (id: string) => void;
}

const PromptCard = ({ id, title, emoji, excerpt, tags, date, readTime, onClick }: PromptCardProps) => {
  return (
    <Card className="group cursor-pointer card-hover glass glass-dark border-0 shadow-lg animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{emoji}</span>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick(id);
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs rounded-full">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;
