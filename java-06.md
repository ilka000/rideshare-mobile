# Java 6 · PWA dhe lista publike offline

## Prova 1 · Manifesti dhe vizita online

**Hapat:** Me serverin lokal dhe internet, hapa `/manifest.webmanifest`, pastaj faqen kryesore dhe `/offline.html`. Kontrollova ikonat PNG dhe lexova përgjigjen e listës në lexues.

**Rezultati real:** Manifesti shfaqi emrin `RideShare AAB` dhe adresat e dy ikonave; skedarët janë 192×192 dhe 512×512. Faqja kryesore tregoi tri udhëtimet. `/offline.html` shfaqi tri karta, burimin server dhe kohën e ruajtjes; kërkesa e lexuesit u ndërmjetësua nga service worker-i.

## Prova 2 · Pa internet, pas rifreskimit

**Hapat:** Pasi u ruajt lista me internet, ndala përkohësisht serverin lokal, hapa `/` dhe rifreskova faqen.

**Rezultati real:** `/` u hap nga dokumenti offline. U shfaqën tri karta me oraret e ruajtura, koha e kopjes dhe mesazhi se lista mund të jetë vjetruar. Butoni **Kërko vend** ishte i çaktivizuar. Serveri u ndez sërish për provën 3.

## Prova 3 · Rikthimi i lidhjes dhe të dhënat e reja

**Hapat:** Ndryshova përkohësisht në Neon orën e ID 2 nga `08:15` në `08:25`, pastaj shtypa **Rifresko listën** me serverin online. Pas verifikimit, e riktheva në `08:15` dhe rifreskova përsëri.

**Rezultati real:** Lexuesi mori përgjigje të re nga serveri, tregoi ID 2 me orën `08:25` dhe shënoi kohë të re ruajtjeje. Më pas, ID 2 u rikthye në `08:15`; rifreskimi i fundit në shfletues e shfaqi `08:15`. Verifikimi përfundimtar në Neon konfirmoi `08:15`.

## Shënim

Provat u kryen lokalisht në shfletues me databazën Neon të projektit. Ndryshimi i përkohshëm u rikthye dhe ID 2 mbaroi në `08:15`.
