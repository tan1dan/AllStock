document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("image-grid");
    const loadingIndicator = document.getElementById("loading");
    let page = 1;
    let loading = false;
    let hasMore = true;

    // Функция для получения изображений с API
    async function fetchImages() {
        if (loading || !hasMore) return;
        loading = true;
        loadingIndicator.style.display = "block";

        try {
            const response = await fetch(`/api/images?page=${page}`);
            const data = await response.json();
            data.images.forEach((src) => {
                const img = document.createElement("img");
                img.className = "lazy";
                img.src = src;
                img.onload = () => img.classList.add("loaded");
                grid.appendChild(img);
            });
            hasMore = data.hasMore;
            page++;
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            loading = false;
            loadingIndicator.style.display = hasMore ? "block" : "none";
        }
    }

    // Ленивая загрузка при прокрутке
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchImages();
        }
    });

    // Первая загрузка
    fetchImages();
});

