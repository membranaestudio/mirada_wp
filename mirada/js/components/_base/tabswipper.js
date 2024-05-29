export default class SVGSwipper extends BaseComponent {
  constructor({
    name,
    loadInnerComponents,
    parent,
    element
  }) {
    super({
      name,
      loadInnerComponents,
      parent,
      element,
      // Component default options
      defaults: {},
      // Component inner elements
      innerElements: {}
    });
    // Setup the component and run init() function
    this.setup();
  }
  
  // Component code goes here
  init() {
    // You can organize it in functions
    this.mySwiper();
    this.setupSVGListeners();
  }

mySwiper() {
  this.swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });

  this.swiper.on('slideChange', () => {
    // Elimina la clase 'active' de todos los elementos SVG
    const elements = [
      'planificacion-familiar',
      'asesorias-financieras',
      'asesorias-inversiones',
      'gestion-legal',
      'directorio-familiar',
      'gobierno-familiar',
      'informacion-consolidada',

      // Añade aquí los IDs de tus otros elementos SVG
    ];
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove('active');
      }
    });

    // Añade la clase 'active' al elemento SVG correspondiente al slide actual
    // Ajustando el índice para saltar el primer slide si es necesario
    const activeIndex = this.swiper.activeIndex - 1; // Ajusta el índice aquí
    // Asegúrate de que el índice ajustado no sea negativo
    if (activeIndex >= 0) {
      const activeElementId = elements[activeIndex]; // Asegúrate de que este mapeo sea correcto
      const activeElement = document.getElementById(activeElementId);
      if (activeElement) {
        activeElement.classList.add('active');
      }
    }
  });
}

  setupSVGListeners() {
  const elements = [
    { id: 'planificacion-familiar', slideIndex: 1 },
    { id: 'asesorias-financieras', slideIndex: 2 },
    { id: 'asesorias-inversiones', slideIndex: 3 },
    { id: 'gestion-legal', slideIndex: 4 },
    { id: 'directorio-familiar', slideIndex: 5 },
    { id: 'gobierno-familiar', slideIndex: 5 },
    { id: 'informacion-consolidada', slideIndex: 5 },
    // Agrega más elementos según sea necesario
  ];

  elements.forEach(({ id, slideIndex }) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', () => {
        this.swiper.slideTo(slideIndex);

        // Remueve la clase 'active' de todos los elementos
        elements.forEach(({ id }) => {
          const el = document.getElementById(id);
          if (el) {
            el.classList.remove('active');
          }
        });

        // Agrega la clase 'active' al elemento clickeado
        element.classList.add('active');
      });
    }
  });
}
}