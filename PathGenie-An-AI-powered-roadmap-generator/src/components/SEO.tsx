import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "PathGenie - AI-Powered Learning Roadmaps",
  description = "Transform your learning journey with AI-generated, personalized roadmaps. Master any skill with step-by-step guidance, curated resources, and progress tracking.",
  keywords = "learning roadmap, AI education, skill development, personalized learning, online courses, career growth, skill mastery, learning path",
  image = "/og-image.jpg",
  url = "https://pathgenie.ai",
  type = "website",
  author = "PathGenie Team",
  publishedTime,
  modifiedTime,
  noIndex = false
}) => {
  const fullTitle = title.includes("PathGenie") ? title : `${title} | PathGenie`;
  const fullUrl = url.startsWith('http') ? url : `https://pathgenie.ai${url}`;
  const fullImage = image.startsWith('http') ? image : `https://pathgenie.ai${image}`;

  return (
    <Helmet>      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PathGenie" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@pathgenie" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Education" />
          <meta property="article:tag" content={keywords} />
        </>
      )}

      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          "name": fullTitle,
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": "PathGenie",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pathgenie.ai/logo.png"
            }
          },
          ...(publishedTime && { "datePublished": publishedTime }),
          ...(modifiedTime && { "dateModified": modifiedTime })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
