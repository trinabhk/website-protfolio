# Manual SEO Actions for Production Validation

This file lists the live, production-only tasks that cannot be fully verified from the repository alone.

## 1. Verify live pages are serving correctly
Check these URLs in the browser or via a tool such as curl/HTTP status checker:

- https://trinabh.com.np/
- https://trinabh.com.np/technical-seo-nepal/
- https://trinabh.com.np/seo-audit-nepal/

Expected result:
- HTTP 200
- no broken CSS or JS
- no missing images
- no layout breakage
- navigation works
- responsive/mobile view is usable

## 2. Validate Search Console
1. Open Google Search Console.
2. Select the verified property for the domain.
3. Submit the sitemap:
   - https://trinabh.com.np/sitemap.xml
4. Inspect and request indexing for:
   - https://trinabh.com.np/
   - https://trinabh.com.np/technical-seo-nepal/
   - https://trinabh.com.np/seo-audit-nepal/
5. Review the Page Indexing report.
6. Check for:
   - Discovered - currently not indexed
   - Crawled - currently not indexed
   - Duplicate without user-selected canonical
   - Soft 404
   - Blocked by robots.txt
   - 5xx server errors

## 3. Review Bing Webmaster Tools
1. Add and verify the domain.
2. Submit the sitemap:
   - https://trinabh.com.np/sitemap.xml
3. Review indexing and crawl status.
4. Fix any robots or sitemap issues reported by Bing.

## 4. Validate PageSpeed and Core Web Vitals
Run PageSpeed Insights for:

- https://trinabh.com.np/
- https://trinabh.com.np/technical-seo-nepal/
- https://trinabh.com.np/seo-audit-nepal/

Review the mobile report and focus on:
- LCP
- INP
- CLS
- oversized images
- unused JavaScript
- render-blocking resources
- layout shifts
- slow server response

### PageSpeed / Lighthouse Validation

Homepage: https://trinabh.com.np/

Mobile Lighthouse CLI:
- Performance: 83
- FCP: 3.4s
- LCP: 3.4s
- TBT: 0ms
- CLS: 0
- Speed Index: 4.3s

Accessibility: 100
Best Practices: 100
SEO: 100

Status: PASS with optimization opportunity.

Notes:
- Lighthouse CLI successfully records valid LCP and TBT metrics.
- PageSpeed Insights web UI currently reports NO_LCP / NO_TBT during trace processing, despite Lighthouse CLI measuring LCP at 3.4s and TBT at 0ms.
- The homepage hero was updated so above-the-fold content is immediately paintable and no longer depends on IntersectionObserver.
- No further code changes are required specifically for the NO_LCP PSI reporting issue.
- Future optimization can focus on reducing FCP/LCP toward <2.5s.

Production status summary:
- Google sitemap: ✅ 10 URLs
- Bing sitemap: ✅ 10 URLs
- Google priority URLs crawlable/indexable: ✅
- Bing indexing requests submitted: ✅
- Canonicals: ✅
- Breadcrumb schema: ✅
- CLS: ✅ 0
- TBT: ✅ 0ms
- Lighthouse measurements: ✅ working
- Accessibility / Best Practices / SEO: ✅ 100

At this point, stop debugging NO_LCP in the code and shift into indexing/performance monitoring rather than additional code changes.

## 5. Check canonical and robots output live
Open the live pages and confirm:

- canonical tags are correct and self-referencing where appropriate
- HTTPS is used consistently
- no redirect loops or chains exist
- the preferred host is consistent
- robots.txt does not block important pages

Check:
- https://trinabh.com.np/robots.txt
- https://trinabh.com.np/sitemap.xml

The sitemap should include:
- https://trinabh.com.np/
- https://trinabh.com.np/technical-seo-nepal/
- https://trinabh.com.np/seo-audit-nepal/
- other canonical indexable pages only

## 6. Validate structured data live
Use Rich Results Test and Schema.org Validator on the important pages.

Check the following pages:
- homepage
- /technical-seo-nepal/
- /seo-audit-nepal/
- relevant blog articles

Review:
- Person
- WebSite
- BreadcrumbList
- BlogPosting
- Service

Fix all critical validation errors.

## 7. Review internal linking and broken links
Check live internal links between:
- homepage and both landing pages
- services page and both landing pages
- relevant blog posts and landing pages
- landing pages and related content

Check for:
- 404 pages
- broken navigation links
- redirect loops
- dead CTAs
- missing images

## 8. Check analytics and conversions
Confirm production tracking is working.

Verify:
- page views are tracking
- contact link clicks are recorded
- CTA clicks are recorded if applicable
- lead forms or contact actions are measured

## 9. Record the ranking baseline
Track these keywords in Search Console and analytics:

- technical seo nepal
- technical seo services nepal
- technical seo analyst nepal
- technical seo specialist nepal
- seo audit nepal
- technical seo audit nepal
- website seo audit nepal
- seo consultant nepal

Record:
- impressions
- clicks
- CTR
- average position
- landing pages
- countries
- devices

## 10. Weekly monitoring cadence
Every week, review:

- Search Console indexing status
- Page Indexing issues
- impressions and clicks
- CTR and average position
- top landing pages
- Core Web Vitals
- crawl errors
- broken links
- conversion tracking

## 11. Do not make unsupported claims
Do not claim:
- guaranteed ranking
- fake testimonials
- fake reviews
- fake awards
- fake certifications
- fake client logos
- fabricated metrics
- traffic growth claims without evidence

## 12. Next recommended actions after live validation
1. Fix any live Google/Bing indexing issues.
2. Improve internal linking where pages are weakly connected.
3. Publish one or two useful supporting technical SEO articles.
4. Re-check Search Console after 7 to 14 days.
5. Only then make another round of SEO content or metadata changes based on actual data.
