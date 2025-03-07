class Preloader {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        this.progressBar = document.querySelector('.preloader-progress-bar');
        this.content = document.querySelector('.content-wrapper');
        this.loadingProgress = 0;
        this.isLoaded = false;
        this.resources = {
            images: 0,
            fonts: 0,
            scripts: 0
        };
        
        // Привязываем методы к контексту
        this.updateProgress = this.updateProgress.bind(this);
        this.hide = this.hide.bind(this);
        this.init = this.init.bind(this);
    }

    updateProgress(progress) {
        this.loadingProgress = Math.min(progress, 100);
        if (this.progressBar) {
            this.progressBar.style.width = `${this.loadingProgress}%`;
        }
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('fade-out');
            
            setTimeout(() => {
                this.preloader.style.display = 'none';
                if (this.content) {
                    this.content.classList.add('loaded');
                }
                // Запускаем анимации после скрытия прелоадера
                this.startPageAnimations();
            }, 500);
        }
    }

    startPageAnimations() {
        // Проверяем, что функция существует и доступна
        if (window.handleScrollAnimations) {
            window.handleScrollAnimations();
        }

        // Активируем все анимации героя
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('animate');
        }

        // Активируем анимации иконок с задержкой
        const icons = document.querySelectorAll('.icons-container i');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('animate');
            }, index * 200);
        });
    }

    checkResources() {
        // Подсчитываем общее количество ресурсов для загрузки
        const images = document.images;
        const scripts = document.scripts;
        
        let totalResources = images.length + scripts.length;
        let loadedResources = 0;

        // Функция обновления прогресса
        const updateLoadingProgress = () => {
            loadedResources++;
            const progress = (loadedResources / totalResources) * 100;
            this.updateProgress(progress);

            if (loadedResources >= totalResources) {
                // Добавляем небольшую задержку перед скрытием прелоадера
                setTimeout(() => {
                    this.isLoaded = true;
                    this.hide();
                }, 300);
            }
        };

        // Проверяем загрузку изображений
        for (let img of images) {
            if (img.complete) {
                updateLoadingProgress();
            } else {
                img.addEventListener('load', updateLoadingProgress);
                img.addEventListener('error', updateLoadingProgress);
            }
        }

        // Проверяем загрузку скриптов
        for (let script of scripts) {
            if (script.complete || script.readyState === 'complete' || script.readyState === 'loaded') {
                updateLoadingProgress();
            } else {
                script.addEventListener('load', updateLoadingProgress);
                script.addEventListener('error', updateLoadingProgress);
            }
        }

        // Если нет ресурсов для загрузки или все уже загружены
        if (totalResources === 0 || loadedResources === totalResources) {
            setTimeout(() => {
                this.isLoaded = true;
                this.updateProgress(100);
                this.hide();
            }, 500);
        }

        // Устанавливаем максимальное время загрузки
        setTimeout(() => {
            if (!this.isLoaded) {
                this.updateProgress(100);
                this.hide();
            }
        }, 5000); // Максимальное время ожидания - 5 секунд
    }

    init() {
        // Проверяем предпочтения пользователя по движению
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Сразу скрываем прелоадер и показываем контент
            if (this.preloader) {
                this.preloader.style.display = 'none';
            }
            if (this.content) {
                this.content.classList.add('loaded');
            }
            return;
        }

        // Начинаем отслеживать загрузку ресурсов
        if (document.readyState === 'complete') {
            this.checkResources();
        } else {
            window.addEventListener('load', () => {
                this.checkResources();
            });
        }

        // Устанавливаем минимальное время показа прелоадера
        setTimeout(() => {
            if (!this.isLoaded) {
                this.updateProgress(70); // Показываем прогресс даже если ресурсы ещё загружаются
            }
        }, 500);
    }
}

// Создаем и инициализируем прелоадер
document.addEventListener('DOMContentLoaded', () => {
    const preloader = new Preloader();
    preloader.init();
}); 