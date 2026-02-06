# Challenge React Node

A full-stack CRUD application built with React and Node.js for managing posts.

## Technology Stack

**Frontend:**

- React 19 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Radix UI components
- Modern React patterns (hooks, TypeScript)

**Backend:**

- Express.js server
- PostgreSQL database
- RESTful API architecture
- CORS configured for cross-origin requests
- Docker for containerized database

**Package Manager:**

- pnpm for both frontend and backend

## Prerequisites

- Node.js (v22 or higher)
- pnpm package manager
- Docker Desktop (for PostgreSQL database)

To install pnpm if you don't have it:

```bash
npm install -g pnpm
```

## Quick Start (Docker)

The fastest way to get started is using Docker for the PostgreSQL database:

```bash
# Clone and navigate to project
cd challenge-tcit-react-node

# Start PostgreSQL container
cd server
docker-compose up -d

# Setup database and install dependencies
pnpm db:testconn  # Test database connection
pnpm db:migrate   # Create tables
pnpm db:seed      # Insert sample data

# Start backend server
pnpm dev

# In another terminal, start frontend
cd ../client
pnpm install
pnpm dev
```

## Docker Setup

### Starting the PostgreSQL Database

```bash
cd server
docker-compose up -d
```

This will:
- Start PostgreSQL 16 in a Docker container
- Use the credentials from `.env.example`
- Expose the database on port 5432
- Persist data in a Docker volume

### Stopping the Database

```bash
cd server
docker-compose down
```

### Resetting the Database

```bash
cd server
docker-compose down -v  # Remove volume (deletes all data)
docker-compose up -d
pnpm db:migrate
pnpm db:seed
```

## Environment Configuration

Copy the example environment file and configure your database credentials:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your PostgreSQL configuration:

```env
DB_HOST="localhost"
DB_USER="postgres"
DB_PASSWORD="superpassword"
DB_NAME="challenge_db"
DB_PORT="5432"
PORT="3000"
```

For the Docker setup, you can use the default credentials:
- User: `postgres`
- Password: `superpassword`
- Database: `challenge_db`

## Database Setup

### Test Database Connection

```bash
cd server
pnpm db:testconn
```

### Run Database Migration

Creates the `posts` table:

```bash
cd server
pnpm db:migrate
```

### Seed Database with Sample Data

Inserts sample posts for development:

```bash
cd server
pnpm db:seed
```

### Database Schema

The `posts` table structure:
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
pnpm install
```

Start the backend server:

```bash
pnpm dev
```

The server will run on `http://localhost:3000`

## Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd client
pnpm install
```

Start the frontend development server:

```bash
pnpm dev
```

The frontend will run on `http://localhost:5173` (Vite default)

## Development Workflow

For development, you need to run both servers concurrently. Open three separate terminals:

**Terminal 1 (Database - Docker):**

```bash
cd server
docker-compose up -d
```

**Terminal 2 (Backend):**

```bash
cd server
pnpm dev
```

**Terminal 3 (Frontend):**

```bash
cd client
pnpm dev
```

### Development Commands Summary

```bash
# Database setup (one-time)
cd server
docker-compose up -d
pnpm db:testconn
pnpm db:migrate
pnpm db:seed

# Start development servers
# Terminal 1
cd server && pnpm dev

# Terminal 2  
cd client && pnpm dev
```

The frontend is configured to make API requests to `http://localhost:3000`.

## API Endpoints

The following endpoints are available at `http://localhost:3000`:

- `GET /posts` - Retrieve all posts
- `POST /posts` - Create a new post
  - Body: `{ "nombre": "string", "descripcion": "string" }`
- `DELETE /posts/:id` - Delete a post by ID

## Project Structure

```
challenge-tcit-react-node/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── Form.tsx  # Post creation form
│   │   │   └── PostsTable.tsx # Posts display table
│   │   ├── lib/          # Utilities and data fetching
│   │   ├── state/        # Redux store and slices
│   │   ├── types/        # TypeScript type definitions
│   │   └── main.tsx      # App entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── db/
│   │   ├── pool.js       # PostgreSQL connection pool
│   │   ├── migrate.js    # Database migration script
│   │   ├── seed.js       # Database seeding script
│   │   ├── test-conn.js  # Database connection test
│   │   ├── model.js      # Database model (legacy)
│   │   └── queries.js    # Database queries
│   ├── routes/
│   │   └── posts.js      # Post routes
│   ├── middlewares/
│   │   └── cors.js       # CORS configuration
│   ├── docker-compose.yml # PostgreSQL container config
│   ├── .env.example      # Environment variables template
│   ├── .env              # Environment variables (gitignored)
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## Features

- **Display posts** in a table format
- **Filter posts** by name
- **Create new posts** via form
- **Delete posts** with a single click
- **Real-time updates** when data changes
- **PostgreSQL database** with proper schema and migrations
- **Docker support** for easy database setup
- **Environment configuration** for flexible deployment

## Available Scripts

### Backend Scripts (server/)

- `pnpm dev` - Start development server with hot reload
- `pnpm db:testconn` - Test database connection
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data

### Frontend Scripts (client/)

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL container is running
docker ps

# Test database connection
cd server
pnpm db:testconn

# Restart database container
docker-compose restart
```

### Port Conflicts

If port 5432 is already in use:
```bash
# Edit docker-compose.yml to use a different port
ports:
  - "5433:5432"  # Use port 5433 instead
```

### Reset Database

```bash
cd server
docker-compose down -v  # Remove all data
docker-compose up -d
pnpm db:migrate
pnpm db:seed
```

### Environment Variables

Make sure your `.env` file matches the Docker configuration:
```env
DB_HOST="localhost"
DB_USER="postgres"
DB_PASSWORD="superpassword"
DB_NAME="challenge_db"
DB_PORT="5432"
```

## Author

Nelson Izquierdo <izquierdonelson@gmail.com>

## License

ISC
