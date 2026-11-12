import { currentSource, deleteMember, updateMember } from '@/lib/data-source';

export const dynamic = 'force-dynamic';

function responseHeaders(source) {
  return {
    'Cache-Control': 'no-store',
    'x-data-source': source,
  };
}

async function resolveId(context) {
  const params = await context.params;
  const id = Number(params?.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(request, context) {
  const source = currentSource();
  const id = await resolveId(context);

  if (!id) {
    return Response.json(
      { error: 'A valid member ID is required' },
      { status: 400, headers: responseHeaders(source) }
    );
  }

  try {
    const body = await request.json();
    const updated = await updateMember(id, body);

    if (!updated) {
      return Response.json(
        { error: 'Member not found' },
        { status: 404, headers: responseHeaders(source) }
      );
    }

    return Response.json(updated, {
      status: 200,
      headers: responseHeaders(source),
    });
  } catch (error) {
    console.error('[PUT /api/members/:id]', error);
    const status = error?.code === 'P2025' ? 404 : 500;
    return Response.json(
      {
        error: status === 404 ? 'Member not found' : 'Failed to update member',
        detail: error?.message,
      },
      { status, headers: responseHeaders(source) }
    );
  }
}

export async function DELETE(request, context) {
  const source = currentSource();
  const id = await resolveId(context);

  if (!id) {
    return Response.json(
      { error: 'A valid member ID is required' },
      { status: 400, headers: responseHeaders(source) }
    );
  }

  try {
    const deleted = await deleteMember(id);

    if (!deleted) {
      return Response.json(
        { error: 'Member not found' },
        { status: 404, headers: responseHeaders(source) }
      );
    }

    return Response.json(deleted, {
      status: 200,
      headers: responseHeaders(source),
    });
  } catch (error) {
    console.error('[DELETE /api/members/:id]', error);
    const status = error?.code === 'P2025' ? 404 : 500;
    return Response.json(
      {
        error: status === 404 ? 'Member not found' : 'Failed to delete member',
        detail: error?.message,
      },
      { status, headers: responseHeaders(source) }
    );
  }
}
