document.addEventListener("DOMContentLoaded", () => {

    const areas = [
        {
            title: "Infraestructura",
            text: `
                <p>
                    Diseño e implementación de infraestructura tecnológica certificada,
                    garantizando estabilidad, rendimiento y escalabilidad para tu empresa.
                </p>
            `,
            img: "src/infraestructura.webp"
        },
        {
            title: "Microsoft Azure & Office 365",
            text: `
                <p>
                    Implementamos soluciones en la nube para mejorar productividad,
                    colaboración y seguridad empresarial.
                </p>
            `,
            img: "src/office-365.webp"
        },
        {
            title: "Virtualización",
            text: `
                <p>
                    Optimización de recursos mediante entornos virtuales eficientes,
                    flexibles y altamente disponibles.
                </p>
            `,
            img: "src/virtualizacion.webp"
        },
        {
            title: "Voz y Cámaras IP",
            text: `
                <p>
                    Soluciones de comunicación y videovigilancia IP para empresas
                    modernas y seguras.
                </p>
            `,
            img: "src/voz y camara.png"
        },
        {
            title: "Internet y Fibra Óptica",
            text: `
                <p>
                    Conectividad empresarial confiable y de alta velocidad mediante
                    enlaces dedicados y fibra óptica.
                </p>
            `,
            img: "img/fibra.jpg"
        },
        {
            title: "Licenciamiento",
            text: `
                <p>
                    Asesoría y suministro de licencias originales de software para
                    cumplir normativas y optimizar costos.
                </p>
            `,
            img: "img/licencias.jpg"
        },
        {
            title: "Seguridad",
            text: `
                <p>
                    Protección de la información mediante firewalls, antivirus,
                    respaldos y políticas de ciberseguridad.
                </p>
            `,
            img: "img/seguridad.jpg"
        },
        {
            title: "Venta de Hardware",
            text: `
                <p>
                    Suministro de equipos de cómputo, servidores y accesorios
                    de marcas líderes.
                </p>
            `,
            img: "img/hardware.jpg"
        }
    ];

    const menuItems = document.querySelectorAll(".nosotros-menu li");
    const content = document.querySelector(".nosotros-content");
    const textBox = document.getElementById("nosotros-text");
    const image = document.getElementById("nosotros-img");

    // estado inicial
    content.classList.add("fade-in");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {

            // activar menú
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const index = item.dataset.index;
            const data = areas[index];
            if (!data) return;

            // fade out
            content.classList.remove("fade-in");
            content.classList.add("fade-out");

            setTimeout(() => {

                // cambiar contenido
                textBox.innerHTML = `
                    <h3>${data.title}</h3>
                    ${data.text}
                `;

                image.src = data.img;
                image.alt = data.title;

                // fade in
                content.classList.remove("fade-out");
                content.classList.add("fade-in");

            }, 600); // ⏱️ mismo tiempo que el CSS
        });
    });

});
