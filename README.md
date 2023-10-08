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

Set the `GOOGLE_OAUTH_TOKEN` variable in `.env.local` to the google api calendar token (oauth2 with admin access) [Example on how to generate api url]([https://](https://blog.postman.com/how-to-access-google-apis-using-oauth-in-postman/))

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

## How to use

1. Add an email for the organizer
2. Connect with a wallet (i.e trust wallet)
   1. Have in mind we are using ETH on Sepelia, so you would need to add it if it does not exist in your wallet
3. Add the required information and set up the date + hs
   1. You will see on the bottom of the screen the details
4. Click on "create meeting" buttomm, the smart contract will be executed and if successful the meeting api call will be sent to google, creating the calendar event

Note: This is a messy POC, we are not checking the input data, so it might be faulty, same with the smart contract and api calls