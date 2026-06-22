# Landing Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Построить одностраничный лендинг-портфолио Елены Бисеровой — Dark AI Master стиль, 7 секций, HTML+CSS+JS, деплой на Vercel.

**Architecture:** Статический одностраничный сайт. CSS-токены управляют всей дизайн-системой. Анимации реализованы через нативный CSS scroll-driven API — без фреймворков. JS подключается в конце body, минимальный: cursor, spotlight, magnetic buttons, typed.js CDN, VanillaTilt CDN.

**Tech Stack:** HTML5, CSS3 (Custom Properties, scroll-driven animations, grid, backdrop-filter), Vanilla JS (~100 строк), typed.js v2 (CDN), VanillaTilt (CDN), tsParticles (CDN), Space Grotesk + Inter + JetBrains Mono (Google Fonts).

## Global Constraints

- Стек: только HTML/CSS/JS — никаких npm, сборщиков, фреймворков
- Цвета строго из переменных `variables.css` — никаких хардкодных hex в других файлах
- LCP < 2.5s — шрифты через `font-display: swap`, изображения WebP с lazy loading
- Все интерактивные элементы: `min-height: 48px` для touch targets
- `prefers-reduced-motion`: все анимации за исключением opacity отключаются
- Кастомный курсор: только при `@media (pointer: fine)` — не на touch-устройствах
- Текст кнопок: никогда "Отправить" / "Связаться" — только конкретные глаголы
- Ссылки Telegram/WhatsApp/Email: заглушки `href="#"` до получения реальных данных
- Весь текст на странице — русский язык
- Контраст текст/фон: минимум 4.5:1 (WCAG AA)

---

### Task 1: Scaffolding — файловая структура и CSS-переменные

**Files:**
- Create: `index.html`
- Create: `css/variables.css`
- Create: `css/base.css`
- Create: `css/components.css`
- Create: `css/animations.css`
- Create: `js/main.js`
- Create: `js/interactions.js`
- Create: `assets/icons/.gitkeep`
- Create: `assets/images/.gitkeep`
- Create: `vercel.json`

**Interfaces:**
- Produces: CSS custom properties доступны глобально через `:root` в `variables.css`

- [ ] **Step 1: Создать index.html — базовый HTML5 скелет**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Строю AI-агентов, автоматизации и сайты для малого бизнеса. Убираю рутину, запускаю быстро. Бесплатный первый звонок.">
  <title>Елена Бисерова — AI-системы и автоматизация для малого бизнеса</title>

  <!-- Open Graph -->
  <meta property="og:title" content="Елена Бисерова — AI-системы и автоматизация">
  <meta property="og:description" content="Строю AI-агентов, автоматизации и сайты для малого бизнеса.">
  <meta property="og:type" content="website">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body>

  <!-- Кастомный курсор -->
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <!-- Прогресс-бар скролла -->
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- Навигация -->
  <nav class="nav" id="nav">
    <div class="nav__logo">ЕБ</div>
    <div class="nav__links">
      <a href="#services">Услуги</a>
      <a href="#cases">Работы</a>
      <a href="#about">Обо мне</a>
      <a href="#contact" class="nav__cta">Написать</a>
    </div>
  </nav>

  <!-- Секция 1: Hero -->
  <section class="hero" id="hero"><!-- Task 4 --></section>

  <!-- Секция 2: Боль -->
  <section class="pain" id="pain"><!-- Task 5 --></section>

  <!-- Секция 3: Услуги -->
  <section class="services" id="services"><!-- Task 6 --></section>

  <!-- Секция 4: Доказательства -->
  <section class="cases" id="cases"><!-- Task 7 --></section>

  <!-- Секция 5: О себе (Bento) -->
  <section class="about" id="about"><!-- Task 8 --></section>

  <!-- Секция 6: Финальный CTA -->
  <section class="contact" id="contact"><!-- Task 9 --></section>

  <!-- Секция 7: FAQ -->
  <section class="faq" id="faq"><!-- Task 10 --></section>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2026 Елена Бисерова</p>
  </footer>

  <!-- CDN Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>

  <!-- Local Scripts -->
  <script src="js/main.js"></script>
  <script src="js/interactions.js"></script>

</body>
</html>
```

- [ ] **Step 2: Создать css/variables.css — все токены дизайн-системы**

```css
:root {
  /* Цвета */
  --bg-primary:    #0a0a0f;
  --bg-secondary:  #12121a;
  --bg-card:       rgba(255, 255, 255, 0.04);
  --accent-1:      #7c3aed;
  --accent-2:      #06b6d4;
  --accent-glow:   rgba(124, 58, 237, 0.4);
  --accent-2-glow: rgba(6, 182, 212, 0.3);
  --text-primary:  #f8fafc;
  --text-muted:    #94a3b8;
  --glass-border:  rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.16);

  /* Типографика */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Отступы */
  --section-padding: 6rem 1.5rem;
  --container-max:   1100px;
  --border-radius:   16px;
  --border-radius-sm: 8px;

  /* Анимации */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;
}
```

- [ ] **Step 3: Создать vercel.json**

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

- [ ] **Step 4: Создать пустые файлы-заглушки**

Создать файлы с одним комментарием, чтобы они существовали в git:
- `css/base.css` → `/* base styles — Task 2 */`
- `css/components.css` → `/* components — Task 3 */`
- `css/animations.css` → `/* animations — Task 11 */`
- `js/main.js` → `/* cursor, spotlight, magnetic — Task 12 */`
- `js/interactions.js` → `/* typed.js, tilt, FAQ — Task 13 */`

- [ ] **Step 5: Проверить в браузере**

Открыть `index.html` в браузере. Ожидаемый результат: чёрная страница, консоль без ошибок (CDN скрипты могут дать предупреждения — норма).

- [ ] **Step 6: Коммит**

```bash
git add index.html css/ js/ assets/ vercel.json
git commit -m "feat: scaffolding — file structure, HTML skeleton, CSS tokens"
git push
```

---

### Task 2: Base CSS — reset, типографика, лейаут

**Files:**
- Modify: `css/base.css`

**Interfaces:**
- Consumes: все переменные из `css/variables.css`
- Produces: `.container`, классы типографики `h1`–`h4`, базовый grid страницы

- [ ] **Step 1: Написать base.css**

```css
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
  cursor: none; /* кастомный курсор — только десктоп */
}

