// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

  // ─── typed.js — ротация ролей в Hero ───
  if (document.getElementById('typed-role') && typeof Typed !== 'undefined') {
    new Typed('#typed-role', {
      strings: [
        'AI-специалист.',
        'Автоматизатор.',
        'Разработчик.',
        'Копирайтер.'
      ],
      typeSpeed:      60,
      backSpeed:      35,
      backDelay:      2000,
      startDelay:     800,
      loop:           true,
      showCursor:     true,
      cursorChar:     '|',
    });
  }

  // ─── VanillaTilt — 3D-эффект карточек ───
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (tiltCards.length && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tiltCards, {
      max:           8,
      speed:         400,
      glare:         true,
      'max-glare':   0.1,
      perspective:   1000,
    });
  }

  // ─── tsParticles — фон Hero ───
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      background:  { color: { value: 'transparent' } },
      fpsLimit:    60,
      particles: {
        number:    { value: 60, density: { enable: true, area: 800 } },
        color:     { value: ['#7c3aed', '#06b6d4', '#ffffff'] },
        opacity:   { value: 0.2, random: { enable: true, minimumValue: 0.05 } },
        size:      { value: { min: 1, max: 3 } },
        move: {
          enable:    true,
          speed:     0.6,
          direction: 'none',
          random:    true,
          straight:  false,
          outModes:  { default: 'out' },
        },
        links: {
          enable:    true,
          distance:  150,
          color:     '#7c3aed',
          opacity:   0.08,
          width:     1,
        },
      },
      interactivity: {
        events: {
          onHover:  { enable: true,  mode: 'grab' },
          onClick:  { enable: false },
          resize:   true,
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.2 } },
        },
      },
      detectRetina: true,
    });
  }

  // ─── FAQ аккордион ───
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item     = btn.closest('.faq__item');
      const isOpen   = item.classList.contains('is-open');

      // Закрываем все открытые
      document.querySelectorAll('.faq__item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Открываем кликнутый (если был закрыт)
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── Tabs в секции Cases ───
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const caseCards  = document.querySelectorAll('[data-tab-content]');

  function showTab(tabName) {
    // Кнопки
    tabBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tab === tabName);
    });

    // Карточки
    caseCards.forEach(card => {
      card.classList.toggle('is-visible', card.dataset.tabContent === tabName);
    });
  }

  // Показываем первую вкладку по умолчанию
  if (tabBtns.length) {
    showTab(tabBtns[0].dataset.tab);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => showTab(btn.dataset.tab));
    });
  }

});
