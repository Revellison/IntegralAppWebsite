document.addEventListener('DOMContentLoaded', () => {
    const docContainer = document.querySelector('.documentation-container');
    const menuButton = document.createElement('button');
    menuButton.className = 'doc-menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    docContainer.appendChild(menuButton);

    const overlay = document.createElement('div');
    overlay.className = 'doc-overlay';
    docContainer.appendChild(overlay);

    const navigation = document.querySelector('.doc-navigation');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navigation.classList.toggle('active');
        overlay.classList.toggle('active');
        menuButton.innerHTML = isMenuOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
        
        const icon = menuButton.querySelector('i');
        icon.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    const sections = document.querySelectorAll('.content section');
    
    function checkSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('active');
            }
        });
    }

    checkSections();

    window.addEventListener('scroll', () => {
        checkSections();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });
}); 