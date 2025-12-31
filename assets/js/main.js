// ==================== MAIN.JS ====================
// Portfolio Website Main JavaScript File

'use strict';

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== SCROLL TO TOP ====================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ==================== ANIMATE ON SCROLL ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .blog-card, .skill-item, .education-item, .interest-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show navbar on scroll (optional)
    // Uncomment below if you want navbar to hide on scroll down
    /*
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    */

    lastScroll = currentScroll;
});

// ==================== SKILL PROGRESS ANIMATION ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease';
                    entry.target.style.width = width;
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bar animations
if (document.querySelector('.skill-progress')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateSkillBars);
    } else {
        animateSkillBars();
    }
}

// ==================== TYPING EFFECT (Optional) ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Usage example (uncomment to use):
// const heroTitle = document.querySelector('.hero h2');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// }

// ==================== LAZY LOADING IMAGES ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
lazyLoadImages();

// ==================== DARK MODE TOGGLE (Optional) ====================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    darkModeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Initialize dark mode
initDarkMode();

// ==================== PRELOADER (Optional) ====================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        });
    }
}

// Initialize preloader
hidePreloader();

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters for stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (number) {
                    entry.target.textContent = '0' + suffix;
                    animateCounter(entry.target, number, 2000);
                    // Add suffix back
                    const originalSuffix = suffix;
                    const interval = setInterval(() => {
                        const currentNumber = parseInt(entry.target.textContent);
                        if (currentNumber >= number) {
                            entry.target.textContent = number + originalSuffix;
                            clearInterval(interval);
                        }
                    }, 100);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initialize stat counters
if (document.querySelector('.stat-item')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🚀 Portfolio Website', 'color: #4a90e2; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'color: #f39c12; font-size: 16px;');
console.log('%cLooking to hire? Let\'s talk!', 'color: #27ae60; font-size: 14px;');

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get current year for footer
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement && yearElement.textContent.includes('2024')) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
}


const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;
let isAnimating = false;

function showSlide(nextIndex, direction) {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[current];
    const nextSlide = slides[nextIndex];

    // Reset class
    slides.forEach(slide => {
        slide.classList.remove('active', 'exit-left', 'exit-right');
    });

    // Tentukan arah keluar
    if (direction === 'next') {
        currentSlide.classList.add('exit-left');
        nextSlide.style.transform = 'translateX(100%)';
    } else {
        currentSlide.classList.add('exit-right');
        nextSlide.style.transform = 'translateX(-100%)';
    }

    // Aktifkan slide baru
    setTimeout(() => {
        nextSlide.classList.add('active');
        nextSlide.style.transform = 'translateX(0)';
        current = nextIndex;
    }, 20);

    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

nextBtn.addEventListener('click', () => {
    const nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex, 'next');
});

prevBtn.addEventListener('click', () => {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    showSlide(prevIndex, 'prev');
});

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Klik di luar modal untuk menutup
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
};
