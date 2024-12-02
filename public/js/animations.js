document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle?.addEventListener?.('change', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');
    });

    // Check if Motion.js is loaded
    if (typeof Motion !== 'undefined') {
        // Hero animations
        Motion.animate('.hero h1', {
            opacity: [1, 1],
            y: [10, 0],
            scale: [1, 1]
        }, { duration: 0.5, easing: 'ease-in-out' });

        Motion.animate('.hero .tagline', {
            opacity: [1, 1],
            y: [10, 0],
            scale: [1, 1]
        }, { duration: 0.5, delay: 0.2, easing: 'ease-in-out' });

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Motion.animate(entry.target, {
                        opacity: [1, 1],
                        y: [10, 0],
                        scale: [1, 1]
                    }, { duration: 0.5, easing: 'ease-in-out' });
                    entry.target.style.opacity = 1; // Ensure the section becomes visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = 1; // Ensure initial opacity is 1
            observer.observe(section);
        });

        // Observe experience and view cards
        document.querySelectorAll('.experience-card, .view-card').forEach((card) => {
            card.style.opacity = 1; // Ensure initial opacity is 1
            observer.observe(card);
        });
    } else {
        // Fallback: Ensure all sections are visible without animations
        document.querySelectorAll('.section, .experience-card, .view-card').forEach((element) => {
            element.style.opacity = 1; // Ensure all elements are visible
            element.style.transform = 'translateY(0)'; // Reset transform
        });
    }
});
