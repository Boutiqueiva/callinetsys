// servicios.js - Lógica del slider de servicios

document.addEventListener("DOMContentLoaded", function() {
    // Elementos del slider
    const sliderWrapper = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Crear puntos de navegación
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Ir a un slide específico
    function goToSlide(index) {
        // Validar índice
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Remover clases activas
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Actualizar slide actual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Mover slide (para los botones)
    window.moveSlide = function(direction) {
        goToSlide(currentSlide + direction);
    };
    
    // Auto-slide cada 5 segundos
    let slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
    
    // Pausar auto-slide al hacer hover
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            moveSlide(1);
        }, 5000);
    });
    
    // Inicializar
    createDots();
    
    // Asegurar que el primer slide esté activo
    slides[0].classList.add('active');
    
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveSlide(-1);
        } else if (e.key === 'ArrowRight') {
            moveSlide(1);
        }
    });
});