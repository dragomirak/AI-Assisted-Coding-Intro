# Deploy this site to Netlify

This file describes several simple ways to deploy the `BMI Calculator` static site to Netlify.

## 1) Drag & drop (quick, no CLI)

- Go to https://app.netlify.com/drop
- Drag the `BMI Calculator` folder (or a ZIP of that folder) onto the page. Netlify will upload and deploy it and provide a live URL.

## 2) Netlify CLI (recommended for repeatable deploys)

1. Install Node.js and npm if you don't have them.
2. Install the Netlify CLI globally (PowerShell):

```powershell
npm install -g netlify-cli
```

3. From the repository root (PowerShell), log in and deploy:

```powershell
netlify login
# deploy to a production URL (quotes required because the path contains a space)
netlify deploy --dir="BMI Calculator" --prod
```

Notes:
- If the CLI asks to link to a site, you can run `netlify init` or `netlify link`.
- Use `netlify deploy --dir="BMI Calculator"` (without `--prod`) for draft deploys if you want a temporary URL first.

## 3) Git-based continuous deployment

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In the Netlify UI choose "New site from Git", connect your repo, and set the publish directory to `BMI Calculator` in the build settings.

## Verification and next steps

- After deploying, visit the Netlify-provided URL to verify the site.
- In the Netlify dashboard you can set a custom domain, HTTPS, environment variables, and continuous deploy settings.
- To redeploy manually with the CLI use the `netlify deploy` command above.

## Troubleshooting

- If you see a directory listing or a 404, confirm the publish directory is `BMI Calculator` (case-sensitive on the host).
- If you add a build step in the future, set the build command in `netlify.toml` or in the site settings.
