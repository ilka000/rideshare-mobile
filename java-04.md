# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë përmban projekti

- `lib/db.ts` krijon lidhjen private me Neon në server duke lexuar `DATABASE_URL`.
- `lib/udhetimet.ts` lexon listën dhe një udhëtim sipas ID-së me pyetje SQL parametrike.
- `app/page.tsx` lexon listën në çdo kërkesë dhe trajton listën bosh dhe gabimin e lidhjes.
- `app/udhetimi/[id]/page.tsx` lexon detajet nga e njëjta databazë; ID që mungon shfaq faqen 404.
- `app/udhetimi/[id]/kerkesa/page.tsx` shfaq simulimin e kërkesës dhe nuk ruan rezervim.
- `schema.sql` krijon tabelën `udhetimet` dhe fut tri udhëtime fiktive pa i dubluar kur ekzekutohet sërish.

`DATABASE_URL` duhet të jetë URL-ja PostgreSQL e Neon për degën/databazën ku ekzekutohet `schema.sql`. `.env.local` përjashtohet nga Git me rregullin `.env*` në `.gitignore`; mos e publiko dhe mos e vendos me prefiks `NEXT_PUBLIC_`.

## Gjendja e databazës

Më 8 tetor 2026, `schema.sql` u ekzekutua përmes `DATABASE_URL` lokal në Neon. Tabela `udhetimet` u krijua (ose u la e paprekur nëse ekzistonte) dhe u konfirmuan tri rreshta. `INSERT ... ON CONFLICT DO NOTHING` e bën ekzekutimin të përsëritshëm pa dubluar ID-të ekzistuese.

## Provat e verifikimit

Provat e mëposhtme u kryen më 8 tetor 2026. Provat lokale u bënë në serverin Next.js; prova e orës u bë në Neon përmes `DATABASE_URL`.

1. **Ndryshimi ruhet në databazë:** në Neon SQL Editor vendos përkohësisht orën e ID 2 në `08:25`; rifresko listën dhe detajet. Riktheje në `08:15` dhe rifresko sërish.
2. **Lista bosh:** vendos përkohësisht `WHERE false` vetëm te pyetja në `lexoUdhetimet`; konfirmo mesazhin “Nuk ka udhëtime për momentin.” Hiqe kushtin dhe konfirmo tri kartat.
3. **Lidhja mungon dhe rikthehet:** riemërto përkohësisht `DATABASE_URL` në `.env.local`, rinis serverin dhe konfirmo mesazhin e gabimit. Riktheje emrin, rinis serverin dhe konfirmo listën.
4. **Pamja mobile:** në Chrome/Edge përdor Inspect dhe gjerësinë 375 px.
5. **Ndërtimi:** ekzekuto `npm run build` dhe shëno rezultatin.

| Kontrolli | Rezultati / data |
| --- | --- |
| Ndryshimi i ID 2 dhe rikthimi | Kaloi: ora u ndryshua nga `08:15` në `08:25`, u lexua nga databaza, pastaj u rikthye dhe u verifikua si `08:15`. Në fund u konfirmuan 3 rreshta. (08.10.2026) |
| Lista bosh dhe rikthimi | Kaloi: me `WHERE false` të vendosur përkohësisht te pyetja e listës, faqja shfaqi “Nuk ka udhëtime për momentin.” Kushti u hoq; faqja shfaqi përsëri udhëtimet Prishtinë, Fushë Kosovë dhe Lipjan. (08.10.2026) |
| Lidhja mungon dhe rikthehet | Kaloi: me `DATABASE_URL` testuese të pavlefshme serveri shfaqi “Nuk u lidhëm me databazën. Provo përsëri.” Pas rinisjes me konfigurimin origjinal, lista me tri udhëtime u shfaq përsëri. Skedari `.env.local` nuk u ndryshua. (08.10.2026) |
| Pamja 375 px | Rregullat responsive u kontrolluan në CSS: në gjerësi deri 480 px `main` merr padding 16 px, kartat 16 px, dhe `min-width: 0`/`overflow-wrap: anywhere` shmangin tejmbushjen. Pamja në Chrome/Edge me viewport 375 px nuk u verifikua vizualisht në këtë mjedis. |
| `npm run build` | Kaloi: kompilimi, kontrolli i TypeScript, gjenerimi i faqeve dhe build-i prodhimor përfunduan me sukses. (08.10.2026) |

## Publikimi dhe dorëzimi

Projekti është në rrënjën e repository-t; aty gjenden `package.json`, `schema.sql` dhe kodi. Para dorëzimit:

1. Krijo/lidh databazën Neon dhe ekzekuto `schema.sql` në të njëjtën degë që përdor `DATABASE_URL`.
2. Verifiko `DATABASE_URL` në Vercel për Production dhe bëj redeploy pas lidhjes së Neon.
3. Kontrollo te GitHub Desktop që ndryshimet përfshijnë kodin, `schema.sql`, raportin, `package.json` dhe `package-lock.json`; mos përfshi `.env.local`, `node_modules` ose `.next`.
4. Përdor mesazhin e commit-it `Java 4 - RideShare me Neon`, shtyji ndryshimet në `main` dhe `origin`, pastaj dorëzo lidhjen kryesore të repository-t me formularin Java 4. Pas kontrollit automatik, plotëso rezultatet e provave të mësipërme.

Lidhja me Vercel dhe formulari i dorëzimit nuk u verifikuan këtu. Aplikacioni lexon vetëm udhëtime fiktive; nuk ka formular publik për shkrim, identifikim shoferi apo rezervim real. Supabase nuk kërkohet për këtë dorëzim.

## Përdorimi i AI

AI u përdor për të interpretuar udhëzimet, për të ndihmuar me verifikimet dhe për të përditësuar dokumentimin e punës ekzistuese.
