import { NextResponse } from "next/server";
import { lexoPreferimet, perdoruesiKycur, ruajPreferimin } from "@/lib/favorites";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const userId = await perdoruesiKycur();
    if (!userId) return NextResponse.json({ error: "Hyr para se të ruash preferime." }, { status: 401 });
    const rows = await lexoPreferimet(userId);
    return NextResponse.json({ ids: rows.map((row) => row.id), count: rows.length });
  } catch {
    return NextResponse.json({ error: "Preferimet nuk u lexuan. Provo rifreskimin." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await perdoruesiKycur();
    if (!userId) return NextResponse.json({ error: "Hyr para se të ruash preferime." }, { status: 401 });
    const body = await request.json().catch(() => null) as { udhetimId?: unknown } | null;
    if (typeof body?.udhetimId !== "string" || !body.udhetimId.trim()) {
      return NextResponse.json({ error: "ID e udhëtimit mungon." }, { status: 400 });
    }
    const created = await ruajPreferimin(userId, body.udhetimId.trim());
    if (!created) {
      const rows = await lexoPreferimet(userId);
      const exists = rows.some((row) => row.id === body.udhetimId);
      if (!exists) return NextResponse.json({ error: "Udhëtimi nuk u gjet." }, { status: 404 });
    }
    const rows = await lexoPreferimet(userId);
    return NextResponse.json({ ok: true, ids: rows.map((row) => row.id), count: rows.length }, { status: created ? 201 : 200 });
  } catch {
    return NextResponse.json({ error: "Preferimi nuk u ruajt. Provo përsëri." }, { status: 503 });
  }
}
