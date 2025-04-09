#!/bin/sh

echo "⏳ Waiting for MongoDB to be ready..."

# Wait for MongoDB to be reachable
until nc -z db 27017; do
  echo "⏳ MongoDB not yet available..."
  sleep 2
done

echo "✅ MongoDB is up. Running Prisma tasks..."

# Run Prisma generate + push + seed
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts

echo "🚀 Starting the backend server..."
npm start
