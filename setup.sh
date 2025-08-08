#!/bin/bash

echo "🚀 Setting up Coder - SAAS Coding Education Platform"
echo "=================================================="

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first."
    echo "   Install from: https://bun.sh"
    exit 1
fi

# Check Bun version
BUN_VERSION=$(bun --version)
echo "✅ Bun version: $BUN_VERSION"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker is installed"

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    echo "   - On macOS: Open Docker Desktop"
    echo "   - On Linux: Run 'sudo systemctl start docker'"
    echo "   - On Windows: Start Docker Desktop"
    exit 1
fi

echo "✅ Docker is running"

# Install dependencies
echo "📦 Installing dependencies..."
bun install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Start PostgreSQL container
echo "🐳 Starting PostgreSQL container..."
bun run docker:up

if [ $? -ne 0 ]; then
    echo "❌ Failed to start PostgreSQL container"
    echo "   Make sure Docker is running and try again"
    exit 1
fi

echo "✅ PostgreSQL container started"

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Generate database schema
echo "🗄️ Generating database schema..."
bun run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate database schema"
    exit 1
fi

echo "✅ Database schema generated"

# Run database migrations
echo "🔄 Running database migrations..."
bun run db:migrate

if [ $? -ne 0 ]; then
    echo "❌ Failed to run database migrations"
    exit 1
fi

echo "✅ Database migrations completed"

# Seed the database
echo "🌱 Seeding database with sample data..."
bun run db:seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded successfully"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
DATABASE_URL=postgres://postgres:password@localhost:5432/coder_saas
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
EOF
    echo "✅ .env.local file created"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📝 Demo Credentials:"
echo "   Admin: admin@coder.com / admin123"
echo "   Teacher: teacher@coder.com / teacher123"
echo "   Student: student@coder.com / student123"
echo ""
echo "🚀 To start the development server, run:"
echo "   bun run dev"
echo ""
echo "🌐 Then open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, see the README.md file" 