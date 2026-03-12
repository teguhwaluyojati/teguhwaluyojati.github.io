/**
 * Loading Animations Manager
 * Handles page load animations, scroll reveal, button loading states
 */

class LoadingAnimationsManager {
  constructor() {
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.revealElements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    // Hide loading overlay when page fully loads
    this.hideLoadingOverlay();
    
    // Initialize scroll reveal for elements
    this.initScrollReveal();
    
    // Handle button loading states
    this.setupButtonLoadingStates();
  }

  /**
   * Hide loading overlay with fade-out animation
   */
  hideLoadingOverlay() {
    // Wait for DOM to be ready and images to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.fadeOutLoader();
      });
    } else {
      // Already loaded
      setTimeout(() => {
        this.fadeOutLoader();
      }, 300);
    }
    
    // Force hide after 3 seconds even if images aren't loaded
    setTimeout(() => {
      if (this.loadingOverlay && !this.loadingOverlay.classList.contains('hidden')) {
        this.fadeOutLoader();
      }
    }, 3000);
  }

  /**
   * Fade out the loading overlay
   */
  fadeOutLoader() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => {
        if (this.loadingOverlay && this.loadingOverlay.parentNode) {
          this.loadingOverlay.parentNode.removeChild(this.loadingOverlay);
        }
      }, 600);
    }
  }

  /**
   * Initialize scroll reveal functionality
   */
  initScrollReveal() {
    // Find all elements with reveal classes
    const revealClasses = [
      '.reveal-on-scroll',
      '.slide-in-left',
      '.slide-in-right',
      '.scale-in',
      '.reveal-item',
      '.reveal-gallery-item'
    ];

    revealClasses.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (!this.revealElements.includes(element)) {
          this.revealElements.push(element);
        }
      });
    });

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback for older browsers
      this.setupScrollListener();
    }
  }

  /**
   * Setup Intersection Observer for scroll reveal
   */
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Fallback scroll listener for older browsers
   */
  setupScrollListener() {
    const checkReveal = () => {
      this.revealElements.forEach(element => {
        if (!element.classList.contains('visible')) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            element.classList.add('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    
    // Check on init
    checkReveal();
  }

  /**
   * Setup button loading states for form submission
   */
  setupButtonLoadingStates() {
    // Get all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          this.setButtonLoading(submitBtn, true);
        }
      });
    });
  }

  /**
   * Set button to loading state
   * @param {HTMLElement} button - The button element
   * @param {boolean} isLoading - Whether button is loading
   */
  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.classList.add('btn-loading');
      button.disabled = true;
      
      // Store original text if not already stored
      if (!button.dataset.originalText) {
        button.dataset.originalText = button.textContent.trim();
      }
      
      button.textContent = 'Sending...';
    } else {
      button.classList.remove('btn-loading');
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Send Message';
    }
  }

  /**
   * Manually add reveal class to element and observe
   * @param {HTMLElement} element - Element to reveal
   * @param {string} revealType - Type of reveal animation (default: 'reveal-on-scroll')
   */
  addRevealElement(element, revealType = 'reveal-on-scroll') {
    if (!element.classList.contains(revealType)) {
      element.classList.add(revealType);
    }
    
    if (!this.revealElements.includes(element)) {
      this.revealElements.push(element);
      
      // If observer is ready, observe immediately
      if (window.IntersectionObserver && !this.observer) {
        this.setupIntersectionObserver();
      }
    }
  }

  /**
   * Fade in element with animation
   * @param {HTMLElement} element - Element to fade in
   * @param {number} duration - Duration in ms (default: 600)
   */
  fadeInElement(element, duration = 600) {
    element.classList.add('fade-in');
    element.style.animationDuration = duration + 'ms';
  }

  /**
   * Fade out element with animation
   * @param {HTMLElement} element - Element to fade out
   * @param {number} duration - Duration in ms (default: 600)
   */
  fadeOutElement(element, duration = 600) {
    element.classList.add('fade-out');
    element.style.animationDuration = duration + 'ms';
    
    setTimeout(() => {
      element.style.display = 'none';
    }, duration);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.loadingAnimations = new LoadingAnimationsManager();
  });
} else {
  window.loadingAnimations = new LoadingAnimationsManager();
}

/**
 * Global utility functions for animations
 */

/**
 * Trigger scroll reveal on specific element
 */
function triggerScrollReveal(selector, revealType = 'reveal-on-scroll') {
  const element = document.querySelector(selector);
  if (element && window.loadingAnimations) {
    window.loadingAnimations.addRevealElement(element, revealType);
  }
}

/**
 * Set button loading state
 */
function setButtonLoad(buttonSelector, isLoading) {
  const button = document.querySelector(buttonSelector);
  if (button && window.loadingAnimations) {
    window.loadingAnimations.setButtonLoading(button, isLoading);
  }
}

/**
 * Fade in element
 */
function fadeIn(selector, duration = 600) {
  const element = document.querySelector(selector);
  if (element && window.loadingAnimations) {
    window.loadingAnimations.fadeInElement(element, duration);
  }
}

/**
 * Fade out element
 */
function fadeOut(selector, duration = 600) {
  const element = document.querySelector(selector);
  if (element && window.loadingAnimations) {
    window.loadingAnimations.fadeOutElement(element, duration);
  }
}
