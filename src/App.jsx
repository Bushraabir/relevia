import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Core Components
import Navbar from './components/Navbar';
import QuickHelpButton from './components/QuickHelpButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Coping = lazy(() => import('./pages/Coping'));
const Medication = lazy(() => import('./pages/Medication'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load coping technique components
const Breathing = lazy(() => import('./components/CopingTechniques/Breathing'));
const Mindfulness = lazy(() => import('./components/CopingTechniques/Mindfulness'));
const Relaxation = lazy(() => import('./components/CopingTechniques/Relaxation'));
const Visualisation = lazy(() => import('./components/CopingTechniques/Visualization'));
const Affirmations = lazy(() => import('./components/CopingTechniques/Affirmations'));
const Activity = lazy(() => import('./components/CopingTechniques/Activity'));
const Journaling = lazy(() => import('./components/CopingTechniques/Journaling'));

/**
 * Main App component that provides routing and global layout structure
 * for a mental health and wellness application.
 * 
 * Features:
 * - React Router for client-side navigation
 * - Lazy loading for improved performance
 * - SEO optimization with react-helmet-async
 * - Analytics integration with Vercel
 * - Error boundary for graceful error handling
 * - Loading states for better UX
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Global SEO Configuration */}
        <Helmet>
          <html lang="en" />
          <title>Mental Health & Wellness - Your Journey to Better Mental Health</title>
          <meta 
            name="description" 
            content="Discover effective coping techniques, medication information, and resources for mental health support. Your comprehensive guide to mental wellness and recovery." 
          />
          <meta name="keywords" content="mental health, coping techniques, mindfulness, anxiety relief, depression support, wellness, meditation, breathing exercises" />
          <meta name="author" content="Mental Health & Wellness Team" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Open Graph / Social Media Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Mental Health & Wellness - Your Journey to Better Mental Health" />
          <meta property="og:description" content="Discover effective coping techniques, medication information, and resources for mental health support." />
          <meta property="og:site_name" content="Mental Health & Wellness" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Mental Health & Wellness" />
          <meta name="twitter:description" content="Your comprehensive guide to mental wellness and recovery." />
          
          {/* Additional SEO Meta Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#4F46E5" />
          <link rel="canonical" href="https://your-domain.com" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://vitals.vercel-insights.com" />
          
          {/* JSON-LD Structured Data for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mental Health & Wellness",
              "description": "Comprehensive mental health resources and coping techniques",
              "url": "https://your-domain.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://your-domain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Mental Health & Wellness"
              }
            })}
          </script>
        </Helmet>

        <ErrorBoundary>
          {/* Navigation Component */}
          <Navbar />
          
          {/* Main Content Area with Suspense for Lazy Loading */}
          <main role="main">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Primary Pages */}
                <Route 
                  path="/" 
                  element={<Home />}
                />
                <Route 
                  path="/about" 
                  element={<About />}
                />
                <Route 
                  path="/coping" 
                  element={<Coping />}
                />
                <Route 
                  path="/medication" 
                  element={<Medication />}
                />
                <Route 
                  path="/contact" 
                  element={<Contact />}
                />

                {/* Coping Techniques Sub-routes */}
                <Route 
                  path="/coping/mindfulness" 
                  element={<Mindfulness />}
                />
                <Route 
                  path="/coping/breathing" 
                  element={<Breathing />}
                />
                <Route 
                  path="/coping/relaxation" 
                  element={<Relaxation />}
                />
                <Route 
                  path="/coping/visualization" 
                  element={<Visualisation />}
                />
                <Route 
                  path="/coping/affirmations" 
                  element={<Affirmations />}
                />
                <Route 
                  path="/coping/activity" 
                  element={<Activity />}
                />
                <Route 
                  path="/coping/journaling" 
                  element={<Journaling />}
                />

                {/* 404 Route - Should be last */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                        <a 
                          href="/" 
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Return Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          {/* Analytics Integration */}
          <Analytics />
          
          {/* Quick Help Button - Always accessible */}
          <QuickHelpButton />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;