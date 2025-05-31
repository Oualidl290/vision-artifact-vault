
import { useState } from 'react';
import Header from '@/components/Header';
import VaultFeed from '@/components/VaultFeed';
import PromptViewer from '@/components/PromptViewer';

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

const Index = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleBackToVault = () => {
    setSelectedPrompt(null);
  };

  if (selectedPrompt) {
    return (
      <PromptViewer
        prompt={selectedPrompt}
        onBack={handleBackToVault}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      <main className="fade-in">
        <VaultFeed
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          onPromptSelect={handlePromptSelect}
        />
      </main>
    </div>
  );
};

export default Index;
