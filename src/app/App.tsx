import { useState, useEffect } from "react";
import { Bot, Layers, Server, Monitor, Globe, AppWindow, ArrowRight, Menu, X, ChevronRight, ChevronLeft, ExternalLink, Clock, Users, CheckCircle2, Loader2 } from "lucide-react";
import { Seo } from "./Seo";
import { submitContactForm } from "../lib/submitContact";
import * as Dialog from "@radix-ui/react-dialog";
import anonVoteImg from "../assets/anon-vote.png";
import anonVotePoll from "../assets/anon-vote-poll.png";
import anonVoteCreate from "../assets/anon-vote-create.png";
import anonVoteCategories from "../assets/anon-vote-categories.png";
import parser01 from "../assets/parser-01-settings.png";
import parser02 from "../assets/parser-02-parsing.png";
import parser03 from "../assets/parser-03-monitoring.png";
import parser04 from "../assets/parser-04-filter.png";
import parser05 from "../assets/parser-05-formatting.png";
import parser06 from "../assets/parser-06-sites.png";
import parser07 from "../assets/parser-07-telegram.png";
import litteria01 from "../assets/litteria-01-home.jpeg";
import litteria02 from "../assets/litteria-02-book.png";
import litteria03 from "../assets/litteria-03-auth-modal.jpeg";
import litteria04 from "../assets/litteria-04-login.png";
import litteria05 from "../assets/litteria-05-register.png";
import litteria06 from "../assets/litteria-06-reader.png";
import litteria07 from "../assets/litteria-07-filters.png";
import litteria08 from "../assets/litteria-08-search.png";
import litteria09 from "../assets/litteria-09-my-books.png";
import litteria10 from "../assets/litteria-10-edit.png";
import litteria11 from "../assets/litteria-11-book-info.png";
import litteria12 from "../assets/litteria-12-editor.jpeg";

type Lang = "ru" | "en";

const litteriaGallery: Record<Lang, { src: string; label: string }[]> = {
  ru: [
    { src: litteria01, label: "Главная" },
    { src: litteria02, label: "Страница книги" },
    { src: litteria03, label: "Авторизация" },
    { src: litteria04, label: "Вход" },
    { src: litteria05, label: "Регистрация" },
    { src: litteria06, label: "Читалка" },
    { src: litteria07, label: "Фильтры" },
    { src: litteria08, label: "Результаты поиска" },
    { src: litteria09, label: "Книги автора" },
    { src: litteria10, label: "Редактирование" },
    { src: litteria11, label: "Информация о книге" },
    { src: litteria12, label: "Редактор текста" },
  ],
  en: [
    { src: litteria01, label: "Home" },
    { src: litteria02, label: "Book page" },
    { src: litteria03, label: "Sign in" },
    { src: litteria04, label: "Login" },
    { src: litteria05, label: "Registration" },
    { src: litteria06, label: "Reader" },
    { src: litteria07, label: "Filters" },
    { src: litteria08, label: "Search results" },
    { src: litteria09, label: "Author's books" },
    { src: litteria10, label: "Editing" },
    { src: litteria11, label: "Book info" },
    { src: litteria12, label: "Text editor" },
  ],
};

const newsParserGallery: Record<Lang, { src: string; label: string }[]> = {
  ru: [
    { src: parser01, label: "Настройки сайта" },
    { src: parser02, label: "Конфигурация парсинга" },
    { src: parser03, label: "Мониторинг" },
    { src: parser04, label: "Фильтры" },
    { src: parser05, label: "Форматирование" },
    { src: parser06, label: "Подключённые сайты" },
    { src: parser07, label: "Telegram-уведомления" },
  ],
  en: [
    { src: parser01, label: "Site settings" },
    { src: parser02, label: "Parsing config" },
    { src: parser03, label: "Monitoring" },
    { src: parser04, label: "Filters" },
    { src: parser05, label: "Formatting" },
    { src: parser06, label: "Connected sites" },
    { src: parser07, label: "Telegram notifications" },
  ],
};

const anonVoteGallery: Record<Lang, { src: string; label: string }[]> = {
  ru: [
    { src: anonVoteImg, label: "Главная" },
    { src: anonVotePoll, label: "Прохождение опроса" },
    { src: anonVoteCreate, label: "Создание опроса" },
    { src: anonVoteCategories, label: "Категории" },
  ],
  en: [
    { src: anonVoteImg, label: "Home" },
    { src: anonVotePoll, label: "Taking a poll" },
    { src: anonVoteCreate, label: "Create poll" },
    { src: anonVoteCategories, label: "Categories" },
  ],
};

