# Задание
Необходимо создать простое веб-приложение, которое позволяет пользователям искать репозитории на GitHub по имени пользователя и отображать информацию о найденных репозиториях. Используйте GitHub API для получения данных: GitHub Repositories API.

## Стэк
- Vite
- TypeScript
- React
- Redux Toolkit
- framer-motion
- CSS Modules
- Axios
- Docker, Docker Compose

## Запуск приложения
### Локально

- Клонируйте репозиторий: ```git clone git@github.com:kersss71/github_search.git```  
- Перейдите в папку проекта: ```cd <название папки>```
- Установите зависимости: ```npm install```
- Запустите проект: ```npm run dev```  
В браузере перейдите по адресу ```https://localhost:5173```  
  
### В Docker контейнере
- Убедитесь, что Docker установлен и запущен
- Создайте Docker образ и запустите контейнер:  
```docker-compose build```  
```docker-compose up```  
В браузере перейдите по адресу ```https://localhost:3000```
- Чтобы завершить: ```docker-compose down```