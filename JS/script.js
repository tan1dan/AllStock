document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".pinterest-grid");
    const lazyImages = document.querySelectorAll("img.lazy");

    // Ленивое изображение
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => {
        imageObserver.observe(img);
    });

    // Пересчёт Masonry
    const resizeGridItem = (item) => {
        const gridRowHeight = parseInt(
            window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
        );
        const rowGap = parseInt(
            window.getComputedStyle(grid).getPropertyValue("gap")
        );
        const rowSpan = Math.ceil(
            (item.querySelector("img").getBoundingClientRect().height +
                rowGap) /
                (gridRowHeight + rowGap)
        );
        item.style.gridRowEnd = `span ${rowSpan}`;
    };

    const resizeAllGridItems = () => {
        const allItems = document.querySelectorAll(".image-wrapper");
        allItems.forEach((item) => resizeGridItem(item));
    };

    window.addEventListener("resize", resizeAllGridItems);
    window.onload = resizeAllGridItems;

    lazyImages.forEach((img) =>
        img.addEventListener("load", () => {
            const item = img.closest(".image-wrapper");
            resizeGridItem(item);
        })
    );
});

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageDetails = document.getElementById('imageDetails');
const downloadLink = document.getElementById('downloadLink');
const closeModal = document.querySelector('.close');
const imageWrappers = document.querySelectorAll('.image-wrapper');

imageWrappers.forEach(wrapper => {
    const lazyImage = wrapper.querySelector('.lazy');
    const downloadButton = wrapper.querySelector('.download-button');

    // Add click event for opening modal
    lazyImage.addEventListener('click', () => {
        const imageSrc = lazyImage.getAttribute('data-src');
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            modalImage.src = imageSrc;
            imageDetails.textContent = `Dimensions: ${width} x ${height}px`;
            downloadLink.href = imageSrc;

            modal.style.display = 'flex';
        };
    });

    // Lazy loading for images
    lazyImage.src = lazyImage.getAttribute('data-src');
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
