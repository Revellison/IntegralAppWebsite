function animatePhrases() {
    const phrases = document.querySelectorAll('.phrase');
    let currentIndex = 0;
    
    phrases[0].classList.add('active');

    setInterval(() => {
        phrases[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % phrases.length;
        phrases[currentIndex].classList.add('active');
    }, 1500);
}

function animateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 10);
}

document.addEventListener('DOMContentLoaded', function() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const particlesJS = document.querySelector('#particles-js');

    if (contentWrapper) {
        contentWrapper.style.opacity = '0';
        contentWrapper.style.transition = 'opacity 0.5s ease';
    }
    
    if (particlesJS) {
        particlesJS.style.opacity = '0';
        particlesJS.style.transition = 'opacity 0.5s ease';
    }
    
    animatePhrases();
    animateProgress();
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const contentWrapper = document.querySelector('.content-wrapper');
    const particlesJS = document.querySelector('#particles-js');
    
    setTimeout(function() {
        if (preloader) {
            preloader.classList.add('fade-out');
            
            setTimeout(function() {
                preloader.style.display = 'none';
                
                if (contentWrapper) {
                    contentWrapper.style.opacity = '1';
                }
                
                if (particlesJS) {
                    particlesJS.style.opacity = '1';
                }
            }, 300);
        }
    }, 800);
});
