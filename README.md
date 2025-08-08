# Coder - SAAS Coding Education Platform

A modern SAAS platform for learning to code with interactive challenges, similar to freeCodeCamp. Built with Next.js 15, Hono 4, better-auth, Drizzle ORM, and PostgreSQL.

## Features

- **Three User Roles**: Admin, Teacher, Student
- **Interactive Coding Challenges**: Real-time code execution and testing
- **Class Management**: Teachers can create classes and add students
- **Progress Tracking**: Monitor learning progress with detailed analytics
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS 4
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Backend**: Hono 4 with RPC for API routes
- **Authentication**: better-auth 1.3.4 (modern auth library)
- **Database**: PostgreSQL with Drizzle ORM 0.30.10
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.1.11
- **Containerization**: Docker for PostgreSQL
- **Package Manager**: Bun (fast, reliable JavaScript runtime)

## Port Configuration

The application runs on two ports:

- **Frontend (Next.js)**: `http://localhost:3000`
- **Backend (Hono API)**: `http://localhost:3002`

### Running the Application

#### Option 1: Frontend Only (Development)

```bash
bun run dev
```

- Runs Next.js on port 3000
- Uses Next.js API routes for backend functionality

#### Option 2: Full Stack (Recommended)

```bash
# Terminal 1: Start the Hono backend server
bun run dev:server

# Terminal 2: Start the Next.js frontend
bun run dev
```

#### Option 3: Both Servers (Single Command)

```bash
bun run dev:all
```

_Note: Requires `concurrently` package_

## Authentication Setup

