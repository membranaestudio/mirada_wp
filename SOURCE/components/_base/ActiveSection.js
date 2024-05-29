export default class ActiveSection extends BaseComponent {
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
    this.ActiveSection();
    this.BlackColor();
  }

  ActiveSection() {
    // get viewport height
    const getVh = () => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      return vh;
    }

    // get viewport width
    const getVw = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      return vw;
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {
      const navLinks = gsap.utils.toArray('.menu-fixed li');
      ScrollTrigger.create({
        trigger: stage,
        start: 'top center+=100',
        end: () => `+=${stage.clientHeight+getVh()/1000}`,
        toggleClass: {
          targets: navLinks[index],
          className: 'active'
        },
      })
    });


  }

BlackColor() {
  const equipoSection = document.querySelector('#equipo');
  const menuFixed = document.querySelector('.menu-fixed');
  ScrollTrigger.create({
    trigger: equipoSection,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      menuFixed.classList.add('blackcolor');
    },
    onEnterBack: () => {
      menuFixed.classList.add('blackcolor');
    },
    onLeave: () => {
      menuFixed.classList.remove('blackcolor');
    },
    onLeaveBack: () => {
      menuFixed.classList.remove('blackcolor');
    }
  });
}


}