🌍 Epic Kenya Platform


Epic Kenya Platform is a full-stack travel discovery and social interaction platform where users explore destinations across Kenya, upload experiences, interact with other travelers, and share content.

The platform combines destination discovery, social engagement, and community-driven travel experiences.


🚀 Core Features
🌍 Destination Explorer
Users can:

Browse travel destinations in Kenya

View images and travel experiences

Discover popular locations

Explore community-shared content

👤 User Authentication
Secure authentication system with:

User registration

Login with JWT

Protected routes

Token-based API access

Session persistence

📷 Media Gallery System
Users can share travel experiences by:

Uploading destination photos

Adding captions

Viewing images from other travelers

Gallery features include:

Image cards

Caption display

Destination filtering

Lazy loading

❤️ Engagement System
Users can interact with content through:

Likes

Comments

Image discussions

Community engagement

Real-Time Notifications

The platform provides real-time activity updates using WebSockets.

Users receive instant notifications when:

Someone likes their image

Someone comments on their post

Someone replies to their comment

This creates an interactive social experience similar to modern social platforms.

💬 Live Chat Between Travelers

Epic Kenya includes a real-time chat system that allows travelers to communicate directly.

Features include:

Instant messaging between users

Real-time message delivery

Persistent chat conversations

WebSocket-based communication

This allows travelers to:

Share travel tips

Ask questions about destinations

Connect with other explorers

✏️ Content Management
Content owners can:

Edit captions

Delete their images

Edit their comments

Delete their comments

Ownership protection ensures users only manage their own content.

🧠 System Architecture
React Frontend
      │
      │ Axios API Layer
      ▼
Express REST API
      │
      │ Controllers
      ▼
MySQL Database
This architecture ensures:

Modular frontend logic

Clean API separation

Secure authentication flow

Scalable backend services

🏗️ Tech Stack
Frontend
React

Axios

CSS

React Hooks

Custom Hooks

Backend
Node.js

Express.js

JWT Authentication

Multer (file uploads)

Database
MySQL

Realtime (Planned)
Socket.io

📂 Project Structure
Epic-Kenya-Platform
│
├── backend
│   ├── controllers
│   │   galleryController.js
│   │   authController.js
│   │
│   ├── routes
│   │   galleryRoutes.js
│   │   authRoutes.js
│   │
│   ├── middleware
│   │   authenticate.js
│   │   uploadConfig.js
│   │
│   └── server.js
│
├── frontend
│   ├── components
│   │   ImageCard.js
│   │   CommentItem.js
│   │
│   ├── hooks
│   │   useGallery.js
│   │
│   ├── services
│   │   galleryService.js
│   │
│   ├── pages
│   │   GalleryPage.js
│   │
│   └── styles
│        ImageCard.css
│
└── README.md
⚙️ Installation

cd epic-kenya-platform
💻 Backend Setup
cd backend
npm install
Create .env

PORT=5000
JWT_SECRET=supersecret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=epic_kenya
Run backend

npm run dev
Backend runs on:

http://localhost:5000
🖥️ Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:

http://localhost:3000
🔗 API Overview
Authentication
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
Gallery
Method	Endpoint
GET	/api/gallery
POST	/api/gallery/upload
PUT	/api/gallery/:id
DELETE	/api/gallery/:id
Engagement
Method	Endpoint
POST	/api/gallery/:id/like
POST	/api/gallery/:id/comment
PUT	/api/comments/:id
DELETE	/api/comments/:id
🔐 Authentication Flow
User Login
    │
    ▼
JWT Token Generated
    │
    ▼
Stored in Browser Storage
    │
    ▼
Axios Interceptor attaches token
    │
    ▼
Protected API Access
📷 Image Upload Flow
User Upload
     │
     ▼
React Upload Form
     │
     ▼
Axios API Request
     │
     ▼
Express Route
     │
     ▼
Multer Upload Middleware
     │
     ▼
Image stored in /uploads
     │
     ▼
Image metadata stored in MySQL