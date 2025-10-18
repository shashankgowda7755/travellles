<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>XML News Sitemap</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        color: #333;
                        background: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .header {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0 0 10px 0;
                        color: #2563eb;
                        font-size: 28px;
                    }
                    .description {
                        color: #6b7280;
                        margin: 0;
                    }
                    .stats {
                        background: white;
                        padding: 15px 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                        font-weight: 500;
                        color: #059669;
                    }
                    .url-list {
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    .url-item {
                        border-bottom: 1px solid #e5e7eb;
                        padding: 20px;
                        transition: background-color 0.2s;
                    }
                    .url-item:last-child {
                        border-bottom: none;
                    }
                    .url-item:hover {
                        background: #f9fafb;
                    }
                    .url-link {
                        color: #2563eb;
                        text-decoration: none;
                        font-weight: 500;
                        font-size: 16px;
                        word-break: break-all;
                    }
                    .url-link:hover {
                        text-decoration: underline;
                    }
                    .news-details {
                        margin-top: 10px;
                        padding: 12px;
                        background: #f3f4f6;
                        border-radius: 6px;
                        border-left: 4px solid #10b981;
                    }
                    .news-title {
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 6px;
                    }
                    .news-meta {
                        display: flex;
                        gap: 15px;
                        font-size: 14px;
                        color: #6b7280;
                    }
                    .news-meta span {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .badge {
                        display: inline-block;
                        padding: 2px 8px;
                        background: #dbeafe;
                        color: #1e40af;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;
                    }
                    .footer {
                        margin-top: 30px;
                        padding: 20px;
                        text-align: center;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .footer a {
                        color: #2563eb;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>News Sitemap</h1>
                    <p class="description">This is an XML News Sitemap for search engines containing recent news articles.</p>
                </div>
                
                <div class="stats">
                    Total articles: <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
                </div>
                
                <div class="url-list">
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <div class="url-item">
                            <a class="url-link" href="{sitemap:loc}">
                                <xsl:value-of select="sitemap:loc" />
                            </a>
                            
                            <xsl:if test="news:news">
                                <div class="news-details">
                                    <div class="news-title">
                                        <xsl:value-of select="news:news/news:title" />
                                    </div>
                                    <div class="news-meta">
                                        <span>
                                            📅 <xsl:value-of select="news:news/news:publication_date" />
                                        </span>
                                        <span>
                                            📰 <xsl:value-of select="news:news/news:publication/news:name" />
                                        </span>
                                        <xsl:if test="news:news/news:publication/news:language">
                                            <span class="badge">
                                                <xsl:value-of select="news:news/news:publication/news:language" />
                                            </span>
                                        </xsl:if>
                                    </div>
                                </div>
                            </xsl:if>
                        </div>
                    </xsl:for-each>
                </div>
                
                <div class="footer">
                    Generated for <a href="https://www.milesalone.com">Miles Alone</a>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>