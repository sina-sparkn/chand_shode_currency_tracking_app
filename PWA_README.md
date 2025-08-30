# Currency Tracker PWA

این اپلیکیشن یک Progressive Web App (PWA) کامل است که برای ردیابی قیمت ارز و طلا طراحی شده است.

## ویژگی‌های PWA

### 🚀 نصب اپلیکیشن
- کاربران می‌توانند اپلیکیشن را روی دستگاه‌های خود نصب کنند
- دکمه "Install App" در header نمایش داده می‌شود
- پشتیبانی از iOS و Android

### 📱 تجربه موبایل
- طراحی responsive برای تمام دستگاه‌ها
- پشتیبانی از gesture های موبایل
- بهینه‌سازی برای صفحه‌نمایش‌های مختلف

### 🔄 کارکرد آفلاین
- Service Worker برای کش کردن داده‌ها
- نمایش اطلاعات ارز حتی در حالت آفلاین
- همگام‌سازی خودکار هنگام اتصال مجدد

### 🔔 اعلان‌ها
- Push Notifications برای به‌روزرسانی قیمت‌ها
- اعلان‌های پس‌زمینه
- مدیریت اعلان‌ها

### 🎨 تم و شخصی‌سازی
- پشتیبانی از تم روشن و تاریک
- تطبیق خودکار با تنظیمات سیستم
- رنگ‌های بهینه برای PWA

## فایل‌های PWA

### Service Worker (`/public/sw.js`)
- مدیریت کش و آفلاین
- Background Sync
- Push Notifications

### Manifest (`/app/manifest.json`)
- تنظیمات نصب اپلیکیشن
- آیکون‌ها و رنگ‌ها
- دسترسی‌ها و مجوزها

### PWA Hook (`/hooks/use-pwa.ts`)
- مدیریت وضعیت نصب
- تشخیص آفلاین/آنلاین
- نمایش prompt نصب

### کامپوننت‌های PWA
- `PWAInstallButton`: دکمه نصب اپلیکیشن
- `OfflineIndicator`: نمایش وضعیت آفلاین

## نحوه استفاده

### نصب اپلیکیشن
1. اپلیکیشن را در مرورگر باز کنید
2. دکمه "Install App" را بزنید
3. اپلیکیشن روی دستگاه شما نصب می‌شود

### استفاده آفلاین
- اپلیکیشن به صورت خودکار داده‌ها را کش می‌کند
- در حالت آفلاین، اطلاعات قبلی نمایش داده می‌شود
- هنگام اتصال مجدد، داده‌ها به‌روزرسانی می‌شوند

### تنظیمات
- تم روشن/تاریک در header قابل تغییر است
- اعلان‌ها در تنظیمات مرورگر قابل مدیریت است

## تست PWA

### Chrome DevTools
1. F12 را بزنید
2. به تب Application بروید
3. Service Workers و Manifest را بررسی کنید

### Lighthouse
1. تب Audits را باز کنید
2. PWA را انتخاب کنید
3. Generate report را بزنید

## نکات فنی

### Service Worker Registration
```typescript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### Manifest Integration
```typescript
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />
```

### PWA Detection
```typescript
const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
```

## بهینه‌سازی

### Performance
- کش کردن فایل‌های استاتیک
- Lazy loading کامپوننت‌ها
- بهینه‌سازی تصاویر

### SEO
- Meta tags کامل
- Open Graph tags
- Twitter Cards
- Sitemap و Robots.txt

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support

## پشتیبانی مرورگر

- ✅ Chrome (Android & Desktop)
- ✅ Firefox (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Edge (Windows)
- ⚠️ Internet Explorer (محدود)

## توسعه آینده

- [ ] Background Sync پیشرفته
- [ ] Push Notifications سفارشی
- [ ] Offline-first architecture
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Analytics integration

## منابع مفید

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Next.js PWA](https://nextjs.org/docs/app/building-your-application/optimizing/progressive-web-apps)
