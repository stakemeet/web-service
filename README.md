# Web-server

## Configuration

### Set up a Postgres database

Set up a Postgres database locally or use your favorite provider.

### Configure environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (this will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set the `DATABASE_URL` variable in `.env.local` to the connection uri of your postgres database.

### Apply migrations

To setup up the migrations, use:

```bash
npm run migrate:up
# or
yarn migrate:up
```

### Start Next.js in development mode

```bash
npm run dev
# or
yarn dev
```

Your app should now be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

## Deploy on Vercel

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
