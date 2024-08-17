const ws = new WebSocket('ws://' + location.host);

const editor = document.getElementById('editor');

// Отправка изменений текста на сервер
editor.addEventListener('input', () => {
    ws.send(editor.value);
});

// Получение изменений текста с сервера
ws.onmessage = (event) => {
    editor.value = event.data;
};
