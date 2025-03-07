document.addEventListener('DOMContentLoaded', function() {
    const headerCheck = setInterval(() => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            clearInterval(headerCheck);
            initTheme();
            
            themeToggle.addEventListener('click', () => {
                toggleTheme();
                updateThemeIcon(themeToggle);
            });
            
            updateThemeIcon(themeToggle);
        }
    }, 100);
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        const style = getComputedStyle(document.documentElement);
        
        const colors = [
            style.getPropertyValue('--particle-color-1').trim(),
            style.getPropertyValue('--particle-color-2').trim(),
            style.getPropertyValue('--particle-color-3').trim()
        ];
            
        particles.array.forEach((p, i) => {
            p.color.value = colors[i % 3];
            p.color.rgb = hexToRgb(colors[i % 3]);
        });
    }
    
    document.querySelectorAll('.theme-toggle').forEach(button => {
        updateThemeIcon(button);
    });
}

function updateThemeIcon(button) {
    const icon = button.querySelector('i');
    if (icon) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || getPreferredTheme();
    setTheme(theme);

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

function hexToRgb(hex) {
    if (hex.startsWith('rgba')) {
        const parts = hex.match(/[\d.]+/g);
        return {
            r: parseInt(parts[0]),
            g: parseInt(parts[1]),
            b: parseInt(parts[2])
        };
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
} 