"use client";

import { FormEvent, useEffect, useState } from "react";

const works = [
  { src: "/images/work-floral.webp", title: "Польові квіти", type: "Графіка", size: "tall" },
  { src: "/images/work-fox.webp", title: "Лисиця і місяць", type: "Графіка", size: "wide" },
  { src: "/images/work-koi.webp", title: "Рух води", type: "Колір", size: "tall" },
  { src: "/images/work-landscape.webp", title: "За горизонтом", type: "Реалізм", size: "wide" },
  { src: "/images/work-bluebird.webp", title: "Сині птахи", type: "Колір", size: "tall" },
  { src: "/images/work-back.webp", title: "Вісь світу", type: "Орнамент", size: "tall" },
  { src: "/images/work-lettering.webp", title: "Крила", type: "Графіка", size: "wide" },
  { src: "/images/work-dragon.webp", title: "Малий дракон", type: "Графіка", size: "wide" },
  { src: "/images/work-redflower.webp", title: "Червона лінія", type: "Колір", size: "wide" },
  { src: "/images/work-cranes.webp", title: "Журавлі", type: "Колір", size: "tall" },
];
const filters = ["Усі", "Графіка", "Реалізм", "Орнамент", "Колір"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Усі");
  const [lightbox, setLightbox] = useState<(typeof works)[number] | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, lightbox]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && (setLightbox(null), setMenuOpen(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);
  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      works.forEach((work) => {
        const image = new Image();
        image.src = work.src;
      });
    }, 500);
    return () => window.clearTimeout(preloadTimer);
  }, []);
  function submitForm(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); event.currentTarget.reset(); }
  function closeMenu() { setMenuOpen(false); }
  const structuredData = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "OBSCURA", url: "https://obscura-tattoo.melnichenkomariia.chatgpt.site", description: "Авторські татуювання та розроблення індивідуальних ескізів у Києві.", areaServed: { "@type": "City", name: "Київ" }, serviceType: ["Авторське татуювання", "Індивідуальний ескіз"], priceRange: "€€" };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="cursor-mark" aria-hidden="true" />
      <header className="site-header">
        <a className="logo" href="#top" aria-label="OBSCURA — на головну">OBSCURA<span>●</span></a>
        <nav className="desktop-nav" aria-label="Головна навігація"><a href="#works">Роботи</a><a href="#process">Процес</a><a href="#safety">Безпека</a><a href="#price">Вартість</a></nav>
        <div className="header-actions"><a className="text-link desktop-book" href="#booking">Записатися</a><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Відкрити меню">Меню</button></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">Авторські татуювання · Київ</p><h1>Не вибирай<br />татуювання.<br /><em>Створи своє.</em></h1><p>Авторські ескізи й татуювання у графіці, реалізмі, орнаменті та кольорі. Від першої ідеї до повністю загоєної роботи.</p><div className="hero-buttons"><a className="button primary" href="#booking">Обговорити ідею</a><a className="button ghost" href="#works">Дивитися роботи</a></div></div>
        <div className="hero-media"><img src="/images/hero.webp" alt="Майстер створює графічне татуювання на руці" width="1200" height="2000" fetchPriority="high" /><span>OBSCURA / 01</span></div>
      </section>

      <section className="section works-section" id="works">
        <div className="section-heading"><span>01 / Вибрані роботи</span><h2>Робота говорить<br />за майстра.</h2></div>
        <div className="filters" role="group" aria-label="Фільтр робіт">{filters.map((name) => <button key={name} className={filter === name ? "active" : ""} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div>
        <div className="contact-sheet">{works.map((work, index) => { const isHidden = filter !== "Усі" && work.type !== filter; return <button className={`work-card ${work.size}`} key={work.src} hidden={isHidden} tabIndex={isHidden ? -1 : 0} onClick={() => setLightbox(work)} aria-label={`Відкрити роботу «${work.title}» крупніше`}><span className="work-index">{String(index + 1).padStart(2, "0")}</span><img src={work.src} alt={`${work.title} — авторське татуювання у стилі ${work.type.toLowerCase()}`} width="900" height="1200" loading="lazy" /><span className="work-caption"><b>{work.title}</b><small>{work.type}</small></span></button>; })}</div>
      </section>

      <section className="statement"><p>Твоя ідея може бути нечіткою.</p><h2>Вона не має бути<br />готовим ескізом.</h2></section>

      <section className="section sketch" id="process">
        <div className="sketch-image"><img src="/images/sketch-process.webp" alt="Тату-майстер розробляє індивідуальний ескіз від руки" width="1200" height="1800" loading="lazy" /></div>
        <div className="sketch-copy"><span className="section-label">02 / Індивідуальний ескіз</span><h2>Створений для<br />однієї людини.</h2><p>Достатньо образу, думки або кількох референсів. Я розроблю композицію під твою ідею, анатомію та обрану ділянку тіла.</p><ol><li><b>01</b> Обговорюємо ідею та референси</li><li><b>02</b> Визначаємо стиль, розмір і місце</li><li><b>03</b> Створюю та адаптую композицію</li><li><b>04</b> Переносимо ескіз на шкіру</li></ol><p className="unique-note">Ескіз не повторюється для інших клієнтів.</p><a className="button primary" href="#booking">Замовити свій ескіз</a></div>
      </section>

      <section className="trust">
        <img className="trust-photo" src="/images/studio.webp" alt="Робочий простір тату-майстра з авторськими ескізами" width="900" height="1600" loading="lazy" />
        <div className="trust-content">
          <div className="section-heading"><span>03 / Підхід</span><h2>Ти можеш не знати<br />обличчя майстра.</h2><p>Але впізнаєш його роботу.</p></div>
          <div className="stats"><div><strong>7</strong><span>років практики</span></div><div><strong>850+</strong><span>створених робіт</span></div><div><strong>12</strong><span>професійних навчань</span></div></div>
          <p className="demo-note">Дані наведено для демонстрації концепції портфоліо.</p>
        </div>
      </section>

      <section className="safety" id="safety"><div className="safety-visual"><img src="/images/needles.webp" alt="Запаковані одноразові голки для татуювання" width="1200" height="1600" loading="lazy" /></div><div className="safety-copy"><span className="section-label">04 / Безпека</span><h2>Чисто. Стерильно.<br />Без компромісів.</h2><ul><li>Одноразові голки та витратні матеріали</li><li>Розпакування у присутності клієнта</li><li>Бар’єрний захист обладнання</li><li>Дезінфекція поверхонь перед сеансом</li><li>Сертифіковані пігменти</li><li>Правильна утилізація матеріалів</li></ul></div></section>

      <section className="section price" id="price"><div className="section-heading"><span>05 / Вартість</span><h2>Кожна робота<br />має свою ціну.</h2><p>Фінальна вартість залежить від розміру, деталізації, розташування та кількості сеансів.</p></div><div className="price-list"><div><span>Мінімальна робота</span><strong>від 80 €</strong></div><div><span>Середній сеанс</span><strong>150–300 €</strong></div><div><span>Велика робота</span><strong>від 350 €</strong></div><div><span>Ескіз із татуюванням</span><strong>входить у вартість</strong></div></div><p className="demo-note">Ціни демонстраційні та будуть замінені даними майстра.</p></section>

      <section className="section prep">
        <img className="prep-photo" src="/images/ink.webp" alt="Підготовка чорного пігменту до тату-сеансу" width="1199" height="1500" loading="lazy" />
        <div className="prep-content"><span className="section-label">06 / Перед сеансом</span><h2>Підготуй тіло.<br />Про решту подбаємо ми.</h2><div className="prep-grid"><p><b>01</b>Добре виспися та поїж за 2–3 години до сеансу.</p><p><b>02</b>Не вживай алкоголь щонайменше 24 години.</p><p><b>03</b>Не засмагай і не травмуй ділянку шкіри.</p><p><b>04</b>Повідом про алергії, захворювання та ліки.</p></div></div>
      </section>

      <section className="section faq"><span className="section-label">07 / Відповіді</span><h2>Що ти хочеш<br />знати до сеансу.</h2><div className="faq-list">{[["Наскільки це боляче?","Відчуття залежать від місця, тривалості сеансу й індивідуальної чутливості. До кожної роботи ми підходимо без поспіху."],["Як розраховується вартість?","Після обговорення розміру, стилю, деталізації та місця нанесення ти отримаєш точний розрахунок до бронювання."],["Чи можна змінити готовий ескіз?","Так. Деталі узгоджуються до сеансу, а фінальна посадка коригується безпосередньо під анатомію."],["Як доглядати за татуюванням?","Після сеансу ти отримаєш персональну інструкцію відповідно до типу захисної плівки та особливостей роботи."]].map(([q,a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>

      <section className="booking" id="booking"><div className="booking-intro"><span>08 / Запис</span><h2>Розкажи<br />про свою ідею.</h2><p>Не потрібно готувати технічне завдання. Опиши образ, настрій або покажи референс.</p><a className="telegram" href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Написати майстру в Telegram">Написати в Telegram</a></div><form onSubmit={submitForm}><label>Ім’я<input name="name" required autoComplete="name" placeholder="Як до тебе звертатися" /></label><label>Телефон або Telegram<input name="contact" required autoComplete="tel" placeholder="+380 або @username" /></label><label>Місце та розмір<input name="placement" placeholder="Наприклад: передпліччя, 10–12 см" /></label><label>Коротко про ідею<textarea name="idea" required rows={4} placeholder="Образ, стиль, настрій або посилання на референс" /></label><label className="check"><input type="checkbox" required /><span>Погоджуюся на обробку даних для зв’язку щодо запису</span></label><button className="button light" type="submit">Надіслати ідею</button>{sent && <p className="success" role="status">Ідею отримано. Майстер зв’яжеться з тобою після уточнення деталей.</p>}</form></section>

      <footer><a className="logo" href="#top">OBSCURA<span>●</span></a><p>Авторські татуювання та індивідуальні ескізи.</p><div><a href="#works">Роботи</a><a href="#safety">Безпека</a><a href="#booking">Запис</a><a href="mailto:studio@obscura.demo">studio@obscura.demo</a></div><small>Концептуальний проєкт для портфоліо · 2026</small></footer>
      {menuOpen && <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Меню"><button onClick={closeMenu} aria-label="Закрити меню">Закрити</button><nav><a href="#works" onClick={closeMenu}>Роботи</a><a href="#process" onClick={closeMenu}>Процес</a><a href="#safety" onClick={closeMenu}>Безпека</a><a href="#price" onClick={closeMenu}>Вартість</a><a href="#booking" onClick={closeMenu}>Записатися</a></nav></div>}
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Робота «${lightbox.title}»`} onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Закрити фото">Закрити</button><img src={lightbox.src} alt={`${lightbox.title} — збільшене фото татуювання`} onClick={(e) => e.stopPropagation()} /><p>{lightbox.title} / {lightbox.type}</p></div>}
    </main>
  );
}
