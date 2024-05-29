#!/bin/sh

# Start MongoDB without authentication and with binding to all IPs
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip_all & 
MONGOD_PID=$!

# Wait for MongoDB to start
while ! mongo --port $MONGO_REPLICA_PORT --eval "db.stats()"; do
    sleep 1
done

# Initiate the replica set
mongo --eval "rs.initiate({_id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }]});"

# Keep the container running
echo "REPLICA SET ONLINE"
wait $MONGOD_PID


# Start MongoDB in the background
# mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 &
# MONGOD_PID=$!

# # Prepare the replica set initialization command
# INIT_REPL_CMD="rs.initiate({_id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }]})"

# # Wait for MongoDB to start by checking the connection to the port
# while ! mongo --port $MONGO_REPLICA_PORT --eval "db.stats()"; do
#     sleep 1
# done

# # Initiate the replica set
# mongo admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"

# # Keep the container running
# echo "REPLICA SET ONLINE"
# wait $MONGOD_PID

