const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('main-menu');

if (menuButton && navMenu) {
    const closeMenu = () => {
        navMenu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        navMenu.classList.toggle('is-open', !isOpen);
    };

    // abrir o cerrar desde el botón hamburguesa.
    menuButton.addEventListener('click', toggleMenu);

    // Cerrar al pulsar un enlace del menú en móvil.
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Cerrar al pulsar la tecla escape o hacer click fuera del header.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && navMenu.classList.contains('is-open')) {
            const clickDentroDelHeader = event.target.closest('header');
            if (!clickDentroDelHeader) {
                closeMenu();
            }
        }
    });
}