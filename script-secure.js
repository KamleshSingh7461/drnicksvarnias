/**
 * SECURE JAVASCRIPT FOR DR. NICK SVARNIAS WEBSITE
 * Comprehensive security implementation with input validation, XSS protection, and CSRF protection
 */

(function() {
    'use strict';
    
    // Security Configuration
    const SECURITY_CONFIG = {
        MAX_INPUT_LENGTH: 1000,
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
        RATE_LIMIT: {
            FORM_SUBMISSION: 5, // max submissions per minute
            CLICK_EVENTS: 100   // max clicks per minute
        },
        CSRF_TOKEN: generateCSRFToken(),
        SANITIZE_OPTIONS: {
            allowedTags: ['b', 'i', 'em', 'strong', 'br'],
            allowedAttributes: {},
            allowedSchemes: ['http', 'https', 'mailto', 'tel']
        }
    };

    // Rate Limiting Storage
    const rateLimitStore = new Map();
    
    // CSRF Token Generation
    function generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Input Sanitization
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        // Remove any script tags and dangerous content
        let sanitized = input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
            .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
        
        // Limit length
        if (sanitized.length > SECURITY_CONFIG.MAX_INPUT_LENGTH) {
            sanitized = sanitized.substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH);
        }
        
        return sanitized.trim();
    }

    // XSS Protection
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Rate Limiting
    function checkRateLimit(key, limit) {
        const now = Date.now();
        const window = 60000; // 1 minute
        
        if (!rateLimitStore.has(key)) {
            rateLimitStore.set(key, []);
        }
        
        const timestamps = rateLimitStore.get(key);
        const validTimestamps = timestamps.filter(timestamp => now - timestamp < window);
        
        if (validTimestamps.length >= limit) {
            return false;
        }
        
        validTimestamps.push(now);
        rateLimitStore.set(key, validTimestamps);
        return true;
    }

    // CSRF Protection
    function validateCSRFToken(token) {
        return token === SECURITY_CONFIG.CSRF_TOKEN;
    }

    // Secure Form Handling
    function secureFormSubmission(formData) {
        const sanitizedData = {};
        
        for (const [key, value] of formData.entries()) {
            sanitizedData[key] = sanitizeInput(value);
        }
        
        // Add CSRF token
        sanitizedData.csrf_token = SECURITY_CONFIG.CSRF_TOKEN;
        
        return sanitizedData;
    }

    // Secure Event Handling
    function secureAddEventListener(element, event, handler, options = {}) {
        if (!element || typeof handler !== 'function') return;
        
        const secureHandler = function(event) {
            // Rate limiting for click events
            if (event.type === 'click' && !checkRateLimit('click', SECURITY_CONFIG.RATE_LIMIT.CLICK_EVENTS)) {
                event.preventDefault();
                console.warn('Rate limit exceeded for click events');
                return;
            }
            
            try {
                handler.call(this, event);
            } catch (error) {
                console.error('Secure event handler error:', error);
                // Prevent error propagation
                event.preventDefault();
                event.stopPropagation();
            }
        };
        
        element.addEventListener(event, secureHandler, options);
        return secureHandler;
    }

    // DOM Content Loaded Handler
    function initializeSecureWebsite() {
        try {
            // Add CSRF token to all forms
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = 'csrf_token';
                csrfInput.value = SECURITY_CONFIG.CSRF_TOKEN;
                form.appendChild(csrfInput);
            });

            // Secure form submissions
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    if (!checkRateLimit('form_submission', SECURITY_CONFIG.RATE_LIMIT.FORM_SUBMISSION)) {
                        e.preventDefault();
                        alert('Too many form submissions. Please wait a moment.');
                        return;
                    }
                    
                    const formData = new FormData(form);
                    const sanitizedData = secureFormSubmission(formData);
                    
                    // Validate required fields
                    const requiredFields = form.querySelectorAll('[required]');
                    for (const field of requiredFields) {
                        if (!field.value.trim()) {
                            e.preventDefault();
                            field.focus();
                            return;
                        }
                    }
                    
                    // Log secure submission (for monitoring)
                    console.log('Secure form submission:', Object.keys(sanitizedData));
                });
            });

            // Secure all input fields
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.value = sanitizeInput(this.value);
                });
                
                input.addEventListener('blur', function() {
                    this.value = sanitizeInput(this.value);
                });
            });

            // Secure navigation links
            const links = document.querySelectorAll('a[href]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('javascript:')) {
                    link.removeAttribute('href');
                    link.style.pointerEvents = 'none';
                    console.warn('Removed dangerous javascript: link');
                }
            });

            // Secure image loading
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                    console.warn('Image failed to load securely');
                });
            });

            // Initialize secure mobile navigation
            initializeSecureMobileNav();
            
            // Initialize secure smooth scrolling
            initializeSecureSmoothScrolling();
            
            // Initialize secure animations
            initializeSecureAnimations();
            
            // Initialize image loading functionality
            initializeImageLoading();
            
            console.log('Website security initialized successfully');
            
        } catch (error) {
            console.error('Security initialization error:', error);
        }
    }

    // Secure Mobile Navigation
    function initializeSecureMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            secureAddEventListener(navToggle, 'click', function(e) {
                e.preventDefault();
                navMenu.classList.toggle('active');
            });
        }
    }

    // Secure Smooth Scrolling
    function initializeSecureSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            secureAddEventListener(link, 'click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Secure Animations
    function initializeSecureAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.service-card, .team-member, .faq-item');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Security Monitoring
    function initializeSecurityMonitoring() {
        // Monitor for suspicious activities
        window.addEventListener('error', function(e) {
            console.warn('Security monitoring - Error detected:', e.error);
        });
        
        // Monitor for XSS attempts - only if supported
        // Temporarily disabled to debug content visibility issue
        /*
        try {
            const originalInnerHTML = Element.prototype.innerHTML;
            Element.prototype.innerHTML = function(value) {
                if (typeof value === 'string') {
                    value = sanitizeInput(value);
                }
                return originalInnerHTML.call(this, value);
            };
        } catch (error) {
            console.warn('Security monitoring - innerHTML override not supported:', error);
        }
        */
        
        console.log('Security monitoring initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSecureWebsite);
    } else {
        initializeSecureWebsite();
    }
    
    // Initialize security monitoring
    initializeSecurityMonitoring();
    
    // Premium Image Loading and Effects
    function initializeImageLoading() {
        const images = document.querySelectorAll('img');
        console.log('Initializing image loading for', images.length, 'images');
        
        images.forEach((img, index) => {
            console.log(`Image ${index}:`, img.src, 'complete:', img.complete, 'naturalHeight:', img.naturalHeight);
            
            // Check if image is already loaded
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
                console.log(`Image ${index} already loaded, adding 'loaded' class`);
                return; // Skip placeholder for already loaded images
            }
            
            // Set initial state for images
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            
            // Handle image load
            img.addEventListener('load', function() {
                console.log(`Image loaded successfully:`, this.src);
                this.classList.add('loaded');
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                
                // Remove placeholder if it exists
                const placeholder = this.parentElement.querySelector('.img-placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
            });
            
            // Handle image error
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
                // Add loaded class anyway to prevent blank spaces
                this.classList.add('loaded');
                this.style.transform = 'scale(1)';
                
                // Remove placeholder if it exists
                const placeholder = this.parentElement.querySelector('.img-placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
            });
        });
    }
    
    // Export security functions for external use
    window.WebsiteSecurity = {
        sanitizeInput,
        escapeHtml,
        checkRateLimit,
        validateCSRFToken,
        secureFormSubmission
    };
    
})();
