
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import PromptCard from './PromptCard';
import { useToast } from '@/hooks/use-toast';

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

interface VaultFeedProps {
  selectedTag: string | null;
  searchQuery: string;
  onPromptSelect: (prompt: Prompt) => void;
}

const VaultFeed = ({ selectedTag, searchQuery, onPromptSelect }: VaultFeedProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback prompts for when database is empty or user is not logged in
  const fallbackPrompts: Prompt[] = [
    {
      id: 'fallback-1',
      title: 'Laals UI Vision – Complete SaaS Design System',
      emoji: '🎨',
      excerpt: 'A comprehensive design system and product vision for Laals - my SaaS company. Includes UI patterns, color schemes, component library, and the complete product lineup with Supabase backend architecture.',
      tags: ['SaaS', 'UI', 'ProductVision', 'Design'],
      created_at: 'Dec 15, 2024',
      updated_at: 'Dec 15, 2024',
      content: `# Laals UI Vision – Complete SaaS Design System

## 🎯 Vision Statement
Laals represents the future of SaaS tooling - clean, powerful, and beautifully crafted. Our design system embodies simplicity without sacrificing functionality.

## 🎨 Design Principles

### Color Palette
- **Primary**: Deep Blue (#1e40af) - Trust, professionalism
- **Secondary**: Emerald (#059669) - Growth, success
- **Accent**: Purple (#7c3aed) - Innovation, creativity
- **Neutral**: Slate grays for text and backgrounds

### Typography
- **Headers**: Inter Bold/Semibold
- **Body**: Inter Regular
- **Code**: JetBrains Mono

### Component Philosophy
1. **Glassmorphism**: Subtle transparency with backdrop blur
2. **Rounded Corners**: 12px border radius for cards, 8px for buttons
3. **Micro-interactions**: Smooth hover states and transitions
4. **Consistent Spacing**: 8px grid system

## 🏗️ Product Lineup

### 1. Laals Analytics
Real-time business intelligence dashboard
- Custom charts and visualizations
- Team collaboration features
- Advanced filtering and segmentation

### 2. Laals CRM
Customer relationship management
- Contact management
- Pipeline tracking
- Automated workflows

### 3. Laals Workspace
Team productivity suite
- Project management
- Document collaboration
- Time tracking

## 🔧 Technical Stack

### Frontend
- **React + TypeScript**: Component-based architecture
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization

### Backend (Supabase)
- **PostgreSQL**: Relational database
- **Row Level Security**: Fine-grained permissions
- **Edge Functions**: Serverless API endpoints
- **Real-time subscriptions**: Live data updates

## 📱 Responsive Design
- **Mobile-first**: Optimized for touch interfaces
- **Tablet adaptation**: Collapsible sidebars
- **Desktop experience**: Multi-panel layouts

## 🚀 Future Roadmap
- Dark mode perfection
- Advanced theming system
- Component marketplace
- API documentation portal

This vision document serves as our north star for all design and development decisions.`,
      user_id: 'fallback',
    },
    {
      id: 'fallback-2',
      title: 'AI Prompt Engineering Masterclass',
      emoji: '🤖',
      excerpt: 'Advanced techniques for crafting effective AI prompts. Covers role-based prompting, chain-of-thought reasoning, and context optimization strategies.',
      tags: ['AI', 'Reference', 'Workflow'],
      created_at: 'Dec 10, 2024',
      updated_at: 'Dec 10, 2024',
      content: `# AI Prompt Engineering Masterclass

## 🎯 Core Principles

### 1. Role-Based Prompting
Always establish a clear role for the AI:
- "You are a senior software architect..."
- "Acting as a UX designer with 10 years experience..."
- "As a technical writer specializing in API documentation..."

### 2. Context Window Optimization
- Front-load the most important information
- Use structured formats (markdown, JSON)
- Reference previous conversations explicitly

### 3. Chain-of-Thought Reasoning
Guide the AI through logical steps:
1. "First, analyze the problem"
2. "Then, consider alternative approaches"
3. "Finally, recommend the best solution"

## 🛠️ Advanced Techniques

### Temperature Control
- **0.1-0.3**: Factual, consistent responses
- **0.4-0.7**: Balanced creativity and accuracy
- **0.8-1.0**: Maximum creativity, less predictable

### Prompt Chaining
Break complex tasks into smaller, sequential prompts:
1. Research phase
2. Analysis phase
3. Synthesis phase
4. Output formatting

### Meta-Prompting
Teach the AI to improve its own responses:
"Before answering, consider what additional context would improve this response."

## 📝 Templates

### Code Review Template
\`\`\`
Role: Senior code reviewer
Task: Review the following code for:
- Performance issues
- Security vulnerabilities  
- Best practices adherence
- Readability improvements

Code: [INSERT CODE]

Format your response as:
1. Issues found
2. Specific recommendations
3. Improved code example
\`\`\`

### Business Analysis Template
\`\`\`
Context: [BUSINESS SCENARIO]
Objective: [SPECIFIC GOAL]
Constraints: [LIMITATIONS]

Analyze this scenario using:
1. SWOT framework
2. Risk assessment
3. Resource requirements
4. Success metrics
\`\`\`

This is my go-to reference for all AI interactions.`,
      user_id: 'fallback',
    }
  ];

  useEffect(() => {
    fetchPrompts();
  }, [user]);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If no prompts in database, use fallback prompts
      setPrompts(data && data.length > 0 ? data : fallbackPrompts);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      // On error, use fallback prompts
      setPrompts(fallbackPrompts);
      if (user) {
        toast({
          title: "Notice",
          description: "Using sample prompts. Database connection needed for full functionality.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesTag = !selectedTag || prompt.tags.includes(selectedTag);
      const matchesSearch = !searchQuery || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesTag && matchesSearch;
    });
  }, [prompts, selectedTag, searchQuery]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onPromptSelect(prompt)}
          >
            <PromptCard
              id={prompt.id}
              title={prompt.title}
              emoji={prompt.emoji}
              excerpt={prompt.excerpt}
              tags={prompt.tags}
              date={new Date(prompt.created_at).toLocaleDateString()}
              readTime={`${Math.ceil(prompt.content.length / 1000)} min read`}
              onClick={() => onPromptSelect(prompt)}
            />
          </div>
        ))}
      </div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default VaultFeed;
