# Workout Tracker

A full-stack application for tracking workouts, exercises, and sets. Built with a TypeScript/React frontend and a Node.js/Express backend using Prisma ORM for database management.

## Features

- User authentication
- Create, update, and delete workouts
- Add exercises and sets to workouts
- Responsive dashboard for tracking progress
- Modern UI with modals and dialogs

## Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** Prisma ORM (with migrations)

## Project Structure

```
frontend/    # React app (UI, pages, components)
backend/     # Node.js/Express API, Prisma schema, migrations
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up the database:
   - Configure your database in `prisma/schema.prisma`.
   - Run migrations:
     ```bash
     npx prisma migrate dev
     ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend app:
   ```bash
   npm run dev
   ```

### Environment Variables

- Configure environment variables for authentication and database connections as needed in `.env` files in both `frontend` and `backend`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Lint code

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
