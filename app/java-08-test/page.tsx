"use client";

import { useState } from "react";
import Link from "next/link";
import { Vendtakimi } from "@/components/Vendtakimi";

type Skenari = "real" | "sukses" | "refuzim" | "padisponueshem" | "timeout" | "pa-mbeshtetje";

function pozicioniProve(): GeolocationPosition {
  return {
    coords: {
      latitude: 42.66,
      longitude: 21.16,
      altitude: null,
      accuracy: 42,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      toJSON: () => ({}),
    },
    timestamp: Date.now(),
    toJSON: () => ({}),
  };
}

export default function Java08Test() {
  const [skenari, setSkenari] = useState<Skenari>("real");
  const geolocationOverride = skenari === "real"
    ? undefined
    : skenari === "pa-mbeshtetje"
      ? null
      : {
          getCurrentPosition(
            sukses: PositionCallback,
            gabim?: PositionErrorCallback | null,
          ) {
            window.setTimeout(() => {
              if (skenari === "sukses") sukses(pozicioniProve());
              else {
                const kodi = skenari === "refuzim" ? 1 : skenari === "padisponueshem" ? 2 : 3;
                gabim?.({ code: kodi, message: "Simulim laboratori", PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 });
              }
            }, 350);
          },
        };

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>Java 8 · Prova lokale e vendtakimit</h1>
      <p>Kjo faqe përdor të njëjtin komponent si detajet. Të dhënat janë lokale dhe vendtakimi nuk i dërgohet shoferit.</p>
      <label htmlFor="skenari-gjeolokacionit">Skenari i vendndodhjes</label>{" "}
      <select
        id="skenari-gjeolokacionit"
        data-testid="skenari-gjeolokacionit"
        value={skenari}
        onChange={(event) => setSkenari(event.target.value as Skenari)}
      >
        <option value="real">Pajisja reale (mund të kërkojë leje)</option>
        <option value="sukses">Simulim: pozicioni u mor</option>
        <option value="refuzim">Simulim: leja u refuzua</option>
        <option value="padisponueshem">Simulim: pozicioni s’është i disponueshëm</option>
        <option value="timeout">Simulim: koha mbaroi</option>
        <option value="pa-mbeshtetje">Simulim: shfletues pa mbështetje</option>
      </select>
      <p className="local-note">Skenarët me fjalën “Simulim” përdorin të dhëna fiktive dhe nuk provojnë lejen reale të pajisjes.</p>
      <Vendtakimi
        id="2"
        nisja="Ferizaj"
        destinacioni="AAB"
        geolocationOverride={geolocationOverride}
      />
      <p><Link href="/udhetimi/2">Hap detajet e udhëtimit në aplikacion</Link></p>
    </main>
  );
}
