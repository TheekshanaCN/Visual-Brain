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

    const user = await import('@/app/actions/auth').then(mod => mod.getCurrentUser());
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deductCredits } = await import('@/lib/user-utils');
    const { getAdminCreditSettings } = await import('@/lib/admin-config');

    const settings = await getAdminCreditSettings();
    const hasCredits = await deductCredits(user.workosId, settings.cardGenerationCost);

    if (!hasCredits) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
    }

    if (!AIUrl) {
      console.error('RAINDROP_BACKEND_URL is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${AIUrl}/mvp/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKey || '',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Raindrop MVP API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `MVP Generation Failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const unwrappedData = data.data || data;
    return NextResponse.json(unwrappedData);
  } catch (error) {
    console.error('MVP Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
