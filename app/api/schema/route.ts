import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(): Promise<NextResponse> {
  try {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Area of Circle Calculator',
          url: 'https://areaofcircle.com',
          description:
            'Free online calculator to find the area of a circle using radius, diameter, or circumference',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          featureList: [
            'Calculate area from radius using A = πr²',
            'Calculate area from diameter using A = πd²/4',
            'Calculate area from circumference using A = C²/4π',
            'Step-by-step solutions',
            'Visual representations',
            'Real-world examples',
          ],
          author: {
            '@type': 'Organization',
            name: 'Circle Calculators',
            url: 'https://areaofcircle.com',
          },
          creator: {
            '@type': 'Organization',
            name: 'Circle Calculators',
          },
        },
        {
          '@type': 'Calculator',
          name: 'Circle Area Calculator',
          url: 'https://areaofcircle.com',
          description: 'Calculate the area of a circle from radius, diameter, or circumference',
          potentialAction: {
            '@type': 'ComputeAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://areaofcircle.com/api/calculate',
              actionPlatform: ['DesktopWebPlatform', 'MobileWebPlatform'],
            },
          },
          hasPart: [
            {
              '@type': 'Thing',
              name: 'Radius Method',
              description: 'Calculate area using radius (A = πr²)',
              formula: 'A = πr²',
            },
            {
              '@type': 'Thing',
              name: 'Diameter Method',
              description: 'Calculate area using diameter (A = πd²/4)',
              formula: 'A = πd²/4',
            },
            {
              '@type': 'Thing',
              name: 'Circumference Method',
              description: 'Calculate area using circumference (A = C²/(4π))',
              formula: 'A = C²/(4π)',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the formula for area of a circle?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The area of a circle formula is A = πr² where r is the radius. You can also use A = πd²/4 for diameter or A = C²/4π for circumference.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you find the area of a circle?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To find area of a circle: 1) Square the radius (multiply it by itself), 2) Multiply by π (3.14159). For example, if radius = 5, then area = π × 5² = 78.54 square units.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why is the area of a circle πr²?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The formula A = πr² comes from integral calculus. Imagine dividing a circle into tiny triangular wedges - their combined area equals πr². This can be proven by integrating the circumference from 0 to r.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I calculate area from circumference?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! Use the formula A = C²/(4π) where C is the circumference. This is derived by first finding the radius from circumference (r = C/2π), then using A = πr².',
              },
            },
          ],
        },
        {
          '@type': 'MathSolver',
          name: 'Area of Circle Solver',
          url: 'https://areaofcircle.com',
          potentialAction: {
            '@type': 'SolveMathAction',
            eduQuestionType: 'Area',
            mathExpression: 'A = πr²',
          },
        },
        {
          '@type': 'WebSite',
          url: 'https://areaofcircle.com',
          name: 'Area of Circle',
          description: 'Free online area of circle calculator with formulas and examples',
          publisher: {
            '@type': 'Organization',
            name: 'Circle Calculators',
            url: 'https://areaofcircle.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://areaofcircle.com/favicon.ico',
            },
          },
          inLanguage: 'en-US',
        },
        {
          '@type': 'Thing',
          name: 'π (Pi)',
          description:
            'Mathematical constant representing the ratio of a circle circumference to its diameter',
          value: '3.14159265358979',
          url: 'https://areaofcircle.com',
        },
        {
          '@type': 'Organization',
          name: 'Circle Calculators',
          url: 'https://areaofcircle.com',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            url: 'https://areaofcircle.com',
          },
          knowsAbout: ['Circle Mathematics', 'Geometry', 'Educational Tools'],
        },
      ],
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/ld+json');
    headers.set('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    headers.set('Access-Control-Allow-Origin', '*');

    return NextResponse.json(schema, { headers, status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve schema.',
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
