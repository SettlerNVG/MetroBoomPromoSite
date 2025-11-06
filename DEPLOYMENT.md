# 🚀 Руководство по деплою Metro Boom Site

## Быстрый старт

### 1. Подготовка сервера

Убедитесь, что на сервере установлены:
- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)

```bash
# Проверка версий
docker --version
docker-compose --version
```

### 2. Установка Docker (если не установлен)

#### Ubuntu/Debian
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

#### CentOS/RHEL
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. Клонирование проекта

```bash
# Через Git
git clone <your-repo-url>
cd metro-boom-site

# Или загрузите архив и распакуйте
```

### 4. Добавление изображений

Поместите фотографии команды в `public/images/`:
```bash
public/images/
├── denis.jpg
├── vladislav.jpg
├── vladimir.jpg
└── nikita.jpg
```

### 5. Запуск деплоя

```bash
# Сделайте скрипт исполняемым (если еще не сделано)
chmod +x deploy.sh

# Запустите деплой
./deploy.sh
```

## Детальная настройка

### Изменение порта

Отредактируйте `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Замените 8080 на нужный порт
```

### Настройка домена

1. Настройте DNS записи для вашего домена
2. Обновите `nginx.conf`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    # ... остальная конфигурация
}
```

### SSL/HTTPS с Let's Encrypt

Создайте `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  metro-boom-site:
    build: .
    container_name: metro-boom-site
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

## Управление сервисом

### Просмотр логов
```bash
# Все логи
docker-compose logs

# Последние 100 строк
docker-compose logs --tail=100

# Следить за логами в реальном времени
docker-compose logs -f
```

### Перезапуск
```bash
docker-compose restart
```

### Остановка
```bash
docker-compose down
```

### Полная очистка
```bash
docker-compose down -v
docker system prune -a
```

## Обновление сайта

### Метод 1: Через Git
```bash
git pull
./deploy.sh
```

### Метод 2: Ручное обновление
```bash
# Остановите контейнер
docker-compose down

# Обновите файлы
# ... скопируйте новые файлы ...

# Пересоберите и запустите
./deploy.sh
```

## Мониторинг

### Проверка статуса
```bash
docker-compose ps
```

### Использование ресурсов
```bash
docker stats metro-boom-site
```

### Проверка доступности
```bash
curl http://localhost
```

## Резервное копирование

### Создание бэкапа
```bash
# Создайте архив проекта
tar -czf metro-boom-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  .
```

### Восстановление из бэкапа
```bash
# Распакуйте архив
tar -xzf metro-boom-backup-YYYYMMDD.tar.gz

# Запустите деплой
./deploy.sh
```

## Troubleshooting

### Проблема: Порт уже занят
```bash
# Найдите процесс, использующий порт
sudo lsof -i :80

# Остановите процесс или измените порт в docker-compose.yml
```

### Проблема: Недостаточно памяти
```bash
# Проверьте использование памяти
free -h

# Увеличьте swap или оптимизируйте сборку
```

### Проблема: Ошибка сборки Docker
```bash
# Очистите Docker кэш
docker system prune -a

# Пересоберите без кэша
docker-compose build --no-cache
```

### Проблема: Сайт не открывается
```bash
# Проверьте логи
docker-compose logs

# Проверьте статус контейнера
docker-compose ps

# Проверьте firewall
sudo ufw status
sudo ufw allow 80/tcp
```

## Производительность

### Оптимизация Nginx
Отредактируйте `nginx.conf` для увеличения производительности:
```nginx
worker_processes auto;
worker_connections 1024;

# Включите кэширование
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;
```

### Мониторинг производительности
```bash
# Установите ctop для мониторинга контейнеров
docker run --rm -ti \
  --name=ctop \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  quay.io/vektorlab/ctop:latest
```

## Безопасность

### Обновление зависимостей
```bash
npm audit
npm audit fix
```

### Firewall настройки
```bash
# Ubuntu/Debian
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Регулярные обновления
```bash
# Обновите Docker образы
docker-compose pull
docker-compose up -d
```

## CI/CD интеграция

### GitHub Actions пример
Создайте `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/metro-boom-site
            git pull
            ./deploy.sh
```

## Контакты поддержки

При возникновении проблем обращайтесь к команде разработки Metro Boom.
