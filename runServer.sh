#!/bin/bash

# Directory where npm run dev will be executed
PROJECT_DIR="/home/ubuntu/ClassCompass/server"

# Name for the screen session
SCREEN_NAME="class-compass-server"

# Create a new detached screen session and execute npm run dev
screen -dmS $SCREEN_NAME bash -c "cd $PROJECT_DIR && bun i && bunx prisma generate && bun dev"

echo "New screen session created and npm run dev started in $PROJECT_DIR"
