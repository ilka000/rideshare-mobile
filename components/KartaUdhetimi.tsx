import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  const etiketaVendeve = udhetim.vende === 1 ? "vend i lirë" : "vende të lira";
  return (
    <article className="trip-card">
      <h2>{udhetim.nisja} – {udhetim.destinacioni}</h2>
      <p>Ora: {udhetim.ora} · {udhetim.vende} {etiketaVendeve}</p>
      <Link className="action" href={`/udhetimi/${udhetim.id}`}>Shiko detajet</Link>
    </article>
  );
}
