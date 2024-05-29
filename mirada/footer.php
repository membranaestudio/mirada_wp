<!-- Cursor Follower -->
<div class="arts-cursor" data-arts-cursor-follower="cursor">
  <div class="arts-cursor__wrapper" data-arts-cursor-follower-element="wrapper">
    <!-- follower element-->
    <div class="arts-cursor__follower" data-arts-cursor-follower-element="follower"></div>
    <!-- arrows-->
    <div class="arts-cursor__arrows">
      <div class="arts-cursor__arrow arts-cursor__arrow_up material-icons keyboard_arrow_up"
        data-arts-cursor-follower-element="arrowUp"></div>
      <div class="arts-cursor__arrow arts-cursor__arrow_right material-icons keyboard_arrow_right"
        data-arts-cursor-follower-element="arrowRight"></div>
      <div class="arts-cursor__arrow arts-cursor__arrow_down material-icons keyboard_arrow_down"
        data-arts-cursor-follower-element="arrowDown"></div>
      <div class="arts-cursor__arrow arts-cursor__arrow_left material-icons keyboard_arrow_left"
        data-arts-cursor-follower-element="arrowLeft"></div>
    </div>
    <!-- label holder-->
    <div class="arts-cursor__wrapper-label">
      <div class="arts-cursor__label" data-arts-cursor-follower-element="toggleLabel"></div>
    </div>
    <!-- icon holder-->
    <div class="arts-cursor__wrapper-icon">
      <div class="arts-cursor__icon" data-arts-cursor-follower-element="toggleClass"></div>
    </div>
    <!-- loading indicator -->
    <div class="arts-cursor__wrapper-loading" data-arts-cursor-follower-element="loading">
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="24" fill="none"></circle>
      </svg>
    </div>
  </div>
</div>
<!-- - Cursor Follower -->
<svg class="spinner" id="loading-indicator" viewBox="25 25 50 50">
  <circle cx="50" cy="50" r="24" fill="none"></circle>
</svg>
<!-- - Mobile Loading Spinner -->
<div class="blocking-curtain" id="page-blocking-curtain"></div>
<!-- Curtain shape holder-->
<svg class="curtain-svg" width="1px" height="1px" viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clippath id="curtain-clip" clipPathUnits="objectBoundingBox">
      <path id="curtain-clip__path" d="M0,0 C0.167,0,0.333,0,0.5,0 C0.667,0,0.833,0,1,0 L1,1 L0,1 L0,0"></path>
    </clippath>
  </defs>
</svg>
<!-- - Curtain shape holder-->
</div>
<!-- TEMPLATE SCRIPTS -->
<script src="<?php bloginfo("template_url"); ?>/js/vendor.js"></script>
<script src="<?php bloginfo("template_url"); ?>/js/framework.js"></script>
<script src="<?php bloginfo("template_url"); ?>/js/app.js"></script>
<?php wp_footer();?>


</body>

</html>