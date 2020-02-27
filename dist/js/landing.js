$(function() {
  var swiperWithPagination = new Swiper('#swiper-with-pagination', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    on: {
      slideChangeTransitionStart: function () {
        $('#swiper-with-pagination')
            .find('.swiper-slide.swiper-slide-active, .swiper-slide.swiper-slide-duplicate-active')
            .addClass('shop-hero-slider-animating');
      },
      slideChangeTransitionEnd: function () {
        $('#swiper-with-pagination')
            .find('.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-duplicate-active)')
            .removeClass('shop-hero-slider-animating');
      }
    }
  });
  $('.mega-dropdown .dropdown-toggle').each(function() {
    new MegaDropdown(this);
  });
});