import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { KerkesaLive } from "@/components/KerkesaLive";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
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

  return (
    <main>
      <Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
      <h1>Kërkesë për vend · {udhetim.nisja} → {udhetim.destinacioni}</h1>
      <KerkesaLive udhetimId={id} kycur={Boolean(session?.user?.id)} initialVende={udhetim.vende} />
    </main>
  );
}
