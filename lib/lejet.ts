import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getSql } from "./db";

type Profil = { id: string; emri: string; roli: "udhetar" | "shofer" };

export async function profiliIm(): Promise<Profil | null> {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || !/^\d+$/.test(id)) return null;
  const sql = getSql();
  await sql`INSERT INTO profilet (github_id, emri) VALUES (${id}, ${session.user.name ?? "Student"})
    ON CONFLICT (github_id) DO NOTHING`;
  const rows = await sql`SELECT github_id AS id, emri, roli FROM profilet WHERE github_id = ${id}`;
  return rows[0] as Profil | undefined ?? null;
}

export async function ndryshoOren(id: string, ora: string) {
  const p = await profiliIm();
  if (!p) return "hyr";
  if (p.roli !== "shofer") return "ndaluar";
  if (!/^[123]$/.test(id) || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(ora)) return "fushe";
  const sql = getSql();
  const rows = await sql`UPDATE udhetimet SET ora = ${ora}
    WHERE id = ${id} AND shofer_id = ${p.id}
      AND EXISTS (SELECT 1 FROM profilet WHERE github_id = ${p.id} AND roli = 'shofer')
    RETURNING id`;
  return rows.length === 1 ? "ruajtur" : "ndaluar";
}

export async function publikoUdhetimin(input: {
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: string;
}) {
  const p = await profiliIm();
  if (!p) return "hyr";
  if (p.roli !== "shofer") return "ndaluar";

  const nisja = input.nisja.trim();
  const destinacioni = input.destinacioni.trim();
  const vendtakimi = input.vendtakimi.trim();
  const vende = Number(input.vende);
  if (!nisja || !destinacioni || !vendtakimi || nisja.length > 100 || destinacioni.length > 100 || vendtakimi.length > 160 ||
      !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(input.ora) || !Number.isInteger(vende) || vende < 1 || vende > 8) {
    return "fushe";
  }

  const sql = getSql();
  const id = crypto.randomUUID();
  await sql`INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende, shofer_id)
    VALUES (${id}, ${nisja}, ${destinacioni}, ${input.ora}, ${vendtakimi}, ${vende}, ${p.id})`;
  return "publikuar";
}
