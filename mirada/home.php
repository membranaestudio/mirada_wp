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
		<div class="section mt-header-height pt-medium pb-large bg-dark-1">
			<div class="container">
				<div data-arts-component-name="Content" data-arts-os-animation="true">
					<div data-arts-split-text-preset="animatedLines" style="max-width: 420px">
						<h2 class="mt-0 mb-5 h6"><?php the_field('sobre_titulo_banner'); ?></h2>
					</div>
				</div>
				<div data-arts-component-name="Content" data-arts-os-animation="true">
					<div class="content svg-line" data-arts-split-text-preset="animatedChars">
						<h1 class="xxl m-0"><u><?php the_field('linea_1_banner'); ?></u></h1>
					</div>
				</div>
				<div class="d-flex align-items-center" data-arts-component-name="Content" data-arts-os-animation="true">
					<svg data-arts-os-animation-name="animatedJumpFromLeft" class="arrow-svg" fill="none" height="60"
						viewBox="0 0 323 60" width="300" xmlns="http://www.w3.org/2000/svg">
						<path
							d="m321.578 32.9271c1.563-1.5621 1.563-4.0947 0-5.6568l-25.455-25.45589c-1.563-1.562094-4.095-1.562095-5.657 0-1.562 1.5621-1.562 4.09476 0 5.65686l22.627 22.62743-22.627 22.6274c-1.562 1.5621-1.562 4.0948 0 5.6569s4.094 1.5621 5.657 0zm-321.5780007 1.1715 318.7500007.0001v-8l-318.7499993-.0001z"
							fill="#fae64d" />
					</svg>
					<h1 data-arts-split-text-preset="animatedChars" class="xxl m-0"><?php the_field('linea_2_banner'); ?></h1>
				</div>
				<div data-arts-component-name="Content" data-arts-os-animation="true">
					<div class="content svg-sun" data-arts-split-text-preset="animatedChars">
						<h1 class="xxl m-0"><u><?php the_field('linea_3_banner'); ?></u></h1>
					</div>
				</div>
			</div>
		</div>


		<!-- NOSOTROS -->
		<div id="nosotros" class="section stage mt-medium top-fix" data-arts-component-name="Content"
			data-arts-os-animation="true" data-arts-color-theme="light">
			<div class="container">
				<div class="row">
					<div
						class="col-md-6 d-xxl-flex align-items-xxl-center max-md-pt-0 pt-small order-md-2 pb-5 pb-md-0">
						<div class="content svg-circle" data-arts-split-text-preset="animatedLines"
							style="max-width: 540px; margin: 0 auto">
							<h1 class="mt-0"><u>Nosotros</u></h1>
							<?php the_field('descripcion_nosotros'); ?>
						</div>
					</div>
					<div class="col-md-6 col-top">
						<div class="w-100 h-100 overflow-hidden" data-arts-os-animation-name="animatedMaskFromTop">
							<div class="w-100 h-100 js-animated-mask-inner overflow-hidden">
								<?php $image = get_field('imagen_nosotros'); if( !empty( $image ) ): ?>
								<div class="lazy-wrapper">
									<img class="lazy"
										src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
										decoding="async" data-src="<?php echo esc_url($image['url']); ?>"
										width="<?php echo esc_attr($image['width']); ?>"
										height="<?php echo esc_attr($image['height']); ?>"
										alt="<?php echo esc_attr($image['alt']); ?>" />
								</div>
								<?php endif; ?>



							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- HACEMOS -->
		<div id="hacemos" class="section stage py-medium" data-arts-component-name="Content"
			data-arts-os-animation="true" data-arts-color-theme="light">
			<div class="container">
				<div class="row">
					<div class="col-lg-6">
						<div class="max-lg-mt-0 mt-small content svg-circle-2"
							data-arts-split-text-preset="animatedLines" style="max-width: 400px">
							<h1 class="mt-0"><u>Hacemos</u></h1>
							<p><?php the_field('descripcion_hacemos'); ?></p>
						</div>


					</div>
					<div class="col-lg-6 mt-4 mt-lg-0">
						<div style="max-width: 540px; margin: 0 auto">
							<div class="circle-arrow" data-arts-os-animation-name="animatedJumpScale">
								<svg width="30" height="84" viewBox="0 0 30 84" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M13.5858 83.4142C14.3668 84.1953 15.6332 84.1953 16.4142 83.4142L29.1421 70.6863C29.9232 69.9052 29.9232 68.6389 29.1421 67.8579C28.3611 67.0768 27.0948 67.0768 26.3137 67.8579L15 79.1716L3.68629 67.8579C2.90524 67.0768 1.63891 67.0768 0.857862 67.8579C0.0768136 68.6389 0.0768135 69.9052 0.857862 70.6863L13.5858 83.4142ZM13 -1.76728e-07L13 82L17 82L17 1.76728e-07L13 -1.76728e-07Z"
										fill="black" />
								</svg>
							</div>

						</div>

					</div>
				</div>
			</div>

		</div>

		<!-- HERRAMIENTAS -->
		<div id="herramientas" class="section bg-gray-2" data-arts-component-name="Content"
			data-arts-os-animation="true" data-arts-color-theme="light">
			<div class="container py-small">


				<div class="row">
					<div class="col-12">
						<div data-arts-split-text-preset="animatedLines" style="max-width: 400px">
							<h2 class="mt-0 mb-5 h6"><?php the_field('sobre_titulo_herramienta'); ?></h2>
						</div>


						<div data-arts-component-name="Content" data-arts-os-animation="true">
							<div data-arts-split-text-preset="animatedChars">
								<h1 class="xl m-0"><?php the_field('linea_1_herramienta'); ?></h1>
							</div>
						</div>
						<div class="d-flex align-items-center" data-arts-component-name="Content"
							data-arts-os-animation="true">
							<svg data-arts-os-animation-name="animatedJumpFromLeft" class="arrow-svg" fill="none"
								height="60" viewBox="0 0 323 60" width="300" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m321.578 32.9271c1.563-1.5621 1.563-4.0947 0-5.6568l-25.455-25.45589c-1.563-1.562094-4.095-1.562095-5.657 0-1.562 1.5621-1.562 4.09476 0 5.65686l22.627 22.62743-22.627 22.6274c-1.562 1.5621-1.562 4.0948 0 5.6569s4.094 1.5621 5.657 0zm-321.5780007 1.1715 318.7500007.0001v-8l-318.7499993-.0001z"
									fill="#2142FF" />
							</svg>

							<div class="content svg-line-3" data-arts-split-text-preset="animatedChars">
								<h1 class="xl m-0"> <u><?php the_field('linea_2_herramienta'); ?></u>
									<span class="d-none d-md-inline">
										<?php the_field('linea_2sin_herramientas'); ?></span></h1>
							</div>
						</div>


						<div data-arts-component-name="Content" data-arts-os-animation="true">
							<div class="content svg-sun" data-arts-split-text-preset="animatedChars">
								<h1 class="xl m-0"><span
										class="d-md-none"><?php the_field('linea_2sin_herramientas'); ?></span>
									<?php the_field('linea_3_herramienta'); ?></h1>
							</div>
						</div>





					</div>
					<div class="col-md-6 col-lg-4 offset-md-4 mt-5 mt-md-0 pb-small">
						<div data-arts-split-text-preset="animatedLines">
							<p><?php the_field('descripcion_herramienta'); ?></p>
						</div>
					</div>
				</div>

				<div class="row circles-wrapper pointer-events-none g-0" data-arts-component-name="WidthHeight"
					data-arts-os-animation="true">

					<div class="col-6 col-lg-3">
						<div class="item-1 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_1'); ?></h3>
							</div>
						</div>
						<div class="item-2 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_2'); ?></h3>
							</div>
						</div>
					</div>

					<div class="col-6 col-lg-3">
						<div class="item-3 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_3'); ?></h3>
							</div>
						</div>
						<div class="item-4 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_4'); ?></h3>
							</div>
						</div>
					</div>

					<div class="col-6 col-lg-3">
						<div class="item-5 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_5'); ?></h3>
							</div>
						</div>
						<div class="item-6 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_6'); ?></h3>
							</div>
						</div>
					</div>

					<div class="col-6 col-lg-3">
						<div class="item-7 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_7'); ?></h3>
							</div>
						</div>
						<div class="item-8 item">
							<div class="circle item-with-height">
								<h3><?php the_field('circulo_8'); ?></h3>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>

		<!-- POR QUE -->
		<div class="section my-medium top-fix" data-arts-component-name="Content" data-arts-os-animation="true"
			data-arts-color-theme="light">
			<div class="container">
				<div class="row">
					<div
						class="col-md-6 max-md-pt-0 pt-small order-md-2 pb-5 pb-md-0 d-md-flex flex-md-column justify-content-md-between">
						<div class="content svg-circle" data-arts-split-text-preset="animatedLines"
							style="max-width: 580px; margin-left: auto; margin-right: auto">
							<h1 class="fix-svg-1"><u class="italic">¿Por qué</u> <br><span
									class="font-primary h2 fw-700">Mirada Externa</span>?</h1>
							<?php the_field('descripcion_mirada'); ?>
						</div>
						<div class="d-flex justify-content-center my-4">
							<div class="circle-arrow" data-arts-os-animation-name="animatedJumpScale">
								<svg width="30" height="84" viewBox="0 0 30 84" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M13.5858 83.4142C14.3668 84.1953 15.6332 84.1953 16.4142 83.4142L29.1421 70.6863C29.9232 69.9052 29.9232 68.6389 29.1421 67.8579C28.3611 67.0768 27.0948 67.0768 26.3137 67.8579L15 79.1716L3.68629 67.8579C2.90524 67.0768 1.63891 67.0768 0.857862 67.8579C0.0768136 68.6389 0.0768135 69.9052 0.857862 70.6863L13.5858 83.4142ZM13 -1.76728e-07L13 82L17 82L17 1.76728e-07L13 -1.76728e-07Z"
										fill="black" />
								</svg>
								</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="w-100 h-100 overflow-hidden" data-arts-os-animation-name="animatedMaskFromTop">
							<div class="w-100 h-100 js-animated-mask-inner overflow-hidden">
								<?php $image = get_field('imagen_mirada'); if( !empty( $image ) ): ?>
								<div class="lazy-wrapper">
									<img class="lazy"
										src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
										decoding="async" data-src="<?php echo esc_url($image['url']); ?>"
										width="<?php echo esc_attr($image['width']); ?>"
										height="<?php echo esc_attr($image['height']); ?>"
										alt="<?php echo esc_attr($image['alt']); ?>" />
								</div>
								<?php endif; ?>



							</div>
						</div>
					</div>



				</div>
			</div>
		</div>


		<!-- AYUDANOS  -->
		<div id="ayudamos" class="section py-xlarge bg-dark-1" data-arts-component-name="Content"
			data-arts-os-animation="true">
			<div class="container">
				<div data-arts-component-name="Content" data-arts-os-animation="true">
					<div class="content svg-sun-2" data-arts-split-text-preset="animatedChars">
						<h1 class="xl-fix m-0"> <u>Ayudanos</u></h1>
					</div>
				</div>
				<div class="d-flex align-items-center" data-arts-component-name="Content" data-arts-os-animation="true">
					<svg data-arts-os-animation-name="animatedJumpFromLeft" class="arrow-svg" fill="none" height="60"
						viewBox="0 0 323 60" width="300" xmlns="http://www.w3.org/2000/svg">
						<path
							d="m321.578 32.9271c1.563-1.5621 1.563-4.0947 0-5.6568l-25.455-25.45589c-1.563-1.562094-4.095-1.562095-5.657 0-1.562 1.5621-1.562 4.09476 0 5.65686l22.627 22.62743-22.627 22.6274c-1.562 1.5621-1.562 4.0948 0 5.6569s4.094 1.5621 5.657 0zm-321.5780007 1.1715 318.7500007.0001v-8l-318.7499993-.0001z"
							fill="#fae64d" />
					</svg>
					<h1 data-arts-split-text-preset="animatedChars" class="xl-fix m-0">a ver el bosque</h1>
				</div>
				<div data-arts-component-name="Content" data-arts-os-animation="true">
					<div class="content svg-line-2" data-arts-split-text-preset="animatedChars">
						<h1 class="xl-fix m-0"> <u>y tambien los árboles</u></h1>
					</div>
				</div>



			</div>
		</div>


		<!-- HISTORIA -->
		<div class="section stage py-medium" data-arts-component-name="Content" data-arts-os-animation="true"
			data-arts-color-theme="light">
			<div class="container">
				<div class="row">
					<div class="col-md-6 d-flex align-items-center pb-5 pb-md-0">
						<div class="content svg-circle" data-arts-split-text-preset="animatedLines">
							<h1 class="d-flex"><span class="fix-svg-2">Nuestra</span> <u class="italic fix-svg-3">historia</u>
							</h1>
							<?php the_field('descripcion_historia'); ?>
						</div>
					</div>
					<div class="col-md-6">
						<div class="w-100 h-100 overflow-hidden" data-arts-os-animation-name="animatedMaskFromTop">
							<div class="w-100 h-100 js-animated-mask-inner overflow-hidden">
								<?php $image = get_field('imagen_historia'); if( !empty( $image ) ): ?>
								<div class="lazy-wrapper">
									<img class="lazy"
										src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100%25'%20height='100%25'%3E%3C/svg%3E"
										decoding="async" data-src="<?php echo esc_url($image['url']); ?>"
										width="<?php echo esc_attr($image['width']); ?>"
										height="<?php echo esc_attr($image['height']); ?>"
										alt="<?php echo esc_attr($image['alt']); ?>" />
								</div>
								<?php endif; ?>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>

		<!-- VALORES -->
		<div id="valores" class="section py-small bg-gray-2" data-arts-color-theme="light">
			<div class="d-flex justify-content-center" style="max-width: 560px; margin: 0 auto">
				<div class="content svg-sun-3 svg-sun-3-fix-1" data-arts-component-name="Content"
					data-arts-os-animation="true">
					<div class="text-center" data-arts-split-text-preset="animatedLines">
						<h1 class="m-0"><u>Nuestros</u></h1>
					</div>
				</div>
				<div class="content svg-circle-2 svg-sun-3-fix-2" data-arts-component-name="Content"
					data-arts-os-animation="true">
					<div class="text-center" data-arts-split-text-preset="animatedLines">
						<h1 class="m-0"><u class="italic">valores</u></h1>
					</div>
				</div>

			</div>



			<div class="pb-medium text-center" data-arts-component-name="Content" data-arts-os-animation="true"
				style="max-width: 480px; margin: 0 auto">
				<p class="m-0" data-arts-split-text-preset="animatedLines"><?php the_field('descripcion_valores'); ?>
				</p>
			</div>


			<div class="row" data-arts-component-name="Content" data-arts-os-animation="true">

				<?php if( have_rows('columna_izquierda') ): ?>
				<?php while ( have_rows('columna_izquierda') ) : the_row(); ?>
				<div class="col-md-6">

					<?php if( have_rows('valores') ): ?>
					<?php while ( have_rows('valores') ) : the_row(); ?>

					<div class="row g-4 mb-5 mb-lg-6" data-arts-os-animation-name="animatedJump">
						<div class="col-3 col-lg-4 col-xl-5">
							<h2 class="w-100 b-solid" data-arts-os-animation-name="animatedBorderHorizontal"></h2>
						</div>
						<div class="col-9 col-lg-8 col-xl-7">
							<h2 class="color-blue font-primary fw-600 mt-0 mb-1"> <?php the_sub_field('valor'); ?></h2>
							<p class="m-0"> <?php the_sub_field('descripcion'); ?></p>
						</div>
					</div>

					<?php  endwhile; ?>
					<?php endif; ?>




				</div>
				<?php  endwhile; ?>
				<?php endif; ?>


				<?php if( have_rows('columna_derecha') ): ?>
				<?php while ( have_rows('columna_derecha') ) : the_row(); ?>
				<div class="col-md-6 mt-2 m-md-0">

					<?php if( have_rows('valores') ): ?>
					<?php while ( have_rows('valores') ) : the_row(); ?>

					<div class="row g-4 mb-5 mb-lg-6" data-arts-os-animation-name="animatedJump">
						<div class="col-9 col-lg-8 col-xl-7 text-end">
							<h2 class="color-blue font-primary fw-600 mt-0 mb-1"><?php the_sub_field('valor'); ?></h2>
							<p class="m-0"><?php the_sub_field('descripcion'); ?></p>
						</div>
						<div class="col-3 col-lg-4 col-xl-5">
							<h2 class="w-100 b-solid" data-arts-os-animation-name="animatedBorderHorizontal"></h2>
						</div>
					</div>



					<?php  endwhile; ?>
					<?php endif; ?>




				</div>
				<?php  endwhile; ?>
				<?php endif; ?>




			</div>





		</div>


		<!--EQUIPO -->
		<div id="equipo" class="section bg-dark-1 pt-xsmall pb-medium" data-arts-component-name="Content"
			data-arts-os-animation="true">
			<div class="container" style="max-width: 1300px;">
				<div class="text-center content svg-both padding-1" data-arts-split-text-preset="animatedLines">
					<h1 class="py-4"><u>Nuestro <span class="font-primary fw-400 h2-fix">Equipo</span></u></h1>

				</div>
				<div class="row mt-xsmall g-3 g-lg-4">

					<?php if( have_rows('equipo') ): ?>
					<?php while ( have_rows('equipo') ) : the_row(); ?>

					<div class="col-6 col-md-4" data-arts-os-animation-name="animatedJump">
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