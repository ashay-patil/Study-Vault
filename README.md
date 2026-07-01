# 📘 Study Vault: Upload, Discover & Empower Student Learning Instantly

Study Vault is a full-stack MERN application designed to solve the real-world problem of ineffective note-sharing among students. Traditionally, students rely on social media messengers like WhatsApp or Telegram to exchange study materials, but these platforms are not built for academic resource management—notes get mixed up with unrelated messages, important files are lost in group chats, and there is no mechanism to judge the quality of content. Study Vault addresses this by offering a dedicated platform where students can securely upload notes, organize resources, and explore materials shared by peers. Each uploaded file can be downloaded in just a few clicks, while a built-in 5-star rating system and commenting feature enable peer-based quality evaluation, ensuring that the best resources stand out. On the backend, the platform uses OTP-based authentication for secure sign-ups, Cloudinary for scalable and lightning-fast file delivery, and a clean MVC architecture with route protection, input validation, and custom error handling for reliability. By combining security, scalability, and collaborative features, Study Vault not only streamlines academic resource sharing but also builds a trustworthy knowledge ecosystem that helps students learn faster, smarter, and together.

---

### Working

The **Study Vault** project streamlines the process of sharing and accessing academic resources through a secure and user-friendly platform. Here’s how it works:

1. **User Registration & Verification**
   - New users sign up with their email and password.
   - An OTP is sent to their email for verification, ensuring only genuine users gain access.
   - Passwords are securely hashed before storage.

2. **Login & Authentication**
   - Users log in using their credentials.
   - JWT tokens are issued for secure, persistent sessions.

3. **Uploading Resources**
   - Authenticated users can upload notes and study materials (PDFs).
   - Files are validated and uploaded directly to Cloudinary for fast, reliable storage.
   - Users can add metadata (title, subject, semester, description) to make resources easily discoverable.

4. **Resource Management**
   - Users have a personal dashboard to view, edit, or delete their uploaded study resources.
   - All actions are protected to ensure only the owner can modify their content.

5. **Exploring & Downloading**
   - Anyone (even without an account) can browse, search, and filter the study resources by title, subject, semester, or description.
   - Resources are displayed with details and can be downloaded instantly via secure Cloudinary links.

6. **Review & Rating System**
   - Logged-in users can rate resources (1–5 stars) to help others assess quality.
   - Ratings are displayed for each resource.

7. **Security & Validation**
   - All forms are validated on backend using Joi to prevent invalid data.
   - API endpoints are protected, with authorization.

8. **Performance & Scalability**
   - Pagination ensures fast browsing even with a large number of resources.
   - Cloudinary integration guarantees quick file delivery and scalability.

In summary, Study Vault offers a seamless, secure, and efficient way for students to share and discover study materials, empowering collaborative learning and academic success.

---

## 🚀 Features

### 🔐 **Robust User Authentication & Security**

* Register and Login with hashed passwords using **bcrypt**
* OTP-based email verification powered by **Nodemailer** for trusted user registration
* JWT-based authentication

### ☁️ **Cloud-Integrated Resource Management**

* Drag-and-drop upload of PDFs to **Cloudinary** using **Multer**
* Resource type auto-detection for flawless file compatibility
* Real-time storage and public-access handling for seamless delivery

### 📂 **Personalized Resource Dashboard**

* Upload your own notes from a private panel with Delete, Edit Functionality.
* Authenticated access control ensures data safety and user privacy

### 🔍 **Explore & Discover Without Signup**

* Search and view academic resources freely without even creating an account
* Instant rendering of all resource details with pagination.

### ⭐ **Review System for Collaborative Quality Control**

* Leave star ratings (1 to 5) on each resource
* An Idea which helps future users assess quality and relevance quickly

### 📄 **Instant PDF Downloads**

* Every file is hosted on **Cloudinary** with secure public links
* Download the resource directly with two-three clicks &#x20;

### 🎯 **Smart Filtering & Pagination**

* Filter by semester, title, subject, and description.
* Paginated results offer fast and smooth browsing experience even at scale

### 🧼 **Data Validation with Joi**

* Frontend and backend form validation using **Joi** ensures secure and clean data
* Prevents malformed entries and protects database integrity

### 🔗 **Seamless API Communication with Axios**

* Modular API calls powered by **Axios**
* Easy state management with consistent response handling across the app

---

## 🛠️ Tech Stack

### 🔧 Backend (Node.js)

* Express.js&#x20;
* MongoDB Atlas + Mongoose ODM
* JSON Web Tokens (JWT) for authentication
* **Joi** for validation
* **Multer** for file upload handling
* **Cloudinary SDK** for cloud storage
* **Nodemailer** for OTP email delivery

### 🎨 Frontend (React.js)

