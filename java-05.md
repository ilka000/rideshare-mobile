# Java 5 · RideShare

Plotësoje pas provave reale. Mos vendos sekrete ose vlera nga `.env.local` këtu.

## Prova 1 · Sesioni

Hyrja me GitHub funksionoi dhe paneli shfaqi profilin me rolin shofer. Në kontroll lokal me sesion prove, sesioni mbeti aktiv pas dy kërkesave dhe dalja pastroi cookie-n e sesionit; dalja në shfletues nuk u krye.

## Prova 2 · Ndryshimi i lejuar (udhëtimi ID 2)

Paneli shfaqi sukses pas ruajtjes. Neon, lista dhe detajet e ID 2 treguan 08:25; ora u rikthye në 08:15.

## Prova 3 · Ndryshimi i refuzuar (udhëtimi ID 1)

Server Action u thirr me ID 1 nën sesion test lokal të shoferit dhe u ridrejtua me mesazhin “Nuk ke leje”. Ora mbeti 08:00. Ndryshimi manual i fushës në DevTools nuk u bë.

## Vështirësi ose gabime

Dalja në shfletues dhe ndryshimi manual në DevTools nuk u kryen. Rifreskimi/dalja dhe Server Action për ID 1 u verifikuan me sesion lokal prove; ruajtja e ID 2 u provua në panel.
