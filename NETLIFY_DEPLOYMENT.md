# Netlify Deployment Guide

Your Imposter Party Game is now ready to deploy on Netlify! This app runs entirely in the browser (no backend server needed), making it perfect for Netlify's static hosting.

## Quick Deploy Options

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository
   - Netlify will auto-detect the settings from `netlify.toml` ✅
   - Click "Deploy"

3. **That's it!** Your app will be live at `your-site-name.netlify.app`

### Option 2: Drag & Drop Deploy

1. **Build locally**
   ```bash
   vite build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `dist/public` folder onto the page
   - Your site will be live instantly!

### Option 3: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

## Configuration Files

The following files have been created for Netlify deployment:

### `netlify.toml`
```toml
[build]
  command = "vite build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `public/_redirects`
```
/*    /index.html   200
```

This ensures client-side routing works correctly (all routes redirect to index.html).

## Build Settings (if configuring manually)

If Netlify doesn't auto-detect your settings:

- **Build command:** `vite build`
- **Publish directory:** `dist/public`
- **Node version:** 18 or higher (Netlify default works fine)

## Testing Your Build Locally

Before deploying, you can test the production build:

```bash
# Build the app
vite build

# Preview the build (optional - requires installing serve)
npx serve dist/public
```

## Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your site in Netlify Dashboard
2. Click "Domain settings"
3. Click "Add custom domain"
4. Follow the instructions to configure your DNS

## Environment Variables

This app doesn't need any environment variables since it runs entirely client-side!

## Notes

- **No backend needed:** The game logic runs entirely in the browser
- **Fast builds:** Typical build time is ~10 seconds
- **Free hosting:** Netlify's free tier is perfect for this app
- **Automatic HTTPS:** All Netlify sites get free SSL certificates
- **Global CDN:** Your app will be fast worldwide

## Troubleshooting

**Issue:** Build fails with module errors
- **Solution:** Make sure all dependencies are installed (`npm install`)

**Issue:** Routes return 404
- **Solution:** The `_redirects` file should be in the `public` folder (already done ✅)

**Issue:** Build succeeds but site is blank
- **Solution:** Check that publish directory is set to `dist/public` (already configured ✅)

## Support

For Netlify-specific issues, check:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community Forums](https://answers.netlify.com)

---

**Your app is ready to deploy! 🚀**
