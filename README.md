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
- SQLite database
- RESTful API architecture
- CORS configured for cross-origin requests

**Package Manager:**

- pnpm for both frontend and backend

## Prerequisites

- Node.js (v22 or higher)
- pnpm package manager

To install pnpm if you don't have it:

```bash
npm install -g pnpm
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

**Database:** SQLite database (`database.sqlite`) will be automatically created on first run.

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

For development, you need to run both servers concurrently. Open two separate terminals:

**Terminal 1 (Backend):**

```bash
cd server
pnpm dev
```

**Terminal 2 (Frontend):**

```bash
cd client
pnpm dev
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
│   │   ├── lib/          # Utilities and data fetching
│   │   ├── types/        # TypeScript type definitions
│   │   └── main.tsx      # App entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── db/
│   │   ├── model.js      # Database initialization
│   │   └── queries.js    # Database queries
│   ├── routes/
│   │   └── posts.js      # Post routes
│   ├── middlewares/
│   │   └── cors.js       # CORS configuration
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

## Author

Nelson Izquierdo <izquierdonelson@gmail.com>

## License

ISC
