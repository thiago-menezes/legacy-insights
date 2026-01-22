import { NextRequest, NextResponse } from 'next/server';
import { BffError } from './errors';

export const createRouteHandler = <T>(
  handler: (
    request: NextRequest,
    context: { params: Promise<Record<string, string | string[]>> },
  ) => Promise<T>,
  options: {
    cacheControl?: string;
  } = {},
) => {
  return async (
    request: NextRequest,
    context: { params: Promise<Record<string, string | string[]>> },
  ) => {
    try {
      const result = await handler(request, context);

      return NextResponse.json(result, {
        headers: {
          'Cache-Control':
            options.cacheControl ||
            'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    } catch (error) {
      if (error instanceof BffError) {
        return NextResponse.json(
          {
            error: error.name,
            message: error.message,
            details: error.details,
          },
          { status: error.statusCode },
        );
      }

      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      );
    }
  };
};
