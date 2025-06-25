import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from "./components/NavBar";
import HeroSection from "./components/Hero";
import InteractiveDemoSection from "./components/InteractiveDemo";
import FeaturesSection from "./components/Features";
import StatsSection from "./components/StatsSection";
import CompaniesSection from "./components/Companies";
import ProductsSection from "./components/Products";
import TestimonialsSection from "./components/Testimonials";
import Footer from "./components/Footer";
import Auth from './service/AuthContext';
import Dashboard from './components/DashBoard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(userData);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
        
        <Routes>
          {/* Public Routes - Marketing Pages */}
          <Route path="/" element={
            <>
              <HeroSection isAuthenticated={isAuthenticated} user={user} />
              <CompaniesSection />
              <StatsSection />
              <InteractiveDemoSection />
              <FeaturesSection />
              <ProductsSection />
              <TestimonialsSection />
            </>
          } />
          
          {/* Auth Routes */}
          <Route path="/auth/*" element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Auth onLogin={handleLogin} />
            )
          } />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;