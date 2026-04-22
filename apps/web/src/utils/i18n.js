// Система интернационализации для веб-студии
export const languages = {
  de: "Deutsch",
  ru: "Русский",
  en: "English",
};

export const translations = {
  de: {
    nav: {
      home: "Startseite",
      portfolio: "Portfolio",
      news: "Nachrichten/Blog",
      about: "Über mich",
      contact: "Kontakt",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Kreative Lösungen für Ihr digitales Business",
      description:
        "Verwandeln Sie Ihre Ideen in einzigartige digitale Erlebnisse. Von Webdesign bis Branding – ich bringe Kreativität und Technik zusammen.",
      telegramButton: "Telegram Kontakt",
      scrollHint: "scrollen",
      featured: {
        title: "Ausgewählte Projekte",
        subtitle: "Eine Auswahl meiner neuesten Arbeiten.",
        viewCase: "Fallstudie ansehen"
      },
      why: {
        title: "Warum ich?",
        items: [
          { title: "Kreativer Ansatz", desc: "Ich schreibe nicht nur Code; ich gestalte Erlebnisse, die begeistern." },
          { title: "Technische Exzellenz", desc: "Sauberer, moderner Code für schnelle und zugängliche Websites." },
          { title: "Zuverlässiger Partner", desc: "Transparente Kommunikation und strikte Einhaltung von Fristen." }
        ]
      },
      cta: {
        title: "Haben Sie ein Projekt im Kopf?",
        subtitle: "Lassen Sie uns Ihre Vision Wirklichkeit werden lassen.",
        button: "Projekt starten"
      },
      testimonials: {
        title: "Kundenstimmen",
        subtitle: "Was meine Kunden über die Zusammenarbeit sagen.",
        items: [
          { name: "Alex Müller", role: "CEO, TechStart", text: "Oleh hat unsere Website komplett transformiert. Das Design ist einzigartig und die Performance hervorragend." },
          { name: "Sarah Weber", role: "Gründerin, DesignCo", text: "Professionell, schnell und unglaublich kreativ. Er hat unsere Markenidentität perfekt eingefangen." },
          { name: "Markus Schmidt", role: "Marketing Director", text: "Die Zusammenarbeit war ein Vergnügen. Das Ergebnis übertraf unsere Erwartungen bei weitem." }
        ]
      },
      services: {
        title: "Meine Leistungen",
        subtitle: "Maßgeschneiderte digitale Lösungen für Ihr Wachstum.",
        items: [
          { title: "Webdesign & UI/UX", desc: "Ästhetische und intuitive Designs, die Nutzer begeistern und binden.", icon: "Palette" },
          { title: "Webentwicklung", desc: "Robuste, schnelle und skalierbare Websites mit modernsten Technologien.", icon: "Code" },
          { title: "Branding", desc: "Einprägsame Logos und visuelle Identitäten, die Ihre Marke unverwechselbar machen.", icon: "Fingerprint" },
          { title: "SEO & Performance", desc: "Optimierung für Suchmaschinen und blitzschnelle Ladezeiten.", icon: "Zap" }
        ]
      }
    },
    news: {
      title: "Neuigkeiten & Updates",
      description: "Hier finden Sie aktuelle Nachrichten, Ereignisse und neue Projekte aus meiner Web- und Designarbeit.",
    },
    about: {
      title: "Über mich",
      description: "Hier finden Sie Informationen über mich und meine Arbeit als Webentwickler und Designer.",
      content: "Ich bin Webentwickler und Designer, spezialisiert auf moderne Websites und Branding. Mein Ansatz verbindet Kreativität und Technologie für die besten Ergebnisse.",
      list: [
        "Berufserfahrung: 8+ Jahre",
        "Stack: React, Next.js, Node.js, Figma, Tailwind CSS",
        "Ich liebe kreative und ungewöhnliche Projekte",
        "Kunden weltweit"
      ],
      process: {
        title: "Mein Arbeitsprozess",
        steps: [
          { title: "Entdeckung", desc: "Wir definieren Ihre Ziele und Zielgruppe." },
          { title: "Design", desc: "Ich entwerfe visuelle Konzepte, die begeistern." },
          { title: "Entwicklung", desc: "Sauberer Code und moderne Technologien." },
          { title: "Launch", desc: "Wir bringen Ihr Projekt online." }
        ]
      },
      skills: {
        title: "Meine Werkzeuge",
        items: ["React & Next.js", "UI/UX Design", "Node.js", "SEO Optimierung", "Branding"]
      },
      values: {
        title: "Meine Philosophie",
        items: [
          { title: "Einfachheit", desc: "Ich glaube an klares Design, das einfach zu bedienen und zu verstehen ist." },
          { title: "Liebe zum Detail", desc: "Jedes Pixel zählt. Ich verfeinere jede Interaktion." },
          { title: "Nutzerzentriert", desc: "Ich gestalte mit dem Endnutzer im Blick für das beste Erlebnis." }
        ]
      },
      techStack: {
        title: "Tools & Technologien"
      }
    },

    // Портфолио
    portfolio: {
      title: "Portfolio",
      subtitle:
        "Eine Auswahl meiner kreativen Arbeiten – von Webdesign bis Branding. Jedes Projekt erzählt eine einzigartige Geschichte.",
      loading: "Projekte werden geladen...",
      error: "Fehler beim Laden der Projekte",
      empty: "Noch keine Projekte vorhanden",
      viewMore: "Mehr anzeigen",
      viewAll: "Alle ansehen",
      projectDescription: "Projektbeschreibung",
      readMore: "Mehr lesen",
      services: [
        { title: "Webdesign", desc: "Einzigartige, handgefertigte Designs, die Ihre Marke einfangen." },
        { title: "Entwicklung", desc: "Schnelle, responsive und SEO-freundliche Websites mit moderner Technik." },
        { title: "Branding", desc: "Logos und visuelle Identitäten, die Ihre Geschichte erzählen." }
      ],
      categories: {
        all: "Alle",
        webDesign: "Webdesign",
        development: "Entwicklung",
        branding: "Branding"
      }
    },

    // Контакты
    contact: {
      title: "Kontakt",
      subtitle:
        "Haben Sie ein Projekt im Kopf? Lassen Sie uns darüber sprechen! Ihre Nachricht wird direkt an mich weitergeleitet.",
      letsTalk: "Lass uns sprechen!",
      nextSteps: {
        title: "Wie geht es weiter?",
        steps: [
          "Ich prüfe Ihre Anfrage.",
          "Wir vereinbaren ein kurzes Gespräch.",
          "Wir starten das Projekt!"
        ]
      },
      responseTime:
        "Antwort in der Regel innerhalb von 24 Stunden. Für dringende Anfragen nutzen Sie gerne Telegram.",
      form: {
        name: "Name",
        email: "E-Mail",
        subject: "Betreff",
        message: "Nachricht",
        namePlaceholder: "Ihr vollständiger Name",
        emailPlaceholder: "ihre.email@beispiel.de",
        subjectPlaceholder: "Worum geht es?",
        messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
        sendButton: "Nachricht senden",
        sending: "Wird gesendet...",
        newMessage: "Neue Nachricht",
      },
      success: {
        title: "Nachricht gesendet!",
        description:
          "Vielen Dank für Ihre Nachricht. Ich melde mich so schnell wie möglich bei Ihnen.",
      },
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          { q: "Wie viel kostet eine Website?", a: "Die Kosten hängen von der Komplexität ab. Eine Landingpage beginnt ab 500 €, komplexe Unternehmenswebsites werden individuell kalkuliert." },
          { q: "Wie lange dauert die Entwicklung?", a: "Im Durchschnitt dauert eine Landingpage 3-5 Tage, eine mehrseitige Website 2-4 Wochen." },
          { q: "Gibt es Support nach dem Launch?", a: "Ja, ich biete 1 Monat kostenlosen Support und kann weitere Wartungspakete anbieten." },
          { q: "Was wird für den Start benötigt?", a: "Nur Ihre Idee! Wenn Sie Referenzen oder Texte haben, ist das super, aber wir können auch bei Null anfangen." }
        ]
      },
    },
    common: {
      project: "Projekt",
      noDescription: "Keine Beschreibung",
      untitled: "Unbenanntes Projekt",
      details: "Projektdetails",
      portfolioTag: "Portfolio Projekt",
      withLove: "Mit Liebe",
    },
    footer: {
      brandDescription: "Digitale Erlebnisse mit menschlicher Note schaffen.",
      explore: "Entdecken",
      letsConnect: "Lass uns verbinden",
      copyright: "Alle Rechte vorbehalten.",
      imprint: "Impressum",
      privacy: "Datenschutz"
    },
    cookies: {
      title: "Cookies & Datenschutz",
      description: "Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten.",
      accept: "Alle akzeptieren",
      decline: "Nur essenzielle",
      settings: "Einstellungen",
      save: "Speichern",
      essential: "Essenziell",
      essentialDesc: "Notwendig für die Grundfunktionen der Website.",
      analytics: "Analyse",
      analyticsDesc: "Helfen uns zu verstehen, wie Besucher mit der Website interagieren."
    }
  },

  ru: {
    nav: {
      home: "Главная",
      portfolio: "Портфолио",
      news: "Новости/Блог",
      about: "Обо мне",
      contact: "Контакты",
    },
    home: {
      studioLabel: "Веб Студия",
      slogan: "Креативные решения для вашего цифрового бизнеса",
      description:
        "Превращаю ваши идеи в уникальные цифровые решения. От веб-дизайна до брендинга – объединяю креативность и технологии.",
      telegramButton: "Связаться в Telegram",
      scrollHint: "прокрутить",
      featured: {
        title: "Избранные проекты",
        subtitle: "Подборка моих недавних работ.",
        viewCase: "Смотреть кейс"
      },
      why: {
        title: "Почему я?",
        items: [
          { title: "Креативный подход", desc: "Я не просто пишу код, я создаю опыт, который вовлекает и вдохновляет." },
          { title: "Техническое качество", desc: "Чистый, современный код, обеспечивающий быстрые и доступные сайты." },
          { title: "Надежный партнер", desc: "Прозрачная коммуникация и строгое соблюдение сроков." }
        ]
      },
      cta: {
        title: "Есть идея проекта?",
        subtitle: "Давайте воплотим ваше видение в реальность.",
        button: "Начать проект"
      },
      testimonials: {
        title: "Отзывы клиентов",
        subtitle: "Что говорят те, с кем я работал.",
        items: [
          { name: "Алексей Петров", role: "CEO, TechStart", text: "Олег полностью преобразил наш сайт. Дизайн уникален, а скорость работы впечатляет." },
          { name: "Елена Соколова", role: "Основатель, DesignCo", text: "Профессионально, быстро и невероятно креативно. Он идеально передал суть нашего бренда." },
          { name: "Дмитрий Волков", role: "Маркетинг Директор", text: "Работать было одно удовольствие. Результат превзошел все наши ожидания." }
        ]
      },
      services: {
        title: "Мои услуги",
        subtitle: "Индивидуальные цифровые решения для вашего роста.",
        items: [
          { title: "Веб-дизайн & UI/UX", desc: "Эстетичные и интуитивные дизайны, которые влюбляют пользователей.", icon: "Palette" },
          { title: "Веб-разработка", desc: "Надежные, быстрые и масштабируемые сайты на современных технологиях.", icon: "Code" },
          { title: "Брендинг", desc: "Запоминающиеся логотипы и айдентика, выделяющая вас среди конкурентов.", icon: "Fingerprint" },
          { title: "SEO & Производительность", desc: "Оптимизация для поисковиков и молниеносная загрузка страниц.", icon: "Zap" }
        ]
      }
    },
    about: {
      title: "Обо мне",
      description: "Здесь вы найдете информацию обо мне и моей работе как веб-разработчика и дизайнера.",
      content: "Я — веб-разработчик и дизайнер, специализируюсь на создании современных сайтов и брендинге. Мой подход — сочетание креативности и технологий для достижения лучших результатов для клиентов.",
      list: [
        "Опыт работы: 8+ лет",
        "Стек: React, Next.js, Node.js, Figma, Tailwind CSS",
        "Люблю нестандартные задачи и творческие проекты",
        "Работаю с клиентами по всему миру"
      ],
      process: {
        title: "Мой процесс работы",
        steps: [
          { title: "Исследование", desc: "Определяем цели и аудиторию." },
          { title: "Дизайн", desc: "Создаю визуальные концепции." },
          { title: "Разработка", desc: "Чистый код и современные технологии." },
          { title: "Запуск", desc: "Выводим ваш проект в свет." }
        ]
      },
      skills: {
        title: "Мой инструментарий",
        items: ["React & Next.js", "UI/UX Дизайн", "Node.js", "SEO Оптимизация", "Брендинг"]
      },
      values: {
        title: "Моя философия",
        items: [
          { title: "Простота", desc: "Я верю в чистый дизайн, который удобен и понятен пользователю." },
          { title: "Внимание к деталям", desc: "Каждый пиксель имеет значение. Я оттачиваю каждое взаимодействие." },
          { title: "Польза для людей", desc: "Я проектирую с мыслью о конечном пользователе, обеспечивая лучший опыт." }
        ]
      },
      techStack: {
        title: "Инструменты и Технологии"
      }
    },
    news: {
      title: "Новости и обновления",
      description: "Здесь публикуются свежие новости, события и новые проекты из мира веб-разработки и дизайна.",
    },

    // Портфолио
    portfolio: {
      title: "Портфолио",
      subtitle:
        "Подборка моих творческих работ – от веб-дизайна до брендинга. Каждый проект рассказывает уникальную историю.",
      loading: "Загружаем проекты...",
      error: "Ошибка загрузки проектов",
      empty: "Пока нет проектов",
      viewMore: "Подробнее",
      viewAll: "Смотреть все",
      projectDescription: "Описание проекта",
      readMore: "Читать полностью",
      services: [
        { title: "Веб-дизайн", desc: "Уникальные дизайны, отражающие суть вашего бренда." },
        { title: "Разработка", desc: "Быстрые, адаптивные и SEO-оптимизированные сайты." },
        { title: "Брендинг", desc: "Логотипы и фирменный стиль, рассказывающие вашу историю." }
      ],
      categories: {
        all: "Все",
        webDesign: "Веб-дизайн",
        development: "Разработка",
        branding: "Брендинг"
      }
    },

    // Контакты
    contact: {
      title: "Контакты",
      subtitle: "Готовы начать проект? Давайте обсудим ваши идеи.",
      letsTalk: "Давайте поговорим",
      responseTime: "Обычно я отвечаю в течение 24 часов.",
      form: {
        name: "Имя",
        namePlaceholder: "Иван Иванов",
        email: "Email",
        emailPlaceholder: "ivan@example.com",
        subject: "Тема",
        subjectPlaceholder: "Запрос на проект",
        message: "Сообщение",
        messagePlaceholder: "Расскажите о вашем проекте...",
        sendButton: "Отправить",
        sending: "Отправка...",
        newMessage: "Отправить еще",
      },
      success: {
        title: "Сообщение отправлено!",
        description: "Спасибо за обращение. Я свяжусь с вами в ближайшее время.",
      },
      nextSteps: {
        title: "Что будет дальше?",
        steps: [
          "Я изучу ваш запрос в течение 24 часов.",
          "Мы созвонимся для обсуждения деталей.",
          "Я подготовлю предложение и сроки.",
        ],
      },
      faq: {
        title: "Частые вопросы",
        items: [
          { q: "Сколько стоит сайт?", a: "Стоимость зависит от сложности. Лендинг от $500, сложные корпоративные сайты рассчитываются индивидуально." },
          { q: "Как долго длится разработка?", a: "В среднем лендинг занимает 3-5 дней, многостраничный сайт — 2-4 недели." },
          { q: "Есть ли поддержка после запуска?", a: "Да, я предоставляю 1 месяц бесплатной поддержки и могу предложить пакеты обслуживания." },
          { q: "Что нужно для старта?", a: "Только ваша идея! Если есть референсы или тексты — отлично, но можем начать и с нуля." }
        ]
      }
    },

    common: {
      project: "Проект",
      noDescription: "Нет описания",
      untitled: "Проект без названия",
      details: "Детали проекта",
      portfolioTag: "Проект портфолио",
      withLove: "С любовью",
    },
    footer: {
      brandDescription: "Создаю цифровые продукты с душой.",
      explore: "Меню",
      letsConnect: "Контакты",
      copyright: "Все права защищены.",
      imprint: "Выходные данные",
      privacy: "Конфиденциальность"
    },
    cookies: {
      title: "Cookies и Конфиденциальность",
      description: "Мы используем cookies для улучшения работы сайта.",
      accept: "Принять все",
      decline: "Только важные",
      settings: "Настройки",
      save: "Сохранить",
      essential: "Важные",
      essentialDesc: "Необходимы для работы сайта.",
      analytics: "Аналитика",
      analyticsDesc: "Помогают улучшать сайт."
    }
  },

  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      news: "News/Blog",
      about: "About",
      contact: "Contact",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Creative Solutions for Your Digital Business",
      description:
        "Transform your ideas into unique digital experiences. From web design to branding – I bring creativity and technology together.",
      telegramButton: "Contact on Telegram",
      scrollHint: "scroll",
      featured: {
        title: "Featured Projects",
        subtitle: "A selection of my recent work.",
        viewCase: "View Case Study"
      },
      why: {
        title: "Why Choose Me?",
        items: [
          { title: "Creative Approach", desc: "I don't just code; I design experiences that engage and inspire." },
          { title: "Technical Excellence", desc: "Clean, modern code ensuring fast and accessible websites." },
          { title: "Reliable Partner", desc: "Transparent communication and strict adherence to deadlines." }
        ]
      },
      cta: {
        title: "Have a project in mind?",
        subtitle: "Let's turn your vision into reality.",
        button: "Start a Project"
      },
      testimonials: {
        title: "Testimonials",
        subtitle: "What my clients say about our collaboration.",
        items: [
          { name: "Alex Miller", role: "CEO, TechStart", text: "Oleh completely transformed our website. The design is unique and performance is outstanding." },
          { name: "Sarah Weber", role: "Founder, DesignCo", text: "Professional, fast, and incredibly creative. He captured our brand identity perfectly." },
          { name: "Mark Smith", role: "Marketing Director", text: "Working together was a pleasure. The result far exceeded our expectations." }
        ]
      },
      services: {
        title: "My Services",
        subtitle: "Tailored digital solutions for your growth.",
        items: [
          { title: "Web Design & UI/UX", desc: "Aesthetic and intuitive designs that engage and retain users.", icon: "Palette" },
          { title: "Web Development", desc: "Robust, fast, and scalable websites built with modern technologies.", icon: "Code" },
          { title: "Branding", desc: "Memorable logos and visual identities that make your brand unmistakable.", icon: "Fingerprint" },
          { title: "SEO & Performance", desc: "Optimization for search engines and lightning-fast load times.", icon: "Zap" }
        ]
      }
    },
    about: {
      title: "About",
      description: "Here you can find information about me and my work as a web developer and designer.",
      content: "I am a web developer and designer specializing in modern websites and branding. My approach combines creativity and technology for the best results.",
      list: [
        "Experience: 8+ years",
        "Stack: React, Next.js, Node.js, Figma, Tailwind CSS",
        "I love creative and challenging projects",
        "Working with clients worldwide"
      ],
      process: {
        title: "My Work Process",
        steps: [
          { title: "Discovery", desc: "Defining your goals and audience." },
          { title: "Design", desc: "Crafting visual concepts that inspire." },
          { title: "Development", desc: "Clean code and modern tech." },
          { title: "Launch", desc: "Bringing your project to life." }
        ]
      },
      skills: {
        title: "My Toolkit",
        items: ["React & Next.js", "UI/UX Design", "Node.js", "SEO Optimization", "Branding"]
      },
      values: {
        title: "My Philosophy",
        items: [
          { title: "Simplicity", desc: "I believe in clean designs that are easy to use and understand." },
          { title: "Attention to Detail", desc: "Every pixel matters. I polish every interaction." },
          { title: "User-Centric", desc: "I design with the end-user in mind, ensuring a great experience." }
        ]
      },
      techStack: {
        title: "Tools & Technologies"
      }
    },
    news: {
      title: "News & Updates",
      description: "Find the latest news, events, and new projects from my web development and design journey.",
    },

    // Портфолио
    portfolio: {
      title: "Portfolio",
      subtitle:
        "A selection of my creative works – from web design to branding. Each project tells a unique story.",
      loading: "Loading projects...",
      error: "Error loading projects",
      empty: "No projects yet",
      viewMore: "View more",
      viewAll: "View All",
      projectDescription: "Project Description",
      readMore: "Read more",
      services: [
        { title: "Web Design", desc: "Unique, hand-crafted designs that capture your brand's essence." },
        { title: "Development", desc: "Fast, responsive, and SEO-friendly websites built with modern tech." },
        { title: "Branding", desc: "Logos and visual identities that tell your story." }
      ],
      categories: {
        all: "All",
        webDesign: "Web Design",
        development: "Development",
        branding: "Branding"
      }
    },

    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "Ready to start a project? Let's discuss your ideas.",
      letsTalk: "Let's Talk",
      responseTime: "I usually respond within 24 hours.",
      form: {
        name: "Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "john@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project Inquiry",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        sendButton: "Send Message",
        sending: "Sending...",
        newMessage: "Send Another Message",
      },
      success: {
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      },
      nextSteps: {
        title: "What happens next?",
        steps: [
          "I review your request within 24 hours.",
          "We schedule a short call to discuss details.",
          "I prepare a proposal and timeline.",
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a website cost?", a: "The cost depends on the complexity. A landing page starts from $500, while complex corporate sites are calculated individually." },
          { q: "How long does development take?", a: "On average, a landing page takes 3-5 days, and a multi-page site takes 2-4 weeks." },
          { q: "Do you provide support after launch?", a: "Yes, I provide 1 month of free support and can offer further maintenance packages." },
          { q: "What do you need to start?", a: "Just your idea! If you have references or texts, that's great, but we can start from scratch." }
        ]
      }
    },

    common: {
      project: "Project",
      noDescription: "No description",
      untitled: "Untitled Project",
      details: "Project Details",
      portfolioTag: "Portfolio Project",
      withLove: "With love",
    },
    footer: {
      brandDescription: "Creating digital experiences with a human touch.",
      explore: "Explore",
      letsConnect: "Let's Connect",
      copyright: "All rights reserved.",
      imprint: "Imprint",
      privacy: "Privacy Policy"
    },
    cookies: {
      title: "Cookies & Privacy",
      description: "We use cookies to ensure you get the best experience on our website.",
      accept: "Accept All",
      decline: "Essential Only",
      settings: "Settings",
      save: "Save Preferences",
      essential: "Essential",
      essentialDesc: "Strictly necessary for the website to function.",
      analytics: "Analytics",
      analyticsDesc: "Help us understand how you use the site."
    }
  }
};
