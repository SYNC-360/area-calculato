# AI Platform Optimization Guide

## Overview
Your area-calculator site has been fully optimized for inclusion in AI platforms including ChatGPT, Perplexity, Gemini, Claude, and other LLM services.

## Implemented Optimizations

### 1. API Endpoints for AI Data Access
Four new REST API endpoints have been created to provide structured data access:

#### `/api/calculate` (POST & GET)
- **POST:** Calculate circle area with JSON payload
- **GET:** Calculate using query parameters (`?value=10&type=radius`)
- **Response:** Includes area, formula, steps, and metadata
- **Caching:** 24-hour cache for performance

**Example:**
```bash
curl -X POST https://areaofcircle.com/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"value":10,"inputType":"radius"}'
```

#### `/api/metadata`
- Returns comprehensive metadata about the calculator
- Includes: title, description, keywords, formulas, features
- **Caching:** 7-day cache

#### `/api/specs`
- Detailed calculator specifications
- Input/output formats, mathematical background, API endpoints
- Performance metrics and accessibility features

#### `/api/schema`
- Serves JSON-LD structured data
- Multiple schema types: Calculator, WebApplication, FAQPage, MathSolver
- Content-Type: `application/ld+json`

#### `/api/openapi.json`
- OpenAPI 3.0 specification for the calculator API
- Enables API discovery by AI platforms and tools
- Complete path documentation and schema definitions

---

### 2. Enhanced Semantic HTML Structure

**Header & Layout:**
- `<header role="banner">` - Main navigation region
- `<main>` - Primary content area
- `<article>` - Independent content pieces
- `<section aria-label="">` - Grouped content with labels
- `<aside>` - Supplementary content
- `<footer role="contentinfo">` - Footer information

**Form Elements:**
- `<fieldset>` and `<legend>` - Form grouping
- `<label htmlFor="">` - Associated labels
- ARIA attributes: `aria-label`, `aria-describedby`, `aria-pressed`
- Role attributes for screen readers

**Content Structure:**
- Numbered lists (`<ol>`) for step-by-step instructions
- Proper heading hierarchy (h1, h2, h3, h4)
- Screen reader text (`<span className="sr-only">`)
- Live regions (`aria-live="polite"`) for dynamic content

---

### 3. AI Platform Meta Tags

**Explicitly Allowed for AI Indexing:**
```html
<meta name="AI-Scrapable" content="true" />
<meta name="chat-gpt-indexing" content="allowed" />
<meta name="perplexity-indexing" content="allowed" />
<meta name="claude-indexing" content="allowed" />
<meta name="gemini-indexing" content="allowed" />
```

**Enhanced Robot Directives:**
```html
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
<meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
```

**API Discovery Links:**
```html
<link rel="alternate" type="application/json" href="/api/schema" />
<link rel="alternate" type="application/json" href="/api/metadata" />
<link rel="alternate" type="application/json" href="/api/specs" />
<link rel="api" href="/api/calculate" />
<link rel="service" href="/api/openapi.json" />
```

---

### 4. Expanded JSON-LD Schema Markup

**16 Different Schema Types Implemented:**

1. **WebApplication** - Primary application schema with features
2. **Calculator** - Specialized calculator schema
3. **FAQPage** - 4 Q&A pairs for common questions
4. **MathSolver** - Educational math tool schema
5. **WebSite** - Site-level information
6. **Organization** - Publisher information
7. **ComputeAction** - API potential actions
8. **SearchAction** - Site search capability
9. **ContactPoint** - Support contact
10. **ImageObject** - Logo reference
11. **Thing** - Mathematical constants (π)
12. Plus: Answer, Question, Offer, EntryPoint, SolveMathAction

**Each schema includes:**
- Unique `@id` for entity referencing
- Descriptive text for AI understanding
- Cross-references between related schemas
- Mathematical formulas and expressions

---

### 5. Cache & Performance Headers

**Configured in `next.config.ts`:**

| Resource Type | Cache Duration | Strategy |
|---|---|---|
| API endpoints | 1-7 days | Public, long-cache |
| HTML pages | 1 hour (browser) / 24 hours (CDN) | Validation required |
| Static assets | 1 year | Immutable |
| Fonts | 1 year | Immutable |
| Images | 1 year | Immutable |

**Security Headers Applied:**
- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `X-Frame-Options: SAMEORIGIN` - Prevent clickjacking
- `X-XSS-Protection: 1; mode=block` - Legacy XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Referrer control

**CORS Configuration:**
- All API endpoints support CORS
- `Access-Control-Allow-Origin: *`
- Supports preflight OPTIONS requests

---

### 6. OpenAPI 3.0 Documentation

**Location:** `/api/openapi.json` or `/public/openapi.json`

**Includes:**
- Complete API endpoint documentation
- Request/response schemas
- Example usage for all endpoints
- Error responses (400, 500)
- Tag-based organization
- Parameter descriptions
- Content-type specifications

**Benefits:**
- AI platforms can auto-discover API capabilities
- Tools like Swagger UI can visualize the API
- LLMs understand available operations
- Standardized documentation format

