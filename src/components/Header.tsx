
import { useState } from 'react';
import { Search, Plus, User, Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

interface HeaderProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({
  selectedTag,
  onTagSelect,
  searchQuery,
  onSearchChange
}: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-violet-950">Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-2xl mx-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search documents, insights, tags..." 
                className="pl-11 h-12 rounded-2xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg" 
                value={searchQuery} 
                onChange={e => onSearchChange(e.target.value)} 
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/my-prompts">
                  <Button variant="ghost" size="sm" className="rounded-xl h-10 px-4 font-medium hover:scale-105 transition-all duration-300">
                    My Documents
                  </Button>
                </Link>
                <Link to="/create-document">
                  <Button size="sm" className="flex items-center space-x-2 rounded-xl h-10 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="w-4 h-4" />
                    <span>New Document</span>
                  </Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="flex items-center space-x-2 rounded-xl h-10 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
            className="lg:hidden rounded-xl h-10 w-10 hover:scale-105 transition-all duration-300" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-slate-200/20 dark:border-slate-700/20 animate-fade-in">
            {/* Mobile Search */}
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search documents, insights, tags..." 
                className="pl-11 h-12 rounded-2xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm" 
                value={searchQuery} 
                onChange={e => onSearchChange(e.target.value)} 
              />
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-3 mt-6">
              {user ? (
                <>
                  <Link to="/my-prompts" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start rounded-xl h-12">
                      My Documents
                    </Button>
                  </Link>
                  <Link to="/create-document" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full justify-start rounded-xl h-12 bg-gradient-to-r from-purple-600 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      New Document
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start rounded-xl h-12">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start rounded-xl h-12 bg-gradient-to-r from-purple-600 to-blue-600">
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
