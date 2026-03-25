// servicios.js — Callinetsys
// Slider 1: Servicios Principales (.slide)
// Slider 2: Colegios y Conectividad (.slide2)
// Slider C: Campus Highlight (.slideC)

document.addEventListener("DOMContentLoaded", function () {

    /* ═══════════════════════════════════════
       FUNCIÓN GENÉRICA DE SLIDER
       ═══════════════════════════════════════ */
    function initSlider(options) {
        var slides        = document.querySelectorAll(options.slideSelector);
        var dotsContainer = document.getElementById(options.dotsId);
        var btnPrev       = document.getElementById(options.prevId);
        var btnNext       = document.getElementById(options.nextId);
        var current       = 0;
        var total         = slides.length;
        var autoInterval  = null;

        if (!total) return;

        /* Crear dots */
        for (var i = 0; i < total; i++) {
            (function(idx) {
                var dot = document.createElement("span");
                dot.classList.add("dot");
                if (idx === 0) dot.classList.add("active");
                dot.addEventListener("click", function () { goTo(idx); });
                dotsContainer.appendChild(dot);
            })(i);
        }

        function updateDots() {
            var dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach(function (d, i) {
                d.classList.toggle("active", i === current);
            });
        }

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            slides[current].classList.remove("active");
            slides[index].classList.add("active");
            current = index;
            updateDots();
        }

        /* Botones */
        if (btnPrev) btnPrev.addEventListener("click", function () { goTo(current - 1); });
        if (btnNext) btnNext.addEventListener("click", function () { goTo(current + 1); });

        /* Auto-slide */
        function startAuto() {
            autoInterval = setInterval(function () { goTo(current + 1); }, 5000);
        }
        function stopAuto() { clearInterval(autoInterval); }

        var wrapper = document.getElementById(options.wrapperId);
        if (wrapper) {
            wrapper.addEventListener("mouseenter", stopAuto);
            wrapper.addEventListener("mouseleave", startAuto);
        }

        startAuto();

        return goTo;
    }

    /* ═══════════════════════════════════════
       SLIDER 1 — Servicios Principales
       ═══════════════════════════════════════ */
    initSlider({
        slideSelector: ".slide",
        dotsId:        "dots1",
        prevId:        "s1-prev",
        nextId:        "s1-next",
        wrapperId:     "slider1"
    });

    /* ═══════════════════════════════════════
       SLIDER 2 — Colegios y Conectividad
       ═══════════════════════════════════════ */
    var goToSlide2 = initSlider({
        slideSelector: ".slide2",
        dotsId:        "dots2",
        prevId:        "s2-prev",
        nextId:        "s2-next",
        wrapperId:     "slider2"
    });

    /* ═══════════════════════════════════════
       SLIDER C — Campus Highlight (2 slides)
       ═══════════════════════════════════════ */
    initSlider({
        slideSelector: ".slideC",
        dotsId:        "dotsC",
        prevId:        "sc-prev",
        nextId:        "sc-next",
        wrapperId:     "sliderC"
    });

    /* ═══════════════════════════════════════
       DEEP LINK — ?slide2=N
       ═══════════════════════════════════════ */
    (function () {
        var params = new URLSearchParams(window.location.search);
        var idx    = parseInt(params.get("slide2"), 10);
        if (!isNaN(idx) && goToSlide2) {
            goToSlide2(idx);
            var section = document.getElementById("slider2");
            if (section) {
                setTimeout(function () {
                    section.closest(".servicios-slider").scrollIntoView({ behavior: "smooth", block: "start" });
                }, 200);
            }
        }
    })();

    /* ═══════════════════════════════════════
       SMART NAVBAR
       ═══════════════════════════════════════ */
    (function () {
        var navbar     = document.getElementById("navbar");
        var lastScroll = window.scrollY;
        var ticking    = false;

        function update() {
            var now = window.scrollY;
            if (now <= 10)             navbar.classList.remove("navbar-hidden");
            else if (now > lastScroll) navbar.classList.add("navbar-hidden");
            else                       navbar.classList.remove("navbar-hidden");
            lastScroll = now;
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
    })();

    /* ═══════════════════════════════════════
       HAMBURGER
       ═══════════════════════════════════════ */
    (function () {
        var hamburger = document.getElementById("hamburger");
        var navLinks  = document.getElementById("nav-links");
        var overlay   = document.getElementById("nav-overlay");

        function toggle(open) {
            hamburger.classList.toggle("active", open);
            navLinks.classList.toggle("active", open);
            overlay.classList.toggle("active", open);
            document.body.style.overflow = open ? "hidden" : "";
        }

        hamburger.addEventListener("click", function () { toggle(!navLinks.classList.contains("active")); });
        overlay.addEventListener("click",   function () { toggle(false); });
        navLinks.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () { toggle(false); });
        });
    })();

    /* ═══════════════════════════════════════
       CHAT TRIGGER
       ═══════════════════════════════════════ */
    (function () {
        var chat = document.getElementById("chat-trigger");
        function check() { chat.classList.toggle("visible", window.scrollY > 180); }
        check();
        window.addEventListener("scroll", check, { passive: true });
    })();

});