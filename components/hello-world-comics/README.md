# Hello World Comics

---

This repository is what we call a "subtree split": a read-only copy of one directory of the main repository.

If you want to report or contribute, you should do it on the main repository: https://github.com/CrystallizeAPI/apps

---

This is an example of a Crystallize App.

You can find more information on the app mechanism here: https://crystallize.com/learn/user-guides/getting-started/apps

## What does it do

The example app:
- fetches comics from the public tenants
- checks the signature if the SIGNING SECRET is set in the environment variables.
- provide an example of running behing HTTPs with Caddy for local development

## Local development with HTTPs

Crystallize apps MUST run on top of HTTPS for security reasons.

To work locally, the application must there be behind HTTPs, you can use `ngrok` (or similar) to proxy it.

The simplest is to create a `.local` domain name that can be used with Caddy

### Using /etc/hosts

```
127.0.0.1 helloworld.crystallize.app.local
```

### Using dnsmasq

```bash
brew install dnsmasq
echo "address=/.crystallize.app.local/127.0.0.1" >> /opt/homebrew/etc/dnsmasq.conf
sudo mkdir -p /etc/resolver && echo "nameserver 127.0.0.1" > /etc/resolver/local
sudo brew services restart dnsmasq
```


