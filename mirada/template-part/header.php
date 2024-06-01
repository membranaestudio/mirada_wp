<header class="header header_overlay-logo-left-burger-right js-header header_overlay-logo-left-burger-right"
    id="page-header" data-arts-component-name="Header">
    <!-- Top bar -->
    <div class="header__bar header__bar_fixed borders-auto-opacity-solid d-flex justify-content-between js-header__bar" data-arts-header-sticky-class="bg-light-1">


        <a class="header__col header__col_left header__col_center header__col_logo logo" href="<?php echo get_home_url(); ?>">
            <div class="logo__wrapper-img">
                <img class="logo__img-primary" src="<?php bloginfo("template_url"); ?>/img/logo.svg" width="140"
                    height="72" loading="eager" alt="Mirada Externa" />
            </div>
        </a>

        <div class="header__col header__col d-none d-lg-flex ms-auto">
            <ul class="menu-classic" data-arts-component-name="ActiveSection">
                <li>
                    <a href="#nosotros">Nosotros</a>
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
               
            </div>

            
        </div>
    </div>

   




</header>