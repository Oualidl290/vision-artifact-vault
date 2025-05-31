
import { useState, useMemo } from 'react';
import PromptCard from './PromptCard';

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

interface VaultFeedProps {
  selectedTag: string | null;
  searchQuery: string;
  onPromptSelect: (prompt: Prompt) => void;
}

const VaultFeed = ({ selectedTag, searchQuery, onPromptSelect }: VaultFeedProps) => {
  const prompts: Prompt[] = [
    {
      id: '1',
      title: 'Laals UI Vision – Complete SaaS Design System',
      emoji: '🎨',
      excerpt: 'A comprehensive design system and product vision for Laals - my SaaS company. Includes UI patterns, color schemes, component library, and the complete product lineup with Supabase backend architecture.',
      tags: ['SaaS', 'UI', 'ProductVision', 'Design'],
      date: 'Dec 15, 2024',
      readTime: '8 min read',
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

This vision document serves as our north star for all design and development decisions.`
    },
    {
      id: '2',
      title: 'AI Prompt Engineering Masterclass',
      emoji: '🤖',
      excerpt: 'Advanced techniques for crafting effective AI prompts. Covers role-based prompting, chain-of-thought reasoning, and context optimization strategies.',
      tags: ['AI', 'Reference', 'Workflow'],
      date: 'Dec 10, 2024',
      readTime: '12 min read',
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

This is my go-to reference for all AI interactions.`
    },
    {
      id: '3',
      title: 'Micro-SaaS Validation Framework',
      emoji: '📊',
      excerpt: 'A systematic approach to validating micro-SaaS ideas before building. Includes market research templates, competitor analysis, and MVP scoping strategies.',
      tags: ['SaaS', 'ProductVision', 'Reference'],
      date: 'Dec 5, 2024',
      readTime: '15 min read',
      content: `# Micro-SaaS Validation Framework

## 🎯 Overview
Before writing a single line of code, validate your SaaS idea systematically.

## Phase 1: Problem Identification

### Pain Point Research
1. **Interview 10+ potential users**
2. **Join relevant communities** (Reddit, Discord, Slack)
3. **Analyze support tickets** of existing solutions
4. **Monitor social media complaints**

### Problem Statement Template
"[TARGET AUDIENCE] struggles with [SPECIFIC PROBLEM] because [ROOT CAUSE], leading to [NEGATIVE OUTCOME]."

## Phase 2: Market Analysis

### Competitor Landscape
Create a feature comparison matrix:
- Direct competitors (same solution)
- Indirect competitors (different approach, same outcome)
- Adjacent solutions (partial overlap)

### Pricing Research
- Freemium vs paid models
- Price point sensitivity testing
- Value-based pricing considerations

## Phase 3: Solution Design

### MVP Scope
Apply the "painkiller vs vitamin" test:
- **Painkiller**: Solves urgent, painful problems
- **Vitamin**: Nice-to-have improvements

Focus exclusively on painkillers for MVP.

### Feature Prioritization Matrix
Plot features on:
- **X-axis**: Implementation effort (1-10)
- **Y-axis**: User value (1-10)
- **Priority**: High value, low effort first

## Phase 4: Validation Methods

### 1. Landing Page Test
- Create a compelling landing page
- Drive traffic through ads
- Measure signup/interest rates
- Target: >15% conversion for B2B, >5% for B2C

### 2. Pre-sales Validation
- Offer "early access" pricing
- Require payment for waitlist
- Gauge willingness to pay

### 3. Prototype Testing
- Build clickable prototype
- User testing sessions
- Task completion rates
- Qualitative feedback

## Success Metrics

### Validation Thresholds
- **Problem interviews**: 80% confirm the problem exists
- **Solution interviews**: 60% would use your solution
- **Willingness to pay**: 40% would pay your target price
- **Early access**: 100+ qualified signups

## Red Flags to Avoid
- ❌ "Everyone is my target market"
- ❌ "No direct competitors" (usually means no market)
- ❌ Building features before validating core value
- ❌ Falling in love with your solution vs the problem

This framework has saved me months of wasted development time.`
    }
  ];

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesTag = !selectedTag || prompt.tags.includes(selectedTag);
      const matchesSearch = !searchQuery || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

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
              date={prompt.date}
              readTime={prompt.readTime}
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
