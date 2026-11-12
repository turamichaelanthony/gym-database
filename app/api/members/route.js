import { createMember, currentSource, listMembers } from '@/lib/data-source';

export const dynamic = 'force-dynamic';

function responseHeaders(source) {
  return {
    'Cache-Control': 'no-store',
    'x-data-source': source,
  };
}

export async function GET() {
  const source = currentSource();

  try {
    const members = await listMembers('desc');
    return Response.json(members, {
      status: 200,
      headers: responseHeaders(source),
    });
  } catch (error) {
    console.error('[GET /api/members]', error);
    return Response.json(
      {
        error: 'Failed to fetch members',
        detail: error?.message,
      },
      { status: 500, headers: responseHeaders(source) }
    );
  }
}

export async function POST(request) {
  const source = currentSource();

  try {
    const body = await request.json();

    if (!body?.member_name || !String(body.member_name).trim()) {
      return Response.json(
        { error: 'member_name is required' },
        { status: 400, headers: responseHeaders(source) }
      );
    }

    const newMember = await createMember(body);
    return Response.json(newMember, {
      status: 201,
      headers: responseHeaders(source),
    });
  } catch (error) {
    console.error('[POST /api/members]', error);
    return Response.json(
      {
        error: 'Failed to create member',
        detail: error?.message,
      },
      { status: 500, headers: responseHeaders(source) }
    );
  }
}
