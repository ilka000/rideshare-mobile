"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

type Props = { udhetimId: string; kycur: boolean };
type State = "loading" | "idle" | "saving" | "saved" | "error";

export function Preferimi({ udhetimId, kycur }: Props) {
  const [state, setState] = useState<State>(kycur ? "loading" : "idle");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(kycur ? "Po lexojmë preferimet…" : "Hyr për të parë dhe ruajtur preferimet.");

  useEffect(() => {
    if (!kycur) return;
    let active = true;
    fetch("/api/preferimet", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (!active) return;
        setCount(data.count);
        setState(data.ids.includes(udhetimId) ? "saved" : "idle");
        setMessage("Preferimet u lexuan nga serveri.");
      })
      .catch((error: Error) => { if (active) { setState("error"); setMessage(error.message || "Preferimet nuk u lexuan."); } });
    return () => { active = false; };
  }, [kycur, udhetimId]);

  async function save() {
    if (!kycur) { await signIn("github", { callbackUrl: `/udhetimi/${udhetimId}` }); return; }
    if (state === "saving" || state === "saved" || state === "loading") return;
    const previousCount = count;
    setState("saving");
    setCount((n) => n + 1);
    setMessage("Po presim konfirmimin e serverit.");
    try {
      const response = await fetch("/api/preferimet", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ udhetimId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCount(data.count);
      setState("saved");
      setMessage("U ruajt te të preferuarat.");
    } catch (error) {
      setCount(previousCount);
      setState("error");
      setMessage(error instanceof Error ? error.message : "Nuk u ruajt. Provo përsëri.");
    }
  }

  const saved = state === "saved";
  return <section className="favorite" aria-label="Preferimi i udhëtimit">
    <button className="action" type="button" onClick={save} disabled={state === "loading" || state === "saving" || saved}
      aria-pressed={saved} aria-label={saved ? "Udhëtimi është i ruajtur" : "Ruaj udhëtimin"}>
      {state === "saving" ? "★ Po ruhet…" : saved ? "★ I ruajtur" : state === "error" ? "☆ Provo përsëri" : "☆ Ruaj udhëtimin"}
    </button>
    <p className="favorite-count" aria-live="polite">Të preferuarat: <strong>{count}</strong></p>
    <p className="local-note">Preferim personal · jo rezervim</p>
    <p role={state === "error" ? "alert" : "status"}>{message}</p>
  </section>;
}
