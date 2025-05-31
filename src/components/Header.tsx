
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Home, User, Github } from 'lucide-react';

interface HeaderProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ selectedTag, onTagSelect, searchQuery, onSearchChange }: HeaderProps) => {
  const tags = ['SaaS', 'UI', 'AI', 'Reference', 'ProductVision', 'Workflow'];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass glass-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Oualid's Creative Vault
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Vault</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>About</span>
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search prompts..."
                className="pl-10 w-64 glass glass-dark"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => onTagSelect(null)}
            className="rounded-full"
          >
            All
          </Button>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
