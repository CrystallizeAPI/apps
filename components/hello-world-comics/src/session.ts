import { createCookieSessionStorage } from "@remix-run/node";
import crypto from "crypto";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secrets: [crypto.createHash('md5').update(`${process.env.CRYSTALLIZE_SIGNING_SECRET}`).digest('hex')],
        secure: true,
    },
});

export { getSession, commitSession, destroySession };
