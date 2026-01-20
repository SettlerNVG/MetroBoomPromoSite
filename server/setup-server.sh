#!/bin/bash

# Metro Boom - Первоначальная настройка Ubuntu сервера
# Сервер: Ubuntu 24.04 LTS
# IP: 89.104.67.245

set -e

echo "🔧 Metro Boom - Настройка Ubuntu сервера"
echo "========================================="
echo ""

# Обновление системы
echo "📦 Обновление системы..."
sudo apt-get update
sudo apt-get upgrade -y

# Установка необходимых пакетов
echo "📦 Установка необходимых пакетов..."
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    ufw

# Установка Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Установка Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
    echo "✅ Docker установлен"
else
    echo "✅ Docker уже установлен"
fi

# Установка Docker Compose
if ! command -v docker compose &> /dev/null; then
    echo "🐳 Установка Docker Compose..."
    sudo apt-get install -y docker-compose-plugin
    echo "✅ Docker Compose установлен"
else
    echo "✅ Docker Compose уже установлен"
fi

# Настройка файрвола
echo "🔥 Настройка файрвола..."
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable
echo "✅ Файрвол настроен"

# Создание директории для проекта
echo "📁 Создание директории проекта..."
sudo mkdir -p /opt/metro-boom
sudo chown $USER:$USER /opt/metro-boom

echo ""
echo "✅ Сервер настроен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Скопируйте проект на сервер:"
echo "   scp -r . user@89.104.67.245:/opt/metro-boom/"
echo ""
echo "2. Подключитесь к серверу:"
echo "   ssh user@89.104.67.245"
echo ""
echo "3. Запустите деплой:"
echo "   cd /opt/metro-boom"
echo "   ./server/deploy-ubuntu.sh"
echo ""
