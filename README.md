# Web-server

## Configuration

### Set up a Postgres database

Set up a Postgres database locally or use your favorite provider. You can do this by running `local-docker-dummy` And your url would be something like "postgresql://postgres:dudeThisIsInsecure!@localhost:5432"

### Configure environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (this will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set the `DATABASE_URL` variable in `.env.local` to the connection uri of your postgres database.

Set the `PROJECT_ID` variable in `.env.local` to the walletconnect project ID

Set the `GOOGLE_CALENDAR_ID` variable in `.env.local` to the calendar ID

Set the `GOOGLE_OAUTH_TOKEN` variable in `.env.local` to the google api calendar token (oauth2 with admin access)

### Apply migrations

To setup up the migrations, use:

```bash
npm run migrate:up
# or
yarn migrate:up
```

### Start Next.js in development mode

```bash
make run
```
