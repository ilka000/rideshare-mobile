import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId || !/^\d+$/.test(userId)) return Response.json({ error: "Hyr në llogari para se të pranosh." }, { status: 401 });
  const { id } = await params;
  try {
    const sql = getSql();
    const result = await sql`
      WITH accepted AS (
        UPDATE kerkesat k SET status = 'pranuar', pergjigjur_me = NOW()
        FROM udhetimet u
        WHERE k.id = ${id} AND k.udhetim_id = u.id AND u.shofer_id = ${userId}
          AND k.status = 'ne_pritje' AND u.vende > 0
        RETURNING k.id, k.udhetim_id
      ), reduced AS (
        UPDATE udhetimet u SET vende = u.vende - 1
        FROM accepted a WHERE u.id = a.udhetim_id
        RETURNING u.id
      )
      SELECT a.id FROM accepted a JOIN reduced r ON r.id = a.udhetim_id`;
    if (!result.length) return Response.json({ error: "Kërkesa është trajtuar, nuk ka vende, ose nuk je shoferi pronar." }, { status: 409 });
    return Response.json({ accepted: true });
  } catch {
    return Response.json({ error: "Pranimi nuk u ruajt. Provo përsëri." }, { status: 503 });
  }
}
