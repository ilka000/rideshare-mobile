# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova

Shtova manifestin me emrin RideShare AAB dhe ikonat e aplikacionit. Service worker-i ruan faqen offline dhe vetëm listën publike të udhëtimeve; lexuesi shfaq kartat, burimin dhe kohën e ruajtjes, pa dërguar ose konfirmuar rezervim.

## Provat që bëra

### Prova 1: Manifesti dhe vizita online

**Hapat e provës:** Me serverin lokal dhe lidhje interneti hapa `/manifest.webmanifest`, faqen kryesore dhe `/offline.html`. Kontrollova dy skedarët PNG dhe rifreskova listën në lexues.

**Rezultati real:** Manifesti tregoi emrin `RideShare AAB` dhe adresat e ikonave `icon-192.png` e `icon-512.png`; skedarët janë përkatësisht 192×192 dhe 512×512. Faqja kryesore dhe lexuesi shfaqën tri udhëtimet. Lexuesi tregoi burimin server dhe kohën e ruajtjes; lista u ruajt nga service worker-i. E provova në Safari pa instaluar aplikacionin.

### Prova 2: Pa internet, edhe pas rifreskimit

**Hapat e provës:** Pasi u ruajt lista me internet, ndala përkohësisht serverin lokal, hapa `/` dhe rifreskova faqen.

**Rezultati real:** `/` u hap nga dokumenti offline dhe shfaqi tri kartat me oraret e ruajtura. U shfaqën koha e kopjes dhe mesazhi se lista mund të jetë vjetruar; butoni **Kërko vend** ishte i çaktivizuar. Serveri u ndez përsëri për provën 3.

### Prova 3: Rikthe lidhjen dhe kërko të dhënat e reja

**Hapat e provës:** Në Neon ndryshova përkohësisht orën e ID 2 nga `08:15` në `08:25`, pastaj me serverin online shtypa **Rifresko listën**. Pas kontrollit, e riktheva ID 2 në `08:15` dhe rifreskova përsëri.

**Rezultati real:** Lexuesi mori listën nga serveri dhe shfaqi ID 2 me orën e re `08:25` dhe kohë të re ruajtjeje. Pas rikthimit, Neon konfirmoi `08:15` dhe rifreskimi i fundit në shfletues shfaqi përsëri `08:15`.
