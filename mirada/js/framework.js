class Animations {
	constructor({ duration } = {
		duration: 1.2
	}) {
		this.defaults = {
			duration
		};
		this.splitTextPresets = {
			'sliderLines': {
				init: true,
				type: 'lines',
				wrap: 'lines',
				set: false
			},
			'sliderChars': {
				type: 'lines,chars',
				wrap: 'chars',
				set: false
			},
			'counterChars': {
				init: true,
				type: 'chars',
				set: false,
				wrap: false
			},
			'animatedLines': {
				init: true,
				type: 'lines',
				set: {
					type: 'lines',
					direction: 'y',
					distance: '103%',
					opacity: false
				},
				wrap: 'lines',
				wrapClass: 'overflow-hidden',
			},
			'overlayMenuItem': {
				init: true,
				type: 'lines',
				set: {
					type: 'lines',
					direction: 'y',
					distance: '-103%',
					opacity: false
				},
				wrap: 'lines',
				wrapClass: 'overflow-hidden',
			},
			'animatedChars': {
				init: true,
				type: 'lines,words,chars',
				set: {
					type: 'chars',
					direction: 'y',
					distance: '103%',
					opacity: false
				},
				wrap: 'lines',
				wrapClass: 'overflow-hidden',
			},
			'animatedCharsRandom': {
				init: true,
				type: 'lines,words,chars',
				set: {
					type: 'chars',
					direction: 'y',
					distance: '103%',
					opacity: 1
				},
				wrap: 'lines',
				wrapClass: 'overflow-hidden',
			},
			'animatedCounterChars': {
				init: true,
				type: 'chars',
				set: {
					type: 'chars',
					direction: 'y',
					distance: '40%',
					opacity: 0
				},
				wrap: false
			},
		};

		this._animateTranslate();

		this._animateScale();

		this._animateMask();
		this._hideMask();

		this._animateCurtain();
		this._hideCurtain();
	}

	_animateTranslate() {
		gsap.registerEffect({
			name: 'animateTranslate',
			effect: (target, config) => {
				const tl = gsap.timeline();

				if (target && target[0]) {
					let
						initialConfig = {},
						targetConfig = {
							xPercent: 0,
							yPercent: 0,
							duration: config.duration,
							ease: config.ease,
							stagger: config.stagger
						};

					switch (config.animateFrom) {
						case 'top':
							initialConfig.yPercent = -100;
							break;
						case 'right':
							initialConfig.xPercent = 100;
							break;
						case 'left':
							initialConfig.xPercent = -100;
							break;
						case 'bottom':
							initialConfig.yPercent = 100;
							break;
					}

					if (typeof config.xPercent === 'number') {
						initialConfig.xPercent = config.xPercent;
					}

					if (typeof config.yPercent === 'number') {
						initialConfig.yPercent = config.yPercent;
					}

					if (!!config.animateOpacity) {
						initialConfig.opacity = 0;
						targetConfig.opacity = 1;
					}

					gsap.set(target, initialConfig);
					tl.to(target, targetConfig);

					if (!!config.clearProps && config.clearProps.length) {
						tl.set(target, {
							clearProps: config.clearProps
						});
					}
				}

				return tl;
			},
			defaults: {
				animateFrom: 'bottom',
				animateOpacity: false,
				animateSkew: false,
				xPercent: false,
				yPercent: false,
				duration: 1.2,
				ease: 'power4.out',
				stagger: 0,
				transformOrigin: 'center center',
				clearProps: 'transform,transformOrigin,opacity'
			},
			extendTimeline: true,
		});
	}

	_animateScale() {
		gsap.registerEffect({
			name: 'animateScale',
			effect: (target, config) => {
				const tl = gsap.timeline();

				if (target && target[0]) {
					let
						initialConfig = {},
						targetConfig = {
							duration: config.duration,
							ease: config.ease,
							stagger: config.stagger
						};

					switch (config.animateFrom) {
						case 'top':
							targetConfig.transformOrigin = 'center top';
							// initialConfig.scaleY = 0;
							targetConfig.scaleY = 1;
							break;
						case 'right':
							targetConfig.transformOrigin = 'right center';
							// initialConfig.scaleX = 0;
							targetConfig.scaleX = 1;
							break;
						case 'left':
							targetConfig.transformOrigin = 'left center';
							// initialConfig.scaleX = 0;
							targetConfig.scaleX = 1;
							break;
						case 'bottom':
							targetConfig.transformOrigin = 'center bottom';
							// initialConfig.scaleY = 0;
							targetConfig.scaleY = 1;
							break;
						case 'center':
							targetConfig.transformOrigin = 'center center';
							// initialConfig.scale = 0;
							targetConfig.scale = 1;
							break;
					}

					if (typeof config.scaleX === 'number') {
						// initialConfig.scaleX = config.scaleX;
						targetConfig.scaleX = 1;
					}

					if (typeof config.scaleY === 'number') {
						// initialConfig.scaleY = config.scaleY;
						targetConfig.scaleY = 1;
					}

					if (typeof config.scale === 'number') {
						// initialConfig.scale = config.scale;
						targetConfig.scale = 1;
					}

					// gsap.set(target, initialConfig);
					tl.to(target, targetConfig);

					if (!!config.clearProps && config.clearProps.length) {
						tl.set(target, {
							clearProps: config.clearProps
						});
					}
				}

				return tl;
			},
			defaults: {
				scaleX: false,
				scaleY: false,
				scale: false,
				animateFrom: 'center',
				duration: 0.6,
				ease: 'power4.out',
				clearProps: 'transform'
			},
			extendTimeline: true
		});
	}

	_animateMask() {
		gsap.registerEffect({
			name: 'animateMask',
			effect: (target, config) => {
				const tl = gsap.timeline({
					onStart: config.onStart,
					onComplete: config.onComplete,
				});

				if (target && target[0]) {
					let initialCP;

					if (config.shape === 'circle') {
						initialCP = `circle(0% at 50% 50%)`;
					} else if (config.shape === 'ellipse') {
						initialCP = `ellipse(50% 0% at 50% 50%)`;
					} else { // rectangle
						switch (config.animateFrom) {
							case 'top':
								initialCP = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
								break;
							case 'right':
								initialCP = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
								break;
							case 'left':
								initialCP = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
								break;
							case 'center':
								initialCP = 'inset(50%)';
								break;
							default:
								initialCP = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
								break;
						}
					}

					if (!!config.clipPathFrom) {
						gsap.set(target, {
							clipPath: initialCP,
							overwrite: config.overwrite
						});
					}

					let innerElement;

					if (typeof config.scaleInner === 'string') {
						innerElement = target[0].querySelector(config.scaleInner);
					}

					if (innerElement && !!config.scale) {
						gsap.set(innerElement, {
							transformOrigin: 'center center',
							scale: config.scale
						});
					}

					let clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

					if (config.animateFrom === 'center') {
						clipPath = `inset(0%)`;
					}

					if (config.shape === 'circle') {
						clipPath = `circle(100% at 50% 50%)`;
					} else if (config.shape === 'ellipse') {
						clipPath = `ellipse(100% 100% at 50% 50%)`;
					}

					tl.to(target, {
						x: config.x,
						y: config.y,
						clipPath,
						duration: config.duration,
						ease: config.ease,
						stagger: config.stagger,
					});

					if (innerElement && !!config.scale) {
						tl.to(innerElement, {
							scale: 1,
							duration: config.duration * 1.25,
							ease: config.ease
						}, '<');
					}

					if (!!config.clearProps && config.clearProps.length) {
						tl.set(target, {
							clearProps: config.clearProps
						});

						if (innerElement && !!config.scale) {
							tl.set(innerElement, {
								clearProps: 'transform'
							});
						}
					}
				}

				return tl;
			},
			defaults: {
				x: undefined,
				y: undefined,
				shape: 'rectangle',
				duration: this.defaults.duration,
				scale: 1.05,
				scaleInner: 'img,video',
				ease: 'expo.inOut',
				stagger: 0,
				animateFrom: 'bottom',
				clearProps: 'clipPath',
				clipPathFrom: true,
				overwrite: true
			},
			extendTimeline: true
		});
	}

	_hideMask() {
		gsap.registerEffect({
			name: 'hideMask',
			effect: (target, config) => {
				const tl = gsap.timeline({
					onStart: config.onStart,
					onComplete: config.onComplete,
				});

				if (target && target[0]) {

					switch (config.animateTo) {
						case 'top':
							config.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
							break;
						case 'right':
							config.clipPath = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
							break;
						case 'left':
							config.clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
							break;
						case 'center':
							config.clipPath = 'inset(50%)';
							break;
						default:
							config.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
							break;
					}

					if (!!config.clipPathFrom) {
						gsap.set(target, {
							clipPath: config.clipPathFrom,
							overwrite: config.overwrite
						});
					}

					let innerElement;

					if (typeof config.scaleInner === 'string') {
						innerElement = target[0].querySelector(config.scaleInner);
					}

					if (typeof config.duration === 'number' && config.duration > 0) {
						tl.to(target, {
							x: config.x,
							y: config.y,
							clipPath: config.clipPath,
							duration: config.duration,
							ease: config.ease,
							stagger: config.stagger
						});

						if (innerElement && !!config.scale) {
							tl.to(innerElement, {
								scale: config.scale,
								duration: config.duration,
								ease: config.ease
							}, '<');
						}

					} else {
						tl.set(target, {
							x: config.x,
							y: config.y,
							clipPath: config.clipPath
						});

						if (innerElement && !!config.scale) {
							tl.set(innerElement, {
								scale: config.scale
							}, '<');
						}
					}

					if (!!config.clearProps && config.clearProps.length) {
						tl.set(target, {
							clearProps: config.clearProps
						});

						if (innerElement && !!config.scale) {
							tl.set(innerElement, {
								clearProps: 'transform'
							});
						}
					}
				}

				return tl;
			},
			defaults: {
				x: undefined,
				y: undefined,
				duration: this.defaults.duration,
				scale: 1.1,
				scaleInner: 'img,video',
				ease: 'expo.inOut',
				animateTo: 'bottom',
				clearProps: 'clipPath',
				clipPathFrom: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				overwrite: true
			},
			extendTimeline: true,
		});
	}

	_animateCurtain() {
		gsap.registerEffect({
			name: 'animateCurtain',
			effect: (target, config) => {
				if (!app.options.animations.curvedMasks) {
					Object.assign(config, {
						overwrite: false
					});

					return gsap.effects.animateMask(target, config);
				}
				const tl = gsap.timeline({
					onStart: config.onStart,
					onComplete: config.onComplete,
				});
				let shouldForceRepaint = false;

				if (typeof app.options.animations.curvedMasksForceRepaint === 'function') {
					shouldForceRepaint = app.options.animations.curvedMasksForceRepaint();
				} else if (app.options.animations.curvedMasksForceRepaint === 'auto') {
					shouldForceRepaint = typeof window.safari !== 'undefined';
				} else {
					shouldForceRepaint = !!app.options.animations.curvedMasksForceRepaint;
				}

				if (target && target[0]) {
					const
						clipPathTarget = "url('#curtain-clip')",
						clip = document.querySelector('#curtain-clip'),
						path = clip.querySelector('#curtain-clip__path');

					let
						transformOrigin = 'center bottom',
						morphSVGFrom = 'M0,0.5 C0.167,0.167,0.333,0,0.5,0 C0.667,0,0.833,0.167,1,0.5 L1,1 L0,1 L0,0.5',
						morphSVGTo = 'M0,0 C0.167,0,0.333,0,0.5,0 C0.667,0,0.833,0,1,0 L1,1 L0,1 L0,0';

					if (config.animateFrom === 'top') {
						transformOrigin = 'center top';
						morphSVGFrom = 'M0,0 L1,0 L1,0.5 C0.833,0.833,0.667,1,0.5,1 C0.333,1,0.167,0.833,0,0.5 L0,0';
						morphSVGTo = 'M0,0 L1,0 L1,1 C0.833,1,0.667,1,0.5,1 C0.333,1,0.167,1,0,1 L0,0';
					}

					tl
						.set(target[0], {
							clipPath: clipPathTarget,
							inset: '0px'
						})
						.set(path, {
							clearProps: 'all',
						})
						.fromTo(path, {
							morphSVG: morphSVGFrom,
							scaleY: 0,
							transformOrigin,
							immediateRender: true
						}, {
							morphSVG: morphSVGTo,
							scaleY: 1.01,
							transformOrigin,
							ease: config.ease,
							duration: config.duration,
							onUpdate: () => {
								if (shouldForceRepaint) {
									target[0].style.clipPath = 'none';
									target[0].offsetWidth;
									target[0].style.clipPath = "url('#curtain-clip')";
								}
							}
						})
						.set(target[0], {
							clearProps: config.clearProps,
						})
						.set(path, {
							clearProps: 'all',
						});
				}

				return tl;
			},
			defaults: {
				duration: this.defaults.duration,
				ease: 'expo.inOut',
				animateFrom: 'bottom',
				clearProps: 'clipPath,inset'
			},
			extendTimeline: true,
		});
	}

	_hideCurtain() {
		gsap.registerEffect({
			name: 'hideCurtain',
			effect: (target, config) => {
				if (!app.options.animations.curvedMasks) {
					Object.assign(config, {
						overwrite: false
					});

					return gsap.effects.hideMask(target, config);
				}

				const tl = gsap.timeline({
					onStart: config.onStart,
					onComplete: config.onComplete,
				});
				let shouldForceRepaint = false;

				if (typeof app.options.animations.curvedMasksForceRepaint === 'function') {
					shouldForceRepaint = app.options.animations.curvedMasksForceRepaint();
				} else if (app.options.animations.curvedMasksForceRepaint === 'auto') {
					shouldForceRepaint = typeof window.safari !== 'undefined';
				} else {
					shouldForceRepaint = !!app.options.animations.curvedMasksForceRepaint;
				}

				if (target && target[0]) {
					const
						clipPathTarget = "url('#curtain-clip')",
						clip = document.querySelector('#curtain-clip'),
						path = clip.querySelector('#curtain-clip__path');

					let
						transformOrigin = 'center bottom',
						morphSVGTo = 'M0,0.5 C0.167,0.167,0.333,0,0.5,0 C0.667,0,0.833,0.167,1,0.5 L1,1 L0,1 L0,0.5',
						morphSVGFrom = 'M0,0 C0.167,0,0.333,0,0.5,0 C0.667,0,0.833,0,1,0 L1,1 L0,1 L0,0';

					if (config.animateTo === 'top') {
						transformOrigin = 'center top';
						morphSVGTo = 'M0,0 L1,0 L1,0.5 C0.833,0.833,0.667,1,0.5,1 C0.333,1,0.167,0.833,0,0.5 L0,0';
						morphSVGFrom = 'M0,0 L1,0 L1,1 C0.833,1,0.667,1,0.5,1 C0.333,1,0.167,1,0,1 L0,0';
					}

					tl
						.set(target[0], {
							clipPath: clipPathTarget,
							inset: '0px',
						})
						.set(path, {
							clearProps: 'all',
						})
						.fromTo(path, {
							morphSVG: morphSVGFrom,
							scaleY: 1,
							transformOrigin,
							immediateRender: true
						}, {
							morphSVG: morphSVGTo,
							scaleY: 0,
							transformOrigin,
							ease: config.ease,
							duration: config.duration,
							onUpdate: () => {
								if (shouldForceRepaint) {
									target[0].style.clipPath = 'none';
									target[0].offsetWidth;
									target[0].style.clipPath = clipPathTarget;
								}
							}
							// onComplete: config.onComplete
						})
						.set(target[0], {
							clearProps: config.clearProps,
						})
						.set(path, {
							clearProps: 'all',
						});
				}

				return tl;
			},
			defaults: {
				duration: this.defaults.duration,
				ease: 'expo.inOut',
				animateTo: 'top',
				clearProps: 'clipPath,inset',
				onComplete: undefined
			},
			extendTimeline: true,
		});
	}
}

class AssetsManager {
	constructor() {
		this.promises = [];
	}

	load({
		type = undefined, // script | stylesheet
		src = null,
		id = null, // id attribute in DOM
		inline = null,
		preload = false,
		refElement,
		version = null,
		timeout = 30000,
		cache = true,
		cb = null
	}) {
		return new Promise((resolve, reject) => {
			// Don't load asset that is pending to load
			if (cache && id in this.promises) {
				// return existing loading promise
				this.promises[id].then(resolve, reject);
				return;
			}

			// CSS
			if (type === 'style') {
				const stylePromise = this._loadStyle({
					src,
					id,
					inline,
					preload,
					refElement,
					timeout,
					version,
					cb
				});

				this.promises[id] = stylePromise;
				return stylePromise.then(resolve, reject);

			} else if (type === 'script') { // JS
				const scriptPromise = this._loadScript({
					src,
					id,
					inline,
					preload,
					refElement,
					timeout,
					version,
					cb
				});

				this.promises[id] = scriptPromise;

				return scriptPromise.then(resolve, reject);

			} else { // Unknown type
				reject(new TypeError('Resource type "style" or "script" is missing.'));
			}
		});
	}

	_loadScript({
		src = null,
		id = null,
		inline = null,
		preload = false,
		refElement = document.body,
		version = null,
		timeout = 15000,
		cb = null
	}) {
		return new Promise((resolve, reject) => {
			const
				element = document.querySelector(`script[src="${src}"]`),
				head = document.getElementsByTagName('head')[0];

			let script, timer, preloadEl;

			if ((typeof element === 'undefined' || element === null) && !inline) {

				if (src && version) {
					src += `?ver=${version}`;
				}

				if (src && preload) {
					preloadEl = document.createElement('link');
					preloadEl.setAttribute('rel', 'preload');
					preloadEl.setAttribute('href', src);
					preloadEl.setAttribute('as', 'script');
					preloadEl.setAttribute('type', 'text/javascript');
					head.prepend(preloadEl);
				}

				script = document.createElement('script');
				script.setAttribute('type', 'text/javascript');

				if (src) {
					script.setAttribute('async', 'async');
					script.setAttribute('src', src);
					script.setAttribute('crossorigin', 'anonymous');
				}

				if (!id) {
					const timestamp = Math.round(new Date().getTime() / 1000);
					id = `ajax-asset-${timestamp}-js`;
				}

				script.setAttribute('id', id);

				if (typeof inline === 'string' && inline.length) {
					script.innerHTML = inline;
				}

				refElement.append(script);

				if (src) {
					script.onerror = (error) => {
						cleanup();
						refElement.removeChild(script);
						script = null;
						reject(new Error(`A network error occured while trying to load resouce ${src}`));
					}

					if (script.onreadystatechange === undefined) {
						script.onload = onload;
					} else {
						script.onreadystatechange = onload;
					}

					timer = setTimeout(script.onerror, timeout);

				} else {
					resolve(script);
				}

			} else {
				resolve(element);
			}

			function cleanup() {
				clearTimeout(timer);
				timer = null;
				script.onerror = script.onreadystatechange = script.onload = null;
			}

			function onload() {
				cleanup();
				if (!script.onreadystatechange || (script.readyState && script.readyState === 'complete')) {
					if (typeof cb === 'function') {
						cb();
					}

					resolve(script);
					return;
				}
			}
		});
	}

	_loadStyle({
		src = null,
		id = null,
		inline = null,
		preload = false,
		refElement,
		version = null,
		timeout = 15000,
		cb = null
	}) {
		return new Promise((resolve, reject) => {
			const isInlineStyle = typeof inline === 'string' && inline.length;

			if (!id) {
				reject(new TypeError('Resource ID attribute is missing.'))
			}

			const sameIdElement = document.getElementById(id);

			let
				link = isInlineStyle ? document.createElement('style') : document.createElement('link'),
				timer,
				sheet,
				cssRules,
				preloadEl,
				c = (timeout || 10) * 100;

			if (src && version) {
				src += `?ver=${version}`;
			}

			if (src && preload) {
				preloadEl = document.createElement('link');
				preloadEl.setAttribute('rel', 'preload');
				preloadEl.setAttribute('href', src);
				preloadEl.setAttribute('as', 'style');
				preloadEl.setAttribute('type', 'text/css');
				document.head.prepend(preloadEl);
			}

			if (isInlineStyle) {
				link.innerHTML = inline;
				link.setAttribute('id', id);
				link.setAttribute('type', 'text/css');
			} else {
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('id', id);
				link.setAttribute('type', 'text/css');
				link.setAttribute('href', src);

				if (!preload) {
					link.setAttribute('crossorigin', 'anonymous');
				}
			}

			if (typeof refElement !== 'undefined' && refElement !== null) {
				refElement.insertAdjacentElement('afterend', link);
			} else {
				document.head.append(link);
			}

			link.onerror = function (error) {
				if (timer) {
					clearInterval(timer);
				}
				timer = null;

				reject(new Error(`A network error occured while trying to load resouce ${src}`));
			};

			if ('sheet' in link) {
				sheet = 'sheet';
				cssRules = 'cssRules';
			} else {
				sheet = 'styleSheet';
				cssRules = 'rules';
			}

			timer = setInterval(function () {
				try {
					if (link[sheet] && link[sheet][cssRules].length) {
						clearInterval(timer);
						timer = null;

						if (typeof cb === 'function') {
							cb();
						}

						resolve(link);

						// Remove old element with duplicate ID
						if (sameIdElement) {
							sameIdElement.remove();
						}
						return;
					}
				} catch (e) { }

				if (c-- < 0) {
					clearInterval(timer);
					timer = null;
					reject(new Error(`A network error occured while trying to load resouce ${src}`));
				}
			}, 10);


		});
	}

	injectPreload({
		src = null,
		refElement = document.head.querySelector('meta[charset]'),
		rel = 'prefetch', // prefetch or preload
		crossorigin = 'anonymous',
		as = 'script',
		type = 'application/javascript'
	} = {}) {
		// Don't preload if link element already exist
		if (src && !document.head.querySelector(`link[rel="${rel}"][href="${src}"]`) && !document.querySelector(`script[src="${src}"]`)) {
			const el = document.createElement('link');

			el.setAttribute('href', src);
			el.setAttribute('rel', rel);
			el.setAttribute('as', as);
			el.setAttribute('crossorigin', crossorigin);
			el.setAttribute('type', type);

			if (refElement) {
				refElement.insertAdjacentElement('afterend', el);
			} else {
				document.head.prepend(el);
			}
		}
	}
};

class BaseAnimation {
	constructor() {
		this.animations = {
			'animatedScale': {
				animationName: 'animateScale',
				initialVars: {
					scale: 0
				},
				targetVars: {
					animateFrom: 'center',
					ease: 'power3.out',
					duration: 0.6
				}
			},
			'animatedBorderHorizontal': {
				animationName: 'animateScale',
				initialVars: {
					scaleX: 0
				},
				targetVars: {
					animateFrom: 'left',
					ease: 'power4.out',
					duration: 1.2
				}
			},
			'animatedMask': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'center',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'center',
					shape: 'rectangle',
					ease: 'power4.out',
					duration: 1.2,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskCircle': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'center',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'center',
					shape: 'circle',
					ease: 'power2.inOut',
					duration: 1.2,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskEllipse': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'center',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'center',
					shape: 'ellipse',
					ease: 'power2.inOut',
					duration: 1.2,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskFromTop': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'bottom',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'top',
					shape: 'rectangle',
					ease: 'power3.inOut',
					duration: 0.9,
					scale: 1,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskFromBottom': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'top',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'bottom',
					shape: 'rectangle',
					ease: 'power3.inOut',
					duration: 0.9,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskFromLeft': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'right',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'left',
					shape: 'rectangle',
					ease: 'power3.inOut',
					duration: 0.9,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedMaskFromRight': {
				animationName: 'animateMask',
				setAnimationName: 'hideMask',
				initialVars: {
					animateTo: 'left',
					duration: 0,
					overwrite: false,
					clearProps: false,
					scaleInner: '.js-animated-mask-inner',
				},
				targetVars: {
					animateFrom: 'right',
					shape: 'rectangle',
					ease: 'power3.inOut',
					duration: 0.9,
					scale: 1.2,
					// overwrite: true,
					scaleInner: '.js-animated-mask-inner',
				}
			},
			'animatedReveal': {
				initialVars: {
					yPercent: -100
				},
				targetVars: {
					yPercent: 0,
					ease: 'power3.out',
					duration: 1.2
				}
			},
			'animatedRevealBottom': {
				initialVars: {
					yPercent: 100
				},
				targetVars: {
					yPercent: 0,
					ease: 'power3.out',
					duration: 1.2
				}
			},
			'animatedJump': {
				initialVars: {
					autoAlpha: 0,
					yPercent: 30
				},
				targetVars: {
					autoAlpha: 1,
					yPercent: 0,
					ease: 'power3.out',
					duration: 0.6
				}
			},
			'animatedJumpFromLeft': {
				initialVars: {
					autoAlpha: 0,
					xPercent: -40
				},
				targetVars: {
					autoAlpha: 1,
					xPercent: 0,
					ease: 'power3.out',
					duration: 0.6
				}
			},
			'animatedJumpFromRight': {
				initialVars: {
					autoAlpha: 0,
					xPercent: 30
				},
				targetVars: {
					autoAlpha: 1,
					xPercent: 0,
					ease: 'power3.out',
					duration: 0.6
				}
			},
			'animatedJumpScale': {
				initialVars: {
					autoAlpha: 0,
					scaleX: 1,
					scaleY: 1.5,
					x: 0,
					y: 300,
					xPercent: 0,
					yPercent: 0
				},
				targetVars: {
					autoAlpha: 1,
					scaleX: 1,
					scaleY: 1,
					x: 0,
					y: 0,
					xPercent: 0,
					yPercent: 0,
					ease: 'power3.out',
					duration: 0.6
				}
			},
			'animatedFade': {
				initialVars: {
					autoAlpha: 0
				},
				targetVars: {
					autoAlpha: 1,
					ease: 'power3.out',
					duration: 0.6
				}
			}
		};
	}

	prepareAnimation() {
		return new Promise((resolve) => {
			ScrollTrigger.refresh();
			resolve(true);
		});
	}

	getScrubAnimation() {

	}

	getRevealAnimation() {

	}

	_registerAnimations() {
		const timeScale = app.utilities.getTimeScaleByKey('onScrollReveal');

		for (const [name, options] of Object.entries(this.animations)) {
			const elements = this._getScopedAnimationElements(`[data-arts-os-animation-name="${name}"]`);

			if (elements.length) {
				const vars = {
					elements
				};

				if ('initialVars' in options) {
					Object.assign(vars, {
						initialVars: options['initialVars']
					});
				}

				if ('setAnimationName' in options && typeof gsap.effects[options.setAnimationName] === 'function') {
					Object.assign(vars, {
						shouldRunSetTween: false,
						setCb: (localElements, localVars) => {
							gsap.effects[options.setAnimationName](localElements, localVars);
						}
					});
				}

				if ('animationName' in options && typeof gsap.effects[options.animationName] === 'function') {
					Object.assign(vars, {
						shouldRunTween: false,
						cb: (batch) => {
							if ('duration' in options['targetVars']) {
								const originalDuration = options['targetVars']['duration'];

								Object.assign(options['targetVars'], {
									duration: originalDuration / timeScale
								});
							}

							gsap.effects[options.animationName](batch, options['targetVars']);
						}
					});
				}

				this._createBatchSTReveal(vars);
			}
		}
	}

	_getRevealTextAnimation() {
		const elements = this._getScopedAnimationElements();

		this._createBatchSTReveal({
			elements,
			shouldRunTween: false,
			clearVars: false,
			cb: (batch) => {
				this._animateText(batch);
			}
		});
	}

	_animateText(batch) {
		const tl = gsap.timeline();

		batch.forEach((el, index) => {
			if (el instanceof HTMLElement) {
				const type = el.getAttribute('data-arts-split-text-preset');

				switch (type) {
					case 'animatedCounterChars':
						tl.animateChars(el, {
							duration: 1.2,
							y: '-40%',
							stagger: {
								from: 'start',
								amount: .1
							}
						}, 'start');
						break;
					case 'animatedChars':
						tl.animateChars(el, {
							duration: 1.5,
							stagger: {
								from: 'start',
								amount: .3
							}
						}, 'start');
						break;
					case 'animatedCharsRandom':
						tl.animateChars(el, {
							duration: 1.2,
							stagger: {
								from: 'random',
								amount: .3
							}
						}, 'start');
						break;
					case 'animatedWords':
						tl.animateWords(el, {
							duration: 1.2,
							stagger: {
								from: 'start',
								amount: .1
							}
						}, index === 0 ? 'start' : '<20%');
						break;
					case 'animatedLines':
						tl.animateLines(el, {
							duration: 1.2,
							stagger: 0.07
						}, index === 0 ? 'start' : '<20%');
						break;
				}

			}
		});

		this._animateOutlines(tl);

		tl.timeScale(app.utilities.getTimeScaleByKey('onScrollReveal'));
	}

	_animateOutlines(timeline) {
		if (timeline && this.elements.outlines && this.elements.outlines.length) {
			timeline.add(() => {
				this.elements.outlines.forEach((el, index) => {
					timeline.to(el, {
						duration: 1.8,
						drawSVG: '100% 0%',
						ease: 'expo.inOut',
						delay: index * 0.1,
						onStart: () => {
							const parentOverflowLine = this.elements.outlines[index].closest('.js-arts-split-text__wrapper-line');

							if (parentOverflowLine) {
								parentOverflowLine.classList.remove('overflow-hidden');
								parentOverflowLine.style.overflow = 'initial';
							}

							this.elements.outlines[index].classList.add('color-accent');
						}
					}, '<');
				});
			}, '<50%');
		}
	}

	_initAnimations() {
		if (this._hasAnimationScene()) {
			this.prepareAnimation().then(() => {
				this._getRevealTextAnimation();
				this._registerAnimations();
				this._setAnimationReady();
				this._createSTReveal();
			});
		}

		this._createSTScrub();
	}

	_createSTReveal() {
		const animation = this.getRevealAnimation();

		if (animation) {
			const
				masterTimeline = gsap.timeline({
					defaults: {
						duration: 1.2,
						ease: 'power3.out'
					},
					onStart: () => {
						app.utilities.dispatchEvent('animation/start', {}, this.element);
					},
					onUpdate: () => {
						app.utilities.dispatchEvent('animation/update', {}, this.element);
					},
					onComplete: () => {
						animation.kill();
						app.utilities.dispatchEvent('animation/end', {}, this.element);
					}
				}).add(animation.play()),
				preloaderRef = app.componentsManager.getComponentByName('Preloader'),
				triggerHook = app.utilities.getTriggerHookValue();

			masterTimeline.timeScale(app.utilities.getTimeScaleByKey('onScrollReveal'));

			this.stReveal = ScrollTrigger.create({
				start: this.containerAnimation ? `top bottom` : `top bottom-=${window.innerHeight * triggerHook}px`,
				animation: masterTimeline,
				trigger: this.element,
				invalidateOnRefresh: true,
				// containerAnimation: this.containerAnimation,
				once: true
			});

			if (preloaderRef) {
				this.stReveal.disable();

				preloaderRef.loaded.then(() => {
					this.stReveal.enable();
				});
			} else {
				if (this._isWebGLEnabled()) {
					this.stReveal.disable();

					this.webGLReady.then(() => {
						this.stReveal.enable();
					});
				}
			}
		}
	}

	_createSTScrub() {
		const config = this.getScrubAnimation();

		if (config) {
			if (this.containerAnimation) {
				config['containerAnimation'] = this.containerAnimation;
			}

			if (config.matchMedia) {
				this.mmSTScrub = gsap.matchMedia();
				this.mmSTScrub.add(config.matchMedia, () => {
					this.stScrub = ScrollTrigger.create(config);
				});
			} else {
				this.stScrub = ScrollTrigger.create(config);
			}

			document.addEventListener('arts/barba/transition/start', () => {
				if (this.stScrub) {
					this.stScrub.kill();
				}

				if (this.mmSTScrub && typeof this.mmSTScrub.kill === 'function') {
					this.mmSTScrub.kill();
				}
			}, {
				once: true
			});
		}
	}

	_createBatchSTReveal({
		initialVars = {},
		targetVars = {},
		clearVars = {},
		elements,
		interval = 0.05,
		batchMax = 6,
		setCb,
		cb,
		shouldRunTween = true,
		shouldRunSetTween = true,
	} = {

		}) {

		if (elements) {
			const
				timeScale = app.utilities.getTimeScaleByKey('onScrollReveal'),
				triggerHook = app.utilities.getTriggerHookValue(),
				batchVars = {
					interval,
					batchMax,
					start: ({ trigger }) => {
						const offset = trigger.getBoundingClientRect().top < window.innerHeight ? 0 : window.innerHeight * triggerHook;

						return `top bottom-=${offset}px`;
					},
					once: true
				},
				defaultTargetVars = {
					autoAlpha: 1,
					x: 0,
					y: 0,
					xPercent: 0,
					yPercent: 0,
					scaleX: 1,
					scaleY: 1,
					duration: 0.6,
					stagger: 0.07,
					ease: 'power3.out',
				},
				defaultClearVars = {
					clearProps: 'opacity,visibility,transform'
				},
				preloaderRef = app.componentsManager.getComponentByName('Preloader');

			if (typeof targetVars === 'object') {
				targetVars = deepmerge(defaultTargetVars, targetVars);
			}

			if (typeof clearVars === 'object') {
				clearVars = deepmerge(defaultClearVars, clearVars);
			}

			if ('duration' in targetVars) {
				const originalDuration = targetVars['duration'];

				Object.assign(targetVars, {
					duration: originalDuration / timeScale
				});
			}

			Object.assign(batchVars, {
				onEnter: (batch) => {
					Object.assign(targetVars, {
						onStart: () => {
							app.utilities.dispatchEvent('animation/start', {}, this.element);
						},
						onUpdate: () => {
							app.utilities.dispatchEvent('animation/update', {}, this.element);
						},
						onComplete: () => {
							if (typeof clearVars === 'object') {
								gsap.set(batch, clearVars);
							}
							app.utilities.dispatchEvent('animation/complete', {}, this.element);
						}
					});

					if (typeof cb === 'function') {
						cb(batch, targetVars);
					}

					if (!!shouldRunTween) {
						gsap.to(batch, targetVars);
					}
				}
			});

			Object.assign(initialVars, {
				onComplete: () => {
					const batchST = ScrollTrigger.batch(elements, batchVars);

					if (preloaderRef) {
						batchST.forEach(instance => instance.disable());

						preloaderRef.loaded.then(() => {
							batchST.forEach(instance => instance.enable());
						});
					} else {
						if (this._isWebGLEnabled()) {
							batchST.forEach(instance => instance.disable());

							this.webGLReady.then(() => {
								batchST.forEach(instance => instance.enable());
							});
						}
					}
				}
			});

			if (typeof setCb === 'function') {
				setCb(elements, initialVars);
			}

			if (!!shouldRunSetTween) {
				gsap.set(elements, initialVars);
			}

			// Reset position
			ScrollTrigger.addEventListener('refreshInit', () => gsap.set(elements, {
				x: 0,
				y: 0,
				xPercent: 0,
				yPercent: 0
			}));
		}
	}

	_setAnimationReady() {
		this.element.setAttribute('data-arts-os-animation', 'ready');
	}

	_hasAnimationScene() {
		const animationAttribute = this.element.getAttribute('data-arts-os-animation');

		return !!animationAttribute && animationAttribute !== 'false';
	}

	_getScopedSelector(selector) {
		return `:scope ${selector}:not(:scope [data-arts-component-name] ${selector}):not(:scope [data-arts-component-name]${selector})`;
	}

	_getScopedAnimationElements(selector = '[data-arts-split-text-preset]') {
		const containers = [...this.element.querySelectorAll(this._getScopedSelector(selector))];

		if (this.element.matches(selector)) {
			containers.push(this.element);
		}

		return containers;
	}
}

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
<svg width="766" height="237" viewBox="0 0 766 237" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M247.248 11.6957C240.217 12.6995 244.191 13.7469 242.837 14.8815C234.584 16.5399 238.82 14.2705 235.851 13.8778C230.698 15.0124 226.942 17.1508 223.056 17.7618C222.707 17.5436 221.964 17.5872 222.794 17.1072C217.51 19.2456 206.506 19.9438 200.48 22.8678C200 22.8241 199.694 22.7369 199.563 22.6496C200.742 23.2606 201.048 24.0024 200.96 24.6134C197.86 25.2244 195.415 26.7082 194.017 25.9226C195.939 25.5735 195.982 25.1371 196.812 24.6571L193.668 25.7481C190.437 24.8316 197.991 24.3952 197.773 23.2605C191.485 24.8753 184.454 27.8428 179.52 28.4538C178.166 27.2319 190.742 25.4862 183.974 25.6172L191.572 24.5261C185.371 23.4788 196.157 23.697 190.393 22.3877C180.437 24.177 179.476 25.4426 169.564 27.3628C167.555 28.7156 170.568 28.3665 168.559 29.7194C155.022 34.5199 156.682 28.672 146.988 33.3416C144.586 34.9999 144.062 37.0947 136.595 38.0548L138.603 35.7855C129.128 38.273 133.887 39.6259 123.756 41.4151C125.328 40.2805 130.962 38.7094 129.477 38.9713C122.752 39.5386 125.241 41.1969 120.35 42.6371L118.909 41.5024C109.041 44.8628 98.4294 49.1832 87.6435 53.4164C88.0802 52.8054 89.8269 51.6707 87.1195 52.1508C73.5826 57.7368 57.8624 63.541 45.0678 70.6545C43.7142 72.0073 42.4041 73.3602 41.1378 74.7567C40.0898 75.455 38.8234 75.6295 39.8278 74.6258C34.937 77.5497 40.0461 75.455 38.1684 77.4625C35.6794 79.4699 34.3257 79.4263 35.723 77.8989C32.055 81.3901 26.9896 86.4088 22.3608 91.9512C17.6884 97.4499 13.5837 103.385 10.3086 107.618L11.051 105.654C8.69292 109.058 8.16892 111.502 7.73225 113.772C7.29557 116.041 6.81523 118.179 4.93754 121.54L5.24321 120.1C1.66248 128.304 -0.0842157 137.818 0.00311909 146.808C-0.0842157 155.885 2.09915 164.22 3.97685 171.072C5.46154 171.901 7.03357 176.134 9.43527 179.8C11.6623 183.51 14.3697 186.739 15.7234 186.303C17.2081 188.397 18.2124 189.838 18.9984 191.059C19.8718 192.194 20.5268 193.023 21.2255 193.983C22.7102 195.86 24.6315 198.129 30.3956 202.624C33.5397 204.981 36.1161 204.414 40.3081 206.508L39.7841 207.73C41.9238 208.298 44.0198 208.909 46.1159 209.389L48.5176 212.269C49.9149 212.793 51.3123 213.273 52.7096 213.709C51.0939 213.011 49.5219 211.702 49.9149 211.44C56.3777 213.665 65.1548 218.248 65.1985 218.859C70.4823 220.168 75.8097 221.084 81.1371 221.87C80.6568 222.306 77.993 221.87 75.8097 221.739C84.5432 222.306 77.076 223.572 85.0235 223.921C84.0628 223.397 85.7222 223.266 85.9405 223.005C89.6086 224.576 98.3857 226.103 104.892 226.627L103.538 227.369C115.241 229.245 128.342 229.813 141.442 230.729C136.769 229.943 137.992 228.416 141.835 228.547L143.276 230.074C145.808 229.376 139.302 229.245 144.455 228.547C149.346 229.027 147.643 230.38 144.804 230.642L150.787 230.554C151.092 230.991 149.695 231.122 149.302 231.645C151.791 230.904 159.476 233.697 163.101 232.387L163.406 232.824C176.507 233.566 182.445 233.435 193.1 233.915C193.362 232.693 197.511 233.173 200.742 232.3C208.558 233.042 217.205 234.438 226.637 234.7C233.318 234.308 228.602 233.74 231.615 233.086C232.052 234.22 241.484 234.438 236.593 235.049C247.946 235.18 251.091 235.399 265.457 234.788C263.929 234.308 262.182 234.046 263.099 233.697C265.719 233.566 268.994 234.264 268.601 234.831L267.902 234.919C275.981 234.22 285.238 235.268 294.103 236.097C302.967 236.839 311.483 237.537 317.902 236.402L317.203 236.533C321.657 236.184 326.067 235.748 330.521 235.268C336.635 235.355 326.853 236.14 331.395 236.795C345.718 234.657 354.102 236.882 365.892 235.137C370.521 236.621 378.643 236.271 387.158 235.791C395.673 235.224 404.538 234.264 410.782 235.006L410.04 234.264C413.184 233.304 413.926 234.482 416.284 234.526C415.891 233.958 412.791 234.046 414.756 233.478C428.249 232.344 442.179 231.209 456.24 230.642C470.257 229.507 484.449 229.071 498.248 227.412C508.379 226.234 503.444 222.655 516.37 222.743L512.964 224.663C523.007 222.568 533.313 220.604 543.618 218.99C553.924 217.462 564.098 215.324 573.792 212.662C572.701 213.229 572.744 213.665 570.823 214.015C575.19 214.189 586.238 210.96 586.107 210.131C589.163 209.52 586.98 210.742 588.945 210.698C593.224 210.305 599.032 206.945 601.478 207.425C601.871 207.512 600.386 208.036 599.644 208.298C602.22 207.163 612.263 205.417 609.381 204.894C616.892 203.803 623.224 200.879 629.206 199.962C632.612 197.606 641.826 197.126 642.525 194.987C642.525 195.991 645.844 195.511 649.686 194.463C653.485 193.329 657.808 191.583 659.948 190.405C658.594 191.452 664.097 189.75 662.568 191.103C667.765 189.401 672.393 187.568 671.171 186.87C681.52 186.172 689.686 178.796 696.061 179.495C710.952 172.643 724.532 165.137 736.06 155.536C736.497 156.496 733.178 159.071 729.903 161.384C726.585 163.653 723.31 165.661 724.096 166.359C730.034 162.344 734.401 158.634 738.418 154.663C742.436 150.692 746.322 146.633 750.995 141.222C753.44 138.429 750.427 143.447 749.728 144.582C758.636 133.323 765.711 120.405 765.405 106.745C765.623 106.789 765.711 108.229 765.711 109.626C766.016 107.007 766.278 103.429 765.405 103.734C765.536 104.607 765.58 105.436 765.623 106.309C764.837 108.36 764.444 105.698 763.702 102.643C763.003 99.5447 761.824 96.1407 761.387 96.0098C763.134 97.7991 762.61 94.7442 762.086 91.8639C761.344 89.1145 760.732 86.4524 763.483 89.2455C762.785 87.5871 761.475 85.7978 761.082 86.4088C760.165 84.0522 760.077 83.1357 761.824 85.1869C760.732 83.0485 759.772 81.7829 759.029 80.9101C758.287 80.0373 757.807 79.4699 757.283 78.9899C756.147 78.1171 755.405 77.026 752.654 73.9275C753.003 73.6657 754.226 74.8004 755.187 75.1495C751.737 72.4001 748.418 69.9126 743.266 65.3739C743.746 65.4176 743.353 64.6321 744.969 65.9413C740.296 62.2318 735.798 60.0061 731.17 57.8241C726.541 55.642 721.825 53.6346 716.235 50.7543C720.384 50.5361 712.567 48.4849 712.524 46.7393L706.061 44.7755L708.288 46.4775C702.786 44.3391 697.502 43.5972 692.961 41.2842L697.284 42.2007C693.834 40.9351 690.297 39.8877 686.76 38.8403L692.48 41.4151C686.585 40.3241 692.393 43.5535 685.144 40.6732C686.716 41.0224 679.598 38.7967 676.978 36.9201C674.096 36.4401 671.04 36.1782 667.022 34.5635C666.105 33.7343 668.42 33.0797 667.808 32.556C664.664 33.1234 654.49 28.9775 650.56 29.6321C651.826 29.6321 652.088 28.8029 651.739 28.5411L649.119 29.0211C646.586 28.0174 646.237 27.7556 646.804 27.1882C638.9 25.0062 648.813 29.8067 639.643 26.5773C640.385 26.6645 640.08 26.4463 641.652 26.6645C636.979 25.1807 632.35 24.3952 627.809 23.566C623.268 22.7805 618.857 21.9077 614.49 20.8167C612.22 18.6783 622.263 21.9513 619.556 20.0311C606.805 17.7618 592.875 17.0636 580.605 14.8815L582.875 15.4052C580.823 17.369 573.836 12.9177 567.417 13.2232C568.989 13.2232 569.6 12.2194 569.164 12.394C560.736 10.8666 551.74 10.8229 538.771 10.212L540.431 9.77553C535.452 8.72815 527.243 8.29175 521.828 7.54986C520.169 7.98627 517.069 7.63713 518.903 8.68451C502.396 4.05859 486.894 8.33539 472.222 4.88777C474.012 4.97505 476.501 4.53864 475.06 4.495H462.397C463.358 5.54238 464.013 5.14961 466.633 6.06607C465.017 6.58976 461.436 6.89525 458.292 6.76432C464.013 6.37156 458.292 5.14961 455.89 4.495C456.283 4.80048 455.454 5.14962 455.628 5.4551C449.078 3.44762 454.449 7.46257 445.454 5.93514L445.934 5.41145C442.528 5.58602 439.428 6.15335 435.76 5.8915C434.275 4.66956 439.384 5.4551 439.646 4.495C434.537 4.40772 429.472 6.41519 424.887 5.10597C427.07 4.84412 430.17 4.93141 432.354 4.66957C427.376 3.14214 426.764 3.49125 423.009 3.14213H423.358L414.712 2.31296L416.896 2.74936C410.433 5.62965 403.839 2.96757 395.193 4.7132C403.621 3.05485 396.59 3.66582 397.289 2.35659C395.106 1.92018 391.743 1.44015 392.704 1.09102C388.599 2.05112 385.935 0.0872823 380.128 1.48379C379.866 1.04738 375.761 1.35286 376.722 0.305484C371.394 0.523688 377.944 1.09102 377.508 1.61471C369.298 2.88029 358.338 -0.610986 346.547 1.17829C336.417 1.8329 334.495 3.22942 325.107 3.79675C321.963 3.05485 327.727 2.26931 327.727 2.26931C322.618 1.57105 318.775 1.65835 313.928 2.09476C314.889 1.74563 313.928 1.3965 312.443 0.916453C308.557 1.00373 309.823 2.44389 304.758 1.78927C305.631 1.30922 306.766 0.567316 308.644 0.087267C304.059 0.436394 299.561 1.22194 294.845 1.61471C293.579 0.872812 297.684 0.480049 299.387 0C294.059 0.305486 285.631 0.654604 283.972 1.83291L287.378 2.22567C285.457 2.26932 286.374 1.22194 287.815 1.00374C292.356 0.0872797 294.365 1.3965 294.627 1.83291L291.265 2.09476C294.714 4.58228 304.758 1.70199 311.57 1.92019L308.731 3.70946L315.675 2.26931C317.159 2.74936 318.164 3.79674 314.801 4.01495C319.648 4.97505 319.124 3.40397 323.273 4.45135C323.709 4.62591 323.535 4.71321 323.098 4.75685L327.858 4.2768C326.941 4.62592 328.644 5.58602 325.718 5.28054C334.19 6.45884 339.473 4.14587 342.617 5.58602L341.919 5.6733C353.753 5.28054 343.098 4.36408 351.962 2.96758L357.857 6.37156L359.036 5.06233C360.259 5.14962 362.661 5.28053 362.18 5.80422C366.722 4.97504 361.438 5.19325 364.058 4.40772C369.909 5.76058 380.215 4.23316 381.481 6.37156C383.621 5.41146 375.892 5.4551 382.18 4.88777C383.927 7.20073 389.429 4.66957 394.756 5.84787C393.097 6.98253 388.031 6.24062 393.359 7.41893C396.634 5.49873 403.795 8.11719 408.293 7.85534C408.555 6.28427 418.118 7.41894 425.716 7.15709C425.236 7.68078 439.952 8.42267 446.982 9.29548L446.764 9.55733C448.161 8.0299 455.454 8.5536 460.738 8.42268C460.476 9.38278 459.515 9.68826 456.633 10.0374L461.611 10.2556C462.79 9.77554 464.362 9.60097 467.593 9.55733L466.283 10.692C472.877 10.9102 479.689 9.86281 488.117 11.172C488.641 10.081 481.523 7.68078 490.562 7.46258C490.868 8.07355 491.13 9.12093 488.772 9.25185C489.558 9.25185 491.567 8.90272 493.095 9.25185L489.427 10.081C493.27 10.7356 491.523 9.33912 494.58 9.60097C494.449 10.4738 496.851 10.3429 496.37 10.9975C495.584 10.9975 493.706 10.4738 492.484 10.7793C495.977 11.1284 500.169 11.8703 501.523 12.6558C501.261 12.1321 501.61 11.4775 504.143 11.5648C510.737 11.9576 506.326 12.7431 510.169 13.4414C511.828 12.9613 515.977 13.8778 516.195 12.5685C518.117 12.6995 518.422 13.3541 519.165 13.7468C522.614 13.485 535.103 14.9688 531.391 13.2668L530.518 13.0922C530.518 13.0922 530.867 13.0922 531.086 13.0922C536.762 12.874 542.527 13.7032 548.291 14.576C554.055 15.4052 559.775 16.4526 565.321 16.9326L565.234 17.369C571.871 17.6745 579.95 18.9838 584.753 18.8528C586.718 19.1583 589.207 20.3366 588.29 20.7294C593.355 21.2094 594.01 20.7294 601.085 22.7369C595.932 22.5623 602.7 23.697 595.844 22.3441C602.264 23.8715 603.617 24.8316 610.779 24.9625C608.202 25.6608 615.407 27.1446 618.508 27.5373C617.067 26.97 615.626 26.359 614.141 25.8354C617.634 26.3154 620.604 27.1446 623.661 27.8865L621.696 28.9339C634.446 33.3416 646.018 31.465 655.188 36.9201C658.9 36.8765 648.333 34.3017 651.695 33.9962C657.634 35.7855 663.223 39.6695 665.057 40.1932C672.961 43.2917 673.267 40.4114 681.476 43.7281C680.559 42.8989 679.991 41.2406 686.454 42.8553C692.306 44.9937 692.961 47.3503 689.118 46.4775C687.677 46.0411 687.066 45.6483 687.197 45.5174C685.232 45.081 682.699 44.4264 684.839 45.7356L685.756 45.5174C688.55 46.8702 696.498 49.8378 694.314 49.9687C698.856 51.147 696.454 49.8815 693.354 48.3977C700.471 51.9762 705.013 52.7181 712.262 56.2967C711.214 55.5548 710.34 54.5074 711.519 55.0311C722.087 60.3989 716.716 56.2094 724.052 59.5697C727.72 62.4064 721.781 60.3989 729.074 63.7592C732.916 66.7705 729.248 65.4176 727.371 64.8503C734.139 67.5996 738.113 72.7056 740.776 75.455L737.763 73.4475C739.554 74.6694 740.951 75.7605 742.174 77.0261C741.912 76.2842 741.693 75.5423 741.388 74.844C742.872 76.4151 744.052 77.7243 743.746 77.9861C745.755 79.1208 743.877 75.4986 747.501 78.1607C749.204 80.5173 753.222 84.9687 752.479 86.4961C750.383 82.5684 750.121 83.0048 750.034 83.5722C749.947 84.1395 749.816 84.8814 747.545 82.0011C748.506 83.0485 749.597 84.4013 750.427 86.2779C750.427 86.627 750.034 86.1906 749.685 85.7542C751.3 89.4637 751.693 90.2056 752.741 90.8165C753.178 91.1657 753.615 91.5148 754.139 92.2567C754.663 93.0422 755.318 94.2205 755.754 96.3153C754.75 95.4861 754.837 98.4973 755.099 99.8065C754.575 96.5771 756.191 97.93 757.108 101.072C756.846 106.615 757.545 107.182 757.195 110.149C757.501 109.058 757.632 107.924 757.85 106.789C758.505 108.011 758.243 110.935 757.457 114.95C756.846 115.124 757.85 111.24 757.283 112.593C757.719 117.437 753.178 121.976 750.995 127.737C749.073 130.006 749.641 127.257 747.982 129.22C744.925 135.548 742.872 134.763 738.593 140.654C740.82 139.869 740.951 139.389 737.938 143.84C740.689 140.742 743.353 137.643 745.493 134.196C744.401 136.596 743.004 138.909 741.606 141.222C744.183 138.472 746.191 134.763 747.632 133.061C746.06 136.552 746.017 136.116 747.851 135.199C743.615 138.385 741.956 143.796 736.715 147.113L735.143 145.062C727.895 149.95 723.572 155.929 712.873 160.904L716.41 159.507C715.537 161.166 710.078 163.086 706.76 165.006C706.76 164.089 704.402 164.788 702.742 165.006C703.179 165.53 694.795 168.323 694.402 170.286L689.031 171.116C679.86 173.996 679.467 177.138 670.516 179.669C672.874 177.924 668.682 178.622 674.402 176.091C671.433 177.007 668.725 177.705 668.856 178.316C666.979 178.316 660.996 182.026 658.027 182.113C656.891 182.855 656.76 183.859 653.398 184.863C653.005 184.819 653.267 184.47 653.267 184.47C653.398 184.862 648.245 186.695 651.389 186.652C641.477 186.87 625.626 194.071 616.979 194.114C610.473 196.035 602.569 198.129 596.587 199.657C596.892 199.308 596.499 199.22 597.678 199.046C589.207 200.224 593.137 202.712 583.487 203.977C578.334 203.628 588.334 202.188 585.233 202.275C583.312 199.831 573.88 204.981 567.155 204.632L568.683 204.152C563.618 204.152 557.024 207.687 548.946 208.909C548.946 208.909 549.295 208.603 548.946 208.472C543.706 210.829 533.4 213.011 525.715 214.713C527.942 213.229 529.121 213.535 527.505 212.662C524.055 213.404 528.815 214.276 521.916 215.76C519.558 215.542 514.492 215.629 513.662 214.582L520.213 213.622C516.632 212.531 511.741 214.844 508.248 215.018L508.597 214.276C498.597 215.847 498.685 217.593 487.899 218.946L489.078 219.295C483.357 221.695 484.012 218.902 478.248 220.779L476.283 219.251C472.44 220.081 462.79 222.394 455.803 223.441C459.646 221.739 467.768 220.212 472.746 218.902C468.86 219.295 459.646 220.43 457.681 221.521C459.209 221.172 461.131 220.561 462.703 220.648C458.118 222.568 451.917 223.79 444.144 224.357C445.236 220.866 423.926 225.23 418.118 222.917C404.494 224.881 390.957 224.096 375.019 224.707C380.783 227.107 370.346 224.925 371.438 227.587C367.726 227.892 366.285 227.892 365.979 227.718C362.224 227.281 358.425 226.976 354.67 226.452C351.962 225.71 358.207 225.798 357.814 225.187C349.691 225.187 354.364 224.139 348.993 223.485C350.128 224.401 346.198 224.881 341.526 224.576L348.076 225.71C336.722 227.281 338.207 223.616 326.766 225.187L330.39 224.314C324.495 225.012 308.688 224.314 302.924 226.452C301.876 226.147 300.522 225.405 303.098 225.23C289.037 224.968 271.745 227.02 260.828 225.579L261.92 224.968C259.3 225.099 257.335 226.103 254.06 225.318C254.235 225.056 255.152 224.707 253.929 224.619C252.532 224.794 246.942 225.536 243.449 225.012L246.462 224.357C232.75 223.048 225.327 225.492 213.799 225.361C213.93 223.441 203.144 222.306 197.773 221.783L197.991 221.521C182.052 220.517 170.786 221.652 155.939 221.521C146.9 218.902 124.935 218.684 110.613 215.586C112.796 216.197 110.089 217.026 107.469 216.895C104.106 216.066 97.8617 216.851 98.6914 215.193L99.9141 215.411C97.6434 213.316 90.6566 212.618 85.3292 211.44L83.9755 213.535C77.338 210.436 68.3862 208.341 60.3078 205.679C52.273 203.104 45.2862 199.831 42.7535 196.602C39.5658 195.467 36.116 193.154 33.103 191.67L33.9763 190.798C30.4393 187.917 27.9939 185.561 25.4612 182.986C23.0595 180.324 20.3521 177.531 17.3827 172.949L19.3041 174.345C17.7321 171.77 15.898 170.636 14.326 169.283C12.623 168.017 10.92 166.664 9.95928 163.828L11.0946 161.602C9.43528 156.452 9.04226 150.954 9.2606 145.542C9.47893 140.131 10.265 134.806 10.8763 129.308C11.0946 129.57 11.5313 130.006 11.182 131.752C11.6623 129.22 13.6273 124.595 15.1557 120.798C16.8151 117.045 18.0814 114.033 16.5531 114.252C17.3391 114.601 18.6491 112.026 20.3958 108.84C22.0988 105.611 24.3258 101.814 25.9852 99.1956L26.3345 100.723C28.4742 95.8352 28.2122 95.3115 33.234 89.9873C34.6313 88.94 35.0244 89.6819 33.103 90.9911C37.8191 87.6308 35.6794 87.0634 41.6618 83.223L40.0461 85.4051C44.8495 81.8702 44.2382 81.9138 46.4652 79.2517C49.3472 76.6769 56.3777 73.4475 57.6877 74.1021C58.0807 73.142 60.5698 70.7417 63.8885 69.4325C64.4998 69.6071 63.4518 70.3926 62.9278 70.829C72.2726 67.1196 76.028 63.2355 82.9711 61.7954C83.2331 62.1009 83.7571 62.1445 84.3248 62.0572C76.7703 64.8503 70.9189 67.5123 71.3993 67.1632C71.8796 68.167 77.8184 65.7667 73.7573 69.258C78.0804 66.4213 85.7222 61.4463 91.8793 59.8316C92.1849 59.8316 92.5343 59.8315 92.7963 59.9188L92.2286 60.268C93.626 59.8752 94.8487 59.3515 95.9403 58.7842C97.9054 58.3041 99.1717 57.9986 101.049 57.4313C102.054 58.0423 108.342 55.5984 111.442 54.6819C110.831 53.5909 114.936 52.4999 110.831 52.7181C111.355 52.6308 110.307 53.0236 108.211 53.7655C107.774 53.9401 107.207 54.1582 106.945 54.2892C106.988 54.2455 107.076 54.2019 107.119 54.1146C105.067 54.8129 102.447 55.6857 99.4337 56.6894C101.661 55.2493 104.062 53.94 107.731 53.5036C109.084 52.2381 110.613 50.9288 111.486 50.2306C116.246 50.4488 124.761 48.8341 126.246 49.576C135.59 45.9974 148.691 42.768 154.193 38.9276C156.856 37.8802 157.511 38.753 158.647 38.8403C157.118 39.4513 155.241 39.9313 154.455 40.455C159.782 38.4475 170.699 36.2655 171.66 34.3453C178.777 33.3852 168.079 36.7019 177.598 34.2144L176.419 34.9563C195.764 33.3416 206.375 24.3079 228.121 24.0897C226.637 24.1334 225.894 24.177 225.545 23.9588C249.868 21.4276 275.326 15.5798 299.605 16.1471C306.461 16.0598 307.159 15.0124 311.264 14.0523L312.836 15.2743L319.91 13.3977C324.976 12.5249 329.386 13.2668 334.146 13.7905C338.906 14.3578 343.971 14.7069 350.346 13.6596L348.687 12.7868C353.316 12.9177 363.316 12.1758 362.53 13.1795C363.01 13.0049 364.058 12.2631 365.848 12.7868L365.979 13.485L377.333 12.4813C386.11 13.1795 375.892 15.0997 388.686 15.7107C393.446 15.6234 402.311 14.2705 400.564 13.7032C398.643 13.5723 395.673 13.0922 395.542 12.394L399.909 12.2194C400.782 10.2119 404.319 8.29174 393.577 6.41519L386.023 7.37529L383.621 6.28427L389.953 6.45884C386.416 5.41146 384.101 6.10971 381.525 6.58976C380.957 6.06607 379.909 5.67331 378.381 5.4551L370.957 7.28801C370.084 6.45883 374.276 5.76057 369.342 5.23688C365.892 6.06606 372.617 7.06981 366.896 7.54986C363.316 6.58976 364.364 5.80422 360.128 6.58976C359.517 6.06607 360.434 5.71694 362.093 5.49874C358.338 6.15335 352.137 5.84787 350.215 6.93889C346.46 5.76059 337.552 7.41892 337.858 5.54237C336.679 6.02242 331.264 7.24436 327.814 7.41893C330.915 6.19698 327.683 6.24062 323.884 6.32791C320.085 6.45883 315.675 6.6334 316.461 5.36782C314.19 6.54612 309.998 6.98253 305.325 7.33166C300.697 7.81171 295.588 8.20447 291.483 9.07728C291.92 8.85908 292.793 8.46631 293.535 8.50995C288.863 8.72815 287.465 8.11719 284.452 8.07354C284.016 9.81918 276.854 10.9538 273.055 12.394C267.204 11.303 276.287 10.0374 274.365 8.64088C274.802 9.99375 264.627 10.9975 266.68 11.9576C262.226 11.4775 262.881 11.9576 260.479 10.7793C259.955 13.005 256.505 11.6521 253.056 13.3977C246.636 13.1359 251.178 11.5648 244.366 13.1795C241.003 13.0049 247.029 11.3466 247.029 11.3466L247.248 11.6957ZM87.7745 53.6782C89.0846 53.1545 90.2199 52.7181 90.9623 52.4562C90.3073 52.7181 89.3902 53.0672 87.7745 53.6782ZM74.8053 58.6969C76.3773 58.0859 78.3424 57.3004 80.4384 56.5148C81.0498 56.7331 80.7004 57.344 79.3904 57.8241C80.0017 57.3004 76.8577 58.2168 74.8053 58.6969ZM105.11 56.7767C103.102 57.6059 102.316 57.6059 101.966 57.475C102.927 57.1258 104.062 56.733 105.547 56.1657C105.591 56.1221 105.678 55.9912 105.765 55.9475C105.634 56.253 105.503 56.5149 105.154 56.7767H105.11Z"/>
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
		const circleSVG = `<svg width="250" height="106" viewBox="0 0 250 106" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M109.591 91.0258C112.455 91.1682 110.96 90.697 111.581 90.4888C115.008 90.5436 113.145 90.8724 114.295 91.1354C116.434 91.1354 118.09 90.8614 119.689 90.971C119.804 91.0477 120.114 91.0915 119.746 91.1463C122.023 90.9491 126.44 91.5518 129.096 91.3326C129.292 91.3874 129.384 91.4203 129.43 91.4532C129.016 91.223 128.97 91.0148 129.073 90.8724C130.362 90.96 131.477 90.7847 131.937 91.0806C131.155 91.0148 131.075 91.1244 130.707 91.1792L132.064 91.1573C133.248 91.6176 130.212 91.1573 130.189 91.4422C132.823 91.508 135.916 91.3984 137.929 91.6066C138.332 92.0121 133.202 91.4532 135.87 91.9463L132.754 91.6066C135.1 92.3518 130.856 91.4422 133.007 92.2093C137.112 92.5819 137.619 92.3299 141.747 92.5819C142.679 92.4066 141.448 92.2641 142.391 92.0888C145.324 91.9682 146.474 92.1874 147.452 92.3956C148.418 92.6039 149.2 92.7902 151.362 92.4395C152.466 92.1217 152.869 91.6614 155.951 91.6395L154.95 92.1545C158.964 91.8148 157.17 91.3655 161.368 91.1463C160.655 91.4093 158.262 91.6614 158.872 91.6395C161.621 91.6395 160.747 91.1792 162.817 90.9052L163.3 91.2121C167.509 90.5655 172.063 89.5025 176.664 88.6148C176.434 88.7682 175.663 89.0203 176.767 88.9436C182.541 87.7381 189.188 86.7956 194.835 86.0285L196.917 85.3381C197.411 85.2504 197.871 85.3162 197.342 85.4696C199.55 85.2066 197.411 85.2504 198.446 84.9436C199.688 84.7025 200.125 84.834 199.355 85.0751C203.162 84.1436 210.246 82.5546 214.375 81.8641L213.604 82.1491C216.801 81.5135 216.974 80.6368 219.941 80.0779L219.412 80.308C222.805 79.3655 226.29 78.0285 229.441 76.5053C232.592 74.982 235.41 73.2395 237.675 71.7272C237.802 71.4751 238.204 71.0806 238.745 70.6313C239.274 70.1601 239.907 69.5792 240.516 69.0203C241.724 67.8696 242.77 66.6532 242.644 66.2806C243.38 65.5902 243.794 65.0642 244.185 64.6696C244.576 64.2751 244.84 63.9683 245.128 63.6066C245.703 62.8833 246.473 62.0285 247.796 59.508C248.153 58.8395 248.245 58.2696 248.348 57.6559C248.463 57.0532 248.567 56.4066 248.762 55.508L249.119 55.5518C249.268 54.719 249.291 53.8642 249.326 53.0203C249.567 52.6149 249.751 52.1765 249.935 51.7491C249.947 51.1573 250.039 50.5765 249.981 49.9957C249.981 50.6971 249.694 51.4642 249.625 51.3436C249.682 50.6642 249.694 49.919 249.705 49.1738C249.763 48.4286 249.705 47.6834 249.705 47.0149C249.705 45.6779 249.579 44.6697 249.705 44.6149C249.153 42.4998 248.279 40.4834 247.187 38.6204C247.394 38.6752 247.911 39.6395 248.337 40.3957C247.463 38.8724 247.451 38.708 247.486 38.5656C247.509 38.4231 247.589 38.2806 246.623 36.9765C246.773 37.382 246.324 36.8779 246.22 36.856C245.91 36.1217 245.22 35.0149 244.334 33.8861C243.449 32.7573 242.379 31.5957 241.379 30.6971L241.919 30.8943C240.217 29.1519 238.216 27.53 235.996 26.0834C233.777 24.6478 231.396 23.3546 228.946 22.193C230.648 23.1464 230.039 23.2998 228.601 22.6423L228.199 22.0505C227.175 21.8204 229.625 22.8724 227.612 22.2259C225.795 21.3711 226.554 21.3053 227.67 21.6779C226.899 21.382 226.14 21.0861 225.37 20.8122C225.278 20.6587 225.841 20.8341 226.037 20.7683C225.025 20.5601 222.241 18.8505 220.735 18.73L220.643 18.5875C215.571 16.7902 213.225 16.2204 209.084 14.8834C208.9 15.1464 207.302 14.5656 205.991 14.4122C202.977 13.3601 199.677 12.067 195.962 11.0039C193.317 10.3793 195.122 11.0259 193.903 10.8615C193.8 10.5327 190.085 9.51354 192.075 9.86422C187.612 8.64779 186.359 8.30806 180.62 7.09162C181.206 7.35464 181.885 7.57381 181.506 7.57381C180.459 7.3656 179.182 6.8834 179.366 6.78477L179.642 6.82861C176.399 6.22587 172.742 5.21765 169.211 4.2971C165.68 3.42039 162.276 2.63136 159.62 2.53273H159.919C158.101 2.36834 156.284 2.20396 154.467 2.08341C151.983 1.71081 155.997 2.07245 154.168 1.65601C151.212 1.5245 148.901 1.26149 146.704 1.05327C144.519 0.823136 142.449 0.647795 140.022 0.669713C138.171 0.176563 134.824 0.0560129 131.316 0.110807C127.808 0.143684 124.163 0.319027 121.609 0.154644L121.908 0.340947C120.609 0.571084 120.321 0.286149 119.355 0.286149C119.505 0.428615 120.781 0.384783 119.976 0.538208C108.913 1.25054 97.1472 2.02862 85.8879 3.40944C81.7706 3.9245 83.7143 4.73546 78.4814 5.03135L79.8845 4.46149C71.6959 6.11628 62.9784 7.01491 55.0198 9.00943C55.4798 8.83409 55.4683 8.71354 56.2504 8.56012C54.4908 8.63683 49.971 9.84231 49.994 10.0834C48.7404 10.3464 49.6604 9.96285 48.8669 10.0286C47.1187 10.2368 44.7036 11.3765 43.7375 11.3437C43.5765 11.3437 44.186 11.1464 44.4966 11.0478C43.427 11.4094 39.3787 12.3738 40.5173 12.3848C39.0107 12.7135 37.5961 13.1519 36.285 13.6122C34.9624 14.0505 33.7088 14.456 32.5127 14.7848C31.8112 15.2122 30.5461 15.5848 29.4305 15.9574C28.315 16.3519 27.3374 16.7245 27.1994 17.0423C27.1994 16.4615 22.0125 18.6752 20.3679 19.7491C20.8854 19.3327 18.7693 20.3409 19.3558 19.8259C17.3317 20.7574 15.5836 21.8094 16.0551 21.8642C15.0775 22.2149 14.146 22.6642 13.2719 23.1354C12.4094 23.6396 11.6158 24.1985 10.8567 24.7026C9.31564 25.6998 8.07356 26.6861 6.87747 27.0149C5.55488 27.9793 4.23229 28.9327 3.02471 30.1491C1.84013 31.3327 0.759053 32.845 0.414029 34.5875C0.0230023 36.308 0.402529 38.0615 1.09258 39.4861C1.78262 40.9436 2.77169 42.1491 3.81826 43.234C3.56525 43.3217 2.34616 42.1053 1.4836 40.6587C1.04657 39.9354 0.713049 39.1683 0.483033 38.5875C0.264518 38.0067 0.126509 37.6231 0 37.7217C0.391027 39.2998 1.11558 40.4943 1.87463 41.5025C2.64518 42.4998 3.48474 43.3108 4.3473 44.056C5.20986 44.8012 6.14142 45.4806 7.10749 46.1382C8.07356 46.8176 9.12013 47.508 10.2932 48.2642C11.4893 49.0751 9.46515 48.0121 9.00512 47.8149C13.8815 50.719 18.6428 53.0313 23.4156 54.5765C23.3811 54.6094 22.8636 54.4669 22.369 54.3135C23.2891 54.6532 24.4737 55.2012 24.4622 54.9491L23.5421 54.6642C22.208 53.8203 27.4524 55.3984 27.6824 55.2779C25.8768 55.3217 32.2367 57.0751 29.4535 56.9546C30.0746 57.1299 30.8796 57.2943 30.7876 57.108C31.6732 57.4696 31.9262 57.645 30.9486 57.4916C34.2954 58.5327 33.2143 57.897 36.2045 58.9491C36.1585 59.0477 35.5375 58.8724 35.1809 58.8833C36.7795 59.2121 38.3781 59.5518 40.8738 60.5162C40.7013 60.5162 40.9658 60.7025 40.2068 60.4395C44.5656 61.9409 47.8318 62.4559 52.5356 64.297C50.96 64.2642 54.1112 64.9984 54.2147 65.4696L56.8369 66.2258L55.8709 65.6888C58.125 66.445 60.2297 66.8285 62.1273 67.6066L60.3907 67.2121L64.6575 68.5491L62.3113 67.6066C64.669 68.1655 62.2423 67.0368 65.2095 68.1436C64.5885 67.9792 67.4637 68.8998 68.5677 69.5135C69.7293 69.7546 70.9369 69.9957 72.57 70.6313C72.961 70.8943 72.064 70.9491 72.317 71.1244C73.5361 71.1573 77.6649 72.7463 79.183 72.845C78.6884 72.7792 78.5964 72.9765 78.7344 73.0642L79.758 73.097C80.7816 73.5244 80.9196 73.6121 80.6896 73.7217C83.8408 74.7518 79.85 72.9217 83.5418 74.2915C83.2427 74.2258 83.3693 74.3025 82.7367 74.1491C86.4745 75.4313 90.0972 76.2422 93.5245 77.4477C94.4215 78.16 90.4537 76.6039 91.5233 77.2943C96.5607 78.7518 102.093 79.9354 106.934 81.4587L106.037 81.1518C106.888 80.7902 109.591 82.4559 112.144 82.8833C111.523 82.7518 111.259 82.971 111.443 82.9491C114.766 83.9683 118.32 84.7792 123.473 85.9189L122.794 85.897C124.738 86.5546 127.992 87.3545 130.12 87.9902C130.799 88.0121 132.018 88.3628 131.328 87.9573C137.733 90.4121 144.082 90.708 149.821 92.7025C149.108 92.5381 148.107 92.4504 148.671 92.571L153.743 93.5902C153.409 93.2504 153.122 93.2943 152.11 92.8559C152.788 92.8559 154.237 93.0641 155.479 93.3491C153.179 92.9984 155.399 93.7545 156.342 94.1052C156.192 93.9956 156.549 93.9847 156.491 93.8861C159.021 94.9162 157.055 93.4915 160.586 94.5545L160.367 94.6422C161.736 94.8614 163.012 94.9381 164.461 95.2778C165.002 95.6943 162.989 95.1134 162.851 95.3326C164.898 95.7381 167.015 95.6285 168.797 96.297C167.912 96.1984 166.658 95.9354 165.772 95.8367C167.716 96.5929 167.969 96.56 169.453 96.9217L169.303 96.8888C170.442 97.1847 171.592 97.4477 172.742 97.7217L171.879 97.4696C174.605 97.1956 177.147 98.3025 180.712 98.4559C177.25 98.2915 180.102 98.6203 179.78 98.9052C180.643 99.1573 181.977 99.508 181.575 99.5299C183.265 99.5847 184.277 100.242 186.669 100.22C186.75 100.341 188.429 100.516 188.003 100.724C190.154 100.987 187.532 100.461 187.739 100.352C189.418 100.439 191.339 100.867 193.443 101.305C194.49 101.524 195.594 101.744 196.733 101.93C197.871 102.094 199.056 102.204 200.263 102.248C204.404 102.609 205.209 102.357 209.05 102.708C210.315 103.059 207.946 102.949 207.946 102.949C209.993 103.409 211.569 103.541 213.547 103.639C213.133 103.683 213.547 103.815 214.122 104.001C215.697 104.155 215.226 103.738 217.284 104.122C216.916 104.198 216.433 104.341 215.663 104.374C217.538 104.483 219.389 104.494 221.321 104.615C221.804 104.856 220.125 104.768 219.435 104.812C220.516 104.889 221.919 104.987 223.138 105.075C224.357 105.119 225.404 105.108 225.749 104.987L224.369 104.768C225.163 104.823 224.749 105.053 224.162 105.053C222.276 105.119 221.505 104.659 221.413 104.56L222.793 104.648C221.459 103.87 217.296 104.122 214.547 103.782L215.755 103.464L212.88 103.519C212.293 103.333 211.914 103.037 213.282 103.124C211.339 102.675 211.511 103.092 209.855 102.642C209.671 102.576 209.763 102.565 209.935 102.576L208.003 102.445C208.394 102.401 207.727 102.083 208.9 102.313C205.496 101.579 203.3 101.886 202.057 101.36H202.345C197.549 100.867 201.827 101.645 198.182 101.535C197.423 101.163 196.664 100.768 195.905 100.363L195.375 100.615C194.881 100.527 193.915 100.341 194.122 100.242C192.259 100.165 194.409 100.439 193.305 100.472C190.994 99.7819 186.761 99.5518 186.324 98.9381C185.427 99.0477 188.544 99.497 185.991 99.2669C185.381 98.5984 183.058 98.8833 180.953 98.2148C181.667 98.0504 183.679 98.5765 181.575 97.9189C180.183 98.171 177.411 97.0313 175.583 96.7902C175.422 97.1408 171.592 96.2641 168.544 95.7381C168.763 95.6504 162.897 94.3463 160.114 93.6121L160.218 93.5682C159.574 93.8641 156.698 93.1628 154.571 92.7463C154.709 92.5272 155.111 92.5272 156.273 92.6806L154.295 92.2313C153.8 92.2532 153.168 92.1765 151.868 91.9244L152.443 91.7491C149.809 91.1573 147.049 90.9052 143.714 89.8861C143.449 90.1162 146.198 91.3107 142.575 90.6093C142.483 90.434 142.414 90.1491 143.369 90.3135C143.058 90.2587 142.242 90.171 141.644 89.9518L143.139 90.0614C141.632 89.5682 142.276 90.0614 141.057 89.7436C141.138 89.5354 140.183 89.371 140.413 89.2504C140.735 89.3052 141.46 89.6011 141.954 89.634C140.574 89.2504 138.941 88.7135 138.424 88.4176C138.516 88.571 138.343 88.7025 137.319 88.4724C134.697 87.8367 136.491 88.0011 134.996 87.5189C134.318 87.508 132.696 86.9491 132.558 87.245C131.788 87.0477 131.696 86.8614 131.42 86.697C130.028 86.4778 125.094 85.0641 126.52 85.7984L126.865 85.908C126.796 85.897 126.727 85.8751 126.635 85.8641C124.381 85.4367 122.092 84.7792 119.815 84.1107C117.55 83.4203 115.295 82.6751 113.087 82.1272L113.122 82.0285C110.477 81.4039 107.279 80.4833 105.359 80.1436C104.588 79.9135 103.599 79.4203 103.967 79.3874C101.955 78.8724 101.69 78.9272 98.8838 77.908C100.942 78.3244 98.2513 77.5463 100.977 78.3792C98.4238 77.5244 97.8948 77.1847 95.0311 76.6477C96.0661 76.6696 93.2024 75.7381 91.9488 75.4313L93.6855 76.1765C92.2939 75.7929 91.1093 75.3984 89.8902 74.9929L90.6723 74.8505C85.5544 72.8011 80.9311 72.6477 77.1933 70.6422C75.7212 70.434 79.9765 71.7272 78.6424 71.6176C76.2503 70.7957 73.9156 69.4916 73.1565 69.2505C69.9248 67.9902 69.8903 68.7792 66.4976 67.497C66.8886 67.771 67.1876 68.2313 64.577 67.497C62.1848 66.6532 61.8053 65.9957 63.3579 66.4011C63.9329 66.5874 64.1974 66.719 64.1629 66.7518C64.9565 66.971 65.9916 67.2559 65.0945 66.8066L64.738 66.8285C63.5879 66.3025 60.2757 65.2176 61.1267 65.2724C59.2636 64.7902 60.2757 65.2176 61.5982 65.7217C58.585 64.5162 56.7794 64.1327 53.6627 62.9162C54.1457 63.1573 54.5483 63.4532 54.0537 63.2888C49.4649 61.5464 51.9261 62.8176 48.7519 61.7984C47.0382 60.9984 49.5569 61.5683 46.3367 60.6477C44.4506 59.8587 46.0492 60.1875 46.8542 60.3409C43.8755 59.5957 41.5294 58.3244 39.9078 57.7107L41.4604 58.1381C40.5288 57.8751 39.7927 57.6231 39.0337 57.3491L39.8042 57.897C38.9302 57.5464 38.1826 57.2833 38.2286 57.1847C37.2511 57.0203 38.7692 57.8313 36.8715 57.4149C35.733 56.8779 33.2028 56.2861 32.9268 55.8149C36.6185 57.2285 32.6393 55.3436 35.8135 56.3957C35.1924 56.2203 34.4449 55.9573 33.5708 55.6066C33.4558 55.519 33.7203 55.5847 33.9733 55.6505C30.5231 54.1053 32.1907 55.4532 28.499 54.1272C29.0395 54.1162 27.7859 53.4806 27.1764 53.2943C28.6485 53.8313 27.7629 53.8532 26.3483 53.5025C24.0597 52.4834 23.7606 52.6477 22.5531 52.1546L23.9102 52.7683C23.3581 52.7683 22.208 52.2971 20.5749 51.6834C20.5059 51.4861 22.0815 52.1984 21.5295 51.8916C19.5974 51.4751 17.6767 49.8861 15.2041 48.8779C14.1805 48.1984 15.2731 48.5053 14.376 47.9245C11.6618 46.6971 11.7308 46.1491 9.07413 44.6039C9.64917 45.3053 9.78718 45.393 7.87804 44.2971C9.26964 45.2724 10.7302 46.1382 12.2253 46.9601C11.2133 46.5108 10.2127 46.0395 9.23514 45.5135C10.5002 46.4012 12.0758 47.1245 12.8579 47.6395C11.3858 47.0258 11.5583 47.0477 12.0873 47.6176C10.4887 46.2149 8.34958 45.5683 6.61296 43.8477L7.11899 43.4094C5.87691 42.171 4.74983 41.1409 3.80676 39.8368C2.8982 38.5765 2.05864 36.8998 2.63368 34.971C2.48417 35.3656 2.39217 35.782 2.35766 36.2204C2.19665 35.9464 2.25416 35.2998 2.48417 34.6094C2.71419 33.908 3.19722 33.1957 3.61125 32.6149C3.70325 32.845 4.3243 32.2204 4.87634 31.9135C4.78433 31.8806 5.38237 31.3327 6.08392 30.7628C6.77397 30.182 7.59052 29.5793 7.63653 29.2834L9.59166 28.319C10.4082 27.793 11.0293 27.3656 11.5698 27.0039C12.0988 26.6204 12.5244 26.2806 12.9499 25.93C13.3754 25.5902 13.7895 25.2286 14.3185 24.8669C14.859 24.5163 15.4916 24.1437 16.3311 23.7163C15.4571 24.4505 17.0327 23.782 14.9165 25.108C16.0206 24.5272 17.0327 24.0231 16.9637 23.8916C17.6537 23.6286 19.9194 22.0724 21.058 21.7656C21.495 21.4697 21.5295 21.1409 22.8406 20.6149C23.0016 20.593 22.8866 20.7135 22.8866 20.7135C22.8406 20.6149 24.8647 19.7163 23.6226 19.9793C25.5433 19.4861 28.0619 18.5108 30.5461 17.5574C31.7997 17.119 33.0303 16.6807 34.1689 16.3081C35.3074 15.9574 36.3655 15.7163 37.2166 15.5957C38.5162 15.1354 39.9768 14.6971 41.4029 14.2807C42.829 13.8423 44.2436 13.4697 45.4626 13.1628C45.3246 13.2615 45.4856 13.2724 45.0141 13.3601C48.4298 12.7135 46.9232 12.2313 50.8335 11.5738C52.8806 11.4642 48.8324 12.2204 50.086 12.067C50.7875 12.6259 54.7208 10.9492 57.4235 10.8505L56.8024 11.0149C58.8496 10.8724 61.6098 9.82039 64.899 9.30532C64.899 9.30532 64.7495 9.39299 64.899 9.41491C67.0726 8.6697 71.3049 7.85875 74.4561 7.27792C73.5131 7.70532 73.0415 7.65053 73.6971 7.83683C75.1117 7.57382 73.2026 7.45326 76.0202 6.9382C76.9633 6.94916 79.0335 6.77382 79.3555 7.02587L76.6873 7.44231C78.1249 7.61765 80.149 6.90532 81.5636 6.77382L81.4141 6.97108C85.5084 6.3245 85.4969 5.88615 89.9132 5.32724L89.4417 5.26149C91.7993 4.52724 91.5003 5.22861 93.858 4.61491L94.64 4.95464C96.2156 4.64779 100.172 3.88067 103.024 3.50807C101.437 3.99026 98.1133 4.51628 96.0661 4.95464C97.6417 4.74642 101.425 4.31902 102.231 4.01217C101.598 4.12176 100.804 4.31902 100.172 4.31902C102.07 3.76012 104.611 3.34368 107.774 3.06971C107.291 3.93546 116.032 2.59848 118.366 3.20121C123.944 2.60943 129.464 2.92724 135.962 3.03683C133.674 2.31355 137.86 3.08067 137.492 2.39026C139.01 2.39026 139.597 2.43409 139.723 2.48889C141.253 2.70807 142.771 2.91629 144.289 3.15738C145.359 3.43135 142.84 3.19026 142.966 3.3656C146.267 3.65053 144.335 3.74916 146.497 4.09985C146.072 3.83683 147.682 3.81491 149.545 4.12176C148.682 3.91354 147.808 3.7382 146.934 3.56286C149.257 3.56286 150.235 3.85875 151.224 4.08889C152.213 4.32998 153.191 4.60396 155.525 4.7245L154.03 4.74642C156.434 4.86697 162.748 6.03957 165.163 5.9519C165.565 6.10532 166.071 6.39025 165.036 6.23683C170.637 7.33272 177.653 8.2971 181.874 9.73272L181.414 9.78751C182.46 10.0067 183.3 9.9519 184.553 10.456C184.473 10.4998 184.093 10.5108 184.565 10.6423C185.128 10.73 187.382 11.1135 188.728 11.5738L187.509 11.4313C192.822 13.13 195.893 13.3491 200.424 14.6094C200.263 15.0587 204.415 16.5163 206.474 17.2615L206.382 17.3053C212.558 19.3656 217.077 20.2533 222.713 22.2259C224.323 23.1464 227.198 24.3738 230.131 25.9848C233.087 27.5738 236.065 29.5902 238.078 31.6067C237.491 30.9601 238.446 31.4204 239.239 32.0779C240.16 33.0423 242.069 34.5437 241.551 34.6752L241.252 34.3135C241.574 35.3327 243.357 37.3601 244.334 39.2012L245.036 39.2341C246.025 41.8313 247.198 45.1628 247.428 48.3847C247.67 51.5957 246.98 54.5546 246.151 55.8368C246.002 56.4724 245.772 57.1738 245.542 57.8642C245.266 58.5546 244.99 59.234 244.748 59.8477L244.495 59.6505C243.575 61.2285 242.816 62.3792 241.885 63.5628C240.999 64.7573 239.93 65.9738 238.319 67.6176C238.503 67.3546 238.653 67.0696 238.814 66.8066C236.962 68.582 237.066 69.7217 235.099 71.2231L234.214 71.2888C230.407 73.9299 225.899 75.5628 221.632 77.4477C221.678 77.36 221.77 77.1847 222.483 76.9217C221.436 77.2833 219.366 77.897 217.653 78.3683C215.95 78.8614 214.593 79.2669 215.076 79.4861C214.915 79.1244 210.281 80.6039 207.739 81.2614L208.072 80.8888C206.002 81.6888 205.956 81.8093 202.943 82.4669C202.218 82.5546 202.264 82.3354 203.231 82.2477C200.804 82.5217 201.425 82.8614 198.481 83.223L199.527 82.8395C197.055 83.2559 197.273 83.3217 195.962 83.782C194.432 84.1765 191.27 84.5272 190.856 84.3189C190.557 84.5381 189.246 84.9984 187.773 85.1847C187.555 85.1189 188.072 84.9546 188.337 84.8778C184.174 85.4039 182.276 86.3135 179.378 86.5107C179.297 86.423 179.102 86.4011 178.86 86.4121C182.138 85.8422 184.783 85.3929 184.542 85.4587C184.484 85.1847 181.828 85.6011 183.863 84.845C181.782 85.4258 178.228 86.5217 175.629 86.8504C175.502 86.8504 175.376 86.8504 175.272 86.8176L175.537 86.7409C174.939 86.8176 174.41 86.9381 173.915 87.0696C173.087 87.1683 172.558 87.223 171.764 87.3546C171.419 87.1792 168.717 87.7491 167.394 87.9463C167.555 88.2313 165.818 88.4614 167.486 88.4504C167.268 88.4504 167.728 88.3737 168.602 88.2203C168.797 88.1765 169.027 88.1326 169.154 88.0998C169.131 88.1107 169.096 88.1217 169.073 88.1436C169.936 87.9902 171.063 87.7929 172.351 87.5737C171.339 87.9025 170.269 88.2203 168.786 88.297C168.142 88.6039 167.429 88.9217 167.026 89.0861C165.14 88.9545 161.621 89.2176 161.103 89.0093C157.101 89.7436 151.615 90.0943 149.085 90.708C147.923 90.8176 147.751 90.5765 147.314 90.4888C147.981 90.423 148.774 90.4121 149.131 90.3244C146.831 90.5655 142.288 90.3902 141.724 90.7628C138.803 90.4669 143.38 90.4669 139.367 90.3683L139.919 90.2696C132.075 89.2504 126.992 90.423 118.263 89.108C118.872 89.1956 119.171 89.2395 119.286 89.3162C109.281 88.3628 98.6078 88.6587 88.7171 87.8915C85.8994 87.7162 85.5889 87.9792 83.8753 88.1545L83.2657 87.8148L80.3215 88.1655C76.1583 88.4066 73.1105 87.3217 67.8317 87.8806L68.5102 88.0998C66.6126 88.0669 62.5068 88.297 62.8288 88.034C62.6333 88.0778 62.2078 88.2751 61.4717 88.1655L61.4142 87.9902L56.7679 88.3737C53.1567 88.3409 57.32 87.6724 52.0526 87.771C50.0975 87.9025 46.4977 88.4504 47.2338 88.5381C48.0273 88.5272 49.2579 88.582 49.3154 88.7573L47.5328 88.8998C47.2223 89.4148 45.8767 89.9847 50.27 90.2039L53.3177 89.7984L54.3067 90.0176L51.7421 90.1052C53.2027 90.2915 54.1227 90.0724 55.1578 89.897C55.4108 90.0176 55.8364 90.1052 56.4459 90.1381L59.4361 89.5902C59.8041 89.7874 58.102 90.0066 60.1146 90.0833C61.5177 89.8313 58.7576 89.6559 61.0807 89.4696C62.5413 89.6778 62.1273 89.8751 63.8294 89.6559C64.0709 89.7874 63.7144 89.8751 63.0358 89.9409C64.5655 89.7655 67.0726 89.8203 67.8662 89.5463C69.3958 89.8203 73.0185 89.4367 72.869 89.9299C73.3521 89.8093 75.5602 89.5573 76.9633 89.5354C74.3986 90.0943 82.2077 89.6011 81.5291 90.2258C83.4268 89.7217 88.3836 90.0833 91.7418 89.8751C91.5578 89.908 91.1783 89.9847 90.8908 89.9518C92.7769 90.0285 93.3289 90.2148 94.5365 90.3354C94.7895 89.908 97.7337 89.8861 99.3324 89.6888C101.633 90.1819 97.9063 90.1491 98.6193 90.5655C98.5158 90.2148 102.656 90.3573 101.874 90.0395C103.634 90.3573 103.392 90.2258 104.289 90.6093C104.623 90.0833 105.945 90.5874 107.429 90.3135C109.982 90.697 108.061 90.8504 110.891 90.8176C112.225 91.0477 109.706 91.1135 109.706 91.1135L109.591 91.0258ZM176.618 88.5162C176.054 88.6258 175.571 88.7244 175.261 88.7792C175.548 88.7244 175.939 88.6477 176.618 88.5162ZM182.161 87.5299C181.483 87.6504 180.643 87.7929 179.757 87.9463C179.539 87.8806 179.734 87.7272 180.286 87.6395C179.999 87.76 181.322 87.5956 182.161 87.5299ZM170.039 87.4751C170.902 87.2888 171.212 87.2888 171.339 87.3326C170.925 87.4093 170.442 87.508 169.809 87.6285C169.786 87.6395 169.74 87.6724 169.717 87.6833C169.786 87.6066 169.878 87.5409 170.039 87.4751Z"/>
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
		const circleSVG = `<svg width="1318" height="12" viewBox="0 0 1218 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M112.648 11.72C117.797 11.72 114.999 10.63 116.053 9.99001C122.175 9.66001 118.932 10.8 121.081 11.36C124.892 11.05 127.811 10.03 130.649 10.06C130.892 10.24 131.419 10.31 130.811 10.54C134.825 9.65 142.852 10.46 147.556 9.34C147.92 9.44 148.083 9.53 148.204 9.61C147.393 9.06 147.272 8.49 147.393 8.09C149.704 8.06 151.65 7.38 152.542 8.09C151.123 8.07 151.002 8.37 150.353 8.59L152.745 8.27C154.975 9.3 149.461 8.64 149.502 9.41C154.205 9.06 159.678 8.18 163.286 8.46C164.097 9.48 154.853 8.83 159.719 9.72L154.083 9.35C158.462 10.94 150.677 9.25 154.691 10.96C162.07 11.23 162.922 10.41 170.26 10.69C171.882 10.12 169.652 9.85 171.273 9.28C181.653 8.23 179.625 11.82 187.248 10.43C189.194 9.74 189.883 8.45 195.397 9.12L193.613 10.28C200.749 10.37 197.586 8.61 205.127 9.36C203.83 9.82 199.532 9.76 200.627 9.89C205.533 10.78 204.033 9.23 207.722 9.21L208.533 10.23C216.115 10.04 224.426 9.28 232.859 9.07C232.413 9.37 230.994 9.7 232.981 10C243.562 9.46 255.644 10.05 265.902 10.62L269.754 9.73C270.646 9.73 271.456 10.12 270.483 10.3C274.497 10.62 270.646 9.74 272.551 9.39C274.821 9.32 275.592 9.89 274.132 10.16C281.146 9.39 294.08 8.49 301.54 9.41L300.121 9.68C305.918 10.02 306.526 7.85 311.919 8.66L310.905 8.82C323.474 9.16 337.258 8.31 346.908 9.61C348.651 8.34 359.355 10.14 360.044 8.36C367.261 9.21 365.193 9.54 375.329 10.09C378.005 10.16 379.261 8.97 382.586 8.78L382.708 9.7L387.167 8.72L389.641 9.82L392.762 9.57C391.506 9.52 390.087 9.16 390.289 8.9C395.155 8.47 402.209 9.51 402.371 9.98L413.845 9.16C413.602 9.53 411.696 9.67 410.156 9.91C416.278 8.95 411.331 10.88 416.926 10C416.156 9.79 417.291 9.45 417.413 9.26C420.251 9.81 426.657 9.79 431.36 9.54L430.468 10.18C439.023 10.31 448.469 9.82 458.078 9.8C454.632 9.51 455.362 8.41 458.159 8.29L459.335 9.26C461.119 8.65 456.375 8.9 460.065 8.15C463.673 8.25 462.538 9.25 460.511 9.58L464.849 9.23C465.133 9.52 464.119 9.68 463.876 10.05C465.619 9.44 471.457 11.01 473.971 9.94L474.214 10.23C483.823 10.21 488.161 9.86 495.946 9.78C496.067 8.94 499.108 9.11 501.419 8.42C507.176 8.67 513.582 9.31 520.515 9.22C525.34 8.78 521.893 8.50001 524.042 7.99001C524.448 8.76001 531.34 8.66 527.813 9.23C536.124 9.08 538.435 9.04 548.895 8.39C547.72 8.08 546.463 7.95 547.112 7.68C549.017 7.55 551.45 7.99 551.206 8.36L550.72 8.44C562.437 7.25 578.046 10.59 587.371 8.96L586.844 9.04L596.534 8.17C601.034 8.29 593.858 8.76 597.223 9.22C607.643 7.9 613.846 9.35 622.441 8.47C629.253 10.71 646.2 8.23 655.322 9.65L654.754 9.12C657.065 8.59 657.592 9.42 659.336 9.53C659.052 9.12 656.782 9.06 658.201 8.76C677.945 8.05 699.069 9.41 719.381 9.83C726.8 9.95 723.435 7.05 732.882 8.3L730.287 9.3C745.207 8.07 760.897 9.25 775.493 8.2C774.642 8.43 774.601 8.73 773.182 8.73C776.304 9.44 784.615 8.73 784.656 8.15C786.926 8.21 785.223 8.68 786.642 8.98C789.764 9.4 794.386 8.04 796.089 8.75C796.373 8.87 795.238 8.99 794.67 9.04C796.697 8.69 804.117 9.1 802.13 8.28C807.644 8.66 812.631 7.88 817.05 8.36C819.888 7.42 826.497 8.79 827.348 7.47C827.024 8.83 837.038 8.54 840.484 7.9C839.349 8.31 843.525 8.32 842.187 8.89C846.16 8.86 849.769 8.6 849.079 7.91C856.458 9.52 863.716 6.57 867.932 8.65C879.69 7.9 890.596 7.39 901.178 7.05C900.813 8.4 889.461 7.2 889.947 8.62C900.002 8.04 905.759 6.87 915.733 7.19C918.328 7.37 914.273 7.78 913.422 8.01C923.477 7.44 932.842 8.11 941.762 7.37C941.762 7.5 940.789 7.63001 939.856 7.74001C941.6 7.69001 943.951 7.93 943.748 7.32L942.046 7.49001C939.208 6.60001 949.019 5.62 949.343 5.15C946.384 6.91 958.182 5.59 953.438 7.82C954.614 7.7 956.033 7.41 955.79 7C957.493 7.12 958.06 7.36 956.317 7.83C962.642 7.49 960.371 6.84 966.088 6.85C966.088 7.15 964.912 7.26 964.345 7.61C967.223 7.03 970.142 6.45 974.967 6.7C974.683 6.88 975.251 7.11 973.791 7.11C982.103 7.02 987.941 5.56 997.063 6.12C994.387 7.41 1000.14 6.55 1000.63 7.67L1005.54 7.34L1003.59 6.8C1007.89 6.82 1011.66 6.01 1015.35 6.38L1012.15 6.84L1020.17 6.63L1015.63 6.2C1019.97 5.63 1015.19 4.78 1020.9 5.1C1019.73 5.21 1025.2 5.12 1027.43 5.78C1029.54 5.43 1031.73 5.05 1034.93 5.33C1035.74 5.69 1034.24 6.57001 1034.77 6.81001C1036.88 5.88001 1044.82 6.56 1047.5 5.57C1046.61 5.8 1046.57 6.39 1046.85 6.51L1048.63 5.75C1050.62 6 1050.9 6.11 1050.58 6.58C1056.54 6.73 1048.72 5.16 1055.81 5.78C1055.24 5.84 1055.53 5.95 1054.35 6.07C1061.49 6.4 1068.14 5.61001 1074.66 5.99001C1076.57 7.12001 1068.95 6.26 1071.14 7.21C1080.58 7.02 1090.72 5.9 1099.84 6.19L1098.14 6.06001C1099.48 4.47001 1104.91 6.86 1109.57 6.12C1108.44 6.24 1108.03 7 1108.35 6.82C1114.6 7.09 1121.17 6.46 1130.65 6L1129.48 6.41C1133.13 6.79 1139.17 6.66 1143.14 6.86C1144.36 6.46 1146.63 6.53 1145.29 5.93C1157.41 8.3 1168.81 4.77 1179.55 6.77C1178.25 6.77 1176.43 7.11 1177.44 7.12L1186.73 6.79C1186.04 6.09 1185.55 6.36 1183.64 5.82C1184.86 5.41 1187.5 5.11 1189.81 5.12C1185.59 5.56 1189.77 6.23 1191.51 6.63C1191.23 6.42 1191.87 6.18 1191.71 5.97C1196.46 7.23 1192.64 4.58 1199.17 5.44L1198.81 5.8C1201.28 5.63 1203.63 5.16 1206.31 5.27C1207.36 6.08 1203.63 5.63 1203.39 6.29C1207.16 6.26 1210.93 4.81 1214.25 5.63C1212.63 5.84 1210.36 5.83 1208.74 6.04C1212.35 7 1212.79 6.77 1215.51 6.93L1215.23 6.91L1221.55 7.38L1219.97 7.12C1224.88 5.06 1229.58 6.8 1236.03 5.47C1229.74 6.73 1234.93 6.21 1234.36 7.12C1235.95 7.38 1238.38 7.68 1237.65 7.93C1240.73 7.22 1242.55 8.54001 1246.89 7.49001C1247.05 7.78001 1250.09 7.54 1249.32 8.27C1253.22 8.07 1248.47 7.75 1248.84 7.39C1254.96 6.43 1262.74 8.71 1271.54 7.4C1279.04 6.89 1280.54 5.92 1287.52 5.48C1289.79 5.97 1285.45 6.53 1285.45 6.53C1289.14 6.99 1291.98 6.93 1295.54 6.63C1294.77 6.88 1295.5 7.1 1296.52 7.44C1299.36 7.39 1298.58 6.39 1302.23 6.86C1301.54 7.18 1300.65 7.69 1299.23 8.01C1302.6 7.77 1306 7.26 1309.49 7.02C1310.34 7.54 1307.3 7.77 1306 8.09C1309.94 7.9 1316.14 7.72 1317.48 6.93L1315.05 6.62C1316.46 6.59 1315.65 7.32 1314.6 7.46C1311.15 8.06 1309.82 7.14 1309.69 6.84L1312.17 6.68C1309.9 4.94 1302.23 6.86 1297.29 6.72L1299.52 5.49001L1294.29 6.48C1293.23 6.15 1292.58 5.44 1295.1 5.28C1291.61 4.63 1291.9 5.70001 1288.94 4.99001C1288.61 4.88001 1288.77 4.82 1289.1 4.77L1285.57 5.11C1286.3 4.85 1285.12 4.22 1287.23 4.42C1281.07 3.65 1277.06 5.28 1274.83 4.32L1275.35 4.25C1266.64 4.61 1274.38 5.16 1267.77 6.18L1263.68 3.89L1262.7 4.8C1261.81 4.76 1260.07 4.68001 1260.43 4.31001C1257.03 4.91001 1260.96 4.71 1258.93 5.29C1254.72 4.42 1247.01 5.59 1246.2 4.13C1244.58 4.82 1250.26 4.69 1245.59 5.15C1244.46 3.57 1240.24 5.39 1236.39 4.64C1237.69 3.84 1241.38 4.29 1237.53 3.54C1235.01 4.89 1229.9 3.19 1226.54 3.43C1226.26 4.52 1219.28 3.84 1213.69 4.17C1214.09 3.8 1203.27 3.51 1198.12 3.09L1198.28 2.91C1197.19 4.01 1191.87 3.77 1187.94 3.98C1188.14 3.32 1188.87 3.06 1190.98 2.78H1187.33C1186.44 3.12 1185.31 3.3 1182.91 3.41L1183.89 2.59C1179.02 2.61 1173.99 3.51 1167.79 2.93C1167.39 3.7 1172.62 5.09 1165.97 5.57C1165.76 5.15 1165.56 4.44 1167.31 4.28C1166.74 4.33 1165.28 4.62 1164.14 4.43L1166.82 3.74C1163.98 3.42 1165.28 4.32001 1163.01 4.24001C1163.09 3.65001 1161.35 3.81 1161.71 3.34C1162.28 3.28 1163.7 3.59 1164.59 3.36C1162.03 3.24 1158.95 2.88 1157.94 2.43C1158.14 2.77 1157.9 3.23 1155.99 3.3C1151.13 3.33 1154.37 2.58 1151.53 2.27C1150.32 2.68 1147.24 2.24 1147.11 3.12C1145.7 3.12 1145.45 2.7 1144.93 2.45C1142.37 2.83 1133.17 2.52 1135.92 3.47L1136.57 3.53C1136.57 3.53 1136.29 3.55 1136.17 3.57C1127.86 4.42 1119.06 3 1110.83 3.37V3.07C1105.96 3.4 1099.96 3.24 1096.44 3.87C1094.98 3.87 1093.03 3.32 1093.68 2.97C1089.95 3.18 1089.5 3.51 1084.11 3.01C1087.88 2.5 1082.81 2.55 1087.96 2.64C1083.1 2.37 1082.04 1.9 1076.77 2.69C1078.56 1.93 1073.16 1.73 1070.81 1.95L1074.22 2.5C1071.62 2.61 1069.35 2.54 1067.04 2.47L1068.3 1.47C1058.36 0.240001 1050.3 3.51 1042.8 1.47C1040.16 2.16 1048.19 1.97 1045.84 2.78C1041.26 2.64 1036.51 1.2 1035.09 1.19C1028.85 0.630002 1029.21 2.64 1022.69 2.26C1023.54 2.62 1024.31 3.57 1019.4 3.9C1014.82 3.77 1013.81 2.4 1016.69 2.12C1017.78 2.09 1018.31 2.2 1018.27 2.32C1019.73 2.19 1021.67 2.04 1019.89 1.65L1019.28 2.01C1017.01 1.65 1010.73 1.68 1012.19 1.1C1008.74 1.44 1010.69 1.68 1013.28 1.87C1007.4 1.35 1004.12 1.85 998.077 1.5C999.05 1.7 999.901 2.12 998.969 2.11C990.09 1.66 995.076 2.78 989.076 2.94C985.67 2.4 990.292 1.64 984.251 2.1C980.562 1.73 983.481 1.16 984.941 0.860001C979.427 1.55 974.643 0.410001 971.48 0.290001L974.399 0C972.656 0.17 971.237 0.170004 969.777 0.160004L971.44 0.870003C969.737 0.750003 968.277 0.740001 968.318 0.450001C966.574 0.920001 969.656 1.63 966.169 2.27C963.899 1.91 959.277 2.66 958.466 1.72C965.601 2.04 957.655 0.770003 963.696 0.620003C962.52 0.730003 961.101 0.730002 959.398 0.600002C959.155 0.490002 959.641 0.400002 960.087 0.350002C953.236 -0.489998 956.966 1.42 949.87 1.4C950.762 0.870002 948.208 0.39 947.073 0.5C949.911 0.5 948.451 1.39 945.816 1.8C941.275 1.39 940.87 2.11 938.518 2.07L941.235 2.26C940.302 2.79 938.032 2.73 934.869 2.9C934.586 2.49 937.748 2.61 936.613 2.43C933.126 3.37 928.666 1.47 923.76 2.11C921.49 1.75 923.517 1.11 921.531 0.870003C916.057 1.57 915.571 0.150001 909.813 0.720001C911.476 1.43 911.76 1.26 907.746 1.96L917.233 1.45L911.151 2.5C914.03 2.5 917.192 2.04 918.895 2.16C916.017 2.75 916.3 2.57 917.679 3.16C913.746 2.09 909.935 3.79 905.394 3.07L905.475 1.3C898.664 0.520003 893.393 2.23 884.555 1.8L887.393 2.1C886.217 2.81 881.92 2.21 879.082 2.5C879.325 1.91 877.541 1.7 876.284 1.33C876.446 1.77 869.797 1.3 869.027 2.48L865.054 1.71C857.918 1.4 856.945 3.41 850.093 3.23C852.12 2.58 848.998 2.17 853.58 1.7C851.269 1.7 849.242 1.6 849.201 2.01C847.863 1.64 842.876 2.82 840.768 2.26C839.795 2.52 839.511 3.14 836.957 3.1C836.673 2.98 836.957 2.81 836.957 2.81C836.957 3.1 832.943 3.22 835.214 3.87C828.078 2.04 815.509 4.05 809.306 2.48C804.319 2.69 798.319 2.9 793.778 2.95C794.062 2.77 793.778 2.65 794.63 2.71C788.345 2.18 790.859 4.42 783.723 3.82C780.034 2.87 787.494 3.29 785.183 2.94C784.129 0.990002 776.588 3.23 771.763 2.1L772.939 1.98C769.249 1.33 764.019 2.74 758.019 2.62C758.019 2.62 758.303 2.45 758.019 2.33C753.964 3.34 746.221 3.69 740.504 3.98C742.247 3.21 743.099 3.57 741.963 2.8C739.369 2.92 742.774 4.04 737.625 4.27C735.923 3.86 732.193 3.5 731.665 2.68L736.531 2.62C733.976 1.56 730.246 2.67 727.652 2.5L727.935 2.03C720.475 2.21 720.435 3.38 712.448 3.32L713.299 3.67C709.002 4.85 709.61 3.03 705.272 3.91L703.893 2.73C701.015 3.02 693.838 3.91 688.689 4.15C691.568 3.26 697.609 2.79 701.339 2.26C698.46 2.26 691.609 2.38 690.149 2.97C691.284 2.85 692.744 2.56 693.879 2.74C690.433 3.68 685.811 4.15 680.135 4.15C681.027 1.85 665.255 3.62 660.998 1.85C650.943 2.73 640.97 1.55 629.212 1.73C633.469 3.5 625.766 1.79 626.617 3.62C623.901 3.75 622.847 3.72 622.603 3.6L614.252 2.53C612.265 2 616.846 2.12 616.563 1.71C610.562 1.59 614.008 0.940001 610.035 0.470001C610.886 1.12 608.008 1.42 604.562 1.18L609.427 2.01C601.115 3.01 602.089 0.490002 593.696 1.49L596.331 0.900002C592.034 1.25 580.357 0.94 576.181 2.43C575.411 2.22 574.357 1.72 576.262 1.58C565.883 1.39 553.315 3.22 545.206 2.34L545.976 1.89C544.071 2.03 542.652 2.74 540.219 2.3C540.341 2.11 540.989 1.85 540.098 1.83C539.084 1.99 534.989 2.63 532.435 2.38L534.584 1.87C524.448 1.32 519.137 3.15 510.703 3.48C510.663 2.16 502.676 1.76 498.703 1.56L498.824 1.37C487.067 1.25 478.917 2.53 468.052 3.08C461.2 1.67 445.104 2.55 434.238 1.79C435.901 2.02 434.036 2.82 432.09 2.96C429.535 2.7 425.076 3.9 425.441 2.69L426.332 2.71C424.346 1.53 419.116 1.86 415.021 1.84L414.413 3.43C403.588 1.16 386.438 4.37 380.478 2.32C377.924 2.72 374.721 2.73 372.166 3.13L372.247 2.28C365.071 2.09 361.503 1.99 352.665 2.22L354.449 1.61C349.462 1.57 348.286 4.08 343.664 4.14L342.205 2.88C333.488 2.93 324.649 1.84 316.095 3.02C316.216 2.83 316.46 2.47 317.879 2.41C313.784 2.39 301.986 1.6 303.567 3.34C303.405 2.21 294.566 3.26 289.904 3.77L290.593 2.93C286.701 4.01 286.579 4.3 281.065 4.62C279.727 4.52 279.889 3.95 281.633 4.16C277.254 3.74 278.268 4.96 272.956 4.53L274.903 3.99001C270.402 3.94001 270.767 4.23 268.335 4.86C265.537 5.2 259.78 4.68 259.091 3.92C258.523 4.38 256.09 5.01 253.415 4.8C253.05 4.52 253.982 4.34 254.469 4.25C246.928 3.71 243.319 5.26 238.13 4.45C238.008 4.17 237.643 4.04 237.238 3.95C243.198 3.95 248.022 3.98 247.576 4.04C247.536 3.27 242.711 3.15 246.482 2.07C242.63 2.66 236.062 3.95 231.359 3.6C231.116 3.53 230.913 3.45 230.71 3.34L231.197 3.25C230.102 3.18 229.129 3.25 228.237 3.38C226.737 3.26 225.764 3.17 224.345 3.16C223.737 2.52 218.79 2.83 216.398 2.81C216.642 3.65 213.479 3.53 216.479 4.21C216.074 4.15 216.925 4.11 218.547 4.07C218.912 4.04 219.317 4.03 219.561 3.98C219.52 4 219.439 4.03 219.399 4.05C220.98 4.02 223.048 3.99 225.399 3.97C223.534 4.4 221.547 4.77001 218.872 4.31001C217.655 4.86001 216.317 5.42 215.587 5.68C212.222 4.51 205.857 3.9 204.925 3.18C197.586 3.68 187.612 3.55 183.072 5.15C181.004 5.36 180.639 4.7 179.869 4.46C181.085 4.3 182.504 4.32 183.153 4.09C178.977 4.51 170.787 4.29 169.854 5.4C164.543 4.92 172.774 4.37 165.516 4.58L166.489 4.24001C152.137 2.52001 143.501 7.14 127.568 4.92C128.662 5.06 129.23 5.12 129.433 5.3C111.391 4.36 92.3759 6.36 74.5367 4.83C69.4688 4.53 68.9417 5.23 65.901 5.78L64.7657 4.88L59.5356 5.94C52.1162 6.73 46.4806 3.76001 37.1151 5.24001L38.3719 5.85C34.9663 5.75 27.6279 6.24 28.155 5.54C27.8306 5.65 27.0603 6.18 25.7224 5.86L25.6007 5.39L17.2893 6.23C10.8024 5.91 18.1813 4.35 8.77519 4.28C5.28846 4.47 -1.15796 5.69 0.179977 6.01C1.599 6.03 3.82889 6.29 3.95052 6.77L0.747584 7.03C0.220518 8.43 -2.131 9.87 5.77498 10.82L11.2078 9.95L13.0323 10.62L8.4103 10.68C11.0456 11.31 12.7079 10.74 14.5324 10.35C14.9783 10.71 15.7892 10.96 16.8839 11.09L22.1951 9.74001C22.8843 10.29 19.8436 10.83 23.4519 11.12C25.9251 10.49 20.9788 9.9 25.1142 9.48C27.7901 10.11 27.0198 10.63 30.1011 10.07C30.547 10.43 29.8983 10.66 28.682 10.82C31.3985 10.38 35.9393 10.61 37.3178 9.87C40.1153 10.64 46.5617 9.64 46.359 10.96C47.2104 10.64 51.1431 9.91 53.6568 9.84C49.1565 11.44 63.1035 9.9 61.9682 11.6C65.2928 10.17 74.2529 10.93 80.2534 10.12C79.929 10.23 79.2803 10.47 78.7532 10.39C82.1589 10.5 83.1725 10.92 85.3618 11.18C85.7267 10 90.9974 9.72 93.8354 8.98C98.0519 10.1 91.3623 10.37 92.7407 11.45C92.4975 10.5 99.9169 10.48 98.4574 9.69C101.66 10.38 101.214 10.02 102.917 10.99C103.404 9.52001 105.877 10.73 108.472 9.82C113.134 10.53 109.728 11.19 114.756 10.73C117.188 11.17 112.729 11.71 112.729 11.71L112.648 11.72ZM232.9 8.78V8.8C231.845 8.82 230.994 8.84 230.426 8.86C230.953 8.84 231.643 8.82 232.9 8.79V8.78ZM243.035 8.74001C241.819 8.71001 240.278 8.71 238.657 8.72C238.292 8.43 238.657 8.13 239.67 8.14C239.143 8.34 241.535 8.50001 243.035 8.74001ZM221.304 2.96C222.885 2.84 223.453 3 223.656 3.17C222.885 3.19 222.034 3.22 220.858 3.28C220.818 3.31 220.736 3.35 220.655 3.38C220.818 3.22 220.98 3.07 221.264 2.95L221.304 2.96Z" />
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
		const circleSVG = `<svg width="163" height="182" viewBox="0 0 163 182" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M91.2785 49.7596C91.445 49.5885 90.7857 49.222 90.5104 48.9138C90.5218 48.5649 91.022 49.1456 91.35 49.2935C91.3056 49.0343 90.8793 48.5209 90.9784 48.4237C91.0797 48.4951 91.1346 48.5035 91.2316 48.6023C90.8876 48.1013 91.5542 48.1463 91.1289 47.5348C91.1954 47.5589 91.246 47.5946 91.285 47.6145C90.977 47.4276 90.6732 47.2132 90.4749 47.0429C90.5307 46.9532 90.2321 46.6134 90.6414 46.8718C90.594 46.9067 90.7575 47.0296 90.8388 47.1401L90.7311 46.9274C91.3398 47.2582 90.8303 47.195 91.2196 47.4924C91.1836 47.1784 90.8713 46.6541 91.1381 46.6525C91.6993 47.0181 91.0708 47.0911 91.6889 47.269L91.3314 47.313C92.2955 47.7958 91.1774 47.4019 92.1922 47.9204C92.5549 47.7509 92.1698 47.4261 92.521 47.2408C92.2688 46.9642 92.061 46.9467 91.8089 46.67C91.5502 45.8874 93.3911 47.3307 92.8698 46.5223C92.5554 46.1941 91.8897 45.6864 92.4034 45.7222L92.9709 46.229C93.2166 45.9998 92.1902 45.4655 92.7945 45.4589C93.0003 45.6724 92.8537 45.8045 92.9634 45.8211C93.5857 45.9715 92.6965 45.458 92.804 45.306L93.381 45.66C93.4906 45.3119 93.3163 44.7104 93.4301 44.3349C93.5778 44.4695 93.7213 44.6315 93.9407 44.6648C93.9468 44.0766 94.6006 43.8391 95.1637 43.6439L94.7722 43.1778C94.7722 43.1778 95.0423 43.2468 95.1119 43.3415C95.3988 43.3008 94.8197 43.1429 94.653 42.9493C94.6698 42.8397 95.0095 43.0034 95.1139 43.1455C94.8722 42.6179 94.6884 41.8045 95.3982 41.842L95.5027 41.9841C95.8412 41.8811 94.6523 41.1258 95.2324 41.1857L95.302 41.2804C95.8081 40.9083 95.6792 40.1032 96.64 40.1507C95.9543 39.6821 97.2358 39.8342 96.2336 39.2335C96.8812 39.2194 97.0205 39.4089 97.5878 39.1863C97.6985 39.1049 97.0476 38.6836 97.0064 38.495L97.537 38.7858L97.0791 38.2956L97.771 38.5408L97.7024 38.3481C97.7024 38.3481 97.3966 38.3297 97.2563 38.2383C97.1222 37.9235 97.8869 37.9692 98.1759 38.0972L97.9752 37.3935C98.182 37.509 98.22 37.627 98.3245 37.7691C97.914 37.244 98.9183 38.0134 98.5311 37.5199C98.394 37.4991 98.2231 37.3329 98.106 37.2731C98.4899 37.3313 98.6142 37.0696 98.5857 36.7988L98.9443 37.0215C99.2142 36.7257 99.1412 36.1957 99.3415 35.8053C99.0937 35.8659 98.4618 35.5036 98.4554 35.3624L99.0493 35.6067C98.7222 35.3607 98.7666 35.6199 98.4174 35.2444C98.5597 35.1397 99.1136 35.4621 99.2687 35.6399L99.1578 35.3566C99.3298 35.4248 99.3994 35.5195 99.6062 35.635C99.2791 35.389 100.34 35.606 99.7716 35.1972L99.9435 35.2653C100.144 34.8749 100.033 34.5916 100.166 34.2751C99.6699 34.0316 99.8354 33.9585 99.4852 33.681C99.7615 33.5265 100.265 33.4485 100.354 33.1394C100.193 32.8204 99.9563 32.8968 99.7 32.6476C100.161 32.8437 100.25 32.5346 100.498 32.8387C100.585 32.4591 100.613 32.3652 100.439 31.7637C100.235 31.7188 100.133 31.7454 99.9812 31.6382C99.9432 31.5202 100.261 31.5543 100.467 31.6698L100.502 31.7172C100.036 30.9171 102.364 31.1998 101.575 30.3931L101.61 30.4404L101.299 29.8181C101.461 29.6744 101.594 30.0873 101.948 30.0708C101.379 29.2972 102.354 29.4311 102.007 28.8595C103.487 29.182 102.348 27.8311 103.383 27.8478L103.051 27.7273C102.779 27.4897 103.295 27.6941 103.385 27.6517C103.135 27.5437 103.052 27.6293 102.904 27.4947C102.871 26.5218 104.097 26.0343 104.755 25.3066C104.978 25.0458 103.179 24.4225 104.114 24.3678L104.659 24.745C104.225 23.8236 105.229 23.4989 104.885 22.6332C105.01 22.7362 105.182 22.8044 105.157 22.8708C105.639 22.9299 105.382 22.4139 105.026 22.2619C105.121 22.1921 105.359 22.3824 105.566 22.3999C105.877 22.3907 105.16 21.8473 105.606 21.9571C105.689 21.9695 105.731 22.0601 105.754 22.0917C105.583 21.9255 105.978 21.7328 105.437 21.5948C105.764 21.4761 105.392 21.0689 105.777 21.0291C105.271 20.6718 106.211 20.7583 105.442 20.3752C106.255 20.7508 106.271 20.2765 105.941 19.9599C106.171 20.107 106.251 19.9508 106.571 20.1536C106.623 19.9932 106.543 19.7847 106.121 19.6085C107.222 19.7474 105.605 18.6747 106.935 19.0587C106.715 18.394 106.623 17.805 106.616 17.2991C107.412 17.6863 106.481 17.8116 107.337 18.1797C107.197 17.6256 106.595 17.0714 106.979 16.7649C107.14 16.7192 107.31 16.9834 107.423 17.0707C107.283 16.5165 107.858 16.3372 107.593 15.778C107.671 15.8179 107.729 15.8968 107.776 15.96C107.788 15.8777 107.973 15.8636 107.606 15.6958L107.687 15.8063C107.088 15.6874 106.714 15.0136 106.441 14.874C107.427 15.4864 106.883 14.6464 108.091 15.4607C108.033 15.3818 107.901 15.2356 107.651 15.1275C107.753 15.101 107.902 15.1375 108.151 15.3436C108.064 14.9938 107.657 14.9041 107.762 14.6814C107.945 14.7654 107.976 14.8401 108.167 14.9673C107.887 14.6864 107.592 14.4172 107.836 14.286C107.938 14.3574 108.086 14.394 108.05 14.4447C108.16 14.0966 107.406 13.4352 107.914 13.2318C108.627 13.7045 108.224 13.2227 108.892 13.5343L108.797 13.2393L108.444 13.1579C108.54 12.9901 108.136 12.6062 108.435 12.5813L108.632 12.8497L108.691 12.4659L108.345 12.5257C108.101 12.1941 107.51 12.1185 107.809 11.9956C107.867 12.0745 107.905 11.8278 108.335 11.9491C108.169 11.7555 108.002 11.5619 108.218 11.5246C108.445 11.601 108.928 11.9267 109.077 11.9633C108.57 11.606 109.121 11.4931 108.607 11.0926C108.732 11.1956 109.067 11.3867 109.149 11.3992L108.744 11.1134C108.929 11.0993 109.007 11.1392 109.264 11.2904C109.462 11.096 108.393 10.9339 108.912 10.8442C108.935 10.8758 109.013 10.9157 109.044 10.9905C109.367 10.8011 109.051 10.3043 109.382 10.1581C110.07 10.4306 109.418 10.4721 110.02 10.6616C110.088 10.223 109.64 9.48186 110.004 9.2144L109.902 9.24097C109.016 8.70004 110.506 9.23439 110.177 8.8198C110.235 8.89873 110.644 9.15714 110.543 9.08569C110.819 8.93119 110.608 8.4784 110.535 7.94836L110.745 8.13448C111.028 8.12122 111.085 7.83544 111.267 7.75073C111.057 7.56461 111.152 7.49483 110.78 7.35439C112.358 7.67774 110.579 6.01933 111.941 6.282C111.905 6.33268 112.06 6.51048 112.092 6.48722L112.109 6.01285C111.707 5.79764 111.843 5.91645 111.495 5.80758C111.285 5.62147 111.177 5.40878 111.245 5.33485C111.406 5.65389 111.861 5.70876 112.115 5.78937C111.998 5.72954 111.873 5.62652 111.745 5.5509C112.535 5.7969 110.997 5.03076 111.62 5.08317L111.823 5.22608C111.777 5.06491 111.564 4.80818 111.698 4.75835C112.166 4.99766 111.845 4.99098 112.188 5.22529C112.252 5.08075 111.541 4.4119 112.049 4.57312C112.142 4.69941 112.07 4.80076 112.163 4.92704C112.766 5.11652 112.653 5.02929 112.787 4.97945L113.148 4.90805L112.972 4.86732C111.95 3.9409 112.993 4.36554 112.388 3.6427C112.954 4.34559 112.762 3.95179 113.257 4.29329C113.433 4.33401 113.641 4.35148 113.765 4.45451C113.443 4.08312 114.196 4.47782 113.72 3.92863C113.887 4.02419 113.807 3.81566 114.196 4.11312C114.175 3.88549 113.912 3.95773 113.709 3.81482C113.311 3.20748 114.726 3.77256 114.193 2.94838C114.084 2.46902 113.602 2.04527 113.528 1.61327C113.837 1.70219 114.045 2.08437 114.045 2.08437C114.362 2.11846 114.411 1.98554 114.323 1.73381C114.428 1.87588 114.576 1.91245 114.771 2.01217C114.804 1.89088 114.27 1.52944 114.588 1.56354C114.747 1.71392 114.992 1.9474 115.12 2.12104C115.055 1.90088 114.866 1.57769 114.818 1.3459C115.114 1.51707 115.167 1.72145 115.306 1.91088C115.285 1.68324 115.331 1.38168 114.939 1.01361L114.719 0.980352C114.719 0.980352 115.101 1.23461 115.143 1.32517C115.383 1.68409 114.868 1.38163 114.716 1.27444L114.687 1.10164C113.724 0.520827 114.56 1.55937 114.386 1.68729L113.784 1.13311L114.202 1.7014C113.991 1.61332 113.605 1.38647 113.575 1.21367C113.156 1.10812 113.729 1.4895 113.276 1.33659C113.209 1.31249 113.186 1.28092 113.163 1.24935L113.262 1.51686C113.142 1.38642 112.779 1.19115 112.932 1.2003C112.379 1.14458 113.156 1.93556 112.598 1.64058L112.563 1.59322C112.562 2.05595 113.038 1.97376 113.431 2.60851L112.12 1.91883L112.595 2.29938C112.595 2.29938 112.472 2.36499 112.286 2.21045C112.541 2.55774 112.52 2.3301 112.784 2.62256C112.205 2.46465 112.695 3.19827 111.888 2.69723C112.218 3.01379 112.288 2.7438 112.429 3.10188C111.556 2.57674 112.454 3.40013 111.953 3.2821C111.54 2.95307 111.862 2.95975 111.388 2.84588C112.069 3.43996 111.037 3.03111 111.102 3.25127C111.686 3.64844 111.176 3.68328 111.235 4.02888C111.032 3.88597 110.644 4.21989 110.298 4.27967L110.197 4.20821C110.777 4.6328 110.533 4.76403 110.57 4.98004C110.199 4.74156 110.075 4.63854 109.963 4.45327L109.871 4.59365C110.042 4.75983 110.112 4.85454 110.134 4.98414L109.706 4.66674C109.617 4.87775 110.005 5.37126 109.549 5.41441C109.97 5.68861 110.858 5.93545 110.987 6.37577C110.741 6.24033 110.355 6.01349 110.289 5.89136C110.313 5.92293 110.429 6.08079 110.319 6.06416L109.993 5.72019C109.754 5.72598 110.277 5.9736 110.198 6.03175C109.862 5.84063 109.928 5.96276 109.675 5.78412C109.651 5.75255 109.855 5.79743 109.746 5.68277C109.636 5.76418 109.357 5.75002 109.08 5.63784C109.275 5.73755 109.528 5.9162 109.527 6.01423C109.438 6.22523 109.089 5.84968 108.85 5.85547C109.06 6.04159 108.754 6.02328 109.241 6.32158C109.205 6.37225 108.971 6.2526 108.827 6.18861C108.989 6.40961 108.626 6.67708 109.224 6.89398L109.255 6.87072C109.255 6.87072 109.278 6.90229 109.29 6.91807C109.617 7.52872 108.61 7.41812 108.652 7.87339L108.485 7.77783C108.564 8.08439 108.354 8.26298 108.637 8.61443C108.601 8.6651 108.249 8.58365 108.074 8.44489C108.111 8.6609 108.29 8.77224 107.901 8.83948C107.68 8.53955 107.607 8.73893 107.774 8.56781C107.518 8.68326 107.225 8.5827 107.589 9.04465C107.188 8.73141 106.966 8.89421 107.039 9.05955L107.427 9.09033C107.434 9.23156 107.355 9.2897 107.271 9.37526L106.722 9.02545C105.819 9.05692 107.54 10.3697 106.213 10.0564C106.57 10.3771 106.602 9.98913 107.042 10.3223C106.868 10.4502 105.948 10.2267 105.896 10.289C105.448 10.3753 106.623 10.9462 106.26 11.1156C106.487 11.1921 107.054 11.4322 107.149 11.7272C106.975 11.8551 106.158 11.5069 106.062 11.31C106.071 11.2552 106.141 11.2518 106.204 11.3034C106.161 11.2128 106.112 11.079 105.838 11.0375L106.028 11.1646C105.777 11.1546 105.665 11.4321 105.353 11.1745C105.484 11.4188 105.669 11.4047 105.83 11.359C105.41 11.4495 105.634 11.722 105.303 11.8682C105.44 11.889 105.694 11.9696 105.674 12.0086C105.244 12.252 105.985 12.3642 105.97 12.6425C105.593 12.6275 105.221 12.2204 105.374 12.5943C105.087 12.635 104.808 12.3541 104.66 12.2195C104.962 12.63 104.194 12.5136 104.067 12.6066L103.928 12.4172C104.009 12.5277 103.989 12.5667 103.965 12.6332L104.407 12.7703C104.305 12.7969 104.28 12.8633 104.097 12.7794C104.346 12.9855 104.812 13.0561 105.127 13.3843C104.875 13.3743 105.221 13.7773 104.654 13.5371C104.994 13.3361 104.072 13.3086 104.102 13.0187C104.16 13.0976 104.109 13.1599 104.006 13.1865C103.94 13.1624 103.889 13.1266 103.882 13.0834C103.258 13.1291 104.446 13.5196 104.306 13.793C103.998 13.606 103.681 13.5719 103.723 13.6625C103.783 13.5453 104.282 13.8594 104.46 14.0688C104.126 14.1443 104.544 14.3479 104.472 14.4493L104.649 14.392C104.957 14.5789 104.846 14.6603 104.892 14.8215C104.642 14.7135 104.78 14.6362 104.643 14.6154C105.129 15.0118 103.905 14.6719 104.199 15.0391C103.948 15.0291 103.594 14.779 103.425 14.7815C103.727 15.1919 102.871 14.8238 103.106 15.2101C103.564 15.3356 103.475 15.2799 103.801 15.6239L103.684 15.1013L104.193 15.6273C104.253 15.5101 104.04 15.2534 104.142 15.2268C104.438 15.496 104.332 15.452 104.723 15.5534C104.015 15.4179 104.958 16.0378 104.44 16.0294L103.393 15.5341C102.808 15.5997 103.715 16.2702 103.285 16.5136L103.529 16.4804C103.926 16.723 103.491 16.7271 103.614 16.9282C103.263 16.7487 103.106 16.767 102.859 16.7296C103.121 16.8534 102.707 16.9871 103.398 17.3303L102.857 17.2903C102.529 17.5071 103.72 18.0664 103.475 18.2956C103.12 18.0455 102.81 18.0546 102.633 17.7472C102.577 17.8369 102.482 17.9067 102.732 18.0147C102.485 17.9773 103.08 18.4883 102.712 18.4185C102.848 18.5373 103.215 18.7052 103.132 18.7907C103.05 18.7783 102.96 18.7226 102.96 18.7226C103.132 18.7907 103.13 18.9868 103.553 19.0649C102.319 18.8779 103.27 19.9056 102.227 19.7477C102.244 20.0027 102.269 20.301 102.212 20.4887C102.122 20.433 102.028 20.4048 102.087 20.3857C101.635 20.4995 103.035 20.9781 102.551 21.1151C101.92 21.0195 102.314 20.8268 102.048 20.8285C100.856 20.3673 102.067 21.2522 101.283 21.1474L101.225 21.0685C100.766 21.041 101.517 21.6318 101.319 21.8261C101.319 21.8261 101.229 21.7705 101.136 21.7422C101.661 22.1585 101.723 22.5747 101.775 22.8771C101.354 22.6029 101.569 22.6636 101.088 22.5065C101.111 22.6361 101.843 22.8032 101.887 23.0624C101.613 23.0208 101.322 23.0889 100.806 22.8845L100.867 22.6693C100.178 22.4948 100.77 22.9352 100.62 22.9966L100.347 22.857C100.308 23.2018 101.019 23.5059 100.816 23.8258L101.047 23.8748C101.673 24.3625 100.588 23.8473 101.031 24.2511L100.3 23.986C100.439 24.1755 100.822 24.6964 100.851 24.9672C100.372 24.6141 100.203 24.2519 99.9668 23.9636C99.9067 24.0807 99.8446 24.3939 100.164 24.5966C100.106 24.5177 99.9585 24.3831 100.1 24.3765C100.602 24.7612 100.779 25.0686 100.675 25.2912C99.3121 24.6638 100.058 25.7447 98.9232 25.4605C99.2462 26.0986 98.3508 26.1732 98.216 26.6858C99.3625 26.9858 98.1791 26.8345 99.3004 27.299C99.3226 27.4286 99.2867 27.4793 99.2203 27.4552L98.4272 27.5033C98.0707 27.4493 98.2215 27.2898 97.9831 27.1975C97.7965 27.4077 97.4663 27.0911 97.1087 27.1351C97.5075 27.2797 97.6309 27.4808 97.4105 27.5456L97.9948 27.578C98.4359 28.1779 96.9443 27.4749 97.3738 28.059L97.0784 27.7898C97.2051 28.0614 96.797 28.4344 97.5798 29.0019C97.4427 28.9811 97.122 28.8764 97.0682 28.7701C96.7467 29.1281 97.576 30.1234 96.8926 30.1882L96.6352 30.0369C96.6732 30.1549 97.0709 30.3975 96.7651 30.3792C96.648 30.3194 96.5077 30.228 96.476 30.2512C96.5457 30.346 96.8601 30.6742 96.6439 30.7115L96.3833 30.4897C95.855 30.7322 96.8245 31.4542 96.8437 31.8779C96.0589 31.5065 95.6645 31.6992 95.4673 31.7955L95.3502 31.7357C95.0203 32.1486 95.6174 32.8282 95.6978 33.4014C94.7222 33.2676 94.8976 34.1358 94.2248 34.3143C94.3935 34.3118 94.8218 34.6292 94.8598 34.7472C94.6595 34.7729 95.2661 35.2997 94.5519 34.9249L94.5836 34.9017C93.841 34.6208 93.936 34.9157 93.8285 35.0677L94.7336 35.5696C93.1789 35.2779 94.6413 36.9022 93.327 36.5066C93.4895 36.7276 93.4294 36.8447 93.6194 37.0699L93.1278 36.799C92.8589 36.9967 92.7166 37.1013 92.6535 37.5126L92.3422 37.255C92.2031 37.4303 93.6029 38.2737 93.546 38.4614L92.8003 38.1099C92.6359 38.4497 91.8122 38.423 92.268 39.1093C92.1668 39.0378 91.96 38.9223 91.9726 38.8401C91.8535 38.9763 91.1417 39.1349 92.1406 39.665C91.4971 39.287 91.8707 39.9608 92.0554 40.3114L91.6113 40.0056C92.1241 40.5041 92.276 40.6113 92.3119 40.9253C92.2255 40.9403 91.9058 40.7375 92.0588 40.7467C91.7213 40.7516 92.4196 41.138 92.0463 41.1936L91.7899 40.9444C91.6549 41.0922 91.8111 41.172 92.1139 41.4844C92.2331 41.7129 91.7976 41.717 91.3682 41.4976C91.6056 41.6879 91.8968 41.9845 91.7238 42.0144C91.5561 41.9188 91.4865 41.8241 91.4516 41.7768C90.976 41.859 91.7145 42.532 91.1429 42.4173C90.991 42.3101 90.8971 42.2818 90.8422 42.2735C91.0014 42.0592 91.1364 41.9113 91.1596 41.9429C90.7387 41.6687 90.5373 41.7925 90.0403 41.2823C90.2841 41.6138 90.7948 42.3084 90.4805 42.3449C90.4415 42.325 90.4024 42.305 90.3244 42.2651L90.2896 42.2178C90.2896 42.2178 90.2379 42.2801 90.2801 42.3706C90.1662 42.3814 90.0956 42.3847 90.0597 42.4354C89.7011 42.2127 89.7413 42.4993 89.658 42.5849C90.1179 42.879 89.9682 42.9405 90.4217 43.0934C90.3827 43.0735 90.3869 43.0461 90.3995 42.9638C90.3879 42.948 90.3921 42.9206 90.3805 42.9048L90.4037 42.9364C90.4037 42.9364 90.4838 42.7802 90.5239 42.7021C90.698 42.9389 90.8489 43.1441 90.5398 43.0552C90.7962 43.3045 91.0684 43.5421 91.1887 43.6726C90.4661 43.3526 89.9757 43.3484 89.5622 43.1174C89.6362 43.5494 89.3114 43.8368 90.0331 44.6195C90.0943 44.769 89.7241 44.5306 89.5796 44.4666C89.5099 44.3719 89.5732 44.3254 89.4645 44.2107C89.5711 44.5214 89.2474 44.7108 89.8076 45.1744C89.4153 45.1711 89.3381 44.6684 89.2602 44.9933L89.1325 44.8196C87.8162 44.6201 89.9601 46.7404 88.3474 46.3697C88.4571 46.3864 88.4961 46.4063 88.5857 46.462C87.5871 46.6613 88.0738 48.1517 86.7565 48.0502C86.458 48.0751 86.7883 48.3916 86.9613 48.7265L86.4824 48.3733L86.837 48.9881C86.9722 49.5697 85.3792 48.4305 85.7972 49.3635L86.1127 49.5937C85.9629 49.6552 85.9662 50.0905 85.6518 49.7623C85.6983 49.8254 85.9114 50.0822 85.7162 49.9824L85.4831 49.7648L85.6099 50.4011C85.2524 50.4451 84.7637 49.5155 84.4432 49.7755C84.4296 49.9557 84.7863 50.7392 84.9815 50.8389C85.0289 50.804 85.2167 50.8605 85.4498 51.0782L85.4594 51.29C86.0882 51.9464 86.6728 52.7083 87.3615 52.8828L87.1282 52.3005L87.5101 52.5547L87.371 52.73C87.7455 52.941 87.5291 52.6137 87.4257 52.3736C87.6124 52.5281 87.7527 52.6195 87.8466 52.6478L87.3917 51.8635C87.6798 52.0895 87.8212 52.4476 88.088 52.4459C87.8759 52.0912 87.4456 51.9698 87.3822 51.6516C87.7725 51.8511 87.9856 52.1078 87.8283 51.7614C88.0151 51.9159 88.0963 52.0264 88.1185 52.156C88.0077 51.8727 88.2671 51.8279 87.9611 51.4449C88.4137 51.6958 88.1497 51.0386 88.787 51.6402C88.6593 51.4665 88.4482 51.0137 88.4925 50.9082C89.1192 51.7607 88.8446 50.625 89.6211 51.416C89.0324 50.6815 89.7147 50.7148 89.5047 50.164C89.5511 50.2271 89.644 50.3534 89.5775 50.3293C89.7431 50.2562 89.9846 50.4191 90.1766 50.4482C89.609 49.9413 89.6279 49.6356 89.3419 49.2136C90.0212 49.541 89.9549 49.8816 90.5509 50.2945C90.0646 49.8982 90.287 49.6374 89.8545 49.3474C90.3039 49.5277 90.1013 49.3848 90.6509 49.7346C89.9198 49.1048 90.6139 49.5186 90.2225 49.0525C90.7351 49.1863 90.9546 49.5843 90.8722 49.2071C91.1654 49.3076 91.3027 49.6931 91.3027 49.6931L91.2785 49.7596ZM93.2581 44.2668C93.2581 44.2668 93.2297 44.3606 93.2139 44.3723C93.2139 44.3723 93.2223 44.3175 93.2465 44.251L93.2581 44.2668ZM93.5132 43.8847C93.5132 43.8847 93.4025 43.9661 93.3783 44.0325C93.2106 43.937 93.0587 43.8298 93.0945 43.7791C93.1799 43.8622 93.3371 43.8439 93.5016 43.8689L93.5132 43.8847ZM89.7877 42.5625C89.7877 42.5625 89.8668 42.5043 89.9564 42.56C89.9522 42.5874 89.9438 42.6423 89.9354 42.6971L89.9702 42.7444C89.9122 42.6655 89.8225 42.6099 89.7603 42.5583L89.7877 42.5625Z"/>
<path d="M107.694 81.2966C107.921 81.3731 107.991 80.6403 108.148 80.2574C108.475 80.1386 108.135 80.8024 108.13 81.1945C108.348 81.0591 108.68 80.4502 108.797 80.51C108.78 80.6197 108.799 80.6787 108.723 80.8074C109.066 80.3123 109.279 80.9337 109.697 80.3099C109.701 80.3805 109.692 80.4353 109.684 80.4902C109.738 80.1338 109.836 79.7699 109.918 79.5157C110.027 79.5323 110.243 79.1303 110.144 79.5922C110.078 79.5681 110.037 79.7442 109.961 79.8729L110.127 79.7018C110.038 80.3756 109.918 79.8804 109.771 80.3772C110.047 80.2227 110.457 79.7517 110.576 79.9802C110.42 80.6298 110.123 80.0939 110.195 80.722L110.006 80.3988C109.913 81.4647 109.87 80.28 109.753 81.4123C110.032 81.6932 110.222 81.1889 110.501 81.4697C110.677 81.1458 110.625 80.9414 110.805 80.59C111.469 80.1016 110.724 82.303 111.317 81.5512C111.533 81.1492 111.796 80.3475 111.928 80.8584L111.638 81.5579C111.951 81.7175 112.127 80.566 112.317 81.1559C112.177 81.4292 111.998 81.3179 112.024 81.4201C112.081 82.0598 112.291 81.0537 112.467 81.0944L112.311 81.7441C112.676 81.7433 113.194 81.387 113.63 81.3829C113.545 81.5664 113.434 81.7459 113.455 81.9735C114.029 81.7941 114.463 82.3508 114.819 82.8676L115.161 82.3725C115.161 82.3725 115.162 82.6391 115.091 82.7405C115.206 82.9964 115.2 82.3924 115.355 82.2055C115.469 82.1947 115.399 82.5627 115.291 82.7148C115.754 82.3501 116.5 81.9722 116.673 82.6717L116.554 82.8079C116.747 83.1037 117.192 81.7546 117.284 82.3436L117.189 82.4134C117.699 82.8413 118.491 82.5265 118.665 83.4927C118.979 82.7268 119.119 84.0103 119.495 82.9312C119.649 83.5718 119.51 83.747 119.838 84.2597C119.951 84.3469 120.229 83.6316 120.422 83.5627L120.248 84.1534L120.626 83.6076L120.528 84.3362L120.702 84.2082C120.702 84.2082 120.674 83.9374 120.742 83.7654C121.038 83.5719 121.16 84.3337 121.07 84.6428L121.753 84.3114C121.676 84.5382 121.553 84.6038 121.438 84.7126C121.895 84.2067 121.314 85.339 121.723 84.868C121.733 84.7151 121.844 84.5357 121.893 84.4028C121.916 84.7991 122.198 84.8838 122.462 84.8116L122.304 85.1945C122.663 85.4172 123.179 85.2569 123.621 85.3941C123.517 85.154 123.775 84.4778 123.933 84.4595L123.781 85.0817C123.989 84.7345 123.725 84.8067 124.039 84.4055C124.175 84.5243 123.941 85.1341 123.775 85.3052L124.035 85.1623C123.994 85.3385 123.911 85.424 123.834 85.6508C124.042 85.3036 123.976 86.3736 124.296 85.7489L124.255 85.925C124.697 86.0621 124.957 85.9193 125.31 86.0007C125.488 85.4807 125.576 85.6344 125.831 85.2523C126.029 85.5206 126.192 86.0083 126.521 86.0582C126.818 85.8646 126.726 85.6403 126.925 85.3479C126.794 85.8331 127.123 85.8829 126.854 86.1787C127.253 86.2252 127.363 86.2419 127.962 85.996C127.98 85.7883 127.942 85.6704 128.034 85.53C128.14 85.476 128.16 85.8017 128.072 86.0127L128.024 86.0475C128.795 85.5051 128.814 87.8504 129.564 86.9823L129.517 87.0172L130.133 86.6617C130.308 86.8005 129.902 86.9774 129.945 87.3346C130.69 86.69 130.648 87.6936 131.229 87.2907C131.068 88.7952 132.34 87.5434 132.447 88.5835L132.541 88.2471C132.768 87.9588 132.606 88.4673 132.659 88.5736C132.74 88.3194 132.639 88.2479 132.763 88.0843C133.788 87.9872 134.446 89.1811 135.252 89.7802C135.544 89.9787 136.023 88.1436 136.189 89.0666L135.862 89.6481C136.781 89.1423 137.23 90.1501 138.105 89.7497C138.029 89.8785 137.945 90.0621 137.878 90.038C137.873 90.5281 138.394 90.2424 138.508 89.8669C138.593 89.95 138.414 90.2034 138.424 90.4152C138.476 90.7176 138.97 89.965 138.898 90.431C138.886 90.5133 138.807 90.5714 138.775 90.5947C138.93 90.4078 139.193 90.7983 139.265 90.2342C139.427 90.5532 139.823 90.1645 139.906 90.5417C140.225 90.015 140.219 90.9679 140.553 90.1629C140.242 90.9994 140.748 90.992 141.038 90.6573C140.891 90.8874 141.074 90.9713 140.898 91.2953C141.086 91.3518 141.299 91.2438 141.421 90.8135C141.39 91.9309 142.365 90.2412 142.088 91.5878C142.774 91.327 143.383 91.195 143.921 91.1644C143.599 91.9851 143.361 91.0654 143.073 91.9335C143.648 91.7542 144.165 91.1311 144.545 91.4834C144.618 91.6488 144.354 91.819 144.262 91.9594C144.837 91.78 145.102 92.3392 145.666 92.046C145.626 92.1241 145.558 92.198 145.495 92.2445C145.593 92.2454 145.634 92.4339 145.764 92.0468L145.653 92.1282C145.718 91.5209 146.374 91.0874 146.503 90.7983C145.978 91.8408 146.804 91.2087 146.1 92.5046C146.179 92.4465 146.314 92.2986 146.396 92.0444C146.449 92.1507 146.412 92.2995 146.233 92.5528C146.599 92.454 146.639 92.0112 146.889 92.1192C146.821 92.2912 146.742 92.3493 146.637 92.572C146.895 92.2605 147.154 91.9489 147.328 92.1857C147.284 92.2912 147.247 92.4399 147.18 92.4158C147.576 92.4898 148.161 91.6948 148.45 92.1875C148.026 92.9368 148.486 92.5016 148.267 93.1977L148.566 93.0748L148.594 92.7142C148.777 92.7982 149.139 92.3621 149.222 92.6412L148.977 92.8705L149.385 92.8622L149.282 92.5241C149.607 92.2367 149.586 91.6443 149.767 91.9243C149.688 91.9825 149.951 92.0082 149.911 92.451C150.093 92.2683 150.264 92.0698 150.356 92.2941C150.306 92.525 150.046 93.0326 150.021 93.1971C150.329 92.6546 150.539 93.2055 150.878 92.6397C150.775 92.7643 150.649 93.124 150.637 93.2063L150.9 92.7693C150.93 92.9421 150.917 93.0244 150.789 93.3135C151.026 93.5037 151.026 92.4096 151.201 92.9131C151.169 92.9363 151.157 93.0186 151.066 93.0609C151.298 93.3767 151.793 92.9887 151.993 93.3277C151.813 94.0438 151.675 93.3917 151.55 94.018C152.009 94.0455 152.737 93.5106 153.079 93.8429L153.009 93.7482C153.45 92.7912 153.144 94.3298 153.525 93.9526C153.446 94.0108 153.249 94.4718 153.309 94.3547C153.522 94.6114 153.972 94.329 154.499 94.1845L154.352 94.4146C154.435 94.6938 154.741 94.7121 154.869 94.8857C155.016 94.6556 155.09 94.7229 155.176 94.3433C155.179 95.9708 156.51 93.9704 156.551 95.3511C156.485 95.327 156.33 95.514 156.369 95.5339L156.872 95.4559C157.01 95.0139 156.914 95.1817 156.957 94.8095C157.104 94.5794 157.294 94.4399 157.4 94.4839C157.115 94.6932 157.142 95.1601 157.127 95.4385C157.175 95.3055 157.251 95.1768 157.288 95.0281C157.217 95.8588 157.654 94.1998 157.757 94.8046L157.653 95.0273C157.803 94.9658 158.025 94.705 158.122 94.8038C157.987 95.3164 157.912 94.9824 157.751 95.3928C157.927 95.4336 158.434 94.5987 158.393 95.1395C158.267 95.2325 158.173 95.2043 158.042 95.3247C157.973 95.9594 158.065 95.819 158.142 95.957L158.338 96.3233L158.324 96.1389C159.027 94.941 158.839 96.0767 159.443 95.3407C158.847 96.0218 159.223 95.7702 158.97 96.3209C158.983 96.5054 159.02 96.7214 158.929 96.8618C159.243 96.4605 159.003 97.2938 159.456 96.7173C159.399 96.905 159.585 96.7929 159.392 97.2265C159.628 97.1501 159.47 96.9017 159.574 96.6791C160.085 96.1815 159.913 97.6702 160.623 96.9782C161.076 96.7665 161.388 96.1966 161.81 96.008C161.803 96.3295 161.462 96.6286 161.462 96.6286C161.525 96.9468 161.678 96.9559 161.911 96.8089C161.82 96.9493 161.799 97.0864 161.765 97.3057C161.906 97.2991 162.113 96.6852 162.16 97.015C162.049 97.1944 161.888 97.5068 161.749 97.682C161.962 97.5741 162.255 97.3099 162.468 97.2019C162.39 97.5268 162.177 97.6347 162.05 97.8258C162.27 97.761 162.612 97.7286 162.841 97.2443L162.804 97.0283C162.804 97.0283 162.666 97.4703 162.587 97.5284C162.285 97.8474 162.444 97.2684 162.513 97.0964L162.662 97.035C162.968 95.9592 162.145 97.0266 161.958 96.8721L162.35 96.146L161.873 96.6909C161.907 96.4716 162.045 96.0297 162.195 95.9682C162.191 95.5329 161.937 96.1817 161.982 95.7115C161.994 95.6292 162.01 95.6176 162.03 95.5786L161.793 95.753C161.873 95.5968 161.975 95.2055 162.025 95.3393C161.913 94.7893 161.361 95.7297 161.47 95.1149L161.517 95.08C161.026 95.1739 161.253 95.615 160.706 96.1633L161.054 94.7153L160.79 95.2503C160.79 95.2503 160.708 95.1398 160.797 94.9288C160.495 95.2477 160.716 95.183 160.497 95.5144C160.503 94.9262 159.876 95.5326 160.18 94.6529C159.936 95.0508 160.231 95.0533 159.919 95.2585C160.239 94.2691 159.612 95.3382 159.605 94.8323C159.845 94.3637 159.909 94.6819 159.902 94.176C159.47 94.9801 159.627 93.8677 159.43 93.9641C159.16 94.6245 159.001 94.1094 158.658 94.2398C158.762 94.0172 158.334 93.6998 158.188 93.3691L158.232 93.2636C157.935 93.9199 157.745 93.6947 157.521 93.7869C157.682 93.3765 157.774 93.2362 157.936 93.0925L157.776 93.0401C157.66 93.2469 157.561 93.3441 157.431 93.3665L157.66 92.8822C157.429 92.8332 156.992 93.3 156.836 92.8556C156.639 93.3166 156.566 94.2454 156.129 94.4456C156.21 94.1914 156.375 93.7536 156.486 93.6722C156.454 93.6954 156.319 93.8433 156.309 93.7295L156.591 93.3515C156.543 93.1197 156.388 93.6713 156.298 93.6157C156.439 93.2443 156.329 93.3257 156.442 93.0483C156.473 93.025 156.471 93.2211 156.559 93.1081C156.477 92.9976 156.406 92.7342 156.479 92.4368C156.418 92.652 156.294 92.9137 156.192 92.9402C155.961 92.8912 156.291 92.4783 156.23 92.2308C156.083 92.4609 156.047 92.1468 155.837 92.6901C155.771 92.666 155.852 92.4118 155.889 92.2631C155.69 92.4575 155.333 92.1368 155.24 92.7399L155.263 92.7715C155.263 92.7715 155.232 92.7947 155.216 92.8064C154.647 93.225 154.563 92.2164 154.115 92.3028L154.183 92.1308C153.884 92.2538 153.646 92.0635 153.356 92.3982C153.29 92.3741 153.333 92.002 153.433 91.8068C153.213 91.8715 153.124 92.0825 152.987 91.697C153.264 91.4445 153.033 91.3955 153.24 91.511C153.066 91.2742 153.14 90.9768 152.727 91.3772C152.991 90.9402 152.785 90.7267 152.627 90.843L152.65 91.2393C152.505 91.2733 152.419 91.1902 152.334 91.1071L152.623 90.5057C152.456 89.5827 151.337 91.475 151.477 90.1076C151.195 90.4856 151.614 90.4931 151.319 90.9533C151.148 90.7871 151.252 89.8351 151.186 89.811C151.03 89.3665 150.601 90.606 150.373 90.2628C150.324 90.4938 150.149 91.0844 149.849 91.2074C149.678 91.0412 149.934 90.1963 150.136 90.0726C150.191 90.0809 150.194 90.1515 150.154 90.2296C150.249 90.1598 150.367 90.1216 150.381 89.8433L150.265 90.0502C150.248 89.7951 149.967 89.7103 150.159 89.3747C149.937 89.5375 149.967 89.7103 150.028 89.8599C149.879 89.4586 149.618 89.6995 149.429 89.3763C149.435 89.5175 149.366 89.7875 149.327 89.7676C149.025 89.3572 149.005 90.1256 148.683 90.1189C148.644 89.7343 149.041 89.3455 148.662 89.5266C148.579 89.2474 148.837 88.9359 148.972 88.7881C148.556 89.1178 148.619 88.3419 148.499 88.2115L148.689 88.0719C148.578 88.1533 148.512 88.1292 148.445 88.1051L148.358 88.5828C148.304 88.4765 148.254 88.4407 148.322 88.2688C148.143 88.5221 148.122 89.0239 147.82 89.3429C147.803 89.0878 147.423 89.465 147.598 88.8743C147.83 89.19 147.773 88.2837 148.083 88.2746C148.004 88.3327 147.937 88.3086 147.899 88.1906C147.923 88.1242 147.959 88.0735 147.991 88.0502C147.864 87.4139 147.604 88.6508 147.299 88.5345C147.459 88.2222 147.455 87.8849 147.376 87.943C147.509 87.9912 147.233 88.5104 147.019 88.7164C146.9 88.3899 146.735 88.8277 146.634 88.7562L146.707 88.9216C146.546 89.2339 146.461 89.1508 146.284 89.2081C146.365 88.9539 146.474 89.0686 146.463 88.9548C146.089 89.4731 146.321 88.232 145.965 88.5427C145.948 88.2876 146.171 87.9288 146.13 87.7402C145.726 88.0857 146.018 87.1902 145.627 87.4535C145.556 87.9196 145.6 87.814 145.262 88.1837L145.806 88.0276L145.302 88.5684C145.434 88.6166 145.68 88.3873 145.734 88.4936C145.476 88.8051 145.52 88.6996 145.461 89.0834C145.516 88.3623 144.972 89.3459 144.926 88.82L145.318 87.7293C145.171 87.1319 144.561 88.0914 144.259 87.681L144.308 87.9128C144.103 88.3306 144.045 87.887 143.844 88.0107C143.985 87.6394 143.951 87.494 143.977 87.2315C143.892 87.5131 143.688 87.1035 143.41 87.8188L143.396 87.2697C143.164 86.9539 142.653 88.1809 142.393 87.9591C142.632 87.5886 142.58 87.2862 142.892 87.081C142.787 87.037 142.717 86.9422 142.636 87.1965C142.646 86.9456 142.169 87.5885 142.2 87.2006C142.109 87.341 141.952 87.7239 141.85 87.6525C141.863 87.5702 141.919 87.4805 141.919 87.4805C141.85 87.6525 141.65 87.6782 141.614 88.0936C141.694 86.8433 140.695 87.87 140.761 86.8C140.501 86.8448 140.175 86.8655 139.972 86.8207C140.016 86.7152 140.029 86.6329 140.063 86.6803C139.891 86.2474 139.52 87.6638 139.329 87.172C139.37 86.5331 139.606 86.9195 139.577 86.6486C139.947 85.4283 139.137 86.6802 139.157 85.9117L139.236 85.8536C139.21 85.3867 138.668 86.1742 138.431 85.9839C138.431 85.9839 138.475 85.8784 138.487 85.7961C138.093 86.3536 137.661 86.4283 137.354 86.508C137.59 86.0669 137.568 86.302 137.671 85.8127C137.526 85.8467 137.439 86.5911 137.164 86.6475C137.179 86.3692 137.084 86.0743 137.246 85.5659L137.477 85.6149C137.598 84.9179 137.18 85.5418 137.107 85.3765L137.219 85.099C136.843 85.084 136.592 85.8034 136.253 85.6397L136.219 85.859C135.78 86.5219 136.192 85.3921 135.811 85.8673L135.995 85.1238C135.805 85.2633 135.307 85.6787 135.015 85.7467C135.331 85.2475 135.709 85.0664 135.975 84.7981C135.842 84.7499 135.513 84.7 135.321 85.0357C135.4 84.9775 135.523 84.8139 135.53 84.9551C135.183 85.4776 134.871 85.6828 134.617 85.6021C135.141 84.1949 134.062 85.0131 134.254 83.85C133.623 84.2172 133.408 83.329 132.848 83.2301C132.667 84.409 132.684 83.2052 132.338 84.3591C132.193 84.3931 132.142 84.3574 132.155 84.2751L131.998 83.466C132.026 83.1054 132.201 83.2442 132.266 83.0016C132.013 82.8229 132.319 82.4766 132.232 82.1268C132.126 82.5455 131.952 82.6734 131.828 82.4723L131.877 83.0688C131.299 83.5423 131.856 82.0138 131.279 82.4872L131.51 82.1716C131.249 82.3144 130.79 81.9223 130.295 82.7729C130.304 82.62 130.366 82.3069 130.473 82.2529C130.04 81.9629 129.113 82.8883 128.924 82.2004L129.048 81.9387C128.941 81.9927 128.721 82.4222 128.701 82.0965C128.745 81.991 128.825 81.8348 128.802 81.8032C128.707 81.873 128.401 82.2194 128.349 82.015L128.548 81.7226C128.192 81.2058 127.597 82.2517 127.149 82.3381C127.416 81.509 127.138 81.1301 126.998 80.9407L127.043 80.8352C126.535 80.5759 125.916 81.2255 125.314 81.4008C125.285 80.4005 124.384 80.6987 124.049 80.0448C124.079 80.2176 123.838 80.6861 123.732 80.7401C123.663 80.5474 123.225 81.2103 123.48 80.4635L123.503 80.495C123.664 79.7199 123.365 79.8428 123.181 79.7589L122.849 80.7325C122.799 79.14 121.396 80.8769 121.524 79.4937C121.337 79.7039 121.177 79.6515 121.002 79.8775L121.169 79.3417C120.881 79.1157 120.733 78.9811 120.297 78.9852L120.493 78.6221C120.271 78.5183 119.737 80.0784 119.517 80.0451L119.698 79.231C119.295 79.1138 119.096 78.3121 118.485 78.9069C118.53 78.8014 118.607 78.5746 118.681 78.5438C118.498 78.4599 118.124 77.7861 117.854 78.9093C118.061 78.1973 117.463 78.7099 117.143 78.9699L117.332 78.4656C116.957 79.082 116.889 79.254 116.589 79.3769C116.531 79.2979 116.657 78.9382 116.702 79.0994C116.584 78.7729 116.395 79.5438 116.238 79.1974L116.426 78.8892C116.23 78.7895 116.189 78.9656 115.966 79.3245C115.772 79.4914 115.611 79.0744 115.726 78.6008C115.614 78.8783 115.39 79.2372 115.306 79.0561C115.347 78.8799 115.418 78.7786 115.454 78.7279C115.216 78.271 114.767 79.1848 114.675 78.5957C114.716 78.4196 114.728 78.3374 114.725 78.2668C114.991 78.3632 115.202 78.4512 115.182 78.4903C115.313 78.0051 115.126 77.8506 115.501 77.2342C115.215 77.5415 114.686 78.2468 114.521 77.9552C114.529 77.9004 114.522 77.8572 114.534 77.7749L114.582 77.74C114.582 77.74 114.476 77.696 114.409 77.7699C114.366 77.6794 114.336 77.6046 114.269 77.5805C114.36 77.1734 114.06 77.2963 113.971 77.2407C113.832 77.7807 113.711 77.6502 113.722 78.1287C113.699 78.0972 113.758 78.0781 113.845 78.0631C113.86 78.0515 113.876 78.0399 113.908 78.0166L113.876 78.0399C113.876 78.0399 114.068 78.069 114.174 78.113C114.01 78.3547 113.839 78.5533 113.819 78.2276C113.659 78.54 113.495 78.8797 113.415 79.0359C113.478 78.26 113.298 77.7839 113.385 77.3062C112.964 77.4948 112.534 77.2754 112.026 78.2083C111.9 78.3013 111.99 77.8943 112.004 77.714C112.099 77.6442 112.138 77.6642 112.214 77.5354C111.945 77.7331 111.606 77.4714 111.376 78.1517C111.223 77.7779 111.692 77.5545 111.338 77.571L111.439 77.3758C111.091 76.0748 109.866 78.8486 109.541 77.2144C109.568 77.3166 109.575 77.3598 109.57 77.4853C108.931 76.617 107.701 77.5947 107.145 76.3743C106.959 76.1217 106.809 76.5479 106.583 76.8361L106.687 76.2488L106.273 76.8452C105.806 77.2373 106.05 75.2825 105.366 76.0767L105.319 76.4762C105.183 76.3574 104.757 76.5734 104.895 76.1314C104.871 76.1979 104.738 76.5144 104.728 76.3025L104.802 76.0051L104.264 76.4005C104.044 76.1006 104.653 75.2392 104.231 75.063C104.038 75.1319 103.541 75.8139 103.55 76.0258C103.617 76.0499 103.67 76.2542 103.596 76.5516L103.422 76.6796C103.15 77.5361 102.792 78.4075 102.977 79.1228L103.386 78.6518L103.346 79.0946L103.126 79.0613C103.13 79.4967 103.322 79.1611 103.453 78.9426C103.404 79.1735 103.406 79.3422 103.432 79.4444L103.915 78.676C103.86 79.0324 103.618 79.3322 103.737 79.5607C103.961 79.2018 103.832 78.7615 104.089 78.548C104.092 78.9834 103.975 79.2882 104.218 78.9884C104.168 79.2193 104.104 79.3639 104.021 79.4494C104.212 79.2118 104.39 79.4212 104.571 78.9718C104.562 79.4894 105.023 78.9561 104.782 79.7893C104.883 79.5941 105.181 79.2045 105.311 79.182C104.83 80.1191 105.733 79.3582 105.388 80.4141C105.785 79.5626 106.058 80.1649 106.474 79.7371C106.45 79.8036 106.374 79.9323 106.367 79.8891C106.503 80.008 106.472 80.2979 106.529 80.4749C106.753 79.7513 107.036 79.64 107.311 79.2188C107.307 79.9757 106.957 80.0628 106.82 80.7715C106.984 80.165 107.32 80.2581 107.384 79.7489C107.407 80.2432 107.445 79.9964 107.348 80.627C107.628 79.7157 107.522 80.4991 107.814 79.9682C107.902 80.4866 107.636 80.853 107.936 80.632C107.972 80.9461 107.663 81.2218 107.663 81.2218L107.694 81.2966ZM113.662 81.2616C113.662 81.2616 113.564 81.2607 113.537 81.2566C113.553 81.2449 113.607 81.2532 113.651 81.2458L113.662 81.2616ZM114.12 81.3871C114.12 81.3871 114.003 81.3272 113.921 81.3148C113.95 81.1229 114.034 80.9393 114.073 80.9592C114.013 81.0763 114.09 81.2142 114.12 81.3871ZM114.208 77.4309C114.303 77.3612 114.298 77.4866 114.281 77.5963C114.238 77.6038 114.195 77.6112 114.135 77.6303L114.111 77.6968C114.111 77.6968 114.184 77.4974 114.22 77.4467L114.208 77.4309Z" />
<path d="M89.6993 134.997C89.8185 135.226 90.3731 134.72 90.7516 134.539C91.0797 134.687 90.3668 134.944 90.1012 135.212C90.3596 135.265 90.9976 135.04 91.0472 135.173C90.9523 135.243 90.9323 135.282 90.7941 135.359C91.3921 135.212 91.1423 135.833 91.8584 135.647C91.8109 135.682 91.7635 135.717 91.716 135.752C92.0165 135.531 92.3012 135.321 92.5459 135.19C92.6155 135.285 93.0331 135.124 92.6535 135.403C92.6187 135.355 92.4647 135.444 92.3192 135.478L92.5586 135.473C92.0399 135.927 92.2802 135.458 91.8458 135.729C92.1432 135.802 92.7718 135.729 92.7065 135.972C92.1687 136.367 92.3046 135.757 91.9187 136.259L91.9893 135.891C91.2165 136.63 91.9597 135.718 91.112 136.488C91.1353 136.884 91.6088 136.633 91.6438 137.045C92.0023 136.903 92.0866 136.72 92.4567 136.593C93.2878 136.663 91.2707 137.83 92.2103 137.65C92.6279 137.489 93.366 137.068 93.1416 137.525L92.4593 137.856C92.5775 138.183 93.4801 137.422 93.2504 138.004C92.9667 138.115 92.8981 137.923 92.8422 138.012C92.468 138.531 93.2904 137.926 93.3949 138.068L92.8571 138.463C93.1409 138.717 93.7759 138.785 94.0987 139.058C93.9173 139.143 93.7127 139.196 93.5968 139.403C94.1474 139.655 94.1245 140.353 94.0825 140.992L94.6689 140.828C94.6689 140.828 94.5097 141.042 94.3684 141.049C94.2989 141.319 94.6805 140.844 94.9125 140.795C95.0138 140.866 94.7249 141.103 94.5361 141.144C95.1246 141.15 95.9505 141.345 95.6417 141.985L95.4529 142.027C95.4256 142.387 96.6108 141.613 96.3072 142.128L96.1933 142.139C96.3201 142.775 97.1376 143.026 96.6971 143.885C97.4193 143.475 96.7448 144.579 97.7127 143.94C97.4514 144.546 97.2194 144.595 97.1816 145.206C97.2154 145.352 97.8829 144.934 98.0822 145.006L97.592 145.367L98.2257 145.168L97.7102 145.693L97.9296 145.727C97.9296 145.727 98.0813 145.469 98.2237 145.364C98.5844 145.391 98.2123 146.078 97.9593 146.264L98.6955 146.404C98.5057 146.543 98.3686 146.522 98.2115 146.541C98.8759 146.417 97.7244 146.972 98.3455 146.856C98.433 146.743 98.6418 146.662 98.7525 146.581C98.5333 146.912 98.719 147.165 98.9732 147.245L98.6179 147.458C98.7825 147.848 99.3025 148.025 99.5811 148.403C99.6348 148.145 100.243 147.746 100.372 147.822L99.8848 148.253C100.248 148.084 99.9933 148.003 100.493 147.854C100.534 148.043 99.9776 148.379 99.7456 148.428L100.047 148.474C99.8891 148.59 99.7868 148.617 99.5971 148.757C99.9598 148.587 99.3115 149.429 99.9347 149.116L99.7765 149.233C100.055 149.611 100.357 149.657 100.609 149.934C101.052 149.608 101.038 149.788 101.472 149.616C101.492 149.941 101.345 150.438 101.59 150.672C101.951 150.698 102.004 150.44 102.331 150.321C101.943 150.655 102.176 150.873 101.799 150.956C102.11 151.213 102.196 151.296 102.834 151.435C102.957 151.272 103.001 151.166 103.155 151.077C103.277 151.11 103.125 151.367 102.919 151.518L102.872 151.553C103.79 151.51 102.518 153.491 103.632 153.183L103.584 153.218L104.287 153.212C104.351 153.433 103.901 153.35 103.768 153.667C104.742 153.534 104.181 154.361 104.887 154.327C103.945 155.531 105.687 155.15 105.25 156.08L105.511 155.839C105.854 155.708 105.446 156.081 105.429 156.191C105.639 156.012 105.601 155.894 105.778 155.837C106.703 156.3 106.661 157.668 107.063 158.613C107.237 158.948 108.569 157.579 108.222 158.466L107.654 158.786C108.713 158.835 108.604 159.912 109.572 160.003C109.434 160.08 109.287 160.212 109.241 160.149C108.993 160.574 109.597 160.568 109.875 160.315C109.913 160.433 109.625 160.572 109.529 160.74C109.428 161.033 110.221 160.62 109.938 160.998C109.887 161.06 109.8 161.075 109.745 161.067C109.982 160.991 110.012 161.43 110.342 161.017C110.327 161.394 110.87 161.238 110.772 161.601C111.308 161.304 110.856 162.147 111.517 161.588C110.852 162.175 111.305 162.426 111.722 162.264C111.489 162.412 111.621 162.558 111.309 162.763C111.457 162.897 111.692 162.919 111.998 162.573C111.454 163.556 113.117 162.504 112.25 163.579C112.995 163.664 113.585 163.837 114.085 164.053C113.432 164.656 113.634 163.704 112.972 164.361C113.559 164.465 114.324 164.146 114.487 164.633C114.49 164.802 114.159 164.85 114.021 164.927C114.609 165.03 114.626 165.65 115.262 165.62C115.199 165.667 115.108 165.709 115.021 165.724C115.099 165.764 115.07 165.956 115.351 165.676L115.222 165.698C115.553 165.188 116.327 165.08 116.568 164.879C115.635 165.565 116.645 165.381 115.448 166.238C115.534 166.223 115.716 166.138 115.914 165.944C115.924 166.057 115.821 166.182 115.545 166.336C115.913 166.406 116.141 166.02 116.335 166.218C116.188 166.35 116.113 166.381 115.923 166.52C116.286 166.351 116.661 166.197 116.717 166.472C116.622 166.542 116.53 166.682 116.495 166.635C116.822 166.881 117.694 166.41 117.747 166.979C117.051 167.491 117.658 167.288 117.142 167.813L117.464 167.82L117.64 167.496C117.772 167.642 118.272 167.395 118.242 167.685L117.931 167.792L118.298 167.96L118.337 167.615C118.75 167.482 118.972 166.954 119.019 167.284C118.933 167.299 119.151 167.43 118.923 167.816C119.148 167.724 119.404 167.609 119.394 167.86C119.266 168.051 118.803 168.415 118.712 168.556C119.218 168.184 119.184 168.768 119.718 168.4C119.591 168.493 119.314 168.745 119.274 168.823L119.685 168.521C119.644 168.697 119.604 168.775 119.363 168.977C119.505 169.237 119.951 168.253 119.914 168.766C119.871 168.774 119.819 168.836 119.733 168.851C119.827 169.244 120.413 169.08 120.48 169.469C120.038 170.061 120.166 169.408 119.792 169.926C120.206 170.157 121.067 169.937 121.283 170.362L121.272 170.248C122.041 169.537 121.152 170.847 121.66 170.644C121.574 170.659 121.209 171.024 121.292 170.939C121.395 171.277 121.918 171.16 122.466 171.243L122.245 171.406C122.214 171.696 122.476 171.819 122.54 172.04C122.762 171.877 122.816 171.983 123.046 171.668C122.45 173.176 124.41 171.832 123.946 173.122C123.911 173.075 123.682 173.195 123.705 173.226L124.206 173.344C124.484 172.994 124.342 173.098 124.518 172.774C124.739 172.611 124.976 172.535 125.061 172.618C124.711 172.705 124.585 173.163 124.465 173.397C124.552 173.284 124.679 173.191 124.766 173.078C124.397 173.836 125.412 172.433 125.276 173.044L125.11 173.215C125.279 173.212 125.571 173.046 125.62 173.18C125.302 173.608 125.353 173.279 125.067 173.587C125.219 173.694 125.986 173.081 125.769 173.581C125.619 173.643 125.534 173.559 125.384 173.621C125.1 174.195 125.226 174.102 125.26 174.247L125.311 174.648L125.352 174.472C126.44 173.599 125.853 174.59 126.682 174.126C125.912 174.571 126.321 174.464 125.905 174.892C125.864 175.068 125.83 175.287 125.688 175.392C126.106 175.133 125.62 175.831 126.24 175.448C126.133 175.6 126.333 175.574 126 175.916C126.235 175.938 126.183 175.636 126.35 175.464C126.985 175.168 126.331 176.5 127.25 176.092C127.76 176.057 128.224 175.594 128.691 175.567C128.574 175.872 128.157 176.033 128.157 176.033C128.106 176.362 128.239 176.41 128.514 176.354C128.372 176.458 128.324 176.591 128.224 176.786C128.356 176.835 128.746 176.305 128.708 176.649C128.534 176.777 128.3 177.022 128.098 177.146C128.342 177.113 128.689 176.955 128.932 176.922C128.749 177.203 128.521 177.224 128.331 177.364C128.582 177.374 128.907 177.451 129.272 177.086L129.306 176.866C129.306 176.866 129.039 177.233 128.948 177.275C128.565 177.484 128.881 176.984 129.016 176.836L129.173 176.818C129.806 175.89 128.708 176.649 128.557 176.444L129.163 175.877L128.547 176.232C128.647 176.037 128.914 175.671 129.087 175.641C129.221 175.226 128.787 175.764 128.953 175.326C128.977 175.26 129.009 175.236 129.052 175.229L128.772 175.313C128.915 175.208 129.122 174.861 129.129 175.002C129.213 174.454 128.362 175.152 128.681 174.626L128.729 174.591C128.247 174.532 128.313 175.019 127.614 175.362L128.424 174.11L128.008 174.538C128.008 174.538 127.958 174.404 128.124 174.233C127.742 174.441 127.965 174.447 127.649 174.68C127.859 174.136 127.058 174.506 127.651 173.754C127.299 174.037 127.576 174.15 127.183 174.244C127.811 173.442 126.881 174.198 127.051 173.733C127.443 173.372 127.392 173.701 127.562 173.236C126.881 173.834 127.425 172.85 127.197 172.872C126.709 173.401 126.75 172.86 126.385 172.861C126.551 172.69 126.27 172.24 126.27 171.876L126.364 171.806C125.841 172.288 125.742 172.02 125.491 172.01C125.793 171.691 125.919 171.598 126.128 171.518L125.992 171.399C125.802 171.538 125.68 171.604 125.543 171.583L125.935 171.222C125.744 171.095 125.152 171.384 125.181 170.925C124.832 171.279 124.407 172.126 123.956 172.142C124.126 171.943 124.448 171.585 124.578 171.563C124.546 171.586 124.353 171.655 124.397 171.55L124.8 171.302C124.838 171.055 124.484 171.535 124.43 171.428C124.684 171.144 124.554 171.167 124.784 170.949C124.827 170.942 124.743 171.125 124.865 171.06C124.816 170.926 124.87 170.667 125.037 170.398C124.898 170.574 124.684 170.78 124.59 170.751C124.399 170.624 124.861 170.358 124.883 170.122C124.662 170.285 124.751 169.976 124.351 170.392C124.316 170.345 124.475 170.131 124.578 170.006C124.31 170.106 124.122 169.685 123.803 170.211L123.795 170.266C123.795 170.266 123.795 170.266 123.779 170.278C123.094 170.44 123.411 169.479 122.96 169.396L123.095 169.248C122.773 169.242 122.631 168.982 122.221 169.186C122.186 169.139 122.346 168.826 122.524 168.671C122.289 168.649 122.127 168.793 122.174 168.393C122.528 168.279 122.326 168.136 122.477 168.341C122.421 168.066 122.616 167.801 122.064 168.012C122.475 167.71 122.376 167.442 122.203 167.472L122.062 167.843C121.913 167.807 121.887 167.705 121.833 167.598L122.32 167.167C122.541 166.275 120.774 167.55 121.45 166.348C121.047 166.595 121.402 166.748 120.948 167.057C120.856 166.833 121.347 166.01 121.297 165.974C121.341 165.504 120.436 166.461 120.386 166.06C120.258 166.251 119.849 166.722 119.516 166.7C119.424 166.476 120.015 165.822 120.247 165.773C120.286 165.793 120.262 165.859 120.21 165.922C120.324 165.911 120.466 165.904 120.574 165.654L120.384 165.794C120.477 165.555 120.24 165.365 120.568 165.148C120.292 165.205 120.251 165.381 120.254 165.549C120.293 165.107 119.951 165.237 119.907 164.88C119.847 164.997 119.672 165.223 119.649 165.191C119.572 164.689 119.2 165.376 118.927 165.236C119.068 164.865 119.572 164.689 119.152 164.681C119.198 164.38 119.573 164.226 119.754 164.141C119.259 164.262 119.615 163.587 119.585 163.414L119.801 163.377C119.672 163.399 119.609 163.348 119.575 163.3L119.292 163.678C119.292 163.678 119.247 163.517 119.393 163.385C119.117 163.54 118.881 163.981 118.475 164.158C118.568 163.919 118.064 164.095 118.484 163.64C118.567 164.017 118.905 163.185 119.166 163.309C119.08 163.324 119.033 163.261 119.05 163.151C119.086 163.1 119.161 163.069 119.177 163.058C119.356 162.44 118.584 163.445 118.355 163.2C118.64 162.991 118.773 162.674 118.686 162.689C118.768 162.799 118.309 163.137 118.041 163.236C118.08 162.892 117.735 163.218 117.681 163.112L117.668 163.292C117.383 163.501 117.345 163.383 117.165 163.37C117.351 163.16 117.392 163.348 117.441 163.216C116.888 163.524 117.633 162.515 117.18 162.629C117.273 162.391 117.644 162.166 117.685 161.99C117.174 162.123 117.836 161.466 117.38 161.509C117.098 161.887 117.193 161.817 116.716 161.998L117.249 162.092L116.563 162.353C116.644 162.464 116.983 162.361 116.966 162.47C116.603 162.64 116.698 162.57 116.456 162.87C116.831 162.253 115.906 162.885 116.108 162.396L116.959 161.6C117.107 161.005 116.131 161.6 116.07 161.086L116.021 161.317C115.641 161.596 115.791 161.17 115.574 161.207C115.868 160.943 115.904 160.794 116.048 160.592C115.834 160.798 115.862 160.339 115.264 160.852L115.52 160.372C115.454 159.983 114.452 160.841 114.318 160.526C114.701 160.317 114.802 160.024 115.16 159.98C115.102 159.901 115.079 159.772 114.881 159.966C115.013 159.748 114.299 160.102 114.502 159.782C114.348 159.871 114.028 160.131 113.974 160.025C114.026 159.963 114.121 159.893 114.121 159.893C113.974 160.025 113.806 159.929 113.567 160.3C114.238 159.223 112.879 159.663 113.454 158.754C113.2 158.673 112.926 158.534 112.751 158.395C112.846 158.325 112.909 158.279 112.889 158.318C112.961 157.852 111.941 158.917 112.006 158.408C112.357 157.858 112.371 158.309 112.48 158.059C113.388 157.173 112.074 157.871 112.485 157.204L112.571 157.189C112.776 156.772 111.924 157.203 111.813 156.92C111.813 156.92 111.908 156.85 111.971 156.804C111.352 157.089 110.954 156.944 110.629 156.867C111.063 156.596 110.908 156.783 111.245 156.413C111.113 156.365 110.655 156.969 110.389 156.873C110.553 156.631 110.611 156.345 110.991 155.968L111.162 156.134C111.611 155.585 110.956 155.921 110.954 155.752L111.207 155.566C110.903 155.352 110.306 155.864 110.105 155.525L109.95 155.712C109.225 156.051 110.166 155.31 109.587 155.517L110.134 154.968C109.907 154.99 109.246 155.086 108.981 154.99C109.513 154.72 109.929 154.755 110.295 154.656C110.213 154.546 109.949 154.351 109.625 154.541C109.723 154.541 109.904 154.457 109.844 154.574C109.268 154.851 108.899 154.879 108.737 154.658C109.92 153.716 108.56 153.888 109.331 152.981C108.601 152.983 108.905 152.103 108.485 151.731C107.702 152.622 108.36 151.628 107.454 152.416C107.321 152.368 107.302 152.309 107.337 152.258L107.636 151.504C107.851 151.2 107.927 151.436 108.109 151.253C107.998 150.97 108.439 150.84 108.549 150.492C108.235 150.795 108.008 150.817 108.03 150.582L107.738 151.113C106.98 151.208 108.296 150.215 107.566 150.315L107.94 150.161C107.634 150.143 107.467 149.585 106.599 150.028C106.687 149.915 106.921 149.67 107.042 149.703C106.863 149.227 105.573 149.494 105.804 148.814L106.041 148.639C106.041 148.639 105.529 148.87 105.696 148.601C105.791 148.531 105.945 148.442 105.949 148.415C105.847 148.442 105.394 148.555 105.456 148.34L105.782 148.221C105.793 147.606 104.7 148.141 104.294 147.954C104.979 147.426 104.979 146.963 104.974 146.724L105.069 146.654C104.823 146.154 103.938 146.343 103.352 146.142C103.914 145.315 103.014 145.052 103.139 144.328C103.059 144.484 102.601 144.723 102.464 144.703C102.537 144.503 101.777 144.795 102.437 144.334L102.46 144.365C103.019 143.833 102.705 143.771 102.605 143.602L101.744 144.187C102.671 142.897 100.527 143.427 101.468 142.42C101.193 142.476 101.1 142.35 100.824 142.406L101.267 142.081C101.192 141.747 101.151 141.558 100.812 141.296L101.187 141.143C101.079 140.93 99.7084 141.816 99.5491 141.666L100.19 141.146C99.9464 140.814 100.299 140.068 99.4589 140.151C99.5538 140.082 99.7552 139.958 99.8332 139.998C99.733 139.828 99.8782 139.065 98.9842 139.771C99.5852 139.329 98.8037 139.393 98.4113 139.389L98.889 139.111C98.2078 139.345 98.0496 139.461 97.7448 139.345C97.7732 139.251 98.0695 139.057 98.0052 139.202C98.1264 138.869 97.4895 139.362 97.5875 138.998L97.9302 138.868C97.85 138.659 97.7034 138.791 97.2901 138.925C97.0348 138.942 97.1844 138.516 97.5682 138.21C97.3078 138.353 96.8944 138.486 96.9513 138.298C97.1094 138.182 97.2117 138.156 97.2708 138.137C97.3898 137.636 96.4555 138.055 96.759 137.54C96.9014 137.435 96.9805 137.377 97.0163 137.327C97.163 137.559 97.2548 137.783 97.2116 137.791C97.6344 137.504 97.5858 137.273 98.2554 137.023C97.8389 137.087 96.9815 137.279 97.0594 136.954C97.1069 136.919 97.1385 136.896 97.1901 136.834L97.2376 136.799C97.2376 136.799 97.1912 136.736 97.1047 136.751C97.1331 136.657 97.1616 136.563 97.1267 136.516C97.4589 136.272 97.1657 136.171 97.1393 136.069C96.6848 136.379 96.6826 136.21 96.3611 136.568C96.3927 136.545 96.4201 136.549 96.4824 136.6C96.4824 136.6 96.5214 136.62 96.5647 136.613L96.533 136.636C96.533 136.636 96.6259 136.762 96.7113 136.845C96.4319 136.929 96.1725 136.974 96.3675 136.709C96.0364 136.855 95.7052 137.002 95.5281 137.059C96.0911 136.499 96.2765 136.022 96.6445 135.727C96.1867 135.602 96.0305 135.157 95.0339 135.525C94.881 135.516 95.2131 135.272 95.3439 135.151C95.4578 135.141 95.4884 135.215 95.6381 135.154C95.3048 135.131 95.2266 134.727 94.5992 135.067C94.7288 134.679 95.2256 134.825 94.965 134.603L95.1738 134.522C95.7904 133.34 93.0308 134.59 93.8972 133.151C93.8413 133.24 93.8213 133.279 93.7264 133.349C93.8357 132.272 92.2632 132.188 92.7236 130.925C92.7857 130.612 92.3755 130.816 91.9864 130.883L92.4608 130.534L91.7532 130.666C91.1299 130.613 92.6924 129.391 91.6515 129.5L91.3194 129.744C91.3172 129.576 90.8753 129.439 91.2855 129.234C91.2106 129.265 90.8953 129.399 91.0461 129.24L91.2991 129.054L90.6484 128.997C90.6915 128.625 91.7334 128.418 91.5571 128.013C91.3736 127.929 90.5404 128.055 90.3897 128.215C90.4087 128.274 90.3086 128.469 90.0481 128.612L89.8329 128.551C89.0242 128.976 88.1532 129.349 87.8011 129.996L88.4255 129.951L88.0849 130.25L87.9572 130.076C87.6557 130.395 88.0101 130.281 88.2853 130.224C88.0955 130.364 87.9532 130.468 87.9247 130.562L88.8137 130.346C88.5291 130.556 88.1441 130.595 88.063 130.85C88.4722 130.743 88.6882 130.341 89.0331 130.38C88.7316 130.699 88.4163 130.833 88.8171 130.782C88.6273 130.921 88.4817 130.955 88.3678 130.966C88.6821 130.93 88.64 131.204 89.1051 131.008C88.7245 131.385 89.4353 131.324 88.6972 131.745C88.8902 131.676 89.3932 131.598 89.4903 131.697C88.498 132.038 89.6782 132.118 88.688 132.628C89.5664 132.298 89.3441 132.923 89.9368 132.901C89.862 132.932 89.728 132.982 89.7365 132.927C89.7502 133.111 89.5404 133.29 89.4403 133.485C90.1152 133.11 90.3926 133.223 90.8608 133.097C90.3411 133.65 90.033 133.463 89.4479 133.893C89.9772 133.552 90.1545 133.86 90.5699 133.53C90.2599 133.904 90.4497 133.764 89.9394 134.164C90.7724 133.673 90.1588 134.197 90.7219 134.002C90.431 134.435 89.9944 134.537 90.3667 134.579C90.1875 134.833 89.7677 134.825 89.7677 134.825L89.6993 134.997ZM94.2368 138.981C94.2368 138.981 94.1472 138.925 94.1356 138.91C94.1472 138.925 94.1704 138.957 94.2368 138.981ZM94.5112 139.387C94.5112 139.387 94.4616 139.254 94.4151 139.19C94.5733 139.074 94.7431 138.974 94.7505 139.017C94.6324 139.055 94.6071 139.22 94.4996 139.372L94.5112 139.387ZM97.1394 136.433C97.1394 136.433 97.1658 136.536 97.0709 136.605C97.0477 136.574 97.0086 136.554 96.9422 136.53L96.8947 136.565C96.9738 136.507 97.0529 136.448 97.1394 136.433Z"/>
<path d="M34.5868 129.14C34.4402 129.272 35.0363 129.685 35.3232 130.009C35.316 130.331 34.8475 129.727 34.5395 129.54C34.5722 129.783 34.9827 130.308 34.8878 130.378C34.7865 130.306 34.7475 130.287 34.6546 130.16C34.9712 130.657 34.3605 130.522 34.77 131.146C34.7193 131.11 34.6687 131.074 34.618 131.038C34.906 131.264 35.1782 131.502 35.3608 131.684C35.3091 131.746 35.5761 132.109 35.2142 131.816C35.2617 131.781 35.1256 131.662 35.0327 131.536L35.1129 131.745C34.5559 131.352 35.0253 131.493 34.6719 131.145C34.7121 131.431 34.9812 131.963 34.746 131.941C34.2364 131.514 34.8049 131.558 34.2427 131.29L34.576 131.313C33.6835 130.728 34.7099 131.263 33.7826 130.631C33.4483 130.707 33.8091 131.098 33.4748 131.174C33.6954 131.474 33.8989 131.518 34.1195 131.818C34.3549 132.569 32.669 130.939 33.1196 131.751C33.3866 132.114 34.0006 132.684 33.5312 132.543L33.0269 131.989C32.7897 132.164 33.7402 132.827 33.1685 132.712C32.9944 132.475 33.1209 132.382 33.027 132.354C32.449 132.098 33.2624 132.74 33.1633 132.838L32.6379 132.421C32.5093 132.71 32.6604 133.28 32.555 133.601C32.4231 133.455 32.3113 133.27 32.0961 133.209C32.071 133.738 31.454 133.827 30.8845 133.881L31.2327 134.354C31.2327 134.354 30.9827 134.246 30.9131 134.152C30.6505 134.126 31.1853 134.389 31.3088 134.59C31.2803 134.684 30.9765 134.47 30.8879 134.316C31.0863 134.851 31.1963 135.597 30.5349 135.427L30.4305 135.285C30.1204 135.294 31.186 136.213 30.6385 136.032L30.5689 135.937C30.0722 136.156 30.1432 136.882 29.2392 136.647C29.8533 137.217 28.6413 136.795 29.5359 137.548C28.9252 137.413 28.8017 137.212 28.2555 137.298C28.149 137.351 28.7282 137.874 28.7303 138.043L28.2398 137.674L28.6344 138.211L28.0025 137.848L28.0437 138.037C28.0437 138.037 28.3254 138.122 28.4615 138.24C28.5681 138.551 27.8403 138.357 27.6029 138.166L27.7255 138.83C27.5388 138.676 27.5282 138.562 27.4237 138.42C27.7593 138.976 26.89 138.058 27.2023 138.583C27.3194 138.642 27.4745 138.82 27.5758 138.892C27.2161 138.767 27.0611 138.954 27.0781 139.209L26.7711 138.924C26.4864 139.133 26.4971 139.612 26.2821 139.916C26.5215 139.91 27.0817 140.374 27.0765 140.499L26.5385 140.165C26.8022 140.458 26.7969 140.218 27.0987 140.629C26.9605 140.706 26.451 140.278 26.3391 140.093L26.4109 140.356C26.259 140.249 26.1894 140.154 26.0026 140C26.2822 140.281 25.3097 139.853 25.795 140.347L25.6431 140.24C25.4164 140.528 25.4999 140.807 25.3323 141.076C25.7722 141.41 25.5992 141.439 25.9136 141.768C25.6342 141.851 25.1522 141.792 25.0278 142.054C25.1345 142.365 25.3855 142.375 25.5986 142.632C25.1777 142.357 25.0692 142.607 24.8528 142.28C24.7359 142.585 24.7074 142.679 24.7878 143.252C24.9872 143.324 25.081 143.353 25.2055 143.456C25.2319 143.558 24.9345 143.485 24.7478 143.33L24.7129 143.283C25.0813 144.082 22.8958 143.33 23.5458 144.214L23.511 144.167L23.7516 144.792C23.5819 144.893 23.5037 144.488 23.163 144.422C23.6295 145.223 22.7107 144.901 22.9714 145.487C21.5886 144.899 22.5351 146.319 21.5563 146.115L21.8527 146.286C22.0933 146.547 21.6175 146.264 21.5153 146.291C21.7452 146.438 21.8243 146.38 21.9562 146.526C21.8922 147.4 20.6815 147.609 19.9856 148.121C19.7442 148.323 21.4341 149.196 20.5407 149.074L20.0312 148.647C20.3827 149.555 19.385 149.657 19.6627 150.498C19.554 150.384 19.3863 150.288 19.4063 150.249C18.937 150.108 19.1671 150.62 19.4867 150.822C19.4076 150.88 19.1745 150.663 18.9709 150.618C18.6692 150.572 19.3339 151.178 18.8962 151.013C18.8297 150.989 18.7717 150.91 18.7643 150.867C18.9036 151.056 18.5218 151.167 19.0376 151.371C18.7075 151.419 19.0483 151.85 18.6718 151.835C19.1423 152.243 18.2384 152.008 18.9673 152.469C18.1952 152.015 18.1437 152.442 18.4581 152.77C18.2439 152.612 18.168 152.74 17.8526 152.51C17.7883 152.655 17.8686 152.863 18.2588 153.063C17.1904 152.803 18.7359 153.977 17.4543 153.46C17.6517 154.093 17.7247 154.623 17.7238 155.086C16.9474 154.659 17.8618 154.644 17.0422 154.225C17.1742 154.736 17.7334 155.297 17.358 155.549C17.2125 155.583 17.0426 155.319 16.9181 155.216C17.0501 155.727 16.4954 155.867 16.7529 156.383C16.6749 156.343 16.6169 156.264 16.5704 156.201C16.5736 156.272 16.389 156.286 16.7561 156.454L16.6749 156.343C17.2539 156.501 17.6476 157.136 17.905 157.287C16.9344 156.663 17.499 157.464 16.2795 156.634C16.3375 156.713 16.4578 156.843 16.7194 156.967C16.6171 156.994 16.4726 156.93 16.2352 156.739C16.3261 157.062 16.7448 157.167 16.6289 157.374C16.4611 157.279 16.4147 157.216 16.2238 157.088C16.5192 157.358 16.7988 157.638 16.5741 157.731C16.4729 157.659 16.3242 157.623 16.36 157.572C16.2705 157.881 17.0016 158.511 16.5291 158.664C15.816 158.191 16.2233 158.645 15.5556 158.334L15.6548 158.601L16.0071 158.683C15.9154 158.823 16.3353 159.195 16.0642 159.224L15.8353 158.979L15.8238 159.328L16.1539 159.28C16.4135 159.6 16.9936 159.66 16.7099 159.771C16.6635 159.708 16.6298 159.927 16.1995 159.806C16.3704 159.972 16.5645 160.17 16.3367 160.191C16.1099 160.115 15.6226 159.817 15.4622 159.764C15.9728 160.094 15.4539 160.184 15.9993 160.561C15.8749 160.458 15.5352 160.294 15.4529 160.282L15.8738 160.556C15.7051 160.558 15.6228 160.546 15.338 160.391C15.1556 160.573 16.2135 160.72 15.7379 160.802C15.7147 160.77 15.6482 160.746 15.5902 160.667C15.2865 160.818 15.6505 161.28 15.3078 161.41C14.6159 161.165 15.2518 161.135 14.6337 160.957C14.6022 161.345 15.1171 162.012 14.8124 162.261L14.9147 162.234C15.8398 162.697 14.3494 162.261 14.7145 162.624C14.6564 162.546 14.2113 162.338 14.301 162.393C14.0521 162.552 14.3265 162.958 14.4943 163.419L14.2644 163.272C13.9933 163.301 13.9829 163.551 13.8131 163.652C14.0431 163.799 13.964 163.857 14.3395 163.97C12.7522 163.8 14.7122 165.107 13.3949 165.005C13.4149 164.966 13.244 164.8 13.2082 164.851L13.298 165.271C13.7241 165.42 13.568 165.34 13.9245 165.394C14.1545 165.541 14.3096 165.719 14.2695 165.797C14.0722 165.529 13.5976 165.513 13.335 165.487C13.4679 165.535 13.5966 165.611 13.7295 165.659C12.9226 165.523 14.5691 166.039 13.9606 166.073L13.738 165.969C13.8309 166.095 14.0799 166.301 13.9692 166.383C13.4607 166.222 13.7866 166.201 13.3921 166.029C13.3553 166.177 14.2055 166.671 13.6687 166.604C13.56 166.489 13.6 166.411 13.4755 166.308C12.8448 166.212 12.9893 166.276 12.867 166.342L12.5285 166.445L12.7089 166.458C13.9104 167.131 12.8103 166.894 13.5382 167.454C12.8335 166.926 13.1089 167.234 12.554 167.01C12.3853 167.012 12.1733 167.022 12.0172 166.942C12.4223 167.228 11.589 166.99 12.185 167.403C11.9973 167.346 12.125 167.52 11.6798 167.312C11.7601 167.521 12.0047 167.389 12.2273 167.493C12.7484 167.937 11.295 167.717 12.0103 168.358C12.2573 168.76 12.8311 169.044 13.0432 169.398C12.7257 169.364 12.4187 169.079 12.4187 169.079C12.1045 169.116 12.1151 169.23 12.2659 169.435C12.1256 169.343 11.9727 169.334 11.7691 169.289C11.7797 169.403 12.3936 169.608 12.0793 169.645C11.8842 169.545 11.5836 169.401 11.3926 169.274C11.5203 169.448 11.8041 169.701 11.916 169.887C11.5911 169.809 11.4634 169.636 11.2841 169.524C11.3801 169.721 11.4361 169.996 11.9087 170.208L12.1091 170.182C12.1091 170.182 11.6787 170.061 11.5933 169.978C11.2546 169.716 11.8337 169.874 12.0214 169.931L12.1143 170.057C13.1902 170.36 12.0793 169.645 12.2027 169.481L12.9327 169.844L12.3798 169.424C12.5992 169.457 13.0412 169.594 13.1066 169.717C13.5264 169.724 12.8735 169.499 13.3438 169.542C13.4103 169.566 13.4377 169.57 13.4768 169.59L13.3143 169.369C13.4546 169.461 13.8459 169.562 13.7003 169.596C14.2266 169.55 13.2709 169.012 13.8658 169.158L13.9006 169.206C13.7675 168.793 13.35 168.954 12.794 168.463L14.2379 168.836L13.6873 168.584C13.6873 168.584 13.7822 168.514 14.0048 168.618C13.6661 168.357 13.7506 168.538 13.4309 168.335C13.9994 168.379 13.3696 167.821 14.2609 168.138C13.859 167.923 13.8802 168.151 13.6554 167.878C14.629 168.208 13.5678 167.626 14.054 167.658C14.5224 167.897 14.2239 167.922 14.7101 167.954C13.9179 167.539 14.9948 167.744 14.8945 167.575C14.2342 167.307 14.7257 167.213 14.5874 166.925C14.81 167.029 15.0999 166.694 15.4067 166.615L15.5122 166.659C14.8719 166.351 15.0617 166.212 14.9931 166.019C15.3876 166.191 15.5279 166.282 15.6872 166.433L15.7357 166.3C15.5289 166.184 15.4435 166.101 15.4055 165.983L15.8896 166.211C15.9307 166.035 15.4486 165.611 15.8651 165.548C15.42 165.34 14.4918 165.172 14.2955 164.805C14.5455 164.913 14.9833 165.078 15.0529 165.172C15.0297 165.141 14.882 165.006 15.0075 165.011L15.3852 165.293C15.613 165.271 15.0655 165.09 15.133 165.016C15.4885 165.168 15.4188 165.074 15.6804 165.197C15.7037 165.229 15.5117 165.2 15.6246 165.287C15.7195 165.217 15.9863 165.216 16.2837 165.289C16.0844 165.217 15.8112 165.077 15.7806 165.002C15.8216 164.826 16.2383 165.128 16.4661 165.106C16.2362 164.959 16.5304 164.962 16.0188 164.73C16.0388 164.691 16.293 164.771 16.4534 164.824C16.2592 164.626 16.5639 164.378 15.9532 164.243L15.9216 164.266C15.9216 164.266 15.8984 164.235 15.8868 164.219C15.5038 163.698 16.4487 163.757 16.3547 163.364L16.5383 163.448C16.4116 163.176 16.5898 163.021 16.2712 162.72C16.2912 162.681 16.6477 162.735 16.8387 162.862C16.77 162.67 16.5749 162.57 16.9482 162.514C17.2004 162.791 17.2456 162.587 17.1223 162.751C17.3469 162.659 17.656 162.748 17.2561 162.336C17.677 162.611 17.8942 162.475 17.7898 162.333L17.4016 162.302C17.3794 162.173 17.4585 162.115 17.5376 162.057L18.1072 162.367C18.99 162.375 17.1819 161.175 18.5087 161.488C18.1311 161.207 18.1238 161.528 17.6797 161.222C17.8378 161.106 18.7692 161.346 18.7776 161.291C19.2058 161.243 18.0149 160.684 18.3418 160.565C18.115 160.489 17.5485 160.249 17.4335 159.993C17.5916 159.877 18.4081 160.225 18.5199 160.41C18.5273 160.453 18.4567 160.457 18.367 160.401C18.425 160.48 18.4789 160.586 18.7373 160.639L18.5305 160.524C18.7773 160.561 18.8701 160.323 19.1739 160.537C19.023 160.332 18.8426 160.319 18.6971 160.353C19.0978 160.301 18.8573 160.04 19.1526 159.945C19.0154 159.924 18.7496 159.828 18.7813 159.804C19.1872 159.628 18.451 159.488 18.4615 159.237C18.8338 159.279 19.1989 159.643 19.0374 159.324C19.32 159.311 19.6038 159.564 19.7515 159.699C19.4613 159.304 20.1891 159.499 20.3273 159.422L20.4549 159.595C20.3737 159.485 20.3937 159.446 20.4296 159.395L19.976 159.242C19.976 159.242 20.0983 159.177 20.2819 159.26C20.0445 159.07 19.5709 158.956 19.2523 158.656C19.4991 158.693 19.1382 158.302 19.7163 158.558C19.4126 158.708 20.2943 158.814 20.2565 159.06C20.21 158.997 20.2459 158.946 20.3482 158.92C20.4146 158.944 20.4653 158.98 20.4885 159.011C21.0886 159.032 19.9083 158.587 20.0558 158.357C20.348 158.555 20.6771 158.605 20.6191 158.526C20.5632 158.616 20.0758 158.318 19.8859 158.092C20.2002 158.056 19.7983 157.841 19.8658 157.767L19.7044 157.812C19.4122 157.614 19.4913 157.556 19.4575 157.41C19.7075 157.518 19.5852 157.584 19.7065 157.616C19.2201 157.22 20.4047 157.638 20.1335 157.302C20.3803 157.34 20.7189 157.601 20.8877 157.599C20.5975 157.204 21.4171 157.623 21.1934 157.253C20.7557 157.088 20.8453 157.144 20.5193 156.8L20.6439 157.267L20.1628 156.746C20.1069 156.835 20.3085 157.076 20.2062 157.103C19.9266 156.822 20.0279 156.894 19.6566 156.753C20.3411 156.955 19.4455 156.3 19.9391 156.375L20.9496 156.921C21.5223 156.938 20.6467 156.244 21.0643 156.083L20.8407 156.077C20.4588 155.823 20.886 155.873 20.7741 155.688C21.1096 155.879 21.2625 155.888 21.4893 155.965C21.2435 155.829 21.6326 155.762 20.9776 155.368L21.4944 155.475C21.8097 155.34 20.6788 154.664 20.9277 154.505C21.2505 154.779 21.5564 154.797 21.7337 155.104C21.7737 155.026 21.876 155 21.646 154.853C21.8728 154.929 21.3094 154.395 21.6733 154.492C21.5372 154.373 21.1902 154.166 21.2692 154.108C21.3357 154.132 21.437 154.204 21.437 154.204C21.2692 154.108 21.2945 153.944 20.88 153.811C22.0729 154.174 21.1813 153.127 22.2024 153.422C22.1812 153.194 22.1916 152.944 22.2601 152.772C22.3614 152.843 22.4279 152.867 22.3846 152.875C22.8086 152.855 21.4932 152.192 21.9762 152.153C22.5785 152.343 22.1967 152.453 22.4435 152.491C23.5554 153.108 22.4592 152.114 23.1828 152.336L23.2292 152.399C23.6754 152.509 22.9759 151.856 23.1657 151.717C23.1657 151.717 23.267 151.788 23.3334 151.812C22.8439 151.345 22.8163 150.976 22.7877 150.705C23.1728 151.03 22.9502 150.926 23.407 151.15C23.3964 151.036 22.6971 150.748 22.6759 150.52C22.9417 150.617 23.2243 150.603 23.6885 150.87L23.62 151.042C24.2645 151.322 23.7243 150.819 23.8815 150.801L24.1346 150.98C24.1926 150.694 23.5533 150.289 23.7441 150.051L23.5331 149.963C22.9697 149.429 23.9793 150.073 23.5836 149.634L24.2704 150.004C24.1743 149.808 23.8345 149.279 23.8292 149.04C24.2448 149.44 24.3863 149.798 24.5952 150.082C24.6511 149.992 24.7322 149.738 24.4484 149.484C24.4948 149.548 24.6109 149.705 24.5012 149.689C24.0623 149.258 23.9008 148.939 24.0242 148.775C25.2711 149.609 24.6431 148.49 25.717 148.989C25.4605 148.375 26.3264 148.493 26.5034 148.071C25.4454 147.56 26.5519 147.938 25.5265 147.305C25.5317 147.18 25.5634 147.157 25.6298 147.181L26.4093 147.313C26.7415 147.434 26.5718 147.534 26.8017 147.681C26.9915 147.542 27.2743 147.893 27.6192 147.931C27.2447 147.72 27.1487 147.523 27.3606 147.513L26.809 147.36C26.4544 146.745 27.7826 147.69 27.4554 147.079L27.7192 147.371C27.6199 147.104 28.0618 146.876 27.3507 146.207C27.4836 146.256 27.7684 146.411 27.8064 146.529C28.1385 146.285 27.4589 145.228 28.1171 145.328L28.3386 145.53C28.3122 145.427 27.9546 145.107 28.2478 145.207C28.3491 145.279 28.4694 145.409 28.501 145.386C28.4314 145.291 28.176 144.944 28.3838 144.961L28.5811 145.23C29.1316 145.117 28.2928 144.274 28.3085 143.898C29.0174 144.398 29.395 144.315 29.6112 144.278L29.7124 144.349C30.0646 144.066 29.5739 143.332 29.5442 142.795C30.4587 143.144 30.373 142.331 31.0479 142.321C30.8876 142.269 30.5226 141.905 30.4962 141.803C30.6881 141.832 30.1764 141.236 30.803 141.723L30.7714 141.747C31.4381 142.156 31.3705 141.865 31.4854 141.757L30.672 141.114C32.1098 141.711 30.8804 139.94 32.0978 140.601C31.9511 140.368 32.0227 140.267 31.8761 140.034L32.3002 140.379C32.5722 140.252 32.722 140.191 32.8157 139.854L33.0795 140.147C33.2376 140.03 31.9695 138.969 32.0496 138.812L32.7195 139.293C32.9145 139.028 33.6972 139.23 33.3162 138.513C33.4016 138.597 33.5884 138.751 33.5799 138.806C33.7065 138.713 34.3815 138.703 33.4742 138.032C34.046 138.512 33.7589 137.823 33.6016 137.477L33.9941 137.845C33.5604 137.288 33.4127 137.154 33.3999 136.871C33.4822 136.884 33.7544 137.121 33.6215 137.073C33.9506 137.123 33.3081 136.647 33.6688 136.673L33.8777 136.958C34.0201 136.853 33.884 136.734 33.6244 136.414C33.5326 136.19 33.9439 136.252 34.3332 136.55C34.1275 136.336 33.8679 136.016 34.0366 136.014C34.1886 136.121 34.2424 136.227 34.2772 136.275C34.736 136.302 34.0808 135.544 34.6124 135.736C34.7485 135.855 34.8265 135.895 34.8772 135.931C34.7264 136.09 34.5683 136.207 34.5609 136.163C34.9459 136.488 35.1273 136.404 35.5726 136.976C35.3879 136.625 34.9246 135.896 35.2147 135.926C35.2379 135.957 35.3043 135.982 35.355 136.017L35.3898 136.065C35.3898 136.065 35.4531 136.018 35.395 135.939C35.4931 135.94 35.5596 135.964 35.607 135.929C35.9456 136.191 35.9171 135.92 35.9962 135.862C35.5879 135.506 35.7176 135.483 35.3041 135.252C35.3431 135.272 35.3389 135.299 35.3147 135.366C35.3147 135.366 35.3221 135.409 35.3337 135.425L35.3104 135.393C35.3104 135.393 35.2346 135.522 35.1829 135.584C35.0088 135.348 34.9011 135.135 35.1902 135.263C34.9654 134.99 34.7133 134.714 34.6088 134.572C35.2755 134.981 35.7375 135.079 36.1151 135.361C36.0644 134.961 36.3923 134.744 35.7339 133.915C35.6885 133.753 36.0229 134.043 36.1632 134.134C36.217 134.24 36.158 134.259 36.2508 134.386C36.1558 134.091 36.4827 133.972 35.9742 133.446C36.3423 133.516 36.3846 133.971 36.4974 133.694L36.625 133.867C37.857 134.25 35.8639 131.971 37.3765 132.537C37.2827 132.508 37.2436 132.488 37.1424 132.417C38.0884 132.378 37.6481 130.951 38.8737 131.193C39.1521 131.207 38.8377 130.878 38.6646 130.544L39.1119 130.92L38.7573 130.305C38.6021 129.763 40.1434 130.964 39.7212 130.059L39.3942 129.813C39.5397 129.779 39.5205 129.355 39.8191 129.695C39.7727 129.632 39.5596 129.375 39.7389 129.486L39.9721 129.704L39.8253 129.107C40.1511 129.086 40.6714 129.992 40.9561 129.783C40.9698 129.603 40.5771 128.87 40.3978 128.759C40.3504 128.793 40.1668 128.71 39.9453 128.508L39.9199 128.307C39.2911 127.651 38.7023 126.917 38.0378 126.676L38.2753 127.231L37.9092 126.965L38.0167 126.813C37.6581 126.59 37.8628 126.902 37.982 127.13C37.7953 126.975 37.6708 126.872 37.5769 126.844L38.0476 127.617C37.7754 127.379 37.6298 127.049 37.3829 127.011C37.5951 127.366 38.0212 127.515 38.0888 127.805C37.7301 127.583 37.5012 127.338 37.6627 127.657C37.4759 127.502 37.3947 127.392 37.3567 127.274C37.4833 127.545 37.2439 127.551 37.5499 127.934C37.1016 127.656 37.3971 128.29 36.7757 127.676C36.9034 127.85 37.1303 128.291 37.0744 128.381C36.4477 127.529 36.7739 128.602 36.0132 127.799C36.5862 128.545 35.9713 128.438 36.1856 128.962C36.1391 128.898 36.0463 128.772 36.0969 128.808C35.9514 128.842 35.7098 128.679 35.5221 128.623C36.0696 129.168 36.055 129.447 36.3177 129.837C35.6626 129.443 35.7363 129.146 35.1878 128.698C35.6425 129.118 35.44 129.34 35.8568 129.641C35.4432 129.41 35.63 129.565 35.1278 129.18C35.8115 129.845 35.169 129.369 35.5288 129.858C35.0679 129.662 34.8325 129.276 34.9192 129.625C34.6301 129.497 34.5045 129.128 34.5045 129.128L34.5868 129.14ZM32.6553 133.771C32.6553 133.771 32.6795 133.704 32.6837 133.677C32.6837 133.677 32.6753 133.732 32.6553 133.771ZM32.4012 134.055C32.4012 134.055 32.4961 133.985 32.5435 133.95C32.6955 134.057 32.8273 134.203 32.7957 134.227C32.7144 134.116 32.5731 134.123 32.4128 134.07L32.4012 134.055ZM35.8306 135.935C35.8306 135.935 35.7673 135.982 35.6661 135.91C35.6819 135.898 35.6903 135.844 35.6987 135.789L35.6639 135.741C35.7219 135.82 35.78 135.899 35.858 135.939L35.8306 135.935Z"/>
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
		const circleSVG = `<svg width="162" height="179" viewBox="0 0 162 179" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.1317 53.6148L30.1079 53.578L29.8013 53.6522L30.1317 53.6148Z" fill=""/>
<path d="M15.2985 30.6013C15.5853 30.1737 15.9711 30.446 16.2662 29.9186C16.1065 30.075 15.4361 30.2498 15.2985 30.6013Z" fill=""/>
<path d="M16.2644 29.9185L16.2965 29.856C16.2987 29.8754 16.2816 29.8969 16.2644 29.9185Z" fill=""/>
<path d="M10.9459 23.5463C10.9459 23.5463 10.997 23.4822 11.014 23.4608L10.9564 23.4673L10.9267 23.5485L10.9459 23.5463Z" fill=""/>
<path d="M30.2166 46.3741C30.0894 46.4674 29.9405 46.5435 29.7938 46.639C30.1477 46.4608 30.3642 46.6335 30.2166 46.3741Z" fill=""/>
<path d="M13.5781 19.792L13.6457 20.0408C13.6457 20.0408 13.6258 19.8655 13.5781 19.792Z" fill=""/>
<path d="M14.1394 20.5583C14.0188 20.71 13.9521 20.8162 13.9221 20.8985C13.9609 20.8941 13.9976 20.8702 14.0537 20.8441L14.1416 20.5777L14.1394 20.5583Z" fill=""/>
<path d="M31.6103 47.6978C31.5448 47.4681 30.8988 47.8575 30.4944 47.9429C30.1975 47.7592 30.9502 47.6146 31.2418 47.4037C30.9949 47.3132 30.3373 47.4273 30.3024 47.2929C30.4148 47.2407 30.4493 47.1972 30.5834 47.1623C29.9776 47.2112 30.3484 46.6555 29.6064 46.7199C29.6604 46.6743 29.7165 46.6481 29.7533 46.6242C29.4378 46.7983 29.1006 46.9551 28.8541 47.0423C28.8041 46.9492 28.3608 47.039 28.7887 46.8126C28.7953 46.8711 28.9834 46.7905 29.1196 46.7751L28.8816 46.7626C29.4714 46.3993 29.163 46.8097 29.6148 46.6202C29.3245 46.495 28.7143 46.5049 28.8458 46.2727C29.4422 45.968 29.1927 46.5495 29.6546 46.102L29.5148 46.4339C30.4135 45.8381 29.5152 46.6117 30.4701 45.9897C30.5037 45.5908 30.0303 45.763 30.0444 45.3663C29.679 45.4472 29.5604 45.6187 29.1949 45.6997C28.3874 45.5344 30.5555 44.6564 29.5949 44.706C29.1538 44.8153 28.3821 45.1399 28.6688 44.7123L29.3909 44.4723C29.3144 44.1451 28.34 44.7693 28.6352 44.2419C28.9228 44.1698 28.9644 44.3626 29.0334 44.2758C29.4737 43.811 28.5856 44.3266 28.5073 44.1576L29.1016 43.8334C28.8542 43.5651 28.2458 43.4168 27.9768 43.1312C28.1671 43.0701 28.379 43.0263 28.5171 42.8526C28.01 42.5545 28.1295 41.8692 28.2405 41.2837L27.6414 41.3911C27.6414 41.3911 27.8357 41.1913 27.9525 41.178C28.06 40.909 27.6348 41.3326 27.3839 41.3808C27.2972 41.3116 27.6083 41.0985 27.7835 41.0787C27.2056 41.0256 26.4087 40.7801 26.7946 40.1832L26.9698 40.1633C27.049 39.8185 25.8021 40.4736 26.1428 40.0003L26.2596 39.987C26.1888 39.3629 25.4264 39.0739 25.9459 38.2643C25.1981 38.6257 25.9681 37.59 24.9481 38.1601C25.2583 37.5915 25.492 37.565 25.5814 36.9622C25.5659 36.8256 24.8765 37.1804 24.6924 37.1222L25.2088 36.8068L24.5557 36.9599L25.1128 36.4819L24.9115 36.4454C24.9115 36.4454 24.7433 36.7016 24.5942 36.7778C24.2544 36.7373 24.6747 36.0969 24.9296 35.9099L24.2194 35.7336C24.4225 35.6118 24.5438 35.6376 24.719 35.6177C24.0593 35.7123 25.2265 35.2243 24.6057 35.3145C24.5194 35.423 24.2902 35.4885 24.1801 35.5603C24.4217 35.2563 24.2566 35.0182 24.0075 34.9081L24.3792 34.7079C24.2571 34.3266 23.7611 34.1261 23.5221 33.758C23.4513 34.0031 22.8226 34.3708 22.6969 34.306L23.2044 33.9126C22.8283 34.0738 23.0752 34.1643 22.5757 34.2802C22.5558 34.1047 23.1111 33.7849 23.3425 33.7389L23.0416 33.694C23.1863 33.5788 23.3031 33.5655 23.5062 33.4437C23.1301 33.6049 23.8465 32.7927 23.2089 33.0823L23.3536 32.9671C23.1146 32.5991 22.8138 32.5542 22.6054 32.2815C22.1474 32.5902 22.1664 32.4103 21.7514 32.5759C21.7549 32.2594 21.9377 31.7842 21.7142 31.5527C21.3571 31.534 21.3058 31.7769 20.962 31.8751C21.3616 31.573 21.1381 31.3415 21.5253 31.2778C21.239 31.0139 21.1717 30.9425 20.5633 30.7942C20.4231 30.9484 20.3952 31.0503 20.2266 31.1287C20.1054 31.103 20.293 30.8446 20.4961 30.7228L20.5545 30.7162C19.6284 30.7224 21.0324 28.8444 19.9404 29.1263L19.9988 29.1196L19.3041 29.0799C19.2603 28.8675 19.6846 28.9577 19.8461 28.643C18.8922 28.7512 19.4939 27.9717 18.8254 27.9883C19.8418 26.8654 18.1028 27.1812 18.6329 26.2913L18.363 26.5195C18.0214 26.6372 18.4555 26.2916 18.4639 26.1919C18.2458 26.3549 18.2785 26.4698 18.0882 26.5309C17.2281 26.0752 17.4152 24.7698 17.1122 23.8361C16.9967 23.5133 15.5608 24.7628 15.9786 23.9251L16.5772 23.6399C15.5622 23.5575 15.7803 22.5251 14.8582 22.3926C15.0096 22.336 15.1542 22.2208 15.1998 22.2749C15.491 21.8862 14.9153 21.8527 14.6065 22.0853C14.5932 21.9683 14.8764 21.8571 14.995 21.6856C15.1414 21.4122 14.3136 21.7629 14.6308 21.4306C14.6826 21.3654 14.7821 21.3739 14.8211 21.3695C14.5919 21.435 14.6211 20.997 14.2326 21.3967C14.2923 21.0541 13.7538 21.1744 13.9109 20.8207C13.349 21.082 13.8923 20.3092 13.1773 20.7854C13.9074 20.268 13.5043 20.0173 13.0654 20.1461C13.3074 20.0199 13.2118 19.8727 13.5468 19.6964C13.4339 19.5709 13.2132 19.5367 12.8503 19.8149C13.5189 18.929 11.7835 19.7976 12.7787 18.8352C12.0924 18.6957 11.5358 18.4822 11.0937 18.236C11.826 17.7381 11.4711 18.6081 12.2163 18.0494C11.6663 17.8945 10.8858 18.141 10.811 17.6556C10.8517 17.4929 11.1654 17.4771 11.2973 17.4226C10.7473 17.2677 10.8778 16.6799 10.261 16.6314C10.3345 16.5835 10.4318 16.5725 10.5097 16.5636C10.4446 16.5117 10.5243 16.3447 10.196 16.5795L10.3323 16.564C9.93091 17.0244 9.16056 17.013 8.90347 17.1804C9.92561 16.6299 8.92605 16.684 10.2336 16.0418C10.1362 16.0528 9.94376 16.0944 9.72562 16.2574C9.7535 16.1555 9.85925 16.0447 10.1619 15.9314C9.81545 15.8323 9.53491 16.1408 9.39377 15.9394C9.55793 15.822 9.63801 15.8327 9.84332 15.7304C9.46058 15.8331 9.08005 15.9553 9.08802 15.6778C9.20041 15.6255 9.30616 15.5147 9.33226 15.571C9.08492 15.3027 8.13582 15.6277 8.21238 15.0856C8.97743 14.7025 8.35884 14.8121 8.9615 14.3882L8.6584 14.3238L8.41238 14.5887C8.3146 14.422 7.78053 14.5814 7.90753 14.3101L8.2385 14.2726L7.93496 14.0304L7.8146 14.3602C7.40575 14.4065 7.04557 14.882 7.08805 14.5611C7.1854 14.5501 6.99027 14.3944 7.30974 14.0816C7.05886 14.1298 6.80797 14.178 6.8832 13.9719C7.0624 13.8133 7.58541 13.5564 7.69116 13.4456C7.12921 13.7069 7.30533 13.1733 6.70223 13.4195C6.85355 13.3628 7.1863 13.167 7.23807 13.1019L6.78852 13.3109C6.86817 13.1438 6.94161 13.096 7.20091 12.948C7.131 12.6794 6.45799 13.5262 6.63853 13.0316C6.67747 13.0271 6.75091 12.9793 6.831 12.99C6.82791 12.6149 6.23942 12.6422 6.27748 12.2822C6.85625 11.8215 6.56773 12.4074 7.0319 11.9794C6.68501 11.7026 5.81952 11.7217 5.76865 11.2731L5.74077 11.375C4.83102 11.8733 6.03591 10.8476 5.51246 10.9267C5.6098 10.9157 6.03769 10.6894 5.9253 10.7416C5.92884 10.4251 5.43105 10.3828 4.93504 10.1822L5.20098 10.0928C5.33019 9.84105 5.11116 9.64856 5.12798 9.44909C4.86205 9.53852 4.84878 9.42148 4.54214 9.67358C5.60809 8.46608 3.28374 9.18407 4.18996 8.13299C4.21606 8.1893 4.44748 8.1433 4.44306 8.10428L4.03996 7.85365C3.65323 8.09507 3.82403 8.03619 3.55632 8.28387C3.29039 8.37329 3.05235 8.36078 3.02182 8.26545C3.3789 8.28423 3.65279 7.91731 3.84925 7.73697C3.73908 7.80874 3.58775 7.86541 3.4581 7.93938C4.06475 7.37667 2.63464 8.32912 2.99041 7.81461L3.21519 7.7101C3.0528 7.66924 2.72404 7.72628 2.74749 7.58532C3.1882 7.29827 3.02227 7.57392 3.39617 7.39322C3.30281 7.26552 2.36873 7.54925 2.76166 7.18859C2.91741 7.17092 2.96962 7.28354 3.12537 7.26588C3.58954 6.83787 3.45769 6.89233 3.48114 6.75138L3.59928 6.40212L3.47627 6.5346C2.16388 6.96002 3.0515 6.26667 2.12362 6.43116C3.01477 6.29059 2.5776 6.26114 3.12009 6.00205C3.2431 5.86956 3.36169 5.69806 3.51302 5.64139C3.03071 5.7356 3.74798 5.27888 3.03426 5.41909C3.20064 5.32119 2.97984 5.28696 3.43162 5.09744C3.22365 5.00248 3.15506 5.26709 2.93028 5.37161C2.2055 5.41429 3.39977 4.46883 2.41968 4.52071C1.94978 4.37643 1.34225 4.58362 0.93075 4.43272C1.16173 4.20896 1.59668 4.2189 1.59668 4.2189C1.7843 3.96055 1.69314 3.85235 1.4312 3.80302C1.60642 3.78315 1.71217 3.67238 1.89581 3.55277C1.80687 3.46407 1.22766 3.74708 1.41528 3.48872C1.62502 3.42543 1.94935 3.32938 2.16351 3.30509C1.94051 3.25135 1.56617 3.25429 1.34095 3.18105C1.63697 3.00918 1.84051 3.06513 2.07414 3.03863C1.86618 2.94367 1.62769 2.7534 1.11308 2.91054L0.975023 3.08425C0.975023 3.08425 1.38565 2.87963 1.4852 2.8881C1.91574 2.85903 1.39714 3.15492 1.22856 3.23331L1.06396 3.17294C0.0807643 3.71909 1.39802 3.51044 1.42235 3.725L0.641816 3.97157L1.3427 3.89209C1.16128 4.0312 0.772343 4.25311 0.607743 4.19275C0.307737 4.50337 0.92367 4.19644 0.565256 4.51368C0.511273 4.55931 0.472336 4.56373 0.433398 4.56814L0.714811 4.61526C0.541802 4.65464 0.191798 4.87213 0.275872 4.74406C-0.0475887 5.19563 1.02499 4.91595 0.491351 5.25306L0.432939 5.25968C0.833819 5.49081 0.999315 5.0374 1.74577 5.01202L0.494874 5.80584L1.06126 5.58356C1.06126 5.58356 1.05727 5.72231 0.830276 5.80732C1.25859 5.75875 1.05063 5.66379 1.43559 5.58062C1.01036 6.00422 1.89089 5.94388 1.0546 6.39434C1.49354 6.26554 1.29399 6.07084 1.67496 6.12642C0.784683 6.62251 1.94575 6.25377 1.59397 6.62952C1.10326 6.82346 1.26919 6.54781 0.934673 6.90185C1.78866 6.60744 0.920509 7.29859 1.14352 7.35233C1.77892 7.04319 1.55502 7.50323 1.88422 7.62395C1.65944 7.72847 1.75589 8.2312 1.63553 8.56096L1.52313 8.61322C2.18022 8.32138 2.17225 8.59888 2.378 8.67433C1.98684 8.87674 1.83552 8.93341 1.61915 8.93819L1.69525 9.08761C1.92445 9.02211 2.04126 9.00886 2.16471 9.05413L1.67622 9.26758C1.81515 9.44939 2.43595 9.35924 2.24656 9.77585C2.69391 9.54731 3.35012 8.89995 3.79613 9.00742C3.55631 9.15316 3.16737 9.37508 3.02887 9.37102C3.06781 9.36661 3.2625 9.34453 3.19347 9.43139L2.73285 9.54289C2.61869 9.7534 3.09391 9.42292 3.10497 9.52045C2.77222 9.71623 2.91072 9.72028 2.62975 9.85093C2.59081 9.85535 2.73108 9.70114 2.57754 9.73831C2.59302 9.87485 2.44213 10.1093 2.20673 10.294C2.39036 10.1744 2.67133 10.0438 2.75585 10.0935C2.89478 10.2753 2.39522 10.3912 2.28106 10.6017C2.54699 10.5123 2.37884 10.7684 2.88017 10.4943C2.90628 10.5506 2.68592 10.6941 2.55849 10.7876C2.83105 10.7567 2.88193 11.2053 3.36778 10.7946L3.36335 10.7556C3.36335 10.7556 3.40229 10.7512 3.42176 10.7489C4.11424 10.7692 3.51688 11.5877 3.9328 11.7776L3.76643 11.8755C4.07173 11.9594 4.12217 12.2303 4.56775 12.16C4.59385 12.2163 4.34783 12.4813 4.14031 12.5641C4.34606 12.6396 4.53189 12.5395 4.39649 12.9104C4.02658 12.9524 4.1633 13.1147 4.09782 12.885C4.07038 13.1647 3.83719 13.369 4.41905 13.2832C3.94781 13.475 3.97878 13.7481 4.15842 13.7672L4.37834 13.4459C4.504 13.5107 4.51506 13.6082 4.5478 13.723L3.9708 14.0256C3.54866 14.8242 5.54381 13.9855 4.61149 14.9802C5.06769 14.8297 4.7469 14.6093 5.25487 14.3936C5.2792 14.6082 4.62741 15.2945 4.65573 15.3704C4.50749 15.8021 5.5876 15.0671 5.55396 15.4661C5.73317 15.3074 6.22344 14.9357 6.52654 15.0002C6.55087 15.2147 5.84245 15.7495 5.62387 15.7347C5.5805 15.7001 5.6128 15.6372 5.68846 15.6089C5.58891 15.6004 5.44821 15.5768 5.27564 15.794L5.48095 15.6917C5.34732 15.9044 5.53182 16.1403 5.1535 16.282C5.43049 16.2901 5.51014 16.123 5.55085 15.9603C5.41987 16.3703 5.7681 16.3111 5.73004 16.671C5.81633 16.5624 6.01279 16.3821 6.03668 16.4189C6.03357 16.9132 6.49952 16.3269 6.73358 16.4782C6.53314 16.7973 5.99464 16.9176 6.39508 16.971C6.28755 17.24 5.90481 17.3427 5.71454 17.4038C6.22074 17.3464 5.73754 17.9543 5.75523 18.1104L5.5216 18.1369C5.65788 18.1214 5.68178 18.1582 5.72735 18.2123L6.0663 17.8973C6.03842 17.9992 6.08399 18.0533 5.91983 18.1707C6.22249 18.0574 6.51586 17.6883 6.95701 17.579C6.82338 17.7917 7.34461 17.6931 6.85434 18.0648C6.84904 17.6702 6.36629 18.456 6.13001 18.2852C6.22735 18.2742 6.25566 18.35 6.22779 18.4519C6.1738 18.4976 6.11761 18.5237 6.07646 18.5086C5.80521 19.0728 6.73575 18.2363 6.90301 18.4939C6.58752 18.668 6.3999 18.9263 6.49946 18.9348C6.42778 18.8244 6.94858 18.548 7.21893 18.4976C7.11804 18.8251 7.50257 18.5642 7.55478 18.6768L7.59328 18.4947C7.90877 18.3206 7.92425 18.4571 8.08664 18.498C7.86849 18.661 7.87026 18.5028 7.78397 18.6113C8.36982 18.3868 7.46538 19.2797 7.93042 19.2072C7.79679 19.4199 7.40343 19.6028 7.32157 19.7504C7.82776 19.693 7.08261 20.2516 7.53482 20.2399C7.87155 19.9053 7.77864 19.9554 8.23926 19.8439L7.72821 19.6845L8.43749 19.5053C8.36581 19.3949 8.03706 19.4519 8.06494 19.35C8.44548 19.2278 8.35476 19.2973 8.63751 19.0084C8.16715 19.5557 9.17424 19.0464 8.90918 19.4913L7.95872 20.1523C7.72419 20.6925 8.75739 20.2395 8.75429 20.7338L8.84676 20.506C9.25518 20.2819 9.04189 20.6617 9.27773 20.6547C8.9472 20.87 8.88481 21.0153 8.7295 21.2108C8.96711 21.0455 8.87728 21.4706 9.51889 21.0422L9.21489 21.4916C9.23966 21.8839 10.3176 21.1295 10.3941 21.4566C10.0007 21.6395 9.85425 21.913 9.49939 21.9137C9.54939 22.0068 9.56266 22.1239 9.7808 21.9608C9.62549 22.1562 10.3649 21.8946 10.1211 22.1791C10.2919 22.1202 10.6202 21.8854 10.6529 22.0002C10.6012 22.0654 10.5082 22.1154 10.5082 22.1154C10.6529 22.0002 10.8219 22.0996 11.1003 21.7717C10.3237 22.7488 11.6883 22.436 11.0326 23.2611C11.2622 23.3734 11.533 23.5007 11.6675 23.6435C11.5746 23.6936 11.5033 23.7609 11.5162 23.7002C11.3896 24.1492 12.5016 23.1735 12.3794 23.6616C11.9825 24.161 12.0117 23.723 11.8803 23.9552C10.8869 24.7594 12.2573 24.1496 11.7763 24.7771L11.679 24.7881C11.4268 25.1723 12.313 24.815 12.3829 25.0836C12.3829 25.0836 12.29 25.1337 12.2188 25.201C12.8414 24.9526 13.2334 25.1057 13.5214 25.2114C13.0741 25.4399 13.2338 25.2835 12.8582 25.6224C12.9816 25.6677 13.4909 25.116 13.7378 25.2066C13.5652 25.4237 13.4794 25.7101 13.0453 26.0556L12.8891 25.8955C12.3949 26.406 13.0714 26.1119 13.0502 26.2724L12.7931 26.4398C13.0727 26.6452 13.6905 26.18 13.8666 26.5157L14.0241 26.3398C14.759 26.0391 13.7719 26.724 14.3427 26.5407L13.7488 27.0427C13.9825 27.0162 14.6249 26.9434 14.8741 27.0534C14.3294 27.293 13.9311 27.2591 13.5634 27.3206C13.6351 27.431 13.8758 27.6408 14.2108 27.4645C14.1134 27.4755 13.9232 27.5366 13.9878 27.4107C14.5714 27.1667 14.9263 27.166 15.0674 27.3673C13.8448 28.237 15.1537 28.1281 14.3422 28.9708C15.0563 29.0084 14.6753 29.8221 15.0528 30.1942C15.8837 29.3492 15.1634 30.3002 16.1245 29.559C16.2479 29.6043 16.274 29.6606 16.22 29.7062L15.8669 30.418C15.6426 30.7002 15.5793 30.4901 15.3806 30.6509C15.47 30.9174 15.0311 31.0462 14.8912 31.3782C15.2151 31.1043 15.451 31.0974 15.3974 31.3207L15.7164 30.8302C16.4563 30.7463 15.104 31.6899 15.8244 31.6082L15.4439 31.7304C15.7425 31.7558 15.8629 32.2953 16.7447 31.899C16.6585 32.0075 16.408 32.2335 16.289 32.2272C16.4394 32.6843 17.7155 32.4606 17.4315 33.0855L17.1722 33.2334C17.2934 33.2592 17.7018 33.0351 17.5337 33.2912C17.4235 33.363 17.2744 33.4392 17.2788 33.4782C17.3956 33.465 17.8368 33.3557 17.7615 33.5618L17.4394 33.6773C17.3867 34.2562 18.4956 33.7749 18.8726 33.9692C18.1597 34.4649 18.1305 34.9029 18.1159 35.1218L18.0057 35.1936C18.1995 35.6853 19.0863 35.5057 19.6234 35.7214C19.0216 36.5009 19.8619 36.781 19.6818 37.4534C19.7637 37.3058 20.2522 37.0923 20.3734 37.1181C20.296 37.3047 21.0548 37.0408 20.3743 37.4736L20.3698 37.4346C19.7566 37.9388 20.0597 38.0032 20.138 38.1721L21.0238 37.637C19.9968 38.8401 22.1335 38.3805 21.1362 39.3234C21.4087 39.2925 21.4804 39.4029 21.7702 39.3502L21.2906 39.6417C21.3282 39.9733 21.3481 40.1489 21.6733 40.4083L21.295 40.55C21.3777 40.758 22.8061 39.9638 22.9406 40.1066L22.2645 40.5784C22.4773 40.8901 22.0441 41.5912 22.8662 41.5375C22.7538 41.5898 22.5507 41.7116 22.4857 41.6597C22.5445 41.8308 22.3277 42.5271 23.2848 41.9247C22.6366 42.2945 23.4069 42.306 23.8029 42.3203L23.3166 42.5533C24.0042 42.3568 24.1728 42.2784 24.4631 42.4035C24.433 42.4859 24.0981 42.6622 24.1821 42.5341C24.0184 42.8293 24.7012 42.416 24.5635 42.7675L24.2197 42.8658C24.2808 43.0564 24.4277 42.9607 24.8494 42.8536C25.1069 42.8639 24.8936 43.2437 24.4896 43.5069C24.7728 43.3957 25.175 43.2908 25.1148 43.4557C24.9485 43.5536 24.8317 43.5669 24.7732 43.5735C24.6078 44.0269 25.5591 43.7215 25.175 44.1601C25.0064 44.2385 24.9352 44.3059 24.9007 44.3493C24.794 44.1046 24.733 43.9139 24.7719 43.9095C24.3246 44.138 24.3316 44.3743 23.6418 44.5513C24.0507 44.505 24.9073 44.4078 24.7825 44.6986C24.7458 44.7225 24.7091 44.7464 24.6356 44.7943L24.5772 44.8009C24.5772 44.8009 24.6055 44.8767 24.7051 44.8852C24.6577 44.9893 24.6254 45.0522 24.6515 45.1086C24.2798 45.3088 24.5484 45.4166 24.5812 45.5314C25.0652 45.279 25.044 45.4394 25.4024 45.1222C25.3657 45.1461 25.344 45.1288 25.279 45.0769C25.2595 45.0791 25.2378 45.0618 25.2183 45.064L25.2573 45.0596C25.2573 45.0596 25.1617 44.9124 25.1139 44.8388C25.406 44.8057 25.6591 44.777 25.4281 45.0007C25.7719 44.9025 26.1135 44.7847 26.2865 44.7453C25.6493 45.2127 25.4015 45.636 24.9953 45.8796C25.4068 46.0305 25.4944 46.4552 26.5325 46.2189C26.6927 46.2403 26.3015 46.4427 26.1741 46.5362C26.0573 46.5494 26.0484 46.4714 25.8949 46.5086C26.2174 46.5708 26.2205 46.9458 26.9015 46.6908C26.7033 47.0294 26.2289 46.8461 26.4719 47.0754L26.2577 47.0996C25.4294 48.1419 28.3356 47.3382 27.2112 48.5523C27.2802 48.4654 27.317 48.4415 27.4099 48.3915C27.0855 49.3568 28.6205 49.6767 27.8766 50.7686C27.7496 51.0398 28.1886 50.911 28.5651 50.9276L28.0204 51.1672L28.7302 51.1657C29.3018 51.338 27.5209 52.1524 28.5381 52.2544L28.8947 52.0954C28.8735 52.2558 29.2527 52.4697 28.8115 52.579C28.8894 52.5701 29.2182 52.5131 29.0346 52.6327L28.7297 52.7265L29.3447 52.9334C29.2049 53.2654 28.1554 53.2263 28.2213 53.6337C28.3708 53.7353 29.2279 53.8159 29.4115 53.6963C29.4049 53.6378 29.5474 53.5031 29.8522 53.4093L30.0407 53.5064C30.923 53.2878 31.8748 53.1601 32.3691 52.6497L31.7478 52.5621L32.1585 52.3575L32.2412 52.5654C32.6107 52.3457 32.2191 52.3704 31.9593 52.3405C32.1863 52.2555 32.3355 52.1793 32.4067 52.112L31.5001 52.116C31.8394 51.9788 32.2204 52.0343 32.3518 51.8021C31.9386 51.8095 31.6191 52.1223 31.3116 52.0189C31.6788 51.7797 32.0076 51.7226 31.6288 51.6865C31.8558 51.6015 31.9921 51.5861 32.1156 51.6313C31.8147 51.5864 31.9049 51.3391 31.4204 51.4138C31.8634 51.1463 31.162 51.048 32.001 50.7948C31.7868 50.8191 31.289 50.7768 31.2196 50.6858C32.2709 50.5666 31.1492 50.2394 32.2218 49.9597C31.2917 50.1047 31.6603 49.5295 31.078 49.4375C31.1559 49.4286 31.3116 49.411 31.2576 49.4566C31.2767 49.2767 31.5382 49.1482 31.659 48.9962C30.9368 49.2362 30.6811 49.0676 30.1727 49.1055C30.7948 48.6793 31.0572 48.9064 31.7121 48.5951C31.1262 48.8196 31.0108 48.4968 30.5439 48.7275C30.924 48.4276 30.6992 48.5321 31.2762 48.2296C30.3661 48.5501 31.0705 48.1541 30.4714 48.2616C30.8426 47.8836 31.2971 47.8914 30.9289 47.7751C31.1621 47.5708 31.5647 47.6437 31.5647 47.6437L31.6103 47.6978ZM27.8321 43.2464C27.8321 43.2464 27.8994 43.3178 27.9016 43.3373C27.9016 43.3373 27.8582 43.3027 27.8126 43.2486L27.8321 43.2464ZM27.6277 42.8349C27.6277 42.8349 27.6432 42.9714 27.6887 43.0255C27.5224 43.1234 27.3538 43.2018 27.3277 43.1455C27.4423 43.1128 27.5047 42.9674 27.6082 42.8371L27.6277 42.8349ZM24.6263 45.4078C24.6263 45.4078 24.6153 45.3102 24.7082 45.2602C24.7299 45.2775 24.7732 45.3121 24.8166 45.3467L24.875 45.34C24.7776 45.3511 24.6847 45.4011 24.6091 45.4295L24.6263 45.4078Z" fill=""/>
<path d="M25.3327 45.1894L25.3714 45.185C25.4057 45.1418 25.4422 45.118 25.4594 45.0965L25.2896 45.155L25.294 45.1938L25.3327 45.1894Z" fill=""/>
<path d="M25.3611 36.7699L25.2331 36.8427L25.3654 36.8083L25.3611 36.7699Z" fill=""/>
<path d="M13.5547 19.7744L13.5747 19.7904L13.5547 19.7744Z" fill=""/>
<path d="M10.3836 23.6112L10.8515 23.2228C10.7154 23.2382 10.1482 23.6182 10.3836 23.6112Z" fill=""/>
<path d="M13.5948 26.8829C13.3836 27.1041 13.2913 27.3315 13.5913 27.1989C13.578 27.082 13.692 26.8719 13.5948 26.8829Z" fill=""/>
<path d="M20.5384 38.4034L20.3242 38.4277L20.5472 38.4815L20.5384 38.4034Z" fill=""/>
<path d="M109.558 9.24289C109.482 9.0937 109.233 8.80635 109.205 8.90813L109.563 9.45932L109.578 9.24068L109.558 9.24289Z" fill=""/>
<path d="M108.335 8.69112C108.45 9.01389 108.685 9.52068 109.108 9.94687C108.808 9.38819 108.988 9.58509 108.616 8.916C108.642 8.79455 108.881 8.98482 109 9.16884C108.924 9.01942 109.199 9.18578 108.982 8.83504C108.57 8.50638 108.442 8.59986 108.569 9.02015C108.461 8.93366 108.385 8.78423 108.313 8.67382L108.335 8.69112Z" fill=""/>
<path d="M100.645 13.5732L100.745 13.6007C100.745 13.6007 100.683 13.5689 100.645 13.5732Z" fill=""/>
<path d="M96.0917 16.8942C96.0917 16.8942 96.0806 16.7972 96.0547 16.7412C96.0613 16.7994 96.0679 16.8576 96.0917 16.8942Z" fill=""/>
<path d="M94.8947 16.9514C94.8947 16.9514 94.9332 16.947 94.9716 16.9427C94.9096 16.9108 94.8882 16.8938 94.8947 16.9514Z" fill=""/>
<path d="M100.643 13.5735L100.398 13.5024C100.516 13.667 100.565 13.5823 100.643 13.5735Z" fill=""/>
<path d="M108.342 10.6853C108.342 10.6853 108.329 10.5682 108.301 10.4924C108.305 10.5314 108.31 10.5704 108.292 10.5922L108.362 10.6831L108.342 10.6853Z" fill=""/>
<path d="M102.234 11.5949L102.273 11.5905C102.273 11.5905 102.194 11.4218 102.125 11.3311L102.234 11.5949Z" fill=""/>
<path d="M103.648 10.3286C103.648 10.3286 103.935 10.7703 104.076 10.9716C103.957 10.7876 103.905 10.6749 103.917 10.6142C103.848 10.5233 103.779 10.4324 103.668 10.3264L103.648 10.3286Z" fill=""/>
<path d="M101.099 12.3749C101.099 12.3749 100.989 12.2695 100.965 12.2329C101.01 12.2867 101.055 12.3405 101.099 12.3749Z" fill=""/>
<path d="M64.5044 51.0007C64.5044 51.0007 64.4591 50.9469 64.4375 50.9297C64.4635 50.9857 64.485 51.0029 64.5044 51.0007Z" fill=""/>
<path d="M61.0284 50.6243L61.0218 50.5659L60.8203 50.3521L61.0284 50.6243Z" fill=""/>
<path d="M81.1797 28.5039C81.6412 28.7479 81.3739 29.1734 81.9522 29.4041C81.7983 29.2635 81.5651 28.5985 81.1797 28.5039Z" fill=""/>
<path d="M108.242 10.6575C108.242 10.6575 108.207 10.7007 108.188 10.7029C108.227 10.6985 108.246 10.6963 108.242 10.6575Z" fill=""/>
<path d="M81.9492 29.3848L82.0117 29.417C81.9923 29.4192 81.973 29.4214 81.9492 29.3848Z" fill=""/>
<path d="M90.2227 20.4453C90.2227 20.4453 90.3542 20.5679 90.4167 20.6001C90.3736 20.5657 90.3283 20.5119 90.2227 20.4453Z" fill=""/>
<path d="M89.5371 22.0632C89.5371 22.0632 89.4153 22.0187 89.424 22.0954C89.4432 22.0933 89.4668 22.1295 89.486 22.1273C89.4581 22.0527 89.4537 22.0143 89.535 22.044L89.5371 22.0632Z" fill=""/>
<path d="M88.3008 23.1328C88.3008 23.1328 88.365 23.1839 88.3863 23.2009L88.3798 23.1433L88.3008 23.1328Z" fill=""/>
<path d="M67.8153 47.3458C67.6877 47.2616 67.5383 47.1602 67.4062 47.0371C67.6921 47.3006 67.6236 47.5648 67.8153 47.3458Z" fill=""/>
<path d="M108.137 10.4517C108.208 10.5621 108.256 10.6357 108.241 10.6769L108.273 10.614C108.273 10.614 108.18 10.4863 108.137 10.4517Z" fill=""/>
<path d="M92.323 25.403L92.0791 25.5095C92.0791 25.5095 92.2519 25.4702 92.323 25.403Z" fill=""/>
<path d="M76.1641 39.2471L76.1749 39.343C76.1749 39.343 76.192 39.3217 76.1641 39.2471Z" fill=""/>
<path d="M91.5484 26.0634C91.3774 25.9447 91.2736 25.8973 91.1914 25.8672C91.1958 25.9061 91.2197 25.9429 91.2652 25.9969L91.5484 26.0634Z" fill=""/>
<path d="M67.1335 49.162C67.3127 49.0033 66.7123 48.5775 66.4583 48.2507C66.518 47.9081 66.9242 48.5337 67.2622 48.7325C67.253 48.4767 66.8902 47.8856 67.0003 47.8138C67.0871 47.883 67.1477 47.8959 67.2216 48.0258C66.9627 47.4822 67.6078 47.6067 67.2751 46.9332C67.3379 46.9655 67.3813 47.0001 67.4247 47.0347C67.1428 46.8099 66.876 46.5438 66.6959 46.3469C66.7649 46.26 66.5238 45.8725 66.8751 46.1882C66.8212 46.2339 66.9534 46.3572 67.0273 46.4871L66.9619 46.2574C67.5017 46.6704 67.0123 46.5283 67.3703 46.9026C67.3738 46.5861 67.169 45.9969 67.4265 46.0072C67.9123 46.4658 67.2999 46.4562 67.8804 46.7065L67.5061 46.7094C68.384 47.3211 67.3353 46.7683 68.2587 47.4341C68.6415 47.3314 68.2986 46.9159 68.6813 46.8132C68.488 46.4993 68.2844 46.4433 68.0694 46.1121C67.9765 45.2928 69.5149 47.0348 69.1579 46.1467C68.9167 45.7592 68.3526 45.1317 68.8614 45.2715L69.3238 45.871C69.6176 45.6797 68.707 44.9532 69.3132 45.082C69.4805 45.3396 69.2946 45.4397 69.3964 45.4677C69.9791 45.7375 69.2114 45.054 69.3345 44.9215L69.8203 45.3801C70.0013 45.0632 69.95 44.4368 70.1632 44.057C70.2805 44.2215 70.3805 44.4078 70.5884 44.5027C70.719 43.915 71.4177 43.816 72.0429 43.7648L71.784 43.2213C71.784 43.2213 72.0159 43.353 72.0681 43.4656C72.3473 43.4932 71.8208 43.1973 71.7358 42.9699C71.7832 42.8657 72.0672 43.1101 72.1455 43.2791C72.0597 42.6961 72.1031 41.8614 72.796 42.0594L72.8549 42.2305C73.2075 42.2103 72.2593 41.1522 72.8159 41.3657L72.8292 41.4827C73.454 41.2538 73.5753 40.4103 74.5 40.74C73.9921 40.0864 75.1748 40.6042 74.4261 39.7408C75.0584 39.926 75.1412 40.1339 75.7491 40.1045C75.881 40.05 75.3992 39.4527 75.4354 39.251L75.8607 39.6967L75.5757 39.0968L76.1589 39.5443L76.1346 39.3298C76.1346 39.3298 75.8855 39.2197 75.7704 39.0747C75.7501 38.7214 76.4713 38.9952 76.6947 39.2267L76.747 38.4701C76.9054 38.6497 76.9014 38.7884 76.9385 38.9422C76.7271 38.2945 77.42 39.3618 77.2151 38.7726C77.0872 38.6883 76.9872 38.5021 76.8961 38.3939C77.2514 38.5709 77.4651 38.3689 77.5337 38.1042L77.7877 38.4311C78.1594 38.2309 78.2771 37.7038 78.616 37.3888C78.3563 37.359 77.8983 36.7985 77.9607 36.6531L78.4249 37.0944C78.2271 36.7414 78.1585 37.006 77.9669 36.5339C78.1377 36.475 78.5501 36.9814 78.6156 37.2111L78.6213 36.914C78.7536 37.0373 78.7864 37.1522 78.9448 37.3318C78.747 36.9788 79.6421 37.5688 79.2598 36.9799L79.3921 37.1032C79.7311 36.7882 79.7368 36.4912 79.9829 36.2262C79.6205 35.8129 79.7979 35.8126 79.5935 35.4011C79.9245 35.3636 80.4289 35.4644 80.636 35.2038C80.6156 34.8505 80.3754 34.8185 80.2209 34.5002C80.5767 34.8549 80.7838 34.5944 80.9059 34.9757C81.1453 34.6522 81.2143 34.5653 81.2993 33.9235C81.128 33.8046 81.0068 33.7788 80.9307 33.6294C80.9369 33.5102 81.2294 33.6548 81.3683 33.8366L81.3749 33.8951C81.2882 32.9566 83.3316 34.1079 82.9524 33.0248L82.959 33.0833L82.9573 32.3722C83.1648 32.2894 83.1161 32.7296 83.4475 32.8698C83.259 31.9034 84.1086 32.4393 84.0484 31.7348C85.2732 32.6233 84.821 30.8965 85.7763 31.3216L85.5312 31.0728C85.394 30.7327 85.7542 31.1265 85.8732 31.1328C85.6931 30.9359 85.5807 30.9881 85.5002 30.7997C85.9263 29.8623 87.2896 29.8855 88.2104 29.4848C88.5281 29.3302 87.1746 28.0019 88.0582 28.3166L88.3994 28.8904C88.4184 27.8411 89.5158 27.9538 89.6043 26.9954C89.6782 27.1253 89.7954 27.2898 89.7414 27.3355C90.164 27.5839 90.1755 26.9899 89.9065 26.7043C90.0211 26.6716 90.1516 26.9531 90.3401 27.0503C90.6282 27.1559 90.2215 26.3525 90.5901 26.6465C90.6552 26.6984 90.6662 26.796 90.6707 26.835C90.5857 26.6075 91.0552 26.5741 90.6021 26.2303C90.9592 26.2491 90.8194 25.7117 91.1875 25.828C90.8897 25.2889 91.7132 25.7684 91.1813 25.078C91.7521 25.764 91.9977 25.3213 91.8517 24.9032C91.9778 25.1457 92.1419 25.0283 92.3353 25.3423C92.4778 25.2076 92.4902 24.9691 92.1778 24.6489C93.1313 25.2322 92.1512 23.5455 93.1813 24.4561C93.2964 23.7318 93.4853 23.1374 93.7265 22.6557C94.2778 23.3439 93.3619 23.0921 93.9716 23.7737C94.1021 23.186 93.819 22.4278 94.3141 22.2729C94.4938 22.2921 94.5097 22.6064 94.5858 22.7558C94.7163 22.168 95.3331 22.2166 95.3597 21.5814C95.4075 21.655 95.438 21.7503 95.4469 21.8284C95.4964 21.7437 95.6805 21.8019 95.4093 21.4968L95.4247 21.6333C94.9305 21.2745 94.881 20.4898 94.6942 20.2344C95.3371 21.2086 95.2004 20.177 95.9739 21.4327C95.9628 21.3352 95.9017 21.1446 95.7216 20.9477C95.8407 20.9539 95.9513 21.0599 96.0818 21.3415C96.1783 20.9749 95.8141 20.7198 96.0323 20.5568C96.1473 20.7018 96.1584 20.7994 96.2995 21.0007C96.1579 20.6216 96.0164 20.2425 96.3084 20.2094C96.3779 20.3003 96.4885 20.4063 96.4345 20.4519C96.6956 20.1457 96.2973 19.2426 96.8686 19.2371C97.3075 19.9776 97.1588 19.3622 97.6535 19.8988L97.696 19.5779L97.3969 19.3747C97.5611 19.2573 97.3629 18.7266 97.6465 18.7932L97.723 19.1204L97.919 18.7623L97.5748 18.6828C97.4872 18.2581 96.9629 17.9817 97.296 17.9637C97.3071 18.0612 97.4602 17.8463 97.8244 18.1013C97.7567 17.8522 97.6695 17.6052 97.9098 17.6372C98.0854 17.7951 98.396 18.2736 98.5261 18.3774C98.2089 17.8404 98.7912 17.9324 98.4695 17.3564C98.5262 17.5081 98.7757 17.7959 98.8407 17.8478L98.593 17.4017C98.7576 17.4621 98.8226 17.514 99.0093 17.7694C99.2925 17.6582 98.3434 17.1139 98.8673 17.2126C98.8717 17.2516 98.9368 17.3035 98.9284 17.4032C99.3177 17.359 99.2275 16.7371 99.6213 16.7319C100.153 17.2446 99.5182 17.04 99.9996 17.4595C100.252 17.0753 100.15 16.178 100.608 16.047L100.492 16.0603C99.8815 15.2009 101.063 16.2325 100.926 15.7147C100.937 15.8122 101.239 16.2127 101.167 16.1022C101.496 16.0452 101.475 15.5141 101.612 14.9849L101.738 15.2274C102.022 15.2941 102.19 15.0379 102.404 15.0136C102.278 14.7711 102.373 14.7405 102.087 14.4767C103.5 15.2845 102.428 13.1341 103.645 13.7863C103.591 13.8319 103.676 14.0593 103.713 14.0354L103.896 13.5603C103.581 13.2206 103.679 13.3873 103.378 13.1647C103.251 12.9221 103.225 12.688 103.316 12.6185C103.355 12.9696 103.774 13.179 104.008 13.3303C103.917 13.2221 103.843 13.0922 103.732 12.9862C104.417 13.4617 103.196 12.2567 103.772 12.468L103.913 12.6693C103.934 12.5088 103.819 12.1861 103.953 12.1511C104.33 12.5232 104.003 12.422 104.279 12.7661C104.402 12.6336 103.93 11.7783 104.379 12.083C104.397 12.2391 104.325 12.3064 104.365 12.4798C104.881 12.8559 104.805 12.7065 104.963 12.7083L105.378 12.7205L105.211 12.6406C104.522 11.4346 105.413 12.1633 105.076 11.273C105.37 12.1287 105.339 11.6778 105.69 12.1714C105.857 12.2512 106.063 12.3267 106.139 12.4761C105.947 12.0039 106.551 12.627 106.276 11.9469C106.411 12.0897 106.406 11.8729 106.686 12.256C106.737 12.0131 106.443 12.0268 106.302 11.8254C106.125 11.1343 107.33 12.0249 107.083 11.0651C107.125 10.5664 106.786 10.0121 106.833 9.55248C107.108 9.71883 107.198 10.1631 107.198 10.1631C107.505 10.2665 107.59 10.1384 107.578 9.86311C107.654 10.0125 107.763 10.099 107.936 10.2374C108.001 10.1115 107.571 9.62683 107.881 9.74976C107.981 9.93599 108.172 10.2304 108.255 10.4384C108.267 10.1999 108.184 9.81417 108.196 9.57569C108.439 9.80498 108.427 10.0435 108.529 10.2492C108.582 10.0258 108.725 9.71335 108.418 9.27391L108.213 9.19846C108.213 9.19846 108.527 9.53815 108.538 9.63568C108.665 10.056 108.242 9.62979 108.127 9.48478L108.148 9.32432C107.367 8.52383 107.883 9.76927 107.656 9.85428L107.221 9.1528L107.457 9.83735C107.283 9.69896 106.969 9.35926 106.99 9.1988C106.611 8.98497 107.047 9.52819 106.661 9.25584C106.596 9.20394 106.594 9.18444 106.57 9.14764L106.603 9.44022C106.508 9.29301 106.219 9.00961 106.36 9.03317C105.827 8.8565 106.368 9.80273 105.889 9.40267L105.882 9.34415C105.719 9.81707 106.215 9.8399 106.418 10.5874L105.336 9.56423L105.668 10.06C105.668 10.06 105.532 10.0754 105.393 9.89361C105.519 10.3139 105.573 10.0905 105.751 10.4457C105.244 10.1476 105.458 10.9926 104.846 10.2914C105.07 10.7007 105.219 10.4468 105.241 10.8196C104.543 10.0493 105.158 11.1254 104.716 10.8792C104.429 10.4375 104.736 10.541 104.294 10.2947C104.777 11.0698 103.89 10.3801 103.875 10.5991C104.314 11.1618 103.788 11.0437 103.73 11.4058C103.589 11.2045 103.101 11.418 102.741 11.3797L102.672 11.2888C103.093 11.8732 102.803 11.9258 102.771 12.1665C102.496 11.8224 102.42 11.673 102.376 11.4606L102.251 11.5736C102.372 11.7771 102.407 11.9115 102.362 12.0351L102.056 11.5957C101.898 11.7716 102.086 12.3826 101.623 12.2968C101.924 12.6972 102.694 13.2224 102.65 13.7016C102.47 13.5047 102.172 13.1433 102.157 13.0067C102.161 13.0457 102.222 13.2364 102.118 13.1889L101.931 12.7557C101.706 12.6825 102.107 13.0914 102.014 13.1414C101.763 12.8341 101.778 12.9707 101.594 12.7348C101.589 12.6957 101.758 12.7951 101.704 12.663C101.567 12.6784 101.303 12.6096 101.082 12.3976C101.238 12.5577 101.403 12.7958 101.375 12.8978C101.218 13.0737 101.024 12.582 100.779 12.511C100.905 12.7535 100.615 12.6284 100.982 13.0807C100.928 13.1263 100.748 12.9294 100.637 12.8234C100.707 13.0921 100.251 13.2426 100.728 13.6232L100.767 13.6187C100.767 13.6187 100.771 13.6578 100.774 13.6773C100.853 14.3795 99.9368 13.95 99.7886 14.3817L99.6736 14.2367C99.6311 14.5576 99.3479 14.6687 99.4939 15.0868C99.4399 15.1324 99.1386 14.9098 99.0191 14.7258C98.9656 14.9492 99.1045 15.131 98.7019 15.0581C98.6209 14.6919 98.4634 14.8678 98.6665 14.746C98.3744 14.7791 98.1532 14.5671 98.2952 15.124C98.0475 14.6779 97.7598 14.75 97.782 14.9451L98.1373 15.1221C98.0943 15.2653 97.9797 15.298 97.8651 15.3308L97.4873 14.7809C96.6036 14.4662 97.6881 16.3782 96.5718 15.5762C96.7589 16.0094 96.9744 15.6491 97.2266 16.1342C96.9974 16.1997 96.2235 15.6355 96.1696 15.6811C95.7063 15.5954 96.5678 16.5843 96.1567 16.6111C96.3324 16.769 96.7576 17.2147 96.7151 17.5356C96.4859 17.6011 95.8806 16.9586 95.8735 16.7223C95.908 16.6788 95.9709 16.7112 96.0186 16.7848C96.0054 16.6678 96.031 16.5464 95.797 16.3951L95.9187 16.5986C95.689 16.4864 95.4753 16.6884 95.2797 16.355C95.3107 16.628 95.4753 16.6884 95.6355 16.7098C95.2133 16.6391 95.2921 16.9858 94.9177 16.9887C95.0434 17.0535 95.243 17.2482 95.2062 17.2721C94.7001 17.3295 95.3567 17.7292 95.1907 18.0049C94.8376 17.8473 94.6978 17.31 94.6664 17.7285C94.3828 17.6618 94.2412 17.2828 94.1801 17.0921C94.2593 17.6166 93.6178 17.1756 93.4447 17.215L93.4182 16.981C93.4337 17.1175 93.3797 17.1631 93.3257 17.2088L93.6965 17.5223C93.5775 17.5161 93.5213 17.5422 93.4063 17.3972C93.5368 17.6787 93.9615 17.9467 94.0881 18.367C93.8584 18.2547 93.996 18.7725 93.5708 18.3268C93.9602 18.2827 93.1456 17.8812 93.2921 17.6077C93.3031 17.7052 93.2492 17.7509 93.1279 17.7251C93.0823 17.671 93.0562 17.6147 93.0518 17.5757C92.4368 17.3688 93.3801 18.2102 93.1275 18.4166C92.9363 18.1222 92.6416 17.9581 92.6527 18.0556C92.7607 17.9643 93.0735 18.4623 93.1456 18.7505C92.8036 18.6905 93.1009 19.0519 92.9885 19.1041L93.1682 19.1233C93.3593 19.4177 93.2447 19.4504 93.2062 19.6326C93.0261 19.4357 93.1796 19.3986 93.0757 19.3511C93.3389 19.9337 92.3783 19.114 92.4704 19.5778C92.2407 19.4655 92.0407 19.0931 91.8567 19.0349C91.9553 19.5572 91.3239 18.8582 91.3575 19.3286C91.7261 19.6227 91.6566 19.5318 91.8093 20.0084L91.9443 19.4596L92.1624 20.1659C92.2704 20.0746 92.1938 19.7474 92.3128 19.7537C92.4544 20.1328 92.3849 20.0419 92.6885 20.284C92.0903 19.8777 92.6725 20.839 92.1938 20.6167L91.4429 19.7338C90.8518 19.5638 91.3801 20.5707 90.8739 20.6281L91.0991 20.7014C91.3597 21.0867 90.946 20.9163 90.9531 21.1526C90.7013 20.8452 90.5584 20.8022 90.3438 20.6487C90.5456 20.8629 90.0889 20.8357 90.5708 21.433L90.0876 21.1717C89.6982 21.2158 90.5079 22.2699 90.1858 22.3855C89.9836 21.9935 89.6955 21.8879 89.673 21.515C89.5823 21.5846 89.4655 21.5978 89.6455 21.7947C89.4331 21.6608 89.753 22.395 89.4323 22.1745C89.5084 22.324 89.7623 22.6508 89.6499 22.7031C89.5849 22.6512 89.5349 22.558 89.5349 22.558C89.6499 22.703 89.5725 22.8896 89.915 23.1274C88.8703 22.4358 89.2632 23.8138 88.3681 23.2238C88.2778 23.4711 88.1336 23.7641 87.9933 23.9183C87.9238 23.8274 87.8588 23.7755 87.9172 23.7688C87.4561 23.7026 88.4995 24.7302 87.9778 24.651C87.4446 24.2966 87.8968 24.2848 87.6477 24.1748C86.7734 23.2466 87.4561 24.5719 86.7995 24.1722L86.7884 24.0747C86.3703 23.8652 86.7835 24.7272 86.5003 24.8383C86.5003 24.8383 86.4309 24.7474 86.3658 24.6955C86.653 25.3149 86.5025 25.7271 86.4189 26.0329C86.1539 25.6086 86.3468 25.7448 85.9738 25.4117C85.9309 25.5549 86.5335 26.0002 86.4454 26.267C86.2114 26.1158 85.9083 26.0513 85.5481 25.6575L85.7056 25.4816C85.1614 25.0297 85.4941 25.7032 85.3145 25.684L85.13 25.4481C84.9295 25.7672 85.4286 26.3428 85.1176 26.5559L85.291 26.6943C85.6476 27.4046 84.8729 26.4849 85.095 27.0524L84.5419 26.5224C84.5684 26.7565 84.6804 27.3957 84.5945 27.6821C84.3184 27.1602 84.3499 26.7417 84.2494 26.3778C84.1415 26.469 83.9344 26.7296 84.1299 27.063C84.1189 26.9655 84.0384 26.7771 84.164 26.8418C84.4445 27.4027 84.4671 27.7755 84.2706 27.9559C83.3114 26.8002 83.4835 28.1439 82.5707 27.3979C82.5746 28.1284 81.6976 27.8723 81.333 28.3088C82.2653 29.0526 81.2295 28.439 82.0582 29.3131C82.0153 29.4563 81.9591 29.4824 81.894 29.4305L81.1144 29.1633C80.8153 28.9602 81.0228 28.8774 80.845 28.7C80.564 28.8306 80.4158 28.393 80.0693 28.294C80.3795 28.5947 80.4038 28.8093 80.168 28.8163L80.7096 29.0709C80.8325 29.8077 79.7843 28.5634 79.9073 29.3002L79.7485 28.9429C79.7427 29.2399 79.1741 29.4426 79.6653 30.2957C79.5374 30.2115 79.2967 30.0017 79.3029 29.8824C78.8361 30.1132 79.1768 31.3785 78.4861 31.2L78.321 30.9618C78.3148 31.0811 78.5776 31.4859 78.2852 31.3413C78.2157 31.2504 78.1201 31.1032 78.0812 31.1076C78.0945 31.2246 78.2427 31.6622 78.0392 31.6063L77.8847 31.2879C77.2595 31.3391 77.8701 32.3762 77.7219 32.8079C77.136 32.1631 76.6688 32.2161 76.4351 32.2426L76.3657 32.1517C75.8882 32.4626 76.1435 33.3227 75.9957 33.9322C75.1139 33.4593 74.9236 34.3896 74.19 34.3543C74.3546 34.4147 74.6413 34.8563 74.6351 34.9755C74.4338 34.9391 74.7904 35.6494 74.2696 35.0565L74.3085 35.0521C73.7165 34.5265 73.674 34.8474 73.5099 34.9648L74.1891 35.7374C72.7829 34.988 73.5908 37.0696 72.455 36.2699C72.5444 36.5363 72.4191 36.6493 72.528 36.9136L72.1461 36.5025C71.8067 36.6397 71.6165 36.7008 71.4032 37.0806L71.1859 36.7299C70.9851 36.8712 72.0722 38.1111 71.9341 38.2848L71.3182 37.7225C71.016 38.0136 70.2213 37.7876 70.4333 38.6131C70.3638 38.5222 70.2054 38.3426 70.216 38.2624C70.0518 38.3798 69.2815 38.3683 70.1209 39.1622C69.6067 38.6278 69.7536 39.4014 69.8195 39.8088L69.4766 39.3933C69.8244 40.0256 69.9394 40.1706 69.8969 40.4915C69.7996 40.5026 69.55 40.2148 69.7124 40.2556C69.3704 40.1956 69.9452 40.7429 69.5664 40.7068L69.3925 40.3907C69.2089 40.5103 69.3412 40.6336 69.5412 41.006C69.5894 41.2574 69.1478 41.1889 68.7943 40.8536C68.9788 41.0896 69.1788 41.462 68.9797 41.4451C68.8474 41.3218 68.7952 41.2092 68.769 41.1529C68.254 41.1322 68.823 41.9765 68.2664 41.763C68.1341 41.6397 68.069 41.5879 68.0062 41.5555C68.2221 41.3729 68.4036 41.2338 68.4275 41.2706C68.0717 40.9158 67.8447 41.0008 67.4969 40.3686C67.6213 40.7693 67.9695 41.5794 67.6341 41.5779C67.5907 41.5433 67.5496 41.5282 67.4845 41.4763L67.4779 41.4178C67.4779 41.4178 67.3872 41.4874 67.4177 41.5827C67.3182 41.5742 67.2381 41.5635 67.1841 41.6092C66.8761 41.328 66.8336 41.6489 66.7407 41.699C67.1398 42.0884 66.9668 42.1277 67.3872 42.3567C67.3482 42.3611 67.3611 42.3004 67.3911 42.2179C67.3889 42.1984 67.3867 42.1789 67.3823 42.1399L67.3867 42.1789C67.3867 42.1789 67.5075 42.0269 67.5982 41.9574C67.7266 42.2194 67.8137 42.4663 67.5212 42.3217C67.7124 42.6161 67.9252 42.9279 68.0208 43.0751C67.3792 42.6342 66.877 42.5528 66.5062 42.2392C66.4597 42.6989 66.0557 42.9621 66.6119 43.8671C66.6296 44.0231 66.3217 43.7419 66.1721 43.6403C66.1588 43.5233 66.1955 43.4994 66.1217 43.3695C66.1593 43.7011 65.7637 43.8645 66.2389 44.4033C65.8385 44.3499 65.8783 43.8317 65.7168 44.1464L65.5973 43.9624C64.296 43.616 66.0915 46.0598 64.5128 45.5276C64.6145 45.5556 64.6557 45.5706 64.7619 45.6376C63.6911 45.7591 63.9264 47.3129 62.591 47.1877C62.2795 47.2231 62.5747 47.565 62.7118 47.905L62.2543 47.5223L62.5654 48.1785C62.6729 48.7787 61.099 47.594 61.4477 48.5818L61.7707 48.8218C61.5999 48.8807 61.5751 49.3576 61.2605 49.0179C61.3061 49.072 61.5144 49.3448 61.326 49.2476L61.1047 49.0356L61.1799 49.6988C60.81 49.7407 60.3662 48.7835 60.0034 49.0617C59.9671 49.2634 60.3109 50.0344 60.4994 50.1316C60.5534 50.086 60.7569 50.1419 60.9781 50.3539L61.0025 50.5685C61.61 51.2306 62.1874 51.9751 62.8998 52.1709L62.6949 51.5817L63.0591 51.8367L62.921 52.0104C63.3002 52.2243 63.1047 51.8908 62.9808 51.6678C63.1564 51.8257 63.3038 51.9078 63.4055 51.9357L62.9795 51.1345C63.2613 51.3594 63.4007 51.719 63.6582 51.7293C63.4582 51.3568 63.0122 51.2494 62.9551 50.92C63.3343 51.1338 63.5405 51.387 63.4011 51.0274C63.5768 51.1853 63.6702 51.313 63.7029 51.4279C63.5918 51.1441 63.8622 51.0937 63.5627 50.7128C64.0069 50.9785 63.7737 50.3135 64.3768 50.9366C64.2573 50.7525 64.068 50.2998 64.1131 50.1762C64.6865 51.0595 64.4759 49.898 65.2202 50.7224C64.6795 49.9539 65.3374 50.0176 65.1737 49.4435C65.2193 49.4976 65.2932 49.6275 65.2521 49.6124C65.4228 49.5535 65.6591 49.7243 65.841 49.7629C65.3246 49.209 65.3693 48.9076 65.141 48.4593C65.7954 48.8395 65.6968 49.1866 66.2432 49.658C65.7985 49.2146 66.0468 48.9691 65.637 48.6599C66.0768 48.8866 65.8817 48.731 66.3804 49.1288C65.7295 48.4321 66.356 48.9142 66.041 48.3968C66.5348 48.5779 66.7198 48.9915 66.6777 48.6209C66.968 48.7461 67.0534 49.1513 67.0534 49.1513L67.1335 49.162ZM70.0743 43.9683C70.0743 43.9683 70.0247 44.053 70.0075 44.0747C70.0053 44.0552 70.0398 44.0118 70.0548 43.9705L70.0743 43.9683ZM70.411 43.6338C70.411 43.6338 70.3008 43.7056 70.2491 43.7707C70.0973 43.6496 69.9801 43.4851 70.0168 43.4612C70.0885 43.5716 70.2464 43.5734 70.411 43.6338ZM67.0239 41.5878C67.0106 41.4708 67.1168 41.5378 67.2036 41.607C67.1885 41.6482 67.1735 41.6894 67.1606 41.7501L67.2062 41.8042C67.2062 41.8042 67.0695 41.6419 67.0434 41.5856L67.0239 41.5878Z" fill=""/>
<path d="M67.4319 42.2132C67.4319 42.2132 67.4363 42.252 67.4385 42.2714C67.4794 42.2864 67.5225 42.3208 67.5635 42.3358L67.4684 42.1895L67.4728 42.2283L67.4319 42.2132Z" fill=""/>
<path d="M100.746 13.6016C100.746 13.6016 100.787 13.6166 100.811 13.6532C100.809 13.6338 100.768 13.6188 100.765 13.5994L100.746 13.6016Z" fill=""/>
<path d="M75.951 39.8036L75.8633 39.7163L75.9148 39.8271L75.951 39.8036Z" fill=""/>
<path d="M104.016 13.3887C104.016 13.3887 104.082 13.4589 104.123 13.4738C104.099 13.4375 104.058 13.4227 104.016 13.3887Z" fill=""/>
<path d="M104.988 12.7646L105.231 12.8162C105.107 12.7709 105.027 12.7602 104.988 12.7646Z" fill=""/>
<path d="M105.84 12.4313C105.84 12.4313 105.745 12.2841 105.699 12.23L105.84 12.4313Z" fill=""/>
<path d="M97.8125 18.1816C97.8258 18.2985 97.8757 18.3915 97.8845 18.4694C97.9623 18.4605 98.0184 18.4345 97.8125 18.1816Z" fill=""/>
<path d="M92.358 25.379L92.3392 25.3812L92.3225 25.4022L92.358 25.379Z" fill=""/>
<path d="M97.7219 18.5867C97.8447 18.6318 97.8768 18.5692 97.8852 18.47C97.8077 18.4788 97.7303 18.4875 97.7219 18.5867Z" fill=""/>
<path d="M108.981 10.2368L109.02 10.2324C109.02 10.2324 108.975 10.1786 108.973 10.1592L108.981 10.2368Z" fill=""/>
<path d="M108.974 10.1591L108.966 10.0815C108.966 10.0815 108.948 10.1031 108.974 10.1591Z" fill=""/>
<path d="M108.965 9.90381L108.985 10.0784C108.985 10.0784 109.041 10.0524 108.965 9.90381Z" fill=""/>
<path d="M107.918 10.7729L108.035 10.9365C108.035 10.9365 107.985 10.844 107.918 10.7729Z" fill=""/>
<path d="M107.672 11.0377C107.672 11.0377 108.109 11.2446 108.108 11.0671L108.015 10.9396C108.163 11.199 107.518 10.7198 107.652 11.0399L107.672 11.0377Z" fill=""/>
<path d="M104.974 10.0193L105.305 9.98179C105.129 9.82415 104.893 9.65364 104.977 9.52577C104.279 9.26964 105.328 9.84105 104.974 10.0193Z" fill=""/>
<path d="M104.045 10.3619C104.103 10.1778 103.841 10.1286 103.789 10.0161C103.813 10.2303 103.839 10.2866 104.045 10.3619Z" fill=""/>
<path d="M98.8646 14.5844L98.5633 14.1846C98.5183 14.3081 98.6782 14.3294 98.8646 14.5844Z" fill=""/>
<path d="M99.5226 17.4144L99.8168 17.5783L99.5738 17.1718L99.5226 17.4144Z" fill=""/>
<path d="M96.6609 15.1313L96.6715 15.0512L96.6225 15.3132L96.6609 15.1313Z" fill=""/>
<path d="M88.1976 22.5717L88.6221 23.0167C88.6067 22.8803 88.1711 22.338 88.1976 22.5717Z" fill=""/>
<path d="M84.9662 26.257C84.7281 26.067 84.4838 25.9961 84.6357 26.2944C84.7501 26.2617 84.9772 26.3543 84.9662 26.257Z" fill=""/>
<path d="M73.5104 35.3198L73.4256 35.0928L73.4154 35.3503L73.5104 35.3198Z" fill=""/>
<path d="M161.083 77.5474C161.082 77.8835 161.165 78.4469 161.422 78.971C161.312 78.3512 161.416 78.5765 161.293 77.8397C161.36 77.7333 161.525 77.9714 161.591 78.2011C161.571 78.0255 161.777 78.2787 161.674 77.8952C161.39 77.4731 161.234 77.4908 161.227 77.946C161.153 77.8161 161.116 77.6623 161.083 77.5474Z" fill=""/>
<path d="M152.227 79.46L152.31 79.5088C152.31 79.5088 152.265 79.4556 152.227 79.46Z" fill=""/>
<path d="M146.787 80.6885C146.787 80.6885 146.815 80.5871 146.808 80.5289C146.774 80.5721 146.761 80.6325 146.787 80.6885Z" fill=""/>
<path d="M145.694 80.2604C145.694 80.2604 145.735 80.2754 145.756 80.2926C145.711 80.2388 145.689 80.2216 145.694 80.2604Z" fill=""/>
<path d="M152.225 79.459L152.031 79.3042C152.075 79.5154 152.143 79.429 152.225 79.459Z" fill=""/>
<path d="M160.43 79.4575C160.43 79.4575 160.458 79.3562 160.449 79.2786C160.453 79.3174 160.417 79.3412 160.399 79.3627L160.41 79.4597L160.43 79.4575Z" fill=""/>
<path d="M156.152 77.5532C156.152 77.5532 156.27 78.0733 156.336 78.3029C156.29 78.071 156.298 77.9713 156.292 77.9128C156.261 77.8175 156.209 77.7049 156.152 77.5532Z" fill=""/>
<path d="M159.282 77.4941L159.312 77.4121C159.312 77.4121 159.299 77.4725 159.282 77.4941Z" fill=""/>
<path d="M153.088 78.5327C153.088 78.5327 153.032 78.381 153.008 78.3442C153.014 78.4028 153.062 78.4764 153.088 78.5327Z" fill=""/>
<path d="M101.539 91.0154C101.539 91.0154 101.532 90.9578 101.528 90.9194C101.535 90.977 101.52 91.0176 101.539 91.0154Z" fill=""/>
<path d="M99.2993 88.3262L99.3337 88.2828L99.3395 87.9863L99.2993 88.3262Z" fill=""/>
<path d="M128.455 83.6973C128.724 84.1606 128.275 84.3697 128.626 84.8632C128.563 84.6531 128.724 83.9829 128.455 83.6973Z" fill=""/>
<path d="M160.366 79.4068C160.366 79.4068 160.33 79.4304 160.291 79.4347C160.33 79.4304 160.349 79.4282 160.366 79.4068Z" fill=""/>
<path d="M128.625 84.8633L128.67 84.9171C128.668 84.8977 128.647 84.8805 128.625 84.8633Z" fill=""/>
<path d="M140.07 81.293C140.07 81.293 140.129 81.4641 140.175 81.5182C140.168 81.4597 140.142 81.4034 140.07 81.293Z" fill=""/>
<path d="M143.134 81.3399L143.051 81.291C143.051 81.291 143.115 81.3421 143.134 81.3399Z" fill=""/>
<path d="M138.736 82.3916C138.736 82.3916 138.665 82.2829 138.616 82.3662C138.618 82.3854 138.621 82.4046 138.642 82.4216C138.633 82.3449 138.667 82.3021 138.734 82.3724L138.736 82.3916Z" fill=""/>
<path d="M137.182 82.747C137.182 82.747 137.209 82.8216 137.231 82.8386L137.265 82.7959L137.16 82.73L137.182 82.747Z" fill=""/>
<path d="M106.522 90.6286C106.485 90.475 106.446 90.3019 106.426 90.1267C106.47 90.5162 106.231 90.6617 106.522 90.6286Z" fill=""/>
<path d="M160.336 79.1531C160.371 79.2874 160.38 79.3654 160.362 79.3871C160.362 79.3871 160.399 79.3632 160.397 79.3437C160.388 79.2657 160.34 79.1921 160.316 79.1553L160.336 79.1531Z" fill=""/>
<path d="M139.634 86.657L139.355 86.6294C139.355 86.6294 139.537 86.668 139.634 86.657Z" fill=""/>
<path d="M118.265 89.6731L118.214 89.7379C118.214 89.7379 118.252 89.7335 118.265 89.6731Z" fill=""/>
<path d="M138.635 86.8883C138.554 86.7001 138.466 86.6116 138.418 86.5381C138.422 86.577 138.427 86.616 138.433 86.6744L138.652 86.8666L138.635 86.8883Z" fill=""/>
<path d="M104.747 91.5023C105.004 91.5127 104.842 90.7803 104.874 90.3618C105.165 90.1509 105.033 90.8969 105.133 91.2609C105.308 91.0633 105.43 90.3975 105.571 90.4211C105.584 90.5381 105.608 90.5749 105.606 90.7332C105.775 90.141 106.19 90.6669 106.385 89.9533C106.392 90.0118 106.398 90.0704 106.405 90.1289C106.363 89.7583 106.323 89.4072 106.331 89.1297C106.448 89.1164 106.516 88.6741 106.569 89.1422C106.511 89.1488 106.511 89.3266 106.468 89.4697L106.583 89.2592C106.718 89.9353 106.432 89.4937 106.45 90.0052C106.662 89.7837 106.911 89.2022 107.089 89.3796C107.164 90.0428 106.702 89.621 106.946 90.2058L106.662 89.9614C106.918 90.9993 106.498 89.9011 106.743 91.0192C107.098 91.1962 107.116 90.6607 107.491 90.8355C107.546 90.4539 107.429 90.2894 107.504 89.9055C107.978 89.2195 107.986 91.5499 108.298 90.6453C108.366 90.2029 108.368 89.3531 108.652 89.7752L108.6 90.5319C108.942 90.5919 108.732 89.4304 109.122 89.9195C109.078 90.2209 108.876 90.1845 108.926 90.2776C109.19 90.8602 109.075 89.8459 109.25 89.8261L109.325 90.4892C109.686 90.3693 110.061 89.8526 110.459 89.7087C110.442 89.9081 110.386 90.112 110.508 90.3156C111.001 89.9634 111.594 90.3307 112.128 90.6851L112.278 90.0951C112.278 90.0951 112.384 90.3399 112.32 90.4658C112.519 90.6605 112.297 90.0929 112.37 89.8673C112.483 89.8151 112.544 90.1835 112.486 90.3679C112.783 89.86 113.364 89.241 113.766 89.8276L113.708 90.012C114.007 90.2152 113.925 88.8019 114.221 89.3216L114.174 89.4257C114.789 89.6326 115.413 89.0481 115.938 89.8578C115.943 89.0275 116.564 90.1622 116.492 89.0048C116.887 89.5329 116.814 89.7585 117.326 90.0956C117.469 90.1387 117.439 89.3518 117.601 89.2149L117.669 89.8196L117.813 89.1711L118.011 89.8796L118.149 89.7059C118.149 89.7059 118.002 89.446 117.982 89.2705C118.184 88.9709 118.595 89.6356 118.63 89.9477L119.118 89.3787C119.144 89.6128 119.058 89.7214 118.996 89.8667C119.219 89.2289 119.127 90.5038 119.336 89.9072C119.281 89.7751 119.315 89.5539 119.3 89.4174C119.478 89.7725 119.79 89.7372 119.986 89.5569L119.994 89.9709C120.413 90.0221 120.826 89.6592 121.293 89.6062C121.096 89.431 121.053 88.7049 121.183 88.6309L121.314 89.268C121.348 88.869 121.151 89.0494 121.271 88.5419C121.455 88.6 121.47 89.2503 121.397 89.4759L121.587 89.2371C121.609 89.4321 121.581 89.5341 121.607 89.7682C121.641 89.3692 122.048 90.3504 122.087 89.6544L122.11 89.8495C122.577 89.7965 122.767 89.5577 123.132 89.4767C123.07 88.9305 123.22 89.0321 123.286 88.5702C123.578 88.7149 123.936 89.0892 124.26 88.9931C124.463 88.6935 124.266 88.5184 124.325 88.1757C124.422 88.6785 124.727 88.5846 124.611 88.9534C124.989 88.8117 125.104 88.7789 125.542 88.2946C125.461 88.1062 125.392 88.0153 125.391 87.8375C125.48 87.7485 125.628 88.0083 125.656 88.2619L125.663 88.3204C126.083 87.5023 127.168 89.592 127.455 88.4728L127.462 88.5313L127.806 87.9193C128.029 87.973 127.734 88.3226 127.942 88.5954C128.312 87.6841 128.749 88.5829 129.072 87.9535C129.647 89.3701 130.184 87.6694 130.772 88.5115L130.694 88.1648C130.751 87.8027 130.871 88.3422 130.958 88.4114C130.908 88.1405 130.787 88.1148 130.825 87.9326C131.687 87.3607 132.853 88.078 133.872 88.1995C134.249 88.216 133.725 86.3788 134.322 87.1211L134.317 87.7737C134.886 86.8793 135.766 87.5105 136.327 86.716C136.325 86.8742 136.367 87.0671 136.289 87.0759C136.534 87.5025 136.829 86.9751 136.748 86.6089C136.87 86.6347 136.847 86.9534 136.945 87.1201C137.148 87.3538 137.185 86.4606 137.372 86.8938C137.401 86.9696 137.371 87.052 137.336 87.0954C137.387 86.8525 137.784 87.0447 137.59 86.553C137.909 86.7539 138.044 86.2052 138.31 86.4713C138.32 85.8578 138.826 86.6697 138.67 85.818C138.848 86.687 139.291 86.4194 139.359 85.977C139.37 86.2523 139.563 86.2107 139.585 86.5836C139.775 86.5225 139.911 86.3292 139.763 85.8916C140.345 86.853 140.26 84.8869 140.761 86.1736C141.206 85.57 141.65 85.1442 142.087 84.8182C142.283 85.6849 141.559 85.036 141.799 85.9373C142.181 85.4791 142.285 84.6573 142.79 84.7582C142.937 84.8402 142.814 85.1505 142.813 85.3088C143.195 84.8506 143.741 85.1443 144.031 84.5779C144.04 84.6559 144.032 84.7556 144.002 84.8381C144.075 84.7902 144.227 84.9113 144.124 84.5278L144.079 84.6515C143.801 84.1101 144.093 83.3854 144.038 83.0755C144.169 84.2264 144.513 83.2588 144.659 84.724C144.689 84.6415 144.706 84.4421 144.636 84.1734C144.74 84.2209 144.797 84.3725 144.793 84.689C145.037 84.4045 144.815 84.0148 145.083 83.9449C145.125 84.1377 145.114 84.2179 145.141 84.452C145.175 84.0531 145.228 83.6519 145.494 83.7403C145.507 83.8573 145.583 84.0067 145.525 84.0133C145.901 83.8521 145.927 82.8614 146.447 83.0988C146.544 83.957 146.67 83.3303 146.869 84.0387L147.035 83.7631L146.841 83.4492C147.034 83.4076 147.069 82.8504 147.306 83.0211L147.244 83.3443L147.572 83.1095L147.292 82.9041C147.382 82.479 147.035 82.0245 147.345 82.1474C147.314 82.2299 147.537 82.1059 147.759 82.4956C147.791 82.2549 147.818 81.9752 148.03 82.1092C148.133 82.3149 148.218 82.8979 148.295 83.0473C148.224 82.4231 148.714 82.7429 148.66 82.097C148.678 82.2531 148.759 82.6193 148.807 82.6929L148.749 82.1857C148.881 82.309 148.929 82.3826 148.984 82.6925C149.28 82.6984 148.649 81.8218 149.076 82.1092C149.061 82.1504 149.089 82.2262 149.059 82.3087C149.446 82.4228 149.596 81.8328 149.967 81.9686C150.261 82.6465 149.757 82.2097 150.021 82.7923C150.427 82.5487 150.665 81.6919 151.141 81.7169L151.037 81.6694C150.803 80.6489 151.497 82.0717 151.573 81.5296C151.543 81.612 151.679 82.1103 151.646 81.9955C151.99 82.075 152.149 81.5631 152.494 81.1288L152.525 81.4019C152.761 81.5727 152.999 81.4074 153.222 81.4612C153.191 81.1881 153.31 81.1943 153.151 80.837C154.163 82.1052 153.973 79.7362 154.861 80.7814C154.802 80.7881 154.792 81.0461 154.831 81.0417L155.183 80.6659C155.017 80.25 155.037 80.4256 154.844 80.1116C154.813 79.8385 154.864 79.5957 154.979 79.5629C154.88 79.91 155.214 80.2474 155.357 80.4683C155.303 80.3361 155.285 80.1801 155.231 80.048C155.704 80.745 154.993 79.1661 155.455 79.5879L155.52 79.8176C155.602 79.67 155.604 79.334 155.744 79.3575C155.957 79.847 155.697 79.6395 155.822 80.0402C155.99 79.9619 155.841 78.991 156.166 79.4282C156.145 79.5887 156.03 79.6214 156.009 79.7819C156.365 80.3144 156.348 80.1584 156.491 80.2015L156.863 80.3568L156.731 80.2335C156.515 78.8552 157.083 79.8577 157.093 78.9082C157.096 79.797 157.207 79.3892 157.371 79.9634C157.503 80.0867 157.676 80.225 157.696 80.4006C157.68 79.9085 158.043 80.6774 158.02 79.949C158.098 80.1179 158.176 79.9314 158.307 80.3907C158.442 80.1974 158.154 80.0918 158.089 79.8622C158.148 79.164 158.977 80.3936 159.081 79.394C159.305 78.934 159.134 78.3014 159.343 77.8825C159.55 78.1358 159.481 78.5781 159.481 78.5781C159.742 78.7857 159.85 78.6944 159.938 78.4276C159.957 78.6032 160.049 78.7114 160.168 78.8954C160.276 78.8041 160.011 78.202 160.29 78.4074C160.315 78.6219 160.411 78.9469 160.418 79.1832C160.51 78.9554 160.546 78.5759 160.638 78.3481C160.791 78.647 160.696 78.8553 160.723 79.0894C160.856 78.8766 161.085 78.6334 160.95 78.135L160.776 77.9967C160.776 77.9967 160.961 78.4103 160.953 78.5101C160.943 78.9458 160.667 78.4239 160.606 78.2333L160.668 78.0879C160.179 77.0766 160.29 78.4074 160.037 78.4361L159.847 77.6279L159.849 78.3389C159.729 78.1549 159.544 77.7412 159.604 77.5763C159.312 77.2539 159.562 77.8973 159.265 77.5358C159.219 77.4817 159.215 77.4427 159.23 77.4015L159.163 77.6856C159.143 77.5101 158.946 77.1571 159.071 77.2219C158.638 76.876 158.82 77.9617 158.522 77.4225L158.515 77.364C158.224 77.7526 158.679 77.9381 158.629 78.7143L157.946 77.389L158.11 77.9631C158.11 77.9631 157.969 77.9396 157.904 77.7099C157.894 78.1457 158.011 77.9547 158.055 78.3448C157.688 77.8924 157.61 78.7706 157.253 77.8825C157.323 78.3289 157.559 78.1442 157.445 78.5325C157.062 77.5881 157.255 78.7713 156.936 78.3926C156.818 77.8726 157.078 78.0801 156.759 77.7014C156.939 78.5899 156.357 77.6285 156.262 77.8368C156.478 78.5236 156.029 78.2189 155.848 78.5357C155.783 78.3061 155.253 78.3267 154.936 78.1452L154.923 78.0282C155.08 78.7216 154.799 78.6745 154.665 78.8872C154.539 78.4669 154.521 78.3108 154.555 78.0896L154.384 78.1485C154.411 78.3826 154.407 78.5214 154.321 78.6299L154.203 78.1099C153.997 78.2122 153.953 78.8691 153.57 78.6163C153.703 79.0951 154.226 79.8853 154.015 80.2846C153.928 80.0376 153.778 79.5805 153.823 79.4569C153.827 79.4959 153.791 79.6976 153.722 79.6067L153.707 79.1341C153.512 78.9784 153.752 79.5242 153.633 79.518C153.513 79.1562 153.468 79.2798 153.393 78.9722C153.408 78.9309 153.526 79.0955 153.53 78.9567C153.389 78.9332 153.192 78.758 153.042 78.4786C153.124 78.6866 153.196 78.9747 153.125 79.0421C152.92 79.1444 152.919 78.6111 152.726 78.475C152.757 78.748 152.533 78.5165 152.695 79.0712C152.636 79.0778 152.53 78.833 152.473 78.6814C152.426 78.9633 151.967 78.9166 152.265 79.4557L152.308 79.4903C152.308 79.4903 152.308 79.4903 152.311 79.5099C152.111 80.1845 151.434 79.4314 151.138 79.7811L151.077 79.5904C150.911 79.8661 150.615 79.8602 150.588 80.3176C150.53 80.3243 150.338 80.0298 150.292 79.798C150.157 79.9912 150.2 80.2035 149.877 79.9636C149.954 79.5992 149.73 79.7037 149.983 79.675C149.716 79.5867 149.584 79.2857 149.492 79.869C149.434 79.3618 149.153 79.3147 149.093 79.4796L149.345 79.7869C149.239 79.8977 149.137 79.8697 149.018 79.8635L148.887 79.2264C148.223 78.5904 148.449 80.7578 147.743 79.5734C147.757 80.046 148.066 79.8134 148.108 80.3618C147.868 80.3297 147.399 79.4939 147.342 79.52C146.957 79.2477 147.336 80.5086 146.964 80.3533C147.066 80.559 147.271 81.1482 147.085 81.4261C146.845 81.3941 146.572 80.5557 146.646 80.3301C146.682 80.3062 146.728 80.3603 146.756 80.4361C146.803 80.3319 146.868 80.2061 146.705 79.9874L146.732 80.2215C146.571 80.0224 146.288 80.1335 146.263 79.7412C146.175 80.008 146.307 80.1313 146.455 80.2134C146.091 79.9584 146.033 80.3205 145.702 80.1803C145.773 80.2907 145.882 80.5549 145.843 80.5593C145.369 80.3761 145.78 81.0407 145.522 81.2082C145.271 80.9009 145.369 80.3761 145.153 80.7364C144.915 80.5461 144.968 80.1449 144.985 79.9454C144.843 80.4357 144.435 79.7905 144.27 79.7301L144.346 79.524C144.3 79.6477 144.225 79.676 144.166 79.6827L144.353 80.1158C144.353 80.1158 144.191 80.075 144.15 79.8821C144.146 80.1986 144.411 80.623 144.362 81.0631C144.202 80.864 144.103 81.3889 143.918 80.7974C144.286 80.9137 143.733 80.206 143.97 80.0407C143.94 80.1232 143.862 80.132 143.776 80.0628C143.75 80.0065 143.76 79.9263 143.758 79.9068C143.311 79.4438 143.799 80.6134 143.472 80.6899C143.432 80.3388 143.224 80.0661 143.194 80.1486C143.33 80.1331 143.394 80.6988 143.347 80.9807C143.068 80.7753 143.179 81.2368 143.06 81.2306L143.21 81.3322C143.249 81.6833 143.128 81.6575 143.027 81.8073C142.938 81.5408 143.122 81.599 143.03 81.4908C143.023 82.1238 142.519 80.9759 142.392 81.4249C142.231 81.2258 142.222 80.7922 142.089 80.6689C141.95 81.1787 141.71 80.2773 141.52 80.694C141.707 81.1271 141.694 81.0101 141.613 81.5132L141.961 81.0984L141.845 81.8227C141.982 81.8073 142.061 81.4624 142.148 81.5316C142.114 81.9306 142.101 81.8135 142.24 82.1731C141.892 81.5408 141.98 82.6571 141.656 82.2393L141.389 81.104C140.947 80.68 140.978 81.8223 140.501 81.6195L140.677 81.7774C140.73 82.2456 140.435 81.9037 140.36 82.1098C140.276 81.7241 140.166 81.6181 140.061 81.3928C140.134 81.681 139.75 81.4281 139.897 82.2018L139.608 81.7406C139.238 81.6048 139.483 82.9006 139.143 82.8601C139.153 82.4244 138.949 82.1907 139.089 81.8587C138.992 81.8698 138.868 81.8245 138.938 82.0932C138.814 81.8701 138.766 82.6658 138.59 82.3302C138.591 82.5079 138.657 82.9154 138.538 82.9091C138.509 82.8333 138.496 82.7162 138.496 82.7162C138.538 82.9091 138.371 83.007 138.573 83.3989C137.973 82.2816 137.678 83.6783 137.176 82.7276C136.98 82.908 136.722 83.0754 136.515 83.1582C136.502 83.0412 136.493 82.9631 136.517 82.9999C136.148 82.7059 136.565 84.1206 136.155 83.8115C135.853 83.2333 136.252 83.4449 136.089 83.2263C135.772 81.9978 135.724 83.485 135.35 82.7964L135.38 82.714C135.119 82.3286 135.07 83.2826 134.769 83.2377C134.769 83.2377 134.756 83.1206 134.747 83.0426C134.686 83.7213 134.362 83.9951 134.133 84.2383C134.114 83.7268 134.199 83.9542 134.047 83.4776C133.939 83.5689 134.235 84.2663 134.019 84.4488C133.891 84.1868 133.672 83.9943 133.534 83.4765L133.763 83.411C133.511 82.7482 133.476 83.4831 133.328 83.401L133.293 83.0889C132.956 83.2457 133.103 84.0193 132.709 84.0245L132.794 84.2519C132.726 85.0498 132.553 83.8644 132.444 84.4694L132.241 83.7219C132.146 83.9303 131.901 84.5508 131.685 84.7333C131.716 84.1371 131.953 83.7941 132.049 83.4275C131.913 83.443 131.613 83.5758 131.616 83.9509C131.665 83.8662 131.682 83.6667 131.754 83.7771C131.708 84.4146 131.549 84.7488 131.276 84.7797C131.047 83.2843 130.52 84.5493 130.117 83.4293C129.755 84.0631 129.143 83.362 128.611 83.5408C128.995 84.663 128.46 83.5975 128.692 84.7763C128.584 84.8676 128.524 84.8547 128.498 84.7984L127.992 84.1642C127.835 83.8264 128.078 83.8779 128.01 83.6287C127.709 83.5838 127.816 83.1371 127.569 82.8688C127.676 83.2913 127.581 83.4996 127.388 83.3634L127.703 83.8808C127.409 84.586 127.203 82.9497 126.926 83.6331L126.979 83.232C126.811 83.4881 126.244 83.3549 126.196 84.3283C126.142 84.1962 126.046 83.8712 126.134 83.7822C125.632 83.7008 125.222 84.9525 124.747 84.4137L124.714 84.1211C124.714 84.1211 124.659 84.6805 124.509 84.4012C124.495 84.2841 124.495 84.1064 124.473 84.0891C124.445 84.191 124.319 84.64 124.163 84.4799L124.222 84.1373C123.694 83.8219 123.614 85.036 123.249 85.2947C123.133 84.4387 122.732 84.2076 122.522 84.0931L122.508 83.9761C121.952 83.9404 121.675 84.8015 121.209 85.2101C120.772 84.3113 120.096 84.9609 119.53 84.4916C119.626 84.6388 119.605 85.1548 119.519 85.2634C119.382 85.1011 119.256 85.9056 119.185 85.1037L119.224 85.0992C119.041 84.3496 118.831 84.5906 118.634 84.5932L118.713 85.6314C118.056 84.1847 117.449 86.3082 117.043 84.991C116.955 85.2578 116.799 85.2755 116.711 85.5423L116.649 84.9961C116.322 84.8949 116.138 84.8368 115.742 85.0002L115.795 84.599C115.557 84.5865 115.644 86.2165 115.434 86.2798L115.302 85.465C114.893 85.5114 114.422 84.8338 114.076 85.6041C114.062 85.487 114.055 85.2508 114.129 85.2029C113.932 85.2055 113.342 84.6994 113.509 85.8263C113.425 85.0851 113.091 85.7947 112.893 86.1333L112.89 85.5805C112.753 86.2875 112.775 86.4825 112.522 86.689C112.455 86.6176 112.435 86.2643 112.528 86.392C112.3 86.1215 112.41 86.919 112.144 86.6529L112.201 86.2908C111.98 86.2566 112.022 86.4494 111.932 86.8745C111.82 87.1045 111.525 86.7626 111.45 86.2771C111.445 86.5742 111.355 86.9992 111.22 86.8564C111.198 86.6614 111.226 86.5594 111.239 86.4987C110.864 86.1461 110.762 87.1652 110.467 86.6455C110.447 86.47 110.436 86.3724 110.41 86.3161C110.684 86.3047 110.925 86.3368 110.91 86.378C110.872 85.8686 110.646 85.7954 110.764 85.0906C110.611 85.4833 110.351 86.3228 110.108 86.0935C110.102 86.035 110.097 85.996 110.069 85.9201L110.062 85.8616C110.062 85.8616 109.984 85.8704 109.954 85.9529C109.887 85.8815 109.82 85.8101 109.761 85.8167C109.715 85.4071 109.482 85.6113 109.38 85.5834C109.422 86.1317 109.275 86.0497 109.426 86.5068C109.421 86.4677 109.438 86.446 109.514 86.4177C109.514 86.4177 109.551 86.3938 109.566 86.3526L109.57 86.3916C109.57 86.3916 109.726 86.3739 109.841 86.3412C109.774 86.6253 109.684 86.8726 109.551 86.5715C109.513 86.9315 109.475 87.2914 109.437 87.4736C109.231 86.7066 108.91 86.3084 108.837 85.8425C108.501 86.177 108.037 86.0912 107.86 87.1386C107.776 87.2667 107.73 86.8571 107.691 86.6838C107.738 86.5796 107.818 86.5903 107.839 86.4298C107.654 86.7077 107.264 86.5741 107.246 87.2873C106.975 86.9822 107.349 86.6238 107.026 86.7393L107.06 86.5181C106.341 85.3945 106.052 88.4105 105.235 86.9424C105.285 87.0355 105.309 87.0723 105.322 87.1894C104.442 86.5582 103.587 87.8801 102.721 86.8522C102.48 86.6424 102.453 87.0999 102.318 87.4709L102.251 86.8857L102.013 87.5647C101.657 88.0792 101.375 86.1158 100.951 87.0726L100.998 87.4823C100.85 87.4002 100.511 87.7152 100.538 87.2577C100.528 87.338 100.487 87.6784 100.424 87.4683L100.389 87.1562L100.016 87.6924C99.7144 87.4697 100.054 86.4631 99.6145 86.4142C99.4503 86.5316 99.145 87.317 99.2082 87.5271C99.2689 87.54 99.3883 87.724 99.3826 88.021L99.2228 88.1774C99.1883 89.0902 99.0781 90.0312 99.4648 90.6591L99.7361 90.0949L99.8259 90.5391L99.6117 90.5634C99.7383 90.9837 99.8153 90.6193 99.9033 90.3525C99.9299 90.5866 99.9498 90.7621 100.017 90.8335L100.272 89.955C100.312 90.3062 100.155 90.6598 100.335 90.8567C100.447 90.449 100.206 90.0614 100.41 89.7813C100.537 90.2016 100.497 90.5421 100.652 90.1689C100.678 90.403 100.635 90.5461 100.588 90.6503C100.713 90.3595 100.929 90.5325 100.991 90.0316C101.129 90.5494 101.43 89.9028 101.428 90.7526C101.464 90.5509 101.647 90.0758 101.781 90.0408C101.582 91.071 102.24 90.0876 102.188 91.1998C102.34 90.2738 102.771 90.778 103.047 90.2528C103.037 90.3331 103.013 90.474 102.97 90.4394C103.136 90.5193 103.187 90.7902 103.306 90.9742C103.317 90.2024 103.553 90.0177 103.677 89.5492C103.898 90.2749 103.582 90.449 103.664 91.1707C103.632 90.5421 103.987 90.5414 103.908 90.0169C104.078 90.4718 104.051 90.2378 104.144 90.8793C104.133 89.9124 104.282 90.7055 104.393 90.12C104.623 90.5878 104.494 91.0173 104.717 90.7155C104.847 90.997 104.632 91.3573 104.632 91.3573L104.747 91.5023ZM110.461 89.5504C110.461 89.5504 110.368 89.6005 110.348 89.6027C110.368 89.6005 110.407 89.5961 110.461 89.5504ZM110.95 89.5147C110.95 89.5147 110.809 89.4912 110.731 89.5C110.709 89.3049 110.706 89.1077 110.748 89.1228C110.722 89.2442 110.852 89.348 110.93 89.5169L110.95 89.5147ZM109.696 85.7648C109.696 85.7648 109.798 85.7928 109.811 85.9098C109.772 85.9142 109.736 85.9382 109.682 85.9838L109.688 86.0423C109.677 85.9448 109.666 85.8472 109.696 85.7648Z" fill=""/>
<path d="M109.603 86.4867C109.603 86.4867 109.608 86.5255 109.569 86.5299C109.573 86.5687 109.599 86.6247 109.621 86.6419L109.64 86.4629L109.601 86.4673L109.603 86.4867Z" fill=""/>
<path d="M152.316 79.5293C152.316 79.5293 152.338 79.5465 152.362 79.5831C152.36 79.5637 152.357 79.5443 152.336 79.5271L152.316 79.5293Z" fill=""/>
<path d="M117.749 89.9878L117.734 89.8521L117.709 89.9728L117.749 89.9878Z" fill=""/>
<path d="M155.426 80.5396C155.426 80.5396 155.475 80.6321 155.499 80.6687C155.495 80.63 155.452 80.5955 155.426 80.5396Z" fill=""/>
<path d="M156.543 80.2944L156.755 80.4284C156.755 80.4284 156.584 80.3095 156.543 80.2944Z" fill=""/>
<path d="M157.487 80.2668C157.487 80.2668 157.448 80.0934 157.422 80.0371L157.487 80.2668Z" fill=""/>
<path d="M144.11 84.905C144.11 84.905 144.09 84.9072 144.076 84.9477C144.031 85.0695 144.082 85.0053 144.11 84.905Z" fill=""/>
<path d="M147.832 82.5866C147.823 82.6862 147.798 82.8075 147.765 82.8703C147.847 82.9004 147.906 82.8938 147.832 82.5866Z" fill=""/>
<path d="M147.573 82.9122C147.573 82.9122 147.735 82.953 147.765 82.8706C147.704 82.8577 147.62 82.808 147.573 82.9122Z" fill=""/>
<path d="M161.192 79.2329L161.231 79.2285C161.231 79.2285 161.225 79.1703 161.222 79.1509L161.192 79.2329Z" fill=""/>
<path d="M160.008 79.3877L160.069 79.5783C160.069 79.5783 160.058 79.4808 160.008 79.3877Z" fill=""/>
<path d="M159.695 79.5616C159.695 79.5616 160.048 79.8964 160.108 79.7317L160.09 79.5759C160.124 79.8681 159.655 79.211 159.695 79.5616Z" fill=""/>
<path d="M157.475 77.7194L157.797 77.7816C157.678 77.5976 157.532 77.3573 157.638 77.2465C157.072 76.7773 157.864 77.6753 157.475 77.7194Z" fill=""/>
<path d="M156.507 77.7098C156.627 77.558 156.415 77.4242 156.383 77.3096C156.349 77.5304 156.334 77.5716 156.507 77.7098Z" fill=""/>
<path d="M150.206 79.7281L150.073 79.25C149.987 79.3584 150.134 79.4404 150.206 79.7281Z" fill=""/>
<path d="M149.723 82.5693L149.929 82.8221L149.859 82.3764L149.723 82.5693Z" fill=""/>
<path d="M148.012 79.3258L148.042 79.2433L147.892 79.4777L148.012 79.3258Z" fill=""/>
<path d="M137.356 82.2135L137.521 82.8072C137.586 82.6813 137.431 82.0074 137.356 82.2135Z" fill=""/>
<path d="M132.799 83.7766C132.686 83.4738 132.53 83.314 132.487 83.6344C132.608 83.6601 132.751 83.8806 132.799 83.7766Z" fill=""/>
<path d="M118.497 84.9447L118.57 84.7191L118.395 84.9168L118.497 84.9447Z" fill=""/>
<path d="M74.178 131.282L74.1996 131.299L74.5062 131.225L74.178 131.282Z" fill=""/>
<path d="M84.5668 152.626C84.1933 152.985 83.9048 152.701 83.5013 153.142C83.6849 153.022 84.3641 152.926 84.5668 152.626Z" fill=""/>
<path d="M83.4986 153.142L83.4652 153.184L83.4986 153.142Z" fill=""/>
<path d="M89.2298 160.889C89.2298 160.889 89.1046 161.002 89.0506 161.048C89.1068 161.022 89.1608 160.976 89.2298 160.889Z" fill=""/>
<path d="M87.9318 160.244C87.9318 160.244 88.0192 160.157 87.9209 160.148C87.9017 160.15 87.8847 160.172 87.8676 160.193C87.9445 160.184 87.9829 160.18 87.9318 160.244Z" fill=""/>
<path d="M87.2758 159.135C87.2758 159.135 87.2225 159.18 87.1862 159.204L87.2247 159.199L87.2565 159.137L87.2758 159.135Z" fill=""/>
<path d="M73.4499 137.548C73.5793 137.474 73.7477 137.396 73.8988 137.339C73.5405 137.478 73.3478 137.342 73.4499 137.548Z" fill=""/>
<path d="M83.7436 161.709C83.8858 161.574 83.9742 161.485 84.0064 161.423C83.9675 161.427 83.9287 161.431 83.8748 161.477L83.7458 161.728L83.7436 161.709Z" fill=""/>
<path d="M72.2348 136.382C72.2764 136.575 72.9313 136.264 73.3552 136.176C73.6304 136.342 72.8733 136.448 72.5578 136.622C72.7852 136.715 73.445 136.62 73.4582 136.737C73.3459 136.789 73.3091 136.813 73.1534 136.831C73.7419 136.804 73.3211 137.266 74.0653 137.222C74.0091 137.248 73.9529 137.274 73.8967 137.3C74.2361 137.163 74.5777 137.045 74.8264 136.977C74.8547 137.053 75.3025 137.002 74.868 137.17C74.8613 137.112 74.6905 137.17 74.5348 137.188L74.7556 137.222C74.1374 137.51 74.4936 137.173 74.0158 137.306C74.2843 137.414 74.8795 137.445 74.7436 137.639C74.1188 137.867 74.4401 137.396 73.9281 137.751L74.1135 137.473C73.1626 137.956 74.137 137.332 73.1277 137.822C73.0268 138.149 73.5458 138.031 73.4449 138.359C73.8149 138.317 73.9551 138.163 74.325 138.121C75.0936 138.29 72.8405 138.941 73.7688 138.954C74.2166 138.903 75.0166 138.655 74.6604 138.991L73.9294 139.153C73.9626 139.446 75.0109 138.952 74.6268 139.39C74.3347 139.424 74.317 139.267 74.2458 139.335C73.7361 139.709 74.698 139.323 74.733 139.457L74.1104 139.706C74.2971 139.961 74.8666 140.114 75.0922 140.365C74.8998 140.407 74.6834 140.411 74.5236 140.568C74.9701 140.853 74.74 141.432 74.5033 141.953L75.0873 141.887C75.0873 141.887 74.8692 142.05 74.7524 142.063C74.5993 142.278 75.094 141.945 75.3298 141.938C75.3971 142.01 75.0599 142.166 74.8825 142.167C75.4453 142.261 76.1471 142.537 75.6701 143.026L75.4948 143.046C75.3484 143.319 76.6758 142.853 76.2462 143.237L76.1293 143.25C76.0723 143.79 76.7373 144.09 76.0833 144.757C76.8833 144.508 75.9138 145.349 77.0121 144.948C76.5912 145.411 76.3554 145.418 76.1576 145.934C76.1514 146.053 76.893 145.811 77.0403 145.893L76.4762 146.135L77.1381 146.06L76.5094 146.428L76.6934 146.486C76.6934 146.486 76.9072 146.284 77.078 146.225C77.4005 146.287 76.8695 146.821 76.5863 146.933L77.2231 147.157C76.9961 147.242 76.8921 147.194 76.7169 147.214C77.366 147.2 76.1377 147.497 76.7478 147.487C76.858 147.415 77.0894 147.369 77.2018 147.317C76.9146 147.567 76.9996 147.794 77.2292 147.907L76.8292 148.031C76.8691 148.382 77.2894 148.611 77.446 148.949C77.5602 148.738 78.2412 148.483 78.3474 148.55L77.7898 148.851C78.1748 148.768 77.9646 148.653 78.4708 148.596C78.469 148.754 77.8443 148.983 77.6279 148.988L77.8921 149.056C77.7235 149.135 77.6066 149.148 77.3797 149.233C77.7624 149.13 76.9071 149.761 77.5774 149.586L77.4089 149.664C77.546 150.005 77.8296 150.071 77.9796 150.35C78.4876 150.135 78.4274 150.3 78.8686 150.19C78.8022 150.475 78.511 150.863 78.6761 151.101C78.9986 151.163 79.1323 150.951 79.461 150.894C79.0137 151.122 79.1765 151.341 78.7849 151.366C78.9911 151.619 79.0584 151.69 79.5955 151.906C79.7575 151.769 79.8287 151.702 79.98 151.645C80.0818 151.673 79.8703 151.894 79.6433 151.979L79.5849 151.986C80.4615 152.064 78.7212 153.586 79.8114 153.462L79.753 153.468L80.4154 153.571C80.418 153.768 80.0282 153.635 79.8017 153.898C80.7278 153.891 79.9915 154.528 80.63 154.594C79.4313 155.5 81.134 155.386 80.4693 156.133L80.7653 155.962C81.1114 155.883 80.6295 156.155 80.6016 156.257C80.8437 156.13 80.8326 156.033 81.0251 155.991C81.7512 156.482 81.3299 157.636 81.4272 158.494C81.4821 158.804 83.0808 157.773 82.5308 158.488L81.906 158.717C82.8693 158.864 82.4604 159.78 83.3285 159.958C83.175 159.995 83.0086 160.093 82.9847 160.056C82.6285 160.393 83.1869 160.448 83.5219 160.272C83.533 160.37 83.2281 160.463 83.0878 160.618C82.898 160.856 83.7542 160.582 83.3936 160.879C83.3396 160.925 83.2422 160.936 83.2011 160.921C83.4347 160.894 83.3405 161.28 83.7745 160.935C83.652 161.245 84.1949 161.164 83.9944 161.483C84.5825 161.278 83.9285 161.945 84.6913 161.542C83.9134 161.986 84.2581 162.243 84.6993 162.134C84.455 162.241 84.5289 162.371 84.1723 162.53C84.2656 162.657 84.4864 162.691 84.8537 162.452C84.0962 163.249 85.8838 162.494 84.7975 163.348C85.4448 163.492 85.9408 163.692 86.3417 163.923C85.5855 164.384 86.0271 163.584 85.2559 164.086C85.7647 164.226 86.5302 164.02 86.5616 164.471C86.5187 164.615 86.205 164.63 86.0537 164.687C86.5625 164.827 86.4081 165.378 86.9837 165.411C86.9103 165.459 86.8129 165.47 86.7351 165.479C86.7979 165.511 86.7182 165.678 87.0466 165.444L86.9103 165.459C87.3355 165.036 88.082 165.01 88.3413 164.862C87.3169 165.393 88.2926 165.302 86.9656 165.947C87.0629 165.936 87.2359 165.896 87.4735 165.731C87.4457 165.833 87.3182 165.927 87.035 166.038C87.3598 166.119 87.6598 165.809 87.7815 166.012C87.6151 166.11 87.5373 166.119 87.3319 166.221C87.7125 166.099 88.0952 165.997 88.0634 166.237C87.951 166.289 87.8452 166.4 87.8191 166.344C88.0426 166.575 88.9527 166.255 88.8501 166.741C88.085 167.124 88.6819 166.997 88.0793 167.421L88.3607 167.468L88.6067 167.203C88.6828 167.352 89.2147 167.173 89.1049 167.423L88.7784 167.5L89.0753 167.683L89.1978 167.373C89.6045 167.307 89.9452 166.834 89.9005 167.135C89.8226 167.144 89.9961 167.282 89.6766 167.595C89.9058 167.53 90.1739 167.46 90.0793 167.668C89.9 167.827 89.3987 168.101 89.2735 168.214C89.8138 167.935 89.6332 168.43 90.2319 168.145C90.0806 168.201 89.7695 168.415 89.7177 168.48L90.1651 168.251C90.0832 168.399 90.0314 168.464 89.7549 168.633C89.8226 168.883 90.4761 168.038 90.3107 168.491C90.2717 168.496 90.2177 168.541 90.1204 168.553C90.0996 168.891 90.6814 168.805 90.6239 169.167C90.0668 169.645 90.3575 169.079 89.8956 169.526C90.2164 169.747 91.0513 169.632 91.115 170.02L91.1429 169.918C92.0049 169.346 90.8845 170.422 91.3819 170.286C91.2845 170.297 90.8827 170.58 90.9757 170.53C90.9894 170.825 91.4783 170.789 91.961 170.873L91.719 170.999C91.6093 171.248 91.8216 171.382 91.8243 171.58C92.0663 171.453 92.0774 171.551 92.3624 171.282C91.4243 172.573 93.5336 171.524 92.7898 172.616C92.7659 172.579 92.5367 172.645 92.5628 172.701L92.9721 172.832C93.3132 172.537 93.1663 172.633 93.3906 172.35C93.6327 172.224 93.8641 172.178 93.9119 172.252C93.5809 172.289 93.3309 172.693 93.1778 172.908C93.2858 172.817 93.4154 172.743 93.5234 172.651C93.0035 173.283 94.2707 172.112 93.9973 172.657L93.7964 172.798C93.9521 172.781 94.2548 172.667 94.2703 172.804C93.8774 173.164 94.0216 172.871 93.676 173.128C93.7867 173.234 94.638 172.742 94.3123 173.174C94.1588 173.212 94.111 173.138 93.9597 173.195C93.5628 173.694 93.6902 173.601 93.6862 173.739L93.607 174.084L93.7083 173.934C94.8902 173.227 94.1371 174.064 94.9844 173.711C94.176 174.059 94.5804 173.974 94.1096 174.343C94.0278 174.491 93.9309 174.68 93.784 174.775C94.2335 174.566 93.6118 175.17 94.2667 174.859C94.1242 174.994 94.3384 174.969 93.9366 175.252C94.1574 175.286 94.1654 175.009 94.3663 174.867C95.0105 174.636 94.0959 175.787 95.0083 175.486C95.48 175.472 96.0114 175.115 96.4247 175.108C96.2371 175.366 95.837 175.491 95.837 175.491C95.7123 175.782 95.8162 175.829 96.0693 175.8C95.9202 175.876 95.8362 176.005 95.6959 176.159C95.7999 176.206 96.2835 175.776 96.1587 176.067C95.9751 176.186 95.7007 176.376 95.4954 176.478C95.7096 176.454 96.0707 176.334 96.287 176.329C96.0583 176.572 95.8441 176.596 95.6583 176.696C95.8768 176.711 96.1432 176.8 96.5622 176.495L96.6397 176.309C96.6397 176.309 96.3202 176.621 96.2056 176.654C95.81 176.818 96.2353 176.394 96.3777 176.259L96.5335 176.242C97.3322 175.46 96.1587 176.067 96.0782 175.878L96.7565 175.426L96.1167 175.696C96.2547 175.522 96.5937 175.207 96.7322 175.211C96.9477 174.851 96.4273 175.305 96.699 174.919C96.753 174.873 96.7702 174.852 96.807 174.828L96.5344 174.859C96.6835 174.782 96.9663 174.493 96.9233 174.637C97.145 174.157 96.203 174.718 96.626 174.275L96.6844 174.269C96.2601 174.178 96.1919 174.621 95.4893 174.859L96.5318 173.792L96.0393 174.144C96.0393 174.144 96.026 174.027 96.2269 173.886C95.8313 174.049 96.0304 174.066 95.6955 174.242C96.0167 173.771 95.2189 174.04 95.938 173.425C95.5512 173.666 95.7592 173.761 95.411 173.82C96.1818 173.14 95.149 173.771 95.4185 173.365C95.8592 173.078 95.7322 173.349 96.0017 172.943C95.2477 173.424 95.9619 172.592 95.765 172.595C95.2035 173.034 95.3668 172.561 95.0486 172.538C95.2495 172.396 95.1035 171.978 95.1871 171.672L95.2778 171.603C94.6924 172.005 94.6659 171.771 94.4646 171.735C94.8101 171.478 94.9592 171.402 95.169 171.339L95.0778 171.23C94.8747 171.352 94.7601 171.385 94.6389 171.359L95.0774 171.053C94.9451 170.929 94.3376 171.137 94.4902 170.744C94.0885 171.027 93.48 171.747 93.0646 171.735C93.2827 171.572 93.6433 171.275 93.7601 171.261C93.7212 171.266 93.5309 171.327 93.5978 171.22L94.0301 171.033C94.1248 170.825 93.6951 171.209 93.6646 171.114C93.9734 170.882 93.8566 170.895 94.0942 170.73C94.1332 170.725 94.0124 170.877 94.1442 170.823C94.1309 170.706 94.2624 170.473 94.4739 170.252C94.3119 170.389 94.0548 170.556 93.9748 170.546C93.8425 170.422 94.3115 170.211 94.4062 170.003C94.1641 170.129 94.3128 169.875 93.8571 170.203C93.8332 170.166 94.0296 169.986 94.1549 169.873C93.8867 169.943 93.823 169.555 93.4022 170.018L93.4066 170.057C93.4066 170.057 93.3677 170.061 93.3482 170.063C92.7057 170.136 93.2274 169.346 92.8398 169.232L93.004 169.115C92.7053 169.089 92.6593 168.857 92.2398 168.984C92.2159 168.947 92.4403 168.665 92.6456 168.563C92.4443 168.526 92.2606 168.646 92.3983 168.294C92.7638 168.213 92.6098 168.073 92.6903 168.261C92.7222 168.02 92.9531 167.797 92.3974 167.939C92.8447 167.71 92.8354 167.454 92.6602 167.474L92.4403 167.796C92.3169 167.75 92.3058 167.653 92.2947 167.555L92.8478 167.216C93.2939 166.454 91.3532 167.425 92.2855 166.43C91.8532 166.617 92.1284 166.784 91.6421 167.017C91.62 166.822 92.2912 166.133 92.2479 166.099C92.42 165.704 91.3421 166.458 91.4019 166.115C91.2226 166.274 90.7324 166.646 90.4532 166.618C90.431 166.423 91.1395 165.888 91.3558 165.884C91.397 165.899 91.3647 165.962 91.2718 166.012C91.3691 166.001 91.4881 166.007 91.6629 165.809L91.4598 165.931C91.6151 165.736 91.4545 165.537 91.7917 165.38C91.5386 165.408 91.4373 165.558 91.3943 165.701C91.5492 165.328 91.2032 165.407 91.2674 165.103C91.1811 165.212 90.9651 165.394 90.9607 165.355C91.0094 164.915 90.5218 165.484 90.3094 165.35C90.5315 165.049 91.0289 164.913 90.6718 164.894C90.801 164.643 91.1621 164.523 91.3523 164.462C90.8656 164.517 91.3966 163.982 91.3984 163.824L91.6125 163.8C91.4762 163.815 91.4523 163.778 91.4262 163.722L91.0678 164.039C91.0678 164.039 91.0718 163.901 91.236 163.783C90.9528 163.894 90.6183 164.248 90.1988 164.375C90.3541 164.18 89.8351 164.298 90.3448 163.924C90.324 164.262 90.8546 163.55 91.0497 163.706C90.9718 163.714 90.9457 163.658 90.9736 163.556C91.0276 163.51 91.0838 163.484 91.1227 163.48C91.4395 162.97 90.4656 163.772 90.3395 163.529C90.6572 163.375 90.8643 163.114 90.767 163.125C90.817 163.218 90.3156 163.492 90.0258 163.545C90.1506 163.254 89.7639 163.496 89.7333 163.4L89.6926 163.563C89.3749 163.718 89.3638 163.62 89.2209 163.577C89.4391 163.414 89.4351 163.553 89.5236 163.464C88.9377 163.688 89.89 162.869 89.4639 162.937C89.6192 162.742 90.0148 162.578 90.0966 162.431C89.6099 162.486 90.3811 161.984 89.9484 161.993C89.5878 162.291 89.6807 162.241 89.2201 162.352L89.6878 162.477L88.9957 162.635C89.0457 162.728 89.355 162.673 89.3271 162.775C88.9444 162.877 89.0568 162.825 88.7501 163.077C89.2661 162.584 88.2524 163.035 88.563 162.644L89.5395 162.039C89.8391 161.551 88.8015 161.965 88.8696 161.523L88.7533 161.714C88.3426 161.918 88.5993 161.573 88.3829 161.578C88.7157 161.382 88.7997 161.254 88.979 161.095C88.7391 161.241 88.8745 160.87 88.2068 161.242L88.5564 160.847C88.5967 160.507 87.4471 161.151 87.4334 160.856C87.8312 160.712 87.9993 160.456 88.3542 160.455C88.3064 160.381 88.3343 160.279 88.0922 160.406C88.2714 160.247 87.5276 160.47 87.7931 160.203C87.6223 160.261 87.2701 160.459 87.2591 160.362C87.313 160.316 87.4254 160.264 87.4254 160.264C87.2591 160.362 87.129 160.258 86.8073 160.551C87.7162 159.698 86.3644 159.95 87.1285 159.211C86.9206 159.116 86.7082 158.982 86.5932 158.837C86.7055 158.785 86.7595 158.739 86.7445 158.78C86.9383 158.403 85.7091 159.214 85.9157 158.776C86.3799 158.348 86.2856 158.734 86.441 158.538C87.5299 157.881 86.1224 158.337 86.675 157.82L86.7529 157.811C87.0702 157.479 86.1556 157.761 86.129 157.527C86.129 157.527 86.2414 157.474 86.2954 157.429C85.6467 157.621 85.3131 157.461 85.064 157.351C85.5374 157.179 85.3366 157.32 85.7578 157.035C85.6538 156.988 85.0556 157.451 84.8476 157.356C85.0636 157.173 85.1928 156.921 85.6552 156.652L85.7702 156.797C86.3339 156.377 85.629 156.595 85.6914 156.45L85.9724 156.319C85.7534 156.127 85.0835 156.479 84.9724 156.196L84.791 156.335C84.0472 156.557 85.1083 156.003 84.5308 156.127L85.1941 155.716C84.9755 155.701 84.3481 155.733 84.1379 155.619C84.6915 155.457 85.0724 155.513 85.4229 155.473C85.3729 155.38 85.1928 155.183 84.8317 155.303C84.9096 155.294 85.1043 155.272 85.0353 155.359C84.4428 155.525 84.0857 155.506 84.0052 155.318C85.3494 154.651 84.0663 154.639 85.034 153.956C84.3738 153.873 84.9066 153.18 84.6287 152.817C83.6588 153.48 84.5375 152.709 83.4787 153.283C83.3725 153.216 83.3681 153.177 83.422 153.131L83.9247 152.521C84.1946 152.293 84.1973 152.49 84.4393 152.364C84.4128 152.13 84.8583 152.06 85.0632 151.78C84.6937 151.999 84.4752 151.985 84.5721 151.796L84.1641 152.198C83.4544 152.199 84.9349 151.518 84.2424 151.497L84.6274 151.414C84.346 151.367 84.3686 150.871 83.4345 151.154C83.5424 151.063 83.819 150.893 83.9402 150.919C83.8938 150.51 82.6389 150.573 83.0531 150.052L83.3385 149.96C83.2367 149.932 82.7805 150.083 83.0137 149.878C83.1261 149.826 83.2991 149.787 83.2947 149.748C83.1779 149.761 82.7495 149.81 82.8681 149.638L83.1991 149.601C83.3752 149.067 82.227 149.375 81.9084 149.174C82.6951 148.808 82.8111 148.439 82.8863 148.233L82.9987 148.181C82.9284 147.735 82.0478 147.795 81.5669 147.553C82.3248 146.934 81.5775 146.604 81.9049 146.013C81.7797 146.126 81.2824 146.262 81.1806 146.234C81.3014 146.082 80.5293 146.229 81.2642 145.928L81.2687 145.967C81.9558 145.593 81.67 145.507 81.6328 145.353L80.6709 145.738C81.9041 144.788 79.7559 144.973 80.9355 144.246C80.6607 144.258 80.6085 144.145 80.3337 144.157L80.8439 143.96C80.8692 143.661 80.8904 143.501 80.6453 143.252L81.0302 143.169C81.0081 142.974 79.4559 143.545 79.3603 143.398L80.1103 143.056C79.9776 142.755 80.5431 142.177 79.7316 142.15C79.8462 142.118 80.0732 142.033 80.1165 142.067C80.0988 141.911 80.4263 141.321 79.3931 141.774C80.0935 141.517 79.3533 141.423 78.9745 141.387L79.4891 141.23C78.7904 141.329 78.6002 141.39 78.3489 141.26C78.4006 141.195 78.7422 141.077 78.6343 141.168C78.8413 140.908 78.1086 141.228 78.3112 140.928L78.6617 140.889C78.6418 140.713 78.471 140.772 78.0643 140.838C77.8241 140.806 78.0829 140.48 78.5347 140.291C78.2471 140.363 77.8405 140.429 77.9223 140.281C78.0909 140.203 78.2099 140.209 78.2683 140.202C78.5206 139.818 77.5365 140.009 77.9684 139.644C78.1392 139.585 78.2126 139.537 78.2688 139.511C78.3321 139.721 78.3542 139.916 78.313 139.901C78.7865 139.729 78.8033 139.529 79.5215 139.428C79.1254 139.414 78.2622 139.452 78.4325 139.216C78.4715 139.211 78.5254 139.166 78.5816 139.139L78.64 139.133C78.64 139.133 78.6312 139.055 78.5339 139.066C78.5834 138.981 78.6374 138.936 78.6308 138.877C79.0263 138.714 78.7772 138.604 78.7662 138.506C78.2538 138.683 78.2989 138.559 77.8927 138.803C77.9294 138.779 77.9511 138.796 77.9967 138.85C77.9967 138.85 78.0378 138.865 78.0573 138.863L78.0184 138.867C78.0184 138.867 78.0923 138.997 78.1206 139.073C77.8286 139.106 77.5905 139.094 77.8454 138.907C77.4971 138.966 77.1316 139.047 76.9564 139.067C77.6436 138.693 77.9586 138.341 78.3909 138.154C78.0184 137.998 77.9936 137.606 76.9467 137.764C76.7843 137.723 77.2016 137.577 77.3507 137.501C77.4697 137.507 77.4569 137.568 77.6126 137.55C77.3095 137.486 77.3693 137.143 76.66 137.322C76.9038 137.038 77.3197 137.228 77.1352 136.992L77.3494 136.968C78.295 136.09 75.3255 136.684 76.5693 135.653C76.4981 135.721 76.4614 135.745 76.349 135.797C76.7861 134.957 75.3291 134.628 76.149 133.686C76.2999 133.451 75.8587 133.561 75.4822 133.544L76.0313 133.344L75.3216 133.345C74.7738 133.21 76.5831 132.471 75.5875 132.386L75.2114 132.548C75.2543 132.404 74.8774 132.21 75.3207 132.12C75.2429 132.129 74.9141 132.186 75.0999 132.086L75.4048 131.992L74.8137 131.822C74.9579 131.529 76.003 131.529 75.9632 131.178C75.8137 131.077 74.9827 131.052 74.7969 131.152C74.8035 131.211 74.6393 131.328 74.3539 131.42L74.1676 131.342C73.2853 131.561 72.3553 131.706 71.8154 132.162L72.415 132.232L72.0021 132.418L71.9238 132.249C71.5521 132.449 71.9243 132.426 72.1818 132.437C71.9548 132.522 71.8035 132.578 71.7322 132.646L72.6367 132.622C72.2951 132.74 71.9358 132.702 71.7805 132.897C72.1937 132.89 72.5349 132.594 72.8207 132.68C72.449 132.881 72.1225 132.957 72.4796 132.976C72.2526 133.061 72.1163 133.076 71.9951 133.051C72.2937 133.076 72.1796 133.287 72.6641 133.212C72.1995 133.462 72.8964 133.521 72.0552 133.755C72.2694 133.731 72.765 133.754 72.815 133.847C71.7636 133.966 72.857 134.217 71.7822 134.477C72.7145 134.352 72.3154 134.832 72.876 134.907C72.7981 134.915 72.6424 134.933 72.6986 134.907C72.6556 135.05 72.3941 135.179 72.2516 135.313C72.9977 135.11 73.2317 135.261 73.7012 135.228C73.0335 135.6 72.8123 135.388 72.1508 135.641C72.741 135.455 72.8326 135.741 73.3016 135.53C72.8954 135.774 73.1224 135.689 72.5388 135.933C73.4556 135.671 72.7229 135.991 73.3264 135.922C72.9268 136.225 72.4746 136.236 72.8211 136.335C72.5662 136.522 72.183 136.447 72.183 136.447L72.2348 136.382ZM75.2891 140.362C75.2891 140.362 75.2436 140.308 75.2219 140.291C75.2219 140.291 75.2652 140.326 75.2891 140.362ZM75.409 140.724C75.409 140.724 75.3958 140.607 75.3891 140.549C75.5577 140.47 75.7502 140.429 75.7546 140.468C75.6183 140.483 75.5537 140.609 75.4285 140.722L75.409 140.724ZM78.7471 138.686C78.7471 138.686 78.756 138.764 78.6436 138.816C78.6414 138.797 78.598 138.762 78.5547 138.728L78.4963 138.734C78.5936 138.723 78.6909 138.712 78.7644 138.664L78.7471 138.686Z" fill=""/>
<path d="M78.0299 138.827L77.9912 138.831C77.9546 138.855 77.9181 138.879 77.8816 138.902L78.0558 138.883L78.0514 138.844L78.0299 138.827Z" fill=""/>
<path d="M76.3833 146.204L76.5134 146.15L76.3789 146.166L76.3833 146.204Z" fill=""/>
<path d="M87.8021 159.075L87.2887 159.41C87.4248 159.394 88.0181 159.071 87.8021 159.075Z" fill=""/>
<path d="M85.3865 156.049C85.641 155.863 85.7572 155.672 85.4722 155.763C85.4833 155.861 85.3088 156.058 85.3865 156.049Z" fill=""/>
<path d="M81.3448 145.267L81.5612 145.262L81.3359 145.188L81.3448 145.267Z" fill=""/>
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
		const circleSVG = `<svg width="103" height="112" viewBox="0 0 103 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50.549 38.9701C50.549 38.8101 50.189 38.9001 49.969 38.8701C49.859 38.6801 50.239 38.7701 50.429 38.7001C50.329 38.5801 49.989 38.4901 49.999 38.4001C50.059 38.4001 50.079 38.3701 50.159 38.4001C49.859 38.2801 50.1389 38.0201 49.7689 37.8801C49.7989 37.8701 49.829 37.8601 49.859 37.8601C49.679 37.8901 49.489 37.8901 49.349 37.8901C49.349 37.8201 49.109 37.7601 49.349 37.7301C49.349 37.7801 49.4389 37.7801 49.5189 37.8001L49.409 37.7301C49.759 37.6601 49.529 37.8301 49.789 37.8301C49.669 37.6801 49.379 37.5101 49.479 37.4001C49.819 37.3701 49.599 37.6701 49.899 37.5101L49.7689 37.6901C50.2989 37.5501 49.7289 37.8001 50.3089 37.6601C50.3989 37.4301 50.129 37.4001 50.229 37.1701C50.039 37.1201 49.949 37.1901 49.759 37.1401C49.419 36.8101 50.609 36.8701 50.159 36.6301C49.929 36.5701 49.499 36.5501 49.729 36.3701L50.109 36.4201C50.149 36.1901 49.5589 36.3001 49.8089 36.0601C49.9589 36.1001 49.939 36.2401 49.979 36.2001C50.279 36.0401 49.759 36.0901 49.759 35.9801L50.099 35.9501C50.039 35.7101 49.799 35.4501 49.729 35.1801C49.829 35.1901 49.939 35.2401 50.039 35.1801C49.869 34.8501 50.069 34.4601 50.279 34.1401L49.9889 34.0201C49.9889 34.0201 50.119 33.9701 50.179 34.0001C50.289 33.8701 49.9889 34.0001 49.8789 33.9301C49.8589 33.8601 50.049 33.8301 50.139 33.8801C49.889 33.6601 49.599 33.2501 49.919 33.0101L50.009 33.0601C50.129 32.8801 49.409 32.8501 49.679 32.6801L49.729 32.7101C49.859 32.3101 49.589 31.8701 50.039 31.5701C49.619 31.5101 50.229 31.1801 49.639 31.1501C49.929 30.9301 50.0389 30.9901 50.2389 30.6701C50.2689 30.5901 49.8689 30.5401 49.8089 30.4301H50.119L49.799 30.2801L50.169 30.2101L50.0889 30.1101C50.0889 30.1101 49.949 30.1901 49.859 30.1901C49.719 30.0301 50.0789 29.8201 50.2389 29.8101L49.979 29.4401C50.099 29.4401 50.149 29.5101 50.219 29.5601C49.909 29.3601 50.549 29.5301 50.259 29.3501C50.189 29.3701 50.079 29.3301 50.009 29.3301C50.199 29.2401 50.1989 29.0401 50.1289 28.8901L50.3389 28.9201C50.3989 28.6501 50.249 28.3501 50.259 28.0401C50.159 28.1501 49.789 28.1201 49.759 28.0301L50.0889 28.0001C49.8889 27.9401 49.959 28.0901 49.719 27.9701C49.759 27.8601 50.0889 27.9001 50.1989 27.9701L50.0889 27.8301C50.1889 27.8301 50.239 27.8601 50.359 27.8701C50.159 27.8101 50.6889 27.6401 50.3389 27.5501H50.439C50.439 27.2401 50.339 27.1001 50.329 26.8501C50.049 26.8401 50.109 26.7401 49.889 26.6601C49.979 26.4801 50.209 26.2801 50.189 26.0601C50.049 25.9001 49.949 26.0101 49.789 25.9301C50.049 25.9301 50.029 25.7101 50.209 25.8201C50.179 25.5601 50.169 25.4801 49.969 25.1401C49.859 25.1701 49.819 25.2101 49.729 25.1901C49.689 25.1301 49.839 25.0601 49.959 25.0701L49.9889 25.0901C49.6189 24.7001 50.7589 24.2501 50.2389 23.9401L50.2689 23.9601L49.999 23.6401C50.049 23.5001 50.189 23.7301 50.349 23.6401C49.939 23.2901 50.429 23.1201 50.159 22.8301C50.919 22.6501 50.1389 22.0801 50.6289 21.8101H50.4489C50.2789 21.7401 50.559 21.7301 50.599 21.6801C50.459 21.6801 50.4389 21.7501 50.3389 21.7001C50.1489 21.0601 50.659 20.4201 50.849 19.7901C50.909 19.5601 49.9389 19.6101 50.3789 19.3401L50.709 19.4401C50.339 18.9501 50.769 18.4701 50.469 17.9901C50.539 18.0201 50.639 18.0301 50.639 18.0701C50.889 17.9901 50.669 17.7101 50.479 17.7001C50.509 17.6301 50.659 17.7001 50.759 17.6501C50.909 17.5601 50.469 17.3901 50.709 17.3501C50.749 17.3501 50.789 17.3801 50.799 17.4001C50.689 17.3301 50.849 17.1001 50.569 17.1501C50.709 16.9801 50.469 16.8101 50.639 16.6801C50.339 16.5701 50.809 16.3901 50.369 16.3401C50.819 16.3801 50.749 16.0601 50.549 15.9401C50.679 15.9901 50.6989 15.8501 50.8789 15.9101C50.8789 15.7801 50.809 15.6601 50.569 15.6701C51.129 15.4801 50.169 15.1801 50.869 15.0901C50.649 14.7001 50.509 14.3501 50.429 14.0001C50.879 14.0401 50.449 14.3701 50.919 14.3901C50.7589 14.0601 50.379 13.8501 50.509 13.5401C50.579 13.4601 50.699 13.6001 50.779 13.6301C50.619 13.3001 50.869 13.0201 50.639 12.7201C50.679 12.7201 50.729 12.7601 50.759 12.7901C50.749 12.7301 50.8389 12.6701 50.6289 12.6601L50.679 12.7201C50.379 12.7901 50.079 12.4501 49.919 12.4301C50.499 12.5701 50.089 12.1601 50.819 12.3701C50.779 12.3301 50.689 12.2801 50.549 12.2701C50.589 12.2201 50.679 12.2101 50.829 12.2701C50.729 12.0601 50.509 12.1201 50.529 11.9401C50.629 11.9401 50.659 11.9901 50.779 12.0201C50.589 11.9101 50.409 11.8101 50.499 11.6601C50.559 11.6701 50.6389 11.6601 50.6289 11.7101C50.6289 11.4501 50.149 11.2201 50.359 10.9501C50.779 11.0701 50.5089 10.8601 50.8789 10.8801L50.779 10.7201L50.5889 10.7701C50.6089 10.6401 50.349 10.4901 50.479 10.3901L50.619 10.5001L50.569 10.2401L50.419 10.3701C50.239 10.2201 49.949 10.3401 50.069 10.1701C50.099 10.2101 50.0889 10.0301 50.3089 9.98006C50.1989 9.90006 50.079 9.82006 50.179 9.73006C50.299 9.71006 50.589 9.79006 50.669 9.78006C50.369 9.69006 50.609 9.46006 50.289 9.34006C50.369 9.37006 50.559 9.39006 50.599 9.39006L50.349 9.31006C50.439 9.25006 50.4789 9.25006 50.6289 9.27006C50.6889 9.09006 50.1489 9.29006 50.3789 9.08006C50.3989 9.10006 50.439 9.09006 50.469 9.13006C50.599 8.91006 50.3489 8.68006 50.4889 8.48006C50.8689 8.45006 50.569 8.67006 50.889 8.63006C50.849 8.33006 50.499 7.97006 50.609 7.69006L50.5589 7.74006C50.0389 7.65006 50.839 7.55006 50.609 7.38006C50.649 7.42006 50.8989 7.46006 50.8389 7.44006C50.9389 7.25006 50.749 7.02006 50.609 6.71006L50.7389 6.76006C50.8689 6.66006 50.839 6.46006 50.909 6.34006C50.779 6.29006 50.809 6.22006 50.609 6.24006C51.419 5.93006 50.2689 5.46006 50.9489 5.18006C50.9489 5.22006 51.0589 5.29006 51.0589 5.26006L50.969 4.95006C50.739 4.95006 50.829 4.97006 50.639 5.02006C50.509 4.97006 50.409 4.87006 50.419 4.80006C50.559 4.95006 50.7889 4.84006 50.919 4.80006C50.849 4.80006 50.7689 4.77006 50.6989 4.77006C51.1289 4.66006 50.239 4.69006 50.539 4.52006L50.659 4.54006C50.609 4.46006 50.459 4.37006 50.499 4.29006C50.769 4.29006 50.609 4.39006 50.829 4.42006C50.829 4.30006 50.3489 4.13006 50.6289 4.05006C50.6989 4.11006 50.689 4.18006 50.759 4.24006C51.079 4.16006 51.009 4.14006 51.069 4.05006L51.229 3.87006L51.139 3.91006C50.459 3.69006 51.049 3.59006 50.609 3.34006C51.019 3.58006 50.849 3.40006 51.149 3.45006C51.239 3.41006 51.339 3.34006 51.419 3.37006C51.189 3.25006 51.629 3.23006 51.289 3.06006C51.389 3.06006 51.309 2.96006 51.549 3.01006C51.489 2.88006 51.379 3.01006 51.259 3.00006C50.949 2.77006 51.709 2.60006 51.289 2.28006C51.129 2.02006 50.809 1.94006 50.669 1.71006C50.829 1.65006 51.0189 1.81006 51.0189 1.81006C51.1789 1.71006 51.1589 1.62006 51.0589 1.49006C51.1389 1.52006 51.219 1.51006 51.329 1.49006C51.319 1.40006 50.979 1.39006 51.139 1.29006C51.249 1.32006 51.4189 1.37006 51.5189 1.43006C51.4389 1.31006 51.2789 1.19006 51.1989 1.07006C51.3689 1.07006 51.449 1.17006 51.549 1.22006C51.489 1.09006 51.439 0.880059 51.169 0.810059L51.069 0.880059C51.069 0.880059 51.299 0.880059 51.349 0.920059C51.549 1.05006 51.239 1.06006 51.139 1.05006L51.0889 0.960059C50.5089 0.970059 51.1389 1.28006 51.0889 1.44006L50.679 1.33006L50.999 1.53006C50.889 1.55006 50.649 1.55006 50.599 1.46006C50.379 1.55006 50.739 1.58006 50.499 1.65006C50.459 1.65006 50.439 1.65006 50.429 1.64006L50.539 1.76006C50.459 1.73006 50.2489 1.74006 50.3089 1.68006C50.0489 1.85006 50.579 2.03006 50.259 2.07006L50.2389 2.05006C50.3489 2.34006 50.539 2.11006 50.869 2.36006L50.109 2.41006L50.409 2.47006C50.409 2.47006 50.369 2.55006 50.249 2.53006C50.449 2.66006 50.379 2.53006 50.569 2.61006C50.279 2.71006 50.659 3.00006 50.169 2.98006C50.399 3.05006 50.359 2.87006 50.509 3.03006C49.989 3.01006 50.579 3.21006 50.329 3.31006C50.069 3.24006 50.219 3.14006 49.969 3.24006C50.419 3.37006 49.839 3.47006 49.919 3.59006C50.279 3.63006 50.049 3.83006 50.149 4.02006C50.029 4.00006 49.9189 4.33006 49.7689 4.48006H49.709C50.069 4.54006 49.979 4.70006 50.049 4.83006C49.829 4.80006 49.749 4.77006 49.659 4.69006V4.81006C49.759 4.85006 49.819 4.89006 49.849 4.97006L49.579 4.91006C49.579 5.07006 49.869 5.25006 49.659 5.43006C49.909 5.47006 50.379 5.35006 50.529 5.57006C50.389 5.57006 50.159 5.55006 50.099 5.49006C50.119 5.51006 50.209 5.57006 50.149 5.60006L49.929 5.49006C49.819 5.57006 50.1189 5.56006 50.0889 5.63006C49.8889 5.61006 49.939 5.67006 49.789 5.64006C49.769 5.62006 49.879 5.59006 49.799 5.55006C49.759 5.63006 49.629 5.71006 49.479 5.73006C49.589 5.73006 49.739 5.76006 49.759 5.82006C49.759 5.98006 49.519 5.85006 49.409 5.93006C49.539 5.98006 49.389 6.07006 49.679 6.10006C49.679 6.14006 49.5389 6.14006 49.4489 6.15006C49.5689 6.24006 49.4489 6.53006 49.7689 6.47006L49.789 6.45006H49.799V6.46006C50.069 6.75006 49.579 6.99006 49.679 7.26006H49.579C49.679 7.42006 49.6089 7.60006 49.8089 7.73006C49.8089 7.78006 49.619 7.82006 49.499 7.79006C49.559 7.92006 49.669 7.94006 49.499 8.09006C49.339 7.95006 49.339 8.12006 49.389 7.96006C49.289 8.11006 49.129 8.13006 49.389 8.32006C49.139 8.24006 49.0589 8.41006 49.1289 8.49006L49.319 8.40006C49.349 8.49006 49.319 8.56006 49.289 8.63006L48.959 8.56006C48.529 8.84006 49.599 9.19006 48.899 9.37006C49.119 9.47006 49.0789 9.21006 49.3389 9.31006C49.2789 9.45006 48.789 9.56006 48.789 9.61006C48.589 9.79006 49.259 9.84006 49.109 10.0301C49.229 10.0101 49.549 10.0201 49.649 10.1801C49.589 10.3201 49.139 10.3201 49.049 10.2201C49.049 10.1801 49.079 10.1701 49.119 10.1801C49.079 10.1301 49.039 10.0601 48.899 10.1101L49.0189 10.1401C48.8889 10.2001 48.8889 10.4001 48.6989 10.3401C48.7989 10.4601 48.889 10.4001 48.959 10.3301C48.769 10.5001 48.929 10.6201 48.799 10.8001C48.869 10.7701 49.009 10.7601 49.009 10.7901C48.839 11.0601 49.219 10.9301 49.259 11.1301C49.069 11.2201 48.829 11.0601 48.969 11.2601C48.839 11.3701 48.6489 11.2601 48.5589 11.2001C48.7689 11.3901 48.379 11.5101 48.329 11.6101L48.2389 11.5101C48.2889 11.5701 48.289 11.6101 48.279 11.6601L48.5189 11.6301C48.4689 11.6801 48.469 11.7301 48.369 11.7201C48.519 11.7901 48.769 11.7101 48.969 11.8401C48.839 11.9001 49.0789 12.0701 48.7689 12.0701C48.8889 11.8501 48.449 12.0701 48.419 11.8701C48.449 11.9101 48.449 11.9601 48.399 12.0101C48.359 12.0101 48.339 12.0001 48.319 11.9801C48.019 12.1801 48.669 12.1101 48.639 12.3301C48.469 12.2901 48.2989 12.3601 48.3389 12.4001C48.3489 12.3101 48.6389 12.3801 48.7689 12.4701C48.6189 12.6001 48.8589 12.6301 48.8389 12.7101L48.909 12.6301C49.079 12.6701 49.059 12.7401 49.099 12.8501C48.959 12.8501 49.0089 12.7501 48.9489 12.7801C49.2489 12.9201 48.6089 13.0101 48.8089 13.1801C48.6789 13.2401 48.479 13.1601 48.389 13.2201C48.609 13.4101 48.1289 13.3901 48.3089 13.5901C48.5489 13.5501 48.489 13.5401 48.719 13.6901L48.569 13.3801L48.899 13.6001C48.899 13.5101 48.7589 13.4001 48.8089 13.3501C48.9989 13.4601 48.939 13.4401 49.139 13.4101C48.769 13.5101 49.329 13.6701 49.079 13.8001L48.4889 13.7501C48.2089 13.9501 48.769 14.1601 48.599 14.4301L48.709 14.3501C48.939 14.4001 48.729 14.5301 48.819 14.6201C48.619 14.6001 48.549 14.6501 48.419 14.6801C48.569 14.6801 48.389 14.8801 48.779 14.9401L48.509 15.0501C48.389 15.2701 49.049 15.3501 48.969 15.5601C48.759 15.4801 48.609 15.5701 48.469 15.4101C48.469 15.4801 48.4189 15.5501 48.5589 15.5601C48.4289 15.5901 48.809 15.7801 48.619 15.8301C48.699 15.8701 48.909 15.8901 48.889 15.9701C48.849 15.9701 48.789 15.9701 48.789 15.9701C48.889 15.9701 48.909 16.1101 49.139 16.0501C48.509 16.2401 49.139 16.6801 48.609 16.8401C48.669 17.0001 48.719 17.2001 48.719 17.3401C48.659 17.3301 48.619 17.3401 48.639 17.3101C48.439 17.5001 49.199 17.4701 48.979 17.6801C48.649 17.7801 48.809 17.5501 48.689 17.6101C48.039 17.6101 48.759 17.8901 48.369 18.0201L48.329 17.9801C48.099 18.0801 48.559 18.2801 48.499 18.4701C48.499 18.4701 48.439 18.4601 48.399 18.4701C48.719 18.6201 48.819 18.8701 48.899 19.0601C48.649 18.9901 48.769 18.9701 48.509 18.9901C48.539 19.0701 48.9289 18.9901 48.9889 19.1601C48.8489 19.2101 48.7189 19.3201 48.4489 19.3201V19.1601C48.0789 19.2201 48.4489 19.3601 48.3789 19.4401L48.219 19.4201C48.259 19.6601 48.649 19.6801 48.609 19.9401L48.729 19.9201C49.109 20.0801 48.509 20.0301 48.789 20.1801L48.389 20.2001C48.479 20.3001 48.759 20.5401 48.819 20.7101C48.529 20.6001 48.389 20.4001 48.219 20.2801C48.219 20.3701 48.229 20.5901 48.429 20.6501C48.389 20.6101 48.299 20.5601 48.359 20.5301C48.659 20.6601 48.809 20.8101 48.789 20.9901C48.029 20.9201 48.569 21.4501 47.979 21.5601C48.249 21.8901 47.829 22.1901 47.869 22.5701C48.469 22.4601 47.8789 22.6801 48.4889 22.6801C48.5289 22.7701 48.509 22.8001 48.469 22.8101L48.0889 23.0601C47.9089 23.1201 47.959 22.9701 47.819 22.9701C47.769 23.1601 47.559 23.0401 47.389 23.1601C47.609 23.1401 47.699 23.2401 47.609 23.3401L47.899 23.2001C48.209 23.4801 47.379 23.4101 47.689 23.6901L47.499 23.6001C47.609 23.7401 47.479 24.1101 47.959 24.2601C47.889 24.2801 47.719 24.3101 47.679 24.2501C47.599 24.5801 48.179 25.0001 47.869 25.2501L47.719 25.2201C47.759 25.2801 47.9989 25.3401 47.8389 25.4101C47.7789 25.4101 47.689 25.3801 47.679 25.4101C47.729 25.4401 47.939 25.5801 47.849 25.6601L47.679 25.5901C47.469 25.9101 48.079 26.1001 48.169 26.3701C47.729 26.3601 47.579 26.6101 47.509 26.7301H47.4489C47.3889 27.1001 47.799 27.3701 47.969 27.7201C47.489 27.9301 47.759 28.4501 47.479 28.7901C47.559 28.7401 47.819 28.8001 47.869 28.8701C47.779 28.9501 48.1689 29.1001 47.7689 29.0801V29.0501C47.3789 29.1101 47.479 29.2701 47.469 29.4001L47.999 29.4301C47.229 29.7601 48.269 30.3301 47.579 30.5101C47.709 30.5901 47.7089 30.7001 47.8389 30.7801H47.5589C47.4889 31.0001 47.449 31.1101 47.509 31.4001L47.3089 31.3401C47.2889 31.5001 48.119 31.5501 48.139 31.6901L47.719 31.7301C47.719 32.0101 47.3489 32.2901 47.7389 32.5601C47.6789 32.5601 47.559 32.5501 47.539 32.5001C47.529 32.6301 47.249 33.0101 47.829 32.9601C47.449 32.9601 47.789 33.2501 47.959 33.4001L47.679 33.3801C48.039 33.5101 48.129 33.5101 48.229 33.6901C48.189 33.7301 48.009 33.7301 48.079 33.6701C47.929 33.8101 48.3389 33.7801 48.1989 33.9501L48.0189 33.8901C47.9989 34.0301 48.089 34.0201 48.299 34.1001C48.409 34.1901 48.229 34.3701 47.979 34.3901C48.129 34.4101 48.3389 34.4901 48.2689 34.5701C48.1689 34.5801 48.1189 34.5501 48.0889 34.5401C47.8989 34.7801 48.419 34.8901 48.139 35.0601C48.049 35.0601 47.999 35.0801 47.969 35.0901C47.969 34.9001 47.989 34.7501 48.009 34.7601C47.749 34.7601 47.709 34.9201 47.349 34.8001C47.539 34.9201 47.969 35.1301 47.849 35.2801C47.829 35.2801 47.799 35.2901 47.759 35.3001L47.729 35.2801C47.729 35.2801 47.7289 35.3501 47.7689 35.3701C47.7289 35.4201 47.699 35.4501 47.689 35.5001C47.479 35.5201 47.579 35.6801 47.569 35.7501C47.849 35.7501 47.809 35.8401 48.039 35.7501C48.019 35.7601 48.0089 35.7401 47.9889 35.6801C47.9889 35.6701 47.979 35.6501 47.959 35.6501H47.979C47.979 35.6501 47.959 35.5401 47.959 35.4601C48.099 35.5201 48.219 35.5801 48.069 35.6701C48.249 35.7101 48.4389 35.7501 48.5189 35.7701C48.1289 35.8801 47.919 36.0801 47.679 36.1101C47.839 36.3401 47.789 36.6601 48.319 36.8001C48.389 36.8701 48.1689 36.8801 48.0889 36.9001C48.0389 36.8601 48.039 36.8201 47.969 36.8001C48.109 36.9301 48.029 37.1901 48.399 37.2201C48.239 37.3901 48.059 37.1301 48.119 37.3601L48.009 37.3301C47.429 37.7901 48.969 38.0501 48.219 38.5701C48.269 38.5301 48.289 38.5201 48.349 38.5101C48.029 39.0901 48.679 39.6801 48.169 40.2601C48.069 40.4201 48.2989 40.4301 48.4889 40.5301L48.189 40.5701L48.539 40.7301C48.799 40.9601 47.809 41.1601 48.299 41.4501L48.499 41.4001C48.459 41.5101 48.629 41.7401 48.399 41.7301C48.439 41.7301 48.609 41.7601 48.509 41.8001H48.349L48.6289 42.0701C48.5189 42.2801 47.999 42.0601 47.979 42.3601C48.039 42.4701 48.449 42.6601 48.549 42.6201C48.549 42.5701 48.639 42.5001 48.799 42.4901L48.889 42.5901C49.359 42.5901 49.829 42.6501 50.149 42.3901L49.859 42.2301L50.079 42.1701L50.099 42.3201C50.309 42.2301 50.1189 42.1801 49.9889 42.1301C50.1089 42.1101 50.1889 42.0801 50.2389 42.0501L49.789 41.8901C49.969 41.8601 50.149 41.9501 50.249 41.8401C50.039 41.7701 49.8389 41.9301 49.6989 41.8001C49.9089 41.7101 50.079 41.7301 49.899 41.6401C50.019 41.6201 50.099 41.6401 50.149 41.6801C49.999 41.6001 50.079 41.4501 49.829 41.4201C50.089 41.3301 49.749 41.1301 50.189 41.1201C50.079 41.1001 49.839 40.9801 49.819 40.9001C50.349 41.0301 49.839 40.6001 50.409 40.6201C49.929 40.5301 50.189 40.2401 49.919 40.0501C49.959 40.0501 50.029 40.0801 50.009 40.1001C50.049 39.9901 50.189 39.9601 50.279 39.8901C49.889 39.8901 49.799 39.7201 49.549 39.6401C49.929 39.5001 50.009 39.7101 50.369 39.6601C50.049 39.6701 50.049 39.4401 49.779 39.4901C50.009 39.3801 49.889 39.4001 50.219 39.3401C49.729 39.3401 50.139 39.2501 49.829 39.1701C50.069 39.0201 50.289 39.1201 50.139 38.9701C50.289 38.8901 50.469 39.0301 50.469 39.0301L50.549 38.9701ZM49.639 35.1701C49.639 35.1701 49.649 35.2301 49.659 35.2501C49.659 35.2301 49.649 35.2101 49.639 35.1701ZM49.639 34.8501C49.639 34.8501 49.629 34.9401 49.639 34.9901C49.539 35.0001 49.4389 34.9901 49.4489 34.9601C49.5089 34.9801 49.569 34.9001 49.649 34.8501H49.639ZM47.6989 35.5501C47.6589 35.5001 47.7089 35.4801 47.7689 35.4701C47.7689 35.4901 47.779 35.5201 47.799 35.5601H47.829C47.779 35.5601 47.729 35.5601 47.689 35.5501H47.6989Z" />
<path d="M67.1515 42.1C67.3015 42 67.0215 41.75 66.9315 41.56C67.0515 41.35 67.1715 41.73 67.3315 41.84C67.3915 41.68 67.2815 41.34 67.3715 41.3C67.4115 41.35 67.4415 41.35 67.4615 41.43C67.4115 41.11 67.8015 41.18 67.7315 40.78C67.7615 40.8 67.7815 40.82 67.8015 40.84C67.6715 40.7 67.5615 40.55 67.4915 40.44C67.5515 40.39 67.4915 40.16 67.6415 40.34C67.5915 40.36 67.6415 40.44 67.6715 40.52V40.39C67.9415 40.63 67.6515 40.55 67.8015 40.77C67.8715 40.58 67.8715 40.24 68.0315 40.25C68.2415 40.52 67.8515 40.51 68.1615 40.67H67.9215C68.3515 41.03 67.8015 40.71 68.2415 41.11C68.5115 41.05 68.3815 40.8 68.6515 40.74C68.5915 40.55 68.4815 40.52 68.4215 40.33C68.5315 39.84 69.1415 40.87 69.1115 40.35C69.0415 40.12 68.8215 39.75 69.1115 39.83L69.2715 40.18C69.5015 40.07 69.0815 39.64 69.4415 39.71C69.4915 39.86 69.3515 39.93 69.4115 39.94C69.7215 40.09 69.3915 39.69 69.4915 39.62L69.7015 39.89C69.8915 39.7 70.0015 39.33 70.2015 39.11C70.2415 39.2 70.2615 39.32 70.3815 39.37C70.5915 39.02 71.0615 38.96 71.4715 38.92L71.4215 38.6C71.4215 38.6 71.5415 38.68 71.5515 38.74C71.7315 38.75 71.4515 38.58 71.4415 38.45C71.4915 38.39 71.6215 38.53 71.6315 38.63C71.6915 38.29 71.9115 37.79 72.3015 37.9V38C72.5415 37.98 72.1615 37.37 72.4715 37.49V37.55C72.9015 37.41 73.1615 36.91 73.6815 37.09C73.4915 36.7 74.1515 37 73.8415 36.5C74.2115 36.6 74.2115 36.73 74.6215 36.69C74.7115 36.66 74.5315 36.31 74.5915 36.19L74.7715 36.44L74.7215 36.08L75.0015 36.34L75.0515 36.21C75.0515 36.21 74.9015 36.15 74.8515 36.07C74.9115 35.86 75.3215 36.01 75.4115 36.14L75.6015 35.7C75.6615 35.81 75.6315 35.88 75.6315 35.98C75.6315 35.6 75.8515 36.23 75.8515 35.88C75.7915 35.84 75.7615 35.72 75.7315 35.67C75.9215 35.77 76.1015 35.64 76.2015 35.48L76.2915 35.67C76.5715 35.55 76.7615 35.23 77.0415 35.04C76.8815 35.03 76.7015 34.71 76.7615 34.62L76.9815 34.87C76.9215 34.67 76.8315 34.83 76.7915 34.55C76.9215 34.51 77.0715 34.81 77.0715 34.94L77.1315 34.76C77.1915 34.84 77.1915 34.9 77.2515 35.01C77.1915 34.81 77.6515 35.13 77.5315 34.79L77.5915 34.87C77.8715 34.68 77.9315 34.5 78.1515 34.34C78.0015 34.1 78.1215 34.1 78.0615 33.86C78.2815 33.82 78.5915 33.88 78.7715 33.72C78.8315 33.51 78.6815 33.5 78.6515 33.31C78.8015 33.51 78.9915 33.36 78.9915 33.58C79.2115 33.38 79.2715 33.33 79.4615 32.95C79.3715 32.89 79.3015 32.87 79.2715 32.79C79.3015 32.72 79.4615 32.79 79.5215 32.9V32.93C79.6515 32.38 80.7315 33.01 80.7015 32.38V32.41L80.8315 31.99C80.9915 31.94 80.8615 32.2 81.0515 32.27C81.1115 31.71 81.5715 31.99 81.6615 31.59C82.2815 32.08 82.3215 31.08 82.8515 31.3L82.7315 31.16C82.7015 30.97 82.8715 31.19 82.9415 31.19C82.8615 31.08 82.7815 31.11 82.7615 31C83.2115 30.43 84.0915 30.41 84.7715 30.14C85.0115 30.03 84.3715 29.3 84.8815 29.46L84.9915 29.79C85.2015 29.17 85.8915 29.2 86.1215 28.63C86.1415 28.71 86.1915 28.79 86.1515 28.82C86.3815 28.96 86.4915 28.6 86.3815 28.44C86.4615 28.41 86.5015 28.58 86.5915 28.63C86.7615 28.69 86.6415 28.22 86.8315 28.39C86.8615 28.42 86.8515 28.47 86.8415 28.5C86.8415 28.36 87.1315 28.34 86.9215 28.15C87.1515 28.15 87.1615 27.84 87.3815 27.89C87.2915 27.58 87.7415 27.83 87.5215 27.45C87.7615 27.83 88.0115 27.56 87.9915 27.32C88.0315 27.46 88.1615 27.38 88.2215 27.56C88.3315 27.48 88.3915 27.33 88.2415 27.16C88.7615 27.46 88.4215 26.51 88.9315 27C89.1415 26.57 89.3615 26.21 89.6115 25.92C89.8515 26.3 89.2915 26.19 89.5715 26.57C89.7615 26.22 89.7115 25.78 90.0615 25.67C90.1715 25.67 90.1315 25.86 90.1515 25.94C90.3415 25.59 90.7415 25.59 90.8615 25.21C90.8815 25.25 90.8815 25.3 90.8715 25.35C90.9115 25.3 91.0315 25.33 90.9015 25.16L90.8815 25.24C90.6315 25.05 90.7315 24.59 90.6615 24.45C90.9015 25 91.0015 24.4 91.2715 25.11C91.2815 25.06 91.2715 24.95 91.1915 24.84C91.2615 24.84 91.3215 24.9 91.3615 25.06C91.4815 24.84 91.2915 24.71 91.4615 24.6C91.5115 24.68 91.5015 24.74 91.5515 24.85C91.5315 24.63 91.5015 24.42 91.6915 24.39C91.7115 24.45 91.7715 24.5 91.7315 24.53C91.9515 24.35 91.8615 23.83 92.2315 23.82C92.3815 24.23 92.4015 23.88 92.6115 24.19L92.6915 24.01L92.5415 23.89C92.6715 23.82 92.6415 23.51 92.8115 23.55V23.74L93.0015 23.54L92.7915 23.5C92.8215 23.26 92.5315 23.11 92.7515 23.09C92.7415 23.14 92.8815 23.02 93.0615 23.16C93.0615 23.02 93.0615 22.87 93.2115 22.9C93.3015 22.99 93.4015 23.27 93.4615 23.33C93.3615 23.02 93.7215 23.08 93.6315 22.75C93.6415 22.83 93.7415 23 93.7715 23.03L93.7015 22.78C93.8015 22.82 93.8315 22.85 93.9015 22.99C94.1015 22.93 93.6115 22.61 93.9215 22.67C93.9215 22.7 93.9415 22.73 93.9215 22.78C94.1815 22.75 94.2615 22.41 94.5215 22.41C94.7515 22.71 94.3915 22.58 94.6115 22.83C94.8615 22.62 94.9915 22.12 95.3215 22.06H95.2515C95.0615 21.55 95.5715 22.18 95.6115 21.89C95.5915 21.94 95.6915 22.18 95.6715 22.12C95.9015 22.1 96.0115 21.83 96.2515 21.54L96.2715 21.68C96.4315 21.75 96.6015 21.61 96.7515 21.63C96.7415 21.49 96.8215 21.48 96.7015 21.31C97.3515 21.89 97.3215 20.64 97.8815 21.15C97.8415 21.16 97.8115 21.29 97.8515 21.28L98.1115 21.07C98.0215 20.85 98.0315 20.95 97.9215 20.79C97.9215 20.65 97.9815 20.52 98.0615 20.49C97.9615 20.68 98.1615 20.84 98.2515 20.96C98.2215 20.89 98.2215 20.81 98.2015 20.75C98.4615 21.11 98.1115 20.29 98.4015 20.51L98.4215 20.63C98.4915 20.55 98.5315 20.38 98.6315 20.39C98.7215 20.64 98.5715 20.53 98.6115 20.75C98.7315 20.71 98.7515 20.2 98.9215 20.43C98.8815 20.52 98.8015 20.53 98.7715 20.62C98.9615 20.9 98.9515 20.81 99.0515 20.85H99.0415L99.2715 20.95L99.2015 20.87C99.2415 20.16 99.4915 20.7 99.6515 20.21C99.5015 20.67 99.6515 20.46 99.6715 20.77C99.7315 20.84 99.8215 20.93 99.8115 21.01C99.8815 20.75 99.9915 21.19 100.091 20.82C100.101 20.92 100.191 20.82 100.191 21.07C100.311 20.98 100.151 20.9 100.151 20.78C100.331 20.44 100.621 21.14 100.891 20.7C101.131 20.52 101.191 20.19 101.451 20.03C101.521 20.19 101.361 20.38 101.361 20.38C101.481 20.52 101.571 20.52 101.701 20.42C101.671 20.5 101.691 20.58 101.711 20.69C101.801 20.67 101.811 20.34 101.921 20.5C101.891 20.61 101.841 20.78 101.781 20.88C101.901 20.8 102.031 20.63 102.161 20.56C102.161 20.73 102.051 20.81 102.001 20.91C102.141 20.84 102.341 20.81 102.431 20.55L102.361 20.44C102.361 20.44 102.341 20.67 102.301 20.71C102.161 20.89 102.161 20.59 102.171 20.49L102.261 20.44C102.261 19.86 101.911 20.49 101.751 20.44L101.871 20.03L101.661 20.35C101.631 20.24 101.631 20 101.721 19.95C101.611 19.73 101.601 20.08 101.511 19.84C101.511 19.8 101.511 19.78 101.511 19.77L101.381 19.89C101.411 19.8 101.381 19.6 101.451 19.66C101.231 19.42 101.071 19.97 100.991 19.65L101.011 19.62C100.691 19.76 100.971 19.93 100.751 20.28L100.581 19.52L100.561 19.83C100.561 19.83 100.461 19.8 100.471 19.68C100.361 19.9 100.501 19.81 100.441 20.01C100.271 19.74 100.031 20.17 99.9615 19.69C99.9315 19.93 100.121 19.86 99.9715 20.03C99.8715 19.52 99.7915 20.13 99.6315 19.91C99.6315 19.64 99.7915 19.76 99.6315 19.54C99.6015 20.01 99.3415 19.48 99.2315 19.59C99.2815 19.95 98.9915 19.78 98.8215 19.93C98.8115 19.81 98.4115 19.82 98.1915 19.74V19.68C98.2315 20.05 98.0315 20.02 97.9115 20.13C97.8615 19.92 97.8615 19.82 97.9115 19.71L97.7815 19.75C97.7815 19.87 97.7615 19.94 97.6915 20.01L97.6515 19.74C97.4815 19.81 97.4015 20.15 97.1215 20.05C97.1915 20.3 97.5115 20.68 97.3415 20.91C97.2915 20.78 97.2015 20.56 97.2515 20.49C97.2415 20.51 97.2215 20.62 97.1615 20.58L97.1815 20.33C97.0515 20.26 97.1915 20.53 97.1115 20.54C97.0515 20.35 97.0115 20.43 96.9715 20.28C96.9815 20.25 97.0615 20.33 97.0715 20.25C96.9715 20.25 96.8315 20.18 96.7415 20.05C96.7915 20.15 96.8315 20.3 96.7715 20.35C96.6115 20.42 96.6315 20.15 96.5015 20.09C96.5015 20.23 96.3515 20.14 96.4515 20.42C96.4015 20.44 96.3415 20.31 96.2915 20.24C96.2515 20.39 95.9015 20.43 96.1215 20.69H96.1515C96.1515 20.69 96.1515 20.71 96.1515 20.72C95.9915 21.11 95.5215 20.8 95.3015 21.04L95.2615 20.95C95.1515 21.13 94.9415 21.18 94.9215 21.42C94.8715 21.44 94.7315 21.31 94.7015 21.2C94.6115 21.33 94.6515 21.43 94.4015 21.37C94.4415 21.15 94.2915 21.26 94.4715 21.19C94.2815 21.19 94.1715 21.07 94.1315 21.4C94.0715 21.15 93.8615 21.18 93.8315 21.29L94.0215 21.39C93.9515 21.47 93.8715 21.48 93.7915 21.5L93.6715 21.19C93.1515 21.01 93.4415 22.11 92.8715 21.65C92.9015 21.9 93.1215 21.7 93.1815 21.97C93.0215 22.01 92.6215 21.68 92.5815 21.71C92.2915 21.67 92.6515 22.24 92.3815 22.25C92.4715 22.34 92.6515 22.59 92.5615 22.78C92.4015 22.83 92.1315 22.46 92.1715 22.32C92.2015 22.29 92.2315 22.32 92.2515 22.35C92.2715 22.29 92.3115 22.21 92.1815 22.13L92.2215 22.24C92.0915 22.18 91.9015 22.31 91.8415 22.11C91.7915 22.27 91.9015 22.3 92.0115 22.31C91.7415 22.27 91.7315 22.48 91.4815 22.5C91.5415 22.54 91.6515 22.64 91.6215 22.66C91.2715 22.71 91.6215 22.92 91.4715 23.08C91.2715 22.99 91.2715 22.69 91.1715 22.94C90.9915 22.91 90.9815 22.69 90.9715 22.58C90.9315 22.88 90.5815 22.66 90.4615 22.68L90.4915 22.54C90.4715 22.62 90.4315 22.65 90.3815 22.68L90.5615 22.85C90.4915 22.85 90.4415 22.88 90.3915 22.79C90.4215 22.95 90.6515 23.09 90.6615 23.34C90.5315 23.28 90.5315 23.58 90.3315 23.34C90.6015 23.29 90.1315 23.09 90.2815 22.93C90.2715 22.98 90.2215 23.01 90.1515 23.01C90.1215 22.99 90.1215 22.95 90.1215 22.93C89.7615 22.83 90.2215 23.29 90.0115 23.42C89.9415 23.25 89.7715 23.17 89.7615 23.23C89.8515 23.18 89.9715 23.45 89.9615 23.61C89.7515 23.59 89.8715 23.79 89.7915 23.83H89.9115C89.9815 24 89.9115 24.02 89.8415 24.13C89.7515 24.02 89.8715 23.99 89.8015 23.97C89.8715 24.3 89.3915 23.86 89.3615 24.13C89.2315 24.08 89.1715 23.86 89.0615 23.83C89.0315 24.13 88.7515 23.75 88.6915 24.02C88.8715 24.18 88.8515 24.13 88.8615 24.4L89.0415 24.07L89.0615 24.48C89.1515 24.43 89.1515 24.24 89.2215 24.24C89.2515 24.46 89.2215 24.4 89.3715 24.54C89.0515 24.32 89.2615 24.87 88.9915 24.76L88.6615 24.27C88.3115 24.19 88.4815 24.76 88.1415 24.81L88.2815 24.84C88.3815 25.06 88.1415 24.97 88.1115 25.11C88.0115 24.94 87.9115 24.92 87.8115 24.84C87.9015 24.96 87.6115 24.96 87.8115 25.3L87.5515 25.16C87.2815 25.21 87.6315 25.79 87.3915 25.87C87.3315 25.65 87.1615 25.6 87.2115 25.38C87.1415 25.42 87.0615 25.43 87.1415 25.55C87.0315 25.47 87.1115 25.9 86.9415 25.78C86.9615 25.87 87.0715 26.05 86.9815 26.09C86.9515 26.06 86.9315 26.01 86.9315 26.01C86.9815 26.09 86.8915 26.2 87.0815 26.34C86.5315 25.97 86.5315 26.77 86.0615 26.45C85.9515 26.6 85.8115 26.78 85.6915 26.88C85.6715 26.83 85.6415 26.8 85.6715 26.8C85.3815 26.77 85.8815 27.34 85.5615 27.32C85.2715 27.13 85.5715 27.1 85.4415 27.05C85.0515 26.53 85.2415 27.29 84.8915 27.07V27.02C84.6715 26.91 84.7815 27.4 84.5815 27.48C84.5815 27.48 84.5615 27.43 84.5315 27.4C84.6015 27.75 84.4315 28 84.3215 28.19C84.2315 27.94 84.3215 28.03 84.1415 27.84C84.0915 27.92 84.4015 28.17 84.2915 28.33C84.1615 28.25 83.9915 28.22 83.8215 28L83.9515 27.89C83.6815 27.64 83.7715 28.02 83.6615 28.02L83.5815 27.88C83.3915 28.07 83.6115 28.4 83.3615 28.53L83.4515 28.61C83.5415 29.02 83.2215 28.5 83.2615 28.83L83.0015 28.53C82.9715 28.67 82.9215 29.05 82.8115 29.21C82.7315 28.91 82.8215 28.67 82.8315 28.45C82.7515 28.5 82.5615 28.67 82.6315 28.86C82.6415 28.81 82.6315 28.7 82.7015 28.72C82.7715 29.05 82.7215 29.26 82.5615 29.37C82.1615 28.72 82.0215 29.5 81.5615 29.1C81.4315 29.53 80.9115 29.4 80.6015 29.67C81.0615 30.08 80.5115 29.75 80.8815 30.24C80.8215 30.33 80.7915 30.34 80.7615 30.31L80.3115 30.17C80.1515 30.06 80.3115 30.01 80.2315 29.9C80.0315 29.98 80.0115 29.74 79.8015 29.68C79.9515 29.84 79.9215 29.98 79.7715 29.98L80.0715 30.12C80.0115 30.55 79.5715 29.84 79.5115 30.27L79.4815 30.06C79.4215 30.24 79.0115 30.37 79.1715 30.86C79.1115 30.82 78.9815 30.7 79.0115 30.62C78.6715 30.76 78.6315 31.51 78.2315 31.42L78.1715 31.28C78.1415 31.35 78.2315 31.58 78.0815 31.5C78.0515 31.45 78.0215 31.36 77.9915 31.37C77.9915 31.43 77.9915 31.69 77.8715 31.67L77.8415 31.49C77.4415 31.53 77.6215 32.14 77.4315 32.39C77.1815 32.03 76.8715 32.06 76.7215 32.08L76.6915 32.03C76.3215 32.22 76.3215 32.73 76.1015 33.08C75.6315 32.82 75.3215 33.37 74.8615 33.36C74.9515 33.39 75.0515 33.65 75.0115 33.72C74.8915 33.7 74.9815 34.11 74.7615 33.77H74.7915C74.5115 33.47 74.4215 33.66 74.2915 33.73L74.5715 34.18C73.8315 33.76 73.9115 34.97 73.3615 34.51C73.3615 34.67 73.2715 34.73 73.2715 34.89L73.1115 34.65C72.8615 34.73 72.7415 34.77 72.5215 35L72.4615 34.8C72.3015 34.88 72.7415 35.6 72.6115 35.7L72.3315 35.38C72.0815 35.56 71.6215 35.43 71.5815 35.91C71.5515 35.86 71.4915 35.75 71.5215 35.71C71.3915 35.78 70.9015 35.79 71.2715 36.24C71.0515 35.93 70.9915 36.39 70.9515 36.62L70.8115 36.38C70.9015 36.75 70.9515 36.84 70.8415 37.03C70.7815 37.03 70.6815 36.87 70.7715 36.89C70.5615 36.86 70.8215 37.18 70.5815 37.16L70.5415 36.97C70.4015 37.04 70.4615 37.11 70.5115 37.33C70.4915 37.48 70.2215 37.44 70.0615 37.25C70.1315 37.39 70.1715 37.61 70.0615 37.6C70.0015 37.53 69.9915 37.46 69.9915 37.43C69.6615 37.43 69.8515 37.92 69.5415 37.8C69.4815 37.73 69.4515 37.69 69.4215 37.68C69.6015 37.57 69.7515 37.48 69.7415 37.51C69.6015 37.3 69.4315 37.36 69.3415 36.99C69.3415 37.23 69.3815 37.71 69.1815 37.7C69.1615 37.68 69.1415 37.67 69.1115 37.64V37.61C69.1115 37.61 69.0515 37.65 69.0415 37.7C68.9715 37.7 68.9315 37.69 68.8815 37.71C68.7415 37.55 68.6515 37.72 68.5815 37.76C68.7415 37.99 68.6315 38.01 68.8415 38.15C68.8215 38.15 68.8415 38.11 68.8715 38.07C68.8715 38.06 68.8915 38.04 68.8815 38.03V38.05C68.9315 38.01 68.9915 37.97 69.0515 37.92C69.0815 38.08 69.0915 38.21 68.9215 38.14C68.9815 38.32 69.0515 38.5 69.0815 38.58C68.7615 38.32 68.4615 38.27 68.3015 38.09C68.1815 38.37 67.8615 38.52 68.0215 39.05C68.0015 39.15 67.8615 38.97 67.8015 38.92C67.8015 38.85 67.8515 38.83 67.8315 38.75C67.7815 38.94 67.5015 39.04 67.6815 39.36C67.4315 39.33 67.5715 39.02 67.4015 39.21L67.3615 39.1C66.6115 38.89 67.2215 40.34 66.3315 40.02C66.3915 40.04 66.4215 40.04 66.4615 40.09C65.7515 40.17 65.5615 41.08 64.7515 41C64.5415 41.01 64.6615 41.22 64.6715 41.43L64.4715 41.2L64.5115 41.59C64.4415 41.95 63.7215 41.23 63.7115 41.82L63.8615 41.96C63.7415 42 63.6215 42.27 63.5015 42.07C63.5115 42.11 63.5915 42.27 63.4915 42.21L63.4015 42.08L63.3115 42.47C63.0615 42.5 62.9915 41.93 62.6915 42.09C62.6215 42.21 62.6615 42.67 62.7615 42.73C62.8115 42.71 62.9215 42.73 63.0115 42.87L62.9615 43C63.2115 43.4 63.4015 43.84 63.8115 43.95V43.61L63.9915 43.76L63.8615 43.86C64.0615 43.98 64.0015 43.8 63.9815 43.65C64.0615 43.74 64.1315 43.79 64.1915 43.81L64.1015 43.34C64.2215 43.48 64.2315 43.69 64.4015 43.7C64.3615 43.48 64.1015 43.41 64.1415 43.22C64.3415 43.34 64.4115 43.5 64.4015 43.29C64.4815 43.38 64.5015 43.46 64.5015 43.52C64.5015 43.35 64.6815 43.33 64.5815 43.09C64.8115 43.25 64.8115 42.85 65.0515 43.22C65.0215 43.12 65.0015 42.84 65.0515 42.77C65.2115 43.3 65.3415 42.61 65.6215 43.1C65.4515 42.64 65.8615 42.68 65.8915 42.35C65.9015 42.39 65.9315 42.46 65.8915 42.45C66.0115 42.42 66.1215 42.51 66.2315 42.54C66.0215 42.21 66.1315 42.03 66.0715 41.77C66.4015 42 66.2615 42.2 66.5015 42.47C66.3215 42.21 66.5315 42.06 66.3415 41.87C66.5615 42 66.4815 41.91 66.7115 42.15C66.4515 41.73 66.7515 42.02 66.6615 41.72C66.9315 41.83 66.9515 42.08 67.0215 41.85C67.1715 41.93 67.1415 42.16 67.1415 42.16L67.1515 42.1ZM70.1715 39.02C70.1715 39.02 70.1215 39.07 70.1115 39.09C70.1215 39.08 70.1415 39.06 70.1715 39.02ZM70.4615 38.82C70.4615 38.82 70.3715 38.86 70.3315 38.9C70.2615 38.83 70.2215 38.74 70.2515 38.72C70.2715 38.78 70.3715 38.78 70.4615 38.82ZM68.7415 37.63C68.7615 37.57 68.8115 37.6 68.8515 37.64C68.8315 37.66 68.8115 37.68 68.7915 37.72V37.75C68.7915 37.75 68.7515 37.66 68.7415 37.62V37.63Z"/>
<path d="M42.6016 75.9301C42.6016 76.0801 42.9616 75.9901 43.1816 76.0101C43.2916 76.1801 42.9116 76.1001 42.7216 76.1701C42.8216 76.2801 43.1616 76.3501 43.1516 76.4401C43.0916 76.4401 43.0716 76.4601 42.9916 76.4401C43.2916 76.5501 43.0216 76.7901 43.3916 76.9201C43.3616 76.9301 43.3316 76.9401 43.3016 76.9401C43.4816 76.9101 43.6716 76.9101 43.8116 76.9101C43.8116 76.9801 44.0516 77.0301 43.8116 77.0601C43.8116 77.0201 43.7216 77.0201 43.6416 77.0001L43.7516 77.0701C43.4116 77.1401 43.6316 76.9801 43.3716 76.9801C43.4916 77.1101 43.7816 77.2701 43.6916 77.3801C43.3516 77.4101 43.5716 77.1401 43.2716 77.2801L43.3916 77.1101C42.8616 77.2501 43.4216 77.0101 42.8516 77.1401C42.7616 77.3501 43.0316 77.3701 42.9416 77.5901C43.1316 77.6401 43.2216 77.5701 43.4116 77.6101C43.7516 77.9101 42.5616 77.8601 43.0116 78.0801C43.2416 78.1401 43.6716 78.1501 43.4416 78.3201L43.0616 78.2701C43.0216 78.4801 43.6116 78.3901 43.3516 78.6001C43.2016 78.5601 43.2216 78.4401 43.1816 78.4701C42.8816 78.6101 43.4016 78.5701 43.4016 78.6801L43.0616 78.7001C43.1116 78.9201 43.3616 79.1601 43.4216 79.4101C43.3216 79.4001 43.2116 79.3501 43.1116 79.4101C43.2816 79.7201 43.0716 80.0701 42.8616 80.3601L43.1516 80.4801C43.1516 80.4801 43.0216 80.5301 42.9616 80.5001C42.8516 80.6101 43.1516 80.5001 43.2616 80.5701C43.2816 80.6401 43.0916 80.6501 43.0016 80.6101C43.2416 80.8201 43.5216 81.2101 43.2016 81.4101L43.1116 81.3701C42.9916 81.5301 43.7116 81.5801 43.4316 81.7301L43.3816 81.7001C43.2416 82.0601 43.5016 82.4801 43.0416 82.7401C43.4616 82.8101 42.8316 83.0901 43.4216 83.1401C43.1216 83.3401 43.0216 83.2701 42.8016 83.5501C42.7716 83.6301 43.1616 83.6901 43.2216 83.7901H42.9116L43.2316 83.9201L42.8616 83.9701L42.9316 84.0701C42.9316 84.0701 43.0716 84.0001 43.1616 84.0101C43.2916 84.1601 42.9316 84.3401 42.7716 84.3401L43.0116 84.6901C42.8916 84.6801 42.8516 84.6201 42.7716 84.5701C43.0716 84.7701 42.4416 84.5801 42.7216 84.7601C42.7916 84.7401 42.9016 84.7801 42.9616 84.7901C42.7716 84.8601 42.7516 85.0501 42.8216 85.1901L42.6116 85.1501C42.5416 85.3901 42.6716 85.6801 42.6516 85.9601C42.7616 85.8701 43.1216 85.9201 43.1516 86.0001H42.8216C43.0216 86.0801 42.9516 85.9301 43.1916 86.0601C43.1416 86.1601 42.8216 86.1001 42.7116 86.0401L42.8116 86.1801C42.7116 86.1801 42.6616 86.1501 42.5416 86.1301C42.7416 86.2001 42.2016 86.3201 42.5416 86.4301H42.4416C42.4216 86.7101 42.5216 86.8401 42.5216 87.0701C42.8016 87.1001 42.7316 87.1801 42.9516 87.2701C42.8516 87.4301 42.6116 87.6001 42.6116 87.8001C42.7416 87.9501 42.8416 87.8601 43.0016 87.9401C42.7416 87.9301 42.7516 88.1301 42.5816 88.0101C42.6016 88.2601 42.6016 88.3201 42.7816 88.6501C42.8916 88.6301 42.9416 88.5901 43.0216 88.6201C43.0616 88.6801 42.9016 88.7401 42.7816 88.7201L42.7616 88.7001C43.1116 89.0801 41.9516 89.4201 42.4516 89.7501L42.4316 89.7301L42.6816 90.0401C42.6216 90.1701 42.5016 89.9401 42.3316 90.0201C42.7216 90.3701 42.2216 90.5001 42.4816 90.7801C41.7116 90.9001 42.4616 91.4801 41.9516 91.6901H42.1316C42.3016 91.7801 42.0216 91.7701 41.9716 91.8101C42.1116 91.8101 42.1416 91.7501 42.2316 91.8101C42.3816 92.4101 41.8416 92.9701 41.6116 93.5401C41.5416 93.7501 42.5116 93.7701 42.0616 93.9901L41.7416 93.8701C42.0816 94.3501 41.6216 94.7601 41.9016 95.2301C41.8316 95.2001 41.7316 95.1801 41.7416 95.1401C41.4916 95.2001 41.6916 95.4701 41.8816 95.5001C41.8516 95.5601 41.7016 95.5001 41.6016 95.5201C41.4516 95.5901 41.8816 95.7801 41.6316 95.8001C41.5916 95.8001 41.5616 95.7701 41.5416 95.7501C41.6516 95.8201 41.4816 96.0201 41.7616 96.0001C41.6116 96.1401 41.8416 96.3201 41.6716 96.4301C41.9716 96.5501 41.4916 96.6901 41.9216 96.7701C41.4716 96.7001 41.5216 97.0101 41.7216 97.1301C41.5916 97.0801 41.5716 97.2001 41.3916 97.1301C41.3916 97.2501 41.4516 97.3601 41.6816 97.3701C41.1216 97.5201 42.0616 97.8501 41.3516 97.8901C41.5516 98.2601 41.6716 98.6001 41.7416 98.9301C41.2916 98.8601 41.7416 98.5801 41.2716 98.5401C41.4216 98.8601 41.7816 99.0801 41.6316 99.3501C41.5616 99.4201 41.4416 99.2801 41.3716 99.2501C41.5216 99.5701 41.2616 99.8101 41.4716 100.11C41.4316 100.11 41.3916 100.07 41.3616 100.04C41.3616 100.09 41.2816 100.15 41.4816 100.17L41.4316 100.11C41.7416 100.07 42.0216 100.39 42.1716 100.42C41.6016 100.26 41.9916 100.66 41.2716 100.42C41.3016 100.46 41.3916 100.51 41.5316 100.52C41.4816 100.57 41.4016 100.57 41.2516 100.5C41.3416 100.7 41.5616 100.66 41.5416 100.83C41.4416 100.82 41.4116 100.78 41.2916 100.75C41.4716 100.86 41.6516 100.97 41.5516 101.1C41.4916 101.08 41.4116 101.1 41.4216 101.05C41.4216 101.3 41.8816 101.53 41.6616 101.77C41.2416 101.64 41.5116 101.84 41.1416 101.81L41.2316 101.97L41.4216 101.94C41.4016 102.06 41.6516 102.21 41.5216 102.3L41.3816 102.19L41.4216 102.43L41.5816 102.31C41.7516 102.46 42.0516 102.36 41.9316 102.51C41.9016 102.47 41.9116 102.63 41.6816 102.67C41.7916 102.75 41.9116 102.83 41.8016 102.91C41.6816 102.91 41.3916 102.84 41.3116 102.84C41.6116 102.94 41.3616 103.14 41.6816 103.26C41.6116 103.22 41.4116 103.2 41.3716 103.2L41.6116 103.28C41.5216 103.33 41.4816 103.33 41.3316 103.3C41.2616 103.47 41.8116 103.3 41.5816 103.49C41.5616 103.47 41.5216 103.47 41.4916 103.44C41.3616 103.64 41.6016 103.86 41.4516 104.04C41.0716 104.04 41.3816 103.86 41.0616 103.89C41.0916 104.17 41.4316 104.52 41.3116 104.77L41.3616 104.73C41.8816 104.83 41.0816 104.9 41.3116 105.06C41.2716 105.02 41.0216 104.98 41.0816 105C40.9716 105.17 41.1616 105.39 41.3016 105.69L41.1716 105.64C41.0416 105.73 41.0716 105.92 40.9916 106.03C41.1216 106.08 41.0916 106.14 41.2916 106.13C40.4816 106.4 41.6216 106.86 40.9416 107.11C40.9416 107.07 40.8316 107.01 40.8316 107.04L40.9216 107.33C41.1516 107.33 41.0616 107.31 41.2516 107.27C41.3816 107.32 41.4816 107.41 41.4716 107.48C41.3316 107.34 41.1016 107.44 40.9716 107.48C41.0416 107.48 41.1216 107.51 41.1916 107.51C40.7716 107.61 41.6516 107.59 41.3516 107.75L41.2316 107.73C41.2816 107.81 41.4416 107.89 41.3916 107.97C41.1216 107.97 41.2716 107.88 41.0616 107.85C41.0616 107.96 41.5416 108.12 41.2616 108.19C41.1916 108.14 41.2016 108.07 41.1316 108.01C40.8116 108.08 40.8816 108.1 40.8316 108.18L40.6716 108.34L40.7616 108.3C41.4416 108.51 40.8616 108.59 41.2916 108.83C40.8816 108.6 41.0416 108.77 40.7516 108.73C40.6616 108.77 40.5616 108.83 40.4816 108.8C40.7116 108.91 40.2716 108.93 40.6116 109.09C40.5116 109.09 40.5916 109.18 40.3516 109.14C40.4116 109.26 40.5216 109.14 40.6416 109.15C40.9516 109.36 40.2016 109.52 40.6216 109.82C40.7816 110.06 41.1116 110.13 41.2516 110.35C41.0916 110.4 40.9016 110.26 40.9016 110.26C40.7516 110.36 40.7616 110.44 40.8616 110.56C40.7816 110.53 40.7016 110.54 40.5916 110.56C40.6116 110.65 40.9416 110.65 40.7816 110.75C40.6716 110.72 40.5016 110.68 40.4016 110.63C40.4816 110.74 40.6516 110.85 40.7316 110.96C40.5616 110.97 40.4816 110.87 40.3716 110.83C40.4316 110.95 40.4916 111.14 40.7616 111.2L40.8616 111.14C40.8616 111.14 40.6316 111.14 40.5816 111.1C40.3816 110.98 40.6916 110.97 40.7916 110.97L40.8416 111.05C41.4216 111.03 40.7816 110.75 40.8316 110.61L41.2416 110.71L40.9116 110.53C41.0216 110.51 41.2516 110.51 41.3116 110.59C41.5216 110.51 41.1716 110.48 41.4116 110.42C41.4516 110.42 41.4716 110.42 41.4816 110.43L41.3716 110.32C41.4516 110.35 41.6616 110.33 41.6016 110.39C41.8616 110.23 41.3216 110.06 41.6416 110.03L41.6616 110.05C41.5516 109.78 41.3616 109.99 41.0216 109.77L41.7816 109.72L41.4816 109.66C41.4816 109.66 41.5216 109.59 41.6416 109.61C41.4416 109.49 41.5116 109.61 41.3216 109.54C41.6116 109.44 41.2316 109.18 41.7116 109.2C41.4816 109.13 41.5216 109.3 41.3716 109.15C41.8916 109.17 41.3016 108.98 41.5516 108.9C41.8116 108.96 41.6616 109.06 41.9116 108.97C41.4616 108.85 42.0316 108.76 41.9616 108.65C41.6016 108.61 41.8316 108.42 41.7316 108.25C41.8516 108.27 41.9616 107.97 42.1116 107.83H42.1716C41.8116 107.77 41.8916 107.62 41.8316 107.5C42.0516 107.53 42.1316 107.56 42.2216 107.63V107.52C42.1216 107.48 42.0616 107.44 42.0216 107.37L42.2916 107.43C42.2916 107.29 42.0016 107.11 42.2016 106.95C41.9516 106.91 41.4716 107.01 41.3316 106.8C41.4716 106.8 41.7016 106.83 41.7516 106.89C41.7316 106.87 41.6416 106.82 41.7116 106.79L41.9316 106.89C42.0416 106.82 41.7416 106.82 41.7716 106.76C41.9716 106.78 41.9216 106.73 42.0716 106.76C42.0916 106.78 41.9816 106.81 42.0616 106.84C42.1016 106.77 42.2316 106.69 42.3816 106.68C42.2716 106.68 42.1216 106.65 42.1016 106.59C42.1016 106.45 42.3416 106.57 42.4516 106.5C42.3216 106.45 42.4716 106.38 42.1816 106.34C42.1816 106.3 42.3216 106.31 42.4116 106.3C42.2916 106.21 42.4116 105.95 42.0916 106L42.0716 106.02H42.0616V106.01C41.8016 105.73 42.2916 105.53 42.1916 105.27H42.2916C42.2016 105.13 42.2616 104.96 42.0616 104.83C42.0616 104.79 42.2516 104.75 42.3716 104.79C42.3116 104.67 42.2016 104.65 42.3816 104.51C42.5416 104.64 42.5416 104.49 42.4916 104.64C42.5916 104.51 42.7516 104.5 42.5016 104.31C42.7416 104.39 42.8316 104.24 42.7616 104.17L42.5716 104.25C42.5416 104.17 42.5716 104.11 42.6016 104.04L42.9316 104.12C43.3716 103.88 42.3116 103.51 43.0116 103.38C42.7916 103.27 42.8316 103.52 42.5716 103.41C42.6316 103.28 43.1216 103.2 43.1316 103.16C43.3416 103 42.6716 102.93 42.8216 102.75C42.7016 102.75 42.3816 102.75 42.2916 102.59C42.3516 102.46 42.8016 102.49 42.8916 102.59C42.8916 102.62 42.8616 102.63 42.8216 102.63C42.8616 102.68 42.9016 102.74 43.0316 102.71L42.9116 102.68C43.0416 102.63 43.0516 102.44 43.2416 102.51C43.1416 102.39 43.0516 102.44 42.9816 102.51C43.1716 102.36 43.0216 102.24 43.1616 102.08C43.0916 102.1 42.9516 102.11 42.9516 102.08C43.1316 101.84 42.7416 101.94 42.7116 101.76C42.9016 101.68 43.1316 101.85 43.0116 101.65C43.1516 101.56 43.3316 101.67 43.4216 101.72C43.2116 101.53 43.6116 101.44 43.6616 101.35L43.7416 101.45C43.6916 101.39 43.7016 101.35 43.7016 101.31L43.4616 101.33C43.4616 101.33 43.5116 101.24 43.6116 101.26C43.4616 101.19 43.2116 101.25 43.0216 101.12C43.1516 101.07 42.9216 100.9 43.2316 100.92C43.1016 101.11 43.5516 100.94 43.5716 101.12C43.5416 101.08 43.5416 101.04 43.5916 101C43.6316 101 43.6516 101.02 43.6716 101.03C43.9716 100.87 43.3316 100.89 43.3616 100.69C43.5316 100.74 43.7016 100.69 43.6716 100.65C43.6616 100.73 43.3716 100.65 43.2516 100.56C43.4016 100.45 43.1716 100.4 43.1916 100.34L43.1216 100.41C42.9516 100.36 42.9816 100.3 42.9416 100.2C43.0816 100.2 43.0216 100.3 43.0916 100.27C42.7916 100.13 43.4416 100.08 43.2516 99.9101C43.3816 99.8601 43.5816 99.9501 43.6716 99.9001C43.4616 99.7101 43.9316 99.7601 43.7716 99.5601C43.5316 99.5801 43.5816 99.5901 43.3716 99.4501L43.5016 99.7501L43.1816 99.5301C43.1716 99.6101 43.3116 99.7301 43.2616 99.7701C43.0816 99.6601 43.1416 99.6801 42.9316 99.6901C43.3016 99.6201 42.7516 99.4401 43.0116 99.3301L43.6016 99.4101C43.8916 99.2401 43.3416 99.0201 43.5216 98.7801L43.4116 98.8501C43.1816 98.7901 43.4016 98.6901 43.3116 98.5901C43.5016 98.6201 43.5816 98.5801 43.7116 98.5601C43.5616 98.5501 43.7516 98.3701 43.3616 98.3001L43.6316 98.2201C43.7616 98.0201 43.1016 97.9101 43.1916 97.7201C43.4016 97.8101 43.5516 97.7301 43.6816 97.8901C43.6916 97.8201 43.7316 97.7701 43.6016 97.7501C43.7316 97.7301 43.3616 97.5301 43.5516 97.4901C43.4716 97.4501 43.2616 97.4201 43.2916 97.3401C43.3316 97.3401 43.3916 97.3501 43.3916 97.3501C43.2916 97.3401 43.2716 97.2201 43.0516 97.2501C43.6916 97.1201 43.0816 96.6701 43.6216 96.5501C43.5716 96.4001 43.5316 96.2101 43.5316 96.0801C43.5916 96.1001 43.6316 96.0901 43.6016 96.1201C43.8016 95.9601 43.0516 95.9401 43.2816 95.7501C43.6116 95.6801 43.4416 95.8801 43.5716 95.8301C44.2216 95.8801 43.5116 95.5701 43.9116 95.4701L43.9416 95.5101C44.1716 95.4301 43.7316 95.2201 43.8016 95.0501C43.8016 95.0501 43.8616 95.0701 43.9016 95.0601C43.5916 94.9001 43.5016 94.6601 43.4316 94.4801C43.6816 94.5601 43.5516 94.5701 43.8116 94.5701C43.7816 94.4901 43.4016 94.5401 43.3416 94.3801C43.4816 94.3501 43.6216 94.2501 43.8916 94.2701V94.4101C44.2516 94.3801 43.8916 94.2201 43.9716 94.1601L44.1216 94.1901C44.0916 93.9701 43.7116 93.9201 43.7616 93.6901H43.6416C43.2716 93.5301 43.8716 93.6201 43.6016 93.4601H44.0016C43.9216 93.3701 43.6516 93.1301 43.6016 92.9701C43.8816 93.0901 44.0116 93.2801 44.1716 93.4101C44.1816 93.3301 44.1716 93.1201 43.9916 93.0601C44.0216 93.1001 44.1216 93.1501 44.0516 93.1801C43.7516 93.0401 43.6216 92.8901 43.6416 92.7201C44.4016 92.8301 43.8816 92.3101 44.4816 92.2501C44.2316 91.9201 44.6616 91.6701 44.6516 91.3201C44.0516 91.3801 44.6516 91.2201 44.0316 91.1801C44.0016 91.1001 44.0116 91.0701 44.0516 91.0601L44.4416 90.8501C44.6216 90.8101 44.5716 90.9401 44.7016 90.9501C44.7716 90.7801 44.9716 90.9001 45.1416 90.8001C44.9216 90.8001 44.8316 90.7101 44.9316 90.6101L44.6316 90.7201C44.3316 90.4401 45.1616 90.5601 44.8716 90.2801L45.0516 90.3801C44.9516 90.2401 45.1016 89.9101 44.6216 89.7401C44.6916 89.7201 44.8616 89.7101 44.9016 89.7701C45.0016 89.4701 44.4416 89.0401 44.7616 88.8301L44.9116 88.8701C44.8716 88.8101 44.6416 88.7501 44.8016 88.6901C44.8616 88.6901 44.9516 88.7301 44.9616 88.7001C44.9116 88.6701 44.7116 88.5301 44.8116 88.4601L44.9716 88.5401C45.1916 88.2601 44.6016 88.0501 44.5216 87.7901C44.9616 87.8301 45.1216 87.6001 45.2016 87.4901H45.2616C45.3416 87.1501 44.9416 86.8801 44.7916 86.5401C45.2816 86.3701 45.0416 85.8801 45.3316 85.5701C45.2516 85.6101 44.9916 85.5401 44.9516 85.4801C45.0416 85.4101 44.6616 85.2501 45.0616 85.2901V85.3201C45.4516 85.2901 45.3616 85.1301 45.3716 85.0001L44.8416 84.9501C45.6216 84.6801 44.6016 84.1001 45.3016 83.9701C45.1716 83.8901 45.1816 83.7901 45.0516 83.7101L45.3316 83.7301C45.4116 83.5201 45.4516 83.4201 45.4016 83.1501L45.6016 83.2101C45.6316 83.0601 44.7916 82.9901 44.7816 82.8501L45.2016 82.8301C45.2016 82.5701 45.5816 82.3201 45.2016 82.0501C45.2616 82.0501 45.3816 82.0701 45.4016 82.1101C45.4116 81.9901 45.7016 81.6501 45.1216 81.6701C45.5016 81.6701 45.1616 81.4001 45.0016 81.2601L45.2816 81.2901C44.9316 81.1601 44.8316 81.1601 44.7416 80.9901C44.7816 80.9501 44.9616 80.9601 44.8916 81.0101C45.0416 80.8801 44.6316 80.9001 44.7816 80.7501L44.9616 80.8101C44.9816 80.6801 44.8916 80.6901 44.6816 80.6101C44.5716 80.5201 44.7616 80.3601 45.0116 80.3401C44.8616 80.3201 44.6516 80.2401 44.7316 80.1701C44.8316 80.1701 44.8816 80.1901 44.9116 80.2001C45.1116 79.9801 44.5916 79.8601 44.8616 79.7101C44.9516 79.7101 45.0016 79.7001 45.0316 79.6901C45.0316 79.8701 45.0116 80.0101 44.9916 80.0001C45.2516 80.0001 45.2916 79.8601 45.6516 79.9801C45.4616 79.8601 45.0416 79.6601 45.1616 79.5201C45.1816 79.5201 45.2116 79.5101 45.2516 79.5001H45.2816C45.2816 79.5001 45.2816 79.4501 45.2416 79.4301C45.2816 79.3901 45.3116 79.3601 45.3216 79.3101C45.5316 79.2901 45.4316 79.1401 45.4416 79.0701C45.1616 79.0701 45.2016 78.9801 44.9716 79.0701C44.9916 79.0601 45.0016 79.0801 45.0216 79.1301C45.0216 79.1401 45.0316 79.1501 45.0516 79.1601H45.0316C45.0316 79.1601 45.0416 79.2601 45.0516 79.3301C44.9116 79.2701 44.7916 79.2101 44.9416 79.1301C44.7616 79.0901 44.5716 79.0501 44.4916 79.0301C44.8816 78.9301 45.0916 78.7401 45.3416 78.7201C45.1816 78.5001 45.2316 78.2001 44.7116 78.0701C44.6416 78.0101 44.8616 78.0001 44.9416 77.9701C44.9916 78.0101 44.9916 78.0501 45.0616 78.0701C44.9216 77.9501 45.0116 77.7001 44.6416 77.6801C44.8116 77.5201 44.9816 77.7601 44.9216 77.5501L45.0316 77.5801C45.6116 77.1401 44.0716 76.9201 44.8116 76.4301C44.7616 76.4601 44.7416 76.4801 44.6816 76.4901C44.9916 75.9401 44.3416 75.4001 44.8316 74.8501C44.9316 74.6901 44.6916 74.6901 44.5116 74.6101L44.8116 74.5601L44.4516 74.4201C44.1816 74.2201 45.1616 73.9901 44.6616 73.7401L44.4616 73.7901C44.4916 73.6901 44.3216 73.4801 44.5516 73.4801C44.5116 73.4801 44.3416 73.4601 44.4416 73.4201H44.6016L44.3116 73.1801C44.4116 72.9801 44.9416 73.1601 44.9516 72.8801C44.8816 72.7801 44.4716 72.6201 44.3716 72.6701C44.3716 72.7101 44.2816 72.7901 44.1216 72.8001L44.0316 72.7101C43.5616 72.7301 43.0916 72.7101 42.7816 72.9601L43.0716 73.1001L42.8516 73.1701L42.8316 73.0401C42.6216 73.1301 42.8116 73.1701 42.9516 73.2101C42.8316 73.2301 42.7516 73.2601 42.7116 73.3001L43.1616 73.4201C42.9816 73.4501 42.7916 73.3801 42.7016 73.4901C42.9116 73.5501 43.1016 73.3901 43.2516 73.4901C43.0416 73.5801 42.8716 73.5701 43.0616 73.6501C42.9416 73.6701 42.8616 73.6501 42.8116 73.6301C42.9616 73.7001 42.8816 73.8401 43.1316 73.8601C42.8716 73.9601 43.2216 74.1201 42.7816 74.1501C42.8916 74.1701 43.1316 74.2701 43.1616 74.3401C42.6216 74.2401 43.1516 74.6201 42.5816 74.6101C43.0616 74.6801 42.8116 74.9501 43.0916 75.1101C43.0516 75.1101 42.9716 75.0901 43.0016 75.0701C42.9716 75.1701 42.8316 75.2101 42.7416 75.2701C43.1316 75.2701 43.2316 75.4101 43.4716 75.4801C43.1016 75.6201 43.0116 75.4301 42.6516 75.4801C42.9716 75.4601 42.9716 75.6701 43.2416 75.6201C43.0116 75.7201 43.1316 75.7001 42.8116 75.7701C43.3016 75.7701 42.9016 75.8501 43.2016 75.9201C42.9616 76.0601 42.7416 75.9701 42.9016 76.1101C42.7516 76.1901 42.5716 76.0601 42.5716 76.0601L42.6016 75.9301ZM43.5016 79.4101C43.5016 79.4101 43.4916 79.3501 43.4816 79.3401C43.4816 79.3501 43.4916 79.3801 43.5016 79.4101ZM43.5116 79.7101C43.5116 79.7101 43.5216 79.6301 43.5216 79.5801C43.6216 79.5801 43.7216 79.5801 43.7116 79.6101C43.6516 79.5901 43.5916 79.6601 43.5116 79.7101ZM45.4516 79.0901C45.4516 79.0901 45.4316 79.1501 45.3816 79.1601C45.3816 79.1401 45.3716 79.1101 45.3516 79.0801H45.3216C45.3716 79.0801 45.4216 79.0801 45.4616 79.0901H45.4516Z"/>
<path d="M4.22915 71.96C4.36915 71.9 4.13916 71.6 4.07916 71.4C4.18916 71.23 4.26916 71.61 4.39916 71.76C4.45916 71.62 4.38916 71.28 4.46916 71.26C4.49916 71.31 4.52915 71.33 4.53916 71.4C4.51916 71.08 4.84916 71.24 4.80916 70.85C4.82916 70.88 4.84915 70.9 4.86915 70.93C4.76915 70.77 4.68916 70.6 4.62916 70.48C4.68916 70.45 4.63915 70.22 4.76915 70.42C4.72915 70.43 4.76915 70.52 4.77915 70.6L4.79915 70.48C4.99915 70.77 4.76916 70.63 4.87916 70.86C4.94916 70.7 4.96915 70.37 5.10915 70.42C5.26915 70.72 4.93915 70.63 5.18915 70.84L4.98916 70.79C5.32916 71.22 4.88915 70.79 5.22915 71.27C5.45915 71.27 5.36915 71.01 5.59915 71.01C5.55915 70.82 5.46915 70.76 5.42915 70.57C5.55915 70.14 6.00915 71.24 6.00915 70.74C5.95915 70.51 5.79916 70.11 6.03916 70.25L6.15915 70.62C6.35915 70.57 6.02916 70.07 6.32916 70.21C6.35916 70.36 6.23915 70.39 6.28916 70.42C6.53916 70.64 6.28916 70.18 6.37916 70.14L6.54915 70.44C6.71915 70.3 6.83915 69.97 7.02915 69.82C7.05915 69.92 7.06915 70.03 7.15915 70.1C7.35915 69.82 7.75915 69.86 8.11915 69.92L8.09915 69.61C8.09915 69.61 8.19915 69.71 8.19915 69.77C8.34915 69.82 8.12916 69.6 8.12916 69.47C8.17916 69.42 8.27915 69.59 8.27915 69.68C8.35915 69.37 8.56916 68.95 8.89916 69.14V69.24C9.09916 69.28 8.80915 68.62 9.06915 68.8V68.86C9.43915 68.82 9.68916 68.41 10.1292 68.69C9.99916 68.29 10.5292 68.71 10.2992 68.17C10.6092 68.35 10.5992 68.47 10.9492 68.52C11.0292 68.52 10.8992 68.14 10.9492 68.04L11.0792 68.32L11.0592 67.97L11.2792 68.27L11.3292 68.16C11.3292 68.16 11.1992 68.07 11.1692 67.98C11.2392 67.79 11.5692 68.03 11.6392 68.17L11.8292 67.79C11.8792 67.91 11.8392 67.97 11.8292 68.06C11.8592 67.7 11.9992 68.34 12.0192 68.01C11.9692 67.96 11.9492 67.84 11.9292 67.78C12.0792 67.91 12.2492 67.84 12.3392 67.71L12.4092 67.91C12.6492 67.85 12.8292 67.6 13.0792 67.48C12.9492 67.43 12.8092 67.09 12.8692 67.02L13.0392 67.3C12.9992 67.1 12.9092 67.22 12.8992 66.96C13.0092 66.96 13.1192 67.27 13.1092 67.39L13.1692 67.23C13.2192 67.31 13.2092 67.37 13.2592 67.49C13.2192 67.29 13.5892 67.69 13.5092 67.34L13.5592 67.42C13.8092 67.31 13.8692 67.15 14.0692 67.04C13.9492 66.78 14.0592 66.8 14.0192 66.57C14.2092 66.58 14.4692 66.7 14.6392 66.6C14.7092 66.41 14.5792 66.37 14.5592 66.19C14.6792 66.42 14.8492 66.31 14.8292 66.52C15.0292 66.38 15.0792 66.34 15.2692 66.03C15.1992 65.95 15.1392 65.92 15.1192 65.84C15.1492 65.78 15.2792 65.88 15.3192 66V66.03C15.4592 65.54 16.3392 66.37 16.3592 65.78V65.81L16.4892 65.44C16.6292 65.43 16.4992 65.65 16.6592 65.75C16.7492 65.24 17.1192 65.6 17.2192 65.24C17.7192 65.84 17.8092 64.9 18.2492 65.23L18.1592 65.08C18.1492 64.89 18.2792 65.14 18.3392 65.15C18.2692 65.03 18.2092 65.04 18.1992 64.93C18.6192 64.49 19.3692 64.67 19.9592 64.56C20.1692 64.51 19.6792 63.68 20.0992 63.95L20.1692 64.28C20.3892 63.74 20.9692 63.92 21.2092 63.44C21.2092 63.52 21.2592 63.61 21.2192 63.63C21.3992 63.81 21.5192 63.5 21.4392 63.32C21.5092 63.32 21.5292 63.47 21.6092 63.55C21.7492 63.64 21.6792 63.18 21.8292 63.37C21.8492 63.4 21.8392 63.45 21.8292 63.47C21.8292 63.34 22.0892 63.38 21.9192 63.15C22.1192 63.2 22.1392 62.91 22.3192 63C22.2592 62.69 22.6292 63.02 22.4592 62.61C22.6392 63.02 22.8692 62.82 22.8592 62.59C22.8892 62.73 22.9992 62.68 23.0392 62.87C23.1392 62.82 23.1992 62.7 23.0792 62.49C23.4992 62.89 23.2792 61.92 23.6792 62.49C23.8792 62.13 24.0892 61.84 24.3192 61.62C24.4992 62.03 24.0392 61.8 24.2492 62.23C24.4292 61.94 24.4192 61.52 24.7192 61.49C24.8092 61.51 24.7692 61.68 24.7792 61.77C24.9592 61.48 25.2992 61.57 25.4292 61.24C25.4492 61.28 25.4392 61.33 25.4292 61.37C25.4692 61.33 25.5592 61.37 25.4692 61.2L25.4492 61.27C25.2491 61.04 25.3692 60.62 25.3092 60.48C25.4792 61.05 25.5992 60.51 25.7992 61.24C25.8092 61.19 25.7992 61.09 25.7392 60.96C25.7992 60.98 25.8492 61.04 25.8692 61.2C25.9892 61.02 25.8292 60.85 25.9892 60.79C26.0292 60.88 26.0192 60.93 26.0492 61.04C26.0492 60.83 26.0392 60.62 26.1992 60.64C26.2192 60.7 26.2692 60.76 26.2292 60.78C26.4292 60.65 26.3792 60.14 26.6892 60.2C26.7992 60.62 26.8292 60.29 26.9992 60.62L27.0792 60.46L26.9492 60.32C27.0592 60.27 27.0492 59.98 27.1892 60.05L27.1692 60.23L27.3492 60.07L27.1692 60C27.1992 59.77 26.9592 59.58 27.1492 59.6C27.1392 59.65 27.2592 59.55 27.4092 59.72C27.4092 59.59 27.4092 59.45 27.5392 59.49C27.6092 59.59 27.6992 59.87 27.7492 59.94C27.6692 59.63 27.9692 59.74 27.8992 59.41C27.9092 59.49 27.9891 59.67 28.0191 59.7L27.9592 59.45C28.0492 59.5 28.0692 59.53 28.1292 59.68C28.2992 59.65 27.8792 59.28 28.1492 59.37C28.1492 59.4 28.1692 59.43 28.1492 59.48C28.3792 59.48 28.4392 59.17 28.6592 59.2C28.8692 59.52 28.5492 59.35 28.7392 59.61C28.9592 59.43 29.0492 58.96 29.3292 58.93L29.2691 58.91C29.0791 58.41 29.5592 59.06 29.5692 58.78C29.5592 58.83 29.6592 59.06 29.6392 59.01C29.8392 59.01 29.9191 58.74 30.0891 58.47L30.1192 58.61C30.2692 58.67 30.3992 58.55 30.5292 58.56C30.4992 58.42 30.5692 58.41 30.4492 58.25C31.0991 58.8 30.8792 57.59 31.4392 58.04C31.4092 58.06 31.4092 58.19 31.4392 58.17L31.6292 57.94C31.5091 57.74 31.5392 57.83 31.4092 57.69C31.3792 57.55 31.4092 57.42 31.4592 57.4C31.4192 57.59 31.6192 57.74 31.7192 57.83C31.6792 57.77 31.6592 57.69 31.6292 57.63C31.9291 57.94 31.4492 57.2 31.7392 57.37L31.7792 57.48C31.8192 57.39 31.8092 57.22 31.8892 57.22C32.0292 57.45 31.8692 57.37 31.9592 57.57C32.0492 57.51 31.9392 57.02 32.1392 57.22C32.1392 57.31 32.0692 57.34 32.0592 57.42C32.2892 57.66 32.2692 57.58 32.3592 57.59H32.3492L32.5792 57.64L32.4992 57.58C32.3192 56.89 32.6892 57.35 32.6592 56.86C32.6792 57.33 32.7392 57.1 32.8592 57.38C32.9392 57.44 33.0392 57.49 33.0592 57.58C33.0292 57.32 33.2692 57.69 33.2292 57.32C33.2792 57.41 33.3192 57.29 33.3992 57.52C33.4692 57.4 33.2992 57.38 33.2592 57.26C33.2692 56.89 33.7992 57.45 33.8292 56.93C33.9392 56.67 33.8292 56.35 33.9492 56.12C34.0792 56.23 34.0492 56.46 34.0492 56.46C34.2092 56.54 34.2691 56.49 34.3092 56.34C34.3292 56.43 34.3792 56.48 34.4492 56.57C34.5092 56.51 34.3492 56.23 34.5092 56.31C34.5392 56.42 34.5892 56.58 34.5992 56.7C34.6492 56.58 34.6592 56.37 34.7092 56.25C34.8092 56.39 34.7692 56.51 34.7792 56.62C34.8492 56.5 34.9792 56.36 34.8892 56.1L34.7792 56.04C34.7792 56.04 34.8992 56.24 34.8892 56.3C34.8892 56.53 34.7292 56.27 34.6792 56.19L34.7192 56.1C34.4092 55.61 34.4992 56.3 34.3592 56.33L34.2392 55.93L34.2592 56.3C34.1892 56.22 34.0692 56.01 34.0992 55.93C33.9192 55.79 34.0792 56.1 33.8992 55.93C33.8792 55.9 33.8692 55.88 33.8692 55.86L33.8292 56.01C33.8092 55.92 33.6891 55.75 33.7691 55.78C33.5092 55.64 33.6391 56.19 33.4492 55.93V55.9C33.2892 56.13 33.5592 56.19 33.5492 56.59L33.1192 55.96L33.2292 56.25C33.2292 56.25 33.1492 56.25 33.0992 56.14C33.0992 56.37 33.1692 56.25 33.2092 56.46C32.9792 56.26 32.9592 56.72 32.7292 56.29C32.7892 56.52 32.9092 56.4 32.8592 56.6C32.5992 56.14 32.7592 56.75 32.5592 56.58C32.4791 56.32 32.6292 56.4 32.4292 56.23C32.5592 56.67 32.1892 56.23 32.1392 56.35C32.2892 56.68 32.0192 56.58 31.9292 56.75C31.8892 56.64 31.5692 56.7 31.3792 56.64L31.3592 56.58C31.4892 56.92 31.3192 56.93 31.2492 57.04C31.1592 56.84 31.1392 56.75 31.1492 56.64L31.0592 56.69C31.0892 56.81 31.0792 56.88 31.0392 56.94L30.9492 56.68C30.8291 56.75 30.8291 57.09 30.5891 57C30.6891 57.24 31.0192 57.58 30.9192 57.82C30.8492 57.7 30.7491 57.49 30.7691 57.41C30.7691 57.43 30.7692 57.54 30.7092 57.5L30.6792 57.26C30.5592 57.2 30.7192 57.45 30.6592 57.46C30.5792 57.28 30.5592 57.35 30.4992 57.21C30.4992 57.19 30.5892 57.26 30.5792 57.18C30.4992 57.18 30.3692 57.11 30.2792 56.99C30.3292 57.09 30.3892 57.23 30.3592 57.28C30.2392 57.35 30.2192 57.09 30.0992 57.03C30.1292 57.17 29.9892 57.08 30.1092 57.35C30.0692 57.37 30.0092 57.24 29.9592 57.18C29.9592 57.33 29.6692 57.36 29.8792 57.61H29.9092C29.9092 57.61 29.9092 57.63 29.9092 57.64C29.8192 58.01 29.3892 57.7 29.2392 57.91L29.1992 57.82C29.1192 57.98 28.9492 58.01 28.9492 58.25C28.9091 58.27 28.7792 58.13 28.7492 58.01C28.6792 58.12 28.7192 58.23 28.5092 58.15C28.5292 57.95 28.4092 58.03 28.5592 57.99C28.3992 57.97 28.2992 57.84 28.2792 58.15C28.2192 57.9 28.0492 57.91 28.0191 58L28.1892 58.12C28.1392 58.19 28.0692 58.19 27.9992 58.2L27.8892 57.88C27.4592 57.64 27.7192 58.72 27.2292 58.2C27.2592 58.44 27.4392 58.28 27.4892 58.56C27.3492 58.58 27.0292 58.2 26.9892 58.22C26.7492 58.13 27.0492 58.73 26.8192 58.7C26.8892 58.8 27.0492 59.07 26.9692 59.23C26.8292 59.25 26.6092 58.85 26.6492 58.73C26.6692 58.71 26.6992 58.73 26.7192 58.77C26.7392 58.71 26.7692 58.64 26.6692 58.55L26.7092 58.66C26.5992 58.58 26.4392 58.66 26.3992 58.47C26.3592 58.61 26.4392 58.66 26.5392 58.69C26.3092 58.61 26.2991 58.8 26.0891 58.77C26.1391 58.82 26.2292 58.93 26.1992 58.94C25.9091 58.92 26.1992 59.19 26.0592 59.31C25.8892 59.19 25.9092 58.9 25.8192 59.12C25.6692 59.05 25.6692 58.84 25.6592 58.74C25.6192 59.01 25.3292 58.73 25.2292 58.74L25.2592 58.62C25.2392 58.69 25.1992 58.71 25.1592 58.73L25.2992 58.92C25.2392 58.9 25.1992 58.92 25.1592 58.83C25.1792 58.99 25.3592 59.17 25.3592 59.41C25.2492 59.33 25.2392 59.61 25.0792 59.34C25.3092 59.34 24.9192 59.06 25.0592 58.94C25.0492 58.99 25.0092 59 24.9492 58.99C24.9292 58.96 24.9292 58.93 24.9292 58.91C24.6292 58.74 24.9992 59.27 24.8092 59.35C24.7592 59.18 24.6192 59.07 24.6092 59.11C24.6892 59.08 24.7692 59.36 24.7592 59.52C24.5792 59.45 24.6792 59.67 24.6092 59.69L24.7092 59.72C24.7592 59.89 24.6892 59.9 24.6392 59.99C24.5692 59.87 24.6692 59.87 24.6192 59.83C24.6592 60.16 24.2792 59.63 24.2392 59.88C24.1292 59.8 24.0892 59.58 24.0092 59.53C23.9692 59.81 23.7492 59.38 23.6792 59.63C23.8192 59.83 23.8092 59.77 23.7992 60.03L23.9692 59.76V60.15C24.0392 60.12 24.0492 59.94 24.1092 59.96C24.1092 60.17 24.1092 60.11 24.2192 60.28C23.9692 60 24.1092 60.56 23.8892 60.4L23.6392 59.86C23.3492 59.71 23.4592 60.28 23.1592 60.26L23.2792 60.32C23.3492 60.55 23.1492 60.42 23.1192 60.54C23.0392 60.36 22.9692 60.32 22.8792 60.22C22.9492 60.35 22.7092 60.29 22.8492 60.65L22.6392 60.46C22.4092 60.46 22.6692 61.07 22.4592 61.09C22.4192 60.87 22.2792 60.78 22.3392 60.59C22.2792 60.62 22.2092 60.61 22.2692 60.73C22.1792 60.63 22.2192 61.05 22.0792 60.9C22.0892 60.99 22.1692 61.18 22.0992 61.2C22.0792 61.17 22.0592 61.11 22.0592 61.11C22.0992 61.2 22.0092 61.28 22.1592 61.45C21.7092 60.98 21.6692 61.73 21.2792 61.33C21.1792 61.45 21.0492 61.58 20.9392 61.65C20.9192 61.59 20.8992 61.56 20.9292 61.57C20.6892 61.48 21.0692 62.13 20.7992 62.03C20.5692 61.79 20.8192 61.83 20.7092 61.75C20.4092 61.17 20.5292 61.94 20.2392 61.65V61.6C20.0592 61.45 20.1292 61.93 19.9492 61.96C19.9492 61.96 19.9292 61.9 19.9092 61.87C19.9492 62.22 19.7892 62.41 19.6792 62.57C19.6192 62.32 19.6892 62.42 19.5492 62.2C19.4992 62.26 19.7492 62.57 19.6392 62.69C19.5392 62.58 19.3892 62.52 19.2592 62.28L19.3792 62.21C19.1592 61.92 19.2192 62.3 19.1292 62.27L19.0692 62.13C18.8992 62.27 19.0692 62.62 18.8392 62.7L18.9092 62.8C18.9592 63.21 18.7192 62.65 18.7292 62.96L18.5292 62.62C18.4992 62.74 18.4292 63.09 18.3292 63.22C18.2792 62.92 18.3692 62.71 18.3992 62.51C18.3192 62.54 18.1592 62.66 18.1992 62.85C18.2092 62.8 18.2092 62.7 18.2692 62.74C18.3092 63.06 18.2592 63.26 18.1092 63.32C17.8092 62.62 17.6392 63.32 17.2792 62.84C17.1392 63.22 16.7092 62.98 16.4292 63.16C16.7892 63.65 16.3492 63.22 16.6292 63.76C16.5792 63.83 16.5392 63.83 16.5192 63.8L16.1492 63.57C16.0192 63.43 16.1492 63.42 16.0892 63.3C15.9092 63.33 15.9092 63.1 15.7392 63C15.8492 63.19 15.8192 63.31 15.6992 63.27L15.9392 63.47C15.8592 63.87 15.5292 63.09 15.4492 63.49V63.28C15.3692 63.44 15.0192 63.47 15.1192 63.97C15.0692 63.92 14.9692 63.78 14.9992 63.71C14.6992 63.77 14.6292 64.46 14.2892 64.29L14.2492 64.15C14.2192 64.21 14.2792 64.45 14.1592 64.34C14.1392 64.28 14.1192 64.2 14.0892 64.2C14.0892 64.26 14.0692 64.5 13.9692 64.45L13.9492 64.27C13.5992 64.22 13.7192 64.83 13.5492 65.03C13.3592 64.63 13.0992 64.6 12.9592 64.58L12.9392 64.52C12.6092 64.61 12.5792 65.09 12.3692 65.38C11.9892 65.03 11.6892 65.48 11.2992 65.37C11.3792 65.42 11.4392 65.68 11.4092 65.75C11.3092 65.7 11.3592 66.11 11.1992 65.75H11.2292C11.0092 65.41 10.9192 65.57 10.8092 65.61L11.0192 66.1C10.4192 65.54 10.4092 66.7 9.96916 66.15C9.95916 66.3 9.87915 66.34 9.86915 66.49L9.74915 66.23C9.52915 66.25 9.42915 66.26 9.22915 66.43L9.18915 66.22C9.04915 66.26 9.37915 67.04 9.25915 67.11L9.03916 66.74C8.81915 66.85 8.42915 66.62 8.36915 67.08C8.34915 67.02 8.29916 66.91 8.32916 66.88C8.21916 66.92 7.79916 66.81 8.07916 67.32C7.91916 66.98 7.82915 67.4 7.77915 67.6L7.67915 67.34C7.72915 67.71 7.76915 67.8 7.66915 67.96C7.61915 67.94 7.54915 67.77 7.61915 67.82C7.43915 67.74 7.63915 68.1 7.43915 68.03L7.41915 67.84C7.28915 67.88 7.33915 67.96 7.36915 68.18C7.33915 68.32 7.11916 68.22 6.98916 68C7.03916 68.15 7.05915 68.36 6.95915 68.33C6.90915 68.25 6.90915 68.18 6.90915 68.15C6.62915 68.07 6.75915 68.58 6.50915 68.4C6.46915 68.32 6.43915 68.28 6.41915 68.26C6.57915 68.19 6.70915 68.15 6.70915 68.17C6.59915 67.94 6.45916 67.96 6.39916 67.59C6.37916 67.81 6.38916 68.27 6.21916 68.22C6.19916 68.2 6.18915 68.18 6.16915 68.15V68.12C6.16915 68.12 6.11915 68.14 6.10915 68.19C6.04915 68.17 6.01915 68.15 5.97915 68.17C5.86915 67.98 5.78916 68.13 5.71916 68.15C5.84916 68.4 5.73915 68.4 5.91915 68.57C5.89915 68.56 5.91915 68.53 5.94915 68.5C5.94915 68.49 5.96915 68.48 5.95915 68.46V68.48C5.99915 68.45 6.04915 68.42 6.10915 68.39C6.11915 68.54 6.11916 68.68 5.98916 68.57C6.03916 68.75 6.07915 68.93 6.09915 69.02C5.84915 68.71 5.58916 68.59 5.46916 68.38C5.34916 68.61 5.06915 68.69 5.16915 69.22C5.13915 69.31 5.03916 69.11 4.98916 69.05C4.98916 68.99 5.03915 68.98 5.01915 68.9C4.96915 69.07 4.71915 69.1 4.84915 69.44C4.63915 69.35 4.77915 69.1 4.61915 69.24L4.59915 69.13C3.97915 68.77 4.39915 70.26 3.66915 69.77C3.71915 69.8 3.73915 69.81 3.76915 69.86C3.15915 69.78 2.93915 70.6 2.25915 70.33C2.07915 70.3 2.16915 70.51 2.16915 70.71L2.00915 70.45V70.83C1.93915 71.15 1.36916 70.32 1.32916 70.87L1.44915 71.04C1.34915 71.04 1.21915 71.28 1.13915 71.06C1.13915 71.1 1.19915 71.26 1.11915 71.19L1.04915 71.05L0.949155 71.4C0.729155 71.38 0.709155 70.82 0.449155 70.91C0.379155 71.01 0.389155 71.45 0.469155 71.53C0.509155 71.52 0.609154 71.57 0.679154 71.72L0.629155 71.83C0.809155 72.26 0.949153 72.72 1.29915 72.92L1.31915 72.6L1.45915 72.78L1.34915 72.85C1.50915 73.01 1.46915 72.82 1.45915 72.68C1.51915 72.78 1.57916 72.85 1.62916 72.88L1.57916 72.41C1.66916 72.57 1.66916 72.77 1.80916 72.81C1.78916 72.59 1.56915 72.47 1.61915 72.3C1.77915 72.46 1.82916 72.62 1.82916 72.42C1.88916 72.52 1.90916 72.6 1.89916 72.66C1.89916 72.5 2.05916 72.52 1.98916 72.28C2.16916 72.48 2.19916 72.11 2.37916 72.51C2.35916 72.4 2.35915 72.14 2.41915 72.09C2.52915 72.62 2.67915 72 2.88915 72.53C2.77915 72.06 3.11915 72.19 3.15915 71.88C3.15915 71.92 3.17915 72 3.15915 71.98C3.25915 71.98 3.34915 72.09 3.44915 72.15C3.28915 71.79 3.38915 71.64 3.35915 71.39C3.62915 71.68 3.48915 71.84 3.67915 72.15C3.53915 71.87 3.72916 71.77 3.57916 71.55C3.75916 71.72 3.69916 71.62 3.87916 71.89C3.68916 71.44 3.91915 71.78 3.85915 71.47C4.07915 71.63 4.08916 71.87 4.14916 71.67C4.27916 71.78 4.22915 71.99 4.22915 71.99V71.96ZM6.98916 69.72C6.96916 69.74 6.94915 69.75 6.92915 69.76C6.93915 69.76 6.95916 69.74 6.98916 69.71V69.72ZM7.24915 69.59C7.24915 69.59 7.16916 69.61 7.12916 69.63C7.07915 69.55 7.04916 69.45 7.07916 69.44C7.08916 69.51 7.17915 69.53 7.24915 69.58V69.59ZM5.85915 68.09C5.87915 68.03 5.91915 68.08 5.94915 68.13C5.92915 68.14 5.90915 68.16 5.88915 68.19C5.88915 68.2 5.88915 68.21 5.88915 68.22C5.86915 68.17 5.84915 68.12 5.84915 68.08L5.85915 68.09Z"/>
<path d="M15.32 9.97021C15.42 10.1002 15.64 9.79021 15.82 9.67021C16.03 9.75021 15.68 9.92021 15.58 10.0902C15.73 10.1202 16.05 9.96021 16.1 10.0402C16.06 10.0902 16.05 10.1102 15.98 10.1502C16.29 10.0502 16.24 10.4302 16.62 10.3002C16.6 10.3302 16.58 10.3502 16.56 10.3802C16.68 10.2402 16.82 10.1102 16.93 10.0302C16.98 10.0802 17.2 9.98021 17.03 10.1602C17.01 10.1202 16.93 10.1802 16.86 10.2202H16.99C16.77 10.4902 16.83 10.2102 16.64 10.3802C16.82 10.4202 17.16 10.3602 17.16 10.5102C16.92 10.7502 16.9 10.3802 16.77 10.7002L16.75 10.4802C16.44 10.9302 16.71 10.3702 16.36 10.8502C16.44 11.0902 16.66 10.9302 16.74 11.1702C16.92 11.0902 16.94 10.9702 17.12 10.8902C17.59 10.9202 16.65 11.6502 17.15 11.5402C17.36 11.4402 17.7 11.1802 17.64 11.4602L17.31 11.6702C17.43 11.8702 17.81 11.4102 17.77 11.7602C17.63 11.8302 17.56 11.7102 17.55 11.7602C17.42 12.0702 17.79 11.7002 17.86 11.7902L17.62 12.0302C17.82 12.1802 18.18 12.2202 18.4 12.3802C18.31 12.4302 18.2 12.4702 18.16 12.5802C18.51 12.7202 18.6 13.1502 18.65 13.5302L18.95 13.4402C18.95 13.4402 18.88 13.5702 18.82 13.5802C18.82 13.7502 18.97 13.4702 19.09 13.4402C19.15 13.4802 19.02 13.6202 18.93 13.6402C19.26 13.6502 19.75 13.7902 19.66 14.1702L19.56 14.1902C19.59 14.4102 20.16 13.9602 20.05 14.2702H19.99C20.15 14.6602 20.64 14.8302 20.48 15.3502C20.84 15.1302 20.58 15.7802 21.05 15.4202C20.97 15.7802 20.84 15.8002 20.89 16.1702C20.92 16.2502 21.26 16.0402 21.37 16.0802L21.13 16.2802L21.47 16.1902L21.23 16.4802L21.35 16.5102C21.35 16.5102 21.4 16.3602 21.48 16.3102C21.69 16.3402 21.55 16.7402 21.43 16.8402L21.86 16.9602C21.76 17.0302 21.69 17.0102 21.59 17.0202C21.96 16.9802 21.36 17.2502 21.7 17.2102C21.74 17.1502 21.85 17.1102 21.9 17.0702C21.81 17.2602 21.93 17.4202 22.09 17.4902L21.91 17.6002C22.04 17.8502 22.34 17.9902 22.53 18.2302C22.54 18.0802 22.85 17.8702 22.93 17.9202L22.7 18.1502C22.89 18.0702 22.74 18.0002 23.01 17.9402C23.05 18.0502 22.77 18.2302 22.64 18.2402L22.81 18.2802C22.74 18.3502 22.68 18.3502 22.58 18.4202C22.77 18.3402 22.47 18.8102 22.8 18.6602L22.73 18.7302C22.92 18.9702 23.09 19.0102 23.26 19.1902C23.49 19.0202 23.5 19.1402 23.72 19.0502C23.76 19.2502 23.71 19.5502 23.86 19.7102C24.06 19.7502 24.08 19.6002 24.25 19.5502C24.05 19.7202 24.21 19.8702 23.99 19.9002C24.18 20.0802 24.23 20.1402 24.6 20.2802C24.66 20.1902 24.67 20.1302 24.76 20.0902C24.83 20.1102 24.76 20.2602 24.66 20.3302H24.63C25.16 20.4002 24.56 21.4702 25.17 21.3902H25.14L25.55 21.4702C25.6 21.6102 25.35 21.5202 25.28 21.7002C25.82 21.7102 25.54 22.1602 25.94 22.2102C25.46 22.8302 26.43 22.7802 26.21 23.3002L26.34 23.1802C26.52 23.1402 26.31 23.3102 26.31 23.3802C26.42 23.2902 26.39 23.2202 26.5 23.2002C27.05 23.5802 27.05 24.4002 27.3 25.0202C27.4 25.2402 28.13 24.5902 27.95 25.0802L27.63 25.2002C28.23 25.3502 28.18 26.0002 28.72 26.1902C28.64 26.2102 28.56 26.2702 28.54 26.2302C28.4 26.4502 28.74 26.5302 28.9 26.4202C28.92 26.4902 28.76 26.5402 28.71 26.6302C28.65 26.7902 29.1 26.6602 28.94 26.8402C28.91 26.8702 28.86 26.8602 28.83 26.8602C28.96 26.8502 28.98 27.1202 29.17 26.9102C29.17 27.1302 29.46 27.1102 29.41 27.3202C29.72 27.2202 29.46 27.6502 29.84 27.4202C29.46 27.6702 29.72 27.8802 29.95 27.8502C29.82 27.9002 29.89 28.0102 29.71 28.0802C29.79 28.1802 29.92 28.2302 30.1 28.0802C29.78 28.5802 30.72 28.2202 30.22 28.7202C30.63 28.8902 30.96 29.0902 31.24 29.3102C30.86 29.5502 30.99 29.0302 30.61 29.3102C30.94 29.4702 31.37 29.4102 31.46 29.7302C31.46 29.8302 31.27 29.8002 31.19 29.8202C31.52 29.9802 31.5 30.3602 31.86 30.4602C31.82 30.4802 31.77 30.4802 31.72 30.4802C31.76 30.5202 31.74 30.6302 31.9 30.5102L31.82 30.4902C32.02 30.2502 32.46 30.3302 32.6 30.2602C32.06 30.5002 32.63 30.5802 31.93 30.8602C31.98 30.8602 32.09 30.8602 32.2 30.7702C32.2 30.8402 32.14 30.9002 31.98 30.9402C32.18 31.0502 32.33 30.8702 32.42 31.0202C32.34 31.0702 32.28 31.0602 32.18 31.1102C32.39 31.0802 32.61 31.0502 32.62 31.2302C32.56 31.2502 32.51 31.3102 32.49 31.2702C32.66 31.4702 33.17 31.3602 33.17 31.7102C32.76 31.8702 33.11 31.8702 32.8 32.0902L32.98 32.1602L33.1 32.0102C33.17 32.1302 33.46 32.0802 33.42 32.2502H33.24L33.44 32.4302L33.48 32.2302C33.72 32.2402 33.87 31.9602 33.88 32.1702C33.83 32.1602 33.95 32.2902 33.8 32.4702C33.94 32.4702 34.08 32.4502 34.06 32.5902C33.97 32.6802 33.7 32.7902 33.64 32.8502C33.94 32.7402 33.88 33.0702 34.21 32.9702C34.13 32.9902 33.96 33.0902 33.93 33.1202L34.17 33.0302C34.14 33.1302 34.11 33.1602 33.97 33.2302C34.03 33.4202 34.34 32.9302 34.29 33.2302C34.26 33.2302 34.24 33.2502 34.18 33.2402C34.21 33.4902 34.55 33.5202 34.56 33.7702C34.28 34.0202 34.38 33.6702 34.15 33.8902C34.37 34.1102 34.87 34.1802 34.94 34.4702V34.4002C35.42 34.1502 34.84 34.7202 35.13 34.7202C35.08 34.7202 34.86 34.8402 34.91 34.8102C34.94 35.0202 35.23 35.0902 35.54 35.2602L35.4 35.3002C35.36 35.4602 35.5 35.6002 35.52 35.7402C35.66 35.7002 35.67 35.7702 35.82 35.6302C35.36 36.3702 36.57 36.0502 36.19 36.6802C36.17 36.6502 36.04 36.6602 36.05 36.6802L36.31 36.8702C36.5 36.7302 36.41 36.7602 36.53 36.6202C36.67 36.5802 36.8 36.6002 36.84 36.6602C36.64 36.6202 36.52 36.8502 36.44 36.9702C36.5 36.9302 36.57 36.9002 36.63 36.8602C36.36 37.2002 37.04 36.6402 36.91 36.9702L36.8 37.0202C36.89 37.0602 37.07 37.0402 37.08 37.1302C36.87 37.3002 36.93 37.1302 36.74 37.2302C36.81 37.3202 37.3 37.1702 37.12 37.4002C37.03 37.4002 36.99 37.3302 36.9 37.3302C36.69 37.5902 36.77 37.5602 36.77 37.6602L36.75 37.9002L36.8 37.8102C37.48 37.5802 37.07 38.0102 37.56 37.9502C37.09 38.0002 37.33 38.0502 37.06 38.1902C37.01 38.2802 36.97 38.3902 36.89 38.4202C37.15 38.3802 36.81 38.6502 37.18 38.5902C37.1 38.6402 37.22 38.6802 37 38.7902C37.13 38.8602 37.13 38.6802 37.24 38.6302C37.63 38.6302 37.12 39.2202 37.65 39.2302C37.93 39.3402 38.24 39.2102 38.49 39.3202C38.39 39.4602 38.15 39.4502 38.15 39.4502C38.09 39.6302 38.15 39.6902 38.31 39.7302C38.22 39.7502 38.17 39.8102 38.1 39.8902C38.17 39.9602 38.44 39.7602 38.37 39.9402C38.27 39.9802 38.1 40.0402 37.99 40.0602C38.12 40.1102 38.33 40.1102 38.46 40.1602C38.33 40.2702 38.2 40.2302 38.09 40.2502C38.22 40.3202 38.38 40.4502 38.64 40.3502L38.68 40.2302C38.68 40.2302 38.49 40.3702 38.43 40.3602C38.19 40.3702 38.43 40.1802 38.52 40.1302L38.61 40.1702C39.07 39.8102 38.37 39.9402 38.32 39.7902L38.71 39.6402L38.33 39.6702C38.41 39.5902 38.6 39.4502 38.69 39.4902C38.81 39.2902 38.51 39.4802 38.66 39.2802C38.69 39.2502 38.71 39.2502 38.72 39.2502L38.56 39.2202C38.65 39.1902 38.8 39.0602 38.79 39.1502C38.9 38.8602 38.36 39.0302 38.59 38.8002H38.62C38.36 38.6302 38.34 38.9302 37.93 38.9302L38.51 38.4302L38.23 38.5602C38.23 38.5602 38.22 38.4702 38.33 38.4202C38.1 38.4302 38.22 38.5002 38.02 38.5502C38.19 38.2902 37.72 38.2902 38.12 38.0202C37.89 38.1002 38.03 38.2202 37.82 38.1802C38.25 37.8802 37.66 38.0802 37.8 37.8502C38.05 37.7502 37.99 37.9202 38.13 37.6902C37.7 37.8602 38.09 37.4302 37.96 37.3802C37.65 37.5602 37.71 37.2602 37.52 37.1702C37.63 37.1202 37.52 36.7802 37.55 36.5702L37.6 36.5402C37.27 36.7002 37.24 36.5202 37.11 36.4502C37.3 36.3402 37.39 36.3202 37.51 36.3202L37.45 36.2202C37.34 36.2602 37.26 36.2602 37.19 36.2202L37.44 36.1002C37.35 35.9702 37 36.0002 37.06 35.7302C36.84 35.8502 36.53 36.2402 36.28 36.1402C36.39 36.0602 36.59 35.9302 36.67 35.9502C36.64 35.9502 36.54 35.9502 36.57 35.8902L36.81 35.8402C36.85 35.7102 36.62 35.9002 36.6 35.8302C36.77 35.7302 36.69 35.7102 36.83 35.6402C36.86 35.6402 36.79 35.7402 36.87 35.7202C36.86 35.6302 36.9 35.4902 37.02 35.3802C36.93 35.4402 36.79 35.5202 36.74 35.4802C36.65 35.3502 36.91 35.3102 36.95 35.1802C36.81 35.2202 36.88 35.0602 36.63 35.2102C36.61 35.1702 36.72 35.0902 36.78 35.0302C36.63 35.0302 36.55 34.7302 36.33 34.9702V35.0002H36.31C35.92 34.9302 36.16 34.4502 35.92 34.2902L36 34.2402C35.82 34.1702 35.76 33.9802 35.52 34.0002C35.5 33.9602 35.62 33.8102 35.73 33.7702C35.6 33.7102 35.5 33.7502 35.55 33.5202C35.76 33.5302 35.66 33.4002 35.72 33.5602C35.71 33.3802 35.82 33.2702 35.51 33.2702C35.75 33.1802 35.72 33.0002 35.61 32.9802L35.52 33.1702C35.44 33.1202 35.42 33.0502 35.4 32.9702L35.7 32.8302C35.87 32.3402 34.81 32.7102 35.25 32.1502C35.01 32.2002 35.2 32.3802 34.93 32.4702C34.89 32.3202 35.21 31.9402 35.19 31.9002C35.24 31.6302 34.68 32.0002 34.67 31.7602C34.58 31.8502 34.33 32.0402 34.15 31.9702C34.11 31.8202 34.47 31.5502 34.6 31.5802C34.63 31.6002 34.6 31.6402 34.57 31.6602C34.63 31.6802 34.71 31.7002 34.78 31.5802L34.67 31.6302C34.73 31.5002 34.61 31.3402 34.8 31.2702C34.65 31.2402 34.61 31.3402 34.6 31.4402C34.64 31.1902 34.45 31.1902 34.44 30.9602C34.4 31.0202 34.3 31.1202 34.28 31.0902C34.25 30.7702 34.02 31.1102 33.87 30.9802C33.96 30.7902 34.25 30.7802 34.02 30.7002C34.06 30.5302 34.27 30.5102 34.38 30.4902C34.09 30.4702 34.32 30.1302 34.3 30.0202L34.43 30.0502C34.35 30.0302 34.33 30.0002 34.3 29.9602L34.13 30.1302C34.13 30.0602 34.11 30.0202 34.19 29.9702C34.03 30.0102 33.88 30.2202 33.64 30.2502C33.7 30.1202 33.41 30.1402 33.66 29.9402C33.7 30.1902 33.91 29.7402 34.06 29.8802C34.01 29.8702 33.98 29.8302 33.99 29.7602C34.01 29.7302 34.05 29.7302 34.07 29.7302C34.18 29.3902 33.72 29.8402 33.6 29.6502C33.76 29.5802 33.85 29.4202 33.8 29.4102C33.85 29.4902 33.58 29.6102 33.42 29.6102C33.46 29.4102 33.25 29.5302 33.22 29.4602V29.5702C33.05 29.6402 33.03 29.5702 32.93 29.5202C33.04 29.4402 33.06 29.5402 33.09 29.4802C32.77 29.5602 33.22 29.0902 32.96 29.0702C33.02 28.9402 33.23 28.8802 33.27 28.7802C32.98 28.7602 33.37 28.4902 33.1 28.4402C32.93 28.6202 32.99 28.5902 32.72 28.6102L33.03 28.7702L32.63 28.8002C32.68 28.8802 32.86 28.8802 32.86 28.9402C32.65 28.9702 32.7 28.9402 32.56 29.0902C32.79 28.7902 32.25 29.0002 32.37 28.7502L32.86 28.4202C32.96 28.0902 32.39 28.2702 32.35 27.9502L32.32 28.0802C32.1 28.1802 32.19 27.9502 32.06 27.9302C32.23 27.8302 32.26 27.7402 32.34 27.6402C32.22 27.7302 32.23 27.4602 31.89 27.6602L32.03 27.4102C31.99 27.1602 31.42 27.5102 31.35 27.2902C31.56 27.2202 31.62 27.0602 31.83 27.1002C31.79 27.0402 31.78 26.9602 31.67 27.0402C31.75 26.9302 31.34 27.0202 31.45 26.8602C31.36 26.8802 31.19 26.9902 31.15 26.9102C31.18 26.8802 31.23 26.8502 31.23 26.8502C31.15 26.9002 31.05 26.8202 30.91 27.0002C31.29 26.4702 30.51 26.5102 30.83 26.0502C30.68 25.9602 30.52 25.8302 30.43 25.7202C30.48 25.6902 30.51 25.6602 30.51 25.7002C30.55 25.4302 29.98 25.9202 30.01 25.6202C30.2 25.3402 30.22 25.6202 30.28 25.4902C30.79 25.0902 30.05 25.3202 30.28 24.9702H30.33C30.44 24.7502 29.96 24.8902 29.89 24.7002C29.89 24.7002 29.94 24.6702 29.97 24.6402C29.63 24.7202 29.39 24.5902 29.21 24.4902C29.45 24.3902 29.37 24.4802 29.56 24.3002C29.48 24.2502 29.24 24.5602 29.08 24.4702C29.16 24.3502 29.19 24.1802 29.41 24.0102L29.51 24.1302C29.75 23.8602 29.38 23.9702 29.38 23.8702L29.51 23.7902C29.33 23.6302 29.01 23.8502 28.88 23.6302L28.8 23.7202C28.4 23.8302 28.91 23.5002 28.59 23.5502L28.89 23.2802C28.76 23.2602 28.39 23.2402 28.23 23.1502C28.52 23.0502 28.76 23.1202 28.97 23.1202C28.92 23.0402 28.76 22.8802 28.58 22.9602C28.63 22.9602 28.74 22.9502 28.71 23.0102C28.39 23.1002 28.18 23.0702 28.08 22.9202C28.72 22.5002 27.96 22.4202 28.36 21.9602C27.94 21.8702 28.07 21.3702 27.81 21.1002C27.41 21.5602 27.73 21.0202 27.25 21.4002C27.17 21.3502 27.15 21.3202 27.18 21.2902L27.31 20.8602C27.42 20.7002 27.47 20.8502 27.57 20.7602C27.49 20.5802 27.73 20.5402 27.78 20.3402C27.62 20.4902 27.49 20.4702 27.49 20.3402L27.36 20.6302C26.94 20.6102 27.63 20.1402 27.21 20.1102L27.42 20.0602C27.25 20.0202 27.12 19.6402 26.64 19.8302C26.68 19.7702 26.8 19.6402 26.87 19.6602C26.73 19.3502 26 19.3902 26.09 19.0002L26.22 18.9302C26.15 18.9102 25.93 19.0102 26 18.8602C26.05 18.8302 26.13 18.7902 26.12 18.7602C26.06 18.7602 25.81 18.7902 25.83 18.6702L26.01 18.6202C25.97 18.2402 25.38 18.4702 25.14 18.3202C25.49 18.0502 25.45 17.7602 25.42 17.6202L25.47 17.5902C25.28 17.2602 24.78 17.3102 24.43 17.1402C24.67 16.6702 24.13 16.4402 24.13 16.0002C24.1 16.0902 23.86 16.2102 23.78 16.1902C23.8 16.0702 23.4 16.2002 23.72 15.9602V15.9902C24 15.7002 23.82 15.6302 23.74 15.5202L23.31 15.8302C23.69 15.0802 22.52 15.3102 22.94 14.7302C22.79 14.7502 22.72 14.6702 22.57 14.6902L22.79 14.5202C22.7 14.3002 22.66 14.1802 22.43 14.0102L22.62 13.9302C22.53 13.7902 21.86 14.2902 21.75 14.1902L22.05 13.8902C21.87 13.6802 21.97 13.2202 21.5 13.2602C21.55 13.2202 21.65 13.1502 21.69 13.1802C21.61 13.0702 21.58 12.6102 21.17 13.0102C21.46 12.7702 21.01 12.7602 20.79 12.7602L21.02 12.6002C20.67 12.7302 20.59 12.7902 20.4 12.7202C20.4 12.6602 20.55 12.5502 20.53 12.6402C20.55 12.4402 20.26 12.7302 20.26 12.5002L20.44 12.4302C20.36 12.3102 20.3 12.3802 20.09 12.4502C19.95 12.4502 19.97 12.1902 20.15 12.0202C20.02 12.1002 19.81 12.1802 19.81 12.0602C19.88 11.9902 19.94 11.9802 19.97 11.9702C19.97 11.6602 19.49 11.9102 19.59 11.6002C19.66 11.5402 19.69 11.5002 19.7 11.4702C19.82 11.6202 19.91 11.7502 19.88 11.7502C20.08 11.5802 20.01 11.4402 20.36 11.3002C20.13 11.3302 19.67 11.4402 19.67 11.2502C19.68 11.2302 19.7 11.2102 19.72 11.1802H19.75C19.75 11.1802 19.71 11.1202 19.66 11.1302C19.66 11.0702 19.66 11.0202 19.64 10.9802C19.79 10.8302 19.61 10.7702 19.57 10.7002C19.36 10.8902 19.33 10.7802 19.21 11.0002C19.21 10.9802 19.24 10.9902 19.29 11.0202C19.3 11.0202 19.32 11.0302 19.33 11.0202H19.31C19.31 11.0202 19.4 11.1102 19.45 11.1702C19.3 11.2202 19.17 11.2502 19.23 11.0802C19.07 11.1602 18.9 11.2502 18.82 11.2902C19.05 10.9602 19.08 10.6602 19.24 10.4802C18.97 10.4002 18.8 10.1302 18.3 10.3602C18.21 10.3602 18.36 10.2002 18.41 10.1302C18.48 10.1302 18.5 10.1602 18.57 10.1302C18.38 10.1202 18.27 9.86021 17.97 10.0802C17.99 9.84021 18.29 9.93021 18.09 9.79021L18.2 9.74021C18.34 9.01021 17 9.80021 17.23 8.93021C17.22 8.99021 17.21 9.01021 17.17 9.06021C17.04 8.41021 16.15 8.38021 16.16 7.60021C16.13 7.41021 15.94 7.55021 15.74 7.60021L15.94 7.37021L15.57 7.48021C15.22 7.48021 15.84 6.68021 15.28 6.78021L15.16 6.95021C15.12 6.84021 14.84 6.78021 15.02 6.63021C14.99 6.65021 14.84 6.75021 14.89 6.64021L15 6.53021H14.62C14.56 6.28021 15.1 6.12021 14.92 5.87021C14.8 5.83021 14.37 5.94021 14.32 6.05021C14.34 6.09021 14.32 6.20021 14.21 6.31021L14.08 6.29021C13.73 6.59021 13.32 6.86021 13.25 7.26021L13.58 7.20021L13.45 7.39021L13.34 7.29021C13.24 7.50021 13.41 7.41021 13.55 7.36021C13.47 7.45021 13.43 7.53021 13.42 7.58021L13.86 7.41021C13.74 7.55021 13.54 7.60021 13.54 7.75021C13.75 7.67021 13.79 7.42021 13.98 7.42021C13.88 7.62021 13.74 7.72021 13.94 7.67021C13.86 7.76021 13.79 7.80021 13.73 7.80021C13.89 7.77021 13.93 7.93021 14.14 7.80021C14.01 8.04021 14.39 7.97021 14.06 8.26021C14.16 8.21021 14.42 8.14021 14.49 8.19021C14 8.44021 14.67 8.43021 14.22 8.78021C14.64 8.54021 14.64 8.93021 14.96 8.89021C14.92 8.91021 14.85 8.94021 14.86 8.91021C14.9 9.02021 14.82 9.13021 14.8 9.25021C15.1 9.00021 15.28 9.07021 15.52 8.97021C15.33 9.32021 15.12 9.22021 14.88 9.49021C15.11 9.27021 15.27 9.45021 15.44 9.24021C15.33 9.47021 15.41 9.38021 15.2 9.64021C15.58 9.33021 15.32 9.66021 15.6 9.52021C15.52 9.79021 15.28 9.85021 15.5 9.87021C15.44 10.0302 15.21 10.0402 15.21 10.0402L15.32 9.97021ZM18.47 12.2902C18.47 12.2902 18.42 12.2602 18.41 12.2402C18.42 12.2402 18.44 12.2602 18.48 12.2902H18.47ZM18.68 12.5402C18.68 12.5402 18.63 12.4602 18.6 12.4302C18.67 12.3602 18.75 12.3002 18.77 12.3302C18.71 12.3602 18.72 12.4502 18.68 12.5402ZM19.72 10.7502C19.78 10.7602 19.75 10.8102 19.72 10.8502C19.7 10.8302 19.67 10.8202 19.64 10.8002L19.61 10.8202C19.61 10.8202 19.7 10.7602 19.73 10.7402L19.72 10.7502Z">
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
<svg class="svg-1" width="103" height="112" viewBox="0 0 103 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50.549 38.9701C50.549 38.8101 50.189 38.9001 49.969 38.8701C49.859 38.6801 50.239 38.7701 50.429 38.7001C50.329 38.5801 49.989 38.4901 49.999 38.4001C50.059 38.4001 50.079 38.3701 50.159 38.4001C49.859 38.2801 50.1389 38.0201 49.7689 37.8801C49.7989 37.8701 49.829 37.8601 49.859 37.8601C49.679 37.8901 49.489 37.8901 49.349 37.8901C49.349 37.8201 49.109 37.7601 49.349 37.7301C49.349 37.7801 49.4389 37.7801 49.5189 37.8001L49.409 37.7301C49.759 37.6601 49.529 37.8301 49.789 37.8301C49.669 37.6801 49.379 37.5101 49.479 37.4001C49.819 37.3701 49.599 37.6701 49.899 37.5101L49.7689 37.6901C50.2989 37.5501 49.7289 37.8001 50.3089 37.6601C50.3989 37.4301 50.129 37.4001 50.229 37.1701C50.039 37.1201 49.949 37.1901 49.759 37.1401C49.419 36.8101 50.609 36.8701 50.159 36.6301C49.929 36.5701 49.499 36.5501 49.729 36.3701L50.109 36.4201C50.149 36.1901 49.5589 36.3001 49.8089 36.0601C49.9589 36.1001 49.939 36.2401 49.979 36.2001C50.279 36.0401 49.759 36.0901 49.759 35.9801L50.099 35.9501C50.039 35.7101 49.799 35.4501 49.729 35.1801C49.829 35.1901 49.939 35.2401 50.039 35.1801C49.869 34.8501 50.069 34.4601 50.279 34.1401L49.9889 34.0201C49.9889 34.0201 50.119 33.9701 50.179 34.0001C50.289 33.8701 49.9889 34.0001 49.8789 33.9301C49.8589 33.8601 50.049 33.8301 50.139 33.8801C49.889 33.6601 49.599 33.2501 49.919 33.0101L50.009 33.0601C50.129 32.8801 49.409 32.8501 49.679 32.6801L49.729 32.7101C49.859 32.3101 49.589 31.8701 50.039 31.5701C49.619 31.5101 50.229 31.1801 49.639 31.1501C49.929 30.9301 50.0389 30.9901 50.2389 30.6701C50.2689 30.5901 49.8689 30.5401 49.8089 30.4301H50.119L49.799 30.2801L50.169 30.2101L50.0889 30.1101C50.0889 30.1101 49.949 30.1901 49.859 30.1901C49.719 30.0301 50.0789 29.8201 50.2389 29.8101L49.979 29.4401C50.099 29.4401 50.149 29.5101 50.219 29.5601C49.909 29.3601 50.549 29.5301 50.259 29.3501C50.189 29.3701 50.079 29.3301 50.009 29.3301C50.199 29.2401 50.1989 29.0401 50.1289 28.8901L50.3389 28.9201C50.3989 28.6501 50.249 28.3501 50.259 28.0401C50.159 28.1501 49.789 28.1201 49.759 28.0301L50.0889 28.0001C49.8889 27.9401 49.959 28.0901 49.719 27.9701C49.759 27.8601 50.0889 27.9001 50.1989 27.9701L50.0889 27.8301C50.1889 27.8301 50.239 27.8601 50.359 27.8701C50.159 27.8101 50.6889 27.6401 50.3389 27.5501H50.439C50.439 27.2401 50.339 27.1001 50.329 26.8501C50.049 26.8401 50.109 26.7401 49.889 26.6601C49.979 26.4801 50.209 26.2801 50.189 26.0601C50.049 25.9001 49.949 26.0101 49.789 25.9301C50.049 25.9301 50.029 25.7101 50.209 25.8201C50.179 25.5601 50.169 25.4801 49.969 25.1401C49.859 25.1701 49.819 25.2101 49.729 25.1901C49.689 25.1301 49.839 25.0601 49.959 25.0701L49.9889 25.0901C49.6189 24.7001 50.7589 24.2501 50.2389 23.9401L50.2689 23.9601L49.999 23.6401C50.049 23.5001 50.189 23.7301 50.349 23.6401C49.939 23.2901 50.429 23.1201 50.159 22.8301C50.919 22.6501 50.1389 22.0801 50.6289 21.8101H50.4489C50.2789 21.7401 50.559 21.7301 50.599 21.6801C50.459 21.6801 50.4389 21.7501 50.3389 21.7001C50.1489 21.0601 50.659 20.4201 50.849 19.7901C50.909 19.5601 49.9389 19.6101 50.3789 19.3401L50.709 19.4401C50.339 18.9501 50.769 18.4701 50.469 17.9901C50.539 18.0201 50.639 18.0301 50.639 18.0701C50.889 17.9901 50.669 17.7101 50.479 17.7001C50.509 17.6301 50.659 17.7001 50.759 17.6501C50.909 17.5601 50.469 17.3901 50.709 17.3501C50.749 17.3501 50.789 17.3801 50.799 17.4001C50.689 17.3301 50.849 17.1001 50.569 17.1501C50.709 16.9801 50.469 16.8101 50.639 16.6801C50.339 16.5701 50.809 16.3901 50.369 16.3401C50.819 16.3801 50.749 16.0601 50.549 15.9401C50.679 15.9901 50.6989 15.8501 50.8789 15.9101C50.8789 15.7801 50.809 15.6601 50.569 15.6701C51.129 15.4801 50.169 15.1801 50.869 15.0901C50.649 14.7001 50.509 14.3501 50.429 14.0001C50.879 14.0401 50.449 14.3701 50.919 14.3901C50.7589 14.0601 50.379 13.8501 50.509 13.5401C50.579 13.4601 50.699 13.6001 50.779 13.6301C50.619 13.3001 50.869 13.0201 50.639 12.7201C50.679 12.7201 50.729 12.7601 50.759 12.7901C50.749 12.7301 50.8389 12.6701 50.6289 12.6601L50.679 12.7201C50.379 12.7901 50.079 12.4501 49.919 12.4301C50.499 12.5701 50.089 12.1601 50.819 12.3701C50.779 12.3301 50.689 12.2801 50.549 12.2701C50.589 12.2201 50.679 12.2101 50.829 12.2701C50.729 12.0601 50.509 12.1201 50.529 11.9401C50.629 11.9401 50.659 11.9901 50.779 12.0201C50.589 11.9101 50.409 11.8101 50.499 11.6601C50.559 11.6701 50.6389 11.6601 50.6289 11.7101C50.6289 11.4501 50.149 11.2201 50.359 10.9501C50.779 11.0701 50.5089 10.8601 50.8789 10.8801L50.779 10.7201L50.5889 10.7701C50.6089 10.6401 50.349 10.4901 50.479 10.3901L50.619 10.5001L50.569 10.2401L50.419 10.3701C50.239 10.2201 49.949 10.3401 50.069 10.1701C50.099 10.2101 50.0889 10.0301 50.3089 9.98006C50.1989 9.90006 50.079 9.82006 50.179 9.73006C50.299 9.71006 50.589 9.79006 50.669 9.78006C50.369 9.69006 50.609 9.46006 50.289 9.34006C50.369 9.37006 50.559 9.39006 50.599 9.39006L50.349 9.31006C50.439 9.25006 50.4789 9.25006 50.6289 9.27006C50.6889 9.09006 50.1489 9.29006 50.3789 9.08006C50.3989 9.10006 50.439 9.09006 50.469 9.13006C50.599 8.91006 50.3489 8.68006 50.4889 8.48006C50.8689 8.45006 50.569 8.67006 50.889 8.63006C50.849 8.33006 50.499 7.97006 50.609 7.69006L50.5589 7.74006C50.0389 7.65006 50.839 7.55006 50.609 7.38006C50.649 7.42006 50.8989 7.46006 50.8389 7.44006C50.9389 7.25006 50.749 7.02006 50.609 6.71006L50.7389 6.76006C50.8689 6.66006 50.839 6.46006 50.909 6.34006C50.779 6.29006 50.809 6.22006 50.609 6.24006C51.419 5.93006 50.2689 5.46006 50.9489 5.18006C50.9489 5.22006 51.0589 5.29006 51.0589 5.26006L50.969 4.95006C50.739 4.95006 50.829 4.97006 50.639 5.02006C50.509 4.97006 50.409 4.87006 50.419 4.80006C50.559 4.95006 50.7889 4.84006 50.919 4.80006C50.849 4.80006 50.7689 4.77006 50.6989 4.77006C51.1289 4.66006 50.239 4.69006 50.539 4.52006L50.659 4.54006C50.609 4.46006 50.459 4.37006 50.499 4.29006C50.769 4.29006 50.609 4.39006 50.829 4.42006C50.829 4.30006 50.3489 4.13006 50.6289 4.05006C50.6989 4.11006 50.689 4.18006 50.759 4.24006C51.079 4.16006 51.009 4.14006 51.069 4.05006L51.229 3.87006L51.139 3.91006C50.459 3.69006 51.049 3.59006 50.609 3.34006C51.019 3.58006 50.849 3.40006 51.149 3.45006C51.239 3.41006 51.339 3.34006 51.419 3.37006C51.189 3.25006 51.629 3.23006 51.289 3.06006C51.389 3.06006 51.309 2.96006 51.549 3.01006C51.489 2.88006 51.379 3.01006 51.259 3.00006C50.949 2.77006 51.709 2.60006 51.289 2.28006C51.129 2.02006 50.809 1.94006 50.669 1.71006C50.829 1.65006 51.0189 1.81006 51.0189 1.81006C51.1789 1.71006 51.1589 1.62006 51.0589 1.49006C51.1389 1.52006 51.219 1.51006 51.329 1.49006C51.319 1.40006 50.979 1.39006 51.139 1.29006C51.249 1.32006 51.4189 1.37006 51.5189 1.43006C51.4389 1.31006 51.2789 1.19006 51.1989 1.07006C51.3689 1.07006 51.449 1.17006 51.549 1.22006C51.489 1.09006 51.439 0.880059 51.169 0.810059L51.069 0.880059C51.069 0.880059 51.299 0.880059 51.349 0.920059C51.549 1.05006 51.239 1.06006 51.139 1.05006L51.0889 0.960059C50.5089 0.970059 51.1389 1.28006 51.0889 1.44006L50.679 1.33006L50.999 1.53006C50.889 1.55006 50.649 1.55006 50.599 1.46006C50.379 1.55006 50.739 1.58006 50.499 1.65006C50.459 1.65006 50.439 1.65006 50.429 1.64006L50.539 1.76006C50.459 1.73006 50.2489 1.74006 50.3089 1.68006C50.0489 1.85006 50.579 2.03006 50.259 2.07006L50.2389 2.05006C50.3489 2.34006 50.539 2.11006 50.869 2.36006L50.109 2.41006L50.409 2.47006C50.409 2.47006 50.369 2.55006 50.249 2.53006C50.449 2.66006 50.379 2.53006 50.569 2.61006C50.279 2.71006 50.659 3.00006 50.169 2.98006C50.399 3.05006 50.359 2.87006 50.509 3.03006C49.989 3.01006 50.579 3.21006 50.329 3.31006C50.069 3.24006 50.219 3.14006 49.969 3.24006C50.419 3.37006 49.839 3.47006 49.919 3.59006C50.279 3.63006 50.049 3.83006 50.149 4.02006C50.029 4.00006 49.9189 4.33006 49.7689 4.48006H49.709C50.069 4.54006 49.979 4.70006 50.049 4.83006C49.829 4.80006 49.749 4.77006 49.659 4.69006V4.81006C49.759 4.85006 49.819 4.89006 49.849 4.97006L49.579 4.91006C49.579 5.07006 49.869 5.25006 49.659 5.43006C49.909 5.47006 50.379 5.35006 50.529 5.57006C50.389 5.57006 50.159 5.55006 50.099 5.49006C50.119 5.51006 50.209 5.57006 50.149 5.60006L49.929 5.49006C49.819 5.57006 50.1189 5.56006 50.0889 5.63006C49.8889 5.61006 49.939 5.67006 49.789 5.64006C49.769 5.62006 49.879 5.59006 49.799 5.55006C49.759 5.63006 49.629 5.71006 49.479 5.73006C49.589 5.73006 49.739 5.76006 49.759 5.82006C49.759 5.98006 49.519 5.85006 49.409 5.93006C49.539 5.98006 49.389 6.07006 49.679 6.10006C49.679 6.14006 49.5389 6.14006 49.4489 6.15006C49.5689 6.24006 49.4489 6.53006 49.7689 6.47006L49.789 6.45006H49.799V6.46006C50.069 6.75006 49.579 6.99006 49.679 7.26006H49.579C49.679 7.42006 49.6089 7.60006 49.8089 7.73006C49.8089 7.78006 49.619 7.82006 49.499 7.79006C49.559 7.92006 49.669 7.94006 49.499 8.09006C49.339 7.95006 49.339 8.12006 49.389 7.96006C49.289 8.11006 49.129 8.13006 49.389 8.32006C49.139 8.24006 49.0589 8.41006 49.1289 8.49006L49.319 8.40006C49.349 8.49006 49.319 8.56006 49.289 8.63006L48.959 8.56006C48.529 8.84006 49.599 9.19006 48.899 9.37006C49.119 9.47006 49.0789 9.21006 49.3389 9.31006C49.2789 9.45006 48.789 9.56006 48.789 9.61006C48.589 9.79006 49.259 9.84006 49.109 10.0301C49.229 10.0101 49.549 10.0201 49.649 10.1801C49.589 10.3201 49.139 10.3201 49.049 10.2201C49.049 10.1801 49.079 10.1701 49.119 10.1801C49.079 10.1301 49.039 10.0601 48.899 10.1101L49.0189 10.1401C48.8889 10.2001 48.8889 10.4001 48.6989 10.3401C48.7989 10.4601 48.889 10.4001 48.959 10.3301C48.769 10.5001 48.929 10.6201 48.799 10.8001C48.869 10.7701 49.009 10.7601 49.009 10.7901C48.839 11.0601 49.219 10.9301 49.259 11.1301C49.069 11.2201 48.829 11.0601 48.969 11.2601C48.839 11.3701 48.6489 11.2601 48.5589 11.2001C48.7689 11.3901 48.379 11.5101 48.329 11.6101L48.2389 11.5101C48.2889 11.5701 48.289 11.6101 48.279 11.6601L48.5189 11.6301C48.4689 11.6801 48.469 11.7301 48.369 11.7201C48.519 11.7901 48.769 11.7101 48.969 11.8401C48.839 11.9001 49.0789 12.0701 48.7689 12.0701C48.8889 11.8501 48.449 12.0701 48.419 11.8701C48.449 11.9101 48.449 11.9601 48.399 12.0101C48.359 12.0101 48.339 12.0001 48.319 11.9801C48.019 12.1801 48.669 12.1101 48.639 12.3301C48.469 12.2901 48.2989 12.3601 48.3389 12.4001C48.3489 12.3101 48.6389 12.3801 48.7689 12.4701C48.6189 12.6001 48.8589 12.6301 48.8389 12.7101L48.909 12.6301C49.079 12.6701 49.059 12.7401 49.099 12.8501C48.959 12.8501 49.0089 12.7501 48.9489 12.7801C49.2489 12.9201 48.6089 13.0101 48.8089 13.1801C48.6789 13.2401 48.479 13.1601 48.389 13.2201C48.609 13.4101 48.1289 13.3901 48.3089 13.5901C48.5489 13.5501 48.489 13.5401 48.719 13.6901L48.569 13.3801L48.899 13.6001C48.899 13.5101 48.7589 13.4001 48.8089 13.3501C48.9989 13.4601 48.939 13.4401 49.139 13.4101C48.769 13.5101 49.329 13.6701 49.079 13.8001L48.4889 13.7501C48.2089 13.9501 48.769 14.1601 48.599 14.4301L48.709 14.3501C48.939 14.4001 48.729 14.5301 48.819 14.6201C48.619 14.6001 48.549 14.6501 48.419 14.6801C48.569 14.6801 48.389 14.8801 48.779 14.9401L48.509 15.0501C48.389 15.2701 49.049 15.3501 48.969 15.5601C48.759 15.4801 48.609 15.5701 48.469 15.4101C48.469 15.4801 48.4189 15.5501 48.5589 15.5601C48.4289 15.5901 48.809 15.7801 48.619 15.8301C48.699 15.8701 48.909 15.8901 48.889 15.9701C48.849 15.9701 48.789 15.9701 48.789 15.9701C48.889 15.9701 48.909 16.1101 49.139 16.0501C48.509 16.2401 49.139 16.6801 48.609 16.8401C48.669 17.0001 48.719 17.2001 48.719 17.3401C48.659 17.3301 48.619 17.3401 48.639 17.3101C48.439 17.5001 49.199 17.4701 48.979 17.6801C48.649 17.7801 48.809 17.5501 48.689 17.6101C48.039 17.6101 48.759 17.8901 48.369 18.0201L48.329 17.9801C48.099 18.0801 48.559 18.2801 48.499 18.4701C48.499 18.4701 48.439 18.4601 48.399 18.4701C48.719 18.6201 48.819 18.8701 48.899 19.0601C48.649 18.9901 48.769 18.9701 48.509 18.9901C48.539 19.0701 48.9289 18.9901 48.9889 19.1601C48.8489 19.2101 48.7189 19.3201 48.4489 19.3201V19.1601C48.0789 19.2201 48.4489 19.3601 48.3789 19.4401L48.219 19.4201C48.259 19.6601 48.649 19.6801 48.609 19.9401L48.729 19.9201C49.109 20.0801 48.509 20.0301 48.789 20.1801L48.389 20.2001C48.479 20.3001 48.759 20.5401 48.819 20.7101C48.529 20.6001 48.389 20.4001 48.219 20.2801C48.219 20.3701 48.229 20.5901 48.429 20.6501C48.389 20.6101 48.299 20.5601 48.359 20.5301C48.659 20.6601 48.809 20.8101 48.789 20.9901C48.029 20.9201 48.569 21.4501 47.979 21.5601C48.249 21.8901 47.829 22.1901 47.869 22.5701C48.469 22.4601 47.8789 22.6801 48.4889 22.6801C48.5289 22.7701 48.509 22.8001 48.469 22.8101L48.0889 23.0601C47.9089 23.1201 47.959 22.9701 47.819 22.9701C47.769 23.1601 47.559 23.0401 47.389 23.1601C47.609 23.1401 47.699 23.2401 47.609 23.3401L47.899 23.2001C48.209 23.4801 47.379 23.4101 47.689 23.6901L47.499 23.6001C47.609 23.7401 47.479 24.1101 47.959 24.2601C47.889 24.2801 47.719 24.3101 47.679 24.2501C47.599 24.5801 48.179 25.0001 47.869 25.2501L47.719 25.2201C47.759 25.2801 47.9989 25.3401 47.8389 25.4101C47.7789 25.4101 47.689 25.3801 47.679 25.4101C47.729 25.4401 47.939 25.5801 47.849 25.6601L47.679 25.5901C47.469 25.9101 48.079 26.1001 48.169 26.3701C47.729 26.3601 47.579 26.6101 47.509 26.7301H47.4489C47.3889 27.1001 47.799 27.3701 47.969 27.7201C47.489 27.9301 47.759 28.4501 47.479 28.7901C47.559 28.7401 47.819 28.8001 47.869 28.8701C47.779 28.9501 48.1689 29.1001 47.7689 29.0801V29.0501C47.3789 29.1101 47.479 29.2701 47.469 29.4001L47.999 29.4301C47.229 29.7601 48.269 30.3301 47.579 30.5101C47.709 30.5901 47.7089 30.7001 47.8389 30.7801H47.5589C47.4889 31.0001 47.449 31.1101 47.509 31.4001L47.3089 31.3401C47.2889 31.5001 48.119 31.5501 48.139 31.6901L47.719 31.7301C47.719 32.0101 47.3489 32.2901 47.7389 32.5601C47.6789 32.5601 47.559 32.5501 47.539 32.5001C47.529 32.6301 47.249 33.0101 47.829 32.9601C47.449 32.9601 47.789 33.2501 47.959 33.4001L47.679 33.3801C48.039 33.5101 48.129 33.5101 48.229 33.6901C48.189 33.7301 48.009 33.7301 48.079 33.6701C47.929 33.8101 48.3389 33.7801 48.1989 33.9501L48.0189 33.8901C47.9989 34.0301 48.089 34.0201 48.299 34.1001C48.409 34.1901 48.229 34.3701 47.979 34.3901C48.129 34.4101 48.3389 34.4901 48.2689 34.5701C48.1689 34.5801 48.1189 34.5501 48.0889 34.5401C47.8989 34.7801 48.419 34.8901 48.139 35.0601C48.049 35.0601 47.999 35.0801 47.969 35.0901C47.969 34.9001 47.989 34.7501 48.009 34.7601C47.749 34.7601 47.709 34.9201 47.349 34.8001C47.539 34.9201 47.969 35.1301 47.849 35.2801C47.829 35.2801 47.799 35.2901 47.759 35.3001L47.729 35.2801C47.729 35.2801 47.7289 35.3501 47.7689 35.3701C47.7289 35.4201 47.699 35.4501 47.689 35.5001C47.479 35.5201 47.579 35.6801 47.569 35.7501C47.849 35.7501 47.809 35.8401 48.039 35.7501C48.019 35.7601 48.0089 35.7401 47.9889 35.6801C47.9889 35.6701 47.979 35.6501 47.959 35.6501H47.979C47.979 35.6501 47.959 35.5401 47.959 35.4601C48.099 35.5201 48.219 35.5801 48.069 35.6701C48.249 35.7101 48.4389 35.7501 48.5189 35.7701C48.1289 35.8801 47.919 36.0801 47.679 36.1101C47.839 36.3401 47.789 36.6601 48.319 36.8001C48.389 36.8701 48.1689 36.8801 48.0889 36.9001C48.0389 36.8601 48.039 36.8201 47.969 36.8001C48.109 36.9301 48.029 37.1901 48.399 37.2201C48.239 37.3901 48.059 37.1301 48.119 37.3601L48.009 37.3301C47.429 37.7901 48.969 38.0501 48.219 38.5701C48.269 38.5301 48.289 38.5201 48.349 38.5101C48.029 39.0901 48.679 39.6801 48.169 40.2601C48.069 40.4201 48.2989 40.4301 48.4889 40.5301L48.189 40.5701L48.539 40.7301C48.799 40.9601 47.809 41.1601 48.299 41.4501L48.499 41.4001C48.459 41.5101 48.629 41.7401 48.399 41.7301C48.439 41.7301 48.609 41.7601 48.509 41.8001H48.349L48.6289 42.0701C48.5189 42.2801 47.999 42.0601 47.979 42.3601C48.039 42.4701 48.449 42.6601 48.549 42.6201C48.549 42.5701 48.639 42.5001 48.799 42.4901L48.889 42.5901C49.359 42.5901 49.829 42.6501 50.149 42.3901L49.859 42.2301L50.079 42.1701L50.099 42.3201C50.309 42.2301 50.1189 42.1801 49.9889 42.1301C50.1089 42.1101 50.1889 42.0801 50.2389 42.0501L49.789 41.8901C49.969 41.8601 50.149 41.9501 50.249 41.8401C50.039 41.7701 49.8389 41.9301 49.6989 41.8001C49.9089 41.7101 50.079 41.7301 49.899 41.6401C50.019 41.6201 50.099 41.6401 50.149 41.6801C49.999 41.6001 50.079 41.4501 49.829 41.4201C50.089 41.3301 49.749 41.1301 50.189 41.1201C50.079 41.1001 49.839 40.9801 49.819 40.9001C50.349 41.0301 49.839 40.6001 50.409 40.6201C49.929 40.5301 50.189 40.2401 49.919 40.0501C49.959 40.0501 50.029 40.0801 50.009 40.1001C50.049 39.9901 50.189 39.9601 50.279 39.8901C49.889 39.8901 49.799 39.7201 49.549 39.6401C49.929 39.5001 50.009 39.7101 50.369 39.6601C50.049 39.6701 50.049 39.4401 49.779 39.4901C50.009 39.3801 49.889 39.4001 50.219 39.3401C49.729 39.3401 50.139 39.2501 49.829 39.1701C50.069 39.0201 50.289 39.1201 50.139 38.9701C50.289 38.8901 50.469 39.0301 50.469 39.0301L50.549 38.9701ZM49.639 35.1701C49.639 35.1701 49.649 35.2301 49.659 35.2501C49.659 35.2301 49.649 35.2101 49.639 35.1701ZM49.639 34.8501C49.639 34.8501 49.629 34.9401 49.639 34.9901C49.539 35.0001 49.4389 34.9901 49.4489 34.9601C49.5089 34.9801 49.569 34.9001 49.649 34.8501H49.639ZM47.6989 35.5501C47.6589 35.5001 47.7089 35.4801 47.7689 35.4701C47.7689 35.4901 47.779 35.5201 47.799 35.5601H47.829C47.779 35.5601 47.729 35.5601 47.689 35.5501H47.6989Z" />
<path d="M67.1515 42.1C67.3015 42 67.0215 41.75 66.9315 41.56C67.0515 41.35 67.1715 41.73 67.3315 41.84C67.3915 41.68 67.2815 41.34 67.3715 41.3C67.4115 41.35 67.4415 41.35 67.4615 41.43C67.4115 41.11 67.8015 41.18 67.7315 40.78C67.7615 40.8 67.7815 40.82 67.8015 40.84C67.6715 40.7 67.5615 40.55 67.4915 40.44C67.5515 40.39 67.4915 40.16 67.6415 40.34C67.5915 40.36 67.6415 40.44 67.6715 40.52V40.39C67.9415 40.63 67.6515 40.55 67.8015 40.77C67.8715 40.58 67.8715 40.24 68.0315 40.25C68.2415 40.52 67.8515 40.51 68.1615 40.67H67.9215C68.3515 41.03 67.8015 40.71 68.2415 41.11C68.5115 41.05 68.3815 40.8 68.6515 40.74C68.5915 40.55 68.4815 40.52 68.4215 40.33C68.5315 39.84 69.1415 40.87 69.1115 40.35C69.0415 40.12 68.8215 39.75 69.1115 39.83L69.2715 40.18C69.5015 40.07 69.0815 39.64 69.4415 39.71C69.4915 39.86 69.3515 39.93 69.4115 39.94C69.7215 40.09 69.3915 39.69 69.4915 39.62L69.7015 39.89C69.8915 39.7 70.0015 39.33 70.2015 39.11C70.2415 39.2 70.2615 39.32 70.3815 39.37C70.5915 39.02 71.0615 38.96 71.4715 38.92L71.4215 38.6C71.4215 38.6 71.5415 38.68 71.5515 38.74C71.7315 38.75 71.4515 38.58 71.4415 38.45C71.4915 38.39 71.6215 38.53 71.6315 38.63C71.6915 38.29 71.9115 37.79 72.3015 37.9V38C72.5415 37.98 72.1615 37.37 72.4715 37.49V37.55C72.9015 37.41 73.1615 36.91 73.6815 37.09C73.4915 36.7 74.1515 37 73.8415 36.5C74.2115 36.6 74.2115 36.73 74.6215 36.69C74.7115 36.66 74.5315 36.31 74.5915 36.19L74.7715 36.44L74.7215 36.08L75.0015 36.34L75.0515 36.21C75.0515 36.21 74.9015 36.15 74.8515 36.07C74.9115 35.86 75.3215 36.01 75.4115 36.14L75.6015 35.7C75.6615 35.81 75.6315 35.88 75.6315 35.98C75.6315 35.6 75.8515 36.23 75.8515 35.88C75.7915 35.84 75.7615 35.72 75.7315 35.67C75.9215 35.77 76.1015 35.64 76.2015 35.48L76.2915 35.67C76.5715 35.55 76.7615 35.23 77.0415 35.04C76.8815 35.03 76.7015 34.71 76.7615 34.62L76.9815 34.87C76.9215 34.67 76.8315 34.83 76.7915 34.55C76.9215 34.51 77.0715 34.81 77.0715 34.94L77.1315 34.76C77.1915 34.84 77.1915 34.9 77.2515 35.01C77.1915 34.81 77.6515 35.13 77.5315 34.79L77.5915 34.87C77.8715 34.68 77.9315 34.5 78.1515 34.34C78.0015 34.1 78.1215 34.1 78.0615 33.86C78.2815 33.82 78.5915 33.88 78.7715 33.72C78.8315 33.51 78.6815 33.5 78.6515 33.31C78.8015 33.51 78.9915 33.36 78.9915 33.58C79.2115 33.38 79.2715 33.33 79.4615 32.95C79.3715 32.89 79.3015 32.87 79.2715 32.79C79.3015 32.72 79.4615 32.79 79.5215 32.9V32.93C79.6515 32.38 80.7315 33.01 80.7015 32.38V32.41L80.8315 31.99C80.9915 31.94 80.8615 32.2 81.0515 32.27C81.1115 31.71 81.5715 31.99 81.6615 31.59C82.2815 32.08 82.3215 31.08 82.8515 31.3L82.7315 31.16C82.7015 30.97 82.8715 31.19 82.9415 31.19C82.8615 31.08 82.7815 31.11 82.7615 31C83.2115 30.43 84.0915 30.41 84.7715 30.14C85.0115 30.03 84.3715 29.3 84.8815 29.46L84.9915 29.79C85.2015 29.17 85.8915 29.2 86.1215 28.63C86.1415 28.71 86.1915 28.79 86.1515 28.82C86.3815 28.96 86.4915 28.6 86.3815 28.44C86.4615 28.41 86.5015 28.58 86.5915 28.63C86.7615 28.69 86.6415 28.22 86.8315 28.39C86.8615 28.42 86.8515 28.47 86.8415 28.5C86.8415 28.36 87.1315 28.34 86.9215 28.15C87.1515 28.15 87.1615 27.84 87.3815 27.89C87.2915 27.58 87.7415 27.83 87.5215 27.45C87.7615 27.83 88.0115 27.56 87.9915 27.32C88.0315 27.46 88.1615 27.38 88.2215 27.56C88.3315 27.48 88.3915 27.33 88.2415 27.16C88.7615 27.46 88.4215 26.51 88.9315 27C89.1415 26.57 89.3615 26.21 89.6115 25.92C89.8515 26.3 89.2915 26.19 89.5715 26.57C89.7615 26.22 89.7115 25.78 90.0615 25.67C90.1715 25.67 90.1315 25.86 90.1515 25.94C90.3415 25.59 90.7415 25.59 90.8615 25.21C90.8815 25.25 90.8815 25.3 90.8715 25.35C90.9115 25.3 91.0315 25.33 90.9015 25.16L90.8815 25.24C90.6315 25.05 90.7315 24.59 90.6615 24.45C90.9015 25 91.0015 24.4 91.2715 25.11C91.2815 25.06 91.2715 24.95 91.1915 24.84C91.2615 24.84 91.3215 24.9 91.3615 25.06C91.4815 24.84 91.2915 24.71 91.4615 24.6C91.5115 24.68 91.5015 24.74 91.5515 24.85C91.5315 24.63 91.5015 24.42 91.6915 24.39C91.7115 24.45 91.7715 24.5 91.7315 24.53C91.9515 24.35 91.8615 23.83 92.2315 23.82C92.3815 24.23 92.4015 23.88 92.6115 24.19L92.6915 24.01L92.5415 23.89C92.6715 23.82 92.6415 23.51 92.8115 23.55V23.74L93.0015 23.54L92.7915 23.5C92.8215 23.26 92.5315 23.11 92.7515 23.09C92.7415 23.14 92.8815 23.02 93.0615 23.16C93.0615 23.02 93.0615 22.87 93.2115 22.9C93.3015 22.99 93.4015 23.27 93.4615 23.33C93.3615 23.02 93.7215 23.08 93.6315 22.75C93.6415 22.83 93.7415 23 93.7715 23.03L93.7015 22.78C93.8015 22.82 93.8315 22.85 93.9015 22.99C94.1015 22.93 93.6115 22.61 93.9215 22.67C93.9215 22.7 93.9415 22.73 93.9215 22.78C94.1815 22.75 94.2615 22.41 94.5215 22.41C94.7515 22.71 94.3915 22.58 94.6115 22.83C94.8615 22.62 94.9915 22.12 95.3215 22.06H95.2515C95.0615 21.55 95.5715 22.18 95.6115 21.89C95.5915 21.94 95.6915 22.18 95.6715 22.12C95.9015 22.1 96.0115 21.83 96.2515 21.54L96.2715 21.68C96.4315 21.75 96.6015 21.61 96.7515 21.63C96.7415 21.49 96.8215 21.48 96.7015 21.31C97.3515 21.89 97.3215 20.64 97.8815 21.15C97.8415 21.16 97.8115 21.29 97.8515 21.28L98.1115 21.07C98.0215 20.85 98.0315 20.95 97.9215 20.79C97.9215 20.65 97.9815 20.52 98.0615 20.49C97.9615 20.68 98.1615 20.84 98.2515 20.96C98.2215 20.89 98.2215 20.81 98.2015 20.75C98.4615 21.11 98.1115 20.29 98.4015 20.51L98.4215 20.63C98.4915 20.55 98.5315 20.38 98.6315 20.39C98.7215 20.64 98.5715 20.53 98.6115 20.75C98.7315 20.71 98.7515 20.2 98.9215 20.43C98.8815 20.52 98.8015 20.53 98.7715 20.62C98.9615 20.9 98.9515 20.81 99.0515 20.85H99.0415L99.2715 20.95L99.2015 20.87C99.2415 20.16 99.4915 20.7 99.6515 20.21C99.5015 20.67 99.6515 20.46 99.6715 20.77C99.7315 20.84 99.8215 20.93 99.8115 21.01C99.8815 20.75 99.9915 21.19 100.091 20.82C100.101 20.92 100.191 20.82 100.191 21.07C100.311 20.98 100.151 20.9 100.151 20.78C100.331 20.44 100.621 21.14 100.891 20.7C101.131 20.52 101.191 20.19 101.451 20.03C101.521 20.19 101.361 20.38 101.361 20.38C101.481 20.52 101.571 20.52 101.701 20.42C101.671 20.5 101.691 20.58 101.711 20.69C101.801 20.67 101.811 20.34 101.921 20.5C101.891 20.61 101.841 20.78 101.781 20.88C101.901 20.8 102.031 20.63 102.161 20.56C102.161 20.73 102.051 20.81 102.001 20.91C102.141 20.84 102.341 20.81 102.431 20.55L102.361 20.44C102.361 20.44 102.341 20.67 102.301 20.71C102.161 20.89 102.161 20.59 102.171 20.49L102.261 20.44C102.261 19.86 101.911 20.49 101.751 20.44L101.871 20.03L101.661 20.35C101.631 20.24 101.631 20 101.721 19.95C101.611 19.73 101.601 20.08 101.511 19.84C101.511 19.8 101.511 19.78 101.511 19.77L101.381 19.89C101.411 19.8 101.381 19.6 101.451 19.66C101.231 19.42 101.071 19.97 100.991 19.65L101.011 19.62C100.691 19.76 100.971 19.93 100.751 20.28L100.581 19.52L100.561 19.83C100.561 19.83 100.461 19.8 100.471 19.68C100.361 19.9 100.501 19.81 100.441 20.01C100.271 19.74 100.031 20.17 99.9615 19.69C99.9315 19.93 100.121 19.86 99.9715 20.03C99.8715 19.52 99.7915 20.13 99.6315 19.91C99.6315 19.64 99.7915 19.76 99.6315 19.54C99.6015 20.01 99.3415 19.48 99.2315 19.59C99.2815 19.95 98.9915 19.78 98.8215 19.93C98.8115 19.81 98.4115 19.82 98.1915 19.74V19.68C98.2315 20.05 98.0315 20.02 97.9115 20.13C97.8615 19.92 97.8615 19.82 97.9115 19.71L97.7815 19.75C97.7815 19.87 97.7615 19.94 97.6915 20.01L97.6515 19.74C97.4815 19.81 97.4015 20.15 97.1215 20.05C97.1915 20.3 97.5115 20.68 97.3415 20.91C97.2915 20.78 97.2015 20.56 97.2515 20.49C97.2415 20.51 97.2215 20.62 97.1615 20.58L97.1815 20.33C97.0515 20.26 97.1915 20.53 97.1115 20.54C97.0515 20.35 97.0115 20.43 96.9715 20.28C96.9815 20.25 97.0615 20.33 97.0715 20.25C96.9715 20.25 96.8315 20.18 96.7415 20.05C96.7915 20.15 96.8315 20.3 96.7715 20.35C96.6115 20.42 96.6315 20.15 96.5015 20.09C96.5015 20.23 96.3515 20.14 96.4515 20.42C96.4015 20.44 96.3415 20.31 96.2915 20.24C96.2515 20.39 95.9015 20.43 96.1215 20.69H96.1515C96.1515 20.69 96.1515 20.71 96.1515 20.72C95.9915 21.11 95.5215 20.8 95.3015 21.04L95.2615 20.95C95.1515 21.13 94.9415 21.18 94.9215 21.42C94.8715 21.44 94.7315 21.31 94.7015 21.2C94.6115 21.33 94.6515 21.43 94.4015 21.37C94.4415 21.15 94.2915 21.26 94.4715 21.19C94.2815 21.19 94.1715 21.07 94.1315 21.4C94.0715 21.15 93.8615 21.18 93.8315 21.29L94.0215 21.39C93.9515 21.47 93.8715 21.48 93.7915 21.5L93.6715 21.19C93.1515 21.01 93.4415 22.11 92.8715 21.65C92.9015 21.9 93.1215 21.7 93.1815 21.97C93.0215 22.01 92.6215 21.68 92.5815 21.71C92.2915 21.67 92.6515 22.24 92.3815 22.25C92.4715 22.34 92.6515 22.59 92.5615 22.78C92.4015 22.83 92.1315 22.46 92.1715 22.32C92.2015 22.29 92.2315 22.32 92.2515 22.35C92.2715 22.29 92.3115 22.21 92.1815 22.13L92.2215 22.24C92.0915 22.18 91.9015 22.31 91.8415 22.11C91.7915 22.27 91.9015 22.3 92.0115 22.31C91.7415 22.27 91.7315 22.48 91.4815 22.5C91.5415 22.54 91.6515 22.64 91.6215 22.66C91.2715 22.71 91.6215 22.92 91.4715 23.08C91.2715 22.99 91.2715 22.69 91.1715 22.94C90.9915 22.91 90.9815 22.69 90.9715 22.58C90.9315 22.88 90.5815 22.66 90.4615 22.68L90.4915 22.54C90.4715 22.62 90.4315 22.65 90.3815 22.68L90.5615 22.85C90.4915 22.85 90.4415 22.88 90.3915 22.79C90.4215 22.95 90.6515 23.09 90.6615 23.34C90.5315 23.28 90.5315 23.58 90.3315 23.34C90.6015 23.29 90.1315 23.09 90.2815 22.93C90.2715 22.98 90.2215 23.01 90.1515 23.01C90.1215 22.99 90.1215 22.95 90.1215 22.93C89.7615 22.83 90.2215 23.29 90.0115 23.42C89.9415 23.25 89.7715 23.17 89.7615 23.23C89.8515 23.18 89.9715 23.45 89.9615 23.61C89.7515 23.59 89.8715 23.79 89.7915 23.83H89.9115C89.9815 24 89.9115 24.02 89.8415 24.13C89.7515 24.02 89.8715 23.99 89.8015 23.97C89.8715 24.3 89.3915 23.86 89.3615 24.13C89.2315 24.08 89.1715 23.86 89.0615 23.83C89.0315 24.13 88.7515 23.75 88.6915 24.02C88.8715 24.18 88.8515 24.13 88.8615 24.4L89.0415 24.07L89.0615 24.48C89.1515 24.43 89.1515 24.24 89.2215 24.24C89.2515 24.46 89.2215 24.4 89.3715 24.54C89.0515 24.32 89.2615 24.87 88.9915 24.76L88.6615 24.27C88.3115 24.19 88.4815 24.76 88.1415 24.81L88.2815 24.84C88.3815 25.06 88.1415 24.97 88.1115 25.11C88.0115 24.94 87.9115 24.92 87.8115 24.84C87.9015 24.96 87.6115 24.96 87.8115 25.3L87.5515 25.16C87.2815 25.21 87.6315 25.79 87.3915 25.87C87.3315 25.65 87.1615 25.6 87.2115 25.38C87.1415 25.42 87.0615 25.43 87.1415 25.55C87.0315 25.47 87.1115 25.9 86.9415 25.78C86.9615 25.87 87.0715 26.05 86.9815 26.09C86.9515 26.06 86.9315 26.01 86.9315 26.01C86.9815 26.09 86.8915 26.2 87.0815 26.34C86.5315 25.97 86.5315 26.77 86.0615 26.45C85.9515 26.6 85.8115 26.78 85.6915 26.88C85.6715 26.83 85.6415 26.8 85.6715 26.8C85.3815 26.77 85.8815 27.34 85.5615 27.32C85.2715 27.13 85.5715 27.1 85.4415 27.05C85.0515 26.53 85.2415 27.29 84.8915 27.07V27.02C84.6715 26.91 84.7815 27.4 84.5815 27.48C84.5815 27.48 84.5615 27.43 84.5315 27.4C84.6015 27.75 84.4315 28 84.3215 28.19C84.2315 27.94 84.3215 28.03 84.1415 27.84C84.0915 27.92 84.4015 28.17 84.2915 28.33C84.1615 28.25 83.9915 28.22 83.8215 28L83.9515 27.89C83.6815 27.64 83.7715 28.02 83.6615 28.02L83.5815 27.88C83.3915 28.07 83.6115 28.4 83.3615 28.53L83.4515 28.61C83.5415 29.02 83.2215 28.5 83.2615 28.83L83.0015 28.53C82.9715 28.67 82.9215 29.05 82.8115 29.21C82.7315 28.91 82.8215 28.67 82.8315 28.45C82.7515 28.5 82.5615 28.67 82.6315 28.86C82.6415 28.81 82.6315 28.7 82.7015 28.72C82.7715 29.05 82.7215 29.26 82.5615 29.37C82.1615 28.72 82.0215 29.5 81.5615 29.1C81.4315 29.53 80.9115 29.4 80.6015 29.67C81.0615 30.08 80.5115 29.75 80.8815 30.24C80.8215 30.33 80.7915 30.34 80.7615 30.31L80.3115 30.17C80.1515 30.06 80.3115 30.01 80.2315 29.9C80.0315 29.98 80.0115 29.74 79.8015 29.68C79.9515 29.84 79.9215 29.98 79.7715 29.98L80.0715 30.12C80.0115 30.55 79.5715 29.84 79.5115 30.27L79.4815 30.06C79.4215 30.24 79.0115 30.37 79.1715 30.86C79.1115 30.82 78.9815 30.7 79.0115 30.62C78.6715 30.76 78.6315 31.51 78.2315 31.42L78.1715 31.28C78.1415 31.35 78.2315 31.58 78.0815 31.5C78.0515 31.45 78.0215 31.36 77.9915 31.37C77.9915 31.43 77.9915 31.69 77.8715 31.67L77.8415 31.49C77.4415 31.53 77.6215 32.14 77.4315 32.39C77.1815 32.03 76.8715 32.06 76.7215 32.08L76.6915 32.03C76.3215 32.22 76.3215 32.73 76.1015 33.08C75.6315 32.82 75.3215 33.37 74.8615 33.36C74.9515 33.39 75.0515 33.65 75.0115 33.72C74.8915 33.7 74.9815 34.11 74.7615 33.77H74.7915C74.5115 33.47 74.4215 33.66 74.2915 33.73L74.5715 34.18C73.8315 33.76 73.9115 34.97 73.3615 34.51C73.3615 34.67 73.2715 34.73 73.2715 34.89L73.1115 34.65C72.8615 34.73 72.7415 34.77 72.5215 35L72.4615 34.8C72.3015 34.88 72.7415 35.6 72.6115 35.7L72.3315 35.38C72.0815 35.56 71.6215 35.43 71.5815 35.91C71.5515 35.86 71.4915 35.75 71.5215 35.71C71.3915 35.78 70.9015 35.79 71.2715 36.24C71.0515 35.93 70.9915 36.39 70.9515 36.62L70.8115 36.38C70.9015 36.75 70.9515 36.84 70.8415 37.03C70.7815 37.03 70.6815 36.87 70.7715 36.89C70.5615 36.86 70.8215 37.18 70.5815 37.16L70.5415 36.97C70.4015 37.04 70.4615 37.11 70.5115 37.33C70.4915 37.48 70.2215 37.44 70.0615 37.25C70.1315 37.39 70.1715 37.61 70.0615 37.6C70.0015 37.53 69.9915 37.46 69.9915 37.43C69.6615 37.43 69.8515 37.92 69.5415 37.8C69.4815 37.73 69.4515 37.69 69.4215 37.68C69.6015 37.57 69.7515 37.48 69.7415 37.51C69.6015 37.3 69.4315 37.36 69.3415 36.99C69.3415 37.23 69.3815 37.71 69.1815 37.7C69.1615 37.68 69.1415 37.67 69.1115 37.64V37.61C69.1115 37.61 69.0515 37.65 69.0415 37.7C68.9715 37.7 68.9315 37.69 68.8815 37.71C68.7415 37.55 68.6515 37.72 68.5815 37.76C68.7415 37.99 68.6315 38.01 68.8415 38.15C68.8215 38.15 68.8415 38.11 68.8715 38.07C68.8715 38.06 68.8915 38.04 68.8815 38.03V38.05C68.9315 38.01 68.9915 37.97 69.0515 37.92C69.0815 38.08 69.0915 38.21 68.9215 38.14C68.9815 38.32 69.0515 38.5 69.0815 38.58C68.7615 38.32 68.4615 38.27 68.3015 38.09C68.1815 38.37 67.8615 38.52 68.0215 39.05C68.0015 39.15 67.8615 38.97 67.8015 38.92C67.8015 38.85 67.8515 38.83 67.8315 38.75C67.7815 38.94 67.5015 39.04 67.6815 39.36C67.4315 39.33 67.5715 39.02 67.4015 39.21L67.3615 39.1C66.6115 38.89 67.2215 40.34 66.3315 40.02C66.3915 40.04 66.4215 40.04 66.4615 40.09C65.7515 40.17 65.5615 41.08 64.7515 41C64.5415 41.01 64.6615 41.22 64.6715 41.43L64.4715 41.2L64.5115 41.59C64.4415 41.95 63.7215 41.23 63.7115 41.82L63.8615 41.96C63.7415 42 63.6215 42.27 63.5015 42.07C63.5115 42.11 63.5915 42.27 63.4915 42.21L63.4015 42.08L63.3115 42.47C63.0615 42.5 62.9915 41.93 62.6915 42.09C62.6215 42.21 62.6615 42.67 62.7615 42.73C62.8115 42.71 62.9215 42.73 63.0115 42.87L62.9615 43C63.2115 43.4 63.4015 43.84 63.8115 43.95V43.61L63.9915 43.76L63.8615 43.86C64.0615 43.98 64.0015 43.8 63.9815 43.65C64.0615 43.74 64.1315 43.79 64.1915 43.81L64.1015 43.34C64.2215 43.48 64.2315 43.69 64.4015 43.7C64.3615 43.48 64.1015 43.41 64.1415 43.22C64.3415 43.34 64.4115 43.5 64.4015 43.29C64.4815 43.38 64.5015 43.46 64.5015 43.52C64.5015 43.35 64.6815 43.33 64.5815 43.09C64.8115 43.25 64.8115 42.85 65.0515 43.22C65.0215 43.12 65.0015 42.84 65.0515 42.77C65.2115 43.3 65.3415 42.61 65.6215 43.1C65.4515 42.64 65.8615 42.68 65.8915 42.35C65.9015 42.39 65.9315 42.46 65.8915 42.45C66.0115 42.42 66.1215 42.51 66.2315 42.54C66.0215 42.21 66.1315 42.03 66.0715 41.77C66.4015 42 66.2615 42.2 66.5015 42.47C66.3215 42.21 66.5315 42.06 66.3415 41.87C66.5615 42 66.4815 41.91 66.7115 42.15C66.4515 41.73 66.7515 42.02 66.6615 41.72C66.9315 41.83 66.9515 42.08 67.0215 41.85C67.1715 41.93 67.1415 42.16 67.1415 42.16L67.1515 42.1ZM70.1715 39.02C70.1715 39.02 70.1215 39.07 70.1115 39.09C70.1215 39.08 70.1415 39.06 70.1715 39.02ZM70.4615 38.82C70.4615 38.82 70.3715 38.86 70.3315 38.9C70.2615 38.83 70.2215 38.74 70.2515 38.72C70.2715 38.78 70.3715 38.78 70.4615 38.82ZM68.7415 37.63C68.7615 37.57 68.8115 37.6 68.8515 37.64C68.8315 37.66 68.8115 37.68 68.7915 37.72V37.75C68.7915 37.75 68.7515 37.66 68.7415 37.62V37.63Z"/>
<path d="M42.6016 75.9301C42.6016 76.0801 42.9616 75.9901 43.1816 76.0101C43.2916 76.1801 42.9116 76.1001 42.7216 76.1701C42.8216 76.2801 43.1616 76.3501 43.1516 76.4401C43.0916 76.4401 43.0716 76.4601 42.9916 76.4401C43.2916 76.5501 43.0216 76.7901 43.3916 76.9201C43.3616 76.9301 43.3316 76.9401 43.3016 76.9401C43.4816 76.9101 43.6716 76.9101 43.8116 76.9101C43.8116 76.9801 44.0516 77.0301 43.8116 77.0601C43.8116 77.0201 43.7216 77.0201 43.6416 77.0001L43.7516 77.0701C43.4116 77.1401 43.6316 76.9801 43.3716 76.9801C43.4916 77.1101 43.7816 77.2701 43.6916 77.3801C43.3516 77.4101 43.5716 77.1401 43.2716 77.2801L43.3916 77.1101C42.8616 77.2501 43.4216 77.0101 42.8516 77.1401C42.7616 77.3501 43.0316 77.3701 42.9416 77.5901C43.1316 77.6401 43.2216 77.5701 43.4116 77.6101C43.7516 77.9101 42.5616 77.8601 43.0116 78.0801C43.2416 78.1401 43.6716 78.1501 43.4416 78.3201L43.0616 78.2701C43.0216 78.4801 43.6116 78.3901 43.3516 78.6001C43.2016 78.5601 43.2216 78.4401 43.1816 78.4701C42.8816 78.6101 43.4016 78.5701 43.4016 78.6801L43.0616 78.7001C43.1116 78.9201 43.3616 79.1601 43.4216 79.4101C43.3216 79.4001 43.2116 79.3501 43.1116 79.4101C43.2816 79.7201 43.0716 80.0701 42.8616 80.3601L43.1516 80.4801C43.1516 80.4801 43.0216 80.5301 42.9616 80.5001C42.8516 80.6101 43.1516 80.5001 43.2616 80.5701C43.2816 80.6401 43.0916 80.6501 43.0016 80.6101C43.2416 80.8201 43.5216 81.2101 43.2016 81.4101L43.1116 81.3701C42.9916 81.5301 43.7116 81.5801 43.4316 81.7301L43.3816 81.7001C43.2416 82.0601 43.5016 82.4801 43.0416 82.7401C43.4616 82.8101 42.8316 83.0901 43.4216 83.1401C43.1216 83.3401 43.0216 83.2701 42.8016 83.5501C42.7716 83.6301 43.1616 83.6901 43.2216 83.7901H42.9116L43.2316 83.9201L42.8616 83.9701L42.9316 84.0701C42.9316 84.0701 43.0716 84.0001 43.1616 84.0101C43.2916 84.1601 42.9316 84.3401 42.7716 84.3401L43.0116 84.6901C42.8916 84.6801 42.8516 84.6201 42.7716 84.5701C43.0716 84.7701 42.4416 84.5801 42.7216 84.7601C42.7916 84.7401 42.9016 84.7801 42.9616 84.7901C42.7716 84.8601 42.7516 85.0501 42.8216 85.1901L42.6116 85.1501C42.5416 85.3901 42.6716 85.6801 42.6516 85.9601C42.7616 85.8701 43.1216 85.9201 43.1516 86.0001H42.8216C43.0216 86.0801 42.9516 85.9301 43.1916 86.0601C43.1416 86.1601 42.8216 86.1001 42.7116 86.0401L42.8116 86.1801C42.7116 86.1801 42.6616 86.1501 42.5416 86.1301C42.7416 86.2001 42.2016 86.3201 42.5416 86.4301H42.4416C42.4216 86.7101 42.5216 86.8401 42.5216 87.0701C42.8016 87.1001 42.7316 87.1801 42.9516 87.2701C42.8516 87.4301 42.6116 87.6001 42.6116 87.8001C42.7416 87.9501 42.8416 87.8601 43.0016 87.9401C42.7416 87.9301 42.7516 88.1301 42.5816 88.0101C42.6016 88.2601 42.6016 88.3201 42.7816 88.6501C42.8916 88.6301 42.9416 88.5901 43.0216 88.6201C43.0616 88.6801 42.9016 88.7401 42.7816 88.7201L42.7616 88.7001C43.1116 89.0801 41.9516 89.4201 42.4516 89.7501L42.4316 89.7301L42.6816 90.0401C42.6216 90.1701 42.5016 89.9401 42.3316 90.0201C42.7216 90.3701 42.2216 90.5001 42.4816 90.7801C41.7116 90.9001 42.4616 91.4801 41.9516 91.6901H42.1316C42.3016 91.7801 42.0216 91.7701 41.9716 91.8101C42.1116 91.8101 42.1416 91.7501 42.2316 91.8101C42.3816 92.4101 41.8416 92.9701 41.6116 93.5401C41.5416 93.7501 42.5116 93.7701 42.0616 93.9901L41.7416 93.8701C42.0816 94.3501 41.6216 94.7601 41.9016 95.2301C41.8316 95.2001 41.7316 95.1801 41.7416 95.1401C41.4916 95.2001 41.6916 95.4701 41.8816 95.5001C41.8516 95.5601 41.7016 95.5001 41.6016 95.5201C41.4516 95.5901 41.8816 95.7801 41.6316 95.8001C41.5916 95.8001 41.5616 95.7701 41.5416 95.7501C41.6516 95.8201 41.4816 96.0201 41.7616 96.0001C41.6116 96.1401 41.8416 96.3201 41.6716 96.4301C41.9716 96.5501 41.4916 96.6901 41.9216 96.7701C41.4716 96.7001 41.5216 97.0101 41.7216 97.1301C41.5916 97.0801 41.5716 97.2001 41.3916 97.1301C41.3916 97.2501 41.4516 97.3601 41.6816 97.3701C41.1216 97.5201 42.0616 97.8501 41.3516 97.8901C41.5516 98.2601 41.6716 98.6001 41.7416 98.9301C41.2916 98.8601 41.7416 98.5801 41.2716 98.5401C41.4216 98.8601 41.7816 99.0801 41.6316 99.3501C41.5616 99.4201 41.4416 99.2801 41.3716 99.2501C41.5216 99.5701 41.2616 99.8101 41.4716 100.11C41.4316 100.11 41.3916 100.07 41.3616 100.04C41.3616 100.09 41.2816 100.15 41.4816 100.17L41.4316 100.11C41.7416 100.07 42.0216 100.39 42.1716 100.42C41.6016 100.26 41.9916 100.66 41.2716 100.42C41.3016 100.46 41.3916 100.51 41.5316 100.52C41.4816 100.57 41.4016 100.57 41.2516 100.5C41.3416 100.7 41.5616 100.66 41.5416 100.83C41.4416 100.82 41.4116 100.78 41.2916 100.75C41.4716 100.86 41.6516 100.97 41.5516 101.1C41.4916 101.08 41.4116 101.1 41.4216 101.05C41.4216 101.3 41.8816 101.53 41.6616 101.77C41.2416 101.64 41.5116 101.84 41.1416 101.81L41.2316 101.97L41.4216 101.94C41.4016 102.06 41.6516 102.21 41.5216 102.3L41.3816 102.19L41.4216 102.43L41.5816 102.31C41.7516 102.46 42.0516 102.36 41.9316 102.51C41.9016 102.47 41.9116 102.63 41.6816 102.67C41.7916 102.75 41.9116 102.83 41.8016 102.91C41.6816 102.91 41.3916 102.84 41.3116 102.84C41.6116 102.94 41.3616 103.14 41.6816 103.26C41.6116 103.22 41.4116 103.2 41.3716 103.2L41.6116 103.28C41.5216 103.33 41.4816 103.33 41.3316 103.3C41.2616 103.47 41.8116 103.3 41.5816 103.49C41.5616 103.47 41.5216 103.47 41.4916 103.44C41.3616 103.64 41.6016 103.86 41.4516 104.04C41.0716 104.04 41.3816 103.86 41.0616 103.89C41.0916 104.17 41.4316 104.52 41.3116 104.77L41.3616 104.73C41.8816 104.83 41.0816 104.9 41.3116 105.06C41.2716 105.02 41.0216 104.98 41.0816 105C40.9716 105.17 41.1616 105.39 41.3016 105.69L41.1716 105.64C41.0416 105.73 41.0716 105.92 40.9916 106.03C41.1216 106.08 41.0916 106.14 41.2916 106.13C40.4816 106.4 41.6216 106.86 40.9416 107.11C40.9416 107.07 40.8316 107.01 40.8316 107.04L40.9216 107.33C41.1516 107.33 41.0616 107.31 41.2516 107.27C41.3816 107.32 41.4816 107.41 41.4716 107.48C41.3316 107.34 41.1016 107.44 40.9716 107.48C41.0416 107.48 41.1216 107.51 41.1916 107.51C40.7716 107.61 41.6516 107.59 41.3516 107.75L41.2316 107.73C41.2816 107.81 41.4416 107.89 41.3916 107.97C41.1216 107.97 41.2716 107.88 41.0616 107.85C41.0616 107.96 41.5416 108.12 41.2616 108.19C41.1916 108.14 41.2016 108.07 41.1316 108.01C40.8116 108.08 40.8816 108.1 40.8316 108.18L40.6716 108.34L40.7616 108.3C41.4416 108.51 40.8616 108.59 41.2916 108.83C40.8816 108.6 41.0416 108.77 40.7516 108.73C40.6616 108.77 40.5616 108.83 40.4816 108.8C40.7116 108.91 40.2716 108.93 40.6116 109.09C40.5116 109.09 40.5916 109.18 40.3516 109.14C40.4116 109.26 40.5216 109.14 40.6416 109.15C40.9516 109.36 40.2016 109.52 40.6216 109.82C40.7816 110.06 41.1116 110.13 41.2516 110.35C41.0916 110.4 40.9016 110.26 40.9016 110.26C40.7516 110.36 40.7616 110.44 40.8616 110.56C40.7816 110.53 40.7016 110.54 40.5916 110.56C40.6116 110.65 40.9416 110.65 40.7816 110.75C40.6716 110.72 40.5016 110.68 40.4016 110.63C40.4816 110.74 40.6516 110.85 40.7316 110.96C40.5616 110.97 40.4816 110.87 40.3716 110.83C40.4316 110.95 40.4916 111.14 40.7616 111.2L40.8616 111.14C40.8616 111.14 40.6316 111.14 40.5816 111.1C40.3816 110.98 40.6916 110.97 40.7916 110.97L40.8416 111.05C41.4216 111.03 40.7816 110.75 40.8316 110.61L41.2416 110.71L40.9116 110.53C41.0216 110.51 41.2516 110.51 41.3116 110.59C41.5216 110.51 41.1716 110.48 41.4116 110.42C41.4516 110.42 41.4716 110.42 41.4816 110.43L41.3716 110.32C41.4516 110.35 41.6616 110.33 41.6016 110.39C41.8616 110.23 41.3216 110.06 41.6416 110.03L41.6616 110.05C41.5516 109.78 41.3616 109.99 41.0216 109.77L41.7816 109.72L41.4816 109.66C41.4816 109.66 41.5216 109.59 41.6416 109.61C41.4416 109.49 41.5116 109.61 41.3216 109.54C41.6116 109.44 41.2316 109.18 41.7116 109.2C41.4816 109.13 41.5216 109.3 41.3716 109.15C41.8916 109.17 41.3016 108.98 41.5516 108.9C41.8116 108.96 41.6616 109.06 41.9116 108.97C41.4616 108.85 42.0316 108.76 41.9616 108.65C41.6016 108.61 41.8316 108.42 41.7316 108.25C41.8516 108.27 41.9616 107.97 42.1116 107.83H42.1716C41.8116 107.77 41.8916 107.62 41.8316 107.5C42.0516 107.53 42.1316 107.56 42.2216 107.63V107.52C42.1216 107.48 42.0616 107.44 42.0216 107.37L42.2916 107.43C42.2916 107.29 42.0016 107.11 42.2016 106.95C41.9516 106.91 41.4716 107.01 41.3316 106.8C41.4716 106.8 41.7016 106.83 41.7516 106.89C41.7316 106.87 41.6416 106.82 41.7116 106.79L41.9316 106.89C42.0416 106.82 41.7416 106.82 41.7716 106.76C41.9716 106.78 41.9216 106.73 42.0716 106.76C42.0916 106.78 41.9816 106.81 42.0616 106.84C42.1016 106.77 42.2316 106.69 42.3816 106.68C42.2716 106.68 42.1216 106.65 42.1016 106.59C42.1016 106.45 42.3416 106.57 42.4516 106.5C42.3216 106.45 42.4716 106.38 42.1816 106.34C42.1816 106.3 42.3216 106.31 42.4116 106.3C42.2916 106.21 42.4116 105.95 42.0916 106L42.0716 106.02H42.0616V106.01C41.8016 105.73 42.2916 105.53 42.1916 105.27H42.2916C42.2016 105.13 42.2616 104.96 42.0616 104.83C42.0616 104.79 42.2516 104.75 42.3716 104.79C42.3116 104.67 42.2016 104.65 42.3816 104.51C42.5416 104.64 42.5416 104.49 42.4916 104.64C42.5916 104.51 42.7516 104.5 42.5016 104.31C42.7416 104.39 42.8316 104.24 42.7616 104.17L42.5716 104.25C42.5416 104.17 42.5716 104.11 42.6016 104.04L42.9316 104.12C43.3716 103.88 42.3116 103.51 43.0116 103.38C42.7916 103.27 42.8316 103.52 42.5716 103.41C42.6316 103.28 43.1216 103.2 43.1316 103.16C43.3416 103 42.6716 102.93 42.8216 102.75C42.7016 102.75 42.3816 102.75 42.2916 102.59C42.3516 102.46 42.8016 102.49 42.8916 102.59C42.8916 102.62 42.8616 102.63 42.8216 102.63C42.8616 102.68 42.9016 102.74 43.0316 102.71L42.9116 102.68C43.0416 102.63 43.0516 102.44 43.2416 102.51C43.1416 102.39 43.0516 102.44 42.9816 102.51C43.1716 102.36 43.0216 102.24 43.1616 102.08C43.0916 102.1 42.9516 102.11 42.9516 102.08C43.1316 101.84 42.7416 101.94 42.7116 101.76C42.9016 101.68 43.1316 101.85 43.0116 101.65C43.1516 101.56 43.3316 101.67 43.4216 101.72C43.2116 101.53 43.6116 101.44 43.6616 101.35L43.7416 101.45C43.6916 101.39 43.7016 101.35 43.7016 101.31L43.4616 101.33C43.4616 101.33 43.5116 101.24 43.6116 101.26C43.4616 101.19 43.2116 101.25 43.0216 101.12C43.1516 101.07 42.9216 100.9 43.2316 100.92C43.1016 101.11 43.5516 100.94 43.5716 101.12C43.5416 101.08 43.5416 101.04 43.5916 101C43.6316 101 43.6516 101.02 43.6716 101.03C43.9716 100.87 43.3316 100.89 43.3616 100.69C43.5316 100.74 43.7016 100.69 43.6716 100.65C43.6616 100.73 43.3716 100.65 43.2516 100.56C43.4016 100.45 43.1716 100.4 43.1916 100.34L43.1216 100.41C42.9516 100.36 42.9816 100.3 42.9416 100.2C43.0816 100.2 43.0216 100.3 43.0916 100.27C42.7916 100.13 43.4416 100.08 43.2516 99.9101C43.3816 99.8601 43.5816 99.9501 43.6716 99.9001C43.4616 99.7101 43.9316 99.7601 43.7716 99.5601C43.5316 99.5801 43.5816 99.5901 43.3716 99.4501L43.5016 99.7501L43.1816 99.5301C43.1716 99.6101 43.3116 99.7301 43.2616 99.7701C43.0816 99.6601 43.1416 99.6801 42.9316 99.6901C43.3016 99.6201 42.7516 99.4401 43.0116 99.3301L43.6016 99.4101C43.8916 99.2401 43.3416 99.0201 43.5216 98.7801L43.4116 98.8501C43.1816 98.7901 43.4016 98.6901 43.3116 98.5901C43.5016 98.6201 43.5816 98.5801 43.7116 98.5601C43.5616 98.5501 43.7516 98.3701 43.3616 98.3001L43.6316 98.2201C43.7616 98.0201 43.1016 97.9101 43.1916 97.7201C43.4016 97.8101 43.5516 97.7301 43.6816 97.8901C43.6916 97.8201 43.7316 97.7701 43.6016 97.7501C43.7316 97.7301 43.3616 97.5301 43.5516 97.4901C43.4716 97.4501 43.2616 97.4201 43.2916 97.3401C43.3316 97.3401 43.3916 97.3501 43.3916 97.3501C43.2916 97.3401 43.2716 97.2201 43.0516 97.2501C43.6916 97.1201 43.0816 96.6701 43.6216 96.5501C43.5716 96.4001 43.5316 96.2101 43.5316 96.0801C43.5916 96.1001 43.6316 96.0901 43.6016 96.1201C43.8016 95.9601 43.0516 95.9401 43.2816 95.7501C43.6116 95.6801 43.4416 95.8801 43.5716 95.8301C44.2216 95.8801 43.5116 95.5701 43.9116 95.4701L43.9416 95.5101C44.1716 95.4301 43.7316 95.2201 43.8016 95.0501C43.8016 95.0501 43.8616 95.0701 43.9016 95.0601C43.5916 94.9001 43.5016 94.6601 43.4316 94.4801C43.6816 94.5601 43.5516 94.5701 43.8116 94.5701C43.7816 94.4901 43.4016 94.5401 43.3416 94.3801C43.4816 94.3501 43.6216 94.2501 43.8916 94.2701V94.4101C44.2516 94.3801 43.8916 94.2201 43.9716 94.1601L44.1216 94.1901C44.0916 93.9701 43.7116 93.9201 43.7616 93.6901H43.6416C43.2716 93.5301 43.8716 93.6201 43.6016 93.4601H44.0016C43.9216 93.3701 43.6516 93.1301 43.6016 92.9701C43.8816 93.0901 44.0116 93.2801 44.1716 93.4101C44.1816 93.3301 44.1716 93.1201 43.9916 93.0601C44.0216 93.1001 44.1216 93.1501 44.0516 93.1801C43.7516 93.0401 43.6216 92.8901 43.6416 92.7201C44.4016 92.8301 43.8816 92.3101 44.4816 92.2501C44.2316 91.9201 44.6616 91.6701 44.6516 91.3201C44.0516 91.3801 44.6516 91.2201 44.0316 91.1801C44.0016 91.1001 44.0116 91.0701 44.0516 91.0601L44.4416 90.8501C44.6216 90.8101 44.5716 90.9401 44.7016 90.9501C44.7716 90.7801 44.9716 90.9001 45.1416 90.8001C44.9216 90.8001 44.8316 90.7101 44.9316 90.6101L44.6316 90.7201C44.3316 90.4401 45.1616 90.5601 44.8716 90.2801L45.0516 90.3801C44.9516 90.2401 45.1016 89.9101 44.6216 89.7401C44.6916 89.7201 44.8616 89.7101 44.9016 89.7701C45.0016 89.4701 44.4416 89.0401 44.7616 88.8301L44.9116 88.8701C44.8716 88.8101 44.6416 88.7501 44.8016 88.6901C44.8616 88.6901 44.9516 88.7301 44.9616 88.7001C44.9116 88.6701 44.7116 88.5301 44.8116 88.4601L44.9716 88.5401C45.1916 88.2601 44.6016 88.0501 44.5216 87.7901C44.9616 87.8301 45.1216 87.6001 45.2016 87.4901H45.2616C45.3416 87.1501 44.9416 86.8801 44.7916 86.5401C45.2816 86.3701 45.0416 85.8801 45.3316 85.5701C45.2516 85.6101 44.9916 85.5401 44.9516 85.4801C45.0416 85.4101 44.6616 85.2501 45.0616 85.2901V85.3201C45.4516 85.2901 45.3616 85.1301 45.3716 85.0001L44.8416 84.9501C45.6216 84.6801 44.6016 84.1001 45.3016 83.9701C45.1716 83.8901 45.1816 83.7901 45.0516 83.7101L45.3316 83.7301C45.4116 83.5201 45.4516 83.4201 45.4016 83.1501L45.6016 83.2101C45.6316 83.0601 44.7916 82.9901 44.7816 82.8501L45.2016 82.8301C45.2016 82.5701 45.5816 82.3201 45.2016 82.0501C45.2616 82.0501 45.3816 82.0701 45.4016 82.1101C45.4116 81.9901 45.7016 81.6501 45.1216 81.6701C45.5016 81.6701 45.1616 81.4001 45.0016 81.2601L45.2816 81.2901C44.9316 81.1601 44.8316 81.1601 44.7416 80.9901C44.7816 80.9501 44.9616 80.9601 44.8916 81.0101C45.0416 80.8801 44.6316 80.9001 44.7816 80.7501L44.9616 80.8101C44.9816 80.6801 44.8916 80.6901 44.6816 80.6101C44.5716 80.5201 44.7616 80.3601 45.0116 80.3401C44.8616 80.3201 44.6516 80.2401 44.7316 80.1701C44.8316 80.1701 44.8816 80.1901 44.9116 80.2001C45.1116 79.9801 44.5916 79.8601 44.8616 79.7101C44.9516 79.7101 45.0016 79.7001 45.0316 79.6901C45.0316 79.8701 45.0116 80.0101 44.9916 80.0001C45.2516 80.0001 45.2916 79.8601 45.6516 79.9801C45.4616 79.8601 45.0416 79.6601 45.1616 79.5201C45.1816 79.5201 45.2116 79.5101 45.2516 79.5001H45.2816C45.2816 79.5001 45.2816 79.4501 45.2416 79.4301C45.2816 79.3901 45.3116 79.3601 45.3216 79.3101C45.5316 79.2901 45.4316 79.1401 45.4416 79.0701C45.1616 79.0701 45.2016 78.9801 44.9716 79.0701C44.9916 79.0601 45.0016 79.0801 45.0216 79.1301C45.0216 79.1401 45.0316 79.1501 45.0516 79.1601H45.0316C45.0316 79.1601 45.0416 79.2601 45.0516 79.3301C44.9116 79.2701 44.7916 79.2101 44.9416 79.1301C44.7616 79.0901 44.5716 79.0501 44.4916 79.0301C44.8816 78.9301 45.0916 78.7401 45.3416 78.7201C45.1816 78.5001 45.2316 78.2001 44.7116 78.0701C44.6416 78.0101 44.8616 78.0001 44.9416 77.9701C44.9916 78.0101 44.9916 78.0501 45.0616 78.0701C44.9216 77.9501 45.0116 77.7001 44.6416 77.6801C44.8116 77.5201 44.9816 77.7601 44.9216 77.5501L45.0316 77.5801C45.6116 77.1401 44.0716 76.9201 44.8116 76.4301C44.7616 76.4601 44.7416 76.4801 44.6816 76.4901C44.9916 75.9401 44.3416 75.4001 44.8316 74.8501C44.9316 74.6901 44.6916 74.6901 44.5116 74.6101L44.8116 74.5601L44.4516 74.4201C44.1816 74.2201 45.1616 73.9901 44.6616 73.7401L44.4616 73.7901C44.4916 73.6901 44.3216 73.4801 44.5516 73.4801C44.5116 73.4801 44.3416 73.4601 44.4416 73.4201H44.6016L44.3116 73.1801C44.4116 72.9801 44.9416 73.1601 44.9516 72.8801C44.8816 72.7801 44.4716 72.6201 44.3716 72.6701C44.3716 72.7101 44.2816 72.7901 44.1216 72.8001L44.0316 72.7101C43.5616 72.7301 43.0916 72.7101 42.7816 72.9601L43.0716 73.1001L42.8516 73.1701L42.8316 73.0401C42.6216 73.1301 42.8116 73.1701 42.9516 73.2101C42.8316 73.2301 42.7516 73.2601 42.7116 73.3001L43.1616 73.4201C42.9816 73.4501 42.7916 73.3801 42.7016 73.4901C42.9116 73.5501 43.1016 73.3901 43.2516 73.4901C43.0416 73.5801 42.8716 73.5701 43.0616 73.6501C42.9416 73.6701 42.8616 73.6501 42.8116 73.6301C42.9616 73.7001 42.8816 73.8401 43.1316 73.8601C42.8716 73.9601 43.2216 74.1201 42.7816 74.1501C42.8916 74.1701 43.1316 74.2701 43.1616 74.3401C42.6216 74.2401 43.1516 74.6201 42.5816 74.6101C43.0616 74.6801 42.8116 74.9501 43.0916 75.1101C43.0516 75.1101 42.9716 75.0901 43.0016 75.0701C42.9716 75.1701 42.8316 75.2101 42.7416 75.2701C43.1316 75.2701 43.2316 75.4101 43.4716 75.4801C43.1016 75.6201 43.0116 75.4301 42.6516 75.4801C42.9716 75.4601 42.9716 75.6701 43.2416 75.6201C43.0116 75.7201 43.1316 75.7001 42.8116 75.7701C43.3016 75.7701 42.9016 75.8501 43.2016 75.9201C42.9616 76.0601 42.7416 75.9701 42.9016 76.1101C42.7516 76.1901 42.5716 76.0601 42.5716 76.0601L42.6016 75.9301ZM43.5016 79.4101C43.5016 79.4101 43.4916 79.3501 43.4816 79.3401C43.4816 79.3501 43.4916 79.3801 43.5016 79.4101ZM43.5116 79.7101C43.5116 79.7101 43.5216 79.6301 43.5216 79.5801C43.6216 79.5801 43.7216 79.5801 43.7116 79.6101C43.6516 79.5901 43.5916 79.6601 43.5116 79.7101ZM45.4516 79.0901C45.4516 79.0901 45.4316 79.1501 45.3816 79.1601C45.3816 79.1401 45.3716 79.1101 45.3516 79.0801H45.3216C45.3716 79.0801 45.4216 79.0801 45.4616 79.0901H45.4516Z"/>
<path d="M4.22915 71.96C4.36915 71.9 4.13916 71.6 4.07916 71.4C4.18916 71.23 4.26916 71.61 4.39916 71.76C4.45916 71.62 4.38916 71.28 4.46916 71.26C4.49916 71.31 4.52915 71.33 4.53916 71.4C4.51916 71.08 4.84916 71.24 4.80916 70.85C4.82916 70.88 4.84915 70.9 4.86915 70.93C4.76915 70.77 4.68916 70.6 4.62916 70.48C4.68916 70.45 4.63915 70.22 4.76915 70.42C4.72915 70.43 4.76915 70.52 4.77915 70.6L4.79915 70.48C4.99915 70.77 4.76916 70.63 4.87916 70.86C4.94916 70.7 4.96915 70.37 5.10915 70.42C5.26915 70.72 4.93915 70.63 5.18915 70.84L4.98916 70.79C5.32916 71.22 4.88915 70.79 5.22915 71.27C5.45915 71.27 5.36915 71.01 5.59915 71.01C5.55915 70.82 5.46915 70.76 5.42915 70.57C5.55915 70.14 6.00915 71.24 6.00915 70.74C5.95915 70.51 5.79916 70.11 6.03916 70.25L6.15915 70.62C6.35915 70.57 6.02916 70.07 6.32916 70.21C6.35916 70.36 6.23915 70.39 6.28916 70.42C6.53916 70.64 6.28916 70.18 6.37916 70.14L6.54915 70.44C6.71915 70.3 6.83915 69.97 7.02915 69.82C7.05915 69.92 7.06915 70.03 7.15915 70.1C7.35915 69.82 7.75915 69.86 8.11915 69.92L8.09915 69.61C8.09915 69.61 8.19915 69.71 8.19915 69.77C8.34915 69.82 8.12916 69.6 8.12916 69.47C8.17916 69.42 8.27915 69.59 8.27915 69.68C8.35915 69.37 8.56916 68.95 8.89916 69.14V69.24C9.09916 69.28 8.80915 68.62 9.06915 68.8V68.86C9.43915 68.82 9.68916 68.41 10.1292 68.69C9.99916 68.29 10.5292 68.71 10.2992 68.17C10.6092 68.35 10.5992 68.47 10.9492 68.52C11.0292 68.52 10.8992 68.14 10.9492 68.04L11.0792 68.32L11.0592 67.97L11.2792 68.27L11.3292 68.16C11.3292 68.16 11.1992 68.07 11.1692 67.98C11.2392 67.79 11.5692 68.03 11.6392 68.17L11.8292 67.79C11.8792 67.91 11.8392 67.97 11.8292 68.06C11.8592 67.7 11.9992 68.34 12.0192 68.01C11.9692 67.96 11.9492 67.84 11.9292 67.78C12.0792 67.91 12.2492 67.84 12.3392 67.71L12.4092 67.91C12.6492 67.85 12.8292 67.6 13.0792 67.48C12.9492 67.43 12.8092 67.09 12.8692 67.02L13.0392 67.3C12.9992 67.1 12.9092 67.22 12.8992 66.96C13.0092 66.96 13.1192 67.27 13.1092 67.39L13.1692 67.23C13.2192 67.31 13.2092 67.37 13.2592 67.49C13.2192 67.29 13.5892 67.69 13.5092 67.34L13.5592 67.42C13.8092 67.31 13.8692 67.15 14.0692 67.04C13.9492 66.78 14.0592 66.8 14.0192 66.57C14.2092 66.58 14.4692 66.7 14.6392 66.6C14.7092 66.41 14.5792 66.37 14.5592 66.19C14.6792 66.42 14.8492 66.31 14.8292 66.52C15.0292 66.38 15.0792 66.34 15.2692 66.03C15.1992 65.95 15.1392 65.92 15.1192 65.84C15.1492 65.78 15.2792 65.88 15.3192 66V66.03C15.4592 65.54 16.3392 66.37 16.3592 65.78V65.81L16.4892 65.44C16.6292 65.43 16.4992 65.65 16.6592 65.75C16.7492 65.24 17.1192 65.6 17.2192 65.24C17.7192 65.84 17.8092 64.9 18.2492 65.23L18.1592 65.08C18.1492 64.89 18.2792 65.14 18.3392 65.15C18.2692 65.03 18.2092 65.04 18.1992 64.93C18.6192 64.49 19.3692 64.67 19.9592 64.56C20.1692 64.51 19.6792 63.68 20.0992 63.95L20.1692 64.28C20.3892 63.74 20.9692 63.92 21.2092 63.44C21.2092 63.52 21.2592 63.61 21.2192 63.63C21.3992 63.81 21.5192 63.5 21.4392 63.32C21.5092 63.32 21.5292 63.47 21.6092 63.55C21.7492 63.64 21.6792 63.18 21.8292 63.37C21.8492 63.4 21.8392 63.45 21.8292 63.47C21.8292 63.34 22.0892 63.38 21.9192 63.15C22.1192 63.2 22.1392 62.91 22.3192 63C22.2592 62.69 22.6292 63.02 22.4592 62.61C22.6392 63.02 22.8692 62.82 22.8592 62.59C22.8892 62.73 22.9992 62.68 23.0392 62.87C23.1392 62.82 23.1992 62.7 23.0792 62.49C23.4992 62.89 23.2792 61.92 23.6792 62.49C23.8792 62.13 24.0892 61.84 24.3192 61.62C24.4992 62.03 24.0392 61.8 24.2492 62.23C24.4292 61.94 24.4192 61.52 24.7192 61.49C24.8092 61.51 24.7692 61.68 24.7792 61.77C24.9592 61.48 25.2992 61.57 25.4292 61.24C25.4492 61.28 25.4392 61.33 25.4292 61.37C25.4692 61.33 25.5592 61.37 25.4692 61.2L25.4492 61.27C25.2491 61.04 25.3692 60.62 25.3092 60.48C25.4792 61.05 25.5992 60.51 25.7992 61.24C25.8092 61.19 25.7992 61.09 25.7392 60.96C25.7992 60.98 25.8492 61.04 25.8692 61.2C25.9892 61.02 25.8292 60.85 25.9892 60.79C26.0292 60.88 26.0192 60.93 26.0492 61.04C26.0492 60.83 26.0392 60.62 26.1992 60.64C26.2192 60.7 26.2692 60.76 26.2292 60.78C26.4292 60.65 26.3792 60.14 26.6892 60.2C26.7992 60.62 26.8292 60.29 26.9992 60.62L27.0792 60.46L26.9492 60.32C27.0592 60.27 27.0492 59.98 27.1892 60.05L27.1692 60.23L27.3492 60.07L27.1692 60C27.1992 59.77 26.9592 59.58 27.1492 59.6C27.1392 59.65 27.2592 59.55 27.4092 59.72C27.4092 59.59 27.4092 59.45 27.5392 59.49C27.6092 59.59 27.6992 59.87 27.7492 59.94C27.6692 59.63 27.9692 59.74 27.8992 59.41C27.9092 59.49 27.9891 59.67 28.0191 59.7L27.9592 59.45C28.0492 59.5 28.0692 59.53 28.1292 59.68C28.2992 59.65 27.8792 59.28 28.1492 59.37C28.1492 59.4 28.1692 59.43 28.1492 59.48C28.3792 59.48 28.4392 59.17 28.6592 59.2C28.8692 59.52 28.5492 59.35 28.7392 59.61C28.9592 59.43 29.0492 58.96 29.3292 58.93L29.2691 58.91C29.0791 58.41 29.5592 59.06 29.5692 58.78C29.5592 58.83 29.6592 59.06 29.6392 59.01C29.8392 59.01 29.9191 58.74 30.0891 58.47L30.1192 58.61C30.2692 58.67 30.3992 58.55 30.5292 58.56C30.4992 58.42 30.5692 58.41 30.4492 58.25C31.0991 58.8 30.8792 57.59 31.4392 58.04C31.4092 58.06 31.4092 58.19 31.4392 58.17L31.6292 57.94C31.5091 57.74 31.5392 57.83 31.4092 57.69C31.3792 57.55 31.4092 57.42 31.4592 57.4C31.4192 57.59 31.6192 57.74 31.7192 57.83C31.6792 57.77 31.6592 57.69 31.6292 57.63C31.9291 57.94 31.4492 57.2 31.7392 57.37L31.7792 57.48C31.8192 57.39 31.8092 57.22 31.8892 57.22C32.0292 57.45 31.8692 57.37 31.9592 57.57C32.0492 57.51 31.9392 57.02 32.1392 57.22C32.1392 57.31 32.0692 57.34 32.0592 57.42C32.2892 57.66 32.2692 57.58 32.3592 57.59H32.3492L32.5792 57.64L32.4992 57.58C32.3192 56.89 32.6892 57.35 32.6592 56.86C32.6792 57.33 32.7392 57.1 32.8592 57.38C32.9392 57.44 33.0392 57.49 33.0592 57.58C33.0292 57.32 33.2692 57.69 33.2292 57.32C33.2792 57.41 33.3192 57.29 33.3992 57.52C33.4692 57.4 33.2992 57.38 33.2592 57.26C33.2692 56.89 33.7992 57.45 33.8292 56.93C33.9392 56.67 33.8292 56.35 33.9492 56.12C34.0792 56.23 34.0492 56.46 34.0492 56.46C34.2092 56.54 34.2691 56.49 34.3092 56.34C34.3292 56.43 34.3792 56.48 34.4492 56.57C34.5092 56.51 34.3492 56.23 34.5092 56.31C34.5392 56.42 34.5892 56.58 34.5992 56.7C34.6492 56.58 34.6592 56.37 34.7092 56.25C34.8092 56.39 34.7692 56.51 34.7792 56.62C34.8492 56.5 34.9792 56.36 34.8892 56.1L34.7792 56.04C34.7792 56.04 34.8992 56.24 34.8892 56.3C34.8892 56.53 34.7292 56.27 34.6792 56.19L34.7192 56.1C34.4092 55.61 34.4992 56.3 34.3592 56.33L34.2392 55.93L34.2592 56.3C34.1892 56.22 34.0692 56.01 34.0992 55.93C33.9192 55.79 34.0792 56.1 33.8992 55.93C33.8792 55.9 33.8692 55.88 33.8692 55.86L33.8292 56.01C33.8092 55.92 33.6891 55.75 33.7691 55.78C33.5092 55.64 33.6391 56.19 33.4492 55.93V55.9C33.2892 56.13 33.5592 56.19 33.5492 56.59L33.1192 55.96L33.2292 56.25C33.2292 56.25 33.1492 56.25 33.0992 56.14C33.0992 56.37 33.1692 56.25 33.2092 56.46C32.9792 56.26 32.9592 56.72 32.7292 56.29C32.7892 56.52 32.9092 56.4 32.8592 56.6C32.5992 56.14 32.7592 56.75 32.5592 56.58C32.4791 56.32 32.6292 56.4 32.4292 56.23C32.5592 56.67 32.1892 56.23 32.1392 56.35C32.2892 56.68 32.0192 56.58 31.9292 56.75C31.8892 56.64 31.5692 56.7 31.3792 56.64L31.3592 56.58C31.4892 56.92 31.3192 56.93 31.2492 57.04C31.1592 56.84 31.1392 56.75 31.1492 56.64L31.0592 56.69C31.0892 56.81 31.0792 56.88 31.0392 56.94L30.9492 56.68C30.8291 56.75 30.8291 57.09 30.5891 57C30.6891 57.24 31.0192 57.58 30.9192 57.82C30.8492 57.7 30.7491 57.49 30.7691 57.41C30.7691 57.43 30.7692 57.54 30.7092 57.5L30.6792 57.26C30.5592 57.2 30.7192 57.45 30.6592 57.46C30.5792 57.28 30.5592 57.35 30.4992 57.21C30.4992 57.19 30.5892 57.26 30.5792 57.18C30.4992 57.18 30.3692 57.11 30.2792 56.99C30.3292 57.09 30.3892 57.23 30.3592 57.28C30.2392 57.35 30.2192 57.09 30.0992 57.03C30.1292 57.17 29.9892 57.08 30.1092 57.35C30.0692 57.37 30.0092 57.24 29.9592 57.18C29.9592 57.33 29.6692 57.36 29.8792 57.61H29.9092C29.9092 57.61 29.9092 57.63 29.9092 57.64C29.8192 58.01 29.3892 57.7 29.2392 57.91L29.1992 57.82C29.1192 57.98 28.9492 58.01 28.9492 58.25C28.9091 58.27 28.7792 58.13 28.7492 58.01C28.6792 58.12 28.7192 58.23 28.5092 58.15C28.5292 57.95 28.4092 58.03 28.5592 57.99C28.3992 57.97 28.2992 57.84 28.2792 58.15C28.2192 57.9 28.0492 57.91 28.0191 58L28.1892 58.12C28.1392 58.19 28.0692 58.19 27.9992 58.2L27.8892 57.88C27.4592 57.64 27.7192 58.72 27.2292 58.2C27.2592 58.44 27.4392 58.28 27.4892 58.56C27.3492 58.58 27.0292 58.2 26.9892 58.22C26.7492 58.13 27.0492 58.73 26.8192 58.7C26.8892 58.8 27.0492 59.07 26.9692 59.23C26.8292 59.25 26.6092 58.85 26.6492 58.73C26.6692 58.71 26.6992 58.73 26.7192 58.77C26.7392 58.71 26.7692 58.64 26.6692 58.55L26.7092 58.66C26.5992 58.58 26.4392 58.66 26.3992 58.47C26.3592 58.61 26.4392 58.66 26.5392 58.69C26.3092 58.61 26.2991 58.8 26.0891 58.77C26.1391 58.82 26.2292 58.93 26.1992 58.94C25.9091 58.92 26.1992 59.19 26.0592 59.31C25.8892 59.19 25.9092 58.9 25.8192 59.12C25.6692 59.05 25.6692 58.84 25.6592 58.74C25.6192 59.01 25.3292 58.73 25.2292 58.74L25.2592 58.62C25.2392 58.69 25.1992 58.71 25.1592 58.73L25.2992 58.92C25.2392 58.9 25.1992 58.92 25.1592 58.83C25.1792 58.99 25.3592 59.17 25.3592 59.41C25.2492 59.33 25.2392 59.61 25.0792 59.34C25.3092 59.34 24.9192 59.06 25.0592 58.94C25.0492 58.99 25.0092 59 24.9492 58.99C24.9292 58.96 24.9292 58.93 24.9292 58.91C24.6292 58.74 24.9992 59.27 24.8092 59.35C24.7592 59.18 24.6192 59.07 24.6092 59.11C24.6892 59.08 24.7692 59.36 24.7592 59.52C24.5792 59.45 24.6792 59.67 24.6092 59.69L24.7092 59.72C24.7592 59.89 24.6892 59.9 24.6392 59.99C24.5692 59.87 24.6692 59.87 24.6192 59.83C24.6592 60.16 24.2792 59.63 24.2392 59.88C24.1292 59.8 24.0892 59.58 24.0092 59.53C23.9692 59.81 23.7492 59.38 23.6792 59.63C23.8192 59.83 23.8092 59.77 23.7992 60.03L23.9692 59.76V60.15C24.0392 60.12 24.0492 59.94 24.1092 59.96C24.1092 60.17 24.1092 60.11 24.2192 60.28C23.9692 60 24.1092 60.56 23.8892 60.4L23.6392 59.86C23.3492 59.71 23.4592 60.28 23.1592 60.26L23.2792 60.32C23.3492 60.55 23.1492 60.42 23.1192 60.54C23.0392 60.36 22.9692 60.32 22.8792 60.22C22.9492 60.35 22.7092 60.29 22.8492 60.65L22.6392 60.46C22.4092 60.46 22.6692 61.07 22.4592 61.09C22.4192 60.87 22.2792 60.78 22.3392 60.59C22.2792 60.62 22.2092 60.61 22.2692 60.73C22.1792 60.63 22.2192 61.05 22.0792 60.9C22.0892 60.99 22.1692 61.18 22.0992 61.2C22.0792 61.17 22.0592 61.11 22.0592 61.11C22.0992 61.2 22.0092 61.28 22.1592 61.45C21.7092 60.98 21.6692 61.73 21.2792 61.33C21.1792 61.45 21.0492 61.58 20.9392 61.65C20.9192 61.59 20.8992 61.56 20.9292 61.57C20.6892 61.48 21.0692 62.13 20.7992 62.03C20.5692 61.79 20.8192 61.83 20.7092 61.75C20.4092 61.17 20.5292 61.94 20.2392 61.65V61.6C20.0592 61.45 20.1292 61.93 19.9492 61.96C19.9492 61.96 19.9292 61.9 19.9092 61.87C19.9492 62.22 19.7892 62.41 19.6792 62.57C19.6192 62.32 19.6892 62.42 19.5492 62.2C19.4992 62.26 19.7492 62.57 19.6392 62.69C19.5392 62.58 19.3892 62.52 19.2592 62.28L19.3792 62.21C19.1592 61.92 19.2192 62.3 19.1292 62.27L19.0692 62.13C18.8992 62.27 19.0692 62.62 18.8392 62.7L18.9092 62.8C18.9592 63.21 18.7192 62.65 18.7292 62.96L18.5292 62.62C18.4992 62.74 18.4292 63.09 18.3292 63.22C18.2792 62.92 18.3692 62.71 18.3992 62.51C18.3192 62.54 18.1592 62.66 18.1992 62.85C18.2092 62.8 18.2092 62.7 18.2692 62.74C18.3092 63.06 18.2592 63.26 18.1092 63.32C17.8092 62.62 17.6392 63.32 17.2792 62.84C17.1392 63.22 16.7092 62.98 16.4292 63.16C16.7892 63.65 16.3492 63.22 16.6292 63.76C16.5792 63.83 16.5392 63.83 16.5192 63.8L16.1492 63.57C16.0192 63.43 16.1492 63.42 16.0892 63.3C15.9092 63.33 15.9092 63.1 15.7392 63C15.8492 63.19 15.8192 63.31 15.6992 63.27L15.9392 63.47C15.8592 63.87 15.5292 63.09 15.4492 63.49V63.28C15.3692 63.44 15.0192 63.47 15.1192 63.97C15.0692 63.92 14.9692 63.78 14.9992 63.71C14.6992 63.77 14.6292 64.46 14.2892 64.29L14.2492 64.15C14.2192 64.21 14.2792 64.45 14.1592 64.34C14.1392 64.28 14.1192 64.2 14.0892 64.2C14.0892 64.26 14.0692 64.5 13.9692 64.45L13.9492 64.27C13.5992 64.22 13.7192 64.83 13.5492 65.03C13.3592 64.63 13.0992 64.6 12.9592 64.58L12.9392 64.52C12.6092 64.61 12.5792 65.09 12.3692 65.38C11.9892 65.03 11.6892 65.48 11.2992 65.37C11.3792 65.42 11.4392 65.68 11.4092 65.75C11.3092 65.7 11.3592 66.11 11.1992 65.75H11.2292C11.0092 65.41 10.9192 65.57 10.8092 65.61L11.0192 66.1C10.4192 65.54 10.4092 66.7 9.96916 66.15C9.95916 66.3 9.87915 66.34 9.86915 66.49L9.74915 66.23C9.52915 66.25 9.42915 66.26 9.22915 66.43L9.18915 66.22C9.04915 66.26 9.37915 67.04 9.25915 67.11L9.03916 66.74C8.81915 66.85 8.42915 66.62 8.36915 67.08C8.34915 67.02 8.29916 66.91 8.32916 66.88C8.21916 66.92 7.79916 66.81 8.07916 67.32C7.91916 66.98 7.82915 67.4 7.77915 67.6L7.67915 67.34C7.72915 67.71 7.76915 67.8 7.66915 67.96C7.61915 67.94 7.54915 67.77 7.61915 67.82C7.43915 67.74 7.63915 68.1 7.43915 68.03L7.41915 67.84C7.28915 67.88 7.33915 67.96 7.36915 68.18C7.33915 68.32 7.11916 68.22 6.98916 68C7.03916 68.15 7.05915 68.36 6.95915 68.33C6.90915 68.25 6.90915 68.18 6.90915 68.15C6.62915 68.07 6.75915 68.58 6.50915 68.4C6.46915 68.32 6.43915 68.28 6.41915 68.26C6.57915 68.19 6.70915 68.15 6.70915 68.17C6.59915 67.94 6.45916 67.96 6.39916 67.59C6.37916 67.81 6.38916 68.27 6.21916 68.22C6.19916 68.2 6.18915 68.18 6.16915 68.15V68.12C6.16915 68.12 6.11915 68.14 6.10915 68.19C6.04915 68.17 6.01915 68.15 5.97915 68.17C5.86915 67.98 5.78916 68.13 5.71916 68.15C5.84916 68.4 5.73915 68.4 5.91915 68.57C5.89915 68.56 5.91915 68.53 5.94915 68.5C5.94915 68.49 5.96915 68.48 5.95915 68.46V68.48C5.99915 68.45 6.04915 68.42 6.10915 68.39C6.11915 68.54 6.11916 68.68 5.98916 68.57C6.03916 68.75 6.07915 68.93 6.09915 69.02C5.84915 68.71 5.58916 68.59 5.46916 68.38C5.34916 68.61 5.06915 68.69 5.16915 69.22C5.13915 69.31 5.03916 69.11 4.98916 69.05C4.98916 68.99 5.03915 68.98 5.01915 68.9C4.96915 69.07 4.71915 69.1 4.84915 69.44C4.63915 69.35 4.77915 69.1 4.61915 69.24L4.59915 69.13C3.97915 68.77 4.39915 70.26 3.66915 69.77C3.71915 69.8 3.73915 69.81 3.76915 69.86C3.15915 69.78 2.93915 70.6 2.25915 70.33C2.07915 70.3 2.16915 70.51 2.16915 70.71L2.00915 70.45V70.83C1.93915 71.15 1.36916 70.32 1.32916 70.87L1.44915 71.04C1.34915 71.04 1.21915 71.28 1.13915 71.06C1.13915 71.1 1.19915 71.26 1.11915 71.19L1.04915 71.05L0.949155 71.4C0.729155 71.38 0.709155 70.82 0.449155 70.91C0.379155 71.01 0.389155 71.45 0.469155 71.53C0.509155 71.52 0.609154 71.57 0.679154 71.72L0.629155 71.83C0.809155 72.26 0.949153 72.72 1.29915 72.92L1.31915 72.6L1.45915 72.78L1.34915 72.85C1.50915 73.01 1.46915 72.82 1.45915 72.68C1.51915 72.78 1.57916 72.85 1.62916 72.88L1.57916 72.41C1.66916 72.57 1.66916 72.77 1.80916 72.81C1.78916 72.59 1.56915 72.47 1.61915 72.3C1.77915 72.46 1.82916 72.62 1.82916 72.42C1.88916 72.52 1.90916 72.6 1.89916 72.66C1.89916 72.5 2.05916 72.52 1.98916 72.28C2.16916 72.48 2.19916 72.11 2.37916 72.51C2.35916 72.4 2.35915 72.14 2.41915 72.09C2.52915 72.62 2.67915 72 2.88915 72.53C2.77915 72.06 3.11915 72.19 3.15915 71.88C3.15915 71.92 3.17915 72 3.15915 71.98C3.25915 71.98 3.34915 72.09 3.44915 72.15C3.28915 71.79 3.38915 71.64 3.35915 71.39C3.62915 71.68 3.48915 71.84 3.67915 72.15C3.53915 71.87 3.72916 71.77 3.57916 71.55C3.75916 71.72 3.69916 71.62 3.87916 71.89C3.68916 71.44 3.91915 71.78 3.85915 71.47C4.07915 71.63 4.08916 71.87 4.14916 71.67C4.27916 71.78 4.22915 71.99 4.22915 71.99V71.96ZM6.98916 69.72C6.96916 69.74 6.94915 69.75 6.92915 69.76C6.93915 69.76 6.95916 69.74 6.98916 69.71V69.72ZM7.24915 69.59C7.24915 69.59 7.16916 69.61 7.12916 69.63C7.07915 69.55 7.04916 69.45 7.07916 69.44C7.08916 69.51 7.17915 69.53 7.24915 69.58V69.59ZM5.85915 68.09C5.87915 68.03 5.91915 68.08 5.94915 68.13C5.92915 68.14 5.90915 68.16 5.88915 68.19C5.88915 68.2 5.88915 68.21 5.88915 68.22C5.86915 68.17 5.84915 68.12 5.84915 68.08L5.85915 68.09Z"/>
<path d="M15.32 9.97021C15.42 10.1002 15.64 9.79021 15.82 9.67021C16.03 9.75021 15.68 9.92021 15.58 10.0902C15.73 10.1202 16.05 9.96021 16.1 10.0402C16.06 10.0902 16.05 10.1102 15.98 10.1502C16.29 10.0502 16.24 10.4302 16.62 10.3002C16.6 10.3302 16.58 10.3502 16.56 10.3802C16.68 10.2402 16.82 10.1102 16.93 10.0302C16.98 10.0802 17.2 9.98021 17.03 10.1602C17.01 10.1202 16.93 10.1802 16.86 10.2202H16.99C16.77 10.4902 16.83 10.2102 16.64 10.3802C16.82 10.4202 17.16 10.3602 17.16 10.5102C16.92 10.7502 16.9 10.3802 16.77 10.7002L16.75 10.4802C16.44 10.9302 16.71 10.3702 16.36 10.8502C16.44 11.0902 16.66 10.9302 16.74 11.1702C16.92 11.0902 16.94 10.9702 17.12 10.8902C17.59 10.9202 16.65 11.6502 17.15 11.5402C17.36 11.4402 17.7 11.1802 17.64 11.4602L17.31 11.6702C17.43 11.8702 17.81 11.4102 17.77 11.7602C17.63 11.8302 17.56 11.7102 17.55 11.7602C17.42 12.0702 17.79 11.7002 17.86 11.7902L17.62 12.0302C17.82 12.1802 18.18 12.2202 18.4 12.3802C18.31 12.4302 18.2 12.4702 18.16 12.5802C18.51 12.7202 18.6 13.1502 18.65 13.5302L18.95 13.4402C18.95 13.4402 18.88 13.5702 18.82 13.5802C18.82 13.7502 18.97 13.4702 19.09 13.4402C19.15 13.4802 19.02 13.6202 18.93 13.6402C19.26 13.6502 19.75 13.7902 19.66 14.1702L19.56 14.1902C19.59 14.4102 20.16 13.9602 20.05 14.2702H19.99C20.15 14.6602 20.64 14.8302 20.48 15.3502C20.84 15.1302 20.58 15.7802 21.05 15.4202C20.97 15.7802 20.84 15.8002 20.89 16.1702C20.92 16.2502 21.26 16.0402 21.37 16.0802L21.13 16.2802L21.47 16.1902L21.23 16.4802L21.35 16.5102C21.35 16.5102 21.4 16.3602 21.48 16.3102C21.69 16.3402 21.55 16.7402 21.43 16.8402L21.86 16.9602C21.76 17.0302 21.69 17.0102 21.59 17.0202C21.96 16.9802 21.36 17.2502 21.7 17.2102C21.74 17.1502 21.85 17.1102 21.9 17.0702C21.81 17.2602 21.93 17.4202 22.09 17.4902L21.91 17.6002C22.04 17.8502 22.34 17.9902 22.53 18.2302C22.54 18.0802 22.85 17.8702 22.93 17.9202L22.7 18.1502C22.89 18.0702 22.74 18.0002 23.01 17.9402C23.05 18.0502 22.77 18.2302 22.64 18.2402L22.81 18.2802C22.74 18.3502 22.68 18.3502 22.58 18.4202C22.77 18.3402 22.47 18.8102 22.8 18.6602L22.73 18.7302C22.92 18.9702 23.09 19.0102 23.26 19.1902C23.49 19.0202 23.5 19.1402 23.72 19.0502C23.76 19.2502 23.71 19.5502 23.86 19.7102C24.06 19.7502 24.08 19.6002 24.25 19.5502C24.05 19.7202 24.21 19.8702 23.99 19.9002C24.18 20.0802 24.23 20.1402 24.6 20.2802C24.66 20.1902 24.67 20.1302 24.76 20.0902C24.83 20.1102 24.76 20.2602 24.66 20.3302H24.63C25.16 20.4002 24.56 21.4702 25.17 21.3902H25.14L25.55 21.4702C25.6 21.6102 25.35 21.5202 25.28 21.7002C25.82 21.7102 25.54 22.1602 25.94 22.2102C25.46 22.8302 26.43 22.7802 26.21 23.3002L26.34 23.1802C26.52 23.1402 26.31 23.3102 26.31 23.3802C26.42 23.2902 26.39 23.2202 26.5 23.2002C27.05 23.5802 27.05 24.4002 27.3 25.0202C27.4 25.2402 28.13 24.5902 27.95 25.0802L27.63 25.2002C28.23 25.3502 28.18 26.0002 28.72 26.1902C28.64 26.2102 28.56 26.2702 28.54 26.2302C28.4 26.4502 28.74 26.5302 28.9 26.4202C28.92 26.4902 28.76 26.5402 28.71 26.6302C28.65 26.7902 29.1 26.6602 28.94 26.8402C28.91 26.8702 28.86 26.8602 28.83 26.8602C28.96 26.8502 28.98 27.1202 29.17 26.9102C29.17 27.1302 29.46 27.1102 29.41 27.3202C29.72 27.2202 29.46 27.6502 29.84 27.4202C29.46 27.6702 29.72 27.8802 29.95 27.8502C29.82 27.9002 29.89 28.0102 29.71 28.0802C29.79 28.1802 29.92 28.2302 30.1 28.0802C29.78 28.5802 30.72 28.2202 30.22 28.7202C30.63 28.8902 30.96 29.0902 31.24 29.3102C30.86 29.5502 30.99 29.0302 30.61 29.3102C30.94 29.4702 31.37 29.4102 31.46 29.7302C31.46 29.8302 31.27 29.8002 31.19 29.8202C31.52 29.9802 31.5 30.3602 31.86 30.4602C31.82 30.4802 31.77 30.4802 31.72 30.4802C31.76 30.5202 31.74 30.6302 31.9 30.5102L31.82 30.4902C32.02 30.2502 32.46 30.3302 32.6 30.2602C32.06 30.5002 32.63 30.5802 31.93 30.8602C31.98 30.8602 32.09 30.8602 32.2 30.7702C32.2 30.8402 32.14 30.9002 31.98 30.9402C32.18 31.0502 32.33 30.8702 32.42 31.0202C32.34 31.0702 32.28 31.0602 32.18 31.1102C32.39 31.0802 32.61 31.0502 32.62 31.2302C32.56 31.2502 32.51 31.3102 32.49 31.2702C32.66 31.4702 33.17 31.3602 33.17 31.7102C32.76 31.8702 33.11 31.8702 32.8 32.0902L32.98 32.1602L33.1 32.0102C33.17 32.1302 33.46 32.0802 33.42 32.2502H33.24L33.44 32.4302L33.48 32.2302C33.72 32.2402 33.87 31.9602 33.88 32.1702C33.83 32.1602 33.95 32.2902 33.8 32.4702C33.94 32.4702 34.08 32.4502 34.06 32.5902C33.97 32.6802 33.7 32.7902 33.64 32.8502C33.94 32.7402 33.88 33.0702 34.21 32.9702C34.13 32.9902 33.96 33.0902 33.93 33.1202L34.17 33.0302C34.14 33.1302 34.11 33.1602 33.97 33.2302C34.03 33.4202 34.34 32.9302 34.29 33.2302C34.26 33.2302 34.24 33.2502 34.18 33.2402C34.21 33.4902 34.55 33.5202 34.56 33.7702C34.28 34.0202 34.38 33.6702 34.15 33.8902C34.37 34.1102 34.87 34.1802 34.94 34.4702V34.4002C35.42 34.1502 34.84 34.7202 35.13 34.7202C35.08 34.7202 34.86 34.8402 34.91 34.8102C34.94 35.0202 35.23 35.0902 35.54 35.2602L35.4 35.3002C35.36 35.4602 35.5 35.6002 35.52 35.7402C35.66 35.7002 35.67 35.7702 35.82 35.6302C35.36 36.3702 36.57 36.0502 36.19 36.6802C36.17 36.6502 36.04 36.6602 36.05 36.6802L36.31 36.8702C36.5 36.7302 36.41 36.7602 36.53 36.6202C36.67 36.5802 36.8 36.6002 36.84 36.6602C36.64 36.6202 36.52 36.8502 36.44 36.9702C36.5 36.9302 36.57 36.9002 36.63 36.8602C36.36 37.2002 37.04 36.6402 36.91 36.9702L36.8 37.0202C36.89 37.0602 37.07 37.0402 37.08 37.1302C36.87 37.3002 36.93 37.1302 36.74 37.2302C36.81 37.3202 37.3 37.1702 37.12 37.4002C37.03 37.4002 36.99 37.3302 36.9 37.3302C36.69 37.5902 36.77 37.5602 36.77 37.6602L36.75 37.9002L36.8 37.8102C37.48 37.5802 37.07 38.0102 37.56 37.9502C37.09 38.0002 37.33 38.0502 37.06 38.1902C37.01 38.2802 36.97 38.3902 36.89 38.4202C37.15 38.3802 36.81 38.6502 37.18 38.5902C37.1 38.6402 37.22 38.6802 37 38.7902C37.13 38.8602 37.13 38.6802 37.24 38.6302C37.63 38.6302 37.12 39.2202 37.65 39.2302C37.93 39.3402 38.24 39.2102 38.49 39.3202C38.39 39.4602 38.15 39.4502 38.15 39.4502C38.09 39.6302 38.15 39.6902 38.31 39.7302C38.22 39.7502 38.17 39.8102 38.1 39.8902C38.17 39.9602 38.44 39.7602 38.37 39.9402C38.27 39.9802 38.1 40.0402 37.99 40.0602C38.12 40.1102 38.33 40.1102 38.46 40.1602C38.33 40.2702 38.2 40.2302 38.09 40.2502C38.22 40.3202 38.38 40.4502 38.64 40.3502L38.68 40.2302C38.68 40.2302 38.49 40.3702 38.43 40.3602C38.19 40.3702 38.43 40.1802 38.52 40.1302L38.61 40.1702C39.07 39.8102 38.37 39.9402 38.32 39.7902L38.71 39.6402L38.33 39.6702C38.41 39.5902 38.6 39.4502 38.69 39.4902C38.81 39.2902 38.51 39.4802 38.66 39.2802C38.69 39.2502 38.71 39.2502 38.72 39.2502L38.56 39.2202C38.65 39.1902 38.8 39.0602 38.79 39.1502C38.9 38.8602 38.36 39.0302 38.59 38.8002H38.62C38.36 38.6302 38.34 38.9302 37.93 38.9302L38.51 38.4302L38.23 38.5602C38.23 38.5602 38.22 38.4702 38.33 38.4202C38.1 38.4302 38.22 38.5002 38.02 38.5502C38.19 38.2902 37.72 38.2902 38.12 38.0202C37.89 38.1002 38.03 38.2202 37.82 38.1802C38.25 37.8802 37.66 38.0802 37.8 37.8502C38.05 37.7502 37.99 37.9202 38.13 37.6902C37.7 37.8602 38.09 37.4302 37.96 37.3802C37.65 37.5602 37.71 37.2602 37.52 37.1702C37.63 37.1202 37.52 36.7802 37.55 36.5702L37.6 36.5402C37.27 36.7002 37.24 36.5202 37.11 36.4502C37.3 36.3402 37.39 36.3202 37.51 36.3202L37.45 36.2202C37.34 36.2602 37.26 36.2602 37.19 36.2202L37.44 36.1002C37.35 35.9702 37 36.0002 37.06 35.7302C36.84 35.8502 36.53 36.2402 36.28 36.1402C36.39 36.0602 36.59 35.9302 36.67 35.9502C36.64 35.9502 36.54 35.9502 36.57 35.8902L36.81 35.8402C36.85 35.7102 36.62 35.9002 36.6 35.8302C36.77 35.7302 36.69 35.7102 36.83 35.6402C36.86 35.6402 36.79 35.7402 36.87 35.7202C36.86 35.6302 36.9 35.4902 37.02 35.3802C36.93 35.4402 36.79 35.5202 36.74 35.4802C36.65 35.3502 36.91 35.3102 36.95 35.1802C36.81 35.2202 36.88 35.0602 36.63 35.2102C36.61 35.1702 36.72 35.0902 36.78 35.0302C36.63 35.0302 36.55 34.7302 36.33 34.9702V35.0002H36.31C35.92 34.9302 36.16 34.4502 35.92 34.2902L36 34.2402C35.82 34.1702 35.76 33.9802 35.52 34.0002C35.5 33.9602 35.62 33.8102 35.73 33.7702C35.6 33.7102 35.5 33.7502 35.55 33.5202C35.76 33.5302 35.66 33.4002 35.72 33.5602C35.71 33.3802 35.82 33.2702 35.51 33.2702C35.75 33.1802 35.72 33.0002 35.61 32.9802L35.52 33.1702C35.44 33.1202 35.42 33.0502 35.4 32.9702L35.7 32.8302C35.87 32.3402 34.81 32.7102 35.25 32.1502C35.01 32.2002 35.2 32.3802 34.93 32.4702C34.89 32.3202 35.21 31.9402 35.19 31.9002C35.24 31.6302 34.68 32.0002 34.67 31.7602C34.58 31.8502 34.33 32.0402 34.15 31.9702C34.11 31.8202 34.47 31.5502 34.6 31.5802C34.63 31.6002 34.6 31.6402 34.57 31.6602C34.63 31.6802 34.71 31.7002 34.78 31.5802L34.67 31.6302C34.73 31.5002 34.61 31.3402 34.8 31.2702C34.65 31.2402 34.61 31.3402 34.6 31.4402C34.64 31.1902 34.45 31.1902 34.44 30.9602C34.4 31.0202 34.3 31.1202 34.28 31.0902C34.25 30.7702 34.02 31.1102 33.87 30.9802C33.96 30.7902 34.25 30.7802 34.02 30.7002C34.06 30.5302 34.27 30.5102 34.38 30.4902C34.09 30.4702 34.32 30.1302 34.3 30.0202L34.43 30.0502C34.35 30.0302 34.33 30.0002 34.3 29.9602L34.13 30.1302C34.13 30.0602 34.11 30.0202 34.19 29.9702C34.03 30.0102 33.88 30.2202 33.64 30.2502C33.7 30.1202 33.41 30.1402 33.66 29.9402C33.7 30.1902 33.91 29.7402 34.06 29.8802C34.01 29.8702 33.98 29.8302 33.99 29.7602C34.01 29.7302 34.05 29.7302 34.07 29.7302C34.18 29.3902 33.72 29.8402 33.6 29.6502C33.76 29.5802 33.85 29.4202 33.8 29.4102C33.85 29.4902 33.58 29.6102 33.42 29.6102C33.46 29.4102 33.25 29.5302 33.22 29.4602V29.5702C33.05 29.6402 33.03 29.5702 32.93 29.5202C33.04 29.4402 33.06 29.5402 33.09 29.4802C32.77 29.5602 33.22 29.0902 32.96 29.0702C33.02 28.9402 33.23 28.8802 33.27 28.7802C32.98 28.7602 33.37 28.4902 33.1 28.4402C32.93 28.6202 32.99 28.5902 32.72 28.6102L33.03 28.7702L32.63 28.8002C32.68 28.8802 32.86 28.8802 32.86 28.9402C32.65 28.9702 32.7 28.9402 32.56 29.0902C32.79 28.7902 32.25 29.0002 32.37 28.7502L32.86 28.4202C32.96 28.0902 32.39 28.2702 32.35 27.9502L32.32 28.0802C32.1 28.1802 32.19 27.9502 32.06 27.9302C32.23 27.8302 32.26 27.7402 32.34 27.6402C32.22 27.7302 32.23 27.4602 31.89 27.6602L32.03 27.4102C31.99 27.1602 31.42 27.5102 31.35 27.2902C31.56 27.2202 31.62 27.0602 31.83 27.1002C31.79 27.0402 31.78 26.9602 31.67 27.0402C31.75 26.9302 31.34 27.0202 31.45 26.8602C31.36 26.8802 31.19 26.9902 31.15 26.9102C31.18 26.8802 31.23 26.8502 31.23 26.8502C31.15 26.9002 31.05 26.8202 30.91 27.0002C31.29 26.4702 30.51 26.5102 30.83 26.0502C30.68 25.9602 30.52 25.8302 30.43 25.7202C30.48 25.6902 30.51 25.6602 30.51 25.7002C30.55 25.4302 29.98 25.9202 30.01 25.6202C30.2 25.3402 30.22 25.6202 30.28 25.4902C30.79 25.0902 30.05 25.3202 30.28 24.9702H30.33C30.44 24.7502 29.96 24.8902 29.89 24.7002C29.89 24.7002 29.94 24.6702 29.97 24.6402C29.63 24.7202 29.39 24.5902 29.21 24.4902C29.45 24.3902 29.37 24.4802 29.56 24.3002C29.48 24.2502 29.24 24.5602 29.08 24.4702C29.16 24.3502 29.19 24.1802 29.41 24.0102L29.51 24.1302C29.75 23.8602 29.38 23.9702 29.38 23.8702L29.51 23.7902C29.33 23.6302 29.01 23.8502 28.88 23.6302L28.8 23.7202C28.4 23.8302 28.91 23.5002 28.59 23.5502L28.89 23.2802C28.76 23.2602 28.39 23.2402 28.23 23.1502C28.52 23.0502 28.76 23.1202 28.97 23.1202C28.92 23.0402 28.76 22.8802 28.58 22.9602C28.63 22.9602 28.74 22.9502 28.71 23.0102C28.39 23.1002 28.18 23.0702 28.08 22.9202C28.72 22.5002 27.96 22.4202 28.36 21.9602C27.94 21.8702 28.07 21.3702 27.81 21.1002C27.41 21.5602 27.73 21.0202 27.25 21.4002C27.17 21.3502 27.15 21.3202 27.18 21.2902L27.31 20.8602C27.42 20.7002 27.47 20.8502 27.57 20.7602C27.49 20.5802 27.73 20.5402 27.78 20.3402C27.62 20.4902 27.49 20.4702 27.49 20.3402L27.36 20.6302C26.94 20.6102 27.63 20.1402 27.21 20.1102L27.42 20.0602C27.25 20.0202 27.12 19.6402 26.64 19.8302C26.68 19.7702 26.8 19.6402 26.87 19.6602C26.73 19.3502 26 19.3902 26.09 19.0002L26.22 18.9302C26.15 18.9102 25.93 19.0102 26 18.8602C26.05 18.8302 26.13 18.7902 26.12 18.7602C26.06 18.7602 25.81 18.7902 25.83 18.6702L26.01 18.6202C25.97 18.2402 25.38 18.4702 25.14 18.3202C25.49 18.0502 25.45 17.7602 25.42 17.6202L25.47 17.5902C25.28 17.2602 24.78 17.3102 24.43 17.1402C24.67 16.6702 24.13 16.4402 24.13 16.0002C24.1 16.0902 23.86 16.2102 23.78 16.1902C23.8 16.0702 23.4 16.2002 23.72 15.9602V15.9902C24 15.7002 23.82 15.6302 23.74 15.5202L23.31 15.8302C23.69 15.0802 22.52 15.3102 22.94 14.7302C22.79 14.7502 22.72 14.6702 22.57 14.6902L22.79 14.5202C22.7 14.3002 22.66 14.1802 22.43 14.0102L22.62 13.9302C22.53 13.7902 21.86 14.2902 21.75 14.1902L22.05 13.8902C21.87 13.6802 21.97 13.2202 21.5 13.2602C21.55 13.2202 21.65 13.1502 21.69 13.1802C21.61 13.0702 21.58 12.6102 21.17 13.0102C21.46 12.7702 21.01 12.7602 20.79 12.7602L21.02 12.6002C20.67 12.7302 20.59 12.7902 20.4 12.7202C20.4 12.6602 20.55 12.5502 20.53 12.6402C20.55 12.4402 20.26 12.7302 20.26 12.5002L20.44 12.4302C20.36 12.3102 20.3 12.3802 20.09 12.4502C19.95 12.4502 19.97 12.1902 20.15 12.0202C20.02 12.1002 19.81 12.1802 19.81 12.0602C19.88 11.9902 19.94 11.9802 19.97 11.9702C19.97 11.6602 19.49 11.9102 19.59 11.6002C19.66 11.5402 19.69 11.5002 19.7 11.4702C19.82 11.6202 19.91 11.7502 19.88 11.7502C20.08 11.5802 20.01 11.4402 20.36 11.3002C20.13 11.3302 19.67 11.4402 19.67 11.2502C19.68 11.2302 19.7 11.2102 19.72 11.1802H19.75C19.75 11.1802 19.71 11.1202 19.66 11.1302C19.66 11.0702 19.66 11.0202 19.64 10.9802C19.79 10.8302 19.61 10.7702 19.57 10.7002C19.36 10.8902 19.33 10.7802 19.21 11.0002C19.21 10.9802 19.24 10.9902 19.29 11.0202C19.3 11.0202 19.32 11.0302 19.33 11.0202H19.31C19.31 11.0202 19.4 11.1102 19.45 11.1702C19.3 11.2202 19.17 11.2502 19.23 11.0802C19.07 11.1602 18.9 11.2502 18.82 11.2902C19.05 10.9602 19.08 10.6602 19.24 10.4802C18.97 10.4002 18.8 10.1302 18.3 10.3602C18.21 10.3602 18.36 10.2002 18.41 10.1302C18.48 10.1302 18.5 10.1602 18.57 10.1302C18.38 10.1202 18.27 9.86021 17.97 10.0802C17.99 9.84021 18.29 9.93021 18.09 9.79021L18.2 9.74021C18.34 9.01021 17 9.80021 17.23 8.93021C17.22 8.99021 17.21 9.01021 17.17 9.06021C17.04 8.41021 16.15 8.38021 16.16 7.60021C16.13 7.41021 15.94 7.55021 15.74 7.60021L15.94 7.37021L15.57 7.48021C15.22 7.48021 15.84 6.68021 15.28 6.78021L15.16 6.95021C15.12 6.84021 14.84 6.78021 15.02 6.63021C14.99 6.65021 14.84 6.75021 14.89 6.64021L15 6.53021H14.62C14.56 6.28021 15.1 6.12021 14.92 5.87021C14.8 5.83021 14.37 5.94021 14.32 6.05021C14.34 6.09021 14.32 6.20021 14.21 6.31021L14.08 6.29021C13.73 6.59021 13.32 6.86021 13.25 7.26021L13.58 7.20021L13.45 7.39021L13.34 7.29021C13.24 7.50021 13.41 7.41021 13.55 7.36021C13.47 7.45021 13.43 7.53021 13.42 7.58021L13.86 7.41021C13.74 7.55021 13.54 7.60021 13.54 7.75021C13.75 7.67021 13.79 7.42021 13.98 7.42021C13.88 7.62021 13.74 7.72021 13.94 7.67021C13.86 7.76021 13.79 7.80021 13.73 7.80021C13.89 7.77021 13.93 7.93021 14.14 7.80021C14.01 8.04021 14.39 7.97021 14.06 8.26021C14.16 8.21021 14.42 8.14021 14.49 8.19021C14 8.44021 14.67 8.43021 14.22 8.78021C14.64 8.54021 14.64 8.93021 14.96 8.89021C14.92 8.91021 14.85 8.94021 14.86 8.91021C14.9 9.02021 14.82 9.13021 14.8 9.25021C15.1 9.00021 15.28 9.07021 15.52 8.97021C15.33 9.32021 15.12 9.22021 14.88 9.49021C15.11 9.27021 15.27 9.45021 15.44 9.24021C15.33 9.47021 15.41 9.38021 15.2 9.64021C15.58 9.33021 15.32 9.66021 15.6 9.52021C15.52 9.79021 15.28 9.85021 15.5 9.87021C15.44 10.0302 15.21 10.0402 15.21 10.0402L15.32 9.97021ZM18.47 12.2902C18.47 12.2902 18.42 12.2602 18.41 12.2402C18.42 12.2402 18.44 12.2602 18.48 12.2902H18.47ZM18.68 12.5402C18.68 12.5402 18.63 12.4602 18.6 12.4302C18.67 12.3602 18.75 12.3002 18.77 12.3302C18.71 12.3602 18.72 12.4502 18.68 12.5402ZM19.72 10.7502C19.78 10.7602 19.75 10.8102 19.72 10.8502C19.7 10.8302 19.67 10.8202 19.64 10.8002L19.61 10.8202C19.61 10.8202 19.7 10.7602 19.73 10.7402L19.72 10.7502Z">
</svg>
<svg class="svg-2" width="1318" height="12" viewBox="0 0 1218 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M112.648 11.72C117.797 11.72 114.999 10.63 116.053 9.99001C122.175 9.66001 118.932 10.8 121.081 11.36C124.892 11.05 127.811 10.03 130.649 10.06C130.892 10.24 131.419 10.31 130.811 10.54C134.825 9.65 142.852 10.46 147.556 9.34C147.92 9.44 148.083 9.53 148.204 9.61C147.393 9.06 147.272 8.49 147.393 8.09C149.704 8.06 151.65 7.38 152.542 8.09C151.123 8.07 151.002 8.37 150.353 8.59L152.745 8.27C154.975 9.3 149.461 8.64 149.502 9.41C154.205 9.06 159.678 8.18 163.286 8.46C164.097 9.48 154.853 8.83 159.719 9.72L154.083 9.35C158.462 10.94 150.677 9.25 154.691 10.96C162.07 11.23 162.922 10.41 170.26 10.69C171.882 10.12 169.652 9.85 171.273 9.28C181.653 8.23 179.625 11.82 187.248 10.43C189.194 9.74 189.883 8.45 195.397 9.12L193.613 10.28C200.749 10.37 197.586 8.61 205.127 9.36C203.83 9.82 199.532 9.76 200.627 9.89C205.533 10.78 204.033 9.23 207.722 9.21L208.533 10.23C216.115 10.04 224.426 9.28 232.859 9.07C232.413 9.37 230.994 9.7 232.981 10C243.562 9.46 255.644 10.05 265.902 10.62L269.754 9.73C270.646 9.73 271.456 10.12 270.483 10.3C274.497 10.62 270.646 9.74 272.551 9.39C274.821 9.32 275.592 9.89 274.132 10.16C281.146 9.39 294.08 8.49 301.54 9.41L300.121 9.68C305.918 10.02 306.526 7.85 311.919 8.66L310.905 8.82C323.474 9.16 337.258 8.31 346.908 9.61C348.651 8.34 359.355 10.14 360.044 8.36C367.261 9.21 365.193 9.54 375.329 10.09C378.005 10.16 379.261 8.97 382.586 8.78L382.708 9.7L387.167 8.72L389.641 9.82L392.762 9.57C391.506 9.52 390.087 9.16 390.289 8.9C395.155 8.47 402.209 9.51 402.371 9.98L413.845 9.16C413.602 9.53 411.696 9.67 410.156 9.91C416.278 8.95 411.331 10.88 416.926 10C416.156 9.79 417.291 9.45 417.413 9.26C420.251 9.81 426.657 9.79 431.36 9.54L430.468 10.18C439.023 10.31 448.469 9.82 458.078 9.8C454.632 9.51 455.362 8.41 458.159 8.29L459.335 9.26C461.119 8.65 456.375 8.9 460.065 8.15C463.673 8.25 462.538 9.25 460.511 9.58L464.849 9.23C465.133 9.52 464.119 9.68 463.876 10.05C465.619 9.44 471.457 11.01 473.971 9.94L474.214 10.23C483.823 10.21 488.161 9.86 495.946 9.78C496.067 8.94 499.108 9.11 501.419 8.42C507.176 8.67 513.582 9.31 520.515 9.22C525.34 8.78 521.893 8.50001 524.042 7.99001C524.448 8.76001 531.34 8.66 527.813 9.23C536.124 9.08 538.435 9.04 548.895 8.39C547.72 8.08 546.463 7.95 547.112 7.68C549.017 7.55 551.45 7.99 551.206 8.36L550.72 8.44C562.437 7.25 578.046 10.59 587.371 8.96L586.844 9.04L596.534 8.17C601.034 8.29 593.858 8.76 597.223 9.22C607.643 7.9 613.846 9.35 622.441 8.47C629.253 10.71 646.2 8.23 655.322 9.65L654.754 9.12C657.065 8.59 657.592 9.42 659.336 9.53C659.052 9.12 656.782 9.06 658.201 8.76C677.945 8.05 699.069 9.41 719.381 9.83C726.8 9.95 723.435 7.05 732.882 8.3L730.287 9.3C745.207 8.07 760.897 9.25 775.493 8.2C774.642 8.43 774.601 8.73 773.182 8.73C776.304 9.44 784.615 8.73 784.656 8.15C786.926 8.21 785.223 8.68 786.642 8.98C789.764 9.4 794.386 8.04 796.089 8.75C796.373 8.87 795.238 8.99 794.67 9.04C796.697 8.69 804.117 9.1 802.13 8.28C807.644 8.66 812.631 7.88 817.05 8.36C819.888 7.42 826.497 8.79 827.348 7.47C827.024 8.83 837.038 8.54 840.484 7.9C839.349 8.31 843.525 8.32 842.187 8.89C846.16 8.86 849.769 8.6 849.079 7.91C856.458 9.52 863.716 6.57 867.932 8.65C879.69 7.9 890.596 7.39 901.178 7.05C900.813 8.4 889.461 7.2 889.947 8.62C900.002 8.04 905.759 6.87 915.733 7.19C918.328 7.37 914.273 7.78 913.422 8.01C923.477 7.44 932.842 8.11 941.762 7.37C941.762 7.5 940.789 7.63001 939.856 7.74001C941.6 7.69001 943.951 7.93 943.748 7.32L942.046 7.49001C939.208 6.60001 949.019 5.62 949.343 5.15C946.384 6.91 958.182 5.59 953.438 7.82C954.614 7.7 956.033 7.41 955.79 7C957.493 7.12 958.06 7.36 956.317 7.83C962.642 7.49 960.371 6.84 966.088 6.85C966.088 7.15 964.912 7.26 964.345 7.61C967.223 7.03 970.142 6.45 974.967 6.7C974.683 6.88 975.251 7.11 973.791 7.11C982.103 7.02 987.941 5.56 997.063 6.12C994.387 7.41 1000.14 6.55 1000.63 7.67L1005.54 7.34L1003.59 6.8C1007.89 6.82 1011.66 6.01 1015.35 6.38L1012.15 6.84L1020.17 6.63L1015.63 6.2C1019.97 5.63 1015.19 4.78 1020.9 5.1C1019.73 5.21 1025.2 5.12 1027.43 5.78C1029.54 5.43 1031.73 5.05 1034.93 5.33C1035.74 5.69 1034.24 6.57001 1034.77 6.81001C1036.88 5.88001 1044.82 6.56 1047.5 5.57C1046.61 5.8 1046.57 6.39 1046.85 6.51L1048.63 5.75C1050.62 6 1050.9 6.11 1050.58 6.58C1056.54 6.73 1048.72 5.16 1055.81 5.78C1055.24 5.84 1055.53 5.95 1054.35 6.07C1061.49 6.4 1068.14 5.61001 1074.66 5.99001C1076.57 7.12001 1068.95 6.26 1071.14 7.21C1080.58 7.02 1090.72 5.9 1099.84 6.19L1098.14 6.06001C1099.48 4.47001 1104.91 6.86 1109.57 6.12C1108.44 6.24 1108.03 7 1108.35 6.82C1114.6 7.09 1121.17 6.46 1130.65 6L1129.48 6.41C1133.13 6.79 1139.17 6.66 1143.14 6.86C1144.36 6.46 1146.63 6.53 1145.29 5.93C1157.41 8.3 1168.81 4.77 1179.55 6.77C1178.25 6.77 1176.43 7.11 1177.44 7.12L1186.73 6.79C1186.04 6.09 1185.55 6.36 1183.64 5.82C1184.86 5.41 1187.5 5.11 1189.81 5.12C1185.59 5.56 1189.77 6.23 1191.51 6.63C1191.23 6.42 1191.87 6.18 1191.71 5.97C1196.46 7.23 1192.64 4.58 1199.17 5.44L1198.81 5.8C1201.28 5.63 1203.63 5.16 1206.31 5.27C1207.36 6.08 1203.63 5.63 1203.39 6.29C1207.16 6.26 1210.93 4.81 1214.25 5.63C1212.63 5.84 1210.36 5.83 1208.74 6.04C1212.35 7 1212.79 6.77 1215.51 6.93L1215.23 6.91L1221.55 7.38L1219.97 7.12C1224.88 5.06 1229.58 6.8 1236.03 5.47C1229.74 6.73 1234.93 6.21 1234.36 7.12C1235.95 7.38 1238.38 7.68 1237.65 7.93C1240.73 7.22 1242.55 8.54001 1246.89 7.49001C1247.05 7.78001 1250.09 7.54 1249.32 8.27C1253.22 8.07 1248.47 7.75 1248.84 7.39C1254.96 6.43 1262.74 8.71 1271.54 7.4C1279.04 6.89 1280.54 5.92 1287.52 5.48C1289.79 5.97 1285.45 6.53 1285.45 6.53C1289.14 6.99 1291.98 6.93 1295.54 6.63C1294.77 6.88 1295.5 7.1 1296.52 7.44C1299.36 7.39 1298.58 6.39 1302.23 6.86C1301.54 7.18 1300.65 7.69 1299.23 8.01C1302.6 7.77 1306 7.26 1309.49 7.02C1310.34 7.54 1307.3 7.77 1306 8.09C1309.94 7.9 1316.14 7.72 1317.48 6.93L1315.05 6.62C1316.46 6.59 1315.65 7.32 1314.6 7.46C1311.15 8.06 1309.82 7.14 1309.69 6.84L1312.17 6.68C1309.9 4.94 1302.23 6.86 1297.29 6.72L1299.52 5.49001L1294.29 6.48C1293.23 6.15 1292.58 5.44 1295.1 5.28C1291.61 4.63 1291.9 5.70001 1288.94 4.99001C1288.61 4.88001 1288.77 4.82 1289.1 4.77L1285.57 5.11C1286.3 4.85 1285.12 4.22 1287.23 4.42C1281.07 3.65 1277.06 5.28 1274.83 4.32L1275.35 4.25C1266.64 4.61 1274.38 5.16 1267.77 6.18L1263.68 3.89L1262.7 4.8C1261.81 4.76 1260.07 4.68001 1260.43 4.31001C1257.03 4.91001 1260.96 4.71 1258.93 5.29C1254.72 4.42 1247.01 5.59 1246.2 4.13C1244.58 4.82 1250.26 4.69 1245.59 5.15C1244.46 3.57 1240.24 5.39 1236.39 4.64C1237.69 3.84 1241.38 4.29 1237.53 3.54C1235.01 4.89 1229.9 3.19 1226.54 3.43C1226.26 4.52 1219.28 3.84 1213.69 4.17C1214.09 3.8 1203.27 3.51 1198.12 3.09L1198.28 2.91C1197.19 4.01 1191.87 3.77 1187.94 3.98C1188.14 3.32 1188.87 3.06 1190.98 2.78H1187.33C1186.44 3.12 1185.31 3.3 1182.91 3.41L1183.89 2.59C1179.02 2.61 1173.99 3.51 1167.79 2.93C1167.39 3.7 1172.62 5.09 1165.97 5.57C1165.76 5.15 1165.56 4.44 1167.31 4.28C1166.74 4.33 1165.28 4.62 1164.14 4.43L1166.82 3.74C1163.98 3.42 1165.28 4.32001 1163.01 4.24001C1163.09 3.65001 1161.35 3.81 1161.71 3.34C1162.28 3.28 1163.7 3.59 1164.59 3.36C1162.03 3.24 1158.95 2.88 1157.94 2.43C1158.14 2.77 1157.9 3.23 1155.99 3.3C1151.13 3.33 1154.37 2.58 1151.53 2.27C1150.32 2.68 1147.24 2.24 1147.11 3.12C1145.7 3.12 1145.45 2.7 1144.93 2.45C1142.37 2.83 1133.17 2.52 1135.92 3.47L1136.57 3.53C1136.57 3.53 1136.29 3.55 1136.17 3.57C1127.86 4.42 1119.06 3 1110.83 3.37V3.07C1105.96 3.4 1099.96 3.24 1096.44 3.87C1094.98 3.87 1093.03 3.32 1093.68 2.97C1089.95 3.18 1089.5 3.51 1084.11 3.01C1087.88 2.5 1082.81 2.55 1087.96 2.64C1083.1 2.37 1082.04 1.9 1076.77 2.69C1078.56 1.93 1073.16 1.73 1070.81 1.95L1074.22 2.5C1071.62 2.61 1069.35 2.54 1067.04 2.47L1068.3 1.47C1058.36 0.240001 1050.3 3.51 1042.8 1.47C1040.16 2.16 1048.19 1.97 1045.84 2.78C1041.26 2.64 1036.51 1.2 1035.09 1.19C1028.85 0.630002 1029.21 2.64 1022.69 2.26C1023.54 2.62 1024.31 3.57 1019.4 3.9C1014.82 3.77 1013.81 2.4 1016.69 2.12C1017.78 2.09 1018.31 2.2 1018.27 2.32C1019.73 2.19 1021.67 2.04 1019.89 1.65L1019.28 2.01C1017.01 1.65 1010.73 1.68 1012.19 1.1C1008.74 1.44 1010.69 1.68 1013.28 1.87C1007.4 1.35 1004.12 1.85 998.077 1.5C999.05 1.7 999.901 2.12 998.969 2.11C990.09 1.66 995.076 2.78 989.076 2.94C985.67 2.4 990.292 1.64 984.251 2.1C980.562 1.73 983.481 1.16 984.941 0.860001C979.427 1.55 974.643 0.410001 971.48 0.290001L974.399 0C972.656 0.17 971.237 0.170004 969.777 0.160004L971.44 0.870003C969.737 0.750003 968.277 0.740001 968.318 0.450001C966.574 0.920001 969.656 1.63 966.169 2.27C963.899 1.91 959.277 2.66 958.466 1.72C965.601 2.04 957.655 0.770003 963.696 0.620003C962.52 0.730003 961.101 0.730002 959.398 0.600002C959.155 0.490002 959.641 0.400002 960.087 0.350002C953.236 -0.489998 956.966 1.42 949.87 1.4C950.762 0.870002 948.208 0.39 947.073 0.5C949.911 0.5 948.451 1.39 945.816 1.8C941.275 1.39 940.87 2.11 938.518 2.07L941.235 2.26C940.302 2.79 938.032 2.73 934.869 2.9C934.586 2.49 937.748 2.61 936.613 2.43C933.126 3.37 928.666 1.47 923.76 2.11C921.49 1.75 923.517 1.11 921.531 0.870003C916.057 1.57 915.571 0.150001 909.813 0.720001C911.476 1.43 911.76 1.26 907.746 1.96L917.233 1.45L911.151 2.5C914.03 2.5 917.192 2.04 918.895 2.16C916.017 2.75 916.3 2.57 917.679 3.16C913.746 2.09 909.935 3.79 905.394 3.07L905.475 1.3C898.664 0.520003 893.393 2.23 884.555 1.8L887.393 2.1C886.217 2.81 881.92 2.21 879.082 2.5C879.325 1.91 877.541 1.7 876.284 1.33C876.446 1.77 869.797 1.3 869.027 2.48L865.054 1.71C857.918 1.4 856.945 3.41 850.093 3.23C852.12 2.58 848.998 2.17 853.58 1.7C851.269 1.7 849.242 1.6 849.201 2.01C847.863 1.64 842.876 2.82 840.768 2.26C839.795 2.52 839.511 3.14 836.957 3.1C836.673 2.98 836.957 2.81 836.957 2.81C836.957 3.1 832.943 3.22 835.214 3.87C828.078 2.04 815.509 4.05 809.306 2.48C804.319 2.69 798.319 2.9 793.778 2.95C794.062 2.77 793.778 2.65 794.63 2.71C788.345 2.18 790.859 4.42 783.723 3.82C780.034 2.87 787.494 3.29 785.183 2.94C784.129 0.990002 776.588 3.23 771.763 2.1L772.939 1.98C769.249 1.33 764.019 2.74 758.019 2.62C758.019 2.62 758.303 2.45 758.019 2.33C753.964 3.34 746.221 3.69 740.504 3.98C742.247 3.21 743.099 3.57 741.963 2.8C739.369 2.92 742.774 4.04 737.625 4.27C735.923 3.86 732.193 3.5 731.665 2.68L736.531 2.62C733.976 1.56 730.246 2.67 727.652 2.5L727.935 2.03C720.475 2.21 720.435 3.38 712.448 3.32L713.299 3.67C709.002 4.85 709.61 3.03 705.272 3.91L703.893 2.73C701.015 3.02 693.838 3.91 688.689 4.15C691.568 3.26 697.609 2.79 701.339 2.26C698.46 2.26 691.609 2.38 690.149 2.97C691.284 2.85 692.744 2.56 693.879 2.74C690.433 3.68 685.811 4.15 680.135 4.15C681.027 1.85 665.255 3.62 660.998 1.85C650.943 2.73 640.97 1.55 629.212 1.73C633.469 3.5 625.766 1.79 626.617 3.62C623.901 3.75 622.847 3.72 622.603 3.6L614.252 2.53C612.265 2 616.846 2.12 616.563 1.71C610.562 1.59 614.008 0.940001 610.035 0.470001C610.886 1.12 608.008 1.42 604.562 1.18L609.427 2.01C601.115 3.01 602.089 0.490002 593.696 1.49L596.331 0.900002C592.034 1.25 580.357 0.94 576.181 2.43C575.411 2.22 574.357 1.72 576.262 1.58C565.883 1.39 553.315 3.22 545.206 2.34L545.976 1.89C544.071 2.03 542.652 2.74 540.219 2.3C540.341 2.11 540.989 1.85 540.098 1.83C539.084 1.99 534.989 2.63 532.435 2.38L534.584 1.87C524.448 1.32 519.137 3.15 510.703 3.48C510.663 2.16 502.676 1.76 498.703 1.56L498.824 1.37C487.067 1.25 478.917 2.53 468.052 3.08C461.2 1.67 445.104 2.55 434.238 1.79C435.901 2.02 434.036 2.82 432.09 2.96C429.535 2.7 425.076 3.9 425.441 2.69L426.332 2.71C424.346 1.53 419.116 1.86 415.021 1.84L414.413 3.43C403.588 1.16 386.438 4.37 380.478 2.32C377.924 2.72 374.721 2.73 372.166 3.13L372.247 2.28C365.071 2.09 361.503 1.99 352.665 2.22L354.449 1.61C349.462 1.57 348.286 4.08 343.664 4.14L342.205 2.88C333.488 2.93 324.649 1.84 316.095 3.02C316.216 2.83 316.46 2.47 317.879 2.41C313.784 2.39 301.986 1.6 303.567 3.34C303.405 2.21 294.566 3.26 289.904 3.77L290.593 2.93C286.701 4.01 286.579 4.3 281.065 4.62C279.727 4.52 279.889 3.95 281.633 4.16C277.254 3.74 278.268 4.96 272.956 4.53L274.903 3.99001C270.402 3.94001 270.767 4.23 268.335 4.86C265.537 5.2 259.78 4.68 259.091 3.92C258.523 4.38 256.09 5.01 253.415 4.8C253.05 4.52 253.982 4.34 254.469 4.25C246.928 3.71 243.319 5.26 238.13 4.45C238.008 4.17 237.643 4.04 237.238 3.95C243.198 3.95 248.022 3.98 247.576 4.04C247.536 3.27 242.711 3.15 246.482 2.07C242.63 2.66 236.062 3.95 231.359 3.6C231.116 3.53 230.913 3.45 230.71 3.34L231.197 3.25C230.102 3.18 229.129 3.25 228.237 3.38C226.737 3.26 225.764 3.17 224.345 3.16C223.737 2.52 218.79 2.83 216.398 2.81C216.642 3.65 213.479 3.53 216.479 4.21C216.074 4.15 216.925 4.11 218.547 4.07C218.912 4.04 219.317 4.03 219.561 3.98C219.52 4 219.439 4.03 219.399 4.05C220.98 4.02 223.048 3.99 225.399 3.97C223.534 4.4 221.547 4.77001 218.872 4.31001C217.655 4.86001 216.317 5.42 215.587 5.68C212.222 4.51 205.857 3.9 204.925 3.18C197.586 3.68 187.612 3.55 183.072 5.15C181.004 5.36 180.639 4.7 179.869 4.46C181.085 4.3 182.504 4.32 183.153 4.09C178.977 4.51 170.787 4.29 169.854 5.4C164.543 4.92 172.774 4.37 165.516 4.58L166.489 4.24001C152.137 2.52001 143.501 7.14 127.568 4.92C128.662 5.06 129.23 5.12 129.433 5.3C111.391 4.36 92.3759 6.36 74.5367 4.83C69.4688 4.53 68.9417 5.23 65.901 5.78L64.7657 4.88L59.5356 5.94C52.1162 6.73 46.4806 3.76001 37.1151 5.24001L38.3719 5.85C34.9663 5.75 27.6279 6.24 28.155 5.54C27.8306 5.65 27.0603 6.18 25.7224 5.86L25.6007 5.39L17.2893 6.23C10.8024 5.91 18.1813 4.35 8.77519 4.28C5.28846 4.47 -1.15796 5.69 0.179977 6.01C1.599 6.03 3.82889 6.29 3.95052 6.77L0.747584 7.03C0.220518 8.43 -2.131 9.87 5.77498 10.82L11.2078 9.95L13.0323 10.62L8.4103 10.68C11.0456 11.31 12.7079 10.74 14.5324 10.35C14.9783 10.71 15.7892 10.96 16.8839 11.09L22.1951 9.74001C22.8843 10.29 19.8436 10.83 23.4519 11.12C25.9251 10.49 20.9788 9.9 25.1142 9.48C27.7901 10.11 27.0198 10.63 30.1011 10.07C30.547 10.43 29.8983 10.66 28.682 10.82C31.3985 10.38 35.9393 10.61 37.3178 9.87C40.1153 10.64 46.5617 9.64 46.359 10.96C47.2104 10.64 51.1431 9.91 53.6568 9.84C49.1565 11.44 63.1035 9.9 61.9682 11.6C65.2928 10.17 74.2529 10.93 80.2534 10.12C79.929 10.23 79.2803 10.47 78.7532 10.39C82.1589 10.5 83.1725 10.92 85.3618 11.18C85.7267 10 90.9974 9.72 93.8354 8.98C98.0519 10.1 91.3623 10.37 92.7407 11.45C92.4975 10.5 99.9169 10.48 98.4574 9.69C101.66 10.38 101.214 10.02 102.917 10.99C103.404 9.52001 105.877 10.73 108.472 9.82C113.134 10.53 109.728 11.19 114.756 10.73C117.188 11.17 112.729 11.71 112.729 11.71L112.648 11.72ZM232.9 8.78V8.8C231.845 8.82 230.994 8.84 230.426 8.86C230.953 8.84 231.643 8.82 232.9 8.79V8.78ZM243.035 8.74001C241.819 8.71001 240.278 8.71 238.657 8.72C238.292 8.43 238.657 8.13 239.67 8.14C239.143 8.34 241.535 8.50001 243.035 8.74001ZM221.304 2.96C222.885 2.84 223.453 3 223.656 3.17C222.885 3.19 222.034 3.22 220.858 3.28C220.818 3.31 220.736 3.35 220.655 3.38C220.818 3.22 220.98 3.07 221.264 2.95L221.304 2.96Z" />
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

class ComponentsManager {
	constructor() {
		this.instances = {
			persistent: [],
			disposable: [],
		};
	}

	init({
		scope = document,
		parent = null,
		loadInnerComponents = true,
		storage = this.instances.disposable,
		selector = ':scope [data-arts-component-name]:not(:scope [data-arts-component-name] [data-arts-component-name])',
		loadOnlyFirst = false,
		nameAttribute = 'data-arts-component-name',
		optionsAttribute = 'data-arts-component-options',
	}) {
		if (!scope) {
			return [];
		}

		let
			nodes = loadOnlyFirst ? [scope.querySelector(selector)] : [...scope.querySelectorAll(selector)],
			promises = [];

		if (!parent) {
			nodes = nodes.filter(el => el && !el.matches(':scope [data-arts-component-name] [data-arts-component-name]'));

			if (!loadOnlyFirst) {
				nodes[0] = null;
			}
		}

		if (nodes && nodes.length) {
			nodes.forEach((el) => {
				const loader = this.loadComponent({
					el,
					parent,
					storage,
					loadInnerComponents,
					nameAttribute,
					optionsAttribute
				});

				promises.push(loader);
			});
		}

		return promises;
	}

	loadComponent({
		el,
		loadInnerComponents,
		parent,
		storage,
		name = undefined,
		nameAttribute = 'data-arts-component-name',
		optionsAttribute = 'data-arts-component-options',
		options = undefined,
	}) {
		if (!el) {
			return new Promise((resolve) => {
				resolve(true);
			});
		}

		const
			componentName = name || el.getAttribute(nameAttribute),
			attrOptions = options || el.getAttribute(optionsAttribute);

		return new Promise((resolve, reject) => {
			if (typeof window[componentName] !== 'undefined') {
				const instance = new window[componentName]({
					name: componentName,
					loadInnerComponents,
					parent,
					element: el,
					options: attrOptions
				});

				storage.push(instance);

				instance.ready.then(() => resolve(true));
			} else if (app.components[componentName]) {
				this.load({
					properties: app.components[componentName],
				})
					.then((module) => {
						if (typeof module === 'object' && 'default' in module) {
							const instance = new module.default({
								name: componentName,
								loadInnerComponents,
								parent,
								element: el,
								options: attrOptions
							});

							storage.push(instance);

							instance.ready.then(() => resolve(true));
						} else {
							resolve(true);
						}
					});
			} else {
				console.error(`Component "${componentName}" is not recognized`);
				resolve(true);
			}
		});
	}

	load({
		properties = []
	}) {
		const
			depsPromises = [],
			filesPromises = [];

		return new Promise((resolve) => {
			if ('dependencies' in properties) {
				properties.dependencies.forEach((dep) => {
					if (dep in app.assets) {
						app.assets[dep].forEach((resource) => {
							// depsPromises.push(import(resource));
							depsPromises.push(app.assetsManager.load(resource));
						});
					}
				});
			}

			if ('files' in properties) {
				properties.files.forEach((resource) => {
					filesPromises.push(app.assetsManager.load(resource));
				});
			}

			Promise.all(depsPromises)
				.then(() => Promise.all(filesPromises))
				.then(() => typeof properties.file === 'string' ? import(properties.file) : {})
				.then(resolve);
		});
	}

	getComponentByName(name) {
		return this.instances.persistent.filter(instance => instance.name.toLowerCase() === name.toLowerCase())[0];
	}
}

class Forms {
	constructor() {
		this.forms = 'form';
		this.input = 'input-float__input';
		this.inputClassNotEmpty = 'input-float__input_not-empty';
		this.inputClassFocused = 'input-float__input_focused';
		this.inputParent = 'wpcf7-form-control-wrap';

		this._handlers = {
			focusIn: this._onFocusIn.bind(this),
			focusOut: this._onFocusOut.bind(this),
			reset: this._onReset.bind(this),
		};

		this.init();
	}

	init() {
		this._floatLabels();
		this._attachEvents();
	}

	_floatLabels() {
		const inputs = [...document.querySelectorAll(`.${this.input}`)];

		inputs.forEach((el) => {
			const controlWrapper = el.closest(`.${this.inputParent}`);

			// Not empty value
			if (el.value && el.value.length) {
				this._setNotEmptyValue(el, controlWrapper);
				// Empty value
			} else {
				this._setEmptyValue(el, controlWrapper);
			}

			// Has placeholder & empty value
			if ((el.placeholder && el.placeholder.length) && !(el.value && el.value.length)) {
				this._setNotEmptyValue(el, controlWrapper);
			}
		});
	}

	_setNotEmptyValue(el, controlWrapper) {
		if (el) {
			el.classList.add(this.inputClassNotEmpty);
		}

		if (controlWrapper) {
			controlWrapper.classList.add(this.inputClassNotEmpty);
		}
	}

	_setEmptyValue(el, controlWrapper) {
		if (el) {
			el.classList.remove(this.inputClassFocused, this.inputClassNotEmpty);
		}

		if (controlWrapper) {
			controlWrapper.classList.remove(this.inputClassFocused, this.inputClassNotEmpty);
		}
	}

	_setFocus(el, controlWrapper) {
		if (el) {
			el.classList.add(this.inputClassFocused);
			el.classList.remove(this.inputClassNotEmpty);
		}

		if (controlWrapper) {
			controlWrapper.classList.add(this.inputClassFocused);
			controlWrapper.classList.remove(this.inputClassNotEmpty);
		}
	}

	_removeFocus(el, controlWrapper) {
		if (el) {
			el.classList.remove(this.inputClassFocused);
		}

		if (controlWrapper) {
			controlWrapper.classList.remove(this.inputClassFocused);
		}
	}

	_isTargetInput(target) {
		return target.classList && target.classList.contains(this.input);
	}

	_isTargetForm(target) {
		return target.tagName === 'FORM';
	}

	_attachEvents() {
		window.addEventListener('focusin', this._handlers.focusIn);
		window.addEventListener('focusout', this._handlers.focusOut);
		window.addEventListener('reset', this._handlers.reset);
	}

	_detachEvents() {
		window.removeEventListener('focusin', this._handlers.focusIn);
		window.removeEventListener('focusout', this._handlers.focusOut);
		window.removeEventListener('reset', this._handlers.reset);
	}

	_onFocusIn(event) {
		const target = event.target;

		if (this._isTargetInput(target)) {
			const controlWrapper = target.closest(`.${this.inputParent}`);

			this._setFocus(target, controlWrapper);
		}
	}

	_onFocusOut(event) {
		const target = event.target;

		if (this._isTargetInput(target)) {
			const controlWrapper = target.closest(`.${this.inputParent}`);

			// not empty value
			if (target.value && target.value.length) {
				this._setNotEmptyValue(target, controlWrapper);
			} else {
				// has placeholder & empty value
				if (target.placeholder && target.placeholder.length) {
					this._setNotEmptyValue(target, controlWrapper);
				}

				this._removeFocus(target, controlWrapper);
			}
		}
	}

	_onReset(event) {
		const target = event.target;

		if (this._isTargetForm(target)) {
			[...target.querySelectorAll(`.${this.input}`)].forEach((el) => {
				const controlWrapper = el.closest(`.${this.inputParent}`);

				el.classList.remove(this.inputClassFocused, this.inputClassNotEmpty);

				if (controlWrapper) {
					controlWrapper.classList.remove(this.inputClassFocused, this.inputClassNotEmpty);
				}
			});
		}
	}
}

class HoverEffect {
	constructor() {
		this._handlers = {
			hoverIn: this._onMouseEnter.bind(this),
			hoverOut: this._onMouseLeave.bind(this),
			prevent: this.preventDefault.bind(this)
		};

		this.selectorHoverSelf = '[data-hover-class]';
		this.attributeHoverSelf = 'data-hover-class';

		this.selectorHoverGroup = '[data-hover-group-class]';
		this.selectorHoverGroupElements = `${this.selectorHoverGroup} a`;
		this.attributeHoverGroup = 'data-hover-group-class';

		this.attachEvents(document, this._handlers.hoverIn, this._handlers.hoverOut);
	}

	_onMouseEnter(event) {
		const target = event.target;

		if (target instanceof HTMLElement) {
			this._toggleHoverSelfClass({
				element: target,
				toggle: true
			});

			this._toggleHoverGroupClass({
				element: target,
				toggle: true
			});
		}
	}

	_onMouseLeave(event) {
		const target = event.target;

		if (target instanceof HTMLElement) {
			this._toggleHoverSelfClass({
				element: target,
				selector: this.selectorHoverSelf,
				attribute: this.attributeHoverSelf,
				toggle: false
			});

			this._toggleHoverGroupClass({
				element: target,
				toggle: false
			});
		}
	}

	_toggleHoverSelfClass({
		element,
		toggle
	} = {
			element: null,
			toggle: false
		}) {
		const el = element.closest(this.selectorHoverSelf);

		if (el) {
			const hoverClass = el.getAttribute(this.attributeHoverSelf);

			if (hoverClass.length) {
				el.classList.toggle(hoverClass, toggle);
			}
		}
	}

	_toggleHoverGroupClass({
		element,
		toggle
	} = {
			element: null,
			toggle: false
		}) {
		const el = element.closest(this.selectorHoverGroupElements);

		if (el) {
			const parent = element.closest(this.selectorHoverGroup);

			if (parent) {
				const hoverClass = parent.getAttribute(this.attributeHoverGroup);

				if (hoverClass.length) {
					parent.classList.toggle(hoverClass, toggle);
				}
			}
		}
	}

	attachEvents(element, onHoverInCallback, onHoverOutCallback) {
		if (element) {
			if (typeof onHoverInCallback === 'function') {
				element.addEventListener('mouseenter', onHoverInCallback, true);
				element.addEventListener('touchstart', onHoverInCallback, true);

				element.addEventListener('webkitmouseforcewillbegin', this._handlers.prevent);
				element.addEventListener('webkitmouseforcedown', this._handlers.prevent);
				element.addEventListener('webkitmouseforceup', this._handlers.prevent);
				element.addEventListener('webkitmouseforcechanged', this._handlers.prevent);
			}

			if (typeof onHoverOutCallback === 'function') {
				element.addEventListener('mouseleave', onHoverOutCallback, true);
				element.addEventListener('touchend', onHoverOutCallback, true);
				element.addEventListener('touchcancel', onHoverOutCallback, true);
			}
		}
	}

	detachEvents(element, onHoverInCallback, onHoverOutCallback) {
		if (element) {
			if (typeof onHoverInCallback === 'function') {
				element.removeEventListener('mouseenter', onHoverInCallback, true);
				element.removeEventListener('touchstart', onHoverInCallback, true);

				element.removeEventListener('webkitmouseforcewillbegin', this._handlers.prevent);
				element.removeEventListener('webkitmouseforcedown', this._handlers.prevent);
				element.removeEventListener('webkitmouseforceup', this._handlers.prevent);
				element.removeEventListener('webkitmouseforcechanged', this._handlers.prevent);
			}

			if (typeof onHoverOutCallback === 'function') {
				element.removeEventListener('mouseleave', onHoverOutCallback, true);
				element.removeEventListener('touchend', onHoverOutCallback, true);
				element.removeEventListener('touchcancel', onHoverOutCallback, true);
			}
		}
	}

	preventDefault(event) {
		event.stopPropagation();
		event.preventDefault();
	}
}

class Utilities {
	constructor() {
		this._handlers = {
			resize: this.debounce(this._updateMobileBarVh.bind(this), this.getDebounceTime(300)),
			orientationchange: this.debounce(ScrollTrigger.refresh.bind(ScrollTrigger, false), this.getDebounceTime())
		};

		this.lastVW = window.innerWidth;
		this.lastVH = window.innerHeight;

		this.mqPointer = window.matchMedia(`(hover: hover) and (pointer: fine)`);
		this.init();
	}

	init() {
		this._attachEvents();
	}

	update() {
		this._updateMobileBarVh();
	}

	destroy() {
		this._detachEvents();
	}

	_attachEvents() {
		this.attachResponsiveResize({
			callback: this._handlers.resize,
			autoDetachOnTransitionStart: false
		});

		window.addEventListener('orientationchange', this._handlers.orientationchange);
	}

	_detachEvents() {
		window.removeEventListener('orientationchange', this._handlers.orientationchange);
	}

	attachResponsiveResize({
		callback,
		immediateCall = true,
		autoDetachOnTransitionStart = true
	} = {}) {
		const self = this;

		if (typeof callback === 'function') {
			const cb = callback.bind(callback);

			function changeHandlerVW(event) {
				if (this.lastVW !== window.innerWidth) {
					this.lastVW = window.innerWidth;
					cb();
				}
			}

			function changeHandlerVH(event) {
				if (this.lastVH !== window.innerHeight) {
					this.lastVH = window.innerHeight;
					cb();
				}
			}

			const
				cbWidth = changeHandlerVW.bind(changeHandlerVW),
				cbHeight = changeHandlerVH.bind(changeHandlerVH);

			function changeHandler(event, runCallback = false) {
				if (event.matches) {
					window.addEventListener('resize', cbHeight, false);
				} else {
					window.removeEventListener('resize', cbHeight, false);
				}

				if (!!runCallback) {
					cb();
				}
			}

			function clear() {
				window.removeEventListener('resize', cbWidth, false);
				window.removeEventListener('resize', cbHeight, false);

				if (typeof self.mqPointer.removeEventListener === 'function') {
					self.mqPointer.removeEventListener('change', changeHandler);
				} else {
					self.mqPointer.removeListener(changeHandler);
				}
			}

			window.addEventListener('resize', cbWidth, false);

			changeHandler({ matches: self.mqPointer.matches }, immediateCall);

			if (typeof self.mqPointer.addEventListener === 'function') {
				self.mqPointer.addEventListener('change', changeHandler);
			} else {
				self.mqPointer.addListener(changeHandler);
			}

			if (!!autoDetachOnTransitionStart) {
				document.addEventListener('arts/barba/transition/start', clear, { once: true });
			}

			return { clear };
		}
	}

	_updateMobileBarVh() {
		document.documentElement.style.setProperty('--fix-bar-vh', `${document.documentElement.clientHeight * 0.01}px`);
		ScrollTrigger.refresh(true);
	}

	scrollTo({
		target = 0,
		ease = 'expo.inOut',
		delay = 0,
		duration = 0.8,
		offset = 0,
		container = window,
		cb = undefined
	}) {
		const
			scrollRef = app.componentsManager.getComponentByName('Scroll'),
			isSmoothScroll = this.isSmoothScrollingEnabled() && scrollRef && scrollRef.instance;

		if (duration === 0) {
			if (isSmoothScroll) {
				return gsap.set(container, {
					delay,
					scrollTo: { y: target, offsetY: offset },
					onComplete: () => {
						scrollRef.instance.scrollTo(target, { immediate: true, offset: -offset });

						if (typeof cb === 'function') {
							cb();
						}
					}
				});
			} else {
				return gsap.set(container, {
					delay,
					scrollTo: target,
					onComplete: cb
				});
			}
		} else {
			if (isSmoothScroll) {
				return gsap.to(container, {
					duration,
					delay,
					ease,
					onStart: () => {
						scrollRef.instance.scrollTo(target, {
							duration,
							offset: -offset,
							easing: gsap.parseEase(ease)
						});
					},
					onComplete: cb
				});
			} else {
				return gsap.to(container, {
					duration,
					delay,
					scrollTo: { y: target, offsetY: offset },
					ease,
					onComplete: cb
				});
			}
		}
	}

	scrollLock(lock = true) {
		const scrollRef = app.componentsManager.getComponentByName('Scroll');
		const lockClass = 'lock-scroll';

		document.documentElement.classList.toggle(lockClass, lock);

		if (this.isSmoothScrollingEnabled() && scrollRef.instance) {
			if (lock) {
				scrollRef.instance.stop();
			} else {
				scrollRef.instance.start();
			}
		}
	}

	scrollToAnchorFromHash(delay = 0.3) {
		if (window.location.hash) {
			try {
				const scrollElement = document.querySelector(window.location.hash);

				if (scrollElement) {
					return this.scrollTo({
						target: scrollElement,
						delay,
					});
				}
			} catch (error) {

			}
		}
	}

	isSmoothScrollingEnabled() {
		const scrollRef = app.componentsManager.getComponentByName('Scroll');

		return scrollRef && scrollRef.instance;
	}

	toggleClasses(element, classNamesString, force) {
		if (element && element instanceof HTMLElement) {
			const classNames = classNamesString.split(' ');

			if (classNames.length) {
				classNames.map(className => element.classList.toggle(className, force));
			}
		}
	}

	debounce(func, wait, immediate) {
		let timeout;

		return function (...args) {
			let context = this;

			let later = () => {
				timeout = null;

				if (!immediate) {
					func.apply(context, args);
				};
			};

			let callNow = immediate && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout(later, wait);

			if (callNow) {
				func.apply(context, args)
			};
		};
	}

	getDebounceTime(value = 400) {
		return value;
	}

	parseOptionsStringObject(strObj) {
		let result = {};

		if (!strObj) {
			return result;
		}

		try {
			result = JSON.parse(this.convertStringToJSON(strObj));
		} catch (error) {
			console.warn(`${strObj} is not a valid parameters object`);
		}

		return result;
	}

	convertStringToJSON(strObj) {
		if (!strObj) {
			return;
		}

		const filteredStr = strObj.replace(/'/g, '"');

		return filteredStr.replace(/(?=[^"]*(?:"[^"]*"[^"]*)*$)(\w+:)|(\w+ :)/g, function (s) {
			return '"' + s.substring(0, s.length - 1) + '":';
		});
	}

	pageLock(lock = true) {
		gsap.set('#page-blocking-curtain', {
			display: lock ? 'block' : 'none'
		});
	}

	getLinkTarget(event) {
		const target = event.target;

		if (target instanceof HTMLElement) {
			const link = target.closest('a') || target.closest('.virtual-link');

			if (link) {
				return link;
			}
		}

		return null;
	}

	degrees2Radians(degrees) {
		return degrees * (Math.PI / 180);
	}

	getHeaderHeight() {
		return parseInt(document.documentElement.style.getPropertyValue('--header-height'));
	}

	dispatchEvent(name, options, target = document) {
		const event = new CustomEvent(name, options);

		target.dispatchEvent(event);
	}

	waitForVariable(variable, checkingInterval = 20, timeout = 1000) {
		return new Promise((resolve, reject) => {
			const ticker = setInterval(() => {
				if (typeof window[variable] !== 'undefined') {
					clearInterval(ticker);
					resolve(window[variable]);
				}
			}, checkingInterval);

			setTimeout(() => {
				clearInterval(ticker);
				reject(`Global variable "window.${variable}" is still not defined after ${timeout}ms.`);
			}, timeout);
		});
	}

	isEnabledOption(obj) {
		return obj === true || (typeof obj === 'object' && (!('enabled' in obj) || ('enabled' in obj && obj['enabled'] === true)));
	}

	getTimeScaleByKey(key) {
		if (key in app.options.animations.speed && typeof app.options.animations.speed[key] === 'number') {
			if (app.options.animations.speed[key] === 0) {
				return 1;
			}

			return gsap.utils.clamp(0.01, Infinity, app.options.animations.speed[key]);
		}

		return 1;
	}

	getTriggerHookValue(defaultValue = 0.15) {
		if ('triggerHook' in app.options.animations && typeof app.options.animations.triggerHook === 'number') {
			return gsap.utils.clamp(0.0, 1.0, app.options.animations.triggerHook);
		}

		return defaultValue;
	}
}

(()=>{"use strict";var t={417:t=>{var e=function(t){return function(t){return!!t&&"object"==typeof t}(t)&&!function(t){var e=Object.prototype.toString.call(t);return"[object RegExp]"===e||"[object Date]"===e||function(t){return t.$$typeof===i}(t)}(t)},i="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function s(t,e){return!1!==e.clone&&e.isMergeableObject(t)?o((i=t,Array.isArray(i)?[]:{}),t,e):t;var i}function n(t,e,i){return t.concat(e).map((function(t){return s(t,i)}))}function a(t){return Object.keys(t).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(e){return t.propertyIsEnumerable(e)})):[]}(t))}function r(t,e){try{return e in t}catch(t){return!1}}function o(t,i,c){(c=c||{}).arrayMerge=c.arrayMerge||n,c.isMergeableObject=c.isMergeableObject||e,c.cloneUnlessOtherwiseSpecified=s;var l=Array.isArray(i);return l===Array.isArray(t)?l?c.arrayMerge(t,i,c):function(t,e,i){var n={};return i.isMergeableObject(t)&&a(t).forEach((function(e){n[e]=s(t[e],i)})),a(e).forEach((function(a){(function(t,e){return r(t,e)&&!(Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))})(t,a)||(r(t,a)&&i.isMergeableObject(e[a])?n[a]=function(t,e){if(!e.customMerge)return o;var i=e.customMerge(t);return"function"==typeof i?i:o}(a,i)(t[a],e[a],i):n[a]=s(e[a],i))})),n}(t,i,c):s(i,c)}o.all=function(t,e){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce((function(t,i){return o(t,i,e)}),{})};var c=o;t.exports=c},76:(t,e,i)=>{i.r(e)},549:(t,e,i)=>{i.r(e)}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};(()=>{i.d(s,{default:()=>h});var t=i(417);const e={init:!0,matchMedia:!1,type:"lines",set:!1,lineClass:"js-arts-split-text__line",wordClass:"js-arts-split-text__word",charClass:"js-arts-split-text__char",wrap:!1,wrapClass:!1,dropCapSelector:".has-drop-cap",reduceWhiteSpace:!0};class n{constructor({container:t,attributeSelector:i="data-arts-split-text-options",options:s}){this._data=e,t instanceof HTMLElement&&this._transformOptions({container:t,attributeSelector:i,options:s})}get data(){return this._data}set data(t){this._data=t}_transformOptions({container:i,attributeSelector:s,options:a}){if(!i)return{};let r={};if(a&&e&&(r=t(e,a)),s){let e;e="DATA"===s?function(t,e={separator:"-",pattern:/^/}){let i={};var s;return void 0===e.separator&&(e.separator="-"),Array.prototype.slice.call(t.attributes).filter((s=e.pattern,function(t){let e;return e=/^data\-/.test(t.name),void 0===s?e:e&&s.test(t.name.slice(5))})).forEach((function(t){t.name.slice(5).split(e.separator).reduce((function(e,i,s,n){return"data"===i?e:(s===n.length-1?e[i]=t.value:e[i]=e[i]||{},e[i])}),i)})),i}(i):n.parseOptionsStringObject(i.getAttribute(s)),e&&0!==Object.keys(e).length&&(e=n.transformPluginOptions(e),r=t(r,e))}this.data=r}static parseOptionsStringObject(t){let e={};if(!t)return e;try{e=JSON.parse(n.convertStringToJSON(t))}catch(e){console.warn(`${t} is not a valid parameters object`)}return e}static convertStringToJSON(t){if(t)return t.replace(/'/g,'"').replace(/(?=[^"]*(?:"[^"]*"[^"]*)*$)(\w+:)|(\w+ :)/g,(function(t){return'"'+t.substring(0,t.length-1)+'":'}))}static transformPluginOptions(t){return t}}class a{static getElementByStringSelector(t,e=document){if("string"==typeof t){const i=e.querySelector(t);if(i&&null!==i)return i}return t}static getElementsInContainer(t,e){return"string"==typeof e&&t&&null!==t?[...t.querySelectorAll(e)]:[...e]}}function r(t,e=!1){return(e?t.toLowerCase():t).replace(/(?:^|\s|["'([{])+\S/g,(t=>t.toUpperCase()))}class o{constructor({container:t,options:e={}}){this._enabled=!1,this._initialized=!1,t&&e&&(this._updateContainerElement(t),this._updateOptions(t,e),this._updateSplitTarget())}get enabled(){return this._enabled}set enabled(t){this._enabled=t}get initialized(){return this._initialized}set initialized(t){this._initialized=t}get containerElement(){return this._containerElement}set containerElement(t){this._containerElement=t}_updateContainerElement(t){this.containerElement=a.getElementByStringSelector(t)}get options(){return this._options}set options(t){this._options=t}_updateOptions(t,e){this.options=new n({container:t,attributeSelector:"data-arts-split-text-options",options:e}).data}get matchMedia(){return this._matchMedia}set matchMedia(t){this._matchMedia=t}get splitTarget(){return this._splitTarget}set splitTarget(t){this._splitTarget=t}_updateSplitTarget(){const t=this.containerElement.children;t.length>0?([...t].forEach((t=>{t instanceof HTMLElement&&(t.matches("ul")||t.matches("ol"))&&(this._wrapListElements(t),t.dataset.artsSplitTextElement="list")})),this.splitTarget=[...t]):this.splitTarget=[this.containerElement]}get splitInstance(){return this._splitInstance}set splitInstance(t){this._splitInstance=t,this.containerElement.dataset.artsSplitTextReady=null===t?"false":"true"}_updateSplitInstance(){this.splitInstance=new SplitText(this.splitTarget,{type:this.options.type,reduceWhiteSpace:this.options.reduceWhiteSpace})}_markSplitTextElements(){"chars"in this.splitInstance&&this.splitInstance.chars.length>0&&this.splitInstance.chars.forEach((t=>{t instanceof HTMLElement&&"string"==typeof this.options.charClass&&t.classList.add(this.options.charClass)})),"words"in this.splitInstance&&this.splitInstance.words.length>0&&this.splitInstance.words.forEach((t=>{t instanceof HTMLElement&&"string"==typeof this.options.wordClass&&t.classList.add(this.options.wordClass)})),"lines"in this.splitInstance&&this.splitInstance.lines.length>0&&this.splitInstance.lines.forEach((t=>{t instanceof HTMLElement&&"string"==typeof this.options.lineClass&&t.classList.add(this.options.lineClass)}))}_wrapSplitTextElements(){if(this.options.wrap&&"string"==typeof this.options.wrap){let t="";"string"==typeof this.options.wrap&&(t=this.options.wrap.slice(0,-1).toLowerCase()),this.splitInstance[this.options.wrap].forEach((e=>{if(e instanceof HTMLElement){const i=document.createElement("div");"string"==typeof this.options.wrapClass&&i.classList.add(this.options.wrapClass),i.classList.add(`js-arts-split-text__wrapper-${t}`),this._wrap(e,i)}}))}}_wrapListElements(t){[...t.querySelectorAll("li")].forEach((t=>{if(t instanceof HTMLElement){const e=document.createElement("div");e.dataset.artsSplitTextElement="wrapperLi",this._wrapInner(t,e)}}))}_wrap(t,e){t.parentNode&&(t.parentNode.insertBefore(e,t),e.appendChild(t))}_wrapInner(t,e){for(t.appendChild(e);t.firstChild!==e;)t.firstChild&&e.appendChild(t.firstChild)}_handleDropCap(){if("string"==typeof this.options.dropCapSelector){const t=this.containerElement.querySelectorAll(this.options.dropCapSelector);t.length>0&&[...t].forEach((t=>{const e=t.innerHTML[0],i=t.innerHTML.slice(1,-1);t.innerHTML=`<span data-arts-split-text-element="wrapperDropCap">${e}</span>${i}`}))}}_set(){if("artsSplitTextState"in this.containerElement.dataset&&"string"==typeof this.containerElement.dataset.artsSplitTextState){const{animationName:t,selector:e,x:i,y:s,autoAlpha:n}=JSON.parse(decodeURIComponent(this.containerElement.dataset.artsSplitTextState)),a={selector:e,duration:0,x:i,y:s,autoAlpha:n};gsap.effects[t](this.containerElement,a)}else if(this.options.set&&"type"in this.options.set&&"string"==typeof this.options.set.type){const t=`hide${r(this.options.set.type)}`;if(t in gsap.effects&&"function"==typeof gsap.effects[t]){const e={[this.options.set.direction]:"number"==typeof this.options.set.distance?`${this.options.set.distance}px`:this.options.set.distance,duration:0};"number"==typeof this.options.set.opacity&&(e.opacity=this.options.set.opacity),gsap.effects[t](this.containerElement,e)}}}}class c{constructor({condition:t,callbackMatch:e,callbackNoMatch:i}){this._handlers={change:this._onChange.bind(this)},this.condition=t,this.callbacks={match:e,noMatch:i},(this._hasMatchFunction()||this._hasNoMatchFunction())&&this.init()}init(){this.mediaQuery=this._addMatchMedia(),this._attachEvents()}destroy(){this._detachEvents(),this.mediaQuery=null}get mediaQuery(){return this._mediaQuery}set mediaQuery(t){this._mediaQuery=t}get callbacks(){return this._callbacks}set callbacks(t){this._callbacks=t}get condition(){return this._condition}set condition(t){this._condition=t}_hasMatchFunction(){return"function"==typeof this.callbacks.match}_hasNoMatchFunction(){return"function"==typeof this.callbacks.noMatch}_addMatchMedia(){return window.matchMedia(`${this.condition}`)}_attachEvents(){"function"==typeof this.mediaQuery.addEventListener?this.mediaQuery.addEventListener("change",this._handlers.change):this.mediaQuery.addListener(this._handlers.change)}_detachEvents(){"function"==typeof this.mediaQuery.removeEventListener?this.mediaQuery.removeEventListener("change",this._handlers.change):this.mediaQuery.removeListener(this._handlers.change)}_onChange(t){t.matches?this._hasMatchFunction()&&this.callbacks.match():t.matches||this._hasNoMatchFunction()&&this.callbacks.noMatch()}}gsap.registerPlugin(ScrollTrigger),gsap.registerPlugin(SplitText);var l=function(t,e){var i={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(i[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(s=Object.getOwnPropertySymbols(t);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(t,s[n])&&(i[s[n]]=t[s[n]])}return i};i(76),i(549),new class{constructor({duration:t,ease:e,hideWithOpacity:i,linesSelector:s,wordsSelector:n,charsSelector:a}={duration:1.2,ease:"power4.out",hideWithOpacity:1,linesSelector:".js-arts-split-text__line",wordsSelector:".js-arts-split-text__word",charsSelector:".js-arts-split-text__char"}){this._animations={},this._options={duration:t,ease:e,hideWithOpacity:i,linesSelector:s,wordsSelector:n,charsSelector:a},this._animations={lines:{selector:this._options.linesSelector,duration:this._options.duration,ease:this._options.ease,x:0,y:0,autoAlpha:1,stagger:{amount:.08}},words:{selector:this._options.wordsSelector,duration:this._options.duration,ease:this._options.ease,x:0,y:0,autoAlpha:1,stagger:{amount:.2}},chars:{selector:this._options.charsSelector,duration:this._options.duration,ease:this._options.ease,x:0,y:0,autoAlpha:1,stagger:{from:"end",axis:"x",amount:.3}}},this._registerAnimations()}_registerAnimations(){for(const t in this._animations){const e=r(t),i=`animate${e}`,s=`hide${e}`;gsap.registerEffect({name:i,effect:this._effect,defaults:Object.assign(Object.assign({},this._animations[t]),{animationName:i,type:"reveal"}),extendTimeline:!0}),gsap.registerEffect({name:s,effect:this._effect,defaults:Object.assign(Object.assign({},this._animations[t]),{animationName:s,y:"-103%",autoAlpha:this._options.hideWithOpacity,type:"hide"}),extendTimeline:!0})}gsap.registerEffect({name:"animateCharsDirectional",effect:this._effectCharsDirectional,defaults:Object.assign(Object.assign({},this._animations.chars),{stagger:{from:"auto",amount:.3},animationName:"animateCharsDirectional",type:"reveal"}),extendTimeline:!0}),gsap.registerEffect({name:"hideCharsDirectional",effect:this._effectCharsDirectional,defaults:Object.assign(Object.assign({},this._animations.chars),{y:"-103%",autoAlpha:this._options.hideWithOpacity,animationName:"hideCharsDirectional",type:"hide"}),extendTimeline:!0})}_effect(t,e){const i=gsap.timeline({defaults:{duration:0}});if(t&&t[0]){const s=()=>[...t[0].querySelectorAll(e.selector)],{selector:n}=e,a=l(e,["selector"]);if("type"in e){const i=a.onStart,s=a.onComplete;"reveal"===e.type&&(a.onStart=()=>{"function"==typeof i&&i(),t[0].classList.remove("split-text-animation-hidden")},a.onComplete=()=>{"function"==typeof s&&s(),t[0].classList.remove("split-text-animation-hidden"),t[0].classList.add("split-text-animation-revealed")}),"hide"===e.type&&(a.onStart=()=>{"function"==typeof i&&i(),t[0].classList.remove("split-text-animation-revealed")},a.onComplete=()=>{"function"==typeof s&&s(),t[0].classList.remove("split-text-animation-revealed"),t[0].classList.add("split-text-animation-hidden")}),delete a.type}return 0===a.duration?i.add((()=>{t[0].dataset.artsSplitTextState=encodeURIComponent(JSON.stringify(e)),delete a.stagger,delete a.duration,delete a.animationName,delete a.selector,gsap.set(s(),a)})):(delete a.animationName,delete a.selector,i.to({},{delay:a.delay,duration:a.duration,ease:a.ease,onStart:()=>{t[0].dataset.artsSplitTextState=encodeURIComponent(JSON.stringify(e)),delete a.delay,i.to(s(),a,"<")}}))}return i}_effectCharsDirectional(t,e){if(t&&t[0]){const i=[...t[0].querySelectorAll(e.selector)];if(i.length){const{selector:t}=e,s=l(e,["selector"]);if("stagger"in s&&"from"in s.stagger&&"auto"===s.stagger.from){let t;switch(gsap.getProperty(i[0],"text-align")){case"left":default:t="start";break;case"center":t="center";break;case"right":t="end"}s.stagger=function(t){let e,i=t.ease,s=t.from||0,n=t.base||0,a=t.axis,r={center:.5,end:1}[s]||0;return function(o,c,l){if(!l)return 0;let h,p,d,u,f,m,g,y,_,b,S,E=l.length;if(!e){for(e=[],g=_=1/0,y=b=-g,S=[],m=0;m<E;m++)f=l[m].getBoundingClientRect(),d=(f.left+f.right)/2,u=(f.top+f.bottom)/2,d<g&&(g=d),d>y&&(y=d),u<_&&(_=u),u>b&&(b=u),S[m]={x:d,y:u};for(h=isNaN(s)?g+(y-g)*r:S[s].x||0,p=isNaN(s)?_+(b-_)*r:S[s].y||0,y=0,g=1/0,m=0;m<E;m++)d=S[m].x-h,u=p-S[m].y,e[m]=f=a?Math.abs("y"===a?u:d):Math.sqrt(d*d+u*u),f>y&&(y=f),f<g&&(g=f);e.max=y-g,e.min=g,e.v=E=t.amount||t.each*E||0,e.b=E<0?n-E:n}return E=(e[o]-e.min)/e.max,e.b+(i?i.getRatio(E):E)*e.v}}({from:t,amount:s.stagger.amount})}return 0===s.duration?gsap.set(i,s):gsap.to(i,s)}}}};const h=class extends o{constructor(t,e={}){super({container:t,options:e}),this.options.init&&(this.options.matchMedia&&!window.matchMedia(`${this.options.matchMedia}`).matches?this.matchMedia=new c({condition:this.options.matchMedia,callbackMatch:this.init.bind(this)}):this.init())}init(){this.initialized||(this.matchMedia&&this.matchMedia.destroy(),this.options.matchMedia&&(this.matchMedia=new c({condition:this.options.matchMedia,callbackMatch:this.init.bind(this),callbackNoMatch:this.destroy.bind(this)})),this._handleDropCap(),this._updateSplitInstance(),this._markSplitTextElements(),this._wrapSplitTextElements(),this._set(),this.initialized=!0,this.enabled=!0)}destroy(){this.enabled=!1,this.initialized=!1,this.splitInstance&&this.splitInstance.revert()}}})(),this.ArtsSplitText=s.default})();