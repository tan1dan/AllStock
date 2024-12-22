document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDownload = document.getElementById('modal-download');
    const closeButton = document.querySelector('.close');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentImages = []; // Текущий массив изображений
    let currentIndex = 0;   // Индекс текущего изображения

    // Открыть модальное окно
    function openModal(images, index) {
        currentImages = images;
        currentIndex = index;
        const currentImage = currentImages[currentIndex];
        modalImage.src = currentImage.src;
        modalTitle.textContent = currentImage.title;
        modalDownload.href = currentImage.src;
        modal.style.display = 'flex';
    }

    // Закрыть модальное окно
    function closeModal() {
        modal.style.display = 'none';
    }

    // Следующее изображение
    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        openModal(currentImages, currentIndex);
    }

    // Предыдущее изображение
    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        openModal(currentImages, currentIndex);
    }

    // Привязка событий делегирования
    document.querySelector('.grid-container').addEventListener('click', (e) => {
        if (e.target.closest('.grid-item')) {
            const gridItem = e.target.closest('.grid-item');
            const images = JSON.parse(gridItem.getAttribute('data-images'));
            openModal(images, 0); // Открыть с первой картинки из набора
        }
    });

    closeButton.addEventListener('click', closeModal);
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // Закрытие при клике вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
