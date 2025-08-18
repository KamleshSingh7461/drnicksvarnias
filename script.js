// Mobile Navigation Toggle - Enhanced for all pages
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Navigation elements found:', { navToggle, navMenu, navLinks: navLinks.length });

    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            console.log('Nav toggle clicked, current state:', navMenu.classList.contains('active'));
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Form Handling (guarded across pages)
document.addEventListener('DOMContentLoaded', function() {
	const legacyFormEl = document.getElementById('appointment-form');
	const appointmentFormEl = document.getElementById('appointmentForm');
	const formEl = appointmentFormEl || legacyFormEl;

	if (!formEl) return;

	formEl.addEventListener('submit', function(e) {
		e.preventDefault();

		const form = e.currentTarget;
		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn ? submitBtn.innerHTML : '';

		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
		}

		setTimeout(() => {
			showNotification('Thank you! We\'ll get back to you within 48 hours of our next business day.', 'success');
			form.reset();
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.innerHTML = originalText;
			}
		}, 2000);
	});
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(style);

// Premium Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add premium animation classes
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('service-category')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('category-title')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('footer')) {
                entry.target.classList.add('animate');
            }
            
            // Add staggered animations for service cards
            if (entry.target.classList.contains('service-card')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.15;
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
            
            // Add morphing effect for team members
            if (entry.target.classList.contains('team-member')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.2;
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.style.animation = 'scaleIn 0.8s ease forwards';
            }
            
            // Add premium FAQ animations
            if (entry.target.classList.contains('faq-item')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .faq-item, .section-title, .service-category, .category-title, .footer');
    
    animatedElements.forEach(el => {
        if (el.classList.contains('section-title') || el.classList.contains('service-category') || el.classList.contains('category-title') || el.classList.contains('footer')) {
            el.style.opacity = '1';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
});

// Phone Number Click to Call Enhancement
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Email Link Enhancement
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Facebook Link Enhancement
document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Team Member Hover Effects
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// FAQ Item Hover Effects
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.boxShadow = 'none';
    });
});

// Premium Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // If image is already loaded, just animate it
                if (img.complete && img.naturalHeight !== 0) {
                    img.classList.add('loaded');
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    imageObserver.unobserve(img);
                    return;
                }
                
                // Load image if it has data-src (for lazy loading)
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // Add loaded class for animation
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                });
                
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all images that need loading
    document.querySelectorAll('img').forEach(img => {
        if (!img.classList.contains('loaded')) {
            imageObserver.observe(img);
        }
    });
}

// Premium Image Preloading for Critical Images
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        'images/Dr.Nicholas J. Svarnias.avif',
        'https://images.unsplash.com/photo-1559591935-c6d92aebd54b?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf6b41b3c?w=400&h=250&fit=crop&crop=center&auto=format&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', preloadCriticalImages);

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    button.addEventListener('mouseenter', () => {
        button.style.background = '#2980b9';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#3498db';
        button.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Enhanced Performance Optimization and Dynamic Features
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll effects
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    // Header background change with enhanced effects
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = scrollY * 0.5;
        hero.style.transform = `translateY(${scrolled}px)`;
    }
    
    // Dynamic service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.8) {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animationPlayState = 'running';
        }
    });
    
    // Dynamic team member animations
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        const memberTop = member.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (memberTop < windowHeight * 0.8) {
            member.style.animationDelay = `${index * 0.2}s`;
            member.style.animationPlayState = 'running';
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced FAQ interactions
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(52, 152, 219, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Animate content
            const content = this.querySelector('p, ul');
            if (content) {
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0.7';
                }
            }
        });
    });
});

// Enhanced service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add floating particles effect
            this.style.setProperty('--particle-count', '5');
            
            // Enhance icon animation
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--particle-count', '0');
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'none';
            }
        });
    });
});

// Enhanced contact form interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            
            // Add floating label effect
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.transform = 'translateY(-20px) scale(0.8)';
                label.style.color = '#3498db';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
                
                const label = this.parentElement.querySelector('label');
                if (label) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#666';
                }
            }
        });
    });
});

// Enhanced navigation interactions
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add magnetic effect
            this.style.transform = 'scale(1.1)';
            
            // Add glow effect
            this.style.textShadow = '0 0 10px rgba(52, 152, 219, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    });
});

// Enhanced scroll to top button
function createEnhancedScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top enhanced';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.8rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(button);
    
    // Enhanced show/hide logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'scale(1) rotate(0deg)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'scale(0.8) rotate(180deg)';
        }
    });
    
    // Enhanced click functionality
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.9)';
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Enhanced hover effects
    button.addEventListener('mouseenter', () => {
        button.style.background = 'linear-gradient(135deg, #2980b9, #1f5f8b)';
        button.style.transform = 'scale(1.1) rotate(5deg)';
        button.style.boxShadow = '0 15px 40px rgba(52, 152, 219, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        button.style.transform = 'scale(1) rotate(0deg)';
        button.style.boxShadow = '0 10px 30px rgba(52, 152, 219, 0.3)';
    });
}

// Initialize enhanced scroll to top button
document.addEventListener('DOMContentLoaded', createEnhancedScrollToTopButton);

// Premium Image Loading and Effects
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            return; // Skip placeholder for already loaded images
        }
        
        // Add loading placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 0.875rem;
            font-weight: 500;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            border: 2px dashed #cbd5e1;
            z-index: 1;
        `;
        placeholder.textContent = 'Loading...';
        
        if (img.parentElement) {
            img.parentElement.style.position = 'relative';
            img.parentElement.appendChild(placeholder);
        }
        
        // Handle image load
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            if (placeholder.parentElement) {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 300);
            }
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            this.style.display = 'none';
            if (placeholder.parentElement) {
                placeholder.textContent = 'Image unavailable';
                placeholder.style.borderColor = '#ef4444';
                placeholder.style.color = '#ef4444';
            }
        });
        
        // Set initial state for images
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', handleImageLoading);

// Add CSS animations for enhanced effects
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .faq-item.active p,
    .faq-item.active ul {
        max-height: 1000px !important;
        opacity: 1 !important;
        transition: all 0.4s ease;
    }
    
    .faq-item p,
    .faq-item ul {
        max-height: 0;
        opacity: 0.7;
        overflow: hidden;
        transition: all 0.4s ease;
    }
    
    .form-group.focused label {
        transform: translateY(-20px) scale(0.8);
        color: #3498db;
    }
    
    .scroll-to-top.enhanced {
        animation: float 3s ease-in-out infinite;
    }
    
    .scroll-to-top.enhanced:hover {
        animation: pulse 1s ease-in-out infinite;
    }
`;
document.head.appendChild(enhancedStyles);
