#!/bin/bash

# Metro Boom - Деплой на удаленный сервер с Mac
# Сервер: Ubuntu 24.04 LTS
# IP: 89.104.67.245

SERVER_IP="89.104.67.245"
SERVER_USER="${1:-root}"  # Можно передать пользователя как аргумент
SERVER_PATH="/opt/metro-boom"

echo "🚀 Metro Boom - Деплой на сервер"
echo "================================"
echo ""
echo "Сервер: $SERVER_USER@$SERVER_IP"
echo "Путь: $SERVER_PATH"
echo ""

# Проверка SSH подключения
echo "🔗 Проверка подключения к серверу..."
if ! ssh -o ConnectTimeout=5 "$SERVER_USER@$SERVER_IP" "echo 'OK'" &> /dev/null; then
    echo "❌ Не удалось подключиться к серверу"
    echo ""
    echo "Проверьте:"
    echo "1. Правильность IP адреса: $SERVER_IP"
    echo "2. Имя пользователя: $SERVER_USER"
    echo "3. SSH ключ или пароль"
    echo ""
    echo "Использование: ./deploy-to-server.sh [username]"
    echo "Пример: ./deploy-to-server.sh root"
    exit 1
fi
echo "✅ Подключение успешно"
echo ""

# Создание директории на сервере
echo "📁 Создание директории на сервере..."
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH"

# Синхронизация файлов
echo "📤 Загрузка файлов на сервер..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    --exclude 'logs' \
    --exclude '.DS_Store' \
    --exclude 'PUBLIC_URL.txt' \
    ./ "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"

# Запуск деплоя на сервере
echo ""
echo "🔨 Запуск деплоя на сервере..."
ssh "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && chmod +x server/*.sh && ./server/deploy-ubuntu.sh"

echo ""
echo "✅ Деплой завершен!"
echo ""
echo "🌐 Сайт доступен: http://$SERVER_IP"
echo ""
