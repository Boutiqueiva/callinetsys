document.addEventListener('DOMContentLoaded', function() {
    const chatTrigger = document.getElementById('chat-trigger');
    if (!chatTrigger) return;

    const panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.innerHTML = `
        <div class="chatbot-header">
            <strong>Asistente Callinetsys</strong>
            <button type="button" class="chatbot-close" aria-label="Cerrar chat">&times;</button>
        </div>

        <div class="chatbot-messages" id="chatbot-messages"></div>

        <div class="chatbot-suggestions">
            <button type="button" id="chatbot-suggest-btn" class="chatbot-suggest-btn">
                Sugerencias de temas
            </button>
        </div>

        <div class="chatbot-quick" id="chatbot-quick" style="display:none;"></div>

        <div class="chatbot-input-wrap">
            <input type="text" id="chatbot-input" placeholder="Escribe tu pregunta..." autocomplete="off">
            <button type="button" id="chatbot-send">Enviar</button>
        </div>
    `;

    document.body.appendChild(panel);

    const messages = panel.querySelector('#chatbot-messages');
    const quick = panel.querySelector('#chatbot-quick');
    const input = panel.querySelector('#chatbot-input');
    const sendBtn = panel.querySelector('#chatbot-send');
    const closeBtn = panel.querySelector('.chatbot-close');
    const suggestBtn = panel.querySelector('#chatbot-suggest-btn');

    const quickQuestions = [
        '¿Instalan fibra óptica?',
        '¿Qué es Internet 7?',
        '¿Pueden modernizar la tecnología de un colegio?',
        '¿Ofrecen Wi-Fi para escuelas?',
        '¿Tienen seguridad con cámaras?',
        '¿Qué es Colegio Digital 360?',
        '¿Cómo los contacto?'
    ];

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function getAnswer(question) {
        const q = normalize(question);

        if (!q) return 'Escríbeme una pregunta y te ayudo enseguida.';

        if (q.includes('hola') || q.includes('buenas') || q.includes('hey')) {
            return 'Hola, soy el asistente de Callinetsys. ¿En qué te ayudo hoy?';
        }

        if (q.includes('servicio') || q.includes('ofrecen')) {
            return 'Ofrecemos soluciones como instalación de fibra óptica, conectividad empresarial, modernización tecnológica para colegios, redes Wi-Fi, seguridad inteligente y servicios administrados.';
        }

        if (q.includes('fibra')) {
            return 'Realizamos instalación profesional de cable de fibra óptica para empresas y colegios, asegurando máxima velocidad y estabilidad.';
        }

        if (q.includes('internet 7')) {
            return 'Internet 7 es nuestro servicio de conectividad empresarial con monitoreo continuo, cobertura especializada y soporte técnico.';
        }

        if (q.includes('modernizacion') || q.includes('modernizar')) {
            return 'Podemos modernizar la infraestructura tecnológica de tu colegio sin reemplazar todo el equipo, optimizando lo que ya tienes con un servicio mensual.';
        }

        if (q.includes('presupuesto')) {
            return 'Ofrecemos modernización tecnológica con presupuesto controlado para colegios privados sin inversión inicial elevada.';
        }

        if (q.includes('wifi') || q.includes('wi-fi')) {
            return 'Implementamos redes Wi-Fi modernas y estables para colegios y empresas, garantizando conectividad continua.';
        }

        if (q.includes('seguridad') || q.includes('camaras') || q.includes('videovigilancia')) {
            return 'Ofrecemos seguridad escolar inteligente con videovigilancia, control de accesos y redes seguras.';
        }

        if (q.includes('colegio digital') || q.includes('360')) {
            return 'Colegio Digital Accesible 360 integra red, sistemas, Wi-Fi y seguridad en un solo servicio administrado por mensualidad.';
        }

        if (q.includes('contacto') || q.includes('telefono') || q.includes('whatsapp')) {
            return 'Puedes contactarnos en la sección Contacto del sitio para recibir asesoría y cotización.';
        }

        return 'Puedo ayudarte con fibra óptica, Internet 7, modernización tecnológica, Wi-Fi escolar, seguridad y Colegio Digital 360.';
    }

    function addMessage(text, from) {
        const bubble = document.createElement('div');
        bubble.className = `chatbot-msg ${from === 'bot' ? 'bot' : 'user'}`;
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function ask(question) {
        const clean = question.trim();
        if (!clean) return;

        addMessage(clean, 'user');
        input.value = '';

        setTimeout(() => {
            addMessage(getAnswer(clean), 'bot');
        }, 350);
    }

    function togglePanel(forceOpen) {
        const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !panel.classList.contains('open');
        panel.classList.toggle('open', shouldOpen);

        if (shouldOpen) {
            input.focus();
        }
    }

    suggestBtn.addEventListener('click', () => {
        quick.style.display = quick.style.display === 'none' ? 'flex' : 'none';
    });

    quickQuestions.forEach((q) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chatbot-chip';
        btn.textContent = q;

        btn.addEventListener('click', () => {
            ask(q);
            quick.style.display = 'none';
        });

        quick.appendChild(btn);
    });

    addMessage('Hola. Soy tu asistente virtual de Callinetsys. ¿Qué deseas saber?', 'bot');

    chatTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        togglePanel();
    });

    closeBtn.addEventListener('click', function() {
        togglePanel(false);
    });

    sendBtn.addEventListener('click', function() {
        ask(input.value);
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            ask(input.value);
        }
    });
});