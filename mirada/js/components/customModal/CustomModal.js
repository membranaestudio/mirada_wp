export default class CustomModal extends BaseComponent {
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
      defaults: {},
      innerElements: {
        modal: 'dialog',
        closeBtn: '.close-btn',
        iframe: 'iframe'
      }
    });

    this.setup();
  }

  init() {
      this.element.addEventListener('animationend', this.resetAnimationClass.bind(this))
      this.wraper= document.querySelector('[data-barba="wrapper"]')
      this.container = document.getElementById('page-wrapper__content')
      this.element.addEventListener('close', this.back.bind(this));
      this.element.addEventListener('cancel', this.back.bind(this));
      this.elements.closeBtn.forEach(btn => btn.addEventListener('click', this.cerrar.bind(this)));
      const openers = document.querySelectorAll(this.options.openers)    
      openers.forEach(element => {
        element.addEventListener('click', this.abrir.bind(this))}
        )
      this.scroll = window.app.componentsManager.instances.persistent[0].instance
  }

  abrir(){
      if (this.scroll){
        this.scroll.options.smoothWheel = false
      }
      this.wraper.prepend(this.element)
      this.element.classList.add('show')
      document.body.classList.add('overflow-hidden')
  }

  destroy(){
    document.body.classList.remove('overflow-hidden')
    this.element.parentNode.removeChild(this.element)
    if (this.scroll){
      this.scroll.options.smoothWheel = true
    }
  }

  cerrar(){
    if (this.scroll){
      this.scroll.options.smoothWheel = true
    }
    this.element.classList.add('hidde')
    document.body.classList.remove('overflow-hidden')
  }
  
  resetAnimationClass({animationName, target}){
    if (animationName === "hidde-modal"){
      target.classList.remove("show", "hidde")
      this.container.prepend(this.element)
    }
  }

  back(){
      this.elements.iframe.forEach(iframe => {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}
        )
      if (this.scroll) {
        this.scroll.options.smoothWheel = true
      }
  }

}