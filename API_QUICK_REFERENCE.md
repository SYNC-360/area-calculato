# API Quick Reference

## Endpoints Summary

### POST `/api/calculate`
Calculate circle area from a single input value.

**Request:**
```json
{
  "value": 10,
  "inputType": "radius"
}
```

**Parameters:**
- `value` (number, required): Positive number (0.0001 minimum)
- `inputType` (string, required): `"radius"`, `"diameter"`, or `"circumference"`

**Response:**
```json
{
  "success": true,
  "data": {
    "area": 314.159265359,
    "inputType": "radius",
    "inputValue": 10,
    "formula": "A = πr²",
    "steps": ["Given: Radius (r) = 10", "Formula: A = πr²", ...],
    "precision": 15
  },
  "meta": {
    "timestamp": "2025-10-21T10:30:00.000Z",
    "cached": false
  }
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Invalid input (bad value or inputType)
- `500` - Server error

---

### GET `/api/calculate`
Calculate circle area using query parameters (browser-friendly).

**URL Format:**
```
https://areaofcircle.com/api/calculate?value=10&type=radius
```

**Parameters:**
- `value` (query, required): The numeric value
- `type` (query, optional): `radius` (default), `diameter`, or `circumference`

**Example Calls:**
```bash
# Radius (default)
https://areaofcircle.com/api/calculate?value=10

# Diameter
https://areaofcircle.com/api/calculate?value=20&type=diameter

# Circumference
https://areaofcircle.com/api/calculate?value=62.832&type=circumference
```

---

### GET `/api/metadata`
Get comprehensive calculator metadata.

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Area of Circle - Calculator...",
    "description": "Area of circle calculator...",
    "keywords": ["area of circle", "calculator", ...],
    "url": "https://areaofcircle.com",
    "type": "EducationalApplication",
    "formulas": [
      {
        "name": "Using Radius",
        "formula": "A = πr²",
        "description": "...",
        "inputType": "radius"
      },
      ...
    ],
    "features": ["Calculate area...", "Step-by-step solutions", ...],
    "schemaType": "WebApplication",
    "lastUpdated": "2025-10-21T..."
  }
}
```

---

### GET `/api/specs`
Get detailed calculator specifications.

**Response:**
```json
{
  "success": true,
  "data": {
    "calculator": {
      "name": "Area of Circle Calculator",
      "version": "2.0",
      "description": "...",
      "category": "Mathematics / Geometry"
    },
    "inputTypes": [
      {
        "id": "radius",
        "name": "Radius",
        "unit": "units",
        "formula": "A = πr²",
        "constraints": {"min": 0.0001, "max": null, "type": "positive number"}
      },
      ...
    ],
    "outputFormat": {
      "value": "area",
      "unit": "square units",
      "precision": 15,
      "format": "decimal number"
    },
    "apiEndpoints": [...],
    "accessibilityFeatures": ["Semantic HTML", "ARIA labels", ...],
    "performanceMetrics": {
      "responseTime": "<100ms",
      "cacheControlMaxAge": 86400,
      "supportsCORS": true
    }
  }
}
```

---

### GET `/api/schema`
Get JSON-LD structured data (for SEO and AI platforms).

**Response:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://areaofcircle.com/#webapp",
      "name": "Area of Circle Calculator",
      "url": "https://areaofcircle.com",
      "description": "...",
      "applicationCategory": "EducationalApplication",
      ...
    },
    {
      "@type": "Calculator",
      "@id": "https://areaofcircle.com/#calculator",
      ...
    },
    {
      "@type": "FAQPage",
      "@id": "https://areaofcircle.com/#faq",
      "mainEntity": [...]
    },
    ...
  ]
}
```

---

### GET `/api/openapi.json`
Get OpenAPI 3.0 specification for the calculator API.

**Content-Type:** `application/json`

**Contains:**
- API version and contact info
- All endpoints with methods and parameters
- Request/response schemas
- Error responses
- Security schemes
- Tag-based organization

**Usage:** Import into Swagger UI, Postman, or other API tools.

---

## Response Headers

All API endpoints include these headers:

```
Cache-Control: public, max-age=86400, s-maxage=604800
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Content-Type: application/json
```

- **Cache Control:** 24-hour browser cache, 7-day CDN cache
- **CORS:** Fully open for cross-origin requests
- **Content-Type:** JSON for all endpoints

---

## Usage Examples

### JavaScript/Node.js
```javascript
// POST request
const response = await fetch('https://areaofcircle.com/api/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    value: 10,
    inputType: 'radius'
  })
});
const data = await response.json();
console.log(data.data.area); // 314.159265359

// GET request
const response2 = await fetch('https://areaofcircle.com/api/calculate?value=20&type=diameter');
const data2 = await response2.json();
```

### Python
```python
import requests

# POST
response = requests.post(
    'https://areaofcircle.com/api/calculate',
    json={'value': 10, 'inputType': 'radius'}
)
print(response.json()['data']['area'])

# GET
response = requests.get(
    'https://areaofcircle.com/api/calculate',
    params={'value': 20, 'type': 'diameter'}
)
print(response.json()['data']['area'])
```

### cURL
```bash
# POST
curl -X POST https://areaofcircle.com/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"value":10,"inputType":"radius"}'

# GET
curl "https://areaofcircle.com/api/calculate?value=10&type=radius"

# Get metadata
curl https://areaofcircle.com/api/metadata

# Get specs
curl https://areaofcircle.com/api/specs

# Get schema
curl https://areaofcircle.com/api/schema

# Get OpenAPI
curl https://areaofcircle.com/api/openapi.json
```

---

## Error Handling

### Invalid Value
```json
{
  "success": false,
  "error": "Invalid value. Please provide a positive number."
}
```
**HTTP 400**

### Invalid Input Type
```json
{
  "success": false,
  "error": "Invalid inputType. Must be \"radius\", \"diameter\", or \"circumference\"."
}
```
**HTTP 400**

### Server Error
```json
{
  "success": false,
  "error": "Internal server error. Please try again later."
}
```
**HTTP 500**

---

## Rate Limiting

Currently: **No rate limiting** (subject to change)

- All endpoints are public and unrestricted
- Respect cache headers to minimize unnecessary requests
- If heavy usage is detected, rate limiting may be implemented

---

## CORS & Cross-Origin

All endpoints support CORS with:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

This allows requests from any domain.

---

## Performance Tips

1. **Use GET for simple queries** - Faster for single-value calculations
2. **Respect cache headers** - Cache responses in your application
3. **Batch requests** - Call once instead of multiple times
4. **Use appropriate precision** - 15 decimal places available
5. **Handle errors gracefully** - Check `success` field

---

## Integration Checklist

- [ ] API can be called from your application
- [ ] Error responses are handled properly
- [ ] Cache headers are respected
- [ ] CORS works as expected
- [ ] Response times are acceptable (<200ms)
- [ ] Metadata is useful for your use case
- [ ] Schema data is accessible
- [ ] OpenAPI spec is reviewed

---

## Support

For API issues:
1. Check the error message for details
2. Verify input parameters are correct
3. Ensure value is positive and > 0.0001
4. Check inputType is one of: radius, diameter, circumference
5. Review HTTP status codes above

---

**Last Updated:** October 21, 2025
**API Version:** 2.0
**Status:** Production Ready ✅
