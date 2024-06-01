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
}
