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

// const wordofmonthDescSwiper = new Swiper(`.wordofmonth-desc-swiper`, {
//   speed: 1000,
//   slidesPerView: 1,
//   spaceBetween: 20,
//   allowTouchMove: false,
//   navigation: {
//     nextEl: ".wordofmonth-btn-next",
//     prevEl: ".wordofmonth-btn-prev",
//   },
// });

// const wordofmonthImgSwiper = new Swiper(`.wordofmonth-img-swiper`, {
//   speed: 1200,
//   slidesPerView: 1,
//   allowTouchMove: true, // Этот Swiper можно листать вручную
//   grabCursor: true,
// });

// // Связываем все три Swiper'а внутри одной группы
// wordofmonthTitleSwiper.on("slideChange", () => {
//   let index = wordofmonthTitleSwiper.activeIndex;
//   wordofmonthDescSwiper.slideTo(index);
//   wordofmonthImgSwiper.slideTo(index);
// });

// wordofmonthDescSwiper.on("slideChange", () => {
//   let index = wordofmonthDescSwiper.activeIndex;
//   wordofmonthTitleSwiper.slideTo(index);
//   wordofmonthImgSwiper.slideTo(index);
// });

// wordofmonthImgSwiper.on("slideChange", () => {
//   let index = wordofmonthImgSwiper.activeIndex;
//   wordofmonthDescSwiper.slideTo(index);
//   wordofmonthTitleSwiper.slideTo(index);
// });

// const swiperPodcasts = new Swiper(`.swiper-podcasts`, {
//   speed: 800,

//   navigation: {
//     nextEl: ".podcasts-btn-next",
//     prevEl: ".podcasts-btn-prev",
//   },

//   breakpoints: {
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 16,
//     },
//     768: {
//       slidesPerView: 1,
//       spaceBetween: 8,
//     },
//   },
// });

// const swiperInterview = new Swiper(`.swiper-interview`, {
//   speed: 800,

//   navigation: {
//     nextEl: ".interview-btn-next",
//     prevEl: ".interview-btn-prev",
//   },

//   breakpoints: {
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 16,
//     },
//     768: {
//       slidesPerView: 4.5,
//       spaceBetween: 8,
//     },
//   },
// });

// const swiperFilms = new Swiper(`.swiper-films-main`, {
//   speed: 800,
//   slidesPerView: 1,
//   spaceBetween: 16,
//   allowTouchMove: false,
//   effect: "fade",
//   navigation: {
//     nextEl: ".films-btn-next",
//     prevEl: ".films-btn-prev",
//   },
//   pagination: {
//     el: ".films__pagination",
//   },
// });

// const swiperFilmsDesc = new Swiper(`.swiper-films-desc`, {
//   speed: 1200,
//   slidesPerView: 1,
//   spaceBetween: 16,
//   allowTouchMove: false,
// });

// swiperFilms.on("slideChange", () => {
//   let index = swiperFilms.activeIndex;
//   swiperFilmsDesc.slideTo(index);
// });

// swiperFilmsDesc.on("slideChange", () => {
//   let index = swiperFilmsDesc.activeIndex;
//   swiperFilms.slideTo(index);
// });

// const swiperApproaches = new Swiper(`.swiper-approaches`, {
//   speed: 800,
//   slidesPerView: 1,
//   spaceBetween: 16,
//   allowTouchMove: false,
//   navigation: {
//     nextEl: ".approaches-btn-next",
//     prevEl: ".approaches-btn-prev",
//   },
// });

// const swiperApproachesImg = new Swiper(`.swiper-approaches-img`, {
//   speed: 1200,
//   slidesPerView: 1,
//   allowTouchMove: false,
// });

// swiperApproaches.on("slideChange", () => {
//   let index = swiperApproaches.activeIndex;
//   swiperApproachesImg.slideTo(index);
// });

// swiperApproachesImg.on("slideChange", () => {
//   let index = swiperApproachesImg.activeIndex;
//   swiperApproaches.slideTo(index);
// });

// const swiperTeam = new Swiper(`.swiper-team`, {
//   speed: 800,

//   breakpoints: {
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 10,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 16,
//     },
//   },
//   navigation: {
//     nextEl: ".team-btn-next",
//     prevEl: ".team-btn-prev",
//   },
// });

// const swiperReviews = new Swiper(`.swiper-reviews`, {
//   speed: 800,

//   slidesPerView: 1,
//   spaceBetween: 16,

//   navigation: {
//     nextEl: ".review-btn-next",
//     prevEl: ".review-btn-prev",
//   },
// });

// const swiperReporting = new Swiper(`.swiper-reporting`, {
//   speed: 800,

//   breakpoints: {
//     320: {
//       slidesPerView: 1.2,
//       spaceBetween: 7,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 7,
//     },
//   },

//   navigation: {
//     nextEl: ".reporting-btn-next",
//     prevEl: ".reporting-btn-prev",
//   },
// });

// // const swiperHero = new Swiper(".swiper-ecodev", {
// //   speed: 800,
// //   slidesPerView: 1,
// //   spaceBetween: 8,
// //   grabCursor: true,

// //   // Инициализация при создании
// //   on: {
// //     slideChange: function () {
// //       updateShownClass(this);
// //     },
// //     slideChangeTransitionEnd: function () {
// //       updateShownClass(this);
// //     },
// //   },
// // });