This project uses **better-auth**, a modern authentication library that provides a clean API for user authentication. The setup follows the [official Better Auth Next.js integration documentation](https://www.better-auth.com/docs/integrations/next).

### Better Auth Configuration

- **Server-side**: Configured in `src/auth/config.ts` with `nextCookies` plugin
- **Client-side**: Configured in `src/lib/auth-client.ts`
- **API Routes**: Handled in `src/app/api/auth/[...all]/route.ts`
- **Middleware**: Authentication middleware in `src/middleware.ts`
- **Database**: Uses Drizzle adapter for PostgreSQL

### Key Features

- **Server Actions**: Full support for Next.js server actions with automatic cookie handling
- **RSC Support**: Server-side session checking in React Server Components
- **Middleware**: Optimistic redirects for protected routes
- **Type Safety**: Full TypeScript support throughout

### Environment Variables

```env
# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Prerequisites

- Bun (JavaScript runtime & package manager)
- Docker and Docker Compose

## 🚀 Quick Start

### **Prerequisites**

- [Bun](https://bun.sh/) (JavaScript runtime)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [Node.js](https://nodejs.org/) (for some tools)

### **1. Clone and Setup**

```bash
git clone <your-repo-url>
cd coder
bun install
```

### **2. Environment Setup**

```bash
cp env.example .env
# Edit .env with your configuration
```

### **3. Database Setup**

```bash
# Start PostgreSQL
bun run docker:up

# Generate and run migrations
bun run db:generate
bun run db:migrate

# Seed with sample data
bun run db:seed
```

### **4. Start Development Servers**

```bash
# Start both frontend and backend
bun run dev:all

# Or start them separately:
# Frontend (Next.js)
bun run dev

# Backend (Hono API)
bun run dev:server
```

### **5. Access the Application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002
- **Database Studio**: http://localhost:8080 (Drizzle Studio)

## 📱 Mobile Development

This project also supports mobile development using Capacitor! You can build native iOS and Android apps.

### **Quick Mobile Setup**

```bash
# Build for mobile platforms
bun run build:mobile

# Start backend server (required for mobile)
bun run dev:server

# Open in mobile IDE
bun run cap:open:ios      # Requires Xcode
bun run cap:open:android  # Requires Android Studio
```

For detailed mobile setup instructions, see [MOBILE_SETUP.md](./MOBILE_SETUP.md).

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (proxies to Hono)
│   │   └── auth/          # Better Auth API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── demo/              # Demo challenge page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── auth/                  # Authentication configuration
│   └── config.ts          # Better Auth server config
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-provider.tsx # Auth provider
│   ├── challenge-editor.tsx # Code editor
│   └── dashboard-content.tsx # Dashboard content
├── db/                   # Database configuration
│   ├── index.ts          # Database connection
│   └── schema.ts         # Drizzle schema
├── lib/                  # Utility functions
│   └── auth-client.ts    # Better Auth client
├── scripts/              # Database scripts
│   └── seed.ts           # Database seeding
└── server/               # Hono server
    ├── index.ts          # API routes
    └── server.ts         # Server entry point
```

## Database Schema

### Users

- `id`: UUID primary key
- `email`: Unique email address
- `name`: Full name
- `password`: Hashed password
- `role`: 'admin' | 'teacher' | 'student'
- `createdAt` / `updatedAt`: Timestamps

### Classes

- `id`: UUID primary key
- `name`: Class name
- `description`: Class description
- `teacherId`: Reference to teacher user
- `isActive`: Boolean flag
- `createdAt` / `updatedAt`: Timestamps

### Challenges

- `id`: UUID primary key
- `title`: Challenge title
- `description`: Challenge description
- `instructions`: Detailed instructions
- `starterCode`: Initial code template
- `solution`: Expected solution
- `tests`: JSON array of test cases
- `difficulty`: 'easy' | 'medium' | 'hard'
- `category`: Challenge category
- `order`: Display order
- `classId`: Optional class reference
- `isActive`: Boolean flag
- `createdAt` / `updatedAt`: Timestamps

### Submissions

- `id`: UUID primary key
- `challengeId`: Reference to challenge
- `studentId`: Reference to student user
- `code`: Submitted code
- `status`: 'pending' | 'passed' | 'failed'
- `testResults`: JSON test results
- `submittedAt`: Timestamp

## Available Scripts

- `bun run dev` - Start Next.js development server (port 3000)
- `bun run dev:server` - Start Hono backend server (port 3001)
- `bun run dev:all` - Start both servers (requires concurrently)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run db:generate` - Generate database schema
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with sample data
- `bun run docker:up` - Start PostgreSQL container
- `bun run docker:down` - Stop PostgreSQL container

## Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/coder_saas
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
HONO_SERVER_URL=http://localhost:3002
```

## Demo Credentials

After running the seed script, you can use these credentials:

- **Admin**: admin@coder.com / admin123
- **Teacher**: teacher@coder.com / teacher123
- **Student**: student@coder.com / student123

## Development

### Adding New Challenges

1. Create a new challenge in the database:

```sql
INSERT INTO challenges (title, description, instructions, starter_code, solution, tests, difficulty, category, "order")
VALUES (
  'Hello World',
  'Write a function that returns "Hello, World!"',
  'Create a function called helloWorld that returns the string "Hello, World!"',
  'function helloWorld() {\n  // Your code here\n}',
  'function helloWorld() {\n  return "Hello, World!";\n}',
  '[{"input": "", "expected": "Hello, World!"}]',
  'easy',
  'JavaScript',
  1
);
```

### Adding New Components

1. Create the component in `src/components/`
2. Import and use in your pages
3. Follow the shadcn/ui patterns for consistency

### API Development

1. Add new routes in `src/server/index.ts`
2. Use Hono's built-in validation and middleware
3. Follow the existing patterns for error handling

## Latest Updates

### Version Updates (Latest)

- **Next.js**: 15.4.5
- **React**: 19.1.1
- **TypeScript**: 5.9.2
- **Tailwind CSS**: 4.1.11
- **Hono**: 4.8.12
- **Drizzle ORM**: 0.30.10
- **better-auth**: 1.3.4
- **ESLint**: 9.32.0
- **Bun**: Latest runtime & package manager

### New Features

- Tailwind CSS 4 with improved performance
- Next.js 15 with enhanced App Router
- Hono 4 with better TypeScript support
- Latest React 19.1.1 features
- Improved TypeScript 5.9.2 configuration
- Bun for faster package management and runtime
- Better Auth for modern authentication

## Why Bun?

- **Speed**: 30x faster than npm for package installation
- **Runtime**: Built-in JavaScript runtime with TypeScript support
- **Compatibility**: Works with existing Node.js packages
- **Developer Experience**: Better error messages and faster development

## Deployment

### Production Build

1. Set up environment variables
2. Run database migrations
3. Build the application:
   ```bash
   bun run build
   bun run start
   ```

### Docker Deployment

1. Create a `Dockerfile` for the application
2. Use Docker Compose for the full stack
3. Set up proper environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact the development team.
