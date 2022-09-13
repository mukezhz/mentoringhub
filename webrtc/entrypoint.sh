#!/bin/sh
echo "migrating prisma to db"
npx prisma generate
npx prisma migrate deploy
echo "running program"
node index.js