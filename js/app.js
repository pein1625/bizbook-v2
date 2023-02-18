// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

// require _scroll-to-dip.js
$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.fadeIn();

      return;
    }

    $moveTop.fadeOut();
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper(".banner-slider", {
    pagination: true,
    navigation: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper(".cat-slider", {
    navigation: true,
    spaceBetween: 4,
    slidesPerView: 3,
    breakpoints: {
      576: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 5
      },
      992: {
        slidesPerView: 7
      },
      1200: {
        slidesPerView: 9
      },
      1260: {
        slidesPerView: 10
      }
    }
  });
});

$(function () {
  addSwiper(".product-slider", {
    navigation: true,
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      }
    }
  });
});

$(function () {
  addSwiper(".calendar-slider", {
    pagination: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      576: {
        slidesPerView: 1.5
      },
      768: {
        slidesPerView: 1.5
      },
      992: {
        slidesPerView: 2.5
      },
      1200: {
        slidesPerView: 3.5
      }
    }
  });
});

// horizontal preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

$(function () {
  if (!$(".rank-slider").length) {
    return;
  }

  var rankSliders = addSwiper(".rank-slider", {
    direction: "vertical",
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 10,
    preventClicks: false,
    preventClicksPropagation: false,
    spaceBetween: 15,
    touchReleaseOnEdges: true
  });

  $(".rank-slider__slide").on("mouseenter click", function () {
    var $el = $(this);
    var target = $(this).data("target");

    if ($el.hasClass("is-selected")) return;

    $el.addClass("is-selected").siblings().removeClass("is-selected");

    $(target).addClass("show active").siblings().removeClass("show active");

    // if (
    //   $(window).width() < 768 &&
    //   $("#rank-detail-tabs").length &&
    //   $("#rank-detail-tabs").offset().top
    // ) {
    //   $("html, body").animate(
    //     {
    //       scrollTop: $("#rank-detail-tabs").offset().top - 30,
    //     },
    //     600
    //   );
    // }
  });

  $(".js-rank-tab").on("shown.bs.tab", function () {
    rankSliders.map(function (slider) {
      slider.update();
    });
  });
});

$(function () {
  if (!$(".expert-slider").length) {
    return;
  }

  addSwiper(".expert-slider", {
    slidesPerView: 2,
    navigation: true,
    loop: true,
    speed: 400,
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 16
      }
    }
  });
});

// smooth scroll to div

$(function () {

  $(".js-scroll-to").on("click", function (e) {

    e.preventDefault();

    const $el = $(this),
          target = $el.data("target") || $el.attr("href"),
          offset = parseInt($el.data("offset")) || 0,
          duration = parseInt($el.data("duration")) || 800;

    if (!$(target).length) return;

    $("html, body").animate({

      scrollTop: $(target).offset().top - offset

    }, duration);
  });
});

// quantity input
$(function () {
  const $document = $(document);

  $document.on("focus", ".quantity__input, [data-number-input]", function () {
    const $input = $(this);
    const min = $input.data("min") || 1;
    const max = $input.data("max");
    let currentValue = min;

    if ($input.hasClass("is-binded")) return;

    $input.addClass("is-binded");

    $input.on("keydown", function (e) {
      currentValue = $input.val();

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
        return;
      }
      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }).on("keyup", function (e) {
      if ($input.val() == "") return;

      let val = $input.val();

      if (val === "" || parseInt(val) < min) {
        $input.val(min);
      }

      if (parseInt(val) > max) {
        $input.val(currentValue);
      }

      $input.trigger("change");
    }).on("paste", function (e) {
      var paste = e.originalEvent.clipboardData.getData("text");
      var pasteNum = parseInt(paste);

      if (pasteNum > max || pasteNum < min) {
        e.preventDefault();
      }
    });
  });

  $document.on("click", ".quantity__btn", function (e) {
    e.preventDefault();

    var $siblingInput = $(this).siblings(".quantity__input");
    var plus = $(this).data("plus");
    var value = $siblingInput.val();
    var newValue = parseInt(value) + plus;
    var min = $siblingInput.data("min") || 1;

    if (newValue >= min) {
      $siblingInput.val(newValue);
      $siblingInput.trigger("change");
    }
  });
});

// common.js
$(function () {
  $(".lang__toggle").on("click", function (e) {
    e.stopPropagation();
    $(".lang__dropdown").fadeToggle("fast");
  });

  $(".lang__dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    $(".lang__dropdown").fadeOut("fast");
  });
});

$(function () {
  $(".pd-menu__toggle").on("click", function (e) {
    e.preventDefault();

    $(".pd-menu").toggleClass("show");
  });
});

$(function () {
  $(".pd-intro__toggle").on("click", function (e) {
    e.preventDefault();

    $(".pd-intro").toggleClass("expand");
  });
});

$(function () {
  $(".js-combo-select").on("change", function () {
    var $selected = $(".js-combo-select:checked");
    var total = 0;

    $selected.each(function () {
      total += parseInt($(this).data("price"));
    });

    $(".js-combo-total").text(total.toLocaleString());
    $(".js-combo-quantity").text($selected.length);
  });
});

