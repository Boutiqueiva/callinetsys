document.addEventListener("DOMContentLoaded", function() {
    
    /* =========================================
        1. SMART NAVBAR (Ocultar al bajar / Mostrar al subir)
       ========================================= */
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;
    const chatTrigger = document.getElementById('chat-trigger');

    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < 0) scrollTop = 0;

            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            if (scrollTop > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(255, 255, 255, 1)';
            }

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

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    navMenu?.addEventListener('click', (e) => { e.stopPropagation(); });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    /* =========================================
        3. LÓGICA DE SOCIOS (PARTNERS)
       ========================================= */
    const datosSocios = {
        'msft': {
            img: 'mtsf.png',
            nombre: 'Microsoft',
            descripcion: 'Partner certificado Microsoft. Implementamos soluciones Azure, Office 365, Teams y Dynamics 365 para impulsar la productividad y transformación digital de tu empresa con tecnología en la nube.'
        },
        'cisco': {
            img: 'cisco.png',
            nombre: 'Cisco',
            descripcion: 'Partner autorizado Cisco. Especialistas en diseño e implementación de redes empresariales, ciberseguridad, colaboración y conectividad de clase mundial para entornos críticos.'
        },
        'oracle': {
            img: 'oracle.png',
            nombre: 'Oracle',
            descripcion: 'Alianza con Oracle para la implementación y administración de bases de datos, ERP empresarial y soluciones en la nube que optimizan procesos y garantizan alta disponibilidad de datos.'
        },
        'sap': {
            img: 'sap.png',
            nombre: 'SAP',
            descripcion: 'Partner SAP especializado en la implementación de soluciones ERP, gestión financiera y cadena de suministro que integran y digitalizan todos los procesos clave del negocio.'
        },
        'open': {
            img: 'open.png',
            nombre: 'Open Source',
            descripcion: 'Implementamos soluciones basadas en tecnologías open source como Linux, Kubernetes, OpenStack y herramientas de desarrollo que reducen costos de licenciamiento sin sacrificar rendimiento.'
        },
        'ruijie': {
            img: 'ruijid.webp',
            nombre: 'Ruijie Network',
            descripcion: 'Distribuidor oficial Ruijie. Proveemos switches, routers y puntos de acceso Wi-Fi de alto rendimiento para redes empresariales y educativas con gestión centralizada en la nube.'
        },
        'huawei': {
            img: 'huwa.png',
            nombre: 'Huawei',
            descripcion: 'Partner Huawei para infraestructura de telecomunicaciones, redes 5G, soluciones de almacenamiento y equipos de red empresarial con tecnología de vanguardia a nivel mundial.'
        },
        'hikvision': {
            img: 'hiki.webp',
            nombre: 'Hikvision',
            descripcion: 'Distribuidor autorizado Hikvision, líder mundial en videovigilancia. Implementamos sistemas de cámaras IP, analítica de video inteligente y control de accesos para proteger tu empresa.'
        }
    };

    window.cambiarLogo = function(clave) {
        const img        = document.getElementById('display-logo') || document.getElementById('partner-img');
        const nombreEl   = document.getElementById('partner-nombre');
        const descripEl  = document.getElementById('partner-descripcion');
        const tagsSocio  = document.querySelectorAll('.partners-tags span');

        const socio = datosSocios[clave] || datosSocios['msft'];

        // Resaltar el tag activo
        tagsSocio.forEach(span => {
            span.classList.remove('partner-active');
            if (span.getAttribute('onclick') && span.getAttribute('onclick').includes(`'${clave}'`)) {
                span.classList.add('partner-active');
            }
        });

        // Fade out
        if (img)       img.style.opacity      = '0';
        if (nombreEl)  nombreEl.style.opacity  = '0';
        if (descripEl) descripEl.style.opacity = '0';

        setTimeout(() => {
            if (img) {
                img.src          = socio.img;
                img.alt          = socio.nombre;
                img.style.opacity = '1';
            }
            if (nombreEl) {
                nombreEl.textContent  = socio.nombre;
                nombreEl.style.opacity = '1';
            }
            if (descripEl) {
                descripEl.textContent  = socio.descripcion;
                descripEl.style.opacity = '1';
            }
        }, 250);
    };

    // Aplicar estilos de transición al cargar
    const imgEl    = document.getElementById('display-logo');
    const nombreEl = document.getElementById('partner-nombre');
    const descripEl = document.getElementById('partner-descripcion');
    if (imgEl)    imgEl.style.transition    = 'opacity 0.25s ease';
    if (nombreEl) nombreEl.style.transition = 'opacity 0.25s ease';
    if (descripEl) descripEl.style.transition = 'opacity 0.25s ease';

    // Marcar Microsoft como activo por defecto
    const defaultSpan = document.querySelector('.partners-tags span[onclick*="msft"]');
    if (defaultSpan) defaultSpan.classList.add('partner-active');


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
    const featuredItems     = document.querySelectorAll('.featured-item');
    const featuredPrev      = document.getElementById('featured-prev');
    const featuredNext      = document.getElementById('featured-next');

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

        setInterval(() => { goToSlide(currentIndex + 1); }, intervalMs);

        featuredPrev?.addEventListener('click', () => { goToSlide(currentIndex - 1); });
        featuredNext?.addEventListener('click', () => { goToSlide(currentIndex + 1); });

        featuredContainer.addEventListener('scroll', () => {
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(() => {
                const rawIndex = featuredContainer.scrollLeft / featuredContainer.clientWidth;
                currentIndex = Math.round(rawIndex);
            }, 120);
        }, { passive: true });
    }

    /* =========================================
        7. REVEAL ANIMATION
       ========================================= */
    const reveals = document.querySelectorAll(".reveal, .pro-card, .about-container");

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) el.classList.add("active");
        });
    };

    window.addEventListener("scroll", checkReveal);
    checkReveal();

    /* =========================================
        8. ARTÍCULOS IDA 360 (Mostrar/Ocultar)
       ========================================= */
    document.querySelectorAll('.ida-toggle-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const targetId    = button.getAttribute('data-target');
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
        9. ENLACES ACTIVOS
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