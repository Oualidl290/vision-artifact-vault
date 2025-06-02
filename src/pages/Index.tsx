
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import VaultFeed from '@/components/VaultFeed';

const Index = () => {
  const { loading } = useAuth();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
            <span className="text-white font-bold text-lg">CV</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      <main className="animate-fade-in">
        <VaultFeed
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          onPromptSelect={() => {}}
        />
      </main>
    </div>
  );
};

export default Index;
