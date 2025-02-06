# Используем официальный образ Node.js в качестве базового
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Указываем команду для запуска приложения
CMD ["serve", "-s", "dist"]

# Указываем порт, который будет использоваться
EXPOSE 3000