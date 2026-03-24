const perfilVideo = document.getElementById('perfil-video');
const perfilPlayBtn = document.querySelector('.perfil-play-btn');

// Inicializa los controles solo si existen el video y su boton
if (perfilVideo && perfilPlayBtn) {
    // Mantiene el texto/estado visual del boton sincronizado con el video
    const syncPerfilPlayBtn = () => {
        const paused = perfilVideo.paused || perfilVideo.ended;
        perfilPlayBtn.textContent = paused ? 'Play' : 'Pause';
        perfilPlayBtn.setAttribute('aria-label', paused ? 'Reproducir video' : 'Pausar video');
        perfilPlayBtn.classList.toggle('is-playing', !paused);
    };

    // Alterna entre reproducir y pausar al pulsar el boton
    perfilPlayBtn.addEventListener('click', async () => {
        if (perfilVideo.paused || perfilVideo.ended) {
            try {
                await perfilVideo.play();
            } catch (error) {
                // Si el navegador bloquea la reproduccion se mantiene el estado actual
            }
        } else {
            perfilVideo.pause();
        }

        syncPerfilPlayBtn();
    });

    // Sincroniza el boton tambien cuando el estado cambia por otras acciones del usuario
    perfilVideo.addEventListener('play', syncPerfilPlayBtn);
    perfilVideo.addEventListener('pause', syncPerfilPlayBtn);
    perfilVideo.addEventListener('ended', syncPerfilPlayBtn);

    // Estado inicial al cargar la pagina
    syncPerfilPlayBtn();
}
