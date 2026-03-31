const editorRoot = document.getElementById("editor-root");
const loginCard = document.getElementById("login-card");
const adminPanel = document.getElementById("admin-panel");
const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");
const saveStatus = document.getElementById("save-status");
const saveButton = document.getElementById("save-button");
const logoutButton = document.getElementById("logout-button");

const schema = [
  {
    title: "Шапка и контакты",
    fields: [
      { label: "Название бренда", selector: ".brand span:last-child", type: "text" },
      { label: "Телефон", selector: ".contacts a:nth-child(1)", type: "text" },
      { label: "Ссылка телефона", selector: ".contacts a:nth-child(1)", attr: "href", type: "url" },
      { label: "Ссылка WhatsApp", selector: ".contacts a:nth-child(2)", attr: "href", type: "url" },
      { label: "Ссылка Telegram", selector: ".contacts a:nth-child(3)", attr: "href", type: "url" }
    ]
  },
  {
    title: "Hero",
    fields: [
      { label: "Подзаголовок", selector: ".hero-copy .eyebrow", type: "text" },
      { label: "Главный заголовок", selector: ".hero-copy h1", type: "textarea" },
      { label: "Описание", selector: ".hero-copy p", type: "textarea" },
      { label: "Текст кнопки 1", selector: ".hero-actions a:nth-child(1)", type: "text" },
      { label: "Ссылка кнопки 1", selector: ".hero-actions a:nth-child(1)", attr: "href", type: "url" },
      { label: "Текст кнопки 2", selector: ".hero-actions a:nth-child(2)", type: "text" },
      { label: "Ссылка кнопки 2", selector: ".hero-actions a:nth-child(2)", attr: "href", type: "url" }
    ]
  },
  {
    title: "Hero карточки",
    fields: [
      { label: "Метрика 1 заголовок", selector: ".stats-row .metric:nth-child(1) strong", type: "text" },
      { label: "Метрика 1 текст", selector: ".stats-row .metric:nth-child(1) span", type: "textarea" },
      { label: "Метрика 2 заголовок", selector: ".stats-row .metric:nth-child(2) strong", type: "text" },
      { label: "Метрика 2 текст", selector: ".stats-row .metric:nth-child(2) span", type: "textarea" },
      { label: "Метрика 3 заголовок", selector: ".stats-row .metric:nth-child(3) strong", type: "text" },
      { label: "Метрика 3 текст", selector: ".stats-row .metric:nth-child(3) span", type: "textarea" },
      { label: "Метрика 4 заголовок", selector: ".stats-row .metric:nth-child(4) strong", type: "text" },
      { label: "Метрика 4 текст", selector: ".stats-row .metric:nth-child(4) span", type: "textarea" }
    ]
  },
  {
    title: "Проекты",
    fields: [
      { label: "Kicker", selector: "#projects .kicker", type: "text" },
      { label: "Заголовок", selector: "#projects h2", type: "textarea" },
      { label: "Описание справа", selector: "#projects .lead", type: "textarea" },
      { label: "Карточка 1 заголовок", selector: "#projects .portfolio-card:nth-of-type(1) h3", type: "text" },
      { label: "Карточка 1 текст", selector: "#projects .portfolio-card:nth-of-type(1) p", type: "textarea" },
      { label: "Карточка 1 изображение", selector: "#projects .portfolio-card:nth-of-type(1) img", attr: "src", type: "image" },
      { label: "Карточка 2 заголовок", selector: "#projects .portfolio-card:nth-of-type(2) h3", type: "text" },
      { label: "Карточка 2 текст", selector: "#projects .portfolio-card:nth-of-type(2) p", type: "textarea" },
      { label: "Карточка 2 изображение", selector: "#projects .portfolio-card:nth-of-type(2) img", attr: "src", type: "image" },
      { label: "Карточка 3 заголовок", selector: "#projects .portfolio-card:nth-of-type(3) h3", type: "text" },
      { label: "Карточка 3 текст", selector: "#projects .portfolio-card:nth-of-type(3) p", type: "textarea" },
      { label: "Карточка 3 изображение", selector: "#projects .portfolio-card:nth-of-type(3) img", attr: "src", type: "image" }
    ]
  },
  {
    title: "Галерея",
    fields: [
      { label: "Kicker", selector: "#gallery .kicker", type: "text" },
      { label: "Заголовок", selector: "#gallery h2", type: "textarea" },
      { label: "Описание", selector: "#gallery .lead", type: "textarea" },
      { label: "Изображение 1", selector: "#gallery .gallery-card:nth-of-type(1) img", attr: "src", type: "image" },
      { label: "Подпись 1", selector: "#gallery .gallery-card:nth-of-type(1) h3", type: "text" },
      { label: "Текст 1", selector: "#gallery .gallery-card:nth-of-type(1) p", type: "textarea" },
      { label: "Изображение 2", selector: "#gallery .gallery-card:nth-of-type(2) img", attr: "src", type: "image" },
      { label: "Подпись 2", selector: "#gallery .gallery-card:nth-of-type(2) h3", type: "text" },
      { label: "Текст 2", selector: "#gallery .gallery-card:nth-of-type(2) p", type: "textarea" },
      { label: "Изображение 3", selector: "#gallery .gallery-card:nth-of-type(3) img", attr: "src", type: "image" },
      { label: "Подпись 3", selector: "#gallery .gallery-card:nth-of-type(3) h3", type: "text" },
      { label: "Текст 3", selector: "#gallery .gallery-card:nth-of-type(3) p", type: "textarea" },
      { label: "Изображение 4", selector: "#gallery .gallery-card:nth-of-type(4) img", attr: "src", type: "image" },
      { label: "Подпись 4", selector: "#gallery .gallery-card:nth-of-type(4) h3", type: "text" },
      { label: "Текст 4", selector: "#gallery .gallery-card:nth-of-type(4) p", type: "textarea" },
      { label: "Изображение 5", selector: "#gallery .gallery-card:nth-of-type(5) img", attr: "src", type: "image" },
      { label: "Подпись 5", selector: "#gallery .gallery-card:nth-of-type(5) h3", type: "text" },
      { label: "Текст 5", selector: "#gallery .gallery-card:nth-of-type(5) p", type: "textarea" },
      { label: "Изображение 6", selector: "#gallery .gallery-card:nth-of-type(6) img", attr: "src", type: "image" },
      { label: "Подпись 6", selector: "#gallery .gallery-card:nth-of-type(6) h3", type: "text" },
      { label: "Текст 6", selector: "#gallery .gallery-card:nth-of-type(6) p", type: "textarea" }
    ]
  },
  {
    title: "Преимущества",
    fields: [
      { label: "Kicker", selector: "#advantages .kicker", type: "text" },
      { label: "Заголовок", selector: "#advantages h2", type: "textarea" },
      { label: "Вводный текст", selector: "#advantages .intro-card p", type: "textarea" },
      { label: "Карточка 1 заголовок", selector: "#advantages .value-card:nth-of-type(1) h3", type: "text" },
      { label: "Карточка 1 текст", selector: "#advantages .value-card:nth-of-type(1) p", type: "textarea" },
      { label: "Карточка 2 заголовок", selector: "#advantages .value-card:nth-of-type(2) h3", type: "text" },
      { label: "Карточка 2 текст", selector: "#advantages .value-card:nth-of-type(2) p", type: "textarea" },
      { label: "Карточка 3 заголовок", selector: "#advantages .value-card:nth-of-type(3) h3", type: "text" },
      { label: "Карточка 3 текст", selector: "#advantages .value-card:nth-of-type(3) p", type: "textarea" },
      { label: "Карточка 4 заголовок", selector: "#advantages .value-card:nth-of-type(4) h3", type: "text" },
      { label: "Карточка 4 текст", selector: "#advantages .value-card:nth-of-type(4) p", type: "textarea" }
    ]
  },
  {
    title: "Процесс",
    fields: [
      { label: "Kicker", selector: "#process .kicker", type: "text" },
      { label: "Заголовок", selector: "#process h2", type: "textarea" },
      { label: "Описание", selector: "#process .lead", type: "textarea" },
      { label: "Шаг 1 заголовок", selector: "#process .process-card:nth-of-type(1) h3", type: "text" },
      { label: "Шаг 1 текст", selector: "#process .process-card:nth-of-type(1) p", type: "textarea" },
      { label: "Шаг 2 заголовок", selector: "#process .process-card:nth-of-type(2) h3", type: "text" },
      { label: "Шаг 2 текст", selector: "#process .process-card:nth-of-type(2) p", type: "textarea" },
      { label: "Шаг 3 заголовок", selector: "#process .process-card:nth-of-type(3) h3", type: "text" },
      { label: "Шаг 3 текст", selector: "#process .process-card:nth-of-type(3) p", type: "textarea" },
      { label: "Шаг 4 заголовок", selector: "#process .process-card:nth-of-type(4) h3", type: "text" },
      { label: "Шаг 4 текст", selector: "#process .process-card:nth-of-type(4) p", type: "textarea" }
    ]
  },
  {
    title: "История и спецпредложения",
    fields: [
      { label: "Story kicker", selector: "#story .story .kicker", type: "text" },
      { label: "Story заголовок", selector: "#story .story h2", type: "textarea" },
      { label: "Story абзац 1", selector: "#story .story p:nth-of-type(2)", type: "textarea" },
      { label: "Story абзац 2", selector: "#story .story p:nth-of-type(3)", type: "textarea" },
      { label: "Офферы kicker", selector: "#offers .kicker", type: "text" },
      { label: "Офферы заголовок", selector: "#offers h2", type: "textarea" },
      { label: "Оффер 1 заголовок", selector: "#offers .offer-card:nth-of-type(1) h3", type: "text" },
      { label: "Оффер 1 текст", selector: "#offers .offer-card:nth-of-type(1) p", type: "textarea" },
      { label: "Оффер 2 заголовок", selector: "#offers .offer-card:nth-of-type(2) h3", type: "text" },
      { label: "Оффер 2 текст", selector: "#offers .offer-card:nth-of-type(2) p", type: "textarea" },
      { label: "Оффер 3 заголовок", selector: "#offers .offer-card:nth-of-type(3) h3", type: "text" },
      { label: "Оффер 3 текст", selector: "#offers .offer-card:nth-of-type(3) p", type: "textarea" }
    ]
  },
  {
    title: "Отзывы, FAQ и контакты",
    fields: [
      { label: "Отзывы kicker", selector: "#reviews .kicker", type: "text" },
      { label: "Отзывы заголовок", selector: "#reviews h2", type: "textarea" },
      { label: "Отзыв 1 заголовок", selector: "#reviews .review-card:nth-of-type(1) h3", type: "text" },
      { label: "Отзыв 1 текст", selector: "#reviews .review-card:nth-of-type(1) p", type: "textarea" },
      { label: "Отзыв 2 заголовок", selector: "#reviews .review-card:nth-of-type(2) h3", type: "text" },
      { label: "Отзыв 2 текст", selector: "#reviews .review-card:nth-of-type(2) p", type: "textarea" },
      { label: "Отзыв 3 заголовок", selector: "#reviews .review-card:nth-of-type(3) h3", type: "text" },
      { label: "Отзыв 3 текст", selector: "#reviews .review-card:nth-of-type(3) p", type: "textarea" },
      { label: "FAQ kicker", selector: "#faq .kicker", type: "text" },
      { label: "FAQ заголовок", selector: "#faq h2", type: "textarea" },
      { label: "FAQ 1 заголовок", selector: "#faq .faq-card:nth-of-type(1) h3", type: "text" },
      { label: "FAQ 1 текст", selector: "#faq .faq-card:nth-of-type(1) p", type: "textarea" },
      { label: "FAQ 2 заголовок", selector: "#faq .faq-card:nth-of-type(2) h3", type: "text" },
      { label: "FAQ 2 текст", selector: "#faq .faq-card:nth-of-type(2) p", type: "textarea" },
      { label: "FAQ 3 заголовок", selector: "#faq .faq-card:nth-of-type(3) h3", type: "text" },
      { label: "FAQ 3 текст", selector: "#faq .faq-card:nth-of-type(3) p", type: "textarea" },
      { label: "FAQ 4 заголовок", selector: "#faq .faq-card:nth-of-type(4) h3", type: "text" },
      { label: "FAQ 4 текст", selector: "#faq .faq-card:nth-of-type(4) p", type: "textarea" },
      { label: "Финальный CTA заголовок", selector: "#final-cta h2", type: "textarea" },
      { label: "Финальный CTA текст", selector: "#final-cta .cta-panel p:last-of-type", type: "textarea" },
      { label: "Контакты kicker", selector: "#contacts .contact-info .kicker", type: "text" },
      { label: "Контакты заголовок", selector: "#contacts .contact-info h2", type: "text" },
      { label: "Контакты описание", selector: "#contacts .contact-info > p:last-of-type", type: "textarea" },
      { label: "Телефон в блоке", selector: "#contacts .contact-list div:nth-child(1) a", type: "text" },
      { label: "Ссылка телефона", selector: "#contacts .contact-list div:nth-child(1) a", attr: "href", type: "url" },
      { label: "Адрес", selector: "#contacts .contact-list div:nth-child(2) span", type: "textarea" },
      { label: "Email", selector: "#contacts .contact-list div:nth-child(3) a", type: "text" },
      { label: "Ссылка email", selector: "#contacts .contact-list div:nth-child(3) a", attr: "href", type: "url" },
      { label: "Форма заголовок", selector: "#contacts .contact-card:nth-of-type(2) h3", type: "text" },
      { label: "Форма описание", selector: "#contacts .contact-card:nth-of-type(2) > p:last-of-type", type: "textarea" },
      { label: "Текст кнопки формы", selector: "#contacts .contact-card:nth-of-type(2) button", type: "text" }
    ]
  }
];

