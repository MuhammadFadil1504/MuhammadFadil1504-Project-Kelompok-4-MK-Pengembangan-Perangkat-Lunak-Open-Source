// ==================== NAVIGATION.JS ====================
// Mobile Navigation & Menu Functionality

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU TOGGLE ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const body = document.body;

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate menu items
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
                });
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // ==================== ACTIVE LINK HIGHLIGHTING ====================
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            
            // Handle both relative and absolute paths
            if (linkPath === currentPage || 
                linkPath === `./${currentPage}` || 
                linkPath === `../${currentPage}` ||
                (currentPage === 'index.html' && linkPath === '/') ||
                (currentPage === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Set active link on page load
    setActiveLink();

    // ==================== STICKY NAVIGATION ====================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollThreshold = 100;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Optional: Hide navbar on scroll down, show on scroll up
        // Uncomment below if you want this feature
        /*
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        */

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ==================== DROPDOWN MENU (if needed) ====================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.matches('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // ==================== SMOOTH SCROLL FOR NAVIGATION ====================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link on the same page
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== SEARCH FUNCTIONALITY (if search exists) ====================
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');

    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });

        // Close search on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchBox.classList.contains('active')) {
                searchBox.classList.remove('active');
            }
        });
    }

    // ==================== BREADCRUMB NAVIGATION ====================
    function generateBreadcrumb() {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (!breadcrumb) return;

        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '');
        
        let breadcrumbHTML = '<a href="/">Home</a>';
        let currentPath = '';

        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const name = segment.replace(/-/g, ' ').replace('.html', '');
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            
            if (index === segments.length - 1) {
                breadcrumbHTML += ` <span class="separator">/</span> <span class="current">${capitalizedName}</span>`;
            } else {
                breadcrumbHTML += ` <span class="separator">/</span> <a href="${currentPath}">${capitalizedName}</a>`;
            }
        });

        breadcrumb.innerHTML = breadcrumbHTML;
    }

    // Generate breadcrumb on page load
    generateBreadcrumb();

    // ==================== ACCESSIBILITY IMPROVEMENTS ====================
    
    // Add aria labels to navigation
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Trap focus in mobile menu when open
    if (navMenu) {
        const focusableElements = navMenu.querySelectorAll('a, button, input');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        navMenu.addEventListener('keydown', function(e) {
            if (!navMenu.classList.contains('active')) return;

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }

    // ==================== RESIZE HANDLER ====================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on desktop
            if (window.innerWidth > 992) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        }, 250);
    });

    // ==================== CURRENT PAGE INDICATOR ====================
    function updatePageIndicator() {
        const pageTitle = document.querySelector('.page-header h1, .hero h1');
        if (pageTitle) {
            document.title = `${pageTitle.textContent} - Portfolio`;
        }
    }

    updatePageIndicator();

    // ==================== CONSOLE LOG ====================
    console.log('✅ Navigation initialized successfully');
});

// ==================== UTILITY FUNCTIONS ====================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isInViewport
    };
}