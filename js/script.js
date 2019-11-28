$(document).ready(function () {

  // sticky navigation menu

  let nav_offset_top = $('.header-area').height() + 300;

  function navbarFixed() {
    if ($('.header-area').length) {
      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $('.header-area .main-menu .navbar').addClass('fixed-top navbar-fixed-custom');
        } else {
          $('.header-area .main-menu .navbar').removeClass('fixed-top navbar-fixed-custom');
        }
      })
    }
  }

  navbarFixed();

});