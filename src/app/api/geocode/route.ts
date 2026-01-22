import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_CITY = 'Recife';
const DEFAULT_STATE = 'PE';
const DEFAULT_COUNTRY = 'Brasil';

export type GeocodeRequest = {
  latitude: number;
  longitude: number;
};

export type GeocodeResponse = {
  success: boolean;
  data?: {
    city: string;
    state: string;
    country: string;
  };
  error?: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body: GeocodeRequest = await request.json();
    const { latitude, longitude } = body;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return NextResponse.json<GeocodeResponse>(
        { success: false, error: 'Invalid coordinates' },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json<GeocodeResponse>(
        {
          success: true,
          data: {
            city: DEFAULT_CITY,
            state: DEFAULT_STATE,
            country: DEFAULT_COUNTRY,
          },
        },
        { status: 200 },
      );
    }

    const data = await response.json();

    const cityName = (data.city || data.locality || DEFAULT_CITY).trim();
    const countryName = (data.countryName || DEFAULT_COUNTRY).trim();

    // Extract state code from principalSubdivisionCode (e.g., "BR-PE" -> "PE")
    let stateCode = DEFAULT_STATE;
    if (data.principalSubdivisionCode) {
      const parts = data.principalSubdivisionCode.split('-');
      stateCode = parts[parts.length - 1].toUpperCase();
    }

    return NextResponse.json<GeocodeResponse>({
      success: true,
      data: {
        city: cityName,
        state: stateCode,
        country: countryName,
      },
    });
  } catch {
    return NextResponse.json<GeocodeResponse>({
      success: true,
      data: {
        city: DEFAULT_CITY,
        state: DEFAULT_STATE,
        country: DEFAULT_COUNTRY,
      },
    });
  }
};
