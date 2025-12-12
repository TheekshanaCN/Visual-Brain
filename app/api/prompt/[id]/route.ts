import { NextResponse, NextRequest } from 'next/server';

const AIUrl = process.env.RAINDROP_BACKEND_URL;
const APIKey = process.env.RAINDROP_API_KEY;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
       return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    if (!AIUrl) {
      console.error('RAINDROP_BACKEND_URL is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${AIUrl}/prompt/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey || '',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Raindrop Prompt API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Prompt Generation Failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Assuming the API returns { data: { prompt: "..." } } or just { prompt: "..." }
    const unwrappedData = data.data || data;
    return NextResponse.json(unwrappedData);
  } catch (error) {
    console.error('Prompt Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
