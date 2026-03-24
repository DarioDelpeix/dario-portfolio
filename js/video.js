const perfilVideo = document.getElementById('perfil-video');
const perfilPlayBtn = document.querySelector('.perfil-play-btn');

if (perfilVideo && perfilPlayBtn) {
    const syncPerfilPlayBtn = () => {
        const paused = perfilVideo.paused || perfilVideo.ended;
        perfilPlayBtn.textContent = paused ? 'Play' : 'Pause';
        perfilPlayBtn.setAttribute('aria-label', paused ? 'Reproducir video' : 'Pausar video');
        perfilPlayBtn.classList.toggle('is-playing', !paused);
    };

    perfilPlayBtn.addEventListener('click', async () => {
        if (perfilVideo.paused || perfilVideo.ended) {
            try {
                await perfilVideo.play();
            } catch (error) {
                // Si el navegador bloquea la reproduccion, mantenemos el estado actual.
            }
        } else {
            perfilVideo.pause();
        }

        syncPerfilPlayBtn();
    });

    perfilVideo.addEventListener('play', syncPerfilPlayBtn);
    perfilVideo.addEventListener('pause', syncPerfilPlayBtn);
    perfilVideo.addEventListener('ended', syncPerfilPlayBtn);
    syncPerfilPlayBtn();
}
