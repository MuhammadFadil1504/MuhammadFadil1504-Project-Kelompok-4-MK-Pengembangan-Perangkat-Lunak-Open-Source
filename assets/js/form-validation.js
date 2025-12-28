// ==================== FORM-VALIDATION.JS ====================
// Contact Form Validation & Submission

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    // ==================== VALIDATION RULES ====================
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: {
                required: 'Name is required',
                minLength: 'Name must be at least 2 characters',
                maxLength: 'Name must not exceed 50 characters',
                pattern: 'Name can only contain letters and spaces'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: {
                required: 'Email is required',
                pattern: 'Please enter a valid email address'
            }
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]+$/,
            minLength: 10,
            message: {
                pattern: 'Please enter a valid phone number',
                minLength: 'Phone number must be at least 10 digits'
            }
        },
        subject: {
            required: true,
            minLength: 3,
            maxLength: 100,
            message: {
                required: 'Subject is required',
                minLength: 'Subject must be at least 3 characters',
                maxLength: 'Subject must not exceed 100 characters'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: {
                required: 'Message is required',
                minLength: 'Message must be at least 10 characters',
                maxLength: 'Message must not exceed 1000 characters'
            }
        }
    };

    // ==================== VALIDATION FUNCTIONS ====================

    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];

        if (!rules) return true;

        // Required validation
        if (rules.required && !fieldValue) {
            showError(field, rules.message.required);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!rules.required && !fieldValue) {
            clearError(field);
            return true;
        }

        // Min length validation
        if (rules.minLength && fieldValue.length < rules.minLength) {
            showError(field, rules.message.minLength);
            return false;
        }

        // Max length validation
        if (rules.maxLength && fieldValue.length > rules.maxLength) {
            showError(field, rules.message.maxLength);
            return false;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(fieldValue)) {
            showError(field, rules.message.pattern);
            return false;
        }

        clearError(field);
        return true;
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        // Add red border
        field.style.borderColor = 'var(--error-color)';
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
        }

        // Reset border
        field.style.borderColor = '';
    }

    function validateForm() {
        let isValid = true;
        const fields = contactForm.querySelectorAll('input[required], textarea[required], input[name], textarea[name]');

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ==================== REAL-TIME VALIDATION ====================

    const formFields = contactForm.querySelectorAll('input, textarea, select');

    formFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
        });

        // Clear error on focus
        field.addEventListener('focus', function() {
            clearError(this);
        });

        // Validate on input (with debounce for better performance)
        let timeout;
        field.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.value.trim() !== '') {
                    validateField(this);
                }
            }, 500);
        });
    });

    // ==================== FORM SUBMISSION ====================

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Hide previous messages
        if (formSuccess) formSuccess.style.display = 'none';
        if (formError) formError.style.display = 'none';

        // Validate form
        if (!validateForm()) {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Get submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable submit button and show loading
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.opacity = '0.6';

        try {
            // Simulate API call (replace with your actual API endpoint)
            const response = await simulateFormSubmission(data);

            if (response.success) {
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Reset form
                contactForm.reset();

                // Clear all errors
                formFields.forEach(field => clearError(field));

                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (formSuccess) formSuccess.style.display = 'none';
                }, 5000);

                // Log success (remove in production)
                console.log('✅ Form submitted successfully:', data);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            // Show error message
            if (formError) {
                formError.style.display = 'block';
                formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            console.error('❌ Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.opacity = '1';
        }
    });

    // ==================== SIMULATE API CALL ====================
    // Replace this with your actual form submission logic

    async function simulateFormSubmission(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate successful submission
        // In production, replace this with actual API call:
        /*
        const response = await fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
        */

        return {
            success: true,
            message: 'Form submitted successfully'
        };
    }

    // ==================== CHARACTER COUNTER ====================

    const textareas = contactForm.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = validationRules[textarea.name]?.maxLength;
        if (!maxLength) return;

        const formGroup = textarea.closest('.form-group');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 12px; color: var(--text-lighter); margin-top: 4px;';
        formGroup.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 0) {
                counter.style.color = 'var(--error-color)';
            } else if (remaining < 50) {
                counter.style.color = 'var(--warning-color)';
            } else {
                counter.style.color = 'var(--text-lighter)';
            }
        }

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });

    // ==================== PREVENT SPAM (Honeypot) ====================

    // Add honeypot field (hidden from users, visible to bots)
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    contactForm.appendChild(honeypot);

    // Check honeypot on submit
    contactForm.addEventListener('submit', function(e) {
        if (honeypot.value !== '') {
            e.preventDefault();
            console.warn('🤖 Spam detected - honeypot filled');
            return false;
        }
    });

    // ==================== NEWSLETTER FORM ====================

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const email = emailInput.value.trim();

            // Validate email
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailInput.style.borderColor = 'var(--error-color)';
                return;
            }

            // Disable button
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Success
                submitButton.textContent = '✓ Subscribed!';
                submitButton.style.backgroundColor = 'var(--success-color)';
                emailInput.value = '';

                setTimeout(() => {
                    submitButton.textContent = 'Subscribe';
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 3000);

                console.log('✅ Newsletter subscription:', email);
            } catch (error) {
                submitButton.textContent = 'Try Again';
                submitButton.disabled = false;
                console.error('❌ Newsletter subscription error:', error);
            }
        });
    }

    // ==================== CONSOLE LOG ====================
    console.log('✅ Form validation initialized successfully');
});

// ==================== UTILITY FUNCTIONS ====================

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]+$/.test(phone);
}

// Sanitize input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        sanitizeInput
    };
}