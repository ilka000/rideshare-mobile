# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Shtova lidhjen server-side me Neon përmes `DATABASE_URL`. Lista lexon udhëtimet me `lexoUdhetimet`, ndërsa faqet e detajeve dhe kërkesës përdorin `gjejUdhetimin`. Faqet rifreskojnë të dhënat në çdo kërkesë dhe shfaqin mesazh kur databaza nuk lidhet. `schema.sql` krijon tabelën `udhetimet` dhe tri udhëtimet fiktive.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Në Neon ndryshova orën e ID 2 nga `08:15` në `08:25`. Pas rifreskimit, lista dhe detajet shfaqën `08:25`. E riktheva në `08:15` dhe e kontrollova sërish.

### Prova 2: Lista bosh dhe rikthimi
Shtova përkohësisht `WHERE false` vetëm te pyetja e listës. U shfaq “Nuk ka udhëtime për momentin.” E hoqa kushtin dhe u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin e `DATABASE_URL` në `DATABASE_URL_PA_TEST` dhe rinisa serverin. Faqja shfaqi “Nuk u lidhëm me databazën. Provo përsëri.” Riktheva `DATABASE_URL`, rinisa serverin dhe lista me tri udhëtimet u ngarkua. `.env.local` përjashtohet nga Git përmes `.gitignore`.

Verifikimet lokale: lidhja me Neon dhe krijimi i tabelës funksionuan; u gjetën tri udhëtime. `npm run build` përfundoi me sukses, përfshirë kontrollin e TypeScript-it.

## Ku gjendet puna
- Skema: `schema.sql` në rrënjën e repository-t.
- Lidhja private: `lib/db.ts`.
- Pyetjet SQL: `lib/udhetimet.ts`.
- Faqet e ndryshuara: `app/page.tsx`, `app/udhetimi/[id]/page.tsx` dhe `app/udhetimi/[id]/kerkesa/page.tsx`.
- Repository: https://github.com/ilka000/rideshare-mobile
- Aplikacioni në Vercel: nuk është konfiguruar nga kjo punë lokale.

## Çfarë mbetet për përmirësim
Lidhja lokale me Neon funksionon. Aplikacioni nuk është lidhur me Vercel në këtë punë, prandaj publikimi online dhe konfigurimi i `DATABASE_URL` në Production mbeten për më vonë. Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI për të përshtatur udhëzimet me strukturën ekzistuese, për të shkruar lidhjen me Neon dhe për të përditësuar raportin. U verifikuan vetë ndërtimi i projektit, leximi i tri udhëtimeve dhe tri provat në aplikacionin lokal.
