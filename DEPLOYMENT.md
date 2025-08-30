# PWA Deployment Guide

راهنمای کامل دیپلوی اپلیکیشن PWA ردیاب ارز

## 🚀 Platform Deployment

### Vercel (Recommended)

#### 1. Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login
```

#### 2. Deploy
```bash
# Deploy to Vercel
vercel --prod

# Or use the dashboard
# Push to GitHub and connect to Vercel
```

#### 3. Environment Variables
```bash
# Set in Vercel dashboard
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### 4. PWA Configuration
- ✅ Automatic HTTPS
- ✅ Service Worker support
- ✅ Edge caching
- ✅ Automatic builds

### Netlify

#### 1. Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login
```

#### 2. Deploy
```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

#### 3. Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"
    Service-Worker-Allowed = "/"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "no-cache"
```

### GitHub Pages

#### 1. Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "next build && next export && gh-pages -d out"
```

#### 2. Deploy
```bash
npm run deploy
```

#### 3. Configuration
Update `next.config.mjs`:
```javascript
const nextConfig = {
  // ... existing config
  basePath: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
}
```

## 🔧 PWA-Specific Configuration

### 1. HTTPS Requirement
PWA requires HTTPS in production:
- Vercel: ✅ Automatic
- Netlify: ✅ Automatic
- GitHub Pages: ✅ Automatic
- Custom server: ⚠️ Manual setup required

### 2. Service Worker Registration
Ensure service worker is accessible:
```typescript
// In your PWA hook
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};
```

### 3. Manifest Accessibility
Verify manifest is accessible:
```bash
# Test manifest accessibility
curl https://your-domain.com/manifest.json
```

## 📱 Mobile Deployment

### iOS (Safari)

#### 1. Meta Tags
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Currency Tracker">
<link rel="apple-touch-icon" href="/web-app-manifest-192x192.png">
```

#### 2. Splash Screen
Create `public/apple-touch-startup-image.png`:
- 2048x2732 for iPad Pro
- 1668x2388 for iPad Air
- 1536x2048 for iPad

### Android (Chrome)

#### 1. Manifest Configuration
```json
{
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

#### 2. Icon Sizes
Ensure all icon sizes are available:
- 192x192 (required)
- 512x512 (required)
- 144x144 (recommended)
- 96x96 (recommended)

## 🔍 PWA Validation

### 1. Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

### 2. Chrome DevTools
1. Open DevTools (F12)
2. Go to Application tab
3. Check:
   - Service Workers
   - Manifest
   - Storage
   - Cache

### 3. PWA Builder
Visit [PWA Builder](https://www.pwabuilder.com/) to validate your PWA.

## 🚀 Performance Optimization

### 1. Image Optimization
```bash
# Optimize icons
npm install -g imagemin-cli
imagemin public/*.png --out-dir=public/optimized
```

### 2. Bundle Analysis
```bash
# Analyze bundle
npm run pwa:analyze
```

### 3. Caching Strategy
```typescript
// Service Worker caching
const CACHE_NAME = 'currency-tracker-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/api/currencies'
];
```

## 🔒 Security Considerations

### 1. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 2. Service Worker Security
```typescript
// Validate requests
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    // Handle same-origin requests
  }
});
```

### 3. HTTPS Enforcement
```typescript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## 📊 Analytics & Monitoring

### 1. Google Analytics
```typescript
// Add to _app.tsx or layout.tsx
import { useEffect } from 'react';

useEffect(() => {
  if (process.env.NEXT_PUBLIC_GA_ID) {
    // Initialize GA
  }
}, []);
```

### 2. PWA Metrics
Track key PWA metrics:
- Install rate
- Engagement
- Offline usage
- Performance

### 3. Error Monitoring
```typescript
// Service Worker error handling
self.addEventListener('error', (event) => {
  console.error('SW Error:', event.error);
  // Send to monitoring service
});
```

## 🔄 Update Strategy

### 1. Service Worker Updates
```typescript
// Check for updates
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 2. App Updates
```typescript
// Notify user of updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

## 🧪 Testing

### 1. Local Testing
```bash
# Build and test locally
npm run build
npm run start

# Test PWA features
# - Install prompt
# - Offline functionality
# - Service worker
```

### 2. Device Testing
Test on multiple devices:
- iOS Safari
- Android Chrome
- Desktop browsers
- Different screen sizes

### 3. Network Testing
Test offline scenarios:
- Turn off WiFi
- Use DevTools offline mode
- Test cache functionality

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/optimizing/progressive-web-apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## 🆘 Troubleshooting

### Common Issues

#### 1. Service Worker Not Registering
- Check HTTPS requirement
- Verify file path
- Check browser console errors

#### 2. Install Prompt Not Showing
- Ensure PWA criteria met
- Check manifest validity
- Verify service worker

#### 3. Offline Not Working
- Check cache configuration
- Verify service worker scope
- Test cache storage

#### 4. Icons Not Loading
- Verify icon paths
- Check file formats
- Ensure proper sizes

### Debug Commands
```bash
# Clear service worker cache
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});

# Clear browser cache
# DevTools > Application > Storage > Clear storage
```

---

**نکته مهم**: همیشه قبل از دیپلوی، PWA را در محیط محلی تست کنید و از عملکرد صحیح تمام ویژگی‌ها اطمینان حاصل کنید.