/* Восстанавливаем курсор на touch-устройствах */
@media (pointer: coarse) {
  body { cursor: auto; }
}

/* Контейнер */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Типографика */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.15;
  font-weight: 700;
}

h1 { font-size: clamp(2.2rem, 5vw, 4rem); }
h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
h3 { font-size: clamp(1.2rem, 2vw, 1.5rem); }

p { line-height: 1.7; color: var(--text-muted); }

a {
  color: var(--accent-2);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover { color: var(--text-primary); }

/* Секции */
section {
  padding: var(--section-padding);
  position: relative;
}

/* Noise texture поверх всего фона */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
}

/* Метка (лейбл / тег) */
.label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
}

/* Навигация */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  transition: background var(--transition-base);
}

.nav__logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav__links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}
.nav__links a:hover { color: var(--text-primary); }

.nav__cta {
  background: var(--accent-1);
  color: var(--text-primary) !important;
  padding: 0.5rem 1.25rem;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
}

/* Footer */
.footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  border-top: 1px solid var(--glass-border);
}

/* Прогресс скролла */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  z-index: 200;
  width: 0%;
  transition: width 0.1s linear;
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Проверить в браузере**

Открыть `index.html`. Ожидаемый результат: тёмная страница `#0a0a0f`, видна навигация вверху с glassmorphism-эффектом. Консоль без ошибок.

- [ ] **Step 3: Коммит**

```bash
git add css/base.css
git commit -m "feat: base CSS — reset, typography, nav, noise texture"
git push
```

---

### Task 3: Components CSS — карточки, кнопки, теги

**Files:**
- Modify: `css/components.css`

**Interfaces:**
- Consumes: переменные из `variables.css`
- Produces: `.glass-card`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.tag`, `.section-header`

- [ ] **Step 1: Написать components.css**

```css
/* ─── Glass Card ─── */
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 1.75rem;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: 0 20px 60px rgba(124, 58, 237, 0.15);
}

/* ─── Buttons ─── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.75rem 1.75rem;
  border-radius: var(--border-radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    background var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--accent-1);
  color: var(--text-primary);
  box-shadow: 0 0 20px var(--accent-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px var(--accent-glow), 0 8px 24px rgba(0,0,0,0.3);
  color: var(--text-primary);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--glass-border-hover);
}

.btn-secondary:hover {
  border-color: var(--accent-2);
  color: var(--accent-2);
  transform: translateY(-2px);
}

.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: none;
  padding: 0.5rem 0;
  text-decoration: underline;
  text-underline-offset: 4px;
  min-height: auto;
}

.btn-ghost:hover { color: var(--text-primary); }

/* ─── Tag / Chip ─── */
.tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-2);
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 100px;
  padding: 0.25rem 0.75rem;
}

/* ─── Section Header ─── */
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-header h2 {
  margin-bottom: 0.75rem;
}

.section-header p {
  max-width: 540px;
  margin: 0 auto;
  font-size: 1.1rem;
}

/* ─── Кастомный курсор ─── */
.cursor-dot,
.cursor-ring {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  transition: opacity var(--transition-fast);
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-1);
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(124, 58, 237, 0.5);
  transition: width 0.3s, height 0.3s, border-color 0.3s;
}

.cursor-ring.is-hovering {
  width: 56px;
  height: 56px;
  border-color: var(--accent-1);
}

/* Скрыть на touch */
@media (pointer: coarse) {
  .cursor-dot, .cursor-ring { display: none; }
}

/* ─── Availability Badge ─── */
.badge-available {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 100px;
  padding: 0.35rem 1rem;
}

.badge-available::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
```

- [ ] **Step 2: Проверить в браузере**

Открыть `index.html`. Добавить временно в Hero секцию: `<a href="#" class="btn btn-primary">Написать в Telegram</a>` и убедиться что кнопка отображается с фиолетовым свечением. Убрать после проверки.

- [ ] **Step 3: Коммит**

```bash
git add css/components.css
git commit -m "feat: component library — glass cards, buttons, tags, cursor styles"
git push
```

---

### Task 4: Hero секция — HTML + CSS

**Files:**
- Modify: `index.html` (заполнить `<section class="hero">`)
- Create: `css/sections/hero.css`
- Modify: `index.html` (добавить `<link>` на hero.css в `<head>`)

**Interfaces:**
- Consumes: `.btn-primary`, `.btn-ghost`, `.tag` из `components.css`
- Consumes: `.container` из `base.css`
- Produces: `#hero` секция с id для anchor-ссылок навигации

- [ ] **Step 1: Добавить ссылку на hero.css в index.html**

В `<head>`, после `<link rel="stylesheet" href="css/animations.css">` добавить:
```html
<link rel="stylesheet" href="css/sections/hero.css">
```

Создать папку `css/sections/`.

- [ ] **Step 2: Заполнить Hero HTML в index.html**

Найти `<section class="hero" id="hero"><!-- Task 4 --></section>` и заменить на:

