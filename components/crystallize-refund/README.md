# Crystallize Refund App

This is the Crystallize Refund App

## Requirements

A Crystallize App injects a signature to notify the current tenant and it requires HTTPS.
Therefore, even locally, you need HTTPS.

Moreover this kind of app requires to share the cookie with `.crystallize.com`, therefore the local development will have a custom domain.
Here: `refunds.app.crystallize.com`

You need:

-   `mkcert`
-   Caddy Server
-   Node 18

## Install

```bash
make install
```

This will install the Certificates, and the dependencies.

## Run the project

```bash
make serve
```

> https://refunds.app.crystallize.com/

From there you can install it on a Crystallize tenant.
