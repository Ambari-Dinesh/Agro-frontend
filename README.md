FRONTEND REPO LINK----https://github.com/Ambari-Dinesh/Agro-frontend
BACKEND REPO LINK----https://github.com/Ambari-Dinesh/Agro-backend


🥦 Fruit & Vegetable Bulk Ordering Platform
A full-stack application that allows users to order fresh fruits and vegetables in bulk. It supports user login, admin product management, and order tracking.

📁 Project Structure
bash
Copy
Edit
fruit-veg-ordering-platform/
│
├── backend/              # Express.js + PostgreSQL
├── frontend/             # React.js (Admin & Buyer Interfaces)
├── README.md


💻 Frontend Setup (React)
1. Navigate to Frontend

cd ../frontend


2. Install Dependencies

npm install



3. Create .env File
Create a .env file in the frontend directory:


VITE_API_URL=http://localhost:5000
Make sure this URL points to your running backend server.

4. Start the React App
npm run dev
The frontend will be available at: http://localhost:5173





👤 Features
Buyer
View products

Place orders

View order status

Login/Register

Admin
Login

Add/Delete products

Manage orders (Update status)

📸 Screenshots
Add screenshots here if desired

📦 Deployment (Optional)
You can deploy:

Frontend: on Vercel or Netlify

Backend: on Render, Railway, or VPS (with PostgreSQL)

Database: Railway or Supabase for managed PostgreSQL