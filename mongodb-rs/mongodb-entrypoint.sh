#!/bin/sh

# Start MongoDB without authentication
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip_all & 
MONGOD_PID=$!

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to start..."
until mongo --port $MONGO_REPLICA_PORT --eval "db.stats()" >/dev/null 2>&1; do
    sleep 1
done

# Initiate the replica set
echo "⚙️ Initiating replica set..."
mongo --port $MONGO_REPLICA_PORT --eval "rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] });"

# Wait for it to settle
sleep 3

# Create a root user for authentication
echo "🔐 Creating root user for MongoDB..."
mongo admin --port $MONGO_REPLICA_PORT --eval "db.createUser({ user: 'root', pwd: 'example', roles: [ { role: 'root', db: 'admin' } ] });"

# (Optional) Create the app user Prisma will use (if not using root)
# mongo admin --port $MONGO_REPLICA_PORT -u root -p example --authenticationDatabase admin --eval \
# "db.createUser({ user: 'appuser', pwd: 'appuserpassword', roles: [ { role: 'readWrite', db: 'admin' } ] });"

echo "✅ MongoDB initialized with root user."

# Keep container running
wait $MONGOD_PID
