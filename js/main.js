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
      const isActive = this.classList.contains("active");

      // Закрываем все элементы
      faq.forEach((item) => {
        item.classList.remove("active");
        let body = item.querySelector(".faq-item__body");
        body.style.maxHeight = null;
      });

      // Если элемент не был активен, открываем его
      if (!isActive) {
        this.classList.add("active");
        let faqBody = this.querySelector(".faq-item__body");
        faqBody.style.maxHeight = faqBody.scrollHeight + "px";
      }
    });
  });

  //story-card
  const storyCard = document.querySelectorAll(".story-card");

  storyCard.forEach((el) => {
    el.addEventListener("click", function () {
      const isActive = this.classList.contains("active");

      // Закрываем все элементы
      storyCard.forEach((item) => {
        item.classList.remove("active");
        let body = item.querySelector(".story-card__body");
        body.style.maxHeight = null;
      });

      // Если элемент не был активен, открываем его
      if (!isActive) {
        this.classList.add("active");
        let storyCardBody = this.querySelector(".story-card__body");
        storyCardBody.style.maxHeight = storyCardBody.scrollHeight + "px";
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

  const stocartBtnAdd = document.getElementById("stocart-btn-add");

  if (stocartBtnAdd) {
    const stocartAfterAdded = document.getElementById("stocart-after-added");

    stocartBtnAdd.addEventListener("click", function (e) {
      e.preventDefault();
      stocartAfterAdded.classList.add("show");
      this.classList.add("hidden");
    });
  }

  //REG-PASSWORD_INPUTS

  const passwordBox = document.querySelectorAll(".password-box");

  passwordBox.forEach((box) => {
    const passwordInput = box.querySelector("input");
    const eyes = box.querySelector(".password-box__eyes");

    box.classList.add("closed");

    eyes.addEventListener("click", () => {
      if (box.classList.contains("closed")) {
        box.classList.remove("closed");
        box.classList.add("opened");
        passwordInput.type = "text";
        passwordInput.focus();
      } else {
        box.classList.remove("opened");
        box.classList.add("closed");
        passwordInput.type = "password";
        passwordInput.focus();
      }
    });
  });

  //CATANAV
  const catalogBtn = document.getElementById("catalog-call");
  const catanav = document.getElementById("catanav");
  const mobileson = catanav?.querySelector(".catanav-mobileson");
  const mobilesonClose = catanav?.querySelector(".catanav-mobileson__close");
  const mobilesonParentName = catanav?.querySelector(
    ".catanav-mobileson__parent-name"
  );
  const mobilesonBox = catanav?.querySelector(".catanav-mobileson__box");
  const parents = catanav?.querySelectorAll(".catanav-parent");

  const isMobile = () => window.matchMedia("(max-width: 767.98px)").matches;

  // 1) Тоггл основной кнопки каталога
  if (catalogBtn && catanav) {
    catalogBtn.addEventListener("click", (e) => {
      e.preventDefault();
      catalogBtn.classList.toggle("is-active");
      catanav.classList.toggle("is-active");
      document.body.classList.toggle("menu-active");

      // При закрытии каталога — закрыть и мобильную панель и сбросить активных родителей
      if (!catanav.classList.contains("is-active")) {
        mobileson?.classList.remove("is-active");
        parents?.forEach((p) => p.classList.remove("is-active"));
        mobilesonParentName && (mobilesonParentName.textContent = "");
        mobilesonBox && (mobilesonBox.innerHTML = "");
      }
    });
  }

  // 2) Логика клика по родителю — только на мобиле
  if (parents && mobileson && mobilesonParentName && mobilesonBox) {
    parents.forEach((parent) => {
      parent.addEventListener("click", (e) => {
        if (!isMobile()) return; // на десктопе — игнор
        e.preventDefault();
        e.stopPropagation();

        // активируем текущего родителя, снимаем с соседей
        parents.forEach((p) => p.classList.remove("is-active"));
        parent.classList.add("is-active");

        // Заголовок родителя
        const titleEl = parent.querySelector(".catanav-parent__title");
        const parentTitle = titleEl ? titleEl.textContent.trim() : "";
        mobilesonParentName.textContent = parentTitle;

        // Список SONS (игнорим grandson)
        mobilesonBox.innerHTML = "";
        const sons = parent.querySelectorAll(
          ".catanav-son .catanav-son__title"
        );
        sons.forEach((son) => {
          const text = son.textContent.trim();
          const href = son.getAttribute("href") || "#";
          const a = document.createElement("a");
          a.className = "catanav-mobileson__item link";
          a.href = href;
          a.textContent = text;
          mobilesonBox.appendChild(a);
        });

        // показать мобильную панель
        mobileson.classList.add("is-active");
      });
    });
  }

  // 3) Закрытие мобильной панели
  if (mobileson && mobilesonClose) {
    mobilesonClose.addEventListener("click", (e) => {
      // Закрываем ТОЛЬКО если клик по самомy .catanav-mobileson__close (а не по его детям)
      if (e.target !== mobilesonClose) return;
      mobileson.classList.remove("is-active");
      parents?.forEach((p) => p.classList.remove("is-active"));
    });
  }

  // 4) На ресайз: если вышли из мобилки — гасим мобильные состояния
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      mobileson?.classList.remove("is-active");
      parents?.forEach((p) => p.classList.remove("is-active"));
      mobilesonParentName && (mobilesonParentName.textContent = "");
      mobilesonBox && (mobilesonBox.innerHTML = "");
    }
  });
});
