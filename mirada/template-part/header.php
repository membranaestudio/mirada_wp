<header class="header header_overlay-logo-left-burger-right js-header header_overlay-logo-left-burger-right"
    id="page-header" data-arts-component-name="Header">
    <!-- Top bar -->
    <div class="header__bar header__bar_fixed borders-auto-opacity-solid d-flex justify-content-between js-header__bar"
        data-arts-color-theme="dark" data-arts-header-sticky-class="bg-dark-1">
        <a class="header__col header__col_left logo" href="<?php echo get_home_url(); ?>">
            <div class="logo__wrapper-img">
                <img class="logo__img-primary" src="<?php bloginfo("template_url"); ?>/img/logo.svg" width="140"
                    height="72" loading="eager" alt="Mirada Externa" />
            </div>
        </a>

        <div class="header__col header__col d-none d-lg-flex ms-auto">
            <ul class="menu-classic">
                <li>
                    <a href="#nosotros">nosotros</a>
                </li>
                <li>
                    <a href="#hacemos">Hacemos</a>
                </li>
                <li>
                    <a href="#equipo">Equipo</a>
                </li>
                <li>
                    <a href="#contacto">Contacto</a>
                </li>
             
            </ul>
        </div>



        <a class="header__col header__col_right header__burger ms-auto d-inline-flex d-lg-none js-header__overlay-switcher" href="#" rel="nofollow">
            <div class="header__burger-wrapper-lines">
                <div class="header__burger-line"></div>
                <div class="header__burger-line"></div>
                <div class="header__burger-line"></div>
            </div>
        </a>

    </div>
    <!-- Overlay menu -->
    <div class="header__wrapper-overlay-menu js-header__overlay-container bg-dark-1" data-arts-color-theme="dark">
        <div class="header__overlay-inner js-header__overlay-container-inner">
            <div class="col-lg-8 col-12 header__col-overlay pb-5">
                <ul class="menu-overlay" data-arts-component-name="MenuOverlay" data-arts-component-options="{}">
                
                    <li class="menu-item-has-children">
                        <a class="overlay-menu-item" href="#nosotros" data-arts-split-text-preset="overlayMenuItem">
                            <div class="menu-overlay__heading">Nosotros</div>
                        </a>
                    </li>
                    <li class="menu-item-has-children">
                        <a class="overlay-menu-item" href="#hacemos" data-arts-split-text-preset="overlayMenuItem">
                            <div class="menu-overlay__heading">Hacemos</div>
                        </a>
                    </li>

                    <li class="menu-item-has-children">
                        <a class="overlay-menu-item" href="#equipo" data-arts-split-text-preset="overlayMenuItem">
                            <div class="menu-overlay__heading">Equipo</div>
                        </a>
                    </li>
                    <li class="menu-item-has-children">
                        <a class="overlay-menu-item" href="#contacto" data-arts-split-text-preset="overlayMenuItem">
                            <div class="menu-overlay__heading">Contacto</div>
                        </a>
                    </li>
                </ul>
                <div class="header__widget js-header__overlay-widget mt-4">
                    <a class="button button_icon ui-element button_bordered" target="_blank"
                        href="<?php the_field('acceso_clientes' , 'option'); ?>">
                        <span class="button__label button__label-normal">
                            <span class="button__title">Acceso clientes</span>
                        </span>
                        <span class="button__label button__label-hover">
                            <span class="button__title">Acceso clientes</span>
                        </span>
                    </a>
                </div>
            </div>

            <div class="col-lg-4 col-12 text-start header__col-widgets pt-5">
                <div class="header__widget js-header__overlay-widget">
                    <div class="header__widget-content h6">
                        <p>
                            <a href="tel:<?php the_field('telefono' , 'option'); ?>">
                                <?php the_field('telefono' , 'option'); ?>
                            </a>
                        </p>
                    </div>
                    <div class="header__widget-content h6">
                        <p>
                            <a href="mailto:<?php the_field('email' , 'option'); ?>">
                                <?php the_field('email' , 'option'); ?>
                            </a>
                        </p>
                    </div>
                    <div class="header__widget-content h6">
                        <p>
                            <a target="_blank" href="<?php the_field('link_google_maps' , 'option'); ?>">
                                <?php the_field('direccion' , 'option'); ?>
                            </a>
                        </p>
                    </div>
                    <div class="header__widget-content h6">
                        <p>
                            <?php the_field('santiago' , 'option'); ?>
                        </p>
                    </div>
                    <div class="header__widget-content h6">
                        <p>
                            CP: <?php the_field('cp' , 'option'); ?>
                        </p>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <?php if ( wp_is_mobile() ) : ?>
    <?php else : ?>
    <!-- <div class="menu-fixed" data-arts-component-name="ActiveSection">
        <ul>
            <li>
                <a href="#BNR">
                    <span class="cd-dot"></span>
                    <span class="cd-label logo">
                        <img class="blanco" src="<?php bloginfo("template_url"); ?>/img/BNR_blanco.svg" width="100"
                            height="39" alt="BNR" />
                        <img class="negro" src="<?php bloginfo("template_url"); ?>/img/BNR_gris.svg" width="100"
                            height="39" alt="BNR" />
                    </span>
                </a>
            </li>
            <li>
                <a href="#nosotros">
                    <span class="cd-dot"></span>
                    <span class="cd-label">Nosotros</span>
                </a>
            </li>
            <li>
                <a href="#enfoque">
                    <span class="cd-dot"></span>
                    <span class="cd-label">Enfoque</span>
                </a>
            </li>
            <li>
                <a href="#soluciones">
                    <span class="cd-dot"></span>
                    <span class="cd-label">Soluciones
                    </span>
                </a>
            </li>
            <li>
                <a href="#equipo">
                    <span class="cd-dot"></span>
                    <span class="cd-label">Equipo</span>
                </a>
            </li>
            <li>
                <a href="#contacto">
                    <span class="cd-dot"></span>
                    <span class="cd-label">Contacto</span>
                </a>
            </li>



        </ul>
    </div> -->
    <?php endif; ?>




</header>