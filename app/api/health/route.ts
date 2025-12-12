import { NextResponse } from 'next/server';

const AIUrl = process.env.RAINDROP_BACKEND_URL;
const APIKey = process.env.RAINDROP_API_KEY;

export async function GET() {
  try {
    if (!AIUrl) {
      console.error('RAINDROP_BACKEND_URL is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${AIUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey || '',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Raindrop Health API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Health Check Failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Health Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
