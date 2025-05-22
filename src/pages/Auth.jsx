
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const showSignUp = searchParams.get('sign-up') === 'true';
  
  // Check if we're in the Lovable preview environment or production
  const isLovablePreview = window.location.hostname.includes('lovable.app') || 
                         window.location.hostname.includes('localhost');
  const isProduction = window.location.hostname === 'svpathlab.com';
  
  // Check if Clerk key is available
  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    if (isProduction && hasClerkKey) {
      // Redirect to the Account Portal
      const portalUrl = showSignUp 
        ? 'https://accounts.svpathlab.com/sign-up'
        : 'https://accounts.svpathlab.com/sign-in';
      
      console.log(`Redirecting to Account Portal: ${portalUrl}`);
      window.location.href = portalUrl;
    } else if (isProduction && !hasClerkKey) {
      toast.error('Authentication is not configured. Please set up the environment variables.');
    }
  }, [isProduction, hasClerkKey, showSignUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {showSignUp ? 'Create an Account' : 'Welcome Back'}
            {isLovablePreview && ' (Demo)'}
          </h2>
          
          {isProduction ? (
            <div>
              {!hasClerkKey ? (
                // Production with no key - show error
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700 font-semibold">Authentication Not Configured</p>
                  <p className="mt-2 text-sm text-red-600">
                    The authentication service for svpathlab.com is not properly configured. 
                    The <code>VITE_CLERK_PUBLISHABLE_KEY</code> environment variable must be set in your
                    production environment settings.
                  </p>
                  <p className="mt-2 text-sm text-red-600">
                    Please refer to the deployment documentation for instructions on setting up authentication.
                  </p>
                </div>
              ) : (
                // Production with key - show redirect message
                <div className="text-center">
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700 font-semibold">Redirecting to Secure Login...</p>
                    <p className="mt-2 text-sm text-blue-600">
                      You'll be redirected to the secure authentication portal at accounts.svpathlab.com.
                      If you're not redirected automatically, please click the button below.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      window.location.href = showSignUp 
                        ? 'https://accounts.svpathlab.com/sign-up'
                        : 'https://accounts.svpathlab.com/sign-in';
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition"
                  >
                    Continue to {showSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                <Link 
                  to="/" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            // Demo mode for preview environments
            <div>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-semibold">Demo Mode Active</p>
                <p className="mt-2 text-sm text-blue-700">
                  You're viewing a demo version of the authentication page. 
                  In production, users will be redirected to the Account Portal at accounts.svpathlab.com.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full p-2 border rounded" placeholder="email@example.com" disabled />
                </div>
                <div className="form-group">
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full p-2 border rounded" placeholder="********" disabled />
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md opacity-50 cursor-not-allowed">
                  {showSignUp ? "Sign Up" : "Sign In"} (Demo)
                </button>
                <p className="text-center text-sm text-gray-500">
                  {showSignUp ? "Already have an account? " : "Don't have an account? "}
                  <Link 
                    to={showSignUp ? "/auth" : "/auth?sign-up=true"} 
                    className="text-blue-600 hover:underline"
                  >
                    {showSignUp ? "Sign in" : "Sign up"}
                  </Link>
                </p>
                
                <div className="pt-4 mt-2 border-t border-gray-200">
                  <Link 
                    to="/" 
                    className="w-full block text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
