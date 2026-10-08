# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë përmban projekti

- `lib/db.ts` krijon lidhjen private me Neon në server duke lexuar `DATABASE_URL`.
- `lib/udhetimet.ts` lexon listën dhe një udhëtim sipas ID-së me pyetje SQL parametrike.
- `app/page.tsx` lexon listën në çdo kërkesë dhe trajton listën bosh dhe gabimin e lidhjes.
- `app/udhetimi/[id]/page.tsx` lexon detajet nga e njëjta databazë; ID që mungon shfaq faqen 404.
- `app/udhetimi/[id]/kerkesa/page.tsx` shfaq simulimin e kërkesës dhe nuk ruan rezervim.
- `schema.sql` krijon tabelën `udhetimet` dhe fut tri udhëtime fiktive pa i dubluar kur ekzekutohet sërish.

`DATABASE_URL` duhet të jetë URL-ja PostgreSQL e Neon për degën/databazën ku ekzekutohet `schema.sql`. `.env.local` përjashtohet nga Git me rregullin `.env*` në `.gitignore`; mos e publiko dhe mos e vendos me prefiks `NEXT_PUBLIC_`.

## Provat për t'u kryer dhe dokumentuar

Këto kontrolle janë pjesë e ushtrimit, por raporti aktual nuk regjistron rezultate të verifikuara. Plotëso datën, rezultatin dhe çdo problem pasi t'i kryesh vetë me databazën tënde:

1. **Ndryshimi ruhet në databazë:** në Neon SQL Editor vendos përkohësisht orën e ID 2 në `08:25`; rifresko listën dhe detajet. Riktheje në `08:15` dhe rifresko sërish.
2. **Lista bosh:** vendos përkohësisht `WHERE false` vetëm te pyetja në `lexoUdhetimet`; konfirmo mesazhin “Nuk ka udhëtime për momentin.” Hiqe kushtin dhe konfirmo tri kartat.
3. **Lidhja mungon dhe rikthehet:** riemërto përkohësisht `DATABASE_URL` në `.env.local`, rinis serverin dhe konfirmo mesazhin e gabimit. Riktheje emrin, rinis serverin dhe konfirmo listën.
4. **Pamja mobile:** në Chrome/Edge përdor Inspect dhe gjerësinë 375 px.
5. **Ndërtimi:** ekzekuto `npm run build` dhe shëno rezultatin.

| Kontrolli | Rezultati / data |
| --- | --- |
| Ndryshimi i ID 2 dhe rikthimi | Për t'u plotësuar |
| Lista bosh dhe rikthimi | Për t'u plotësuar |
| Lidhja mungon dhe rikthehet | Për t'u plotësuar |
| Pamja 375 px | Për t'u plotësuar |
| `npm run build` | Për t'u plotësuar |

## Publikimi dhe dorëzimi

Projekti është në rrënjën e repository-t; aty gjenden `package.json`, `schema.sql` dhe kodi. Para dorëzimit:

1. Krijo/lidh databazën Neon dhe ekzekuto `schema.sql` në të njëjtën degë që përdor `DATABASE_URL`.
2. Verifiko `DATABASE_URL` në Vercel për Production dhe bëj redeploy pas lidhjes së Neon.
3. Kontrollo te GitHub Desktop që ndryshimet përfshijnë kodin, `schema.sql`, raportin, `package.json` dhe `package-lock.json`; mos përfshi `.env.local`, `node_modules` ose `.next`.
4. Përdor mesazhin e commit-it `Java 4 - RideShare me Neon`, shtyji ndryshimet në `main` dhe `origin`, pastaj dorëzo lidhjen kryesore të repository-t me formularin Java 4. Pas kontrollit automatik, plotëso rezultatet e provave të mësipërme.

Lidhja me Vercel/Neon dhe rezultatet e provave nuk mund të konfirmohen nga ky raport. Aplikacioni lexon vetëm udhëtime fiktive; nuk ka formular publik për shkrim, identifikim shoferi apo rezervim real. Supabase nuk kërkohet për këtë dorëzim.

## Përdorimi i AI

AI u përdor për të interpretuar udhëzimet dhe për të përditësuar dokumentimin e punës ekzistuese. Rezultatet e provave duhet të plotësohen nga studenti pasi t'i kryejë.
