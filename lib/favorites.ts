import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getSql } from "./db";

export async function perdoruesiKycur() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || !/^\d+$/.test(id)) return null;
  const sql = getSql();
  await sql`INSERT INTO profilet (github_id, emri) VALUES (${id}, ${session.user.name ?? "Student"}) ON CONFLICT (github_id) DO NOTHING`;
  return id;
}

export async function lexoPreferimet(userId: string) {
  const sql = getSql();
  return sql`SELECT udhetim_id AS id FROM preferimet WHERE github_id = ${userId} ORDER BY krijuar_me DESC`;
}

export async function ruajPreferimin(userId: string, tripId: string) {
  const sql = getSql();
  const rows = await sql`INSERT INTO preferimet (github_id, udhetim_id)
    SELECT ${userId}, id FROM udhetimet WHERE id = ${tripId}
    ON CONFLICT (github_id, udhetim_id) DO NOTHING RETURNING udhetim_id`;
  return rows.length > 0;
}
