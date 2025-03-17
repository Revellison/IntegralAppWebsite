// Функция для анимации фраз
function animatePhrases() {
    const phrases = document.querySelectorAll('.phrase');
    let currentIndex = 0;
    
    // Показываем первую фразу
    phrases[0].classList.add('active');
    
    // Интервал для смены фраз
    setInterval(() => {
        phrases[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % phrases.length;
        phrases[currentIndex].classList.add('active');
    }, 2000);
}

// Функция для анимации прогресс-бара
function animateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 20);
}

// Скрываем контент при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const particlesJS = document.querySelector('#particles-js');
    
    // Скрываем контент и частицы
    if (contentWrapper) {
        contentWrapper.style.opacity = '0';
        contentWrapper.style.transition = 'opacity 0.5s ease';
    }
    
    if (particlesJS) {
        particlesJS.style.opacity = '0';
        particlesJS.style.transition = 'opacity 0.5s ease';
    }
    
    // Запускаем анимации
    animatePhrases();
    animateProgress();
});

// Скрываем прелоадер после полной загрузки страницы
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const contentWrapper = document.querySelector('.content-wrapper');
    const particlesJS = document.querySelector('#particles-js');
    
    // Минимальное время отображения прелоадера
    setTimeout(function() {
        if (preloader) {
            // Добавляем класс для плавного скрытия
            preloader.classList.add('fade-out');
            
            // После анимации скрытия скрываем прелоадер полностью
            setTimeout(function() {
                preloader.style.display = 'none';
                
                // Показываем контент и частицы
                if (contentWrapper) {
                    contentWrapper.style.opacity = '1';
                }
                
                if (particlesJS) {
                    particlesJS.style.opacity = '1';
                }
                
                // Запускаем анимации при скролле
                if (typeof handleScrollAnimations === 'function') {
                    handleScrollAnimations();
                }
            }, 500);
        }
    }, 1500);
});
