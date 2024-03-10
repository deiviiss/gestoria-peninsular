# Development
Steps to start the app in development

1. Set up the db
```
docker-compose up -d
```
2. Copy to .env.example and rename to .env
3. Replace the enviroment variables
4. Execute the command:
```
npm install
```
5. Execute these prisma commands:
```
npx prisma migrate dev; npx prisma generate
```
6. Run server with command:
```
npm run dev
```
7. Execute SEED [create local database](http://localhost:3000/api/seed)

# Notes - users default
user: admin@mail.com
password: admin123

user: user1@mail.com
password: user1

# Prisma commands
```
npx prisma migrate dev
npx prisma generate
```
