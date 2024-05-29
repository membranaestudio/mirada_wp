<footer id="contacto" class="footer borders-auto-opacity-solid min-vh-lg-100 d-flex flex-column justify-content-between" id="page-footer">
  <div class="footer__area h-100 flex-grow-1 d-flex align-items-center">
    <div class="w-100">
      <div class="align-items-start footer__row-pb-medium footer__column-pt-medium  text-center">

        <h3 class="h2 mb-5">Conversemos</h2>
          <p>
            <a class="underline-hover d-inline-block" href="tel:<?php the_field('telefono' , 'option'); ?>">
              <span class="underline-hover__target d-inline"><?php the_field('telefono' , 'option'); ?></span>
            </a>
          </p>
          <p>
            <a class="underline-hover d-inline-block" href="mailto:<?php the_field('email' , 'option'); ?>">
              <span class="underline-hover__target d-inline"><?php the_field('email' , 'option'); ?></span>
            </a>
          </p>
          <p>
            <a class="underline-hover d-inline-block" target="_blank"
              href="<?php the_field('link_google_maps' , 'option'); ?>">
              <span class="underline-hover__target d-inline"><?php the_field('direccion' , 'option'); ?></span>
            </a>
          </p>
          <p class="underline-hover d-inline-block">
            <span class="underline-hover__target d-inline"><?php the_field('santiago' , 'option'); ?></span>
          </p>
          <div class="w-100"></div>
          <p class="underline-hover d-inline-block">
            <span class="underline-hover__target d-inline">CP: <?php the_field('cp' , 'option'); ?></span>
          </p>
      </div>
    </div>
  </div>
  <div class="footer__area bt-auto mx-4">
    <div class="w-100">
      <div class="row align-items-center footer__row-pb-small">
        
        <div class="col-12 col-md-2 col-xl-3 footer__column-pt-small text-md-start text-center">
          <div class="lazy-wrapper logo-footer">
            <img class="lazy"
              src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
              decoding="async" data-src="<?php bloginfo("template_url"); ?>/img/arbol_BNR.svg" width="90" height="90" alt="Logo gestión inteligente de patrimonio" />
          </div>
        </div>
        <div class="col-12 col-md-10 col-xl-6 footer__column-pt-small text-center text-md-end text-xl-center">
              <ul class="inline-links">
                <li><a class="underline-hover" target="_blank" href="<?php the_field('acceso_clientes' , 'option'); ?>"><span
                      class="underline-hover__target">Acceso Clientes</span></a>
                </li>
                <li><a class="underline-hover" target="_blank" href="<?php the_field('intranet' , 'option'); ?>"><span
                      class="underline-hover__target">Intranet</span></a></li>
                <li><a class="underline-hover" target="_blank" href="<?php the_field('codigo_conducta' , 'option'); ?>"><span
                      class="underline-hover__target">Código de
                      conducta</span></a></li>
              </ul>
        </div>
        
      </div>
    </div>
  </div>
</footer>