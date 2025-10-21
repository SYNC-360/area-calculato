import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface SpecsResponse {
  success: boolean;
  data?: {
    calculator: {
      name: string;
      version: string;
      description: string;
      category: string;
    };
    inputTypes: Array<{
      id: string;
      name: string;
      unit: string;
      formula: string;
      constraints: {
        min: number;
        max: number | null;
        type: string;
      };
    }>;
    outputFormat: {
      value: string;
      unit: string;
      precision: number;
      format: string;
    };
    mathematicalBackground: {
      constantsPi: number;
      historicalContext: string;
      derivation: string;
    };
    apiEndpoints: Array<{
      path: string;
      method: string;
      description: string;
      example: string;
    }>;
    accessibilityFeatures: string[];
    performanceMetrics: {
      responseTime: string;
      cacheControlMaxAge: number;
      supportsCORS: boolean;
    };
  };
  error?: string;
}

export async function GET(): Promise<NextResponse<SpecsResponse>> {
  try {
    const specs: SpecsResponse = {
      success: true,
      data: {
        calculator: {
          name: 'Area of Circle Calculator',
          version: '2.0',
          description:
            'Advanced circle area calculator supporting multiple input methods with educational content and AI platform optimization',
          category: 'Mathematics / Geometry',
        },
        inputTypes: [
          {
            id: 'radius',
            name: 'Radius',
            unit: 'units',
            formula: 'A = πr²',
            constraints: {
              min: 0.0001,
              max: null,
              type: 'positive number',
            },
          },
          {
            id: 'diameter',
            name: 'Diameter',
            unit: 'units',
            formula: 'A = πd²/4',
            constraints: {
              min: 0.0001,
              max: null,
              type: 'positive number',
            },
          },
          {
            id: 'circumference',
            name: 'Circumference',
            unit: 'units',
            formula: 'A = C²/(4π)',
            constraints: {
              min: 0.0001,
              max: null,
              type: 'positive number',
            },
          },
        ],
        outputFormat: {
          value: 'area',
          unit: 'square units',
          precision: 15,
          format: 'decimal number',
        },
        mathematicalBackground: {
          constantsPi: 3.14159265358979,
          historicalContext:
            'Ancient mathematicians including Archimedes proved that the area of a circle equals half its circumference times its radius, establishing the foundation for the modern formula A = πr².',
          derivation:
            'The formula A = πr² can be derived through integral calculus by integrating the circumference (2πr) from 0 to radius r, or by dividing a circle into infinite triangular wedges.',
        },
        apiEndpoints: [
          {
            path: '/api/calculate',
            method: 'POST',
            description: 'Calculate circle area with detailed steps',
            example: 'POST /api/calculate\n{"value": 10, "inputType": "radius"}',
          },
          {
            path: '/api/calculate',
            method: 'GET',
            description: 'Calculate circle area using query parameters',
            example: 'GET /api/calculate?value=10&type=radius',
          },
          {
            path: '/api/metadata',
            method: 'GET',
            description: 'Retrieve calculator metadata and features',
            example: 'GET /api/metadata',
          },
          {
            path: '/api/specs',
            method: 'GET',
            description: 'Get complete calculator specifications',
            example: 'GET /api/specs',
          },
          {
            path: '/api/schema',
            method: 'GET',
            description: 'Retrieve JSON-LD schema for SEO',
            example: 'GET /api/schema',
          },
        ],
        accessibilityFeatures: [
          'Semantic HTML structure',
          'ARIA labels for form inputs',
          'Keyboard navigation support',
          'High contrast color scheme',
          'Mobile-responsive design',
          'Text alternatives for all visuals',
          'API documentation for programmatic access',
        ],
        performanceMetrics: {
          responseTime: '<100ms',
          cacheControlMaxAge: 86400,
          supportsCORS: true,
        },
      },
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    headers.set('Access-Control-Allow-Origin', '*');

    return NextResponse.json(specs, { headers, status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve specifications.',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=604800',
    },
  });
}
