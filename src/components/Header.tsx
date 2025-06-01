
import { useState } from 'react';
import { Search, Plus, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

interface HeaderProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ selectedTag, onTagSelect, searchQuery, onSearchChange }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const popularTags = ['AI', 'ProductVision', 'UI', 'SaaS', 'Reference', 'Workflow', 'Design'];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass glass-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Creative Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-2xl mx-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search prompts, documents, tags..."
                className="pl-10 glass glass-dark"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            {/* Tags */}
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedTag === null ? "default" : "ghost"}
                size="sm"
                onClick={() => onTagSelect(null)}
                className="rounded-full"
              >
                All
              </Button>
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
                  onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/my-prompts">
                  <Button variant="ghost" size="sm">
                    My Prompts
                  </Button>
                </Link>
                <Link to="/create-document">
                  <Button size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Document</span>
                  </Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search prompts, documents, tags..."
                className="pl-10 glass glass-dark"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            {/* Mobile Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedTag === null ? "default" : "ghost"}
                size="sm"
                onClick={() => onTagSelect(null)}
                className="rounded-full"
              >
                All
              </Button>
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
                  onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-2 mt-4">
              {user ? (
                <>
                  <Link to="/my-prompts" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      My Prompts
                    </Button>
                  </Link>
                  <Link to="/create-document" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      New Document
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
