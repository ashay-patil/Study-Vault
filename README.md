# 📘 Study Vault: Upload, Discover & Empower Student Learning Instantly

**Study Vault** is a feature-rich, full-stack MERN application designed to revolutionize the way students access and share academic resources. Built with precision, performance, and purpose, it enables users to seamlessly upload, explore, and download notes, PDFs, and study materials with just a few clicks.

From OTP-secured registration to blazing-fast Cloudinary file delivery, this project demonstrates industry-level architecture, secure authentication, optimized file handling, and clean code structure—everything a modern web app should offer.

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

---

## 🌟 Why Will You Love Study Vault

> “Build what solves a real problem. Architect it like a pro.”

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

## Happy Coding !!
