   <?php if( have_rows('equipo') ): ?>
   <?php while ( have_rows('equipo') ) : the_row(); ?>
   <div class="custom-modal" data-arts-component-name="CustomModal"
     data-arts-component-options="{openers: '.integrante-<?php echo get_row_index(); ?>'}" data-arts-color-theme="dark">
     <div class="close-btn" data-arts-cursor-follower-target="{background: 'transparent', magnetic: 0.25}">✕</div>
     <section class="container" style="max-width: 1200px">
       <div class="modal-center">
         <div class="row bg-content-white">

           <div class="col-md-6 col-lg-5 mb-5 order-md-2">
             <?php $image = get_sub_field('imagen'); if( !empty( $image ) ): ?>
             <div class=" img">
               <img src="<?php echo esc_url($image['url']); ?>" width="<?php echo esc_attr($image['width']); ?>"
                 height="<?php echo esc_attr($image['height']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
             </div>

             <?php endif; ?>
           </div>

           <div class="col-md-6 col-lg-7 mb-4 d-flex align-items-center pe-md-4">
             <div style="max-width: 520px">
               <h2 class="mt-0 mb-4"><?php the_sub_field('nombre'); ?></h2>
               <p class="mt-0 mb-1 color-yellow h5 fw-bold font-primary"><?php the_sub_field('cargo'); ?></p>
               <a class="color-yellow h5 fw-bold font-primary" href="#"><?php the_sub_field('correo'); ?></a>
               <div class="mt-4 mt-lg-5">
                 <?php the_sub_field('curriculum'); ?>
               </div>
             </div>

           </div>
         </div>
       </div>
     </section>
   </div>
   <?php  endwhile; ?>
   <?php endif; ?>

 
   