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

    // Menú móvil: abrir/cerrar desde el botón hamburguesa.
    menuButton.addEventListener('click', toggleMenu);

    // Cerrar al pulsar un enlace del menú en móvil.
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Cerrar al pulsar Escape o hacer click fuera del header.
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

    // Evita estados inconsistentes al volver a escritorio.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Scroll suave para enlaces internos de la página.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            return;
        }

        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Marca en el menú la sección visible actualmente.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    const isCurrent = link.getAttribute('href') === `#${currentId}`;
                    link.setAttribute('aria-current', isCurrent ? 'page' : 'false');
                });
            });
        },
        {
            root: null,
            threshold: 0.35,
        }
    );

    sections.forEach((section) => observer.observe(section));
}