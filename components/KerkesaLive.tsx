"use client";

import { useCallback, useEffect, useState } from "react";

type Props = { udhetimId: string; kycur: boolean; initialVende: number };
type Req = { id: number; udhetar_id: string; status: "ne_pritje" | "pranuar" };
type Snapshot = { trip: { vende: number; isDriver: boolean }; requests: Req[] };

export function KerkesaLive({ udhetimId, kycur, initialVende }: Props) {
  const [data, setData] = useState<Snapshot | null>(null);
  const [online, setOnline] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(kycur ? "Po lexohet gjendja nga serveri…" : "Hyr me GitHub për të kërkuar ose menaxhuar vende.");
  const refresh = useCallback(async () => {
    if (!kycur) return;
    try {
      const response = await fetch(`/api/udhetimet/${encodeURIComponent(udhetimId)}/kerkesa`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
      setOnline(true);
      setMessage("Gjendja u lexua nga serveri · përditësim çdo 5 sekonda.");
    } catch {
      setOnline(false);
      setMessage("Po rilidhemi · të dhënat e fundit ruhen në ekran.");
    }
  }, [kycur, udhetimId]);

  useEffect(() => {
    if (!kycur) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      await refresh();
      if (alive) timer = setTimeout(poll, 5000);
    };
    void poll();
    return () => { alive = false; clearTimeout(timer); };
  }, [kycur, refresh]);

  async function act(url: string, method: "POST", success: string) {
    if (!online || busy) return;
    setBusy(true); setMessage("Po presim konfirmimin e serverit…");
    try {
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage(success);
      await refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Veprimi dështoi."); }
    finally { setBusy(false); }
  }

  const requests = data?.requests ?? [];
  const myRequest = data?.trip.isDriver ? undefined : requests[0];
  const seats = data?.trip.vende ?? initialVende;
  return <section className="live-requests" aria-label="Kërkesat për vende">
    <h2>{data?.trip.isDriver ? "Kërkesat për udhëtimin tim" : "Kërkesa ime"}</h2>
    <p>Vende të lira: <strong aria-live="polite">{seats}</strong></p>
    {data?.trip.isDriver ? requests.length ? requests.map((request) => <article className="request-row" key={request.id}>
      <p>Kërkesa #{request.id} · {request.status === "pranuar" ? "U pranua" : "Në pritje"}</p>
      {request.status === "ne_pritje" && <button className="action" disabled={busy || !online || seats < 1} onClick={() => void act(`/api/kerkesat/${request.id}/prano`, "POST", "Pranimi u ruajt.")}>Prano kërkesën</button>}
    </article>) : <p>Pa kërkesa.</p> : <>
      <p>{myRequest ? (myRequest.status === "pranuar" ? "U pranua · vendi u konfirmua." : "Në pritje · kërkesa u dërgua.") : "Pa kërkesë."}</p>
      {!myRequest && <button className="action" disabled={!kycur || busy || !online || seats < 1} onClick={() => void act(`/api/udhetimet/${encodeURIComponent(udhetimId)}/kerkesa`, "POST", "Kërkesa u ruajt.")}>Kërko një vend</button>}
    </>}
    {!online && <p role="alert">{message} Veprimet kërkojnë lidhje interneti.</p>}
    {online && <p role="status">{message}</p>}
  </section>;
}
