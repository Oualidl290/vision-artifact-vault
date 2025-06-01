
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-3xl">?</span>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to exploring the Creative Vault.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center space-x-2 px-6 py-3">
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-600">
          <p>Lost? Check out these popular sections:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/vault" className="hover:text-purple-600 dark:hover:text-purple-400">
              Vault
            </Link>
            <span>•</span>
            <Link to="/auth" className="hover:text-purple-600 dark:hover:text-purple-400">
              Sign In
            </Link>
            <span>•</span>
            <Link to="/create-document" className="hover:text-purple-600 dark:hover:text-purple-400">
              Create Document
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
