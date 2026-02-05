
const heads = document.querySelectorAll('.card .head');

  function closeCard(card) {
    const body = card.querySelector('.text');
    if (!card.classList.contains('is-open')) return;

    // se estiver em auto, traz pra px antes de animar
    body.style.height = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      body.style.height = '0px';
    });

    card.classList.remove('is-open');
  }

  function openCard(card) {
    const body = card.querySelector('.text');

    card.classList.add('is-open');
    body.style.height = body.scrollHeight + 'px';

    // ao terminar, vira auto (não quebra em textos diferentes)
    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      body.style.height = 'auto';
      body.removeEventListener('transitionend', onEnd);
    };
    body.addEventListener('transitionend', onEnd);
  }

  heads.forEach((head) => {
    const card = head.closest('.card');
    const body = card.querySelector('.text');

    // estado inicial fechado
    body.style.height = '0px';

    head.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // fecha todos os outros
      document.querySelectorAll('.card.is-open').forEach((openOne) => {
        if (openOne !== card) closeCard(openOne);
      });

      // toggle do atual
      if (isOpen) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });
  });

  // evita bug em resize com height auto
  window.addEventListener('resize', () => {
    document.querySelectorAll('.card.is-open .text').forEach((body) => {
      body.style.height = 'auto';
    });
  });


(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const cardsWrap = $(".cards");
  if (!cardsWrap) return;

  const cards = $$(".cards .card");
  if (!cards.length) return;

  // Config: só 1 aberto por vez (fica mais institucional)
  const ONLY_ONE_OPEN = true;

  function setPanelHeight(panel, open) {
    if (!panel) return;

    if (open) {
      // mede a altura real e anima até ela
      panel.style.height = panel.scrollHeight + "px";

      // depois da animação, deixa "auto" pra não travar se tiver resize
      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        panel.style.height = "auto";
        panel.removeEventListener("transitionend", onEnd);
      };
      panel.addEventListener("transitionend", onEnd);

    } else {
      // se estava em auto, fixa no px atual e anima para 0
      panel.style.height = panel.scrollHeight + "px";
      // força reflow
      panel.offsetHeight; // eslint-disable-line no-unused-expressions
      panel.style.height = "0px";
    }
  }

  function closeAllExcept(currentWrap) {
    cards.forEach((card) => {
      const wrap = $(".dlvAccWrap", card);
      if (!wrap || wrap === currentWrap) return;

      if (wrap.classList.contains("is-open")) {
        wrap.classList.remove("is-open");
        wrap.setAttribute("aria-expanded", "false");
        const panel = $(".dlvAccPanel", wrap);
        setPanelHeight(panel, false);

        const btn = $(".dlvAccBtn", wrap);
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Monta accordion pra cada card
  cards.forEach((card) => {
    const boxes = $$(":scope > .box", card);
    if (!boxes.length) return;

    // Quantidade de tópicos (contador no botão)
    const topicCount = boxes.reduce((acc, b) => acc + $$(".topic", b).length, 0);

    // Cria estrutura do accordion
    const wrap = document.createElement("div");
    wrap.className = "dlvAccWrap";
    wrap.setAttribute("aria-expanded", "false");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dlvAccBtn";
    btn.setAttribute("aria-expanded", "false");

    btn.innerHTML = `
      <span class="dlvAccBtn__left">
        <span class="dlvAccBtn__label">Ver entregáveis</span>
        <span class="dlvAccBtn__count">${topicCount}</span>
      </span>
      <span class="dlvAccChevron" aria-hidden="true"></span>
    `;

    const panel = document.createElement("div");
    panel.className = "dlvAccPanel";
    panel.style.height = "0px";

    const inner = document.createElement("div");
    inner.className = "dlvAccInner";

    // Move os .box originais pra dentro do accordion (sem perder conteúdo)
    boxes.forEach((b) => inner.appendChild(b));
    panel.appendChild(inner);

    wrap.appendChild(btn);
    wrap.appendChild(panel);

    // Coloca o accordion no final do card
    card.appendChild(wrap);

    // Toggle
    btn.addEventListener("click", () => {
      const isOpen = wrap.classList.contains("is-open");

      if (ONLY_ONE_OPEN && !isOpen) {
        closeAllExcept(wrap);
      }

      if (isOpen) {
        wrap.classList.remove("is-open");
        wrap.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-expanded", "false");
        setPanelHeight(panel, false);
      } else {
        wrap.classList.add("is-open");
        wrap.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-expanded", "true");

        // se estava em auto por algum motivo, volta pro 0 antes de abrir
        if (panel.style.height === "auto") panel.style.height = "0px";
        setPanelHeight(panel, true);
      }
    });
  });

  // Em resize, se estiver aberto e height = auto, recalcula no momento de fechar/abrir.
  // Aqui só garantimos que "auto" continue fluindo sem quebrar.
})();

if (larguraDaTela < 800) {
    var swiper3 = new Swiper(".mySwiper3", {
        grabCursor: true,
        effect: "creative",
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },
        creativeEffect: {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
} else {
    var swiper3 = new Swiper(".mySwiper3", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
}

