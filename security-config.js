/**
 * SECURITY CONFIGURATION FILE
 * Centralized security settings for Dr. Nick Svarnias website
 */

const SecurityConfig = {
    // Content Security Policy
    CSP: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        'img-src': ["'self'", "data:", "https:", "blob:", "*"],
        'connect-src': ["'self'", "https:", "*"],
        'frame-src': ["'self'", "https:", "*"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'upgrade-insecure-requests': true
    },

    // Security Headers
    Headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    },

    // Input Validation
    Validation: {
        MAX_INPUT_LENGTH: 1000,
        ALLOWED_HTML_TAGS: ['b', 'i', 'em', 'strong', 'br'],
        ALLOWED_ATTRIBUTES: {},
        ALLOWED_SCHEMES: ['http', 'https', 'mailto', 'tel'],
        BLOCKED_PATTERNS: [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
            /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
            /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi
        ]
    },

    // Rate Limiting
    RateLimit: {
        FORM_SUBMISSION: 5,    // max submissions per minute
        CLICK_EVENTS: 100,     // max clicks per minute
        API_REQUESTS: 60,      // max API requests per minute
        LOGIN_ATTEMPTS: 3      // max login attempts per 15 minutes
    },

    // CSRF Protection
    CSRF: {
        TOKEN_LENGTH: 32,
        EXPIRY_TIME: 3600000,  // 1 hour in milliseconds
        REFRESH_INTERVAL: 1800000  // 30 minutes in milliseconds
    },

    // Session Security
    Session: {
        TIMEOUT: 1800000,      // 30 minutes
        REGENERATE_ID: true,
        SECURE_COOKIES: true,
        HTTP_ONLY_COOKIES: true,
        SAME_SITE: 'strict'
    },

    // File Upload Security
    FileUpload: {
        MAX_SIZE: 5242880,     // 5MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'],
        ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'],
        SCAN_VIRUSES: true,
        VALIDATE_CONTENT: true
    },

    // Monitoring and Logging
    Monitoring: {
        LOG_SECURITY_EVENTS: true,
        LOG_FAILED_ATTEMPTS: true,
        LOG_SUSPICIOUS_ACTIVITY: true,
        ALERT_ON_ATTACKS: true,
        RETAIN_LOGS_DAYS: 90
    },

    // Error Handling
    ErrorHandling: {
        SHOW_DETAILED_ERRORS: false,
        LOG_ERRORS: true,
        CUSTOM_ERROR_PAGES: true,
        SANITIZE_ERROR_MESSAGES: true
    },

    // HTTPS and SSL
    HTTPS: {
        FORCE_HTTPS: true,
        HSTS_ENABLED: true,
        HSTS_MAX_AGE: 31536000,
        HSTS_INCLUDE_SUBDOMAINS: true,
        HSTS_PRELOAD: true
    },

    // API Security
    API: {
        REQUIRE_AUTHENTICATION: true,
        RATE_LIMITING: true,
        INPUT_VALIDATION: true,
        OUTPUT_SANITIZATION: true,
        CORS_ENABLED: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityConfig;
} else {
    window.SecurityConfig = SecurityConfig;
}
