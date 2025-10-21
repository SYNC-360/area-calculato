import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const openapi = {
      openapi: '3.0.0',
      info: {
        title: 'Area of Circle Calculator API',
        description:
          'Free, open API for calculating circle area with multiple input methods (radius, diameter, circumference)',
        version: '2.0.0',
        contact: {
          name: 'Circle Calculators',
          url: 'https://areaofcircle.com',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      servers: [
        {
          url: 'https://areaofcircle.com',
          description: 'Production server',
        },
      ],
      paths: {
        '/api/calculate': {
          post: {
            summary: 'Calculate circle area',
            description: 'Calculate the area of a circle using POST request with JSON payload',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CalculateRequest',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Successful calculation',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/CalculateResponse',
                    },
                  },
                },
              },
              400: {
                description: 'Invalid input',
              },
            },
            tags: ['Calculator'],
          },
          get: {
            summary: 'Calculate circle area via query parameters',
            description: 'Calculate the area of a circle using GET request with query parameters',
            parameters: [
              {
                name: 'value',
                in: 'query',
                required: true,
                description: 'The numeric value (radius, diameter, or circumference)',
                schema: {
                  type: 'number',
                  example: 10,
                  minimum: 0.0001,
                },
              },
              {
                name: 'type',
                in: 'query',
                required: false,
                description: 'The type of input value',
                schema: {
                  type: 'string',
                  enum: ['radius', 'diameter', 'circumference'],
                  default: 'radius',
                },
              },
            ],
            responses: {
              200: {
                description: 'Successful calculation',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/CalculateResponse',
                    },
                  },
                },
              },
            },
            tags: ['Calculator'],
          },
        },
        '/api/metadata': {
          get: {
            summary: 'Get calculator metadata',
            description:
              'Retrieve comprehensive metadata about the calculator, including keywords, formulas, and features',
            responses: {
              200: {
                description: 'Metadata retrieved successfully',
              },
            },
            tags: ['Metadata'],
          },
        },
        '/api/specs': {
          get: {
            summary: 'Get calculator specifications',
            description: 'Retrieve detailed specifications about the calculator, input types, and API endpoints',
            responses: {
              200: {
                description: 'Specifications retrieved successfully',
              },
            },
            tags: ['Metadata'],
          },
        },
        '/api/schema': {
          get: {
            summary: 'Get JSON-LD schema',
            description: 'Retrieve structured data (JSON-LD) for SEO and AI platform indexing',
            responses: {
              200: {
                description: 'Schema retrieved successfully',
              },
            },
            tags: ['Metadata'],
          },
        },
      },
      components: {
        schemas: {
          CalculateRequest: {
            type: 'object',
            required: ['value', 'inputType'],
            properties: {
              value: {
                type: 'number',
                description: 'The numeric value to calculate from',
                example: 10,
                minimum: 0.0001,
              },
              inputType: {
                type: 'string',
                description: 'Type of input (radius, diameter, or circumference)',
                enum: ['radius', 'diameter', 'circumference'],
                example: 'radius',
              },
            },
          },
          CalculateResponse: {
            type: 'object',
            required: ['success', 'data'],
            properties: {
              success: {
                type: 'boolean',
                example: true,
              },
              data: {
                type: 'object',
                properties: {
                  area: {
                    type: 'number',
                    example: 314.159265359,
                  },
                  inputType: {
                    type: 'string',
                    example: 'radius',
                  },
                  inputValue: {
                    type: 'number',
                    example: 10,
                  },
                  formula: {
                    type: 'string',
                    example: 'A = πr²',
                  },
                  steps: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [
        {
          name: 'Calculator',
          description: 'Core circle area calculation endpoints',
        },
        {
          name: 'Metadata',
          description: 'Information about the calculator and its capabilities',
        },
      ],
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, max-age=604800');
    headers.set('Access-Control-Allow-Origin', '*');

    return NextResponse.json(openapi, { headers, status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve OpenAPI specification',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
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
