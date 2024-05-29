export default class Swipper extends BaseComponent {
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
  }

  mySwiper() {
     var swiper = new Swiper(".SwiperHacemos", {
      autoHeight: true,
      grabCursor: true,
      loop: true,
      speed: 1000,
      pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
      
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

  }


}