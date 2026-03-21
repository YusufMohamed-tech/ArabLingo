// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

        // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'border-gray-100');
                navbar.classList.remove('bg-transparent', 'border-transparent');
            } else {
                navbar.classList.add('bg-transparent', 'border-transparent');
                navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'border-gray-100');
            }
        });
    }

    // Flip Card interaction
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            flipCards.forEach(c => {
                if (c !== this) c.classList.remove('is-flipped');
            });
            this.classList.toggle('is-flipped');
        });
        
        card.addEventListener('mouseenter', function() {
            if(window.innerWidth > 768) {
                this.classList.add('is-flipped');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if(window.innerWidth > 768) {
                this.classList.remove('is-flipped');
            }
        });
    });

    // Animate Counters on scroll
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
            const increment = target / (duration / 16); 
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = target % 1 === 0 ? Math.ceil(current) : current.toFixed(1);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); 

    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