const t = {
  ru: {
    nav: ["Услуги", "Работы", "Подход", "Стек", "Контакт"],
    navAnchors: ["услуги", "работы", "подход", "стек", "контакт"],
    badge: "ДОСТУПНЫ ДЛЯ НОВЫХ ПРОЕКТОВ",
    heroLine1: "Разрабатываем",
    heroLine2: "цифровые продукты",
    heroLine3: "под ваши задачи",
    heroSub: "Небольшая команда разработчиков. Делаем боты, fullstack-приложения, бэкенд на Java и фронтенд на React.",
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Наши услуги",
    ctaAnchor: "контакт",
    servicesLabel: "УСЛУГИ",
    servicesTitle: "Что мы делаем",
    worksLabel: "ПРИМЕРЫ РАБОТ",
    worksTitle: "Что мы уже сделали",
    filterAll: "все",
    processLabel: "ПОДХОД",
    processTitle: "Как мы работаем",
    stackLabel: "ТЕХНОЛОГИИ",
    stackTitle: "Наш стек",
    whyLabel: "ПОЧЕМУ МЫ",
    whyTitle: "Небольшая команда — больше внимания",
    whyBody: "Не конвейер аутсорса. Проект ведёт одна команда — отвечаем за результат сами. Пишете напрямую разработчикам, сроки обговариваем заранее.",
    whyPoints: [
      ["Фиксированная цена", "Смету согласуем до старта — без доплат в конце."],
      ["Возможность поддержки", "Можем остаться после запуска, если понадобится."],
      ["Честная оценка", "Если задача не наша — скажем сразу."],
    ],
    viewProjectDetails: "Подробнее о проекте",
    modalChallenge: "ЗАДАЧА",
    modalSolution: "РЕШЕНИЕ",
    modalResults: "РЕЗУЛЬТАТЫ",
    closeAriaLabel: "Закрыть",
    ariaPrevScreenshot: "Предыдущий скриншот",
    ariaNextScreenshot: "Следующий скриншот",
    ariaScreenshot: "Скриншот",
    workTypes: {
      fullstack: "fullstack",
      bot: "боты",
      frontend: "фронтенд",
      backend: "бэкенд",
      web: "сайты",
    },
    serviceTags: {
      automation: "автоматизация",
      fullstack: "fullstack",
      backend: "бэкенд",
      frontend: "фронтенд",
      web: "веб",
      app: "приложение",
    },
    contactLabel: "КОНТАКТ",
    contactTitle: "Расскажите о проекте",
    contactSub: "Опишите задачу — ответим в течение рабочего дня.",
    fieldName: "Имя",
    fieldEmail: "Email",
    fieldMsg: "О проекте",
    placeholderName: "Иван Иванов",
    placeholderEmail: "ivan@company.ru",
    placeholderMsg: "Расскажите что нужно сделать, сроки и бюджет...",
    submit: "Отправить заявку",
    submitting: "Отправка…",
    sentLabel: "ОТПРАВЛЕНО",
    sentMsg: "Спасибо, напишем вам скоро.",
    formError: "Не удалось отправить. Напишите на p@x128.ru или в Telegram @devs_for_hire.",
    formNotConfigured: "Форма ещё не настроена. Напишите на p@x128.ru или в Telegram @devs_for_hire.",
  },
  en: {
    nav: ["Services", "Work", "Approach", "Stack", "Contact"],
    navAnchors: ["services", "work", "process", "stack", "contact"],
    badge: "AVAILABLE FOR NEW PROJECTS",
    heroLine1: "We build",
    heroLine2: "digital products",
    heroLine3: "for your needs",
    heroSub: "A small team of developers. We build bots, fullstack apps, Java backends, and React frontends.",
    ctaPrimary: "Discuss a project",
    ctaSecondary: "Our services",
    ctaAnchor: "contact",
    servicesLabel: "SERVICES",
    servicesTitle: "What we do",
    worksLabel: "WORK EXAMPLES",
    worksTitle: "What we've already built",
    filterAll: "all",
    processLabel: "APPROACH",
    processTitle: "How we work",
    stackLabel: "TECHNOLOGIES",
    stackTitle: "Our stack",
    whyLabel: "WHY US",
    whyTitle: "Small team — more attention",
    whyBody: "Not a conveyor-belt agency. One team owns the project end to end. You talk directly to the developers; timelines are agreed upfront.",
    whyPoints: [
      ["Fixed pricing", "Scope and cost agreed before we start."],
      ["Support available", "We can stay on after launch if you need us."],
      ["Honest assessment", "If it's not our fit — we'll say so upfront."],
    ],
    viewProjectDetails: "View project details",
    modalChallenge: "CHALLENGE",
    modalSolution: "SOLUTION",
    modalResults: "RESULTS",
    closeAriaLabel: "Close",
    ariaPrevScreenshot: "Previous screenshot",
    ariaNextScreenshot: "Next screenshot",
    ariaScreenshot: "Screenshot",
    workTypes: {
      fullstack: "fullstack",
      bot: "bots",
      frontend: "frontend",
      backend: "backend",
      web: "websites",
    },
    serviceTags: {
      automation: "automation",
      fullstack: "fullstack",
      backend: "backend",
      frontend: "frontend",
      web: "web",
      app: "app",
    },
    contactLabel: "CONTACT",
    contactTitle: "Tell us about your project",
    contactSub: "Describe the task — we'll reply within one business day.",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldMsg: "About the project",
    placeholderName: "John Smith",
    placeholderEmail: "john@company.com",
    placeholderMsg: "Tell us what needs to be done, timeline and budget...",
    submit: "Send request",
    submitting: "Sending…",
    sentLabel: "SENT",
    sentMsg: "Thanks — we'll get back to you soon.",
    formError: "Could not send. Email p@x128.ru or Telegram @devs_for_hire.",
    formNotConfigured: "Form is not configured yet. Email p@x128.ru or Telegram @devs_for_hire.",
  },
};

