
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, FileText } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Creative Vault
            </span>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="text-center max-w-lg mx-auto animate-fade-in">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <span className="text-white font-bold text-5xl">?</span>
          </div>
          
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            404
          </h1>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-12 leading-relaxed text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to exploring the Creative Vault.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/">
              <Button className="flex items-center space-x-2 px-8 py-4 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base font-medium">
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-8 py-4 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:scale-105 text-base font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </Button>
          </div>
          
          <div className="mt-16 text-sm text-slate-500 dark:text-slate-600">
            <p className="mb-4 font-medium">Lost? Check out these popular sections:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/vault" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-medium">
                Vault
              </Link>
              <span>•</span>
              <Link to="/auth" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-medium">
                Sign In
              </Link>
              <span>•</span>
              <Link to="/create-document" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-medium">
                Create Document
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