* Modular React components and pages
* Routing with **React Router DOM**
* API calls using **Axios**
* Responsive design using plain CSS

### 🐳 DevOps

* **Docker** & **Docker Compose** for containerized local development
* Multi-service orchestration with health checks and env-based configuration

---

## 🐳 Docker Support

Study Vault can be run entirely with **Docker** and **Docker Compose**, so you don't need to install Node.js locally or run the frontend and backend in separate terminals. Each service runs in its own container, and Compose wires them together from the project root.

### 📁 Docker Files

| File | Purpose |
|---|---|
| `docker-compose.yml` | Orchestrates the backend and frontend services |
| `Backend/Dockerfile` | Builds and runs the Express API |
| `Frontend/Dockerfile` | Builds and runs the Vite + React dev server |
| `Backend/.dockerignore` | Excludes `node_modules`, `.env`, etc. from the backend image |
| `Frontend/.dockerignore` | Excludes `node_modules`, `dist`, `.env`, etc. from the frontend image |

### ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                     docker compose up                       │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
   ┌──────────────────────┐       ┌──────────────────────┐
   │   backend container  │       │  frontend container  │
   │   (Node 20 Alpine)   │       │   (Node 20 Alpine)   │
   │                      │       │                      │
   │  node app.js         │       │  npm run dev         │
   │  port 3000           │       │  port 5173           │
   └──────────┬───────────┘       └───────────┬──────────┘
              │                               │
              ▼                               ▼
   ┌─────────────────────┐       Browser opens http://localhost:5173
   │  MongoDB Atlas      │       API calls go to http://localhost:3000
   │  Cloudinary         │
   │  (via .env secrets) │
   └─────────────────────┘
```

1. **Backend container**
   - Built from `Backend/Dockerfile` using the official `node:20-alpine` image.
   - Installs dependencies, copies the source code, and starts the server with `node app.js`.
   - Reads configuration from `Backend/.env` at runtime (the `.env` file is **not** copied into the image for security).
   - Connects to **MongoDB Atlas** and **Cloudinary** over the internet using credentials from the env file.
   - Exposes port **3000** to your machine.

2. **Frontend container**
   - Built from `Frontend/Dockerfile` using the same Node Alpine base image.
   - Installs dependencies and runs the Vite dev server with `npm run dev`.
   - The compose file adds `--host 0.0.0.0` so the app is reachable from outside the container.
   - Exposes port **5173** to your machine.

3. **Docker Compose orchestration**
   - **`env_file`** — injects `Backend/.env` into the backend container (e.g. `MONGO_URI`, `JWT_SECRET`, Cloudinary keys).
   - **`healthcheck`** — pings `http://localhost:3000/` inside the backend container to confirm the server is up.
   - **`depends_on` with `service_healthy`** — the frontend starts only after the backend passes its health check, not just after the container begins starting.
   - **`restart: unless-stopped`** — containers automatically restart if they crash or after a system reboot.

### 🔑 Environment Setup

Create a `Backend/.env` file before running Docker (this file stays on your machine and is loaded at runtime):

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_OWNER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Also ensure **MongoDB Atlas → Network Access** allows connections from your IP (or `0.0.0.0/0` for development).

### 🚀 Running with Docker

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

From the project root:

```bash
# Build and start both services (foreground — logs in terminal)
docker compose up

# Or run in detached mode (background)
docker compose up -d

# Stop containers
docker compose stop

# Restart containers
docker compose start

# Stop and remove containers
docker compose down

# View logs (when running detached)
docker compose logs -f

# Check container status
docker compose ps
```

Once running, open:

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |

The frontend sends API requests to `http://localhost:3000`. Because the backend port is published to your host, this works when both containers are running via Compose.


---

## 🌟 Why Will You Love Study Vault

* ✅ Clean MVC structure & modular codebase
* ✅ Full JWT-based authentication with secure cookies
* ✅ Cloudinary file hosting with error-free PDF access
* ✅ OTP-based email verification like real-world apps
* ✅ Validated forms to prevent data pollution
* ✅ Elegant UI + seamless UX for all users

This is not just a CRUD app. Study Vault embodies product thinking, developer empathy, and practical problem-solving ability.

---

## 📈 Impact

* 100% real-world use case
* Solves a common pain point for students of searching notes here and there
* Easy to scale with MongoDB & Cloudinary

---

## 🤝 Contribute & Collaborate

Pull requests, ideas, and improvements are highly encouraged! Whether you're a fellow student or a seasoned dev, let’s make academic collaboration smarter together.

---

## 🧠 Crafted with passion by a student for all the students.

Because sharing knowledge should be **simple, secure, and fast.**

---
## Owner

Ashay Patil

## Happy Coding !!

