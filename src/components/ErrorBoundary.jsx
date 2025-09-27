import React from 'react';
import { AlertTriangle, RefreshCw, Home, Heart, Phone } from 'lucide-react';

/**
 * Advanced Error Boundary Component for Mental Health Application
 * 
 * Features:
 * - Graceful error handling with calming UI
 * - Mental health-focused messaging
 * - Error logging and reporting
 * - Multiple recovery options
 * - Crisis support information
 * - Accessibility compliant
 * - Custom error types handling
 * - Development vs Production modes
 * 
 * @class ErrorBoundary
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      isRetrying: false,
      retryCount: 0,
      showDetails: false,
    };
  }

  /**
   * Static method to derive state from error
   * @param {Error} error - The caught error
   * @returns {Object} New state object
   */
  static getDerivedStateFromError(error) {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error: error,
      errorId: errorId,
    };
  }

  /**
   * Lifecycle method called when an error is caught
   * @param {Error} error - The caught error
   * @param {Object} errorInfo - Additional error information
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo: errorInfo,
    });

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught an Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // In production, you might want to send this to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  /**
   * Log error to external service (implement based on your needs)
   * @param {Error} error - The caught error
   * @param {Object} errorInfo - Additional error information
   */
  logErrorToService = (error, errorInfo) => {
    // Example: Send to error tracking service
    // In a real app, you might use services like:
    // - Sentry: Sentry.captureException(error, { extra: errorInfo });
    // - LogRocket: LogRocket.captureException(error);
    // - Custom API: fetch('/api/errors', { method: 'POST', body: JSON.stringify({...}) });
    
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      // Store locally for development/debugging
      localStorage.setItem(`error_${this.state.errorId}`, JSON.stringify(errorData));
      
      // TODO: Replace with your actual error reporting service
      console.log('Error logged:', errorData);
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  };

  /**
   * Attempt to retry/recover from the error
   */
  handleRetry = () => {
    this.setState({ isRetrying: true });

    // Simulate retry delay for better UX
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRetrying: false,
        retryCount: this.state.retryCount + 1,
        showDetails: false,
      });
    }, 1000);
  };

  /**
   * Navigate to home page
   */
  handleGoHome = () => {
    window.location.href = '/';
  };

  /**
   * Reload the page
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * Toggle error details visibility
   */
  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  /**
   * Get user-friendly error message based on error type
   */
  getErrorMessage = () => {
    const { error } = this.state;
    
    if (!error) return "Something unexpected happened.";

    // Handle specific error types with mental health-focused messaging
    if (error.name === 'ChunkLoadError') {
      return "We're having trouble loading some resources. This sometimes happens when we update the app.";
    }
    
    if (error.message?.includes('Network Error')) {
      return "It looks like there's a connection issue. Please check your internet connection.";
    }
    
    if (error.message?.includes('Loading chunk')) {
      return "We're having trouble loading part of the app. This usually resolves with a refresh.";
    }

    return "We encountered an unexpected issue, but don't worry - this happens sometimes.";
  };

  render() {
    const { hasError, isRetrying, retryCount, showDetails, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    // If no error, render children normally
    if (!hasError) {
      return children;
    }

    // If custom fallback is provided, use it
    if (fallback) {
      return fallback;
    }

    // Show retry loading state
    if (isRetrying) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-soft p-8 max-w-md w-full text-center">
            <div className="animate-spin w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-heading text-neutral-800 mb-2">
              Trying again...
            </h2>
            <p className="text-neutral-600 font-body">
              Please give us a moment to recover.
            </p>
          </div>
        </div>
      );
    }

    // Main error UI
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-soft max-w-2xl w-full p-8">
          {/* Error Icon and Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-accent-600" />
            </div>
            <h1 className="text-2xl font-heading text-neutral-800 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-600 font-body leading-relaxed">
              {this.getErrorMessage()}
            </p>
          </div>

          {/* Reassuring Message for Mental Health Context */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6 border-l-4 border-primary-400">
            <div className="flex items-start">
              <Heart className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-primary-800 font-body text-sm leading-relaxed">
                  <strong>You're safe and supported.</strong> Technical issues like this don't affect your progress or data. 
                  Take a deep breath - we'll get this sorted out quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={this.handleRetry}
              disabled={retryCount >= 3}
              className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 
                       transition-colors font-body font-medium flex items-center justify-center
                       disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {retryCount >= 3 ? 'Too many attempts' : 'Try Again'}
            </button>
            
            <button
              onClick={this.handleGoHome}
              className="flex-1 bg-white text-primary-600 px-6 py-3 rounded-lg border-2 border-primary-200 
                       hover:bg-primary-50 transition-colors font-body font-medium flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </button>
          </div>

          {/* Crisis Support Information */}
          <div className="bg-secondary-50 rounded-lg p-4 mb-6 border border-secondary-200">
            <h3 className="text-secondary-800 font-heading text-sm font-semibold mb-2">
              Need immediate support?
            </h3>
            <div className="text-secondary-700 font-body text-sm">
              <p className="mb-2">If you're experiencing a mental health crisis:</p>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>Crisis Hotline: <a href="tel:988" className="font-semibold hover:underline">988</a></span>
              </div>
            </div>
          </div>

          {/* Error Details Toggle (for development/debugging) */}
          {(process.env.NODE_ENV === 'development' || showDetails) && (
            <div className="border-t border-neutral-200 pt-6">
              <button
                onClick={this.toggleDetails}
                className="text-neutral-600 hover:text-neutral-800 font-body text-sm mb-4 underline"
              >
                {showDetails ? 'Hide' : 'Show'} technical details
              </button>
              
              {showDetails && (
                <div className="bg-neutral-50 rounded-lg p-4 font-mono text-xs">
                  <div className="mb-4">
                    <strong>Error:</strong>
                    <pre className="mt-1 text-red-600 whitespace-pre-wrap">
                      {error?.toString()}
                    </pre>
                  </div>
                  
                  {errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 text-neutral-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer with Error ID */}
          <div className="text-center pt-4 border-t border-neutral-100">
            <p className="text-neutral-400 font-body text-xs">
              Error ID: {this.state.errorId}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Higher-Order Component wrapper for functional components
 * @param {React.Component} Component - Component to wrap
 * @param {Object} errorBoundaryProps - Props to pass to ErrorBoundary
 * @returns {React.Component} Wrapped component
 */
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

/**
 * Hook for manually triggering error boundary (for testing)
 * @returns {Function} Function to trigger error
 */
export const useErrorHandler = () => {
  return (error) => {
    throw error;
  };
};

export default ErrorBoundary;