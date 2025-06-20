# 🌌 CodeShare Galaxy – Real-Time Code Collaboration Platform

## 📘 Description
**CodeShare Galaxy** is a sleek, real-time collaborative coding platform that allows users to instantly share and edit code with others via dynamic room-based URLs. Inspired by CodeShare, it enables seamless peer-to-peer editing without any login — just share the link and start collaborating.

---

## 🚀 Features

- ✍️ Real-time collaborative code editing
- 🌐 Custom sharable URLs (e.g., `/galactic-void-65`)
- 🔌 Socket.IO-based room management
- 🖥️ Code changes instantly visible across users in the same room
- 📤 Public folder-based deployment (Render-ready)
- 🚫 No login/signup needed — instant access and sharing

---

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Real-Time Engine**: Socket.IO  
- **Deployment**: Render  
- **Room Routing**: Dynamic room ID generator via URL

---

## 📦 Setup Instructions

### 🔧 Prerequisites
- Node.js and npm installed
- Internet connection (for deployment or socket communication)

### ▶️ Run the Application Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/codeshare-galaxy.git

# 2. Navigate into the project
cd codeshare-galaxy

# 3. Install dependencies
npm install

# 4. Start the server
node server.js

# 5. Open browser and visit
http://localhost:3000
```

> To join or create a room, just navigate to `/your-room-id` (e.g., `/galactic-void-65`).

---

## 🌐 Deployment

The project is fully compatible with **Render**:

- Place all frontend files in the `/public` folder
- Set the start command to `node server.js`
- Add a web service with port `3000`

Live example:  
`https://codeshare-galaxy.onrender.com/galactic-void-65`

---

## 💡 Future Enhancements

- 🎨 Syntax highlighting and theme toggling
- 🧠 AI code suggestions or autocomplete
- 📄 Multiple file support per session
- 🔐 Optional login for history/saved sessions

---

## 📄 License

This project is licensed under the **MIT License**.  
Use it freely, modify, and contribute to enhance collaborative coding!

---

## 👤 Author

**Ritikh**  
*Final-year CSE Student | Full Stack Dev | Real-Time Web App Enthusiast*
