
# Neighbor.ly

Neighbor.ly is a full-stack web application designed to streamline apartment management for both residents and administrators. It provides a centralized platform for handling grievances, payments, and communication within a residential community.

## Features

- **Admin Dashboard:**
  - Manage apartments, floors, and flats.
  - View and manage resident information.
  - Create and update maintenance tickets/grievances.
  - Track payment history and update due rent.
  - View notification history.

- **User Dashboard:**
  - View apartment details and member information.
  - Create and track personal grievances.
  - View payment history and pay rent.
  - Access a list of administrators.

- **Authentication:**
  - Secure login for both administrators and users.
  - Role-based access control to differentiate between admin and user functionalities.

## Tech Stack

- **Frontend:**
  - React.js with Vite
  - JavaScript
  - CSS

- **Backend:**
  - Node.js with Express.js
  - PostgreSQL
  - Prisma ORM

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### Installation and Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/neighbor.ly.git
   cd neighbor.ly
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add your PostgreSQL database URL:
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
     ```
   - Apply database migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   ```bash
   cd frontend/Neighbor.ly
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

The application should now be running on your local machine.

## Folder Structure

```
/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── prisma/
│   └── routes/
└── frontend/
    └── Neighbor.ly/
        ├── public/
        └── src/
            ├── admin/
            ├── land/
            ├── Login/
            ├── shared/
            ├── sides/
            └── user/
```
