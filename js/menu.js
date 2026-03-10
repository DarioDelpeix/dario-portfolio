const menuButton = document.querySelector('.menu-toggle');
        const navMenu = document.getElementById('main-menu');
        // al hacer click en el botón del menú, se alterna la clase 'is-open' en el menú de navegación y muestra o oculta el menú
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', String(!isOpen));
                navMenu.classList.toggle('is-open', !isOpen);
            });

            navMenu.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('is-open');
                        menuButton.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('is-open');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });
        }