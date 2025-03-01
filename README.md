# 🛠️ Authentication App - Frontend (Next.js 15+)

🚀 **Live Demo:** [Frontend Deployed on Vercel](https://yolo-frontend-eight.vercel.app)  
🌐 **Backend API:** [Backend Deployed on Render](https://yolo-backend-mvyt.onrender.com)

## **📌 Overview**
This is the **frontend** of an authentication system built with **Next.js 15+**, **TypeScript**, **Tailwind CSS**, and **JWT Authentication**. It allows users to:
- 🔹 Sign up, log in, and edit their profile.
- 🔹 Authenticate using a secure **NestJS backend**.
- 🔹 View user data after logging in.
- 🔹 Logout securely.

## **⚡ Tech Stack**
- **Next.js 15+** (React Framework)
- **TypeScript**
- **Tailwind CSS** (For styling)
- **Axios** (For API calls)
- **Vercel** (Deployment)

---

## **🚀 How to Run the Frontend Locally**

### **1️1 Clone the Repository**
```sh
git clone https://github.com/yourusername/frontend.git
cd frontend
```
### **2 Install Dependencies**
```sh
npm install
```

### **3 Configure Environment Variables**
- Create a .env.local file in the root directory:
```sh
NEXT_PUBLIC_BACKEND_URL=https://yolo-backend-mvyt.onrender.com
```
-  If running the backend locally, use:
  ```sh
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### **4 Start the Development Server**
```sh
npm run dev
```

- **Frontend will be available at http://localhost:3000.**

## 📌 API Endpoints (Consumed by Frontend)

- **`POST /auth/signup`** → Register a new user  
- **`POST /auth/login`** → Authenticate user & return JWT  
- **`GET /auth/me`** → Get logged-in user info (Protected)  
- **`POST /auth/logout`** → Logout user  
- **`GET /user/profile`** → Fetch user profile (Protected)  
- **`PUT /user/profile`** → Update user profile (Protected)  

📌 **These API endpoints are handled by the backend**.
