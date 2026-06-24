/* CORE SCROLL ANIMATIONS AND NAVIGATION ENGINE — AYUSH DOBRIYAL PORTFOLIO */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL PROGRESS INDICATOR
    const progressBar = document.getElementById('progressBar');
    
    const updateProgressBar = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
            const scrollPercentage = (window.scrollY / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }
    };

    
    // 2. ACTIVE SECTION HIGHLIGHTER SYSTEM (INTERSECTION OBSERVER)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Precise trigger target focal area
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === activeId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 3. ATOMIC ELEMENT INTERACTIVE SCROLL REVEALS
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const staggerElements = document.querySelectorAll('.scroll-reveal-stagger');

    const generalObserverOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters viewport completely
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Specific inner logic triggers when section surfaces
                if (entry.target.id === 'qualification') {
                    triggerSkillBars();
                }
                if (entry.target.id === 'about') {
                    triggerMetricCounters();
                }
                
                observer.unobserve(entry.target); // Optimize resources once animation finishes
            }
        });
    }, generalObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger child groups handler
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply small artificial index delay for cascade effect
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, (index % 4) * 120); 
                observer.unobserve(entry.target);
            }
        });
    }, generalObserverOptions);

    staggerElements.forEach(el => staggerObserver.observe(el));

    // 4. TECH PROFICIENCY GRAPH TRANSITIONS
    function triggerSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
            const finalWidth = fill.getAttribute('data-width');
            fill.style.setProperty('--final-width', finalWidth); // Backup variable for media queries
            fill.style.width = finalWidth;
        });
    }

    // 5. METRIC COUNT-UP SCROLL INTERACTION
    function triggerMetricCounters(){
        const numbers = document.querySelectorAll('.metric-number');
        
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 1500; // Total count run duration milliseconds
            const frameRate = 1000 / 60; // 60 FPS standard calculation
            const totalSteps = Math.round(duration / frameRate);
            const increment = target / totalSteps;

            const counterInterval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target + (target === 4 || target === 10 ? '+' : '');
                    clearInterval(counterInterval);
                } else {
                    num.textContent = Math.floor(current);
                }
            }, frameRate);
        });
    }

    // 6. MOBILE FULLSCREEN HEADER MENUS TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        const toggleState = () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleState);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // EVENT DELEGATION TICK OVERRIDE FOR HIGH PERFORMANCE
    window.addEventListener('scroll', () => {
        let ticking = false;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

});