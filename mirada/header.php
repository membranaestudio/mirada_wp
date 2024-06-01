<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta content="telephone=no" name="format-detection" />
  <meta name="HandheldFriendly" content="true" />
  <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap" rel="stylesheet"/>
    <!-- Local Fonts -->
  <link href="<?php bloginfo("template_url"); ?>/css/custom-fonts.css" rel="stylesheet" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/css/vendor.css" />
  <!-- Template main styles-->
  <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/css/main.css" />
  <!-- Favicons & App Icons -->
  <?php wp_head();?>
</head>

<body <?php body_class(); ?>>
  
   
  <div data-barba="wrapper">
    <?php get_template_part('template-part/header'); ?>