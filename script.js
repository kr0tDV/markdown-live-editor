document.addEventListener('DOMContentLoaded', function() {
    // DOM элементы
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const copyBtn = document.getElementById('copy-btn');
    const charCount = document.getElementById('char-count');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const loadFileBtn = document.getElementById('load-file');
    const fileInput = document.getElementById('file-input');
    const downloadMdBtn = document.getElementById('download-md');
    const downloadHtmlBtn = document.getElementById('download-html');
    
    // Локализация
    const translations = {
        'en': {
            'title': 'Markdown Live Editor',
            'subtitle': 'Edit on the left, see results on the right in real time',
            'editor-title': 'Markdown Editor',
            'preview-title': 'HTML Preview',
            'copy-html': 'Copy HTML',
            'characters': 'characters',
            'light-theme': 'Light Theme',
            'dark-theme': 'Dark Theme',
            'load-file': 'Load File',
            'download-md': 'Download MD',
            'download-html': 'Download HTML'
        },
        'ru': {
            'title': 'Markdown Live Editor',
            'subtitle': 'Редактируйте слева, результат виден справа в реальном времени',
            'editor-title': 'Редактор Markdown',
            'preview-title': 'HTML Превью',
            'copy-html': 'Копировать HTML',
            'characters': 'символов',
            'light-theme': 'Светлая тема',
            'dark-theme': 'Тёмная тема',
            'load-file': 'Загрузить файл',
            'download-md': 'Скачать MD',
            'download-html': 'Скачать HTML'
        }
    };
    
    let currentLang = 'ru';
    
    // Инициализация Marked.js
    marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: function(code, lang) {
            return code;
        }
    });
    
    // Функция перевода
    function translate(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = translations[lang][key];
        });
        
        // Обновляем текст кнопки темы
        const themeBtnText = themeToggle.querySelector('span');
        if (document.body.classList.contains('dark-theme')) {
            themeBtnText.setAttribute('data-i18n', 'light-theme');
        } else {
            themeBtnText.setAttribute('data-i18n', 'dark-theme');
        }
        themeBtnText.textContent = translations[lang][themeBtnText.getAttribute('data-i18n')];
    }
    
    // Функция обновления превью
    function updatePreview() {
        const markdown = editor.value;
        const html = marked.parse(markdown);
        const cleanHtml = DOMPurify.sanitize(html);
        preview.innerHTML = cleanHtml;
    }
    
    // Функция обновления счетчика символов
    function updateCharCount() {
        const count = editor.value.length;
        const charsText = document.querySelector('#char-count span').textContent;
        charCount.innerHTML = `${count} <span data-i18n="characters">${translations[currentLang]['characters']}</span>`;
    }
    
    // Загрузка файла
    function loadFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            editor.value = e.target.result;
            updatePreview();
            updateCharCount();
        };
        reader.readAsText(file);
    }
    
    // Скачивание файла
    function downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Инициализация
    updatePreview();
    updateCharCount();
    translate(currentLang);
    
    // Обработчики событий
    editor.addEventListener('input', function() {
        updatePreview();
        updateCharCount();
    });
    
    copyBtn.addEventListener('click', function() {
        const html = preview.innerHTML;
        navigator.clipboard.writeText(html)
            .then(() => {
                copyBtn.classList.add('copied');
                const copyText = copyBtn.querySelector('span');
                const originalText = copyText.textContent;
                copyText.textContent = currentLang === 'ru' ? 'HTML скопирован!' : 'HTML copied!';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyText.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Ошибка копирования: ', err);
                alert(currentLang === 'ru' 
                    ? 'Не удалось скопировать HTML. Проверьте разрешения браузера.' 
                    : 'Failed to copy HTML. Check browser permissions.');
            });
    });
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        const themeBtnText = themeToggle.querySelector('span');
        if (document.body.classList.contains('dark-theme')) {
            themeBtnText.setAttribute('data-i18n', 'light-theme');
        } else {
            themeBtnText.setAttribute('data-i18n', 'dark-theme');
        }
        themeBtnText.textContent = translations[currentLang][themeBtnText.getAttribute('data-i18n')];
    });
    
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        translate(newLang);
        langToggle.textContent = newLang === 'ru' ? 'EN/RU' : 'RU/EN';
    });
    
    loadFileBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            loadFile(e.target.files[0]);
        }
    });
    
    downloadMdBtn.addEventListener('click', function() {
        if (editor.value.trim() === '') {
            alert(currentLang === 'ru' 
                ? 'Редактор пуст. Нечего скачивать.' 
                : 'Editor is empty. Nothing to download.');
            return;
        }
        downloadFile(editor.value, 'markdown.md', 'text/markdown');
    });
    
// В функции downloadHtmlBtn.addEventListener('click', ...)
downloadHtmlBtn.addEventListener('click', function() {
    if (editor.value.trim() === '') {
        alert(currentLang === 'ru' 
            ? 'Редактор пуст. Нечего скачивать.' 
            : 'Editor is empty. Nothing to download.');
        return;
    }
    
    // Создаём полный HTML-документ со стилями
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Export</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #2c3e50;
            margin-top: 1.5em;
        }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5em; }
        h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        code {
            font-family: 'Fira Code', monospace;
            background-color: #f5f5f5;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.9em;
        }
        pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
        pre code { background: none; padding: 0; }
        blockquote {
            border-left: 4px solid #4CAF50;
            padding: 0.5em 1em;
            margin: 1em 0;
            background-color: rgba(76, 175, 80, 0.05);
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
            border: 1px solid #ddd;
            padding: 0.75em;
            text-align: left;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;
    
    downloadFile(htmlContent, 'preview.html', 'text/html');
});
    
    // Поддержка табуляции в textarea
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
    
    // Пример Markdown при первой загрузке
    if (editor.value.trim() === '') {
        editor.value = `# ${translations[currentLang]['title']}

${translations[currentLang]['subtitle']}

## ${currentLang === 'ru' ? 'Основные возможности' : 'Main features'}

- ${currentLang === 'ru' ? 'Редактирование Markdown' : 'Markdown editing'}
- ${currentLang === 'ru' ? 'Просмотр HTML-результата' : 'HTML preview'}
- ${currentLang === 'ru' ? 'Поддержка всех базовых элементов Markdown' : 'Support for all basic Markdown elements'}

\`\`\`javascript
// ${currentLang === 'ru' ? 'Пример кода' : 'Code example'}
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

> ${currentLang === 'ru' ? 'Это цитата' : 'This is a quote'}`;
        updatePreview();
        updateCharCount();
    }
});