document.addEventListener("DOMContentLoaded", function() {
    
    /* =========================================
        1. SMART NAVBAR (Ocultar al bajar / Mostrar al subir)
       ========================================= */
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100; // Distancia antes de empezar a ocultarse
    const chatTrigger = document.getElementById('chat-trigger');

    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Evitar que el valor sea negativo (scroll elástico en iOS)
            if (scrollTop < 0) scrollTop = 0;

            // Lógica de ocultar/mostrar
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Bajando el scroll: Ocultamos el menú
                navbar.classList.add('navbar-hidden');
            } else {
                // Subiendo el scroll: Mostramos el menú
                navbar.classList.remove('navbar-hidden');
            }

            // Efecto visual: Añadir sombra cuando no estamos al inicio
            if (scrollTop > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(255, 255, 255, 1)';
            }

            // Mostrar botón de chat solo al bajar
            if (chatTrigger) {
                if (scrollTop > 180) {
                    chatTrigger.classList.add('visible');
                } else {
                    chatTrigger.classList.remove('visible');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }


    /* =========================================
        2. MENÚ HAMBURGUESA (Móvil)
       ========================================= */
    const menuToggle = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        if (!menuToggle || !navMenu || !navOverlay) return;
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle && navMenu && navOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Cerrar menú móvil al hacer click en un enlace
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Evitar que el clic dentro del menú lo cierre
    navMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Ajustar menú al hacer resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    /* =========================================
        3. LÓGICA DE SOCIOS (PARTNERS)
       ========================================= */
    const imagenesSocios = {
        'msft': 'src/mtsf.png',
        'cisco': 'src/cisco.png',
        'oracle': 'src/oracle.png',
        'sap': 'src/sap.png',
        'open': 'src/open.png',
        'ruijie': 'src/ruijid.webp',
        'huawei': 'src/huwa.png',
        'hikvision': 'src/hiki.webp',
        'default': 'src/mtsf.png' // Logo por defecto
    };

    // Definimos la función globalmente para que el 'onclick' del HTML la encuentre
    window.cambiarLogo = function(clave) {
        // Buscamos el ID que definimos en el cuadro visual (display-logo o partner-img)
        const img = document.getElementById('display-logo') || document.getElementById('partner-img');
        
        if (!img) return;

        img.style.opacity = '0'; // Efecto de desvanecimiento
        
        setTimeout(() => {
            img.src = imagenesSocios[clave] || imagenesSocios['default'];
            img.style.opacity = '1';
        }, 250);
    };

    /* =========================================
        4. CHAT (Trigger simulado)
       ========================================= */
    if (chatTrigger) {
        if ((window.pageYOffset || document.documentElement.scrollTop) > 180) {
            chatTrigger.classList.add('visible');
        }
    }

    /* =========================================
        5. SCROLL SUAVE PARA ANCLAS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* =========================================
        6. AUTO-SCROLL EN CONTENEDORES DESTACADOS
       ========================================= */
    const featuredContainer = document.querySelector('.featured-scroll-container');
    const featuredItems = document.querySelectorAll('.featured-item');
    const featuredPrev = document.getElementById('featured-prev');
    const featuredNext = document.getElementById('featured-next');

    if (featuredContainer && featuredItems.length > 1) {
        let currentIndex = 0;
        const intervalMs = 15000;
        let syncTimeout;

        const goToSlide = (index) => {
            const clampedIndex = (index + featuredItems.length) % featuredItems.length;
            currentIndex = clampedIndex;
            featuredContainer.scrollTo({
                left: featuredContainer.clientWidth * currentIndex,
                behavior: 'smooth'
            });
        };

        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalMs);

        featuredPrev?.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        featuredNext?.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        featuredContainer.addEventListener('scroll', () => {
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(() => {
                const rawIndex = featuredContainer.scrollLeft / featuredContainer.clientWidth;
                currentIndex = Math.round(rawIndex);
            }, 120);
        }, { passive: true });
    }


    /* =========================================
        7. REVEAL ANIMATION (Aparecer al hacer scroll)
       ========================================= */
    const reveals = document.querySelectorAll(".reveal, .pro-card, .about-container");
    
    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85; // Se activa al 85% de la pantalla

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                el.classList.add("active");
                // Si quieres que la animación sea solo una vez, deja esto. 
                // Si quieres que se repita, añade un else { el.classList.remove("active"); }
            }
        });
    };

    window.addEventListener("scroll", checkReveal);
    
    // Ejecutar una vez al cargar por si hay elementos ya visibles
    checkReveal();


    /* =========================================
        8. ARTÍCULOS IDA 360 (Mostrar/Ocultar contenido)
       ========================================= */
    const idaToggleButtons = document.querySelectorAll('.ida-toggle-btn');

    idaToggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            if (!targetId) return;

            const moreContent = document.getElementById(targetId);
            if (!moreContent) return;

            const isHidden = moreContent.hasAttribute('hidden');
            if (isHidden) {
                moreContent.removeAttribute('hidden');
                button.setAttribute('aria-expanded', 'true');
                button.textContent = 'Ver menos';
            } else {
                moreContent.setAttribute('hidden', '');
                button.setAttribute('aria-expanded', 'false');
                button.textContent = 'Ver más';
            }
        });
    });


    /* =========================================
        9. ENLACES ACTIVOS (Resaltar página actual)
       ========================================= */
    const activePage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href').split("#")[0];
        if (linkHref === activePage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
