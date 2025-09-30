const swiperHero = new Swiper(`.swiper-hero`, {
  speed: 1200,
  slidesPerView: 1,
  autoplay: true,
  pagination: {
    el: ".swiper-hero-pagi-1",
    clickable: true,
  },

  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    768: {
      spaceBetween: 24,
    },
  },
});

const swiperPartners = new Swiper(`.swiper-partners`, {
  speed: 9000,
  slidesPerView: "auto",
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  allowTouchMove: false,

  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    768: {
      spaceBetween: 24,
    },
  },
});

const swiperReviews = new Swiper(`.swiper-reviews`, {
  speed: 8000,
  slidesPerView: "auto",
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  allowTouchMove: false,

  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    768: {
      spaceBetween: 24,
    },
  },
});

const thumbSingleGallery = new Swiper(`.thumbs-single-gallery`, {
  speed: 800,
  watchSlidesProgress: true,

  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 6,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
  },
});

const swiperSingleGallery = new Swiper(`.swiper-single-gallery`, {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 8,

  thumbs: {
    swiper: thumbSingleGallery,
  },
});

const thumbsHistory = new Swiper(`.thumbs-history`, {
  speed: 800,
  watchSlidesProgress: true,

  breakpoints: {
    320: {
      slidesPerView: "auto",
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 12,
    },
  },
});

const swiperHistory = new Swiper(`.swiper-history`, {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 30,

  navigation: {
    prevEl: ".swiper-history__btn-prev",
    nextEl: ".swiper-history__btn-next",
  },

  thumbs: {
    swiper: thumbsHistory,
  },
});
