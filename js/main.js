// Запускаем только на устройствах с точным указателем (не touch)
const isPointerFine = window.matchMedia('(pointer: fine)').matches;

// ─── Кастомный курсор ───
if (isPointerFine) {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot следует мгновенно
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    // Spotlight следует за курсором
    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
  }, { passive: true });

  // Ring следует с лёгкой задержкой (lerp)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Увеличиваем ring при наведении на интерактивные элементы
  const hoverTargets = document.querySelectorAll('a, button, .btn, .faq__question, .tab-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'), { passive: true });
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'), { passive: true });
  });
}

// ─── Magnetic кнопки ───
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, { passive: true });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  }, { passive: true });
});

// ─── Прогресс-бар скролла ───
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });

// ─── Nav: скрываем/показываем при скролле ───
const nav = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > 80 && currentY > lastScrollY) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScrollY = currentY;
}, { passive: true });

// Добавляем transition на nav
nav.style.transition = 'transform 0.3s ease';
