<?php
/*
Template Name: Home
*/
?>

<?php get_header(); ?>

<!-- PAGE MAIN CONTAINER -->
<main class="page-wrapper" id="page-wrapper" data-barba="container" data-arts-color-theme="dark">
	<div class="page-wrapper__content" id="page-wrapper__content">



		<!-- INTRO  -->
		<div class="section stage min-vh-100 mt-header-height bg-dark-1" data-arts-component-name="Content"
			data-arts-os-animation="true">


			<div class="container-fluid-gutters py-small">
				<div class="content svg-circle" data-arts-split-text-preset="animatedChars">
					<h1 class="xxl"> <u>Comunicarlo</u></h1>
				</div>
				<div class="d-flex align-items-center">
					<svg data-arts-os-animation-name="animatedJumpFromLeft" class="pe-small" fill="none" height="60"
						viewBox="0 0 323 60" width="300" xmlns="http://www.w3.org/2000/svg">
						<path
							d="m321.578 32.9271c1.563-1.5621 1.563-4.0947 0-5.6568l-25.455-25.45589c-1.563-1.562094-4.095-1.562095-5.657 0-1.562 1.5621-1.562 4.09476 0 5.65686l22.627 22.62743-22.627 22.6274c-1.562 1.5621-1.562 4.0948 0 5.6569s4.094 1.5621 5.657 0zm-321.5780007 1.1715 318.7500007.0001v-8l-318.7499993-.0001z"
							fill="#fae64d" />
					</svg>
					<h1 data-arts-split-text-preset="animatedChars" class="xxl">bien hace</h1>
				</div>
				<div class="content svg-circle" data-arts-split-text-preset="animatedChars">
					<h1 class="xxl"> <u>la diferencia</u></h1>
				</div>












			</div>






		</div>




		<!-- NOSOTROS -->
		<div id="nosotros" class="section stage" data-arts-component-name="Content" data-arts-os-animation="true">
			<div class="row">
				<div class="col-12 col-lg-6 position-relative d-flex flex-column justify-content-center px-gutters bg-light-1 min-vh-lg-100"
					data-arts-color-theme="light">
					<div class="content w-100 py-medium" data-arts-split-text-preset="animatedLines">
						<h6 class="color-blue text-uppercase"><?php the_field('subtitulo_hacemos'); ?></h6>
						<h2 class="h2 mb-5"><?php the_field('titulo_hacemos'); ?></h2>
						<?php the_field('bajada_hacemos'); ?>
					</div>
				</div>
				<div class="col-12 col-lg-6 position-relative min-vh-lg-100">
					<div class="d-flex align-items-center h-100">
						<div class="content-menu py-medium" data-arts-os-animation-name="animatedJump">
							<div class="swiper SwiperHacemos" data-arts-component-name="Swipper">
								<div class="swiper-wrapper">
									<div class="swiper-slide text-center">
										<?php if( have_rows('datos') ): ?>
										<?php while ( have_rows('datos') ) : the_row(); ?>
										<div class="mb-fix">
											<h1 class="xl"><span>+</span><?php the_sub_field('numero'); ?></h1>
											<h4><?php the_sub_field('descripcion'); ?></h4>
										</div>
										<?php  endwhile; ?>
										<?php endif; ?>
									</div>
									<div class="swiper-slide text-center">
										<?php if( have_rows('valores') ): ?>
										<?php while ( have_rows('valores') ) : the_row(); ?>
										<h2><?php the_sub_field('texto'); ?></h2>
										<?php  endwhile; ?>
										<?php endif; ?>
									</div>
								</div>
								<div class="swiper-pagination"></div>
							</div>
						</div>
					</div>
					<div class="section__background">
						<div class="overflow-hidden parallax js-parallax w-100 h-100"
							data-arts-component-name="Parallax"
							data-arts-component-options="{inner: {scale: {from: 1.4, to: 1.2}, factor: {y: 0.12}}}"
							data-arts-os-animation="true">
							<div class="w-100 h-100 overflow-hidden" data-arts-os-animation-name="animatedMaskFromTop">
								<div class="w-100 h-100 js-animated-mask-inner overflow-hidden">
									<img class="lazy of-cover-absolute js-parallax__inner"
										src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
										decoding="async"
										data-src="<?php bloginfo("template_url"); ?>/img/bnr_hacemos.jpg" width="1280"
										height="1920" alt="" />
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>



		<!--EQUIPO -->
		<div id="equipo" class="section stage bg-light-1 py-medium" data-arts-component-name="Content"
			data-arts-os-animation="true" data-arts-color-theme="light">
			<div class="container" style="max-width: 1200px;">
				<div data-arts-split-text-preset="animatedLines" style="max-width: 600px">
					<h6 class="text-uppercase color-blue mt-0"><?php the_field('subtitulo_equipo'); ?></h6>
					<h2 class="h2"><?php the_field('titulo_equipo'); ?></h2>
					<p><?php the_field('bajada_equipo'); ?></p>

				</div>
				<div class="row mt-xsmall g-3 g-sm-4 g-md-5 g-lg-6">

					<?php if( have_rows('integrantes') ): ?>
					<?php while ( have_rows('integrantes') ) : the_row(); ?>

					<div class="col-6 col-md-4 mb-5 mb-md-3" data-arts-os-animation-name="animatedJump">
						<div
							class="equipo integrante-<?php echo get_row_index(); ?>  <?php if( get_sub_field('¿tierne_ventana_emergente') == 'no' ) { ?>no-link<?php } ?>">
							<?php $image = get_sub_field('imagen'); if( !empty( $image ) ): ?>
							<div class="lazy-wrapper">
								<img class="lazy"
									src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
									decoding="async" data-src="<?php echo esc_url($image['url']); ?>"
									width="<?php echo esc_attr($image['width']); ?>"
									height="<?php echo esc_attr($image['height']); ?>"
									alt="<?php echo esc_attr($image['alt']); ?>" />
							</div>
							<?php endif; ?>
							<h4 class="mb-2"><?php the_sub_field('nombre'); ?></h4>
							<p class="p_3 color-blue m-0"><?php the_sub_field('cargo'); ?></p>

						</div>
					</div>
					<?php  endwhile; ?>
					<?php endif; ?>



				</div>
			</div>
		</div>

		<!-- PAGE FOOTER -->
		<?php get_template_part('template-part/footer'); ?>

		<!-- MODAL -->
		<?php get_template_part('template-part/modal'); ?>



















	</div>
</main>
<!-- - PAGE MAIN CONTAINER -->


<?php get_footer(); ?>