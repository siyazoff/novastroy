document.addEventListener("DOMContentLoaded", () => {
  //HEADER LOGIC
  (() => {
    const header = document.querySelector(".header");
    const menu = document.querySelector(".menu");
    const body = document.body;
    if (!header) return;

    /* ───  БУРГЕР  ─────────────────────────────────────────────── */
    header.querySelector(".burger")?.addEventListener("click", () => {
      header.classList.toggle("menu-active");
      body.classList.toggle("menu-active");
    });

    /* ───  ПРОКРУТКА  ──────────────────────────────────────────── */
    const raf =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((cb) => setTimeout(cb, 1000 / 60));

    let lastScroll = window.scrollY; // предыдущее положение
    const DELTA = 10; // «шум» прокрутки, пикселей
    const hideAfter = header.offsetHeight; // не прятать, пока хедер в зоне видимости

    function checkScroll() {
      const cur = window.scrollY;

      /* — состояние «страница не вверху» ———————————————— */
      if (cur > 0) header.classList.add("scrolled");
      else header.classList.remove("scrolled");

      /* — состояние «скроллим вниз» ———————————————— */
      if (Math.abs(cur - lastScroll) > DELTA) {
        if (cur > lastScroll && cur > hideAfter) {
          header.classList.add("scroll-down"); // можно анимировать убирание
        } else {
          header.classList.remove("scroll-down");
        }
        lastScroll = cur;
      }
    }

    window.addEventListener("scroll", () => raf(checkScroll));
    checkScroll(); // вызвать при загрузке

    /* ───  ЗАКРЫВАЕМ БУРГЕР ПО КЛИКУ ПО ССЫЛКАМ  ──────────────── */
    document.querySelectorAll(".menu__nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        header.classList.remove("menu-active");
        body.classList.remove("menu-active");
      })
    );
  })();

  if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

  //MODAL WINDOW LOGIC
  document.addEventListener("click", function (event) {
    const openTrigger = event.target.closest("[data-modal-target]");
    const closeTrigger = event.target.closest("[data-modal-close]");
    const anyModal = event.target.closest(".modal");

    // 1) Открытие по data-modal-target
    if (openTrigger) {
      event.preventDefault();
      const modalId = openTrigger.getAttribute("data-modal-target");
      const modalEl = document.querySelector(`[data-modal="${modalId}"]`);
      if (modalEl) {
        modalEl.classList.add("is_active");
        // При открытии любой модалки добавляем класс к body
        document.body.classList.add("noscroll");
      }
      return;
    }

    // 2) Закрытие по кнопке data-modal-close
    if (closeTrigger) {
      event.preventDefault();
      const parentModal = closeTrigger.closest(".modal");
      if (parentModal) {
        parentModal.classList.remove("is_active");

        // Если нет ни одной открытой модалки, убираем класс у body
        if (!document.querySelector(".modal.is_active")) {
          document.body.classList.remove("noscroll");
        }
      }
      return;
    }

    if (anyModal && !event.target.closest(".modal-inner")) {
      anyModal.classList.remove("is_active");

      if (!document.querySelector(".modal.is_active")) {
        document.body.classList.remove("noscroll");
      }
      return;
    }
  });

  // TEL INPUTS LOGIC
  const telInputs = document.querySelectorAll(".tel-input");

  telInputs.forEach((input) => {
    IMask(input, { mask: "+{7} (000) 000-00-00" });
  });

  // TABBY TABS LOGIC
  const allTabs = document.querySelectorAll("[data-tabs]");

  if (allTabs.length > 0) {
    allTabs.forEach((tabElement) => {
      const selector = `[data-tabs="${tabElement.getAttribute("data-tabs")}"]`;
      const tabs = new Tabby(selector);
    });
  }

  //FAQ
  const faq = document.querySelectorAll(".faq-item");

  faq.forEach((el) => {
    el.addEventListener("click", function () {
      this.classList.toggle("active");
      let faqBody = this.querySelector(".faq-item__body");
      if (faqBody.style.maxHeight) {
        faqBody.style.maxHeight = null;
      } else {
        faqBody.style.maxHeight = faqBody.scrollHeight + "px";
      }
    });
  });

  //PRODUCT CARDS
  const productcard = document.querySelectorAll(".productcard");

  productcard.forEach((card) => {
    let addToCard = card.querySelector(".add-to-card");
    let span = addToCard.querySelector("span");
    let likeBtn = card.querySelector(".productcard__like");

    likeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("in-favs");
      card.classList.toggle("in-favs");
    });

    addToCard.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("in-cart");
      card.classList.toggle("in-cart");

      // Меняем текст в зависимости от состояния
      if (this.classList.contains("in-cart")) {
        span.textContent = "В корзине";
      } else {
        span.textContent = "В корзину";
      }
    });
  });
});
