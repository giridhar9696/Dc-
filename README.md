# APL Interactive Logistics Website

A responsive, static logistics website with an animated 3D globe, an in-page shipment information widget, and a MyAPL authentication experience backed by Supabase.

## Features

- Interactive globe-led homepage with responsive navigation
- Quick-access shipment widget for tracking, schedules, and pricing
- MyAPL sign-in and account creation with email/password authentication
- Google sign-in integration through Supabase Auth
- Direct links to APL local offices, the CMA CGM Group, and the company purpose site
- Static GitHub Pages deployment with no build step

## Run locally

From this directory, start any static file server. For example:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000/](http://localhost:8000/).

## Project structure

- `index.html` — homepage and 3D globe experience
- `sign-in.html` — MyAPL authentication page
- `assets/apl-overrides.js` — homepage links, actions, and shipment widget behavior
- `assets/apl-ui.css` — APL interface and authentication styling
- `assets/apl-auth.js` — Supabase email/password and Google authentication
- `assets/`, `css/`, and `js/` — exported site media, styles, and scripts
- `.github/workflows/static.yml` — GitHub Pages deployment workflow

## Supabase authentication

The browser client uses a Supabase publishable key. To make Google sign-in work, enable the Google provider in the Supabase dashboard and configure the Google OAuth client with this callback URL:

```text
https://oyzyeifwtbzyxyukvgia.supabase.co/auth/v1/callback
```

Add the deployed site URL and `http://localhost:8000/sign-in.html` to the allowed redirect URLs in Supabase Authentication settings.

Never commit a Supabase service-role key or a Google OAuth client secret.

## Deployment

Pushes to `main` trigger the included GitHub Pages workflow. In the repository settings, set Pages to use **GitHub Actions** as its source.

## License

This repository contains a customized website implementation and third-party exported assets. Review the applicable brand and asset licenses before production use.
