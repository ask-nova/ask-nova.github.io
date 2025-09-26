// Ask-Nova Website JavaScript
// Interactive functionality for navigation, forms, and user experience enhancements

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeForms();
    initializeAnimations();
    initializeAnalytics();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'white';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .timeline-item, .team-member, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('.hero, .solution-hero, .integration-hero, .pricing-hero, .about-hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        heroSections.forEach(hero => {
            if (hero) {
                const rate = scrolled * -0.3;
                hero.style.backgroundPosition = `center ${rate}px`;
            }
        });
    });
}

// Form handling
function initializeForms() {
    // Contact forms
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
    
    // Real-time form validation
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formType = determineFormType(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare email data
    const emailData = prepareEmailData(formData, formType);
    
    // Send email using Azure Logic App
    sendFormEmail(emailData)
        .then(() => {
            showNotification('Thank you! We will get back to you within 24 hours.', 'success');
            form.reset();
            
            // Track successful submission
            trackEvent('form_submission', {
                form_type: formType,
                page: window.location.pathname,
                status: 'success'
            });
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            showNotification('Sorry, there was an error sending your request. Please try again or contact us directly.', 'error');
            
            // Track failed submission
            trackEvent('form_submission', {
                form_type: formType,
                page: window.location.pathname,
                status: 'error',
                error: error.message
            });
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

function determineFormType(form) {
    const formId = form.id;
    if (formId) {
        if (formId.includes('pharma')) return 'pharma_reps';
        if (formId.includes('msl')) return 'msl';
        if (formId.includes('medDevice')) return 'med_devices';
        if (formId.includes('kam')) return 'kam';
        if (formId.includes('consumerHealth')) return 'consumer_health';
        if (formId.includes('animalHealth')) return 'animal_health';
    }
    
    // Check if form is inside a contact section
    if (form.closest('#contact')) return 'contact';
    
    // Check for specific form elements
    if (form.querySelector('#roiCalculator')) return 'roi_calculator';
    
    // Homepage form has firstName/lastName fields and role field
    if (form.querySelector('#firstName') && form.querySelector('#lastName') && form.querySelector('#role')) {
        return 'contact';
    }
    
    return 'general';
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#e2e8f0';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animations and UI enhancements
function initializeAnimations() {
    // Counter animations for statistics
    const statNumbers = document.querySelectorAll('.stat-item h3');
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .integration-card, .pricing-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const formattedNumber = formatNumber(Math.floor(current));
        const suffix = element.textContent.replace(/[\d,\s]/g, '');
        element.textContent = formattedNumber + suffix;
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
}

// Email sending functionality
function prepareEmailData(formData, formType) {
    const data = {
        form_type: formType,
        page_url: window.location.href,
        page_title: document.title,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        to_email: ['ludovic.petit@exeevo.com', 'paven.rai@exeevo.com'].join(', ')
    };
    
    // Extract form fields
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Map form-specific fields to common email template fields
    if (formType === 'pharma_reps') {
        // Pharma reps form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for pharma reps
        if (!data.role) {
            data.role = 'Pharmaceutical Sales Representative';
        }
    } else if (formType === 'msl') {
        // MSL form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for MSL
        if (!data.role) {
            data.role = 'Medical Science Liaison';
        }
    } else if (formType === 'kam') {
        // KAM form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for KAM
        if (!data.role) {
            data.role = 'Key Account Manager';
        }
    } else if (formType === 'med_devices') {
        // Medical devices form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for medical devices
        if (!data.role) {
            data.role = 'Medical Device Representative';
        }
    } else if (formType === 'consumer_health') {
        // Consumer health form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for consumer health
        if (!data.role) {
            data.role = 'Consumer Health Representative';
        }
    } else if (formType === 'animal_health') {
        // Animal health form uses 'name' instead of 'firstName'/'lastName'
        if (data.name && !data.firstName) {
            const nameParts = data.name.split(' ');
            data.firstName = nameParts[0] || '';
            data.lastName = nameParts.slice(1).join(' ') || '';
        }
        // Map 'challenges' to 'interest' for email template
        if (data.challenges && !data.interest) {
            data.interest = data.challenges;
        }
        // Add role for animal health
        if (!data.role) {
            data.role = 'Animal Health Representative';
        }
    }
    
    return data;
}

// CENTRALIZED EMAIL CONFIGURATION
const EMAIL_CONFIG = {
    AZURE_ENDPOINT: 'https://prod-00.northcentralus.logic.azure.com:443/workflows/3d664181d2b548df9e1795e0136e2310/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=1Cy8mliRVbaGOoE3c1DK0PEv3bOYKtHrXnq5lM73NoY',
    RECIPIENTS: {
        primary: 'ludovic.petit@exeevo.com'
    }
};

function sendFormEmail(emailData) {
    // Send email using Azure Logic App
    console.log('Sending email data to Azure:', emailData);
    
    return fetch(EMAIL_CONFIG.AZURE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        console.log('Azure response status:', response.status);
        if (response.ok) {
            return response.json().then(data => {
                console.log('Azure response data:', data);
                return { status: 200, text: 'Email sent successfully' };
            });
        } else {
            return response.text().then(text => {
                console.error('Azure error response:', text);
                throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
        }
    })
    .catch(error => {
        console.error('Azure Logic App failed, using fallback:', error);
        // Fallback to mailto if Azure fails
        return sendEmailFallback(emailData);
    });
}

function sendEmailFallback(emailData) {
    // Fallback method using mailto (opens user's email client)
    return new Promise((resolve, reject) => {
        try {
            const subject = `Nova Demo Request - ${emailData.form_type.toUpperCase()} - ${emailData.firstName || 'New Lead'}`;
            const body = formatEmailBody(emailData);
            const mailtoLink = `mailto:${EMAIL_CONFIG.RECIPIENTS.primary}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Simulate success after a short delay
            setTimeout(() => {
                resolve({ status: 200, text: 'Email client opened' });
            }, 1000);
        } catch (error) {
            reject(error);
        }
    });
}

function formatEmailBody(data) {
    const formTypeNames = {
        'pharma_reps': 'Pharmaceutical Representatives',
        'msl': 'Medical Science Liaison',
        'med_devices': 'Medical Devices',
        'kam': 'Key Account Management',
        'consumer_health': 'Consumer Health',
        'animal_health': 'Animal Health',
        'contact': 'General Contact',
        'demo_request': 'Demo Request'
    };
    
    // Build form-specific information
    let formSpecificInfo = '';
    if (data.customerType) formSpecificInfo += `- Customer Type: ${data.customerType}\n`;
    if (data.pharmacyType) formSpecificInfo += `- Pharmacy Type: ${data.pharmacyType}\n`;
    if (data.accountType) formSpecificInfo += `- Account Type: ${data.accountType}\n`;
    if (data.deviceCategory) formSpecificInfo += `- Device Category: ${data.deviceCategory}\n`;
    if (data.therapeuticArea) formSpecificInfo += `- Therapeutic Area: ${data.therapeuticArea}\n`;
    if (data.territory) formSpecificInfo += `- Territory: ${data.territory}\n`;
    
    return `
New Nova Demo Request - ${formTypeNames[data.form_type] || data.form_type}

Contact Information:
- Name: ${data.firstName || data.name || ''} ${data.lastName || ''}
- Email: ${data.email || 'Not provided'}
- Company: ${data.company || 'Not provided'}
- Role: ${data.role || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}

${formSpecificInfo ? 'Form-Specific Information:\n' + formSpecificInfo : ''}
Message/Interest/Challenges:
${data.interest || data.message || data.challenges || 'No additional message provided'}

Request Details:
- Form Type: ${formTypeNames[data.form_type] || data.form_type}
- Page: ${data.page_title}
- URL: ${data.page_url}
- Timestamp: ${data.timestamp}
- User Agent: ${data.user_agent}

Please follow up with this lead within 24 hours.
`;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                font-size: 1.2rem;
            ">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
}

// Analytics and tracking
function initializeAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackEvent('scroll_depth', {
                    depth: maxScroll,
                    page: window.location.pathname
                });
            }
        }
    });
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-accent');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                text: this.textContent.trim(),
                page: window.location.pathname,
                position: getElementPosition(this)
            });
        });
    });
}

function trackEvent(eventName, parameters = {}) {
    // Replace with actual analytics implementation (Google Analytics, Mixpanel, etc.)
    console.log('Analytics Event:', eventName, parameters);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Example: Custom analytics endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventName, ...parameters })
    // });
}

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top,
        section: getElementSection(element)
    };
}

function getElementSection(element) {
    const sections = ['hero', 'features', 'solutions', 'pricing', 'about', 'contact'];
    for (let section of sections) {
        if (element.closest(`.${section}`) || element.closest(`#${section}`)) {
            return section;
        }
    }
    return 'unknown';
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical pages
    const criticalLinks = document.querySelectorAll('a[href$=".html"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const linkEl = document.createElement('link');
            linkEl.rel = 'prefetch';
            linkEl.href = this.href;
            document.head.appendChild(linkEl);
        });
    });
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Skip navigation for keyboard users
    if (e.key === 'Tab' && e.shiftKey) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.focus();
        }
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.focus();
            }
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        page: window.location.pathname
    });
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeScrollEffects,
        initializeForms,
        validateField,
        isValidEmail,
        trackEvent
    };
} 