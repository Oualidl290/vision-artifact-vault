
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import VaultFeed from '@/components/VaultFeed';
import PromptViewer from '@/components/PromptViewer';

interface Prompt {
  id: string;
  title: string;
  emoji: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  content: string;
  user_id: string;
}

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (selectedPrompt) {
    // Convert the prompt to match PromptViewer's expected format
    const promptForViewer = {
      ...selectedPrompt,
      date: new Date(selectedPrompt.created_at).toLocaleDateString(),
      readTime: `${Math.ceil(selectedPrompt.content.length / 1000)} min read`
    };

    return (
      <PromptViewer
        prompt={promptForViewer}
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
