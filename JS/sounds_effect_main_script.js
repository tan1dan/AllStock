document.addEventListener('DOMContentLoaded', function() {
    const musicItems = document.querySelectorAll('.music-item');
    let currentAudio = null; // Глобальная переменная для текущего проигрываемого аудио

    musicItems.forEach(item => {
        const playButton = item.querySelector('button:first-of-type');
        const audio = item.querySelector('audio');
        const progressBar = item.querySelector('.progress-bar div');
        const progressContainer = item.querySelector('.progress-bar');
        const timerDisplay = item.querySelector('.timer');

        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            timerDisplay.textContent = `0:00 / ${duration}`;
            progressBar.style.width = '0%';
        });

        playButton.addEventListener('click', () => {
            if (audio.paused) {
                if (currentAudio && currentAudio !== audio) {
                    // Остановить текущий трек, если он отличается от нового
                    currentAudio.pause();
                    const currentPlayButton = Array.from(musicItems).find(
                        item => item.querySelector('audio') === currentAudio
                    )?.querySelector('button:first-of-type');
                    if (currentPlayButton) currentPlayButton.textContent = '▶ Play';
                }

                audio.play();
                currentAudio = audio; // Установить текущий трек
                playButton.textContent = '⏸ Pause';
            } else {
                audio.pause();
                playButton.textContent = '▶ Play';
            }
        });

        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
            timerDisplay.textContent = `${currentTime} / ${duration}`;
        });

        audio.addEventListener('ended', () => {
            playButton.textContent = '▶ Play';
            progressBar.style.width = '0%';
            timerDisplay.textContent = '0:00 / 0:00';
            if (currentAudio === audio) currentAudio = null; // Очистить текущий трек
        });

        progressContainer.addEventListener('click', (e) => {
            const clickPosition = (e.offsetX / progressContainer.offsetWidth) * audio.duration;
            audio.currentTime = clickPosition;
        });

        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    });
});