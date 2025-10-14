document.addEventListener("DOMContentLoaded", () => {
  // ===== SHARED HELPERS (header + catanav) =====
  (function () {
    const body = document.body;

    // HEADER
    const header = document.querySelector(".header");
    const headerBurger = header?.querySelector(".burger");

    // CATANAV
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

    // ---- state helpers
    const isHeaderOpen = () => header?.classList.contains("menu-active");
    const isCatanavOpen = () => catanav?.classList.contains("is-active");

    const updateBodyLock = () => {
      // body.menu-active включён, если открыт хотя бы один из «бургеров»
      const anyOpen = !!(isHeaderOpen() || isCatanavOpen());
      body.classList.toggle("menu-active", anyOpen);
    };

    // ---- header controls
    const openHeader = () => {
      header?.classList.add("menu-active");
      updateBodyLock();
    };
    const closeHeader = () => {
      header?.classList.remove("menu-active");
      updateBodyLock();
    };
    const toggleHeader = () => {
      if (isHeaderOpen()) closeHeader();
      else {
        // взаимоисключаемость: закрыть каталог, затем открыть хедер
        closeCatanav();
        openHeader();
      }
    };

    // ---- catanav controls
    const resetCatanavInner = () => {
      mobileson?.classList.remove("is-active");
      parents?.forEach((p) => p.classList.remove("is-active"));
      if (mobilesonParentName) mobilesonParentName.textContent = "";
      if (mobilesonBox) mobilesonBox.innerHTML = "";
    };
    const openCatanav = () => {
      catanav?.classList.add("is-active");
      catalogBtn?.classList.add("is-active");
      updateBodyLock();
    };
    const closeCatanav = () => {
      catanav?.classList.remove("is-active");
      catalogBtn?.classList.remove("is-active");
      resetCatanavInner();
      updateBodyLock();
    };
    const toggleCatanav = () => {
      if (isCatanavOpen()) closeCatanav();
      else {
        // взаимоисключаемость: закрыть хедер, затем открыть каталог
        closeHeader();
        openCatanav();
      }
    };

    // ===== HEADER LOGIC =====
    if (header) {
      // бургер
      headerBurger?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleHeader();
      });

      // прятать/показывать при скролле (как у тебя)
      const raf =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        ((cb) => setTimeout(cb, 1000 / 60));

      let lastScroll = window.scrollY;
      const DELTA = 10;
      const hideAfter = header.offsetHeight;

      function checkScroll() {
        const cur = window.scrollY;
        if (cur > 0) header.classList.add("scrolled");
        else header.classList.remove("scrolled");

        if (Math.abs(cur - lastScroll) > DELTA) {
          if (cur > lastScroll && cur > hideAfter) {
            header.classList.add("scroll-down");
          } else {
            header.classList.remove("scroll-down");
          }
          lastScroll = cur;
        }
      }

      window.addEventListener("scroll", () => raf(checkScroll));
      checkScroll();

      // клик по ссылкам меню — закрыть хедер (и body-лок сам обновится)
      document.querySelectorAll(".menu__nav-link").forEach((link) =>
        link.addEventListener("click", () => {
          closeHeader();
        })
      );
    }

    // ===== CATANAV LOGIC =====
    if (catalogBtn && catanav) {
      catalogBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleCatanav();
      });
    }

    // клик по родителю — только на мобиле
    if (parents && mobileson && mobilesonParentName && mobilesonBox) {
      parents.forEach((parent) => {
        parent.addEventListener("click", (e) => {
          if (!isMobile()) return; // на десктопе — игнор
          e.preventDefault();
          e.stopPropagation();

          parents.forEach((p) => p.classList.remove("is-active"));
          parent.classList.add("is-active");

          const titleEl = parent.querySelector(".catanav-parent__title");
          mobilesonParentName.textContent = titleEl
            ? titleEl.textContent.trim()
            : "";

          mobilesonBox.innerHTML = "";
          parent
            .querySelectorAll(".catanav-son .catanav-son__title")
            .forEach((son) => {
              const a = document.createElement("a");
              a.className = "catanav-mobileson__item link";
              a.href = son.getAttribute("href") || "#";
              a.textContent = son.textContent.trim();
              mobilesonBox.appendChild(a);
            });

          mobileson.classList.add("is-active");
        });
      });
    }

    // закрытие мобильной панели
    if (mobileson && mobilesonClose) {
      mobilesonClose.addEventListener("click", (e) => {
        if (e.target !== mobilesonClose) return;
        mobileson.classList.remove("is-active");
        parents?.forEach((p) => p.classList.remove("is-active"));
      });
    }

    // ресайз: при выходе из мобилки — сброс внутренних состояний
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        mobileson?.classList.remove("is-active");
        parents?.forEach((p) => p.classList.remove("is-active"));
        if (mobilesonParentName) mobilesonParentName.textContent = "";
        if (mobilesonBox) mobilesonBox.innerHTML = "";
      }
    });

    // (опционально) закрытие по ESC, чтобы не конфликтовало: закрываем тот, что открыт
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (isCatanavOpen()) closeCatanav();
      else if (isHeaderOpen()) closeHeader();
    });
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

  //singleFavIcon

  const favsSingles = document.querySelectorAll(".single__fav");

  favsSingles.forEach((e) => {
    e.addEventListener("click", (a) => {
      a.preventDefault();
      e.classList.toggle("active");
    });
  });

  //FILTER SORTING

  if (document.querySelector(".category__sorting")) {
    const filterItems = document.querySelectorAll(".filter-item");

    filterItems.forEach((el) => {
      const filterItemHead = el.querySelector(".filter-item__head");

      filterItemHead.addEventListener("click", function () {
        // Закрываем все остальные элементы
        filterItems.forEach((item) => {
          if (item !== el) {
            item.classList.remove("active");
            const body = item.querySelector(".filter-item__body");
            body.style.maxHeight = null;
          }
        });

        // Открываем/закрываем текущий элемент
        el.classList.toggle("active");
        const filterItemBody = el.querySelector(".filter-item__body");

        if (el.classList.contains("active")) {
          filterItemBody.style.maxHeight = filterItemBody.scrollHeight + "px";
        } else {
          filterItemBody.style.maxHeight = null;
        }
      });
    });

    const nativeSelect = document.querySelector(".filter-select-tag");
    const customSelect = document.querySelector(".filter-select");

    const customOptions = document.querySelector(".filter-select__box");

    nativeSelect.querySelectorAll("option").forEach((option) => {
      const customOption = document.createElement("div");
      customOption.classList.add("filter-select__option");
      customOption.textContent = option.textContent;
      customOption.dataset.value = option.value;

      customOption.addEventListener("click", () => {
        nativeSelect.value = option.value;

        customOptions
          .querySelectorAll(".filter-select__option")
          .forEach((opt) => {
            opt.classList.remove("active");
          });

        customOption.classList.add("active");

        customSelect.classList.remove("active");
      });

      customOptions.appendChild(customOption);
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("active");
      }
    });

    if (nativeSelect.selectedIndex >= 0) {
      const defaultOption = customOptions.children[nativeSelect.selectedIndex];
      defaultOption.classList.add("active");
    }

    const filterBtn = document.querySelector(".filter-btn");
    const filter = document.querySelector(".filter");

    // Открытие/закрытие фильтра
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      filterBtn.classList.toggle("active");
      filter.classList.toggle("active");
    });

    // Закрытие при клике вне фильтра
    document.addEventListener("click", (e) => {
      const isClickInsideFilter = filter.contains(e.target);
      const isClickOnFilterBtn = filterBtn.contains(e.target);

      if (!isClickInsideFilter && !isClickOnFilterBtn) {
        filterBtn.classList.remove("active");
        filter.classList.remove("active");
      }
    });

    const sortingBtn = document.querySelector(".sorting-btn");
    const sorting = document.querySelector(".sorting");

    // Открытие/закрытие фильтра
    sortingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sortingBtn.classList.toggle("active");
      sorting.classList.toggle("active");
    });

    // Закрытие при клике вне фильтра
    document.addEventListener("click", (e) => {
      const isClickInsideFilter = sorting.contains(e.target);
      const isClickOnFilterBtn = sortingBtn.contains(e.target);

      if (!isClickInsideFilter && !isClickOnFilterBtn) {
        sortingBtn.classList.remove("active");
        sorting.classList.remove("active");
      }
    });
  }

  //SCROLL-REVEAL
  if (document.querySelector("[animated]")) {
    ScrollReveal().reveal("[animated]", { delay: 300 });
  }
});
