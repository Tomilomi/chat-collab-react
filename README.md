# chat-collab

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![SignalR](https://img.shields.io/badge/SignalR-realtime-512BD4?style=flat&logo=dotnet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-264de4?style=flat&logo=css3&logoColor=white)

Frontend de un chat en tiempo real, hecho como proyecto de aprendizaje para explorar WebSockets con SignalR. Tiene estética de terminal pixel art con efecto CRT.

## Stack

- React + Vite
- SignalR para la comunicación en tiempo real
- CSS Modules + NES.css + Tailwind
- Fuentes: Press Start 2P, VT323, Departure Mono

## Features

- Chat en tiempo real con SignalR
- Sistema de roles: Admin, Moderator, User
- Kick y ban de usuarios
- Eliminación de mensajes con animación glitch
- Paginación de mensajes con scroll infinito
- Perfil de usuario con cambio de avatar, username y contraseña
- Actualizacion en tiempo real del avatar y username en mensajes anteriores
- Efecto CRT global con scanlines

## Getting started
```bash
git clone https://github.com/Tomilomi/chat-collab-react
cd chat-collab-react
npm install
```

Crear un archivo `.env` en la raíz:
```
VITE_API_URL=http://localhost:5135
```
```bash
npm run dev
```

> El backend está en [chat-in-realtime-collab](https://github.com/Tomilomi/chat-in-realtime-collab)

## Contributors

[@Tomilomi](https://github.com/Tomilomi) — frontend  
[@Mudo0](https://github.com/Mudo0) — backend