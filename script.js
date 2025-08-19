// Modern JavaScript for Ultra-Modern Dental Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                nav.classList.remove('show');
                mobileNavToggle.classList.remove('active');
            }
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                nav.classList.remove('show');
                mobileNavToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav after clicking
                if (nav) {
                    nav.classList.remove('show');
                    if (mobileNavToggle) {
                        mobileNavToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Header Background on Scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
        
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize slider
    if (testimonialCards.length > 0) {
        showSlide(0);
        
        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Dot navigation
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Form Handling with Loading States
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Submit';
            
            // Add loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = 'Sent Successfully!';
                    submitBtn.style.background = 'var(--success)';
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }
                    }, 2000);
                }
            }, 2000);
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.btn');
            
            if (emailInput && submitBtn) {
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    // Add loading state
                    submitBtn.classList.add('loading');
                    submitBtn.textContent = 'Subscribing...';
                    submitBtn.disabled = true;
                    
                    // Simulate subscription (replace with actual API call)
                    setTimeout(() => {
                        submitBtn.classList.remove('loading');
                        submitBtn.textContent = 'Subscribed!';
                        submitBtn.style.background = 'var(--success)';
                        
                        // Reset form
                        setTimeout(() => {
                            newsletterForm.reset();
                            submitBtn.textContent = 'Subscribe';
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1500);
                } else {
                    showNotification('Please enter a valid email address', 'error');
                }
            }
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background based on type
        switch (type) {
            case 'success':
                notification.style.background = 'var(--success)';
                break;
            case 'error':
                notification.style.background = 'var(--danger)';
                break;
            default:
                notification.style.background = 'var(--primary)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .testimonial-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Modern Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.setProperty('--scroll-width', scrollPercent + '%');
        });
    }
    
    // Floating Action Button
    const floatingAction = document.querySelector('.floating-action');
    if (floatingAction) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                floatingAction.classList.add('show');
            } else {
                floatingAction.classList.remove('show');
            }
        });
    }
    
    // Scroll to Top Function
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Enhanced Touch Support for Mobile
    if ('ontouchstart' in window) {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn, .nav-link, .service-card, .team-member');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    // Update scroll indicator
                    if (scrollIndicator) {
                        const scrollTop = window.pageYOffset;
                        const docHeight = document.body.scrollHeight - window.innerHeight;
                        const scrollPercent = (scrollTop / docHeight) * 100;
                        scrollIndicator.style.setProperty('--scroll-width', scrollPercent + '%');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Performance Monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
    
    // Accessibility Improvements
    // Add keyboard navigation for FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Update aria-expanded when FAQ items are toggled
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isActive = item.classList.contains('active');
                        question.setAttribute('aria-expanded', isActive.toString());
                    }
                });
            });
            
            observer.observe(item, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });
    
    // Focus Management for Mobile Navigation
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', function() {
            if (nav.classList.contains('show')) {
                // Focus first nav link when opening
                const firstNavLink = nav.querySelector('.nav-link');
                if (firstNavLink) {
                    setTimeout(() => firstNavLink.focus(), 100);
                }
            }
        });
    }
    
    // Prevent body scroll when mobile nav is open
    if (nav) {
        const originalOverflow = document.body.style.overflow;
        
        nav.addEventListener('transitionend', function() {
            if (nav.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = originalOverflow;
            }
        });
    }
    
    // Enhanced Image Loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
    
    // Lazy Loading for Images (if Intersection Observer is supported)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Smooth Scrolling for all internal links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Initialize the page
    console.log('Ultra-Modern Dental Website loaded successfully!');
});
