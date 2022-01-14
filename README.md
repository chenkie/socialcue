# SocialCue

Welcome to SocialCue! 👋

This is the demo app used in [**How To Prisma**](https://howtoprisma.com). It's built with Next.js, TypeScript, Tailwind, and a bunch of other great libraries.

It's a social media scheduling app that does just about everything except actually publishing the posts 😄

![app screenshot](https://res.cloudinary.com/dkpz9r2q7/image/upload/v1642022319/Screen_Shot_2022-01-12_at_4.18.10_PM_dijbo4.png)

## Installation and Running the App

Clone the repo and install dependencies.

```bash
# npm
npm install

# yarn
yarn
```

## Sync Prisma Schema into `dev.db`

This project uses [SQLite](https://www.sqlite.org/index.html), a small and fast database engine that is great for local development and testing.

The project doesn't come with the SQLite database file included. Instead, the file gets created on the fly by Prisma.

The database file is called `dev.db` and it's found in the `prisma` directory.

Use Prisma's `db push` command to generate the database file and sync the schema found in `prisma/schema.prisma`.

```bash
# npm
npx prisma db push

# yarn
yarn prisma db push
```

## Seed the Database

The project comes with a file to seed the database with some initial data. It's found in `prisma/seed.ts`.

Use Prisma's `db seed` command to get some initial data in place.

```bash
# npm
npx prisma db seed

# yarn
yarn prisma db seed
```

## Run the App

Use Next.js's devleopment server to start the app.

```bash
# npm
npm run dev

# yarn
yarn run dev
```

## License

MIT
