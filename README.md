# FastAPI Notes Frontend

This is the frontend application for the FastAPI Notes project. It is built using **Next.js**, **Tailwind CSS**, and **Axios** for API communication.

## 🚀 Features

- Create, Read, Update, Delete (CRUD) notes
- Responsive and clean UI
- Integrated with FastAPI backend
- Toast notifications for success and errors
- Reusable components

## 🧠 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## 📁 Project Structure

```
fastapi-notes-frontend/
├── components/         # Reusable UI components
├── pages/              # Page routes (index, notes, etc.)
├── utils/              # Axios config and helpers
├── public/             # Static files
├── styles/             # Tailwind and global styles
├── .env.local          # API base URL config
├── package.json        # Dependencies and scripts
```

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/bisher-muhammed/fastapi-notes-frontend.git
cd fastapi-notes-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

> Make sure the FastAPI backend is running on this URL.

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🔗 Backend Repository

[FastAPI Notes Backend](https://github.com/bisher-muhammed/fastapi-notes)



