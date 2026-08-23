const body = document.body;
const menuButton = document.querySelector('.menu-button');
const filterButtons = [...document.querySelectorAll('.filters button')];
const workCards = [...document.querySelectorAll('.work-card')];
const bookingForm = document.querySelector('.booking form');

document.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
});

function closeMenu() {
  document.querySelector('.menu-overlay')?.remove();
  menuButton?.setAttribute('aria-expanded', 'false');
  body.style.overflow = '';
}

menuButton?.setAttribute('aria-expanded', 'false');
menuButton?.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.innerHTML = `
    <button type="button" aria-label="Закрити меню">Закрити</button>
    <nav aria-label="Мобільна навігація">
      <a href="#works">Роботи</a>
      <a href="#process">Процес</a>
      <a href="#safety">Безпека</a>
      <a href="#price">Прайс</a>
      <a href="#booking">Запис</a>
    </nav>`;
  body.append(overlay);
  menuButton.setAttribute('aria-expanded', 'true');
  body.style.overflow = 'hidden';
  overlay.querySelector('button').focus();
  overlay.querySelector('button').addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.textContent.trim();
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    workCards.forEach((card) => {
      const category = card.querySelector('.work-caption small')?.textContent.trim();
      card.hidden = selected !== 'Усі' && category !== selected;
    });
  });
});

function closeLightbox() {
  document.querySelector('.lightbox')?.remove();
  body.style.overflow = '';
}

workCards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    const title = card.querySelector('.work-caption b')?.textContent.trim() || 'Робота';
    const category = card.querySelector('.work-caption small')?.textContent.trim() || '';
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', `Робота «${title}»`);
    lightbox.innerHTML = `<button type="button" aria-label="Закрити фото">Закрити</button><img src="${image.src}" alt="${image.alt}"><p>${title} / ${category}</p>`;
    body.append(lightbox);
    body.style.overflow = 'hidden';
    lightbox.querySelector('button').focus();
    lightbox.addEventListener('click', closeLightbox);
    lightbox.querySelector('img').addEventListener('click', (event) => event.stopPropagation());
  });
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = bookingForm.querySelector('button[type="submit"]');
  button.textContent = 'Заявку збережено';
  button.disabled = true;
  bookingForm.reset();
  setTimeout(() => {
    button.textContent = 'Надіслати заявку';
    button.disabled = false;
  }, 4000);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    closeLightbox();
  }
});
