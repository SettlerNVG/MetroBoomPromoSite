#!/bin/bash

# Metro Boom - Деплой на Ubuntu сервер
# Сервер: Ubuntu 24.04 LTS
# IP: 89.104.67.245

set -e

echo "🚀 Metro Boom - Деплой на Ubuntu сервер"
echo "========================================"
echo ""

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "📦 Установка Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "✅ Docker установлен"
fi

# Проверка Docker Compose
if ! docker compose version &> /dev/null; then
    echo "📦 Установка Docker Compose..."
    sudo apt-get update
    sudo apt-get install -y docker-compose-plugin
    echo "✅ Docker Compose установлен"
fi

# Остановка старого контейнера
echo "🛑 Остановка старого контейнера..."
docker compose down 2>/dev/null || true

# Сборка и запуск
echo "🔨 Сборка проекта..."
docker compose build --no-cache

echo "🚀 Запуск контейнера..."
docker compose up -d

# Проверка статуса
echo ""
echo "📊 Проверка статуса..."
sleep 3
docker compose ps

echo ""
echo "✅ Деплой завершен!"
echo ""
echo "🌐 Сайт доступен по адресу:"
echo "   http://89.104.67.245"
echo ""
echo "📋 Полезные команды:"
echo "   docker compose logs -f    # Логи"
echo "   docker compose restart    # Перезапуск"
echo "   docker compose down       # Остановка"
echo ""
