# RideShare · Java 10 · Dy ekrane, një gjendje

## Çfarë u ndërtua

Kërkesat për vende ruhen në Neon në tabelën `kerkesat`. API-ja merr identitetin e udhëtarit nga sesioni GitHub; klienti dërgon vetëm ID-në e udhëtimit. Kërkesa e njëjtë e të njëjtit udhëtar nuk krijon rresht të dytë. Shoferi mund të lexojë kërkesat vetëm për udhëtimet ku `shofer_id` përputhet me sesionin e tij, ndërsa udhëtari lexon kërkesën e vet.

Komponenti `KerkesaLive` lexon gjendjen menjëherë dhe më pas çdo 5 sekonda. Ai pret leximin që është në zhvillim, pastron timer-in kur faqja mbyllet, ruan pamjen e fundit kur leximi dështon dhe çaktivizon veprimet gjatë offline. Pas rilidhjes, leximi i radhës rifreskon gjendjen. Shoferi mund të pranojë kërkesën vetëm në udhëtimin e vet. Pranimi ndryshon statusin dhe ul vendet me një query atomike; statusi `ne_pritje` dhe kushti `vende > 0` parandalojnë pranimin e përsëritur dhe vendet negative.

## Skedarët e ndryshuar

- `schema-java10.sql` — tabela, gjendjet dhe kufizimi unik udhëtar/udhëtim.
- `app/api/udhetimet/[id]/kerkesa/route.ts` — lexim i kufizuar sipas sesionit dhe krijimi idempotent i kërkesës.
- `app/api/kerkesat/[id]/prano/route.ts` — pranimi nga shoferi pronar dhe ulja atomike e vendeve.
- `components/KerkesaLive.tsx` — pamja e kërkesës, pranimi, polling-u dhe trajtimi i rilidhjes.
- `app/udhetimi/[id]/page.tsx`, `app/globals.css` — vendosja dhe stili.

## Përgatitja në Neon

`schema-java10.sql` u ekzekutua me sukses në projektin Neon `rideshare-java4`, databaza `neondb`, branch `production`. Para migrimit, kontrollova se aty ekzistonin tabelat `profilet`, `udhetimet` dhe `preferimet`. Pas migrimit, query-t e verifikimit konfirmuan tabelën `kerkesat` dhe indekset `kerkesat_pkey`, `kerkesat_udhetim_id_udhetar_id_key`, `kerkesat_udhetim_id_idx`.

Për të caktuar shoferin e provës, hyr një herë me GitHub që profili të krijohet dhe caktoje atë ID numerike si `shofer_id` të udhëtimit; profili duhet të ketë rolin `shofer`. Përdor një ID udhëtimi me dy vende dhe dy llogari të ndara.

## Provat e kërkuara dhe statusi

U hap aplikacioni lokal me konfigurimin Neon/GitHub dhe u verifikua sesioni shofer. U krijua udhëtimi fiktiv `JAVA10-TEST-20261119` me dy vende dhe pronar shoferin e sesionit. Faqja e shoferit e lexoi nga serveri dhe shfaqi dy vende e “Pa kërkesa”. Provat e kërkesës nga udhëtari dhe offline presin një sesion të dytë GitHub; ato nuk raportohen si të kaluara.

1. **Kërkesa në pritje:** pjesërisht e kontrolluar. Shoferi e lexoi udhëtimin e provës me dy vende dhe pa që ende s’kishte kërkesa. Dërgimi dhe shfaqja në sesionin tjetër presin hyrjen e udhëtarit testues.
2. **Pranimi:** e paprovuar. Duhet verifikuar që të dy sesionet tregojnë `U pranua` dhe 1 vend; përsëritja e pranimit nuk e ul numrin përsëri. Provo gjithashtu një udhëtim testues me 0 vende.
3. **Offline/rilidhja:** e paprovuar. Vendose vetëm sesionin e udhëtarit në Offline, prano kërkesën nga shoferi online, pastaj rikthe No throttling. Udhëtari duhet të mbajë vlerat e fundit me paralajmërim dhe të rifreskohet vetë.

**Vëzhgimet reale:** `JAVA10-TEST-20261119` u krijua në Neon me 2 vende. Faqja lokale u hap me rolin shofer; serveri ktheu pronësinë e udhëtimit dhe pamja tregoi 2 vende e “Pa kërkesa”. Rezultati i sesionit të udhëtarit dhe i rilidhjes ende mungon.

## Kufizime të njohura

Pranimi përditëson në mënyrë atomike statusin dhe numrin e vendeve përmes një query-je PostgreSQL. Për identitetin e shoferit përdoret pronësia ekzistuese `udhetimet.shofer_id`; skema demo nuk cakton automatikisht shoferë realë. Shtimi i roleve/pronësisë dhe ekzekutimi i tri provave kërkojnë të dhëna të vlefshme në Neon.
