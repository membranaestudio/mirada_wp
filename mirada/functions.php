<?php

// TITLE WP
add_action( 'after_setup_theme', 'theme_functions' );
function theme_functions() {
    add_theme_support( 'title-tag' );
}

// DISABLE EDITOR AND ADMIN BAR
add_filter('show_admin_bar', '__return_false');
add_filter( 'use_block_editor_for_post', '__return_false' );


// ACF OPTIONS FIELDS
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Generales',
		'menu_title'	=> 'Generales',
		'menu_slug' 	=> 'generales',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
}


add_action('restrict_manage_posts', 'tsm_filter_post_type_by_taxonomy');
function tsm_filter_post_type_by_taxonomy() {
	global $typenow;
	$post_type = 'producto'; // change to your post type
	$taxonomy  = 'categoria-productos'; // change to your taxonomy
	if ($typenow == $post_type) {
		$selected      = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
		$info_taxonomy = get_taxonomy($taxonomy);
		wp_dropdown_categories(array(
			'show_option_all' => sprintf( __( 'Show all %s', 'textdomain' ), $info_taxonomy->label ),
			'taxonomy'        => $taxonomy,
			'name'            => $taxonomy,
			'orderby'         => 'name',
			'selected'        => $selected,
			'show_count'      => true,
			'hide_empty'      => true,
		));
	};
}
/**
 * Filter posts by taxonomy in admin
 * @author  Mike Hemberger
 * @link http://thestizmedia.com/custom-post-type-filter-admin-custom-taxonomy/
 */
add_filter('parse_query', 'tsm_convert_id_to_term_in_query');
function tsm_convert_id_to_term_in_query($query) {
	global $pagenow;
	$post_type = 'producto'; // change to your post type
	$taxonomy  = 'categoria-productos'; // change to your taxonomy
	$q_vars    = &$query->query_vars;
	if ( $pagenow == 'edit.php' && isset($q_vars['post_type']) && $q_vars['post_type'] == $post_type && isset($q_vars[$taxonomy]) && is_numeric($q_vars[$taxonomy]) && $q_vars[$taxonomy] != 0 ) {
		$term = get_term_by('id', $q_vars[$taxonomy], $taxonomy);
		$q_vars[$taxonomy] = $term->slug;
	}
}


// IMAGENES 

//ORBITAS
//add_image_size( 'orbitas-planeta', 400, 999999 );

add_image_size( 'slider_1', 1920, 1280); 
add_image_size( 'slider_2', 1920, 999999);
add_image_size( 'slider_3', 960, 700); 

add_image_size( 'blog_1', 800, 580, true ); 
add_image_size( 'blog_2', 1200, 9999999 ); 

add_image_size( 'proceso',400, 600, true ); 


add_filter( 'jpeg_quality', create_function( '', 'return 100;' ) );



