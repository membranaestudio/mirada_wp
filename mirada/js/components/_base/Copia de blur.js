export default class Blur extends BaseComponent {
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
    this.positionBlur();
  }



  positionBlur() {
    function ajustarPosicion() {
      const contentUnblurred = document.querySelector('.content-unblurred');
      const unblurred = document.querySelector('.unblurred');

      // Obtener dimensiones y posición
      const {
        width,
        height,
        top,
        left
      } = contentUnblurred.getBoundingClientRect();

      // Aplicar dimensiones y posición
      unblurred.style.width = `${width}px`;
      unblurred.style.height = `${height}px`;
      unblurred.style.top = `${top}px`;
      unblurred.style.left = `${left}px`;
    }

    // Ajustar al cargar
    ajustarPosicion();

    // Ajustar al cambiar el tamaño de la ventana
    window.addEventListener('resize', ajustarPosicion);



  }


}