```html
<section class="hero" id="hero">
  <!-- Частицы фона -->
  <div id="tsparticles"></div>

  <!-- Spotlight за курсором -->
  <div class="hero__spotlight"></div>

  <div class="container hero__container">
    <div class="hero__content">
      <span class="label">Цифровой мастер</span>

      <h1 class="hero__title">
        Строю AI-системы и&nbsp;автоматизации,
        <span class="hero__title-accent">которые убирают рутину</span>
        и&nbsp;приносят деньги малому бизнесу
      </h1>

      <p class="hero__subtitle">
        Елена Бисерова —&nbsp;<span id="typed-role"></span>
      </p>

      <div class="hero__trust">
        <span class="tag">Малый бизнес в России</span>
        <span class="badge-available">Беру новых клиентов</span>
      </div>

      <div class="hero__actions">
        <a href="#" class="btn btn-primary magnetic" id="hero-cta">
          Написать в Telegram
        </a>
        <a href="#cases" class="btn btn-ghost">
          Посмотреть работы ↓
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/hero.css**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem; /* высота nav */
  position: relative;
  overflow: hidden;
}

/* Particles canvas */
#tsparticles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* Spotlight */
.hero__spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(124, 58, 237, 0.12),
    transparent 70%
  );
  pointer-events: none;
  z-index: 1;
  transition: background 0.1s;
}

.hero__container {
  position: relative;
  z-index: 2;
}

.hero__content {
  max-width: 720px;
}

.hero__title {
  margin: 0.5rem 0 1.25rem;
  font-variation-settings: 'wght' 700;
}

.hero__title-accent {
  color: var(--accent-1);
  text-shadow:
    0 0 20px rgba(124, 58, 237, 0.6),
    0 0 60px rgba(124, 58, 237, 0.3);
}

.hero__subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  min-height: 2rem; /* предотвращает прыжок при typed.js */
}

.hero__trust {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* Анимация появления */
.hero__content .label   { animation: heroFadeUp 0.6s ease both 0.1s; }
.hero__title            { animation: heroFadeUp 0.7s ease both 0.2s; }
.hero__subtitle         { animation: heroFadeUp 0.7s ease both 0.5s; }
.hero__trust            { animation: heroFadeUp 0.7s ease both 0.7s; }
.hero__actions          { animation: heroFadeUp 0.7s ease both 0.9s; }

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Mobile */
@media (max-width: 640px) {
  .hero__actions { flex-direction: column; align-items: stretch; }
  .hero__actions .btn { width: 100%; justify-content: center; }
}
```

- [ ] **Step 4: Проверить в браузере**

Открыть `index.html`. Ожидаемый результат: тёмный hero на весь экран, заголовок с фиолетовым акцентом, две кнопки, значок доступности. Анимации появления при загрузке.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/hero.css
git commit -m "feat: hero section — headline, CTA, trust signals, entrance animations"
git push
```

---

### Task 5: Pain секция — зеркало проблем

**Files:**
- Modify: `index.html` (заполнить `<section class="pain">`)
- Create: `css/sections/pain.css`
- Modify: `index.html` (`<head>` — добавить ссылку на pain.css)

**Interfaces:**
- Consumes: `.container`, `.label`, `.section-header`
- Produces: `#pain` секция

- [ ] **Step 1: Добавить ссылку на pain.css в index.html head**

```html
<link rel="stylesheet" href="css/sections/pain.css">
```

- [ ] **Step 2: Заполнить Pain HTML**

Заменить `<section class="pain" id="pain"><!-- Task 5 --></section>` на:

```html
<section class="pain" id="pain">
  <div class="container">
    <div class="section-header">
      <span class="label">Знакомая ситуация?</span>
      <h2>Звучит знакомо?</h2>
    </div>

    <ul class="pain__list">
      <li class="pain__item reveal-left">
        <span class="pain__icon">😔</span>
        <p>Сайт устарел, стыдно показывать — а новый всё никак не сделать</p>
      </li>
      <li class="pain__item reveal-left" style="--delay: 0.1s">
        <span class="pain__icon">⏱️</span>
        <p>Тратишь часы на рутину: таблицы, пересылки, ручной ввод данных</p>
      </li>
      <li class="pain__item reveal-left" style="--delay: 0.2s">
        <span class="pain__icon">✍️</span>
        <p>Нанимал копирайтеров — они не понимают твой бизнес и пишут мимо</p>
      </li>
      <li class="pain__item reveal-left" style="--delay: 0.3s">
        <span class="pain__icon">🤖</span>
        <p>Слышал про AI, но не знаешь, как реально встроить его в работу</p>
      </li>
    </ul>

    <p class="pain__outro reveal-fade">Именно с этим приходят ко мне.</p>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/pain.css**

```css
.pain {
  background: linear-gradient(180deg, var(--bg-primary) 0%, #0d0820 50%, var(--bg-primary) 100%);
}

.pain__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.pain__item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  transition: border-color var(--transition-base);
}

.pain__item:hover {
  border-color: rgba(124, 58, 237, 0.3);
}

.pain__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.pain__item p {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.5;
}

.pain__outro {
  text-align: center;
  font-size: 1.25rem;
  color: var(--text-primary);
  font-weight: 500;
  font-family: var(--font-display);
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до секции Pain. Ожидаемый результат: 4 карточки с болями на тёмно-фиолетовом градиентном фоне, текст читаем.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/pain.css
git commit -m "feat: pain section — 4 pain points with empathy hook"
git push
```

---

### Task 6: Services секция — 3 карточки услуг

**Files:**
- Modify: `index.html` (заполнить `<section class="services">`)
- Create: `css/sections/services.css`
- Modify: `index.html` (`<head>`)

**Interfaces:**
- Consumes: `.glass-card`, `.tag`, `.btn-ghost`, `.section-header`
- Produces: `#services` секция, 3 карточки с классом `.tilt-card` для Task 13

- [ ] **Step 1: Добавить ссылку на services.css**

```html
<link rel="stylesheet" href="css/sections/services.css">
```

- [ ] **Step 2: Заполнить Services HTML**

```html
<section class="services" id="services">
  <div class="container">
    <div class="section-header reveal-up">
      <span class="label">Чем я помогаю</span>
      <h2>Вот чем я помогаю:</h2>
    </div>

    <div class="services__grid">

      <article class="glass-card services__card tilt-card reveal-up" style="--delay: 0.1s">
        <div class="services__icon">🤖</div>
        <span class="tag">AI и агенты</span>
        <h3>Умные системы для твоего бизнеса</h3>
        <p>Агент отвечает клиентам, обрабатывает заявки, пишет тексты — без тебя. Ты контролируешь результат.</p>
        <ul class="services__deliverables">
          <li>AI-чат для сайта и мессенджеров</li>
          <li>Агент обработки входящих заявок</li>
          <li>Автоматическая генерация контента</li>
        </ul>
      </article>

      <article class="glass-card services__card tilt-card reveal-up" style="--delay: 0.2s">
        <div class="services__icon">⚡</div>
        <span class="tag">Автоматизация</span>
        <h3>Убери ручную работу навсегда</h3>
        <p>Связываю CRM, мессенджеры, таблицы — всё работает само. Ты занимаешься бизнесом, не рутиной.</p>
        <ul class="services__deliverables">
          <li>Автоматизация на Make / n8n</li>
          <li>Интеграция сервисов и CRM</li>
          <li>Настройка workflow с нуля</li>
        </ul>
      </article>

      <article class="glass-card services__card tilt-card reveal-up" style="--delay: 0.3s">
        <div class="services__icon">🌐</div>
        <span class="tag">Сайты и тексты</span>
        <h3>Запусти за 3 недели</h3>
        <p>Сайт, который продаёт. Тексты, которые читают. Без затяжных согласований и переделок.</p>
        <ul class="services__deliverables">
          <li>Лендинг / многостраничный сайт</li>
          <li>Продающие тексты и SEO-контент</li>
          <li>Запуск и настройка аналитики</li>
        </ul>
      </article>

    </div>

    <p class="services__outro reveal-fade">
      Не знаешь, что нужно?&nbsp;
      <a href="#contact" class="btn btn-ghost">Давай разберёмся на бесплатном звонке →</a>
    </p>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/services.css**

```css
.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.services__icon {
  font-size: 2.25rem;
  margin-bottom: 1rem;
}

.services__card h3 {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.2rem;
}

.services__card p {
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.services__deliverables {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.services__deliverables li {
  font-size: 0.875rem;
  color: var(--text-muted);
  padding-left: 1.25rem;
  position: relative;
}

.services__deliverables li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent-2);
  font-size: 0.8rem;
}

.services__outro {
  text-align: center;
  color: var(--text-muted);
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до Services. Ожидаемый результат: 3 стеклянные карточки в сетке, иконки, теги, списки deliverables.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/services.css
git commit -m "feat: services section — 3 service cards with deliverables"
git push
```

---

### Task 7: Cases секция — кейсы и отзывы с вкладками

**Files:**
- Modify: `index.html` (заполнить `<section class="cases">`)
- Create: `css/sections/cases.css`
- Modify: `index.html` (`<head>`)

**Interfaces:**
- Consumes: `.glass-card`, `.tag`, `.section-header`
- Produces: `#cases` секция, tab-интерфейс `.tabs` управляемый JS в Task 13

- [ ] **Step 1: Добавить ссылку на cases.css**

```html
<link rel="stylesheet" href="css/sections/cases.css">
```

- [ ] **Step 2: Заполнить Cases HTML**

```html
<section class="cases" id="cases">
  <div class="container">
    <div class="section-header reveal-up">
      <span class="label">Доказательства</span>
      <h2>Результаты клиентов</h2>
      <p>Заглушки — будут заменены на реальные кейсы</p>
    </div>

    <!-- Вкладки -->
    <div class="tabs reveal-up">
      <button class="tab-btn is-active" data-tab="websites">Сайты</button>
      <button class="tab-btn" data-tab="automation">Автоматизация</button>
      <button class="tab-btn" data-tab="ai">AI и агенты</button>
    </div>

    <!-- Кейсы -->
    <div class="cases__grid">

      <article class="glass-card case-card reveal-up" data-tab-content="websites" style="--delay: 0.1s">
        <div class="case-card__meta">
          <span class="tag">Сайт</span>
          <span class="case-card__industry">E-commerce — [заглушка]</span>
        </div>
        <h3>Проблема: [описание проблемы клиента]</h3>
        <p>Что сделано: [конкретные действия]</p>
        <div class="case-card__result">
          <span class="case-card__metric">+240%</span>
          <span class="case-card__metric-label">рост трафика [заглушка]</span>
        </div>
      </article>

      <article class="glass-card case-card reveal-up" data-tab-content="automation" style="--delay: 0.1s">
        <div class="case-card__meta">
          <span class="tag">Автоматизация</span>
          <span class="case-card__industry">Агентство — [заглушка]</span>
        </div>
        <h3>Проблема: [описание проблемы клиента]</h3>
        <p>Что сделано: [конкретные действия]</p>
        <div class="case-card__result">
          <span class="case-card__metric">−8 часов</span>
          <span class="case-card__metric-label">в неделю [заглушка]</span>
        </div>
      </article>

    </div>

    <!-- Отзывы -->
    <div class="section-header reveal-up" style="margin-top: 4rem;">
      <h3>Что говорят клиенты</h3>
    </div>

    <div class="testimonials__grid">

      <blockquote class="glass-card testimonial-card reveal-up" style="--delay: 0.1s">
        <div class="testimonial-card__avatar">
          <div class="avatar-placeholder">ИИ</div>
        </div>
        <p class="testimonial-card__text">
          "[Заглушка] Конкретная цитата с измеримым результатом. Например: автоматизация сэкономила нам 12 часов в неделю."
        </p>
        <footer>
          <strong>[Имя Фамилия]</strong>
          <span>[Должность, Компания]</span>
        </footer>
      </blockquote>

      <blockquote class="glass-card testimonial-card reveal-up" style="--delay: 0.2s">
        <div class="testimonial-card__avatar">
          <div class="avatar-placeholder">ИФ</div>
        </div>
        <p class="testimonial-card__text">
          "[Заглушка] Конкретная цитата с измеримым результатом."
        </p>
        <footer>
          <strong>[Имя Фамилия]</strong>
          <span>[Должность, Компания]</span>
        </footer>
      </blockquote>

      <blockquote class="glass-card testimonial-card reveal-up" style="--delay: 0.3s">
        <div class="testimonial-card__avatar">
          <div class="avatar-placeholder">ПС</div>
        </div>
        <p class="testimonial-card__text">
          "[Заглушка] Конкретная цитата с измеримым результатом."
        </p>
        <footer>
          <strong>[Имя Фамилия]</strong>
          <span>[Должность, Компания]</span>
        </footer>
      </blockquote>

    </div>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/cases.css**

```css
/* Вкладки */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.5rem 1.25rem;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: 100px;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 40px;
}

.tab-btn:hover,
.tab-btn.is-active {
  border-color: var(--accent-1);
  color: var(--text-primary);
  background: rgba(124, 58, 237, 0.1);
}

/* Кейсы */
.cases__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.case-card { transition: all var(--transition-base); }

.case-card[data-tab-content]:not(.is-visible) {
  display: none;
}

.case-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.case-card__industry {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.case-card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.case-card p { font-size: 0.9rem; margin-bottom: 1rem; }

.case-card__result {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.case-card__metric {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-2);
}

.case-card__metric-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Отзывы */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.testimonial-card__avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  color: white;
}

.testimonial-card__text {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.6;
  font-style: italic;
  flex: 1;
}

.testimonial-card footer {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.testimonial-card footer strong {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.testimonial-card footer span {
  font-size: 0.8rem;
  color: var(--text-muted);
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до Cases. Ожидаемый результат: вкладки переключаются, кейсы и отзывы отображаются корректно. (Логика вкладок через JS — Task 13.)

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/cases.css
git commit -m "feat: cases section — case studies + testimonials with tab interface"
git push
```

---

### Task 8: About секция — Bento Grid

**Files:**
- Modify: `index.html` (заполнить `<section class="about">`)
- Create: `css/sections/about.css`
- Modify: `index.html` (`<head>`)

**Interfaces:**
- Consumes: `.glass-card`, `.badge-available`, `.tag`, `.label`
- Produces: `#about` секция, `.bento-grid` с 5 карточками

- [ ] **Step 1: Добавить ссылку на about.css**

```html
<link rel="stylesheet" href="css/sections/about.css">
```

- [ ] **Step 2: Заполнить About HTML**

```html
<section class="about" id="about">
  <div class="container">
    <div class="section-header reveal-up">
      <span class="label">Кто за этим стоит</span>
      <h2>Обо мне</h2>
    </div>

    <div class="bento-grid">

      <!-- Большая карточка: фото + нарратив -->
      <article class="glass-card bento-card bento-card--large reveal-up">
        <div class="bento-card__photo">
          <div class="photo-placeholder">ЕБ</div>
        </div>
        <div class="bento-card__bio">
          <h3>Елена Бисерова</h3>
          <p>Я начала строить AI-системы, когда видела, как малый бизнес тонет в рутине. Владельцы делали всё вручную — отвечали на одни и те же вопросы, вбивали данные в таблицы, тратили время на задачи, которые давно должны были работать сами.</p>
          <p>Теперь помогаю бизнесам вернуть это время — и направить его туда, где они действительно нужны.</p>
        </div>
      </article>

      <!-- Инструменты -->
      <article class="glass-card bento-card bento-card--tools reveal-up" style="--delay: 0.1s">
        <span class="label">Инструменты</span>
        <div class="tools-list">
          <span class="tag">Make</span>
          <span class="tag">n8n</span>
          <span class="tag">Claude API</span>
          <span class="tag">Tilda</span>
          <span class="tag">Figma</span>
        </div>
      </article>

      <!-- Доступность -->
      <article class="glass-card bento-card bento-card--availability reveal-up" style="--delay: 0.15s">
        <span class="badge-available">Беру новых клиентов прямо сейчас</span>
        <p>Начнём с бесплатного звонка</p>
      </article>

      <!-- Ниша -->
      <article class="glass-card bento-card bento-card--niche reveal-up" style="--delay: 0.2s">
        <span class="label">Работаю с</span>
        <p class="bento-card__big-text">Малым бизнесом в России</p>
      </article>

      <!-- Цифра -->
      <article class="glass-card bento-card bento-card--stat reveal-up" style="--delay: 0.25s">
        <span class="bento-card__number">10+</span>
        <span class="bento-card__stat-label">проектов</span>
        <p class="bento-card__stat-note">(заменить на реальную цифру)</p>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/about.css**

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

/* Большая карточка — 2 колонки, 2 ряда */
.bento-card--large {
  grid-column: span 2;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .bento-card--large {
    flex-direction: row;
    align-items: flex-start;
  }
}

.bento-card:hover {
  transform: translateY(-4px) rotate(0.3deg);
  box-shadow: 0 20px 60px rgba(124, 58, 237, 0.2);
}

/* Фото */
.bento-card__photo { flex-shrink: 0; }

.photo-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
}

.bento-card__bio h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.bento-card__bio p {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

/* Инструменты */
.bento-card--tools { grid-column: span 1; }

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

/* Доступность */
.bento-card--availability {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
}

.bento-card--availability p {
  font-size: 0.85rem;
  margin: 0;
}

/* Ниша */
.bento-card--niche { grid-column: span 1; }

.bento-card__big-text {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 0.5rem;
}

/* Статистика */
.bento-card--stat {
  grid-column: span 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.bento-card__number {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-1);
  line-height: 1;
}

.bento-card__stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.bento-card__stat-note {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin: 0;
  opacity: 0.6;
}

/* Mobile: одна колонка */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bento-card--large {
    grid-column: span 2;
    grid-row: span 1;
  }

  .bento-card--tools,
  .bento-card--availability,
  .bento-card--niche,
  .bento-card--stat {
    grid-column: span 1;
  }
}

@media (max-width: 480px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-card--large,
  .bento-card--tools,
  .bento-card--availability,
  .bento-card--niche,
  .bento-card--stat {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до About. Ожидаемый результат: Bento-сетка из 5 карточек разных размеров, большая с фото-заглушкой и нарративом.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/about.css
git commit -m "feat: about section — bento grid with bio, tools, availability badge"
git push
```

---

### Task 9: Contact + Footer секции

**Files:**
- Modify: `index.html` (заполнить `<section class="contact">` и `<footer>`)
- Create: `css/sections/contact.css`
- Modify: `index.html` (`<head>`)

**Interfaces:**
- Consumes: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.badge-available`, `.container`
- Produces: `#contact` секция с тремя CTA-кнопками

- [ ] **Step 1: Добавить ссылку на contact.css**

```html
<link rel="stylesheet" href="css/sections/contact.css">
```

- [ ] **Step 2: Заполнить Contact HTML**

```html
<section class="contact" id="contact">
  <div class="container">
    <div class="contact__inner glass-card reveal-up">
      <div class="contact__content">
        <span class="label">Давай поговорим</span>
        <h2>Готова убрать твою рутину?</h2>
        <p>Без долгих контрактов. Начнём с бесплатного 30-минутного разговора — разберём твою задачу и поймём, можем ли мы друг другу помочь.</p>
        <div class="badge-available" style="margin-top: 1rem; display: inline-flex;">
          Сейчас беру новых клиентов
        </div>
      </div>

      <div class="contact__actions">
        <a href="#" class="btn btn-primary magnetic" id="contact-cta">
          ✈️ Написать в Telegram
        </a>
        <a href="#" class="btn btn-secondary">
          💬 Написать в WhatsApp
        </a>
        <a href="mailto:#" class="btn btn-ghost">
          Или напишите на email
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/contact.css**

```css
.contact__inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: flex-start;
  padding: 3rem;
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.08) 0%,
    rgba(6, 182, 212, 0.04) 100%
  );
  border-color: rgba(124, 58, 237, 0.2);
}

@media (min-width: 768px) {
  .contact__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.contact__content { flex: 1; }
.contact__content h2 { margin: 0.5rem 0 0.75rem; }
.contact__content p { max-width: 440px; }

.contact__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
  min-width: 220px;
}

.contact__actions .btn {
  width: 100%;
  justify-content: center;
}

@media (max-width: 767px) {
  .contact__inner { padding: 2rem 1.5rem; }
  .contact__actions { width: 100%; }
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до Contact. Ожидаемый результат: большая стеклянная карточка с заголовком, текстом и тремя кнопками. На мобильном все кнопки на полную ширину.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/contact.css
git commit -m "feat: contact section — 3-channel CTA (Telegram, WhatsApp, email)"
git push
```

---

### Task 10: FAQ секция — аккордион

**Files:**
- Modify: `index.html` (заполнить `<section class="faq">`)
- Create: `css/sections/faq.css`
- Modify: `index.html` (`<head>`)

**Interfaces:**
- Consumes: `.container`, `.section-header`
- Produces: `#faq` секция, `.faq__item` элементы управляемые JS в Task 13

- [ ] **Step 1: Добавить ссылку на faq.css**

```html
<link rel="stylesheet" href="css/sections/faq.css">
```

- [ ] **Step 2: Заполнить FAQ HTML**

```html
<section class="faq" id="faq">
  <div class="container">
    <div class="section-header reveal-up">
      <span class="label">Вопросы и ответы</span>
      <h2>Часто спрашивают</h2>
    </div>

    <div class="faq__list reveal-up">

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Сколько занимает проект?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Зависит от задачи. Простая автоматизация — 3–5 дней. Лендинг — 2–3 недели. Сложная AI-система — 4–8 недель. На первом звонке скажу точнее.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Сколько стоит?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Обсуждаем бюджет на первом звонке. Лучше скажу "это не мой формат", чем возьму проект и не выдам результат. Разброс большой — зависит от сложности и объёма.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Я не знаю точно, что мне нужно. С чего начать?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>С бесплатного звонка. Расскажи, что тебя тормозит в работе — вместе разберёмся, что решит проблему: автоматизация, сайт или AI-агент. Никакого давления.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Работаешь с клиентами из других городов и регионов?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Да, работаю полностью удалённо. Клиенты из разных городов России — всё через звонки, мессенджеры и онлайн-инструменты.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Что происходит после первого звонка?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Я пришлю краткое резюме разговора и предложение: что делаем, сколько стоит, когда начинаем. Никакого давления — ты решаешь в своём темпе.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 3: Создать css/sections/faq.css**

```css
.faq__list {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq__item {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: border-color var(--transition-base);
}

.faq__item.is-open {
  border-color: rgba(124, 58, 237, 0.3);
}

.faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: color var(--transition-fast);
  min-height: 48px;
}

.faq__question:hover { color: var(--accent-2); }

.faq__icon {
  font-size: 1.25rem;
  color: var(--accent-1);
  transition: transform var(--transition-base);
  flex-shrink: 0;
  line-height: 1;
}

.faq__item.is-open .faq__icon {
  transform: rotate(45deg);
}

.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 1.5rem;
}

.faq__item.is-open .faq__answer {
  max-height: 200px;
  padding: 0 1.5rem 1.25rem;
}

.faq__answer p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}
```

- [ ] **Step 4: Проверить в браузере**

Проскроллить до FAQ. Ожидаемый результат: 5 вопросов в аккордионе (открытие/закрытие через JS Task 13). Визуально отображаются корректно.

- [ ] **Step 5: Коммит**

```bash
git add index.html css/sections/faq.css
git commit -m "feat: FAQ section — 5-question accordion"
git push
```

---

### Task 11: Scroll-driven анимации — CSS

**Files:**
- Modify: `css/animations.css`

**Interfaces:**
- Consumes: CSS custom property `--delay` для stagger-эффектов (уже используется в HTML задач 4–10)
- Produces: классы `.reveal-up`, `.reveal-left`, `.reveal-fade` — применяются ко всем секциям

- [ ] **Step 1: Написать animations.css**

```css
/* ─── Scroll-Driven Анимации ─── */

/* Базовые keyframes */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* reveal-up: въезжает снизу при скролле */
.reveal-up {
  animation: fadeUp 0.7s ease both;
  animation-delay: var(--delay, 0s);
  animation-timeline: view();
  animation-range: entry 0% cover 25%;
}

/* reveal-left: въезжает слева */
.reveal-left {
  animation: fadeLeft 0.6s ease both;
  animation-delay: var(--delay, 0s);
  animation-timeline: view();
  animation-range: entry 0% cover 25%;
}

/* reveal-fade: просто появляется */
.reveal-fade {
  animation: fadeIn 0.8s ease both;
  animation-delay: var(--delay, 0s);
  animation-timeline: view();
  animation-range: entry 0% cover 20%;
}

/* ─── Прогресс-бар скролла ─── */
/* Логика ширины проставляется через JS в main.js */

/* ─── Font-weight анимация Hero H1 ─── */
/* Реализована инлайн в hero.css через heroFadeUp keyframes */

/* ─── Fallback для браузеров без scroll-driven ─── */
@supports not (animation-timeline: view()) {
  .reveal-up,
  .reveal-left,
  .reveal-fade {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* ─── prefers-reduced-motion override ─── */
@media (prefers-reduced-motion: reduce) {
  .reveal-up,
  .reveal-left,
  .reveal-fade {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 2: Проверить в браузере**

Перезагрузить страницу. Проскроллить вниз. Ожидаемый результат: каждая секция плавно появляется при скролле — карточки въезжают снизу. В Firefox/Safari (без scroll-driven support) всё отображается статично без анимации — это норма (fallback работает).

- [ ] **Step 3: Коммит**

```bash
git add css/animations.css
git commit -m "feat: scroll-driven CSS animations — reveal-up, reveal-left, reveal-fade"
git push
```

---

### Task 12: JS — кастомный курсор, spotlight, magnetic, прогресс-бар

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: DOM elements `#cursorDot`, `#cursorRing`, `#scrollProgress`, `.hero__spotlight`, `.magnetic`
- Produces: `window.__mouseX`, `window.__mouseY` (CSS переменные `--mouse-x`, `--mouse-y` на `documentElement`)

- [ ] **Step 1: Написать js/main.js**

```javascript
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
  });

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
    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });
}

// ─── Magnetic кнопки ───
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
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
```

- [ ] **Step 2: Проверить в браузере**

Открыть `index.html`. Ожидаемый результат:
- Кастомный курсор (маленькая точка + кольцо) следует за мышью
- Кольцо немного отстаёт — плавный эффект
- При наведении на кнопки кольцо увеличивается
- Прогресс-бар вверху заполняется при скролле
- Nav прячется при скролле вниз, появляется при скролле вверх

- [ ] **Step 3: Коммит**

```bash
git add js/main.js
git commit -m "feat: JS interactions — custom cursor, spotlight, magnetic buttons, scroll progress"
git push
```

---

### Task 13: JS — typed.js, VanillaTilt, FAQ аккордион, Tabs

**Files:**
- Modify: `js/interactions.js`

**Interfaces:**
- Consumes: DOM `#typed-role`, `.tilt-card`, `.faq__item`, `.tab-btn`, `[data-tab-content]`
- Consumes: глобальный `Typed` (typed.js CDN), `VanillaTilt` (CDN), `tsParticles` (CDN)

- [ ] **Step 1: Написать js/interactions.js**

```javascript
// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

  // ─── typed.js — ротация ролей в Hero ───
  if (document.getElementById('typed-role')) {
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
```

- [ ] **Step 2: Проверить в браузере**

Ожидаемый результат:
- В Hero заголовке typed.js печатает и стирает роли
- Частицы tsParticles анимируются на фоне Hero
- Карточки услуг реагируют на наведение 3D-наклоном
- FAQ: клик открывает/закрывает ответ, второй клик закрывает
- Tabs в Cases: клик по вкладке показывает нужные карточки

- [ ] **Step 3: Коммит**

```bash
git add js/interactions.js
git commit -m "feat: JS — typed.js, tsParticles, VanillaTilt, FAQ accordion, tabs"
git push
```

---

### Task 14: Мобильная адаптация и финальная полировка

**Files:**
- Create: `css/responsive.css`
- Modify: `index.html` (`<head>` — добавить ссылку)

**Interfaces:**
- Consumes: все секции из Tasks 4–10
- Produces: корректное отображение на 320px–768px

- [ ] **Step 1: Добавить ссылку на responsive.css**

```html
<link rel="stylesheet" href="css/responsive.css">
```

- [ ] **Step 2: Создать css/responsive.css**

```css
/* ─── Tablet: 768px ─── */
@media (max-width: 768px) {

  /* Nav */
  .nav__links a:not(.nav__cta) { display: none; }

  /* Hero */
  .hero { min-height: 90vh; }

  /* Services */
  .services__grid { grid-template-columns: 1fr; }

  /* Cases */
  .cases__grid { grid-template-columns: 1fr; }
  .testimonials__grid { grid-template-columns: 1fr; }

  /* Contact */
  .contact__inner { flex-direction: column; }

  /* Bento — уже обработан в about.css */
}

/* ─── Mobile: 480px ─── */
@media (max-width: 480px) {

  :root {
    --section-padding: 4rem 1rem;
  }

  /* Nav */
  .nav { padding: 1rem; }
  .nav__logo { font-size: 1rem; }

  /* Hero */
  .hero__title { font-size: 1.9rem; }

  /* Pain */
  .pain__list { grid-template-columns: 1fr; }

  /* FAQ */
  .faq__question { font-size: 0.9rem; }

  /* Contact */
  .contact__inner { padding: 1.5rem 1rem; }
  .contact__content h2 { font-size: 1.6rem; }
}

/* ─── Очень маленький: 320px ─── */
@media (max-width: 360px) {
  h1 { font-size: 1.7rem; }
  .hero__actions { gap: 0.75rem; }
}
```

- [ ] **Step 3: Протестировать на мобильном**

В Chrome DevTools открыть Device Mode. Проверить на:
- iPhone SE (375px) — кнопка CTA на полную ширину, текст не обрезается
- iPad (768px) — bento grid в 2 колонки, nav скрывает ссылки
- Desktop (1280px) — всё как на полном дизайне

- [ ] **Step 4: Проверить lighthouse (опционально)**

Открыть DevTools → Lighthouse → запустить аудит для Desktop. Ожидаемый результат: Performance > 85, Accessibility > 90.

- [ ] **Step 5: Коммит**

```bash
git add css/responsive.css
git commit -m "feat: responsive CSS — mobile/tablet breakpoints"
git push
```

---

### Task 15: Deploy на Vercel

**Files:**
- Уже есть: `vercel.json` (Task 1)

**Interfaces:**
- Consumes: все файлы проекта
- Produces: живой URL на vercel.app

- [ ] **Step 1: Убедиться что репо запушено**

```bash
git status
git log --oneline -5
```

Ожидаемый результат: все коммиты из Tasks 1–14 есть, `working tree clean`.

- [ ] **Step 2: Подключить Vercel**

1. Открыть [vercel.com](https://vercel.com) → Sign In с GitHub аккаунтом `beesajgoo-afk`
2. New Project → выбрать репозиторий `my-landing`
3. Framework Preset: **Other** (не Next.js — это статика)
4. Build Command: оставить пустым
5. Output Directory: оставить `.` (корень)
6. Нажать Deploy

- [ ] **Step 3: Проверить деплой**

Vercel выдаёт URL вида `my-landing-xxx.vercel.app`. Открыть в браузере. Ожидаемый результат: сайт работает идентично локальной версии.

- [ ] **Step 4: Проверить на реальном телефоне**

Открыть URL на смартфоне. Проверить:
- Кастомный курсор НЕ отображается (только на десктопе)
- Кнопки достаточного размера для нажатия пальцем
- Typed.js работает
- FAQ открывается

- [ ] **Step 5: Финальный коммит**

```bash
git add .
git commit -m "feat: complete landing page — all sections, animations, mobile, deploy-ready"
git push
```

---

## Итоговая карта файлов

```
my-landing/
├── index.html                  (HTML-скелет + все 7 секций)
├── vercel.json                 (конфиг деплоя)
├── css/
│   ├── variables.css           (CSS-токены — single source of truth)
│   ├── base.css                (reset, типографика, nav, noise, footer)
│   ├── components.css          (glass-card, buttons, tags, cursor, badge)
│   ├── animations.css          (scroll-driven: reveal-up/left/fade)
│   ├── responsive.css          (breakpoints 768px, 480px, 360px)
│   └── sections/
│       ├── hero.css            (Hero + particles + spotlight)
│       ├── pain.css            (Pain секция)
│       ├── services.css        (3 карточки услуг)
│       ├── cases.css           (Кейсы + отзывы + tabs)
│       ├── about.css           (Bento Grid)
│       ├── contact.css         (Финальный CTA)
│       └── faq.css             (FAQ аккордион)
├── js/
│   ├── main.js                 (курсор, magnetic, spotlight, scroll progress, nav)
│   └── interactions.js         (typed.js, tsParticles, VanillaTilt, FAQ, tabs)
└── assets/
    ├── icons/                  (SVG иконки — добавить по мере надобности)
    └── images/                 (WebP изображения — добавить при появлении контента)
```
