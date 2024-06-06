export default class WidthHeight extends BaseComponent {
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
    // Bind the methods to ensure 'this' context is correct
    this.WidthHeight = this.WidthHeight.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // Setup the component and run init() function
    this.setup();
  }

  // Component code goes here
  init() {
    // You can organize it in functions
    this.WidthHeight();
    this.animatedCircle();
    this.scaleItem();
    // Add event listeners
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('load', this.handleResize);
  }

  WidthHeight() {
    const items = document.querySelectorAll('.item-with-height');
    items.forEach(container => {
      const width = container.offsetWidth;
      container.style.height = `${width}px`;
    });
  }

  handleResize() {
    this.WidthHeight();
  }

  animatedCircle() {
    return new Promise(resolve => {
      const trigger = document.querySelector('.circles-wrapper');
      const pointerEventsNoneElement = document.querySelector('.pointer-events-none');
      let maxDuration = 0;

      for (let i = 1; i <= 8; i++) {
        const duration = 0.4 + (i * 0.2);
        maxDuration = Math.max(maxDuration, duration);

        gsap.fromTo(`.item-${i}`, {
          scale: 0,
        }, {
          scale: 1,
          duration: duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top center',
          }
        });
      }

      // Resuelve la promesa después de que la animación más larga haya terminado
      setTimeout(() => {
        pointerEventsNoneElement.classList.remove('pointer-events-none');
        resolve();
      }, (maxDuration * 1000) - 500); // Resta 1 segundo del tiempo total
    });
  }

  scaleItem() {
    // Selecciona todos los elementos con la clase 'item'
    const items = document.querySelectorAll('.item');

    // Agrega un controlador de eventos de 'mouseover' a cada elemento
    items.forEach(item => {
      item.addEventListener('mouseover', function () {
        // Agrega la clase 'hovered' al elemento que tiene el mouse encima
        item.classList.add('hovered');

        // Agrega la clase 'not-hovered' a todos los demás elementos
        items.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.add('not-hovered');
            gsap.to(otherItem, { scale: 0.85, duration: 0.5, ease: "power1.out" });
          }
        });
      });

      // Agrega un controlador de eventos de 'mouseout' para eliminar la clase 'hovered' y 'not-hovered' cuando el mouse ya no está sobre el elemento
      item.addEventListener('mouseout', function () {
        item.classList.remove('hovered');

        items.forEach(otherItem => {
          otherItem.classList.remove('not-hovered');
          gsap.to(otherItem, { scale: 1, duration: 0.5, ease: "power1.out" });
        });
      });
    });
  }

}