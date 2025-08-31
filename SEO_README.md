# SEO Implementation for چقدر شد؟ (Currency Tracker)

This document outlines the comprehensive SEO implementation for the currency tracker app at `cheghadshod.ir`.

## 🎯 SEO Features Implemented

### 1. Meta Tags & Metadata
- **Dynamic titles** with Persian and English support
- **Comprehensive descriptions** in both languages
- **Targeted keywords** for Iranian market and international users
- **Open Graph tags** for social media sharing
- **Twitter Card support** with large image format
- **Canonical URLs** to prevent duplicate content
- **Language alternates** for multilingual support

### 2. Structured Data (JSON-LD)
- **WebApplication schema** for better app understanding
- **Organization schema** for brand recognition
- **Financial application** categorization
- **Author and publisher** information

### 3. Technical SEO
- **Dynamic sitemap generation** (`/app/sitemap.ts`)
- **Dynamic robots.txt** (`/app/robots.ts`)
- **Performance optimizations** with preconnect and DNS prefetch
- **Mobile-first responsive design**
- **PWA optimization** for mobile search

### 4. Content Optimization
- **Semantic HTML structure** with proper heading hierarchy
- **Persian language support** (fa-IR locale)
- **Accessibility improvements** with ARIA labels
- **Internal linking** structure

## 📁 Files Modified/Created

### Core SEO Files
- `app/layout.tsx` - Enhanced metadata and structured data
- `app/sitemap.ts` - Dynamic sitemap generator
- `app/robots.ts` - Dynamic robots.txt generator
- `components/seo-head.tsx` - Reusable SEO component
- `lib/seo-config.ts` - Centralized SEO configuration

### Static SEO Files
- `public/sitemap.xml` - Static sitemap (fallback)
- `public/robots.txt` - Static robots.txt (fallback)

## 🚀 Key SEO Improvements

### 1. Persian Market Optimization
- **Localized content** in Persian (Farsi)
- **Iran-specific keywords** and descriptions
- **Regional targeting** (IR country code)
- **Local currency** and financial terms

### 2. Search Engine Optimization
- **Google-friendly** meta tags and structure
- **Bing optimization** with specific directives
- **Yandex support** for Russian market
- **Mobile-first indexing** preparation

### 3. Social Media Optimization
- **Facebook Open Graph** tags
- **Twitter Card** optimization
- **LinkedIn sharing** support
- **Professional branding** for financial apps

## 🔧 Configuration

### SEO Config (`lib/seo-config.ts`)
```typescript
export const seoConfig = {
  site: {
    name: "چقدر شد؟",
    url: "https://cheghadshod.ir",
    language: "fa-IR",
    region: "IR",
    country: "Iran",
  },
  // ... more configuration
};
```

### Verification Codes
Replace placeholder verification codes in `lib/seo-config.ts`:
- Google Search Console
- Yandex Webmaster
- Bing Webmaster Tools
- Yahoo Site Explorer

## 📊 Performance & Analytics

### Google Analytics
- Add your GA4 ID to `lib/seo-config.ts`
- Implement enhanced ecommerce tracking
- Set up conversion goals

### Performance Monitoring
- Core Web Vitals tracking
- Mobile performance optimization
- PWA performance metrics

## 🌐 International SEO

### Language Support
- **Primary**: Persian (fa-IR)
- **Secondary**: English (en-US)
- **Fallback**: English for international users

### Regional Targeting
- **Primary Market**: Iran
- **Secondary Markets**: Persian-speaking regions
- **International**: English-speaking users

## 📱 PWA SEO Benefits

### Mobile-First Indexing
- **Responsive design** optimization
- **Mobile performance** improvements
- **App-like experience** for better engagement

### Installation Prompts
- **PWA install buttons** for better user retention
- **Offline functionality** for improved UX
- **App store-like** experience

## 🔍 Search Console Setup

### Google Search Console
1. Add property: `https://cheghadshod.ir`
2. Verify ownership using provided meta tag
3. Submit sitemap: `https://cheghadshod.ir/sitemap.xml`
4. Monitor performance and indexing

### Bing Webmaster Tools
1. Add site and verify ownership
2. Submit sitemap
3. Monitor search performance

## 📈 SEO Monitoring

### Key Metrics to Track
- **Organic traffic** growth
- **Keyword rankings** for target terms
- **Click-through rates** (CTR)
- **Page load speed** and Core Web Vitals
- **Mobile usability** scores

### Tools Recommended
- Google Search Console
- Google Analytics 4
- PageSpeed Insights
- Lighthouse
- SEMrush or Ahrefs

## 🚀 Next Steps

### Immediate Actions
1. **Create Open Graph image** (1200x630px)
2. **Add verification codes** to config
3. **Submit sitemap** to search engines
4. **Monitor indexing** progress

### Long-term Optimization
1. **Content expansion** with blog/articles
2. **Local SEO** optimization for Iran
3. **Voice search** optimization
4. **Featured snippets** targeting

## 📞 Support

For technical support or SEO questions:
- **Developer**: Sina Zare
- **GitHub**: [sina-sparkn](https://github.com/sina-sparkn)
- **Project**: [Currency Tracker](https://github.com/sina-sparkn/chand_shode_currency_tracking_app)

---

**Last Updated**: December 19, 2024
**SEO Version**: 1.0.0
**Next Review**: January 19, 2025
