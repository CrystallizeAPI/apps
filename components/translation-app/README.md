# Crystallize Translation App

This is the Crystallize Translation App to be injected like a Custom View

## Requirements

A Crystallize App injects a signature to notify the current tenant and it requires HTTPS.
Therefore, even locally, you need HTTPS.

You need:

-   Caddy Server
-   Node 20
-   PNPM

Also you need `translation-app.crystallize.app.local` to point to `127.0.0.1`

When you are all set you can install the app for development.

## Install

Create the `.env` file from the `.env.dist` file.

```bash
cp .env.dist .env
```

> `.env` is in the `.gitignore` on purpose, you don't want to commit that secret file.

Then open the `.env` and update the values.

Then you can

```bash
make install
```

This will install the dependencies.

## Run the project

```bash
make serve
```

Please not that won't following URL won't work directly in your browser like an usual project. It expects a signature from Crystallize to set up the Cookie and other parameters to setup the context.

So you can go ahead in your Crystallize Tenant Settings > Build > Custom Views

Add a Custom View and input this string:

`https://translation-app.crystallize.app.local/?itemId={{itemId}}&fromLanguage={{language}}&variantId={{variantId}}`

## Hosting

This project is running with Remix Run 2.1 and there you can host it almost anywhere
