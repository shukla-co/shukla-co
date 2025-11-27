/**
 * Shukla & Co - Enhanced Interactive Features
 * Welcome Screen + Page Animations + Navigation
 */

// ===================================
// WELCOME SCREEN
// ===================================

function initWelcomeScreen() {
    const welcomeScreen = document.querySelector('.welcome-screen');

    if (welcomeScreen) {
        // Hide welcome screen after 4 seconds
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            document.body.classList.add('page-entrance');
            initPageEntrance();
        }, 4000);
    } else {
        // No welcome screen, just do page entrance
        document.body.classList.add('page-entrance');
        initPageEntrance();
    }
}

// ===================================
// PAGE ENTRANCE ANIMATIONS
// ===================================

function initPageEntrance() {
    // Animate hero sections
    const heroSections = document.querySelectorAll('.hero, .page-hero');
    heroSections.forEach(hero => {
        hero.classList.add('hero-animated');

        // Add shimmer to main titles
        const mainTitle = hero.querySelector('h1');
        if (mainTitle) {
            mainTitle.classList.add('title-shimmer');
        }
    });

    // Animate sections sequentially
    setTimeout(() => {
        const sections = document.querySelectorAll('section:not(.hero):not(.page-hero)');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('section-reveal');
            }, index * 100);
        });
    }, 300);

    // Animate cards with stagger
    setTimeout(() => {
        const cards = document.querySelectorAll('.card, .stat-card, .testimonial-card, .feature-item');
        cards.forEach(card => {
            card.classList.add('animate-stagger');
        });
    }, 500);
}

// ===================================
// MOBILE NAVIGATION
// ===================================

function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Close nav when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
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
}

// ===================================
// MODAL FUNCTIONALITY
// ===================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// FORM HANDLING
// ===================================

function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Add loading state to submit button
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
        });
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

function initHeaderScroll() {
    const header = document.querySelector('.site-header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }

            lastScroll = currentScroll;
        });
    }
}

// ===================================
// INITIALIZE EVERYTHING
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initWelcomeScreen();
    initMobileNav();
    initSmoothScroll();
    initForms();
    initHeaderScroll();
});

// If page is already loaded (for SPAs or dynamic loading)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        initWelcomeScreen();
        initMobileNav();
        initSmoothScroll();
        initForms();
        initHeaderScroll();
    }, 1);
}

// Make functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;
