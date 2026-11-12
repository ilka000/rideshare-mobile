import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { Vendtakimi } from "@/components/Vendtakimi";
import { Preferimi } from "@/components/Preferimi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }
  if (!udhetim) notFound();
  const session = await getServerSession(authOptions);
  const etiketaVendeve = udhetim.vende === 1 ? "vend i lirë" : "vende të lira";

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>{udhetim.nisja} – {udhetim.destinacioni}</h1>
      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <p>{udhetim.vende} {etiketaVendeve}</p>
      <Preferimi udhetimId={id} kycur={Boolean(session?.user?.id)} />
      <Vendtakimi id={id} nisja={udhetim.nisja} destinacioni={udhetim.destinacioni} />
      {udhetim.vende > 0
        ? <Link className="action" href={`/udhetimi/${id}/kerkesa`}>Kërko vend</Link>
        : <button className="action" disabled>Nuk ka vende të lira</button>}
    </main>
  );
}
