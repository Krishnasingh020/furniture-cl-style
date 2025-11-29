# Kalium Furniture — Local Setup

This project runs a single Node.js server that handles both the backend API and serves the frontend pages with dynamic content.

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally)

## Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd kalium_furniture/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Seed the database:**
   (Make sure MongoDB is running first)
   ```bash
   npm run seed
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will start on **http://localhost:8000**.

## Accessing the Site

Open your browser to:

- **Home:** [http://localhost:8000/](http://localhost:8000/)


## Troubleshooting

- **Database Connection:** If seeding or starting fails, check that MongoDB is running at `mongodb://127.0.0.1:27017`. You can override this by creating a `.env` file in `backend/` with `MONGO_URI=...`.
- **Port:** The server defaults to port 8000. You can change this by setting `PORT=...` in your `.env` file.
