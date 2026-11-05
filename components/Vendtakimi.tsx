"use client";

import { useState } from "react";

type Props = {
  id: string;
  nisja: string;
  destinacioni: string;
  geolocationOverride?: Pick<Geolocation, "getCurrentPosition"> | null;
};

type LocationState = "idle" | "loading" | "success" | "denied" | "timeout" | "unavailable";

export function Vendtakimi({ id, nisja, destinacioni, geolocationOverride }: Props) {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [meetingError, setMeetingError] = useState("");

  function konfirmo() {
    const iPastruar = teksti.trim();
    if (!iPastruar) {
      setMeetingError("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }
    setVendtakimi(iPastruar);
    setMeetingError("");
  }

  function perdorVendndodhjen() {
    const geolocation = geolocationOverride === undefined
      ? navigator.geolocation
      : geolocationOverride;
    if (!geolocation) {
      setAccuracy(null);
      setLocationState("unavailable");
      return;
    }

    setAccuracy(null);
    setLocationState("loading");
    geolocation.getCurrentPosition(
      (position) => {
        setAccuracy(Math.round(position.coords.accuracy));
        setLocationState("success");
      },
      (error) => {
        setAccuracy(null);
        if (error.code === 1) setLocationState("denied");
        else if (error.code === 2) setLocationState("unavailable");
        else setLocationState("timeout");
      },
      { timeout: 10000 },
    );
  }

  const locationMessage: Record<LocationState, string> = {
    idle: "",
    loading: "Po kërkojmë vendndodhjen…",
    success: "Pozicioni u mor. Shkruaj një emër vendi të dallueshëm.",
    denied: "Leja u refuzua. Shkruaj vendtakimin vetë.",
    timeout: "Koha për leximin e vendndodhjes mbaroi. Provo sërish ose shkruaj vetë.",
    unavailable: "Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.",
  };

  return (
    <section className="meetup" aria-labelledby={`meetup-title-${id}`}>
      <h2 id={`meetup-title-${id}`}>Zgjidh vendtakimin</h2>
      <p>Udhëtimi: {nisja} → {destinacioni}</p>
      <label htmlFor={`meetup-input-${id}`}>Shkruaj vendtakimin</label>
      <input
        id={`meetup-input-${id}`}
        data-testid="meeting-input"
        value={teksti}
        onChange={(event) => setTeksti(event.target.value)}
        placeholder="p.sh. Biblioteka"
      />
      <div className="meetup-actions">
        <button className="action" type="button" data-testid="confirm-meeting" onClick={konfirmo}>Konfirmo në telefon</button>
        <button className="action secondary-action" type="button" data-testid="locate-me" onClick={perdorVendndodhjen} disabled={locationState === "loading"}>
          {locationState === "loading" ? "Po kërkojmë…" : "Përdor vendndodhjen time"}
        </button>
      </div>
      <p data-testid="meeting-error" role="alert">{meetingError}</p>
      <p data-testid="location-status" data-state={locationState} aria-live="polite" role={locationState === "denied" || locationState === "timeout" || locationState === "unavailable" ? "alert" : "status"}>
        {locationMessage[locationState]}
      </p>
      <p data-testid="location-accuracy" aria-live="polite">{accuracy === null ? "" : `${accuracy} m`}</p>
      <p data-testid="confirmed-meeting"><strong>Vendtakimi i konfirmuar:</strong> {vendtakimi || "Ende nuk është zgjedhur"}</p>
      <p className="local-note">Zgjedhja ruhet vetëm në këtë telefon dhe mund të humbasë pas rifreskimit. Shoferi nuk e merr këtë vendtakim.</p>
    </section>
  );
}
