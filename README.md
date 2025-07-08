# 🖋️ Markdown Live Editor

[![GitHub license](https://img.shields.io/github/license/yourusername/markdown-live-editor)](https://github.com/yourusername/markdown-live-editor/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/markdown-live-editor)](https://github.com/yourusername/markdown-live-editor/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/markdown-live-editor)](https://github.com/yourusername/markdown-live-editor/issues)

**Редактор Markdown с live-превью** - это веб-приложение для удобного написания и просмотра Markdown-разметки в реальном времени. Поддерживает экспорт в HTML/MD, переключение тем и локализацию.

[![Demo Screenshot](screenshot.png)](https://yourusername.github.io/markdown-live-editor/)

👉 [Живая демонстрация](https://yourusername.github.io/markdown-live-editor/)

## ✨ Особенности

- **Редактор с подсветкой синтаксиса**
  - Поддержка всех основных элементов Markdown
  - Автоматическое определение списков, заголовков, кода
  - Подсветка синтаксиса для блоков кода

- **Интерактивное превью**
  - Просмотр результата в реальном времени
  - Красивое форматирование таблиц, цитат, кода
  - Поддержка HTML-встраивания

- **Дополнительные функции**
  - 📥 Загрузка файлов (.md, .txt)
  - 📤 Скачивание в формате HTML/MD
  - 🌓 Переключение светлой/тёмной темы
  - 🌐 Локализация (английский/русский)
  - 📋 Копирование HTML в буфер обмена
  - ✂️ Автоматическое изменение высоты редактора

## 🛠 Технологии

- **Frontend**:
  - Vanilla JavaScript (ES6+)
  - [Marked.js](https://marked.js.org/) - парсинг Markdown
  - [DOMPurify](https://github.com/cure53/DOMPurify) - санитизация HTML
  - CSS Flexbox/Grid - адаптивная вёрстка
  - System UI + Fira Code - шрифты

- **Инструменты**:
  - GitHub Pages - хостинг
  - Git - контроль версий

## 🚀 Быстрый старт

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/yourusername/markdown-live-editor.git
   ```

2. **Откройте в браузере**:
   - Просто откройте `index.html` в любом браузере
   - Или используйте Live Server в VS Code

3. **Используйте**:
   - Пишите Markdown в левой панели
   - Просматривайте результат справа
   - Используйте панель инструментов для дополнительных функций

## 📚 Поддерживаемый синтаксис

```markdown
# Заголовок 1
## Заголовок 2

- Список
- Элементы

1. Нумерованный
2. Список

**Жирный текст** и *курсив*

`код в строке`

```javascript
// Блок кода
function hello() {
  console.log('Hello!');
}
```

> Цитата

[Ссылка](https://example.com)

![Изображение](image.png)

| Таблицы      | Это          | Круто |
|--------------|-------------|-------|
| столбец 1    | текст       | 123   |
| столбец 2    | текст       | 456   |
```

## 🌍 Локализация

Приложение поддерживает два языка:
- Английский (EN)
- Русский (RU)

Переключение через кнопку "EN/RU" в панели инструментов.

## 📦 Экспорт документов

- **Скачать как Markdown** (.md файл)
- **Скачать как HTML** (полная страница со стилями)
- **Копировать HTML** в буфер обмена

## 🤝 Как внести вклад

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Сделайте коммит (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---
