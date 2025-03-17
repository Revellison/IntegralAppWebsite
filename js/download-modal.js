document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const modal = document.querySelector('.download-modal');
    const closeButton = modal.querySelector('.modal-close');
    const modalIcon = modal.querySelector('.modal-icon i');
    const modalText = modal.querySelector('p');

    function showModal(e) {
        e.preventDefault();
        
        modalIcon.className = 'fas fa-cloud-download-alt';
        modalText.textContent = 'Начинаем загрузку...';
        
        modal.classList.add('active');
        modalIcon.classList.add('fa-bounce');

        const downloadUrl = e.target.closest('a').href;
        
        setTimeout(() => {
            modalText.textContent = 'Загрузка началась!';
            modalIcon.classList.remove('fa-cloud-download-alt', 'fa-bounce');
            modalIcon.classList.add('fa-check');
            
            setTimeout(() => {
                hideModal();
                window.location.href = downloadUrl;
            }, 1000);
        }, 1000);
    }

    function hideModal() {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modalIcon.classList.remove('fa-bounce', 'fa-check');
            modalIcon.classList.add('fa-cloud-download-alt');
            modalText.textContent = 'Начинаем загрузку...';
        }, 300);
    }

    downloadButtons.forEach(button => {
        button.addEventListener('click', showModal);
    });

    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
}); 