import React from 'react';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  
  const [formError, setFormError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    if (!email.trim() || !password.trim()) {
      setFormError('Both email and password are required.');
      return;
    }
    
    setLoading(true);
    try {
      await onLogin(email, password);
      // Reset form on successful login
      setFormData({ email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Stripe Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-slate-800">Stripe</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-slate-800 mb-2">
              Sign in to your account
            </h1>
            <p className="text-slate-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-slate-400"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-slate-400"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Error Messages */}
            {(formError || error) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{formError || error}</p>
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;