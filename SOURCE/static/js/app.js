var baseUrl = 'http://localhost:3000/mirada_wp/wp-content/themes/mirada';
var baseUrl1 = 'https://wordpress-467974-4587011.cloudwaysapps.com/wp-content/themes/mirada';


window.app = {
	/**
	 * --- Template Options ---
	 */
	options: {
		/**
		 * Header options
		 */
		header: {
			sticky: {
				toggleAttributes: {
					'data-arts-header-logo': 'data-arts-header-sticky-logo',
					'data-arts-color-theme': 'data-arts-header-sticky-color-theme',
					'class': 'data-arts-header-sticky-class'
				},
				toggleReveal: false,
				toggleStickyClass: 'header__bar_sticky',
				toggleRevealingClass: false,
				toggleScrollingDownClass: 'header__bar_scrolling-down'
			},
			observeHeight: true,
			matchMediaAutoCloseOverlay: '(min-width: 992px)'
		},

		/**
		 * Smooth scrolling options
		 */
		smoothScroll: {
			enabled: true,
			duration: 1.2,
			easing: gsap.parseEase('expo.out'),
			useGSAPRaf: true
		},

		/**
		 * Mouse cursor follower options
		 */
		cursorFollower: {
			enabled: true,
			animationDuration: 0.25,
			hideIFramesHover: true,
			trailing: 0.2,
			elastic: 1.5,
			highlight: {
				includeClass: 'cursor-highlight',
				excludeClass: 'cursor-no-highlight',
				scale: '90px',
				opacity: .4
			},
			clickScale: 0.9,
			matchMedia: '(hover: hover) and (pointer: fine)',
			passiveListeners: true,
			useCSSVars: true
		},

		/**
		 * System loading mouse indicator
		 */
		cursorLoading: false,


		/**
		 * Animations options
		 */
		animations: {
			triggerHook: 0.10,
			speed: { // slow down or speed up the animations
				preloader: 1.0,
				onScrollReveal: 1.0,
				overlayMenuOpen: 1.0,
				overlayMenuClose: 1.25,
			},
			curvedMasks: false,
			curvedMasksForceRepaint: false // fix Safari flickering
		},

		
		/**
		 * Preload components
		 */
		preloadComponents: true
	},

	// Outer content container
	containerEl: document.querySelector('#page-wrapper'),

	// Inner content container
	contentEl: document.querySelector('#page-wrapper__content'),

	

	init: () => {
		app.checkIsLocalFile();

		app.loadPreloader()
			.then(() => app.injectPreloadTags())
			.then(() => Promise.all([
				app.loadScroll(),
				app.loadHeader()
			]))
			.then(() => app.componentsManager.init({
				scope: app.containerEl,
				loadOnlyFirst: true
			})[0])
			.then(() => Promise.all(app.componentsManager.init({
				scope: app.containerEl
			})))
			.then(() => app.utilities.scrollToAnchorFromHash())
			.then(() => Promise.all([
				app.setLoaded(),
				app.loadCursor()
			]))
			.then(() => {
				app.loadLazy();
				app.initOnce();
				ScrollTrigger.refresh();
			});
	},

	setup: () => {
		/**
		 * GSAP: turn off console warnings when
		 * attempting to manipulate the null target
		 */
		gsap.config({
			nullTargetWarn: false
		});

		/**
		 * GSAP: register dependant plugins
		 */
		gsap.registerPlugin(DrawSVGPlugin);
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(ScrollToPlugin);
		gsap.registerPlugin(MorphSVGPlugin);

		/**
		 * Don't recalculate ScrollTrigger instances
		 * when mobile bottom bar is automatically hiding or showing
		 */
		ScrollTrigger.config({
			ignoreMobileResize: true
		});
	},

	utilities: new Utilities(),

	animations: new Animations(),

	assetsManager: new AssetsManager(),

	componentsManager: new ComponentsManager(),

	lazy: null,

	assets: {
		'arts-header': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-header.min.js',
			id: 'arts-header-js'
		}],
		'arts-fullpage-slider': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-fullpage-slider.min.js',
			id: 'arts-fullpage-slider-js'
		}],
		'arts-infinite-list': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-infinite-list/arts-infinite-list.min.js',
			id: 'arts-infinite-list-js'
		}],
		'arts-horizontal-scroll': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-horizontal-scroll.min.js',
			id: 'arts-horizontal-scroll-js'
		}],
		'arts-parallax': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-parallax.min.js',
			id: 'arts-parallax-js'
		}],
		'arts-cursor-follower': [{
			type: 'script',
			src: baseUrl+'/js/vendor/arts-cursor-follower.min.js',
			id: 'arts-cursor-follower-js'
		}],
		'circle-type': [{
			type: 'script',
			src: baseUrl+'/js/vendor/circletype.min.js',
			id: 'circle-type-js'
		}],
		'photoswipe': [{
			type: 'script',
			src: baseUrl+'/js/vendor/photoswipe.umd.min.js',
			id: 'photoswipe-js'
		}, {
			type: 'script',
			src: baseUrl+'/js/vendor/photoswipe-lightbox.umd.min.js',
			id: 'photoswipe-lightbox-js'
		}],
		'lenis': [{
			type: 'script',
			src: baseUrl+'/js/vendor/lenis.min.js',
			id: 'lenis-js'
		}],
		'barba': [{
			type: 'script',
			src: baseUrl+'/js/vendor/barba.min.js',
			id: 'barba-js'
		}],
		'curtains': [{
			type: 'script',
			src: baseUrl+'/js/vendor/curtains.umd.custom.min.js',
			id: 'curtains-js'
		}],
		'pristine': [{
			type: 'script',
			src: baseUrl+'/js/vendor/pristine.min.js',
			id: 'pristine-js'
		}],
		'bootstrap-modal': [{
			type: 'script',
			src: baseUrl+'/js/vendor/bootstrap-modal.min.js',
			id: 'bootstrap-modal-js'
		}],
		'isotope': [{
			type: 'script',
			src: baseUrl+'/js/vendor/isotope.pkgd.min.js',
			id: 'isotope-js'
		}],
		'dat-gui': [{
			type: 'script',
			src: baseUrl+'/js/vendor/dat.gui.min.js',
			id: 'dat-gui-js'
		}]
	},

	components: {
		'Preloader': {
			dependencies: [],
			file: baseUrl+'/js/components/preloader/Preloader.js'
		},
		'Header': {
			dependencies: ['arts-header'],
			file: baseUrl+'/js/components/header/Header.js'
		},
		'MenuOverlay': {
			dependencies: [],
			file: baseUrl+'/js/components/menuOverlay/MenuOverlay.js'
		},
		'MenuClassic': {
			dependencies: [],
			file: baseUrl+'/js/components/menuClassic/MenuClassic.js'
		},
		'SliderFullpageBackgroundsMask': {
			dependencies: ['arts-fullpage-slider'],
			files: [{
				type: 'script',
				src: baseUrl+'/js/components/sliderFullpageBase/SliderFullpageBase.js',
				id: 'slider-fullpage-base-js'
			}],
			file: baseUrl+'/js/components/sliderFullpageBackgroundsMask/SliderFullpageBackgroundsMask.js'
		},
		'SliderFullpageBackgroundsSlide': {
			dependencies: ['arts-fullpage-slider'],
			files: [{
				type: 'script',
				src: baseUrl+'/js/components/sliderFullpageBase/SliderFullpageBase.js',
				id: 'slider-fullpage-base-js'
			}],
			file: baseUrl+'/js/components/sliderFullpageBackgroundsSlide/SliderFullpageBackgroundsSlide.js'
		},
		'SliderTestimonials': {
			dependencies: ['arts-fullpage-slider'],
			file: baseUrl+'/js/components/sliderTestimonials/SliderTestimonials.js'
		},
		'InfiniteList': {
			dependencies: ['arts-infinite-list'],
			file:baseUrl+'/js/components/infiniteList/InfiniteList.js',
		},
		'CurtainsBase': {
			dependencies: ['curtains'],
			file: baseUrl+'/js/components/curtainsBase/CurtainsBase.js'
		},
		'SplitCounter': {
			dependencies: [],
			file: baseUrl+'/js/components/splitCounter/SplitCounter.js',
		},
		'MarqueeHeader': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/marqueeHeader/MarqueeHeader.js',
		},
		'MarqueeHeadingsHover': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/marqueeHeadingsHover/MarqueeHeadingsHover.js',
		},
		'ScreensWall': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/screensWall/ScreensWall.js',
		},
		'RotatingButton': {
			dependencies: ['circle-type'],
			file: baseUrl+'/js/components/rotatingButton/RotatingButton.js'
		},
		'ArcImages': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/ArcImages/ArcImages.js'
		},
		'Scroll': {
			dependencies: [],
			file: baseUrl+'/js/components/scroll/Scroll.js'
		},
		'AJAX': {
			dependencies: ['barba'],
			file: baseUrl+'/js/components/AJAX.js'
		},
		'Masthead': {
			dependencies: [],
			file: baseUrl+'/js/components/masthead/Masthead.js'
		},
		'Content': {
			dependencies: [],
			file: baseUrl+'/js/components/content/Content.js'
		},
		'Parallax': {
			dependencies: ['arts-parallax'],
			file: baseUrl+'/js/components/parallax/Parallax.js'
		},
		'HorizontalScroll': {
			dependencies: ['arts-horizontal-scroll'],
			file: baseUrl+'/js/components/horizontalScroll/HorizontalScroll.js'
		},
		'CursorFollower': {
			dependencies: ['arts-cursor-follower'],
			file: baseUrl+'/js/components/cursorFollower/CursorFollower.js'
		},
		'PSWP': {
			dependencies: ['photoswipe'],
			file: baseUrl+'/js/components/PSWP/PSWP.js'
		},
		'GMap': {
			dependencies: [],
			file: baseUrl+'/js/components/gmap/Gmap.js'
		},
		'FormAJAX': {
			dependencies: ['pristine', 'bootstrap-modal'],
			file: baseUrl+'/js/components/formAJAX/FormAJAX.js'
		},
		'Grid': {
			dependencies: ['isotope'],
			file: baseUrl+'/js/components/grid/Grid.js'
		},
		'AutoScrollNext': {
			dependencies: [],
			file: baseUrl+'/js/components/autoScrollNext/AutoScrollNext.js'
		},
		'FixedHeader': {
			dependencies: [],
			file: baseUrl+'/js/components/fixedHeader/FixedHeader.js'
		},
		'FixedWall': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/fixedWall/FixedWall.js'
		},
		'CounterUp': {
			dependencies: [],
			file: baseUrl+'/js/components/CounterUp.js'
		},
		'SliderImages': {
			dependencies: ['arts-infinite-list'],
			file: baseUrl+'/js/components/sliderImages/SliderImages.js'
		},
		'ClickAndHold': {
			dependencies: [],
			file: baseUrl+'/js/components/clickAndHold/ClickAndHold.js'
		},
		'Mask': {
			dependencies: [],
			file: baseUrl+'/js/components/mask/Mask.js'
		},
		'Gui': {
			dependencies: ['dat-gui', 'barba'],
			file: baseUrl+'/js/components/gui/Gui.js'
		},
		'ActiveSection': {
			dependencies: [],
			file: baseUrl+'/js/components/_base/ActiveSection.js'
		},
		'SVGSwipper': {
			dependencies: [],
			file: baseUrl+'/js/components/_base/svgswipper.js'
		},
		'Swipper': {
			dependencies: [],
			file: baseUrl+'/js/components/_base/swipper.js'
		},
		'CustomModal': {
			dependencies: [],
			file: baseUrl+'/js/components/customModal/CustomModal.js'
		},
		'Acordion': {
			dependencies: [],
			file: baseUrl+'/js/components/acordion/Acordion.js'
		},
		'WidthHeight': {
			dependencies: [],
			file: baseUrl + '/js/components/_base/WidthHeight.js'
		}
	},

	checkIsLocalFile: () => {
		if (window.location.protocol === 'file:') {
			const
				labelElement = document.createElement('div'),
				errorMessage = 'Please use a web-server to view this page.',
				helpURL = 'https://docs.artemsemkin.com/asli/html/getting-started/classic-workflow.html',
				helpLabel = 'Learn More';

			labelElement.id = 'localFilesystem';
			labelElement.className = 'text-center';
			labelElement.innerHTML += `<div class="strong mb-4">${errorMessage}</div>`;
			labelElement.innerHTML += `<a class="button button_solid bg-dark-3 ui-element" href="${helpURL}" target="_blank">${helpLabel}</a>`;

			gsap.set(labelElement, {
				position: 'fixed',
				top: '50%',
				left: '50%',
				translateX: '-50%',
				translateY: '-50%',
				zIndex: 99999,
				backgroundColor: '#000',
				color: '#fff',
				fontSize: 18,
				padding: '2em'
			});

			document.body.append(labelElement);

			throw new Error(label);
		}
	},

	loadLazy: () => {
		return new Promise((resolve) => {
			app.lazy = new LazyLoad({
				threshold: 800,
				cancel_on_exit: false,
				unobserve_entered: true
			});

			resolve(true);
		});
	},

	loadScroll: (resetPosition = true) => {
		if (app.shouldLoadSmoothScroll()) {
			app.components.Scroll.dependencies.push('lenis');
		}

		return new Promise((resolve) => {
			app.componentsManager.loadComponent({
				el: app.containerEl,
				loadInnerComponents: false,
				parent: null,
				storage: app.componentsManager.instances.persistent,
				name: 'Scroll',
				options: app.options.smoothScroll,
			}).then(resetPosition ? () => app.utilities.scrollTo({
				target: 0,
				delay: 0,
				duration: 0.05
			}) : null).then(() => resolve(true));
		});
	},

	shouldLoadSmoothScroll() {
		return ScrollTrigger.isTouch !== 1 && app.utilities.isEnabledOption(app.options.smoothScroll);
	},

	loadHeader: () => {
		const el = document.querySelector('#page-header');

		return app.componentsManager.loadComponent({
			el,
			loadInnerComponents: true,
			storage: app.componentsManager.instances.persistent,
			parent: null,
			options: app.options.header
		});
	},

	loadCursor: () => {
		const el = document.querySelector('[data-arts-cursor-follower="cursor"]');
		let mq;

		if (app.shouldNotLoadCursor()) {
			document.documentElement.classList.add('no-cursor-follower');
			return;
		}

		if (app.shouldLoadCursor()) {
			mq = window.matchMedia(app.options.cursorFollower.matchMedia);

			if (mq.matches) {
				return load({
					matches: true
				});
			} else {
				document.documentElement.classList.add('no-cursor-follower');

				if (typeof mq.addEventListener === 'function') {
					mq.addEventListener('change', load);
				} else {
					mq.addListener(load);
				}
			}
		} else {
			return load({
				matches: true
			});
		}

		function load(event) {
			if (event && event.matches) {
				if (mq) {
					if (typeof mq.removeEventListener === 'function') {
						mq.removeEventListener('change', this);
					} else {
						mq.removeListener('change', this);
					}
				}

				return app.componentsManager.loadComponent({
					el,
					loadInnerComponents: false,
					parent: null,
					storage: app.componentsManager.instances.persistent,
					name: 'CursorFollower',
					options: app.options.cursorFollower,
				});
			}
		}
	},

	shouldNotLoadCursor() {
		return !app.options.cursorFollower || (!!app.options.cursorFollower && !app.options.cursorFollower.enabled);
	},

	shouldLoadCursor() {
		return app.utilities.isEnabledOption(app.options.cursorFollower) && !!app.options.cursorFollower.matchMedia;
	},

	loadPreloader() {
		return new Promise((resolve) => {
			const el = document.querySelector('#js-preloader');

			if (el) {
				if (app.shouldLoadPreloader()) {
					app.componentsManager.loadComponent({
						el,
						loadInnerComponents: true,
						parent: null,
						storage: app.componentsManager.instances.persistent,
						options: app.options.preloader,
					}).then(() => resolve(true));
				} else {
					el.style.display = 'none';

					resolve(true);
				}
			} else {
				resolve(true);
			}
		});
	},

	shouldLoadPreloader() {
		return app.utilities.isEnabledOption(app.options.preloader);
	},

	setLoaded: () => { },

	injectPreloadTags: ({ container } = {
		container: app.containerEl
	}) => {
		return new Promise((resolve) => {
			if (!!app.options.preloadComponents && container instanceof HTMLElement) {
				const nextComponents = [...container.querySelectorAll('[data-arts-component-name]')];
				const rel = 'preload';

				nextComponents.forEach((component) => {
					const
						name = component.getAttribute('data-arts-component-name'),
						dependencies = app.components[name].dependencies,
						src = app.components[name].file.replace('./', './js/'),
						files = app.components[name].files;

					// Preload component file
					app.assetsManager.injectPreload({
						src,
						rel,
					});

					// Preload component files if there are any
					if (files && files.length) {
						files.forEach(({ type, src }) => {
							app.assetsManager.injectPreload({
								src,
								rel,
								as: type
							});
						});
					}

					// Prefetch dependencies if there are any
					if (dependencies && dependencies.length) {
						dependencies.forEach((dep) => {
							if (dep in app.assets) {
								app.assets[dep].forEach(({ type, src }) => {
									app.assetsManager.injectPreload({
										src,
										rel,
										as: type
									});
								});
							}
						});
					}
				});
			}

			resolve(true);
		});
	}
};

app.loaded = new Promise((resolve) => {
	app.setLoaded = resolve;
});
app.setup();
app.init();