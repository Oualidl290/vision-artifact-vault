
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogIn, UserPlus, Eye, EyeOff, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/vault');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: "Account exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive",
            });
            setIsSignUp(false);
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account before signing in.",
          });
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFullName('');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid credentials",
              description: "Please check your email and password and try again.",
              variant: "destructive",
            });
          } else if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email not verified",
              description: "Please check your email and click the verification link before signing in.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate('/vault');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 rounded-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Creative Vault
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto animate-fade-in">
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/20 dark:border-slate-800/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {isSignUp ? 'Join Creative Vault' : 'Welcome Back'}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
                {isSignUp 
                  ? 'Create your account to start building your knowledge vault' 
                  : 'Sign in to access your personal vault'
                }
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required={isSignUp}
                      className="h-12 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-12 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                      className="h-12 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required={isSignUp}
                      minLength={6}
                      className="h-12 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900 transition-all duration-300"
                    />
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSignUp ? (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </Button>
                
                <div className="text-center pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setEmail('');
                      setPassword('');
                      setConfirmPassword('');
                      setFullName('');
                    }}
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-300"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