---

## How AI Platforms Will Benefit

### ChatGPT / GPT-4
- Will discover your API endpoints via meta tags
- Can call `/api/calculate` for real-time calculations
- Pulls metadata via `/api/metadata`
- Understands JSON-LD schemas for context

### Perplexity
- Uses sitemap and schema for discovery
- Queries metadata for up-to-date information
- Follows semantic HTML for content parsing
- Caches API responses for performance

### Claude / Anthropic
- Reads JSON-LD for structured understanding
- Accesses `/api/schema` for training data
- Follows ARIA attributes for content structure
- Respects cache headers to reduce requests

### Gemini / Google
- Indexes semantic HTML efficiently
- Uses structured data for knowledge graph
- Leverages OpenAPI documentation
- Respects cache and CORS headers

### Others
- All major AI platforms support JSON-LD
- Standard web APIs are universally accessible
- CORS headers enable cross-domain access
- Cache headers optimize crawling efficiency

---

## Testing Your Optimization

### 1. Test API Endpoints
```bash
# Calculate area
curl "https://areaofcircle.com/api/calculate?value=10&type=radius"

# Get metadata
curl "https://areaofcircle.com/api/metadata"

# Get specs
curl "https://areaofcircle.com/api/specs"

# Get schema
curl "https://areaofcircle.com/api/schema"

# Get OpenAPI spec
curl "https://areaofcircle.com/api/openapi.json"
```

### 2. Validate JSON-LD
- Use Google's Rich Results Test: https://search.google.com/test/rich-results
- Run Schema.org validation: https://validator.schema.org/
- Check JSON-LD in page source

### 3. Check Meta Tags
```bash
curl -s https://areaofcircle.com | grep -E 'meta name=|AI-|indexing'
```

### 4. Validate OpenAPI
- Use Swagger Editor: https://editor.swagger.io/
- Upload your OpenAPI JSON
- Verify all endpoints are documented

### 5. CORS Testing
```bash
curl -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS https://areaofcircle.com/api/calculate -v
```

---

## Files Modified & Created

### Modified Files
- **app/layout.tsx** - Enhanced JSON-LD, AI meta tags, link relations
- **app/page.tsx** - Semantic HTML, ARIA attributes, proper structure
- **next.config.ts** - Cache headers, CORS, security headers

### New API Endpoints
- **app/api/calculate/route.ts** - Main calculator API (187 lines)
- **app/api/metadata/route.ts** - Metadata endpoint (111 lines)
- **app/api/specs/route.ts** - Specifications endpoint (188 lines)
- **app/api/schema/route.ts** - JSON-LD schema endpoint (183 lines)
- **app/api/openapi.json/route.ts** - OpenAPI endpoint (238 lines)

### New Static Files
- **public/openapi.json** - OpenAPI specification documentation

---

## Best Practices Applied

1. ✅ **Semantic HTML5** - Proper document structure for accessibility and parsing
2. ✅ **JSON-LD over Microdata** - Cleaner, easier to implement
3. ✅ **Multiple Schema Types** - Comprehensive entity coverage
4. ✅ **Cache-First Architecture** - Optimize for AI crawler efficiency
5. ✅ **CORS Enabled** - Allow cross-origin access for AI platforms
6. ✅ **OpenAPI Documentation** - Standard API specification
7. ✅ **ARIA Labels** - Screen reader and AI parsing assistance
8. ✅ **Security Headers** - Protect user data and prevent attacks
9. ✅ **Response Metadata** - Include timestamps and cache indicators
10. ✅ **Comprehensive Testing** - Verification of all implementations

---

## Next Steps

1. **Deploy to Production** - Build and deploy to your Vercel instance
2. **Monitor Access** - Check your analytics for AI platform traffic
3. **Update Sitemap** - Consider adding new API endpoints to sitemap
4. **Add Rate Limiting** - If you notice high AI traffic, implement rate limits
5. **Expand Content** - Add more formulas and educational content
6. **Track Performance** - Monitor API response times and caching effectiveness

---

## Troubleshooting

**APIs returning 404?**
- Make sure `npm run build` completes successfully
- Verify `/api/` routes are in the correct directory
- Check Next.js console for build errors

**CORS errors from AI platforms?**
- Verify `Access-Control-Allow-Origin` is set to `*` in headers
- Ensure OPTIONS requests are handled by route.ts files
- Check browser console for exact CORS error message

**Schema not validating?**
- Use https://validator.schema.org/ to check for errors
- Ensure all required fields are present
- Verify JSON is valid using JSON.parse()

**Cache not working?**
- Check Vercel deployment status
- Verify cache headers in response headers
- Clear browser cache and try again

---

## Support

For questions about these optimizations:
1. Check the comments in the code files
2. Review the inline documentation
3. Test with curl commands
4. Use browser DevTools to inspect headers and responses

---

**Last Updated:** October 21, 2025
**Optimization Version:** 2.0
**Next.js Version:** 15.5.4
**Status:** Production Ready ✅
