# Java 5 · RideShare

Plotësoje pas provave reale. Mos vendos sekrete ose vlera nga `.env.local` këtu.

## Prova 1 · Sesioni

Hapa `/panel`, klikova **Hyr me GitHub** dhe autorizova llogarinë; paneli shfaqi profilin me rolin **shofer**. Pastaj kontrollova sesionin lokal dy herë radhazi dhe ai mbeti aktiv; kërkesa e daljes pastroi cookie-n e sesionit. Dalja nuk u klikua në shfletues.

## Prova 2 · Ndryshimi i lejuar (udhëtimi ID 2)

Në panel vendosa `08:25` te fusha e orës dhe klikova **Ruaj orën**; paneli shfaqi sukses. Kontrollova Neon, listën dhe detajet e ID 2, ku ora ishte `08:25`, pastaj e riktheva në `08:15`.

## Prova 3 · Ndryshimi i refuzuar (udhëtimi ID 1)

Me një sesion prove lokal të shoferit, dërgova formularin te Server Action me `id=1` në vend të `id=2`; serveri e refuzoi kërkesën dhe shfaqi “Nuk ke leje”. Kontrolli në Neon konfirmoi se ora e ID 1 mbeti `08:00`; ndryshimi manual në DevTools nuk u krye.

## Vështirësi ose gabime

Dalja në shfletues dhe ndryshimi manual në DevTools nuk u kryen. Rifreskimi/dalja dhe Server Action për ID 1 u verifikuan me sesion lokal prove; ruajtja e ID 2 u provua në panel.
