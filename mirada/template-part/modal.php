   <?php if( have_rows('integrantes') ): ?>
   <?php while ( have_rows('integrantes') ) : the_row(); ?>
   <div class="custom-modal" data-arts-component-name="CustomModal"
     data-arts-component-options="{openers: '.integrante-<?php echo get_row_index(); ?>'}">
     <div class="close-btn">✕</div>
     <section class="container" style="max-width: 1100px">
       <div class="modal-center">
         <div class="row bg-content-white">
           <div class="col-12 col-md-6 col-lg-5 mb-4">
             <?php $image = get_sub_field('imagen'); if( !empty( $image ) ): ?>
             <div class="img">

               <img src="<?php echo esc_url($image['url']); ?>" width="<?php echo esc_attr($image['width']); ?>"
                 height="<?php echo esc_attr($image['height']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />

             </div>

             <?php endif; ?>
           </div>
           <div class="col-md-6 ps-xsmall">
             <h3 class="m-0"><?php the_sub_field('nombre'); ?>.</h3>
             <p class="mt-0 mb-4 color-blue"><?php the_sub_field('cargo'); ?></p>
                <?php the_sub_field('cv'); ?>

           </div>




         </div>
       </div>
     </section>
   </div>
   <?php  endwhile; ?>
   <?php endif; ?>