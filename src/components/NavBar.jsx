import React, { useState } from 'react';
import { ChevronDown, Menu, X, CreditCard, Globe, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = ({ isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = [
    {
      title: 'Products',
      items: [
        { name: 'Payments', desc: 'Online payments', icon: <CreditCard className="w-5 h-5" /> },
        { name: 'Billing', desc: 'Subscription management', icon: <TrendingUp className="w-5 h-5" /> },
        { name: 'Connect', desc: 'Payments for platforms', icon: <Users className="w-5 h-5" /> },
        { name: 'Atlas', desc: 'Startup toolkit', icon: <Globe className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Solutions',
      items: [
        { name: 'Startups', desc: 'Go to market faster', icon: <Zap className="w-5 h-5" /> },
        { name: 'Enterprises', desc: 'Scale globally', icon: <Shield className="w-5 h-5" /> },
        { name: 'SaaS', desc: 'Recurring revenue', icon: <TrendingUp className="w-5 h-5" /> },
        { name: 'Marketplaces', desc: 'Multi-party payments', icon: <Users className="w-5 h-5" /> },
      ]
    }
  ];

  const DropdownMenu = ({ items, isOpen }) => (
    <div className={`absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 transform origin-top ${
      isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
    }`}>
      <div className="p-6 space-y-1">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="text-blue-600 mt-1 group-hover:scale-110 transition-transform">{item.icon}</div>
            <div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</div>
              <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200/50 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              stripe
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-200 py-2 group"
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === index ? 'rotate-180' : ''
                  }`} />
                </button>
                <DropdownMenu 
                  items={item.items} 
                  isOpen={activeDropdown === index}
                />
              </div>
            ))}
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
              Developers
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
              Company
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
              Pricing
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <button 
                  onClick={onLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Sign in
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-gradient-to-r from-blue-300 to-blue-900 text-white px-6 py-2.5 rounded-full hover:from-blue-400 hover:to-blue-900 transition-all transform hover:scale-105 hover:shadow-lg font-medium"
                >
                  Start now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t transition-all duration-300 overflow-y-auto ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-6 space-y-6 max-w-sm mx-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          {navigationItems.map((item, index) => (
            <div key={index}>
              <div className="font-semibold text-gray-900 mb-3 text-lg">{item.title}</div>
              <div className="ml-4 space-y-3">
                {item.items.map((subItem, subIndex) => (
                  <div key={subIndex} className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                    <div className="text-blue-600">{subItem.icon}</div>
                    <div>
                      <div className="font-medium">{subItem.name}</div>
                      <div className="text-sm text-gray-500">{subItem.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-3">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Developers</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Company</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
            </div>
            <div className="mt-6 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-medium">{user?.name || user?.email}</div>
                    </div>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="block text-gray-700 hover:text-blue-600 font-medium">
                    Sign in
                  </Link>
                  <Link 
                    to="/auth" 
                    className="block w-full bg-gradient-to-r from-blue-300 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-400 hover:to-blue-900 transition-all font-medium text-center"
                  >
                    Start now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;