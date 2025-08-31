import Head from 'next/head';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}

export function SEOHead({
    title = "چقدر شد؟ | قیمت ارز و طلا | Currency & Gold Tracker",
    description = "قیمت لحظه‌ای ارز، طلا و سکه در ایران. پیگیری نرخ ارز، قیمت طلا و سکه با به‌روزرسانی خودکار.",
    keywords = ["قیمت ارز", "قیمت طلا", "قیمت سکه", "نرخ ارز", "ارز دیجیتال", "طلا و جواهر"],
    image = "https://cheghadshod.ir/web-app-manifest-512x512.png",
    url = "https://cheghadshod.ir",
    type = "website",
    publishedTime,
    modifiedTime,
    author = "Sina Zare"
}: SEOHeadProps) {
    const fullTitle = title.includes("چقدر شد؟") ? title : `${title} | چقدر شد؟`;

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(", ")} />
            <meta name="author" content={author} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="چقدر شد؟" />
            <meta property="og:locale" content="fa_IR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:creator" content="@sina_sparkn" />

            {/* Article specific meta tags */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}

            {/* Additional SEO meta tags */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Language and region */}
            <meta name="language" content="Persian" />
            <meta name="geo.region" content="IR" />
            <meta name="geo.country" content="Iran" />

            {/* Mobile and PWA specific */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="چقدر شد؟" />
            <meta name="application-name" content="چقدر شد؟" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" content="#000000" />

            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* DNS prefetch for performance */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        </Head>
    );
}
