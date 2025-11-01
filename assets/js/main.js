/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // === GLOBAL DEĞİŞKENLER ===
  let $mobile_nav = null;
  let $mobile_toggle = null;

  // === MOBİL MENÜYÜ YENİDEN OLUŞTUR ===
  function rebuildMobileNav() {
    // Eski mobil menüyü kaldır
    if ($mobile_nav) $mobile_nav.remove();
    if ($mobile_toggle) $mobile_toggle.remove();
    $('.mobile-nav-overly').remove();

    // Ana menüyü klonla (data-tr/en dahil)
    $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);

    // Toggle butonu
    $mobile_toggle = $('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').prepend($mobile_toggle);

    // Overlay
    $('body').append('<div class="mobile-nav-overly"></div>');

    // Toggle eventi
    $mobile_toggle.off('click').on('click', function() {
      $('body').toggleClass('mobile-nav-active');
      $mobile_toggle.find('i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').fadeToggle();
    });
  }

  // === SAYFA YÜKLENDİĞİNDE MOBİL MENÜ OLUŞTUR ===
  $(document).ready(function() {
    if ($('.nav-menu').length) {
      rebuildMobileNav();

      // Dışarı tıklayınca kapat
      $(document).off('click.mobileNav').on('click.mobileNav', function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $mobile_toggle.find('i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    }
  });

  // === NAVIGASYON TIKLAMA ===
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        // Aktif menü öğesi
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          
          // MOBİL MENÜYÜ KAPAT (HOME İÇİN DE)
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $mobile_toggle.find('i').removeClass('icofont-close').addClass('icofont-navigation-menu');
            $('.mobile-nav-overly').fadeOut();
          }
          
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        // Mobil menüyü kapat
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $mobile_toggle.find('i').removeClass('icofont-close').addClass('icofont-navigation-menu');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // === HASH İLE GELEN SAYFA ===
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu a[href="' + initial_nav + '"], .mobile-nav a[href="' + initial_nav + '"]')
        .parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // === DİL DEĞİŞİMİNDE MOBİL MENÜYÜ GÜNCELLE (DIŞARIDAN ÇAĞIRILACAK) ===
  window.rebuildMobileNavOnLangChange = function() {
    setTimeout(rebuildMobileNav, 100); // DOM güncellendikten sonra
  };

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({ delay: 10, time: 1000 });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%' });

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    autoplay: true, dots: true, loop: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 3 } }
  });

  // Porfolio isotope
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item', layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

  // Venobox
  $('.venobox').venobox();

})(jQuery);