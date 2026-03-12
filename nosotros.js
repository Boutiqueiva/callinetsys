document.addEventListener("DOMContentLoaded", () => {

    const areas = [
        {
            title: "Infraestructura",
            text: `<p>Diseño e implementación de infraestructura tecnológica certificada, garantizando estabilidad, rendimiento y escalabilidad para tu empresa.</p>`,
            img: "infraestructura.webp"
        },
        {
            title: "Microsoft Azure & Office 365",
            text: `<p>Implementamos soluciones en la nube para mejorar productividad, colaboración y seguridad empresarial.</p>`,
            img: "office-365.webp"
        },
        {
            title: "Virtualización",
            text: `<p>Optimización de recursos mediante entornos virtuales eficientes, flexibles y altamente disponibles.</p>`,
            img: "virtualizacion.webp"
        },
        {
            title: "Voz y Cámaras IP",
            text: `<p>Soluciones de comunicación y videovigilancia IP para empresas modernas y seguras.</p>`,
            img: "voz y camara.png"
        },
        {
            title: "Internet y Fibra Óptica",
            text: `<p>Conectividad empresarial confiable y de alta velocidad mediante enlaces dedicados y fibra óptica.</p>`,
            img: "fibra.webp"
        },
        {
            title: "Licenciamiento",
            text: `<p>Asesoría y suministro de licencias originales de software para cumplir normativas y optimizar costos.</p>`,
            img: "licencia.png"
        },
        {
            title: "Seguridad",
            text: `<p>Protección de la información mediante firewalls, antivirus, respaldos y políticas de ciberseguridad.</p>`,
            img: "seg.webp"
        },
        {
            title: "Venta de Hardware",
            text: `<p>Suministro de equipos de cómputo, servidores y accesorios de marcas líderes.</p>`,
            img: "inter.jpg"
        }
    ];

    const menuItems = document.querySelectorAll(".especializacion-menu li");
    const img = document.getElementById("especializacion-img");
    const text = document.getElementById("especializacion-text");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const data = areas[parseInt(item.dataset.index)];
            if (!data) return;

            img.style.opacity = "0";
            text.style.opacity = "0";

            setTimeout(() => {
                img.src = data.img;
                img.alt = data.title;
                text.innerHTML = `<h3>${data.title}</h3>${data.text}`;
                img.style.transition = "opacity 0.35s ease";
                text.style.transition = "opacity 0.35s ease";
                img.style.opacity = "1";
                text.style.opacity = "1";
            }, 200);
        });
    });
});