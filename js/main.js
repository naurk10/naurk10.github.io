/**
 * KAUAN MONTEIRO - DATA ENGINEER PORTFOLIO
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initProjectHover();
    initScrollAnimations();
    initSmoothScroll();
    initLinguisticBars();
});

/* ============================================
   CURSOR PERSONALIZADO
   ============================================ */

function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .contact-link, .skill-tag, .linguistic-card'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(0.8)';
        outline.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });

    document.addEventListener('mouseup', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/* ============================================
   NAVEGAÇÃO OVERLAY
   ============================================ */

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   HOVER EFFECTS EM PROJETOS
   ============================================ */

function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        if (!image) return;

        const staticSrc = image.src;
        const animatedSrc = image.dataset.animated || staticSrc;

        const preloadImage = new Image();
        preloadImage.src = animatedSrc;

        card.addEventListener('mouseenter', () => {
            image.style.opacity = '0.8';
            setTimeout(() => {
                image.src = animatedSrc;
                image.style.opacity = '1';
            }, 100);
        });

        card.addEventListener('mouseleave', () => {
            image.style.opacity = '0.8';
            setTimeout(() => {
                image.src = staticSrc;
                image.style.opacity = '1';
            }, 100);
        });
    });

    if (window.matchMedia('(pointer: coarse)').matches) {
        projectCards.forEach(card => {
            const image = card.querySelector('.project-image');
            const animatedSrc = image?.dataset.animated;
            if (animatedSrc) {
                card.addEventListener('touchstart', () => {
                    image.src = animatedSrc;
                }, { passive: true });
            }
        });
    }
}

/* ============================================
   ANIMAÇÕES DE SCROLL
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .linguistic-card').forEach(el => {
        observer.observe(el);
    });

    initParallax();
}

function initParallax() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.3;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   LINGUISTIC BARS ANIMATION
   ============================================ */

function initLinguisticBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.level-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.linguistic-card').forEach(card => {
        observer.observe(card);
    });
}
