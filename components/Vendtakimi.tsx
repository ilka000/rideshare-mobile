"use client";

import { useState } from "react";

type Props = { id: string; nisja: string; destinacioni: string };

export function Vendtakimi({ id, nisja, destinacioni }: Props) {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [dukeKerkuar, setDukeKerkuar] = useState(false);
  const [mesazhi, setMesazhi] = useState("");

  function konfirmo() {
    const iPastruar = teksti.trim();
    if (!iPastruar) {
      setMesazhi("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }
    setVendtakimi(iPastruar);
    setMesazhi("Vendtakimi u konfirmua në këtë telefon.");
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setMesazhi("Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }

    setDukeKerkuar(true);
    setMesazhi("Po kërkojmë vendndodhjen…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDukeKerkuar(false);
        const saktesia = Math.round(position.coords.accuracy);
        setMesazhi(`Pozicioni u mor. Saktësia rreth ${saktesia} m. Shkruaj një emër vendi të dallueshëm.`);
      },
      (error) => {
        setDukeKerkuar(false);
        if (error.code === 1) setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
        else if (error.code === 2) setMesazhi("Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.");
        else setMesazhi("Koha për leximin e vendndodhjes mbaroi. Provo sërish ose shkruaj vetë.");
      },
      { timeout: 10000 },
    );
  }

  return (
    <section className="meetup" aria-labelledby={`meetup-title-${id}`}>
      <h2 id={`meetup-title-${id}`}>Zgjidh vendtakimin</h2>
      <p>Udhëtimi: {nisja} → {destinacioni}</p>
      <label htmlFor={`meetup-input-${id}`}>Shkruaj vendtakimin</label>
      <input
        id={`meetup-input-${id}`}
        data-testid="vendtakimi-input"
        value={teksti}
        onChange={(event) => setTeksti(event.target.value)}
        placeholder="p.sh. Biblioteka"
      />
      <div className="meetup-actions">
        <button className="action" type="button" data-testid="vendtakimi-konfirmo" onClick={konfirmo}>Konfirmo në telefon</button>
        <button className="action secondary-action" type="button" data-testid="vendtakimi-gps" onClick={perdorVendndodhjen} disabled={dukeKerkuar}>
          {dukeKerkuar ? "Po kërkojmë…" : "Përdor vendndodhjen time"}
        </button>
      </div>
      <p aria-live="polite" role={mesazhi.includes("refuzua") || mesazhi.includes("mbaroi") || mesazhi.includes("nuk") ? "alert" : "status"}>
        {mesazhi}
      </p>
      <p><strong>Vendtakimi i konfirmuar:</strong> {vendtakimi || "Ende nuk është zgjedhur"}</p>
      <p className="local-note">Zgjedhja ruhet vetëm në këtë telefon dhe mund të humbasë pas rifreskimit. Shoferi nuk e merr këtë vendtakim.</p>
    </section>
  );
}
