# Project Dependancies

- Express TS
- MongoDB
- To install packages, run on top level folder:

```
npm install
```

# Development

- install Prettier vscode extension
- use `npm run dev` to use `nodemon` to see changes
- make sure to run `npm run build` before running the dev script

- run script below for standard express server start
```
npm start
```
OR
- run script below to watch changes to `.ts` files within the repo (hot reload)
```
npm run dev
```

# Accessing MongoDB

1. create `.env` file
2. check Google Drive for username and password
3. declare and set `MONGO_USER` and `MONGO_PASSWORD` in .env
4. set `MONGO_DB` in .env to select which database to access

```
MONGO_USER = <git username>_db
MONGO_PASSWORD = <password>
MONGO_DB = <db name>
```

# PORT

1. declare and set PORT in .env file (default: 9000)

```
PORT = 3000
```