const servicesData = {
  ru: [
    { icon: Bot,       title: "Боты",                  desc: "Telegram, Discord, VK, MAX — автоматизация, поддержка, парсинг и всё что угодно.", tag: "automation" },
    { icon: Layers,    title: "Fullstack приложения",   desc: "От идеи до деплоя: REST API, база данных, авторизация, личные кабинеты.", tag: "fullstack"  },
    { icon: Server,    title: "Бэкенд",                 desc: "Java, Spring Boot, Node.js, микросервисы, интеграции. Надёжный и масштабируемый бэкенд.", tag: "backend"    },
    { icon: Monitor,   title: "Frontend на React",      desc: "Быстрые, адаптивные интерфейсы. TypeScript, Next.js.",      tag: "frontend"   },
    { icon: Globe,     title: "Сайты",                  desc: "Лендинги, корпоративные сайты, портфолио — с фокусом на скорость и SEO.",    tag: "web"        },
    { icon: AppWindow, title: "Веб-приложения",         desc: "SPA, SSG, SSR, ISR с нетривиальной логикой: дашборды, маркетплейсы, b2b-инструменты.", tag: "app"        },
  ],
  en: [
    { icon: Bot,       title: "Bots",                   desc: "Telegram, Discord, VK, MAX — automation, support, parsing, and more.", tag: "automation" },
    { icon: Layers,    title: "Fullstack apps",          desc: "From idea to deploy: REST API, database, auth, user dashboards.",             tag: "fullstack"  },
    { icon: Server,    title: "Backend",                 desc: "Java, Spring Boot, Node.js, microservices, integrations. Reliable and scalable.", tag: "backend"    },
    { icon: Monitor,   title: "React frontend",          desc: "Fast, responsive interfaces. TypeScript, Next.js.",                               tag: "frontend"   },
    { icon: Globe,     title: "Websites",                desc: "Landing pages, corporate sites, portfolios — focused on speed and SEO.",         tag: "web"        },
    { icon: AppWindow, title: "Web applications",        desc: "SPA, SSG, SSR, ISR with non-trivial logic: dashboards, marketplaces, B2B tools.", tag: "app"        },
  ],
};

const stepsData = {
  ru: [
    { num: "01", title: "Бриф",       desc: "Разбираемся в задаче, фиксируем требования и ограничения." },
    { num: "02", title: "Оценка",     desc: "Прозрачная смета по времени и стоимости, без сюрпризов." },
    { num: "03", title: "Разработка", desc: "Итеративная разработка с регулярной демонстрацией." },
    { num: "04", title: "Деплой",     desc: "Запуск, мониторинг, возможность поддержки после сдачи." },
  ],
  en: [
    { num: "01", title: "Brief",       desc: "We understand the task, lock in requirements and constraints." },
    { num: "02", title: "Estimate",    desc: "Transparent quote on time and cost — no surprises." },
    { num: "03", title: "Development", desc: "Iterative development with regular demos." },
    { num: "04", title: "Deploy",      desc: "Launch, monitoring, support after handover." },
  ],
};

