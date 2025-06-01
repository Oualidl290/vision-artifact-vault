
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Creative Vault
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            A personal collection of my best ideas, product visions, AI prompts, UI breakdowns, 
            and inspiration documents. Explore the creative process behind innovative projects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vault">
              <Button size="lg" className="flex items-center space-x-2 px-8 py-4 text-lg">
                <BookOpen className="w-5 h-5" />
                <span>Explore Vault</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/create-document">
              <Button variant="outline" size="lg" className="flex items-center space-x-2 px-8 py-4 text-lg">
                <Sparkles className="w-5 h-5" />
                <span>Create Document</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What's Inside</h2>
          <p className="text-gray-600 dark:text-gray-400">Discover the different types of content in my creative vault</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass glass-dark card-hover">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle>AI Prompts</CardTitle>
              <CardDescription>
                Advanced prompt engineering techniques and templates for AI interactions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass glass-dark card-hover">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Product Visions</CardTitle>
              <CardDescription>
                Complete design systems, UI patterns, and product roadmaps for SaaS projects
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass glass-dark card-hover">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Workflows</CardTitle>
              <CardDescription>
                Business processes, development workflows, and productivity frameworks
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center glass glass-dark rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Dive into my collection of creative documents and get inspired
          </p>
          <Link to="/vault">
            <Button size="lg" className="px-8 py-4 text-lg">
              Start Exploring
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
