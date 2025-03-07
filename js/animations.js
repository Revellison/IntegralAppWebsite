function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * 0.85;
}

window.handleScrollAnimations = function() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animated');
            requestAnimationFrame(() => {
                element.classList.add('active');
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}); 