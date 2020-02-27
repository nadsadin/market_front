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

  $('.shop-tooltip').tooltip();

  // Mega dropdown
  //

  $('.mega-dropdown .dropdown-toggle').each(function() {
    new MegaDropdown(this);
  });




  // Filters
  //

  var shopPriceFilterVal = [ 5, 1000 ];

  numeral.locales['ru']["currency"]["symbol"] = "₽";
  numeral.locale('ru');
  $('#shop-price-slider').each(function() {
    noUiSlider.create(this, {
      start: shopPriceFilterVal,
      connect: true,
      tooltips: true,
      range: {
        'min': 5,
        'max': 1000,
      },
      format: {
        to: function (value) {
          return numeral(value).format('0&nbsp;$');
        },
        from: function (value) {
          return value.replace(/[\$\,]/g, '');
        }
      }
    })
        .on('update', function(values) {
          $('#shop-price-slider-start').val(values[0]);
          $('#shop-price-slider-end').val(values[1]);
        });
  });

  $('#shop-price-slider-start').on('change', function() {
    var val = parseInt(this.value.replace(/^\s+|\s+$|\$/g, ''));
    $('#shop-price-slider')[0].noUiSlider.set([
      isNaN(val) ? shopPriceFilterVal[0] : val,
      null
    ]);
  });

  $('#shop-price-slider-end').on('change', function() {
    var val = parseInt(this.value.replace(/^\s+|\s+$|\$/g, ''));
    $('#shop-price-slider')[0].noUiSlider.set([
      null,
      isNaN(val) ? shopPriceFilterVal[1] : val
    ]);
  });

  // Filters toggle
  $('#shop-filters-toggle').click(function() {
    $('#shop-filters-toggle-open-icon').toggleClass('d-none');
    $('#shop-filters-toggle-close-icon').toggleClass('d-none');
    $('#shop-filters-block').toggleClass('d-none');
  });

  // Product item
  //

  $('#shop-preview-slider').each(function() {
    new Swiper(this, {
      slidesPerView: 3,
      spaceBetween: 8,
      threshold: 20,
      navigation: {
        nextEl: $('#shop-preview-slider-next')[0],
        prevEl: $('#shop-preview-slider-prev')[0]
      }
    });
  });

  $('#shop-preview-slider').on('click', 'a', function(e) {
    e.preventDefault();
    $('#shop-preview-slider .border-primary').removeClass('border-primary');
    $(this).addClass('border-primary');
    $('#shop-preview-image img').attr('src', $(this).find('img').attr('src'));
  });

  $('#shop-preview-image').on('click', function(e) {
    e.preventDefault();

    // Unset focus
    $(this).blur();

    var curLink = $(this).find('img')[0].src;
    var links = [];

    $('#shop-preview-slider').find('img').each(function() {
      links.push(this.src);
    });

    window.blueimpGallery(links, {
      container: '#shop-preview-lightbox',
      carousel: false,
      hidePageScrollbars: true,
      disableScroll: true,
      index: links.indexOf(curLink)
    });
  });

  // Checkout
  //

  var checkoutFinishBtn = $(
      '<button class="btn sw-btn-finish text-expanded text-uppercase mx-2 btn-primary" type="button">Finish</button>'
  );

  $('#shop-checkout-wizard').each(function() {
    $(this).smartWizard({
      autoAdjustHeight: false,
      backButtonSupport: false,
      useURLhash: false,
      showStepURLhash: false,
      lang: {
        next: 'Continue →',
        previous: '← Back'
      }
    });
  });

  $('#shop-checkout-wizard')
      .find('.sw-toolbar')
      .addClass('justify-content-center')
      .find('.sw-btn-group')
      .removeClass('btn-group pull-right')
      .find('.btn')
      .addClass('text-expanded text-uppercase mx-2')
      .parent()
      .find('.sw-btn-next')
      .removeClass('btn-default')
      .addClass('btn-primary')
      .parent()
      .append(checkoutFinishBtn);
});