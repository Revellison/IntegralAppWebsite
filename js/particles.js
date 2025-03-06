document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#2c2c2c'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2c2c2c',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                push: {
                    particles_nb: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });

    // Оптимизируем параллакс эффект
    let parallaxTimeout;
    document.addEventListener('mousemove', function(e) {
        if (parallaxTimeout) return;

        parallaxTimeout = setTimeout(() => {
            const particles = document.getElementById('particles-js');
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;

            // Уменьшаем силу эффекта и добавляем плавность
            particles.style.transition = 'transform 0.3s ease-out';
            particles.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;

            parallaxTimeout = null;
        }, 16);
    });

    // Оптимизируем эффект при скролле
    let scrollTimeout;
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(() => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = st > lastScrollTop ? 'down' : 'up';
            
            const pJS = window.pJSDom[0].pJS;
            if (pJS && pJS.particles && pJS.particles.move) {
                pJS.particles.move.speed = 2;
                if (scrollDirection === 'down') {
                    pJS.particles.move.direction = 'bottom';
                } else {
                    pJS.particles.move.direction = 'top';
                }
                
                setTimeout(() => {
                    pJS.particles.move.direction = 'none';
                    pJS.particles.move.speed = 1.5;
                }, 500);
            }
            
            lastScrollTop = st <= 0 ? 0 : st;
            scrollTimeout = null;
        }, 50);
    });

    // Оптимизируем эффект волны
    document.addEventListener('click', function(e) {
        const particles = document.getElementById('particles-js');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        
        ripple.style.animation = 'ripple 0.8s ease-out';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)';
        
        particles.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });
}); 