document.addEventListener("DOMContentLoaded", () => {
  const areas = [
    {
      title: "Infraestructura",
      text: `
<p>
Diseño e implementación de infraestructura tecnológica certificada
garantizando estabilidad, rendimiento y escalabilidad para tu empresa.
</p>
`,
      img: "/src/infraestructura.webp",
    },

    {
      title: "Microsoft Azure & Office 365",
      text: `
<p>
Implementamos soluciones en la nube para mejorar productividad,
colaboración y seguridad empresarial.
</p>
`,
      img: "/src/office-365.webp",
    },

    {
      title: "Virtualización",
      text: `
<p>
Optimización de recursos mediante entornos virtuales eficientes,
flexibles y altamente disponibles.
</p>
`,
      img: "/src/virtualizacion.webp",
    },

    {
      title: "Voz y Cámaras IP",
      text: `
<p>
Soluciones de comunicación y videovigilancia IP para empresas
modernas y seguras.
</p>
`,
      img: "/src/voz-camara.png",
    },

    {
      title: "Internet y Fibra Óptica",
      text: `
<p>
Conectividad empresarial confiable mediante enlaces dedicados
y redes de fibra óptica de alta velocidad.
</p>
`,
      img: "/src/fibra.webp",
    },

    {
      title: "Licenciamiento",
      text: `
<p>
Suministro y gestión de licencias oficiales para software empresarial
optimizando costos y cumplimiento normativo.
</p>
`,
      img: "/src/licencia.png",
    },

    {
      title: "Seguridad",
      text: `
<p>
Protección de infraestructura mediante firewalls, antivirus,
respaldos automáticos y políticas de ciberseguridad.
</p>
`,
      img: "/src/seg.webp",
    },

    {
      title: "Venta de Hardware",
      text: `
<p>
Equipos de cómputo, servidores, switches y routers de marcas
líderes con soporte especializado.
</p>
`,
      img: "/src/inter.jpg",
    },
  ];

  const menuItems = document.querySelectorAll(".nosotros-menu li");
  const content = document.querySelector(".nosotros-content");
  const textBox = document.getElementById("nosotros-text");
  const image = document.getElementById("nosotros-img");

  content.classList.add("fade-in");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const index = item.dataset.index;
      const data = areas[index];
      if (!data) return;

      content.classList.remove("fade-in");
      content.classList.add("fade-out");

      setTimeout(() => {
        textBox.innerHTML = `
<h3>${data.title}</h3>
${data.text}
`;

        image.src = data.img;
        image.alt = data.title;

        content.classList.remove("fade-out");
        content.classList.add("fade-in");
      }, 500);
    });
  });
});