$(function () {
  $(".js-reply-btn").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".js-reply").find(".js-reply-box").show();
  });

  $(".js-reply-close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".js-reply-box").hide();
  });

  $(".js-send-comment-toggle").on("click", function () {
    $(this).toggleClass("active");
    $(".js-send-comment").toggle();
  });

  $(".search__dropdown-btn").on("click", function () {
    $(".search__dropdown").slideToggle(150);
  });
});

var timeinterval = null;

$(function () {
  startCountDown();
});

function startCountDown() {
  if (timeinterval) {
    clearInterval(timeinterval);
  }

  $dealine = $("#js-deadline");
  if ($dealine.length) {
    const deadline = $dealine.data("deadline");
    initialClock("js-deadline", deadline);
  }
}

function initialClock(id, endtime) {
  var clock = document.getElementById(id);
  if (!clock) {
    return;
  }

  var t = getTimeRemaining(endtime);
  clock.innerHTML = `
<span>${t.hours}</span>
<span>${t.minutes}</span>
<span>${t.seconds}</span>
  `;
  if (t.total <= 0) {
    clearInterval(timeinterval);
  }

  timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = `
<span>${t.hours}</span>
<span>${t.minutes}</span>
<span>${t.seconds}</span>
    `;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  if (t < 0) return {
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  // var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var hours = Math.floor(t / (1000 * 60 * 60));
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  if (days > 99) {
    days = 99;
  }

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  days = days < 10 ? "0" + days : days;

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

$(function () {
  $(".js-avatar-input").change(function () {
    var input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".js-avatar-preview").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
});

$(function () {
  $(".js-switch-modal").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    if (!target) return;

    $(this).closest(".modal").modal("hide");

    setTimeout(function () {
      $(target).modal("show");
    }, 300);
  });
});

$(function () {
  $(".js-header-dropdown").on("click", function (e) {
    e.stopPropagation();
    $(this).siblings(".h-dropdown__menu").fadeToggle("fast");
    $(".h-dropdown__menu").not($(this).siblings(".h-dropdown__menu")).fadeOut("fast");
  });

  $(".h-dropdown__menu").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    $(".h-dropdown__menu").fadeOut("fast");
  });
});

$(function () {
  $('.h-dropdown__item[data-toggle="modal"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    if ($(target).length) {
      $(target).modal("show");
    }
  });
});

$(function () {
  $(".flash-timer__item").on("click", function (e) {
    e.preventDefault();

    var $el = $(this);

    if ($el.hasClass("active")) return;

    var deadline = $(this).data("deadline");
    var label = $(this).data("label");
    var target = $(this).attr("href");

    $el.addClass("active").siblings().removeClass("active");
    $(target).addClass("show active").siblings().removeClass("show active");

    $(".countdown__label").text(label);

    $("#js-deadline").data("deadline", deadline);

    startCountDown();
  });
});

$(function () {
  $(".js-float-sidebar-open").on("click", function () {
    var target = $(this).data("target");

    $(target).addClass("is-show");
    $("body").addClass("overflow-hidden");
  });

  $(".float-sidebar__close").on("click", function () {
    $(this).closest(".float-sidebar").removeClass("is-show");
    $("body").removeClass("overflow-hidden");
  });
});

$(function () {
  $('#video-player').bind('contextmenu', function () {
    return false;
  });
  const player = videojs('#video-player');

  player.on('ended', function () {
    if (!checkIsVideoAutoplay()) return false;

    const $lessons = $('.js-course-menu').eq(0).find('.js-course-lesson');
    let flag = false;

    $lessons.each(function () {
      if (flag) {
        playVideo($(this));
        return false;
      } else if ($(this).hasClass('active')) {
        flag = true;
      }
    });
  });

  $('.js-course-lesson').on('click', function () {
    const $el = $(this);

    $(window).scrollTop($('#video-section').offset().top);

    playVideo($el);
  });

  function playVideo($el) {
    const src = $el.data('src');
    const type = $el.data('type');
    const id = $el.data('id');

    if (!src || !type) return false;

    if ($el.hasClass('active')) {
      player.play();
      return false;
    }

    $('.js-course-lesson.active').removeClass('active');
    $(`.js-course-lesson[data-id="${id}"]`).addClass('active');

    player.src({ src, type, withCredentials: true });
    player.play();
  }

  $('.js-video-control').on('click', function (e) {
    e.preventDefault();

    const type = $(this).data('type');

    if (type === 'backward') {
      video.currentTime -= 10;
    } else if (type === 'forward') {
      video.currentTime += 10;
    } else if (type === 'autoplay') {
      $(this).toggleClass('is-autoplay');

      localStorage.isVideoAutoplay = $(this).hasClass('is-autoplay') ? '1' : 0;
    }
  });

  checkIsVideoAutoplay();

  function checkIsVideoAutoplay() {
    if (localStorage.isVideoAutoplay != '1') return false;

    $('.js-video-control[data-type="autoplay"]').addClass('is-autoplay');

    return true;
  }
});

$(function () {
  $('.course-menu__part-name').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('is-collapsed');

    $(this).siblings('.course-menu__lessons').slideToggle();
  });
});