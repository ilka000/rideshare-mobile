import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

async function identity() {
  const session = await getServerSession(authOptions);
  return session?.user?.id && /^\d+$/.test(session.user.id) ? session.user.id : null;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await identity();
  if (!userId) return Response.json({ error: "Hyr në llogari për të parë kërkesat." }, { status: 401 });
  const { id } = await params;
  const sql = getSql();
  try {
    const trips = await sql`SELECT id, nisja, destinacioni, ora, vendtakimi, vende, shofer_id FROM udhetimet WHERE id = ${id}`;
    if (!trips[0]) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404 });
    const trip = trips[0] as { id: string; nisja: string; destinacioni: string; ora: string; vendtakimi: string; vende: number; shofer_id: string | null };
    const driver = trip.shofer_id === userId;
    const requests = driver
      ? await sql`SELECT id, udhetar_id, status FROM kerkesat WHERE udhetim_id = ${id} ORDER BY krijuar_me`
      : await sql`SELECT id, udhetar_id, status FROM kerkesat WHERE udhetim_id = ${id} AND udhetar_id = ${userId}`;
    return Response.json({ trip: { ...trip, isDriver: driver }, requests }, { headers: { "Cache-Control": "no-store, private" } });
  } catch {
    return Response.json({ error: "Gjendja nuk mund të lexohet tani." }, { status: 503 });
  }
}

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await identity();
  if (!userId) return Response.json({ error: "Hyr në llogari për të kërkuar vend." }, { status: 401 });
  const { id } = await params;
  try {
    const sql = getSql();
    const rows = await sql`INSERT INTO kerkesat (udhetim_id, udhetar_id)
      SELECT id, ${userId} FROM udhetimet WHERE id = ${id} AND vende > 0 AND shofer_id IS DISTINCT FROM ${userId}
      ON CONFLICT (udhetim_id, udhetar_id) DO UPDATE SET udhetim_id = EXCLUDED.udhetim_id
      RETURNING id, udhetar_id, status`;
    if (!rows[0]) return Response.json({ error: "Nuk ka vende ose nuk mund të kërkosh vend në udhëtimin tënd." }, { status: 409 });
    return Response.json({ request: rows[0] }, { status: 200 });
  } catch {
    return Response.json({ error: "Kërkesa nuk u ruajt. Provo përsëri." }, { status: 503 });
  }
}
