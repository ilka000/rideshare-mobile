# Java 3 · Kartat dhe faqet

## Prova 1 · Lista në telefon

Hapat: ekzekutova `npm run build` dhe kontrollova që faqja kryesore të përfshihej në tabelën e rrugëve të Next.js. Rezultati real: ndërtimi përfundoi pa gabime dhe rruga `/` u gjenerua; pamjen në telefon dhe lëvizjen anash nuk i verifikova në shfletues.

## Prova 2 · Detajet, vendet dhe ID 99

Hapat: kontrollova faqen dinamike të udhëtimit, të dhënat e udhëtimeve dhe trajtimin `notFound()`; ekzekutova gjithashtu `npm run build`. Rezultati real: ndërtimi përfshiu rrugën `/udhetimi/[id]` pa gabime; ID 99 dhe tekstet e vendeve i kontrollova në kod, jo me kërkesë HTTP ose klikim në shfletues.

## Prova 3 · Kërkesa dhe kthimi mbrapa

Hapat: kontrollova komponentin e kërkesës dhe ekzekutova `npm run build`. Rezultati real: ndërtimi përfshiu rrugën `/udhetimi/[id]/kerkesa` pa gabime; kodi paraqet gjendjen “Simulim: Në pritje” dhe lidhjen për t’u kthyer te detajet. Klikimin dhe navigimin nuk i verifikova në shfletues.