interface WorkItem {
  title: string;
  desc: string;
  tags: string[];
  type: string;
  img: string;
  client?: string;
  duration?: string;
  team?: string;
  challenge: string;
  solution: string;
  results: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
  previewUrl?: string;
  badge?: string;
  gallery?: { src: string; label: string }[];
}

function BrowserPreview({
  src,
  url,
  alt,
  children,
}: {
  src?: string;
  url?: string;
  alt: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border overflow-hidden shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
        </div>
        <div className="flex-1 h-7 rounded-md bg-muted/50 flex items-center justify-center px-3 min-w-0">
          <span
            className="text-muted-foreground truncate"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem" }}
          >
            {url ?? "app.example.com"}
          </span>
        </div>
      </div>
      <div className="bg-[#f4f4f5] relative w-full" style={{ aspectRatio: "16 / 10" }}>
        {children ?? (
          <img src={src!} alt={alt} className="absolute inset-0 w-full h-full object-cover object-top" />
        )}
      </div>
    </div>
  );
}

function ScreenshotCarousel({
  slides,
  url,
  alt,
  onClickStop,
  ariaPrev,
  ariaNext,
  ariaScreenshot,
}: {
  slides: { src: string; label: string }[];
  url?: string;
  alt: string;
  onClickStop?: (e: React.MouseEvent) => void;
  ariaPrev: string;
  ariaNext: string;
  ariaScreenshot: string;
}) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const hasMultiple = slides.length > 1;

  useEffect(() => {
    slides.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, [slides]);

  function goPrev(e: React.MouseEvent) {
    e.stopPropagation();
    onClickStop?.(e);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function goNext(e: React.MouseEvent) {
    e.stopPropagation();
    onClickStop?.(e);
    setIndex((i) => (i + 1) % slides.length);
  }

  function goTo(i: number, e: React.MouseEvent) {
    e.stopPropagation();
    onClickStop?.(e);
    setIndex(i);
  }

  return (
    <div>
      <BrowserPreview url={url} alt={alt}>
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={i === index ? `${alt}: ${s.label}` : ""}
            aria-hidden={i !== index}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200 ${i === index ? "opacity-100" : "opacity-0"}`}
            loading="eager"
            decoding="async"
          />
        ))}
      </BrowserPreview>
      {hasMultiple && (
        <div className="mt-3 flex flex-col gap-2" onClick={onClickStop}>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors shrink-0"
              aria-label={ariaPrev}
            >
              <ChevronLeft size={16} />
            </button>
            <span
              className="text-muted-foreground text-center truncate"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}
            >
              {slide.label} · {index + 1}/{slides.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors shrink-0"
              aria-label={ariaNext}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => goTo(i, e)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"}`}
                aria-label={`${ariaScreenshot} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkCard({ work, typeLabel, onClick }: { work: WorkItem; typeLabel: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-background group overflow-hidden flex flex-col text-left cursor-pointer border border-border hover:border-muted-foreground/40 transition-colors"
    >
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "16/10" }}>
        <img
          src={work.img}
          alt={work.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <span
          className="absolute top-3 left-3 border border-border bg-background/80 px-2 py-0.5 text-muted-foreground"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em" }}
        >
          {typeLabel}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2.5 flex-1 group-hover:bg-card transition-colors">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-foreground" style={{ fontSize: "0.95rem", fontWeight: 500 }}>{work.title}</h3>
          <ExternalLink size={14} className="text-border group-hover:text-primary transition-colors shrink-0 mt-0.5" />
        </div>
        <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{work.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {work.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-border px-2 py-0.5 text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function FeaturedWorkCard({
  work,
  badge,
  viewProjectDetails,
  carouselAria,
  reversed,
  onClick,
}: {
  work: WorkItem;
  badge?: string;
  viewProjectDetails: string;
  carouselAria: { prev: string; next: string; screenshot: string };
  reversed?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      className="group text-left border border-border hover:border-primary/40 transition-colors w-full cursor-pointer"
    >
      <div className="bg-background p-6 md:p-10 group-hover:bg-card transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`flex flex-col gap-5 order-2 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
            {badge && (
              <span
                className="self-start text-primary border border-primary px-2.5 py-1"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em" }}
              >
                {badge}
              </span>
            )}
            <div>
              <h3 className="text-foreground mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                {work.title}
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.95rem", lineHeight: 1.75 }}>
                {work.desc}
              </p>
            </div>
            {work.links && work.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {work.links.map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {label} <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            )}
            <span className="inline-flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors" style={{ fontSize: "0.85rem" }}>
              {viewProjectDetails} <ArrowRight size={14} />
            </span>
          </div>
          <div
            className={`order-1 group-hover:scale-[1.01] transition-transform duration-500 ${reversed ? "lg:order-1" : "lg:order-2"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ScreenshotCarousel
              slides={work.gallery ?? [{ src: work.img, label: work.title }]}
              url={work.previewUrl}
              alt={work.title}
              ariaPrev={carouselAria.prev}
              ariaNext={carouselAria.next}
              ariaScreenshot={carouselAria.screenshot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const worksData: Record<Lang, WorkItem[]> = {
  ru: [
    {
      title: "Anon-vote",
      desc: "Сервис анонимных опросов для социологии и маркетинга. Web-приложение и Telegram-бот.",
      tags: ["Next.js", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
      type: "fullstack",
      img: anonVoteImg,
      challenge: "Нужен инструмент для анонимных опросов с гарантией уникальности ответов — без привязки ответов к личности респондента.",
      solution: "Модульный монолит: Spring Boot 3.5 + Next.js 15. Email подтверждает уникальность, но не раскрывает личность. Аналитика, экспорт статистики в CSV, категории, поиск, Telegram-бот. Деплой через Docker Compose.",
      results: [
        "Ответы анонимны и агрегируются без привязки к личности",
        "Web с расширенной статистикой + опросы в Telegram-боте",
        "Динамика ответов по времени, экспорт в CSV",
        "Категории, теги, upvote/downvote опросов",
      ],
      links: [
        { label: "Приложение", url: "http://anon-vote.ru" },
        { label: "Swagger API", url: "http://anon-vote.ru:8081/swagger-ui/index.html" },
      ],
      featured: true,
      badge: "Избранный проект",
      previewUrl: "anon-vote.ru",
      gallery: anonVoteGallery.ru,
    },
    {
      title: "Литтерия",
      desc: "ИС онлайн-книжного магазина: каталог, чтение, личная библиотека и редактор для авторов.",
      tags: ["React", "TypeScript", "NestJS", "PostgreSQL"],
      type: "fullstack",
      img: litteria01,
      challenge: "Офлайн-магазин не масштабируется: читатели долго ищут книги, авторы не получают обратную связь, владелец несёт расходы на аренду и персонал.",
      solution: "Спроектировали и реализовали веб-ИС с ролями читатель, автор и администратор. React + NestJS + PostgreSQL, 20+ таблиц БД. Каталог с фильтрами, читалка, редактор глав и страниц, личная библиотека и статистика.",
      results: [
        "3 роли с разграничением доступа: читатель, автор, администратор",
        "Каталог с фильтрами по жанру, статусу и цене",
        "Встроенный редактор: главы, страницы, метаданные книги",
        "Читалка с навигацией по главам и отслеживанием прогресса",
      ],
      featured: true,
      previewUrl: "litteria.app",
      gallery: litteriaGallery.ru,
    },
    {
      title: "Парсер новостей",
      desc: "Система автоматизированного парсинга новостных сайтов: настройка, мониторинг, фильтрация и доставка в Telegram.",
      tags: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
      type: "fullstack",
      img: parser01,
      challenge: "Ручной мониторинг новостей из разных источников отнимает время: нет единого канала, сложно настроить фильтрацию и автоматическую доставку только нужных материалов.",
      solution: "React + NestJS + Prisma + PostgreSQL. Планировщик задач, визуальная настройка CSS-парсинга через браузерное расширение, regex-фильтры, шаблоны сообщений, ротация прокси. Уведомления в Telegram, деплой на VPS через Docker Compose.",
      results: [
        "Автоматический мониторинг новостных сайтов по расписанию",
        "Конфигурация парсинга, фильтров и формата вывода в пару кликов",
        "Агрегация новостей из разных источников в Telegram",
        "Поддержка разных кодировок и ротация прокси-серверов",
      ],
      featured: true,
      previewUrl: "news-parser.app",
      gallery: newsParserGallery.ru,
    },
  ],
  en: [
    {
      title: "Anon-vote",
      desc: "Anonymous polling service for sociology and marketing research. Web app and Telegram bot.",
      tags: ["Next.js", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
      type: "fullstack",
      img: anonVoteImg,
      challenge: "A tool for anonymous surveys with guaranteed response uniqueness — without tying answers to respondent identity.",
      solution: "Modular monolith: Spring Boot 3.5 + Next.js 15. Email verifies uniqueness without exposing identity. Analytics, CSV export, categories, search, Telegram bot. Deployed via Docker Compose.",
      results: [
        "Responses are anonymous and aggregated without personal linkage",
        "Web with extended stats + on-the-go polls in Telegram bot",
        "Response dynamics over time, CSV export",
        "Categories, tags, poll upvote/downvote",
      ],
      links: [
        { label: "Application", url: "http://anon-vote.ru" },
        { label: "Swagger API", url: "http://anon-vote.ru:8081/swagger-ui/index.html" },
      ],
      featured: true,
      badge: "Featured project",
      previewUrl: "anon-vote.ru",
      gallery: anonVoteGallery.en,
    },
    {
      title: "Litteria",
      desc: "Online bookstore information system: catalog, reading, personal library, and author editor.",
      tags: ["React", "TypeScript", "NestJS", "PostgreSQL"],
      type: "fullstack",
      img: litteria01,
      challenge: "An offline bookstore doesn't scale: readers spend time searching shelves, authors get no feedback, and the owner bears rent and staffing costs.",
      solution: "Designed and built a web IS with reader, author, and admin roles. React + NestJS + PostgreSQL, 20+ DB tables. Catalog with filters, reader, chapter/page editor, personal library, and statistics.",
      results: [
        "3 roles with access control: reader, author, admin",
        "Catalog with filters by genre, status, and price",
        "Built-in editor: chapters, pages, book metadata",
        "Reader with chapter navigation and progress tracking",
      ],
      featured: true,
      previewUrl: "litteria.app",
      gallery: litteriaGallery.en,
    },
    {
      title: "News Parser",
      desc: "Automated news site parsing system: setup, monitoring, filtering, and Telegram delivery.",
      tags: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
      type: "fullstack",
      img: parser01,
      challenge: "Manual news monitoring across sources is time-consuming: no single channel, hard to filter and automatically deliver only relevant items.",
      solution: "React + NestJS + Prisma + PostgreSQL. Task scheduler, visual CSS parsing setup via browser extension, regex filters, message templates, proxy rotation. Telegram notifications, deployed on VPS via Docker Compose.",
      results: [
        "Scheduled automatic monitoring of news sites",
        "Parsing, filter, and output format config in a few clicks",
        "News aggregation from multiple sources into Telegram",
        "Multi-encoding support and proxy server rotation",
      ],
      featured: true,
      previewUrl: "news-parser.app",
      gallery: newsParserGallery.en,
    },
  ],
};

const stack = ["Java", "Spring Boot", "Node.js", "NestJS", "React", "TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker"];

const workFilterTypes = ["fullstack", "bot", "frontend", "backend", "web"] as const;
type WorkFilter = "all" | typeof workFilterTypes[number];

function workTypeLabel(lang: Lang, type: string): string {
  const labels = t[lang].workTypes as Record<string, string>;
  return labels[type] ?? type;
}

export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("all");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const T = t[lang];
  const services = servicesData[lang];
  const steps = stepsData[lang];
  const works = worksData[lang];
  const carouselAria = {
    prev: T.ariaPrevScreenshot,
    next: T.ariaNextScreenshot,
    screenshot: T.ariaScreenshot,
  };
  const availableWorkTypes = workFilterTypes.filter((type) => works.some((w) => w.type === type));
  const workFilters: { key: WorkFilter; label: string }[] = [
    { key: "all", label: T.filterAll },
    ...availableWorkTypes.map((type) => ({ key: type, label: workTypeLabel(lang, type) })),
  ];
  const showWorkFilters = availableWorkTypes.length > 1;
  const filteredWorks = activeFilter === "all" ? works : works.filter((w) => w.type === activeFilter);
  const featuredWorks = filteredWorks.filter((w) => w.featured);
  const restWorks = filteredWorks.filter((w) => !w.featured);

  useEffect(() => {
    setSelectedWork((current) => {
      if (!current) return null;
      return works.find((w) => w.img === current.img) ?? null;
    });
  }, [lang, works]);

  useEffect(() => {
    works.forEach((work) => {
      const sources = work.gallery?.map((g) => g.src) ?? [work.img];
      sources.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [works]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    const result = await submitContactForm(e.currentTarget);
    setSubmitting(false);
    if (result.ok) {
      setSent(true);
      e.currentTarget.reset();
      return;
    }
    setFormError(result.error === "not_configured" ? T.formNotConfigured : T.formError);
  }

  function switchLang(l: Lang) {
    setLang(l);
    setActiveFilter("all");
  }

  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Seo lang={lang} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-primary" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
            devs-for-hire/
          </span>

          <div className="hidden md:flex items-center gap-8">
            {T.nav.map((item, i) => (
              <a
                key={item}
                href={`#${T.navAnchors[i]}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: "0.85rem" }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="flex items-center border border-border overflow-hidden" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}>
              {(["ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`px-2.5 py-1 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
            {T.nav.map((item, i) => (
              <a
                key={item}
                href={`#${T.navAnchors[i]}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: "0.9rem" }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main>
      {/* Hero */}
      <section className="pt-40 pb-32 px-6 max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 text-primary" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {T.badge}
          </div>
          <h1 className="text-foreground mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
            {T.heroLine1}
            <br />
            <span style={{ fontWeight: 600 }}>{T.heroLine2}</span>
            <br />
            {T.heroLine3}
          </h1>
          <p className="text-muted-foreground mb-10" style={{ fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "480px" }}>
            {T.heroSub}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`#${T.ctaAnchor}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-opacity"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {T.ctaPrimary} <ArrowRight size={16} />
            </a>
            <a
              href={`#${T.navAnchors[0]}`}
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 hover:border-muted-foreground transition-colors"
              style={{ fontSize: "0.9rem" }}
            >
              {T.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id={T.navAnchors[0]} className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.servicesLabel}
            </p>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.servicesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} className="bg-background p-8 group hover:bg-card transition-colors cursor-default">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                    <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-border group-hover:text-primary transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}>
                    {T.serviceTags[tag as keyof typeof T.serviceTags] ?? tag}
                  </span>
                </div>
                <h3 className="text-foreground mb-3" style={{ fontSize: "1rem", fontWeight: 500 }}>{title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id={T.navAnchors[1]} className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.worksLabel}
            </p>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.worksTitle}
            </h2>
          </div>

          {showWorkFilters && (
          <div className="flex flex-wrap gap-2 mb-10">
            {workFilters.map(({ key, label }) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-1.5 border transition-colors ${isActive ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"}`}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          )}

          <div className="flex flex-col gap-6">
            {featuredWorks.map((work, index) => (
              <FeaturedWorkCard
                key={work.title}
                work={work}
                badge={work.badge}
                viewProjectDetails={T.viewProjectDetails}
                carouselAria={carouselAria}
                reversed={index % 2 === 1}
                onClick={() => setSelectedWork(work)}
              />
            ))}

            {restWorks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restWorks.map((work) => (
                  <WorkCard
                    key={work.title}
                    work={work}
                    typeLabel={workTypeLabel(lang, work.type)}
                    onClick={() => setSelectedWork(work)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id={T.navAnchors[2]} className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.processLabel}
            </p>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.processTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ num, title, desc }) => (
              <div key={num}>
                <div className="text-border mb-4" style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.5rem", fontWeight: 400, lineHeight: 1 }}>
                  {num}
                </div>
                <h3 className="text-foreground mb-3" style={{ fontSize: "0.95rem", fontWeight: 500 }}>{title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id={T.navAnchors[3]} className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.stackLabel}
            </p>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.stackTitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech) => (
              <span key={tech} className="border border-border px-4 py-2 text-muted-foreground hover:border-primary hover:text-foreground transition-colors cursor-default" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 py-24 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.whyLabel}
            </p>
            <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.whyTitle}
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
              {T.whyBody}
            </p>
          </div>
          <div className="border border-border divide-y divide-border">
            {T.whyPoints.map(([title, desc]) => (
              <div key={title} className="flex items-start gap-4 p-5">
                <ChevronRight size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-foreground mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 500 }}>{title}</div>
                  <div className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id={T.navAnchors[4]} className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              {T.contactLabel}
            </p>
            <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 300 }}>
              {T.contactTitle}
            </h2>
            <p className="text-muted-foreground mb-8" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
              {T.contactSub}
            </p>
            <div className="space-y-3">
              <a href="mailto:p@x128.ru" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.9rem", fontFamily: "'DM Mono', monospace" }}>
                <span className="text-primary">→</span> p@x128.ru
              </a>
              <a href="https://t.me/devs_for_hire" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.9rem", fontFamily: "'DM Mono', monospace" }}>
                <span className="text-primary">→</span> @devs_for_hire
              </a>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="border border-primary p-8 h-full flex flex-col justify-center">
                <div className="text-primary mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                  {T.sentLabel}
                </div>
                <p className="text-foreground" style={{ fontSize: "1rem" }}>{T.sentMsg}</p>
              </div>
            ) : (
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value="426f38de-b71d-4c7f-9ae5-de3fad735940"
                />
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>{T.fieldName}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-card border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    style={{ fontSize: "0.9rem" }}
                    placeholder={T.placeholderName}
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>{T.fieldEmail}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-card border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    style={{ fontSize: "0.9rem" }}
                    placeholder={T.placeholderEmail}
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>{T.fieldMsg}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-card border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                    style={{ fontSize: "0.9rem" }}
                    placeholder={T.placeholderMsg}
                  />
                </div>
                {formError && (
                  <p className="text-destructive" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {formError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontSize: "0.9rem", fontWeight: 500 }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {T.submitting}
                    </>
                  ) : (
                    <>
                      {T.submit} <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      </main>

      {/* Project modal */}
      <Dialog.Root open={!!selectedWork} onOpenChange={(open) => { if (!open) setSelectedWork(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ outline: "none" }}
            onClick={() => setSelectedWork(null)}
          >
            {selectedWork && (
              <div
                className="relative bg-background border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
                style={{ scrollbarWidth: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero image */}
                <div className="relative shrink-0">
                  {selectedWork.previewUrl ? (
                    <div className="p-4 md:p-6 bg-card border-b border-border">
                      <ScreenshotCarousel
                        key={selectedWork.title}
                        slides={selectedWork.gallery ?? [{ src: selectedWork.img, label: selectedWork.title }]}
                        url={selectedWork.previewUrl}
                        alt={selectedWork.title}
                        ariaPrev={carouselAria.prev}
                        ariaNext={carouselAria.next}
                        ariaScreenshot={carouselAria.screenshot}
                      />
                    </div>
                  ) : (
                    <div className="relative bg-muted" style={{ aspectRatio: "16/7" }}>
                      <img
                        src={selectedWork.img}
                        alt={selectedWork.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <span
                        className="absolute bottom-4 left-6 text-primary"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em" }}
                      >
                        {workTypeLabel(lang, selectedWork.type)}
                      </span>
                    </div>
                  )}
                  <Dialog.Close
                    className="absolute top-4 right-4 z-10 w-9 h-9 border border-border bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                    aria-label={T.closeAriaLabel}
                  >
                    <X size={16} />
                  </Dialog.Close>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 flex flex-col gap-8">

                  {/* Title + meta */}
                  <div>
                    <Dialog.Title
                      className="text-foreground mb-4"
                      style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 500, letterSpacing: "-0.01em" }}
                    >
                      {selectedWork.title}
                    </Dialog.Title>
                    {[selectedWork.client, selectedWork.duration, selectedWork.team].some(Boolean) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          selectedWork.client && { icon: Users, label: selectedWork.client },
                          selectedWork.duration && { icon: Clock, label: selectedWork.duration },
                          selectedWork.team && { icon: Bot, label: selectedWork.team },
                        ].filter(Boolean).map(({ icon: Icon, label }) => (
                          <div key={label} className="flex items-start gap-2">
                            <Icon size={14} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border" />

                  {/* Challenge */}
                  <div>
                    <p
                      className="text-primary mb-3"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em" }}
                    >
                      {T.modalChallenge}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
                      {selectedWork.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <p
                      className="text-primary mb-3"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em" }}
                    >
                      {T.modalSolution}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
                      {selectedWork.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <p
                      className="text-primary mb-3"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em" }}
                    >
                      {T.modalResults}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {selectedWork.results.map((r) => (
                        <li key={r} className="flex items-start gap-3">
                          <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                    {selectedWork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-3 py-1 text-muted-foreground"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedWork.links && selectedWork.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {selectedWork.links.map(({ label, url }) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                          style={{ fontSize: "0.85rem", fontWeight: 500 }}
                        >
                          {label} <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <a
                    href={`#${T.navAnchors[4]}`}
                    onClick={() => setSelectedWork(null)}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-opacity self-start"
                    style={{ fontSize: "0.9rem", fontWeight: 500 }}
                  >
                    {T.ctaPrimary} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
