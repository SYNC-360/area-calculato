import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface MetadataResponse {
  success: boolean;
  data?: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
    type: string;
    formulas: Array<{
      name: string;
      formula: string;
      description: string;
      inputType: string;
    }>;
    features: string[];
    schemaType: string;
    lastUpdated: string;
  };
  error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<MetadataResponse>> {
  try {
    const metadata: MetadataResponse = {
      success: true,
      data: {
        title: 'Area of Circle - Calculator, Formula & Examples | Free Online Tool',
        description:
          'Area of circle calculator using formulas A = πr², A = πd²/4, and A = C²/4π. Calculate area of a circle instantly from radius, diameter, or circumference with step-by-step solutions.',
        keywords: [
          'area of circle',
          'area of circle calculator',
          'area of circle formula',
          'how to find area of circle',
          'how to calculate area of circle',
          'circle area',
          'πr²',
          'πr squared',
          'area of a circle',
          'circle area calculator',
        ],
        url: 'https://areaofcircle.com',
        type: 'EducationalApplication',
        formulas: [
          {
            name: 'Using Radius',
            formula: 'A = πr²',
            description: 'Square the radius and multiply by π. The most common method.',
            inputType: 'radius',
          },
          {
            name: 'Using Diameter',
            formula: 'A = πd²/4',
            description: 'Square the diameter, multiply by π, then divide by 4.',
            inputType: 'diameter',
          },
          {
            name: 'Using Circumference',
            formula: 'A = C²/(4π)',
            description: 'Square the circumference and divide by 4π.',
            inputType: 'circumference',
          },
        ],
        features: [
          'Calculate area from radius using A = πr²',
          'Calculate area from diameter using A = πd²/4',
          'Calculate area from circumference using A = C²/4π',
          'Step-by-step solutions',
          'Visual representations',
          'Real-world examples',
          '15+ decimal precision',
          'No registration required',
          'Free and open access',
        ],
        schemaType: 'WebApplication',
        lastUpdated: new Date().toISOString(),
      },
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    headers.set('Access-Control-Allow-Origin', '*');

    return NextResponse.json(metadata, { headers, status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve metadata.',
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