// // // Обновление класса для показанных слайдов
// // function updateShownClass(swiper) {
// //   // Удаляем класс у всех слайдов
// //   swiper.slides.forEach((slide) => {
// //     slide.classList.remove("swiper-slide-shown");
// //   });

// //   // Добавляем класс всем слайдам, которые БЫЛИ активными (кроме текущего)
// //   for (let i = 0; i < swiper.activeIndex; i++) {
// //     swiper.slides[i].classList.add("swiper-slide-shown");
// //   }
// // }

// // const swiperVisions = new Swiper(`.swiper-visions`, {
// //   speed: 800,
// //   slidesPerView: 1,
// //   spaceBetween: 16,
// //   allowTouchMove: false,
// //   navigation: {
// //     nextEl: ".visions-btn-next",
// //     prevEl: ".visions-btn-prev",
// //   },
// // });

// // const swiperVisionsImg = new Swiper(`.swiper-visions-img`, {
// //   speed: 1200,
// //   slidesPerView: 1,
// //   allowTouchMove: false,
// // });

// // swiperVisions.on("slideChange", () => {
// //   let index = swiperVisions.activeIndex;
// //   swiperVisionsImg.slideTo(index);
// // });

// // swiperVisionsImg.on("slideChange", () => {
// //   let index = swiperVisionsImg.activeIndex;
// //   swiperVisions.slideTo(index);
// // });

// // const swiperProjects = new Swiper(`.swiper-projects`, {
// //   speed: 800,
// //   grabCursor: true,

// //   breakpoints: {
// //     320: {
// //       slidesPerView: 1,
// //       spaceBetween: 8,
// //     },
// //     768: {
// //       slidesPerView: 3,
// //       spaceBetween: 8,
// //     },
// //   },

// //   navigation: {
// //     nextEl: ".projects-btn-next",
// //     prevEl: ".projects-btn-prev",
// //   },
// // });

// // const buildAllSwiperProjectCardModal = (sliderElm) => {
// //   let sliderIdentifier = sliderElm.dataset.id;

// //   return new Swiper(`.swiper-project-card-modal-${sliderIdentifier}`, {
// //     grabCursor: true,
// //     speed: 800,
// //     slidesPerView: 1,

// //     navigation: {
// //       nextEl: `.swiper-project-card-modal-btn-next-${sliderIdentifier}`,
// //       prevEl: `.swiper-project-card-modal-btn-prev-${sliderIdentifier}`,
// //     },
// //   });
// // };

// // const allSwiperProjectCardModal = document.querySelectorAll(
// //   ".swiper-project-card-modal"
// // );

// // allSwiperProjectCardModal.forEach((slider) =>
// //   buildAllSwiperProjectCardModal(slider)
// // );

// // const buildAllSwiperProjectDistrict = (sliderElm) => {
// //   let sliderIdentifier = sliderElm.dataset.id;

// //   return new Swiper(`.swiper-projects-district-${sliderIdentifier}`, {
// //     grabCursor: true,
// //     speed: 800,

// //     breakpoints: {
// //       320: {
// //         slidesPerView: 1,
// //         spaceBetween: 8,
// //       },
// //       768: {
// //         slidesPerView: 3,
// //         spaceBetween: 8,
// //       },
// //     },

// //     navigation: {
// //       nextEl: `.projects-btn-next-${sliderIdentifier}`,
// //       prevEl: `.projects-btn-prev-${sliderIdentifier}`,
// //     },
// //   });
// // };

// // const allSwiperProjectDistrict = document.querySelectorAll(
// //   ".swiper-projects-district"
// // );

// // allSwiperProjectDistrict.forEach((slider) =>
// //   buildAllSwiperProjectDistrict(slider)
// // );

// // const swiperProjectsDistrictThumbs = new Swiper(
// //   `.swiper-projects-district-thumbs`,
// //   {
// //     speed: 800,

// //     watchSlidesProgress: true,

// //     breakpoints: {
// //       320: {
// //         slidesPerView: 3,
// //         spaceBetween: 2,
// //       },
// //       768: {
// //         slidesPerView: 3,
// //         spaceBetween: 12,
// //       },
// //     },
// //   }
// // );

// // const swiperProjectsDistrictWrapper = new Swiper(
// //   `.swiper-projects-district-wrapper`,
// //   {
// //     speed: 800,
// //     slidesPerView: 1,
// //     spaceBetween: 8,

// //     thumbs: {
// //       swiper: swiperProjectsDistrictThumbs,
// //     },
// //   }
// // );

// // const swiperProjectsDistrictWrapperNav = new Swiper(
// //   `.swiper-projects-district-wrapper-nav`,
// //   {
// //     speed: 800,
// //     slidesPerView: 1,
// //     spaceBetween: 8,
// //     allowTouchMove: false,
// //   }
// // );

// // swiperProjectsDistrictWrapper.on("slideChange", () => {
// //   let index = swiperProjectsDistrictWrapper.activeIndex;
// //   swiperProjectsDistrictWrapperNav.slideTo(index);
// // });

// // swiperProjectsDistrictWrapperNav.on("slideChange", () => {
// //   let index = swiperProjectsDistrictWrapperNav.activeIndex;
// //   swiperProjectsDistrictWrapper.slideTo(index);
// // });
