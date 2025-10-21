import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface CalculateRequest {
  value: number;
  inputType: 'radius' | 'diameter' | 'circumference';
}

interface CalculateResponse {
  success: boolean;
  data?: {
    area: number;
    inputType: string;
    inputValue: number;
    formula: string;
    steps: string[];
    precision: number;
  };
  error?: string;
  meta?: {
    timestamp: string;
    cached: boolean;
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<CalculateResponse>> {
  try {
    const body: CalculateRequest = await request.json();
    const { value, inputType } = body;

    // Validation
    if (typeof value !== 'number' || value <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid value. Please provide a positive number.',
        },
        { status: 400 }
      );
    }

    if (!['radius', 'diameter', 'circumference'].includes(inputType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid inputType. Must be "radius", "diameter", or "circumference".',
        },
        { status: 400 }
      );
    }

    let area: number;
    let formula: string;
    let steps: string[] = [];

    switch (inputType) {
      case 'radius':
        area = Math.PI * value * value;
        formula = 'A = πr²';
        steps = [
          `Given: Radius (r) = ${value}`,
          `Formula: A = πr²`,
          `Step 1: Square the radius`,
          `r² = ${value}² = ${value * value}`,
          `Step 2: Multiply by π`,
          `A = π × ${value * value}`,
          `A = 3.14159... × ${value * value}`,
          `A = ${area.toFixed(15)} square units`,
        ];
        break;

      case 'diameter':
        area = Math.PI * (value / 2) * (value / 2);
        formula = 'A = πd²/4';
        steps = [
          `Given: Diameter (d) = ${value}`,
          `Formula: A = π(d/2)² or A = πd²/4`,
          `Step 1: Find radius = d/2`,
          `r = ${value}/2 = ${value / 2}`,
          `Step 2: Square the radius`,
          `r² = ${value / 2}² = ${(value / 2) * (value / 2)}`,
          `Step 3: Multiply by π`,
          `A = π × ${(value / 2) * (value / 2)}`,
          `A = ${area.toFixed(15)} square units`,
        ];
        break;

      case 'circumference':
        area = (value * value) / (4 * Math.PI);
        formula = 'A = C²/(4π)';
        steps = [
          `Given: Circumference (C) = ${value}`,
          `Formula: A = C²/(4π)`,
          `Step 1: Square the circumference`,
          `C² = ${value}² = ${value * value}`,
          `Step 2: Divide by 4π`,
          `A = ${value * value}/(4 × π)`,
          `A = ${value * value}/(4 × 3.14159...)`,
          `A = ${value * value}/12.56637...`,
          `A = ${area.toFixed(15)} square units`,
        ];
        break;
    }

    const response: CalculateResponse = {
      success: true,
      data: {
        area: parseFloat(area.toFixed(15)),
        inputType,
        inputValue: value,
        formula,
        steps,
        precision: 15,
      },
      meta: {
        timestamp: new Date().toISOString(),
        cached: false,
      },
    };

    // Set cache headers for AI platforms
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return NextResponse.json(response, { headers, status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<CalculateResponse>> {
  // Support GET requests with query parameters for simpler AI crawling
  try {
    const searchParams = req.nextUrl.searchParams;
    const value = parseFloat(searchParams.get('value') || '');
    const inputType = (searchParams.get('type') || 'radius') as 'radius' | 'diameter' | 'circumference';

    if (isNaN(value) || value <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid value. Please provide a positive number as query parameter.',
        },
        { status: 400 }
      );
    }

    // Reuse POST logic
    return POST(
      new NextRequest(req, {
        method: 'POST',
        body: JSON.stringify({ value, inputType }),
      })
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request. Please use ?value=number&type=radius|diameter|circumference',
      },
      { status: 400 }
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
