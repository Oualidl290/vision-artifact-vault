
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check, Star, Users, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ModernLandingPage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Create and organize your ideas in seconds with our intuitive interface"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your creative work is protected with enterprise-grade security"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Access Anywhere",
      description: "Sync across all your devices and collaborate from anywhere"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content: "Creative Vault has transformed how I organize my design inspiration. It's become an essential part of my workflow.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Researcher",
      content: "The prompt collection feature is incredible. I've saved hours of work by reusing and iterating on proven prompts.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Startup Founder",
      content: "Perfect for keeping all my product ideas and visions organized. The UI breakdown feature is particularly useful.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 dark:from-purple-500/5 dark:via-blue-500/5 dark:to-emerald-500/5" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Trusted by 10,000+ creators
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-purple-700 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent leading-tight">
              Your Creative
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Vision Vault
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Capture, organize, and transform your best ideas into reality. From AI prompts to product visions, 
              everything you need for creative success in one beautiful workspace.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {user ? (
                <>
                  <Link to="/vault">
                    <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Users className="w-5 h-5 mr-2" />
                      Enter Your Vault
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/create-document">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                      Start Creating
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/vault">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                      Explore Vault
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm">4.9/5 rating</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">2M+</span> ideas organized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Everything you need to
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                create & organize
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed for modern creators, entrepreneurs, and innovators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Loved by creators
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Join thousands of satisfied users who've transformed their creative workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to unlock your
            <span className="block">creative potential?</span>
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are already using Creative Vault to organize their ideas and bring their visions to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/create-document">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  Create Your First Document
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
            <Link to="/vault">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10">
                Explore Examples
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-purple-100">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernLandingPage;