let currentDocument = null;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (typeof text === "string") element.textContent = text;
  return element;
}

function getTarget(doc, selector) {
  return doc.querySelector(selector);
}

function getValue(doc, field) {
  const target = getTarget(doc, field.selector);
  if (!target) return "";
  return field.attr ? target.getAttribute(field.attr) || "" : target.textContent.trim();
}

function setValue(doc, field, value) {
  const target = getTarget(doc, field.selector);
  if (!target) return;
  if (field.attr) {
    target.setAttribute(field.attr, value);
  } else {
    target.textContent = value;
  }
}

function serializeDocument(doc) {
  return "<!doctype html>\n" + doc.documentElement.outerHTML;
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("api/upload.php", {
    method: "POST",
    body: formData,
    credentials: "same-origin"
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Upload failed");
  }
  return data.url;
}

function renderEditor(doc) {
  editorRoot.innerHTML = "";

  schema.forEach((group) => {
    const card = createElement("section", "group-card");
    card.appendChild(createElement("h3", "", group.title));

    const grid = createElement("div", "fields-grid");

    group.fields.forEach((field) => {
      const wrapper = createElement("label", "field-row" + ((field.type === "textarea") ? " field-wide" : ""));
      wrapper.append(document.createTextNode(field.label));

      const value = getValue(doc, field);
      const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
      if (field.type !== "textarea") {
        input.type = field.type === "image" ? "url" : (field.type || "text");
      }
      input.value = value;
      input.dataset.selector = field.selector;
      input.dataset.attr = field.attr || "";
      input.dataset.kind = field.type;
      wrapper.appendChild(input);

      if (field.type === "image") {
        const tools = createElement("div", "image-tools");
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.addEventListener("change", async () => {
          const file = fileInput.files && fileInput.files[0];
          if (!file) return;
          saveStatus.textContent = "Загружаю изображение...";
          try {
            const url = await uploadImage(file);
            input.value = url;
            saveStatus.textContent = "Изображение загружено. Не забудьте сохранить изменения.";
          } catch (error) {
            saveStatus.textContent = error.message;
          }
        });
        tools.appendChild(fileInput);
        wrapper.appendChild(tools);
      }

      grid.appendChild(wrapper);
    });

    card.appendChild(grid);
    editorRoot.appendChild(card);
  });
}

async function loadEditor() {
  const status = await api("api/login.php");
  if (!status.authenticated) {
    loginCard.classList.remove("hidden");
    adminPanel.classList.add("hidden");
    return;
  }

  const content = await api("api/content.php");
  currentDocument = new DOMParser().parseFromString(content.html, "text/html");
  renderEditor(currentDocument);

  loginCard.classList.add("hidden");
  adminPanel.classList.remove("hidden");
  saveStatus.textContent = "";
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "Проверяю доступ...";

  const formData = new FormData(loginForm);
  try {
    await api("api/login.php", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });
    loginStatus.textContent = "";
    loginForm.reset();
    await loadEditor();
  } catch (error) {
    loginStatus.textContent = error.message;
  }
});

saveButton.addEventListener("click", async () => {
  if (!currentDocument) return;

  saveStatus.textContent = "Сохраняю изменения...";

  document.querySelectorAll(".field-row input, .field-row textarea").forEach((input) => {
    const field = {
      selector: input.dataset.selector,
      attr: input.dataset.attr || null
    };
    setValue(currentDocument, field, input.value);
  });

  try {
    await api("api/content.php", {
      method: "POST",
      body: JSON.stringify({
        html: serializeDocument(currentDocument)
      })
    });
    saveStatus.textContent = "Изменения сохранены.";
  } catch (error) {
    saveStatus.textContent = error.message;
  }
});

logoutButton.addEventListener("click", async () => {
  await api("api/logout.php", {
    method: "POST",
    body: JSON.stringify({})
  });
  currentDocument = null;
  editorRoot.innerHTML = "";
  loginCard.classList.remove("hidden");
  adminPanel.classList.add("hidden");
});

loadEditor().catch((error) => {
  loginStatus.textContent = error.message;
});
