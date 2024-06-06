class BaseComponent extends BaseAnimation {
	constructor({
		name,
		element,
		loadInnerComponents,
		parent,
		defaults,
		innerElements
	}) {
		super();

		this.mounted = false;
		this.containerAnimation = undefined;
		this.ready = new Promise((resolve) => {
			this._setReady = resolve;
		});
		this.webGLReady = new Promise((resolve) => {
			this._setWebGLReady = resolve;
		});

		this.loadInnerComponents = loadInnerComponents;
		this.name = name;
		this.element = element;
		this.parent = parent;
		this.defaults = defaults;
		this.innerSelectors = innerElements;
		this.components = [];
		this.elements = {};
		this.options = {};
		this.lazy = null;

		// Component options
		this._updateOptions();

		// Component inner elements
		this._updateElements({
			container: this.element,
			elements: this.innerSelectors
		});
	}

	setup() {
		const AJAX = app.componentsManager.getComponentByName('AJAX');

		document.fonts.ready.then(() => this.mount()).then(() => {
			if (AJAX && AJAX.running) {
				this.init();

				document.addEventListener('arts/barba/transition/end/before', this._initAnimations.bind(this), {
					once: true
				});
			} else {
				this.init();
				this._initAnimations();
			}

			// Set component ready on the next tick
			gsap.ticker.add(this._setReady.bind(this), true, false);
		});
	}

	init() {

	}

	destroy() {

	}

	update() {
		this._updateOptions();
	}

	reload(options) {
		if (this.stReveal) {
			this.stReveal.kill();
		}

		if (this.stScrub) {
			this.stScrub.kill();
		}

		this.destroy();
		this._updateOptions({
			attributeSelector: options ? false : undefined,
			options
		});
		this.init();
		this._initAnimations();
	}

	mount() {
		return new Promise((resolve) => {
			// console.log(`Mounting component: ${this.name}...`);

			if (this.parent && this.parent.horizontalScroll) {
				this.horizontalScroll = this.parent.horizontalScroll;
				this.containerAnimation = this.horizontalScroll.getContainerAnimation(this.element);
			}

			if (this.mounted || !this.loadInnerComponents) {
				this.mounted = true;

				resolve(true);
			} else {

				Promise.all(app.componentsManager.init({
						storage: this.components,
						scope: this.element,
						parent: this,
						nameAttribute: 'data-arts-component-name',
						optionsAttribute: 'data-arts-component-options',
					}))
					.then(() => {
						this._initSplitText();
						this._initLazyMedia();
						this.mounted = true;

						resolve(true);
					});
			}
		});
	}

	destroySplitText() {
		this.splitObserver.disconnect();
		this.splitTextInstance.forEach(instance => {
			instance.destroy();
		});
	}

	updateRef(key, componentName) {
		if (!key || !componentName) {
			return;
		}

		if (!this[key]) {
			this[key] = app.componentsManager.getComponentByName(componentName);
		}

		return this[key];
	}

	setLoading(loading = true) {
		if (!!app.options.cursorLoading) {
			this.element.classList.toggle('cursor-progress', loading);
		}
	}

	_initLazyMedia() {
		const lazyMedia = [...this.element.querySelectorAll('.lazy:not(:scope [data-arts-component-name] .lazy)')];

		if (lazyMedia.length) {
			lazyMedia.forEach((element) => {
				const
					parent = element.parentElement,
					width = element.getAttribute('width'),
					height = element.getAttribute('height'),
					isBackground = window.getComputedStyle(element).position === 'absolute',
					isFullheight = element.classList.contains('full-height') || element.classList.contains('hs-full-height');

				if (!isBackground && !isFullheight && parent && width && height && !element.closest('.custom-aspect-ratio') && !element.closest('.auto-width-height')) {
					parent.style.setProperty('--media-width', width);
					parent.style.setProperty('--media-height', height);
					parent.classList.add('has-aspect-ratio');


					// if (CSS.supports('aspect-ratio", "1 / 1')) {
					// 	element.parentElement.style.aspectRatio = `${width} / ${height}`;
					// } else {
					// }
				}
			});

			ScrollTrigger.create({
				trigger: this.element,
				start: () => `top-=1000px bottom`,
				scrub: false,
				containerAnimation: this.containerAnimation,
				once: true,
				onEnter: () => {
					lazyMedia.forEach((el) => {
						LazyLoad.load(el);
					});
				}
			});
		}
	}

	_initSplitText() {
		const splitTarget = this._getScopedAnimationElements();
		let options = {
			init: true,
			type: 'lines',
			set: {
				type: 'lines',
				direction: 'y',
				distance: '100%',
				opacity: false
			},
			wrap: 'lines',
			wrapClass: 'overflow-hidden',
		};

		this.splitTextInstance = [];
		this.splitTextTriggered = false;
		this.splitObserver = new ResizeObserver(app.utilities.debounce(this._onSplitTextResize.bind(this), 50));

		splitTarget.forEach((el, index) => {
			const presetAttribute = el.getAttribute('data-arts-split-text-preset');
			this._svgCircle(el);
			this._svgCircle2(el);
			this._svgLine(el);
			this._svgLine2(el);
			this._svgLine3(el);
			this._svgSun(el);
			this._svgSun2(el);
			this._svgSun3(el);
			this._svgBoth(el);

			if (presetAttribute && presetAttribute in app.animations.splitTextPresets) {
				options = app.animations.splitTextPresets[presetAttribute];
			}

			try {
				this.splitTextInstance[index] = new ArtsSplitText(el, options);

				this.splitObserver.observe(el);
			} catch (error) {
				console.error(`An error occured in component ${this.name}: ${error}`);
			}
		});
	}

	_svgCircle(el) {
		const outlines = [...el.querySelectorAll('.svg-circle u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="305.216" height="93.886" viewBox="0 0 305.216 93.886">
  <path id="Trazado_21" data-name="Trazado 21" class="cls-1" d="M773.278,55.441A327.317,327.317,0,0,0,653.845,71.493c-10.254,3.39-20.626,7.465-28.476,14.881s-12.695,18.921-9.493,29.234c3.893,12.536,17.7,19.053,30.542,21.765,9.97,2.1,20.177,2.817,30.347,3.432,69.88,4.225,141.559,3.85,207.812-18.767,10.632-3.63,21.675-8.275,28.171-17.442,3.122-4.4,5.016-9.932,4.033-15.241-1.723-9.317-11.215-14.87-19.989-18.445C857.756,55,814.541,53.718,772.4,52.649c-18.767-.477-37.542-.953-56.311-.594" transform="translate(-613.354 -50.456)"/>
</svg>

`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelector('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {
						drawSVG: '0% 0%'
					});
				}
			});
		}
	}

	_svgCircle2(el) {
		const outlines = [...el.querySelectorAll('.svg-circle-2 u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="377.614" height="168.189" viewBox="0 0 377.614 168.189">
  <path id="Trazado_20" data-name="Trazado 20" class="cls-1" d="M348.263,179.829a1119.285,1119.285,0,0,1,121.286,2.165c11.174.808,22.366,1.784,33.563,1.409,13.9-.465,27.643-3,41.32-5.535l35.688-6.6c17.107-3.167,34.686-6.512,49.393-15.808s26.063-26.074,23.725-43.315c-1.665-12.3-9.992-22.912-20.119-30.087s-22-11.4-33.744-15.419c-31.793-10.877-64.166-20.936-97.6-24.258-37.427-3.719-75.153,1.1-112.282,7.108C353.3,55.339,315.89,62.918,286.5,84.846c-2.991,2.232-6.034,4.822-7.1,8.4-1.848,6.216,2.963,12.391,8.027,16.442,10.52,8.419,23.363,13.306,36,17.99,100.821,37.378,204.529,70.435,311.744,78.6" transform="translate(-277.444 -39.585)"/>
</svg>
`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelector('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {
						drawSVG: '0% 0%'
					});
				}
			});
		}
	}

	_svgLine(el) {
		const outlines = [...el.querySelectorAll('.svg-line u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="574.518" height="7.929" viewBox="0 0 574.518 7.929">
  <path id="Trazado_22" data-name="Trazado 22" class="cls-1" d="M867.15,81.563l212.111-2.793q31.909-.421,63.817-.84c99.509-1.312,199.075-2.622,298.509,1.429" transform="translate(-867.13 -75.134)"/>
</svg>
`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelector('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {
						drawSVG: '0% 0%',
					});

				}
			});
		}
	}

	_svgLine2(el) {
		const outlines = [...el.querySelectorAll('.svg-line-2 u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1262.518" height="23.733" viewBox="0 0 1262.518 23.733">
  <path id="Trazado_23" data-name="Trazado 23" class="cls-1" d="M1257.993,95.028c59.655,9.172,120.288,9.322,180.644,9.268q540.924-.494,1081.591-20.732" transform="translate(-1257.765 -82.064)"/>
</svg>

`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelector('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {
						drawSVG: '0% 0%',
					});

				}
			});
		}
	}

	_svgLine3(el) {
		const outlines = [...el.querySelectorAll('.svg-line-3 u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1262.518" height="23.733" viewBox="0 0 1262.518 23.733">
  <path id="Trazado_25" data-name="Trazado 25" class="cls-1" d="M1257.993,95.028c59.655,9.172,120.288,9.322,180.644,9.268q540.924-.494,1081.591-20.732" transform="translate(-1257.765 -82.064)"/>
</svg>
`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelector('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {
						drawSVG: '0% 0%',
					});

				}
			});
		}
	}


	_svgSun(el) {
		const outlines = [...el.querySelectorAll('.svg-sun u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="138.36" height="160" viewBox="0 0 138.36 160">
  <g id="Grupo_1" data-name="Grupo 1" transform="translate(1.396 0.969)">
    <path id="Trazado_2" data-name="Trazado 2" class="cls-1" d="M-1015.542,157.327c12.916-12.036,15.933-31.561,27.337-45.039" transform="translate(1083.483 -112.288)"/>
    <path id="Trazado_3" data-name="Trazado 3" class="cls-1" d="M-1006.832,151.338a473.026,473.026,0,0,1,53.25,19.551" transform="translate(1089.946 -83.31)"/>
    <path id="Trazado_4" data-name="Trazado 4" class="cls-1" d="M-1014.592,177.584a161.612,161.612,0,0,0,34.922,44.16" transform="translate(1084.188 -63.834)"/>
    <path id="Trazado_5" data-name="Trazado 5" class="cls-1" d="M-1029.1,176.508a102.906,102.906,0,0,0-25.445,37.355" transform="translate(1054.542 -64.632)"/>
  </g>
</svg>

`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelectorAll('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {

						drawSVG: '0% 0%',
					});
				}
			});

		}
	}


	_svgSun2(el) {
		const outlines = [...el.querySelectorAll('.svg-sun-2 u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="137.013" height="164.413" viewBox="0 0 137.013 164.413">
  <g id="Grupo_2" data-name="Grupo 2" transform="translate(1.448 0.392)">
    <path id="Trazado_6" data-name="Trazado 6" class="cls-1" d="M-707.119,71.579c-2.568-17.466-16.922-31.044-21.539-48.085" transform="translate(728.658 -23.494)"/>
    <path id="Trazado_7" data-name="Trazado 7" class="cls-1" d="M-700.486,65.359a472.664,472.664,0,0,1,46.339-32.716" transform="translate(749.564 -16.705)"/>
    <path id="Trazado_8" data-name="Trazado 8" class="cls-1" d="M-683.294,74.276a161.551,161.551,0,0,0,56.18-3.655" transform="translate(762.321 11.478)"/>
    <path id="Trazado_9" data-name="Trazado 9" class="cls-1" d="M-698.577,92.965a102.931,102.931,0,0,0,16.288,42.162" transform="translate(750.98 28.058)"/>
  </g>
</svg>
`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelectorAll('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {

						drawSVG: '0% 0%',
					});
				}
			});

		}
	}


	_svgSun3(el) {
		const outlines = [...el.querySelectorAll('.svg-sun-3 u')];
		const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="179.638" height="194.738" viewBox="0 0 179.638 194.738">

  <g id="Grupo_6" data-name="Grupo 6" transform="translate(0.64 0.185)">
    <path id="Trazado_10" data-name="Trazado 10" class="cls-1" d="M-504.828,80.031a466.729,466.729,0,0,1,3.272-73.857" transform="translate(589.165 -6.174)"/>
    <path id="Trazado_11" data-name="Trazado 11" class="cls-1" d="M-491.015,66.071l47.238-32.183c6.81-4.639,14.8-9.5,22.757-7.359" transform="translate(599.628 8.544)"/>
    <path id="Trazado_13" data-name="Trazado 13" class="cls-1" d="M-507.83,78.57c1.955,22.786-2.97,45.524-5.1,68.294" transform="translate(583.368 47.549)"/>
    <path id="Trazado_14" data-name="Trazado 14" class="cls-1" d="M-553.362,90.01l60.337-28.458" transform="translate(553.362 34.92)"/>
    <path id="Trazado_15" data-name="Trazado 15" class="cls-1" d="M-539.89,12.243a327.157,327.157,0,0,1,43.8,59.927" transform="translate(563.359 -1.67)"/>
  </g>
</svg>

`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelectorAll('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {

						drawSVG: '0% 0%',
					});
				}
			});

		}
	}


	_svgBoth(el) {
		const outlines = [...el.querySelectorAll('.svg-both u')];
		const circleSVG = `
<svg class="svg-1" xmlns="http://www.w3.org/2000/svg" width="137.013" height="164.413" viewBox="0 0 137.013 164.413">
  <g id="Grupo_2" data-name="Grupo 2" transform="translate(1.448 0.392)">
    <path id="Trazado_6" data-name="Trazado 6" class="cls-1" d="M-707.119,71.579c-2.568-17.466-16.922-31.044-21.539-48.085" transform="translate(728.658 -23.494)"/>
    <path id="Trazado_7" data-name="Trazado 7" class="cls-1" d="M-700.486,65.359a472.664,472.664,0,0,1,46.339-32.716" transform="translate(749.564 -16.705)"/>
    <path id="Trazado_8" data-name="Trazado 8" class="cls-1" d="M-683.294,74.276a161.551,161.551,0,0,0,56.18-3.655" transform="translate(762.321 11.478)"/>
    <path id="Trazado_9" data-name="Trazado 9" class="cls-1" d="M-698.577,92.965a102.931,102.931,0,0,0,16.288,42.162" transform="translate(750.98 28.058)"/>
  </g>
</svg>

<svg class="svg-2" xmlns="http://www.w3.org/2000/svg" width="574.518" height="7.929" viewBox="0 0 574.518 7.929">
  <path id="Trazado_22" data-name="Trazado 22" class="cls-1" d="M867.15,81.563l212.111-2.793q31.909-.421,63.817-.84c99.509-1.312,199.075-2.622,298.509,1.429" transform="translate(-867.13 -75.134)"/>
</svg>

`;

		if (outlines.length && typeof circleSVG === 'string') {
			this.elements.outlines = [];

			outlines.forEach((el) => {
				el.insertAdjacentHTML('beforeend', circleSVG);

				const outline = el.querySelectorAll('path');

				this.elements.outlines.push(outline);

				if (this._hasAnimationScene()) {
					gsap.set(outline, {

						drawSVG: '0% 0%',
					});
				}
			});

		}
	}



	_onSplitTextResize(entries) {
		if (!this.splitTextTriggered) {
			this.splitTextTriggered = true;
			return;
		}

		for (const entry of entries) {
			this.elements.outlines = [];
			this.splitTextInstance.forEach((instance) => {
				if (instance.containerElement === entry.target) {
					instance.destroy();

					if (entry.target.classList.contains('split-text-animation-revealed')) {
						[...entry.target.querySelectorAll('u ellipse')].forEach((el) => {
							el.style = null;
						});
					}

					const outlines = [...entry.target.querySelectorAll('u')];

					outlines.forEach((el) => {
						const underline = el.querySelector('ellipse');
						this.elements.outlines.push(underline);
					});

					instance.init();

					if (entry.target.classList.contains('split-text-animation-revealed')) {
						[...entry.target.querySelectorAll('u ellipse')].forEach((el) => {
							const parentOverflowLine = el.closest('.js-arts-split-text__wrapper-line');

							if (parentOverflowLine) {
								parentOverflowLine.classList.remove('overflow-hidden');
								parentOverflowLine.style.overflow = 'initial';
							}
						});
					}
				}
			});
		}
	}

	_setReady() {

	}

	_setWebGLReady() {

	}

	_isWebGLEnabled() {
		return !!this.options.webGL && !!this.options.webGL.enabled;
	}

	_updateOptions({
		container = this.element,
		target = this.options,
		defaults = this.defaults,
		attributeSelector = 'data-arts-component-options',
		options = {}
	} = {}) {
		if (!container) {
			return {};
		}

		let resultOptions = {};

		if (options && defaults) {
			resultOptions = deepmerge(defaults, options);
		}

		if (attributeSelector) {
			// attempt to find & parse inline options via attribute selector
			const inlineOptions = app.utilities.parseOptionsStringObject(container.getAttribute(attributeSelector));

			// override with inline options
			if (inlineOptions && Object.keys(inlineOptions).length !== 0) {
				resultOptions = deepmerge(resultOptions, inlineOptions);
			}
		}

		Object.assign(target, resultOptions);
	}

	_updateElements({
		container,
		elements
	}) {

		if (container && elements && typeof elements === 'object') {
			for (const key in elements) {
				const selector = `${elements[key]}`;
				// const selector = `${elements[key]}:not(:scope [data-arts-component-name] ${elements[key]})`;

				Object.assign(this.elements, {
					[key]: [...container.querySelectorAll(selector)]
				});
			}
		}
	}

	_getInnerComponentByName(name) {
		const index = this.components.findIndex(p => p.name === name);

		if (index > -1) {
			return this.components[index];
		} else {
			return false;
		}
	}
}
window.BaseComponent = BaseComponent;