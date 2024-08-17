const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Инициализация Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Отправка сообщений всем подключенным клиентам
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Обработка соединений WebSocket
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.broadcast(data);
    });
});

// Подключение статических файлов
app.use(express.static('public'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, function listening() {
    console.log(`Server is listening on port ${PORT}`);
});
