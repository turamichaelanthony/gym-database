import { currentSource, listMembers } from '@/lib/data-source';

export const dynamic = 'force-dynamic';

// Returns a revenue series derived directly from the Member table.
export async function GET() {
  const source = currentSource();

  try {
    const members = await listMembers('asc');

    // Build a series: one point per member (period = index + 1, revenue = monthly_fee).
    const series = members.map((member, index) => ({
      period: index + 1,
      revenue: Math.round(Number(member.monthly_fee) || 0),
    }));

    const totalRevenue = series.reduce((total, point) => total + point.revenue, 0);

    return Response.json(
      {
        series,
        totalRevenue,
        memberCount: members.length,
        source,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'x-data-source': source,
        },
      }
    );
  } catch (error) {
    console.error('[GET /api/revenue]', error);
    return Response.json(
      {
        error: 'Failed to fetch revenue',
        detail: error?.message,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'x-data-source': source,
        },
      }
    );
  }
}
