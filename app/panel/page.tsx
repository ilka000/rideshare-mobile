import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { publikoUdhetimAction, ruajOren } from "./actions";

export const dynamic = "force-dynamic";
const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Plotëso të dhënat saktë; ora duhet të jetë e vlefshme dhe vendet nga 1 deri në 8.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  publikuar: "Udhëtimi u publikua dhe tani shfaqet në listën publike.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const { m } = await searchParams;
  let p;
  try { p = await profiliIm(); }
  catch { return <main className="app-shell"><h1>Paneli im</h1><p role="alert">{mesazhet.databaza}</p><Link href="/panel">Provo përsëri</Link></main>; }
  return <main className="app-shell">
    <h1>Paneli im</h1>
    {m && mesazhet[m] && <p role="status">{mesazhet[m]}</p>}
    {!p ? <p>Lista është publike. Për panelin hyr me llogarinë tënde GitHub.</p> : <>
      <p>Përshëndetje, {p.emri}. Roli: <strong>{p.roli}</strong>.</p>
      <p>ID ime GitHub: <code>{p.id}</code></p>
    </>}
    <Hyrja brenda={Boolean(p)} />
    {p?.roli === "shofer" ? <>
    <form action={publikoUdhetimAction}>
      <h2>Publiko një udhëtim</h2>
      <label htmlFor="nisja">Nisja</label>{" "}
      <input id="nisja" name="nisja" maxLength={100} required />{" "}
      <label htmlFor="destinacioni">Destinacioni</label>{" "}
      <input id="destinacioni" name="destinacioni" maxLength={100} required />{" "}
      <label htmlFor="ora-udhetimit">Ora</label>{" "}
      <input id="ora-udhetimit" name="ora" type="time" required />{" "}
      <label htmlFor="vendtakimi">Vendtakimi</label>{" "}
      <input id="vendtakimi" name="vendtakimi" maxLength={160} required />{" "}
      <label htmlFor="vende">Vende të lira</label>{" "}
      <input id="vende" name="vende" type="number" min="1" max="8" defaultValue="1" required />{" "}
      <button type="submit">Publiko udhëtimin</button>
    </form>
    <form action={ruajOren}>
      <h2>Ndrysho orën e udhëtimit tim</h2>
      <input type="hidden" name="id" value="2" />
      <label htmlFor="ora">Ora e re</label>{" "}
      <input id="ora" name="ora" type="time" defaultValue="08:15" required />{" "}
      <button type="submit">Ruaj orën</button>
      <p>Formulari i laboratorit provon ID 2. Serveri verifikon pronarin edhe nëse ID ndryshohet.</p>
    </form>
    </> : p && <p>Si udhëtar mund të shohësh udhëtimet dhe të kërkosh vende.</p>}
    <p><Link href="/">Kthehu te udhëtimet</Link></p>
    <p>Kërkesat për vende ruhen në Neon dhe rifreskohen automatikisht.</p>
  </main>;
}
