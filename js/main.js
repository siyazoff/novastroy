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

  //SUBMENU LOGIC
  (() => {
    const MOBILE_MAX_WIDTH = 768;
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const isMobile = () => mql.matches;

    function closeAll(root = document) {
      root.querySelectorAll(".menu-lvl1 ul.active").forEach((ul) => {
        ul.classList.remove("active");
        ul.style.maxHeight = null; // сброс высоты для анимации
      });
      root
        .querySelectorAll(".menu-lvl1 a[aria-expanded]")
        .forEach((a) => a.setAttribute("aria-expanded", "false"));
    }

    // вспомогательная: открыть/закрыть конкретное submenu с анимацией (только мобилка)
    function setSubmenuOpen(submenu, link, open) {
      if (open) {
        submenu.classList.add("active");
        // сначала сброс, затем выставляем текущую фактическую высоту
        submenu.style.maxHeight = null;
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        link.setAttribute("aria-expanded", "true");
      } else {
        submenu.classList.remove("active");
        submenu.style.maxHeight = null;
        link.setAttribute("aria-expanded", "false");
      }
      // после любого изменения пересчитаем высоту всех активных родителей (для вложенных меню)
      bubbleRecalc(submenu);
    }

    // пересчитать max-height у всех активных родительских UL
    function bubbleRecalc(el) {
      let parentUL = el.parentElement?.closest("ul");
      while (parentUL && parentUL.classList.contains("active")) {
        parentUL.style.maxHeight = parentUL.scrollHeight + "px";
        parentUL = parentUL.parentElement?.closest("ul");
      }
    }

    // --- Мобильная логика (по клику) + анимация ---
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a.menu__link");
      if (!link) return;

      const li = link.closest("li");
      if (!li) return;

      const submenu = li.querySelector(":scope > ul");
      if (!submenu) return;

      if (!isMobile()) return; // на десктопе не вмешиваемся

      e.preventDefault();

      const levelContainer = li.parentElement;

      // Закрыть соседние подменю на этом уровне (с анимацией)
      levelContainer
        .querySelectorAll(":scope > li > ul.active")
        .forEach((ul) => {
          if (ul !== submenu) {
            const parentLink = ul.parentElement.querySelector(
              ":scope > a.menu__link"
            );
            setSubmenuOpen(ul, parentLink, false);
          }
        });

      // Сброс aria у соседей
      levelContainer
        .querySelectorAll(':scope > li > a[aria-expanded="true"]')
        .forEach((a) => {
          if (a !== link) a.setAttribute("aria-expanded", "false");
        });

      // Тоггл текущего подменю (с анимацией)
      const willOpen = !submenu.classList.contains("active");
      setSubmenuOpen(submenu, link, willOpen);
    });

    // --- Десктопная логика (по hover) ---
    document.querySelectorAll(".menu-lvl1 li").forEach((li) => {
      const link = li.querySelector(":scope > a.menu__link");
      const submenu = li.querySelector(":scope > ul");
      if (link && submenu) {
        li.addEventListener("mouseenter", () => {
          if (isMobile()) return;
          submenu.classList.add("active");
          link.setAttribute("aria-expanded", "true");
        });

        li.addEventListener("mouseleave", () => {
          if (isMobile()) return;
          submenu.classList.remove("active");
          link.setAttribute("aria-expanded", "false");
        });
      }
    });

    // При переходе с мобилки на десктоп — очистить состояния + инлайновые max-height
    mql.addEventListener("change", (ev) => {
      if (!ev.matches) closeAll();
    });

    // ARIA
    document.querySelectorAll(".menu-lvl1 li").forEach((li) => {
      const link = li.querySelector(":scope > a.menu__link");
      const submenu = li.querySelector(":scope > ul");
      if (link && submenu) {
        link.setAttribute("aria-haspopup", "true");
        link.setAttribute("aria-expanded", "false");
      }
    });
  })();

  // SEARCH BUTTON LOGIC
  (() => {
    const header = document.querySelector(".header");
    const headerSearchCaller = document.querySelector(".header-search-caller");
    const headerSearchContainer = document.querySelector(
      ".header-search-container"
    );

    if (header) {
      headerSearchCaller.addEventListener("click", function (e) {
        e.stopPropagation(); // чтобы клик по кнопке не закрыл сразу
        headerSearchContainer.classList.toggle("active");
        header.classList.toggle("search-active");
      });

      // Клик внутри контейнера не закрывает его
      headerSearchContainer.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      // Клик вне контейнера — убираем active
      document.addEventListener("click", function () {
        headerSearchContainer.classList.remove("active");
        header.classList.remove("search-active");
      });
    }
  })();

  // DIRECTION CARDS HOVER

  const cards = document.querySelectorAll(".direction-card");

  if (cards.length > 0) {
    const MOBILE_MAX_WIDTH = 768;
    const isMobile = () =>
      window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;

    // изначально активна первая
    cards[0].classList.add("active");

    cards.forEach((card) => {
      // Десктопная логика
      card.addEventListener("mouseenter", () => {
        if (isMobile()) return; // на мобилке не работаем по ховеру
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });

      card.addEventListener("mouseleave", () => {
        if (isMobile()) return;
        cards.forEach((c) => c.classList.remove("active"));
        cards[0].classList.add("active");
      });

      // Мобильная логика (по клику)
      card.addEventListener("click", () => {
        if (!isMobile()) return; // на десктопе не работаем по клику
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });
    });
  }

  const awardsCard = document.querySelectorAll(".awards-card");

  if (awardsCard.length > 0) {
    awardsCard.forEach((card) => {
      card.addEventListener("click", (e) => {
        const isActive = card.classList.contains("active");

        awardsCard.forEach((c) => {
          c.classList.remove("active");
        });

        if (!isActive) {
          card.classList.add("active");
        }
      });
    });
  }
});
