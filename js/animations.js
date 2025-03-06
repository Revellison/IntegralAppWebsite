// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
}

// Функция для анимации элементов при скролле
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первичная проверка для элементов, видимых при загрузке
    handleScrollAnimations();
    
    // Добавляем обработчик скролла с устранением дребезга
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            handleScrollAnimations();
        });
    });
}); 