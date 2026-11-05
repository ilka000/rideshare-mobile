# RideShare · Java 8 · Vendtakimi

## Çfarë u ndërtua

Te `components/Vendtakimi.tsx` u shtuan fusha manuale dhe zgjedhja e vendndodhjes me klikim. Teksti në fushë dhe vendtakimi i konfirmuar janë gjendje të ndara. Koordinatat nuk ruhen; shfaqet vetëm saktësia dhe përdoruesi shkruan vetë emrin e vendit. Zgjedhja mbetet lokale dhe shoferi nuk e merr.

Komponenti përdoret si te detajet e udhëtimit, ashtu edhe te `/java-08-test`. Faqja e testimit punon me të dhëna lokale, pa login ose Neon. Ajo lejon të provohen përgjigjet e leximit të vendndodhjes me simulime të shënuara qartë si fiktive. Rastet dhe selektorët ruhen te `mobile-week08.json`.

## Provat që bëra

Provat e ndërveprimit u kryen në Safari te `http://localhost:3002/java-08-test`. Skenarët me fjalën **simulim** janë fiktivë. Pranimi dhe refuzimi u provuan veçmas me kërkesë reale të lejes së Safari-t në localhost; nuk u përdor telefon fizik.

### Prova 1 · Hapja pa kërkuar leje

**Hapat:** Hapa `/java-08-test` dhe nuk shtypa butonin e vendndodhjes.

**Pritshmëria:** Faqja hapet pa kërkuar leje; fusha manuale është aktive.

**Vëzhgimi:** Faqja u hap pa kërkesë lejeje. Fusha manuale dhe butoni i konfirmimit ishin të përdorshëm.

### Prova 2 · Konfirmimi manual

**Hapat:** Shkrova `Biblioteka` dhe shtypa **Konfirmo në telefon**.

**Pritshmëria:** Vendtakimi i konfirmuar shfaq `Biblioteka`.

**Vëzhgimi:** Mesazhi i suksesit u shfaq dhe vendtakimi i konfirmuar ishte `Biblioteka`.

### Prova 3 · Teksti bosh ose vetëm hapësira

**Hapat:** Me `Biblioteka` të konfirmuar, vendosa vetëm hapësira në fushë dhe shtypa **Konfirmo në telefon**.

**Pritshmëria:** Kërkohet plotësimi dhe vendtakimi i konfirmuar mbetet i pandryshuar.

**Vëzhgimi:** U shfaq `Shkruaj vendtakimin para se ta konfirmosh.`; zgjedhja e konfirmuar mbeti `Biblioteka`.

### Prova 4 · Ndryshimi pa konfirmim

**Hapat:** Pasi konfirmova `Biblioteka`, shkrova `Parkingu` pa shtypur konfirmimin.

**Pritshmëria:** Vendtakimi i konfirmuar mbetet `Biblioteka`.

**Vëzhgimi:** Teksti në fushë ndryshoi; vlera e konfirmuar nuk ndryshoi.

### Prova 5 · Gjendja e pritjes

**Hapat:** Zgjodha `Pajisja reale`, shtypa **Përdor vendndodhjen time** dhe zgjodha **Allow** në kërkesën e Safari-t.

**Pritshmëria:** Gjatë pritjes shfaqet `Po kërkojmë vendndodhjen…` dhe butoni çaktivizohet.

**Vëzhgimi:** Teksti i pritjes u shfaq dhe butoni u çaktivizua përkohësisht.

### Prova 6 · Suksesi i simuluar

**Hapat:** Në të njëjtin skenar simulimi prita përgjigjen.

**Pritshmëria:** Pritja mbaron dhe shfaqet suksesi bashkë me saktësinë.

**Vëzhgimi:** Pritja mbaroi dhe Safari shfaqi `Pozicioni u mor. Saktësia rreth 35 m.` Aplikacioni shfaqi vetëm saktësinë; nuk shfaqi ose ruajti koordinatat.

### Prova 7 · Refuzimi dhe vazhdimi manual

**Hapat:** Hapa të njëjtën faqe nga `http://127.0.0.1:3002/java-08-test`, shtypa **Përdor vendndodhjen time** dhe zgjodha **Don't Allow** në kërkesën reale të Safari-t. Pastaj shkrova dhe konfirmova `Parkingu`.

**Pritshmëria:** Pritja mbaron, shfaqet udhëzimi për mënyrën manuale dhe përdoruesi mund ta konfirmojë vendin.

**Vëzhgimi:** U shfaq `Leja u refuzua. Shkruaj vendtakimin vetë.` Pastaj `Parkingu` u konfirmua me sukses. Leja u refuzua për këtë kërkesë; nuk e ruajta vendimin për një ditë.

### Prova 8 · Gabime të tjera të vendndodhjes

**Hapat:** Provoa simulimet për pozicion të padisponueshëm (kodi 2), timeout (kodi 3) dhe shfletues pa mbështetje.

**Pritshmëria:** Çdo rast shfaq mesazhin përkatës; pritja mbaron pas kodeve 2 dhe 3; fusha manuale mbetet e përdorshme.

**Vëzhgimi:** Kodi 2 shfaqi `Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.` Kodi 3 shfaqi `Koha për leximin e vendndodhjes mbaroi. Provo sërish ose shkruaj vetë.` Pa mbështetje u shfaq `Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.`

### Prova 9 · Gjendja pas rifreskimit

**Hapat:** Rifreskova faqen pasi kisha provuar vendtakimin manual.

**Pritshmëria:** Gjendja lokale mund të humbasë pas rifreskimit.

**Vëzhgimi:** Fusha u zbraz dhe vendtakimi u kthye në `Ende nuk është zgjedhur`.

### Hyrje e re · Pozicioni merret, por vendtakimi nuk konfirmohet vetë

**Hyrja që provova:** Në `http://localhost:3004/java-08-test` lashë skenarin `Simulim: pozicioni u mor` dhe klikova **Përdor vendndodhjen time**.

**Parashikimi im para klikimit:** Prisja që suksesi i GPS-it ta plotësonte fushën ose ta vendoste automatikisht një vendtakim të konfirmuar.

**Çfarë pashë realisht:** Menjëherë pas klikimit butoni u çaktivizua dhe u shfaq `Po kërkojmë vendndodhjen…`. Pas rreth 350 ms butoni u aktivizua përsëri; statusi u bë `Pozicioni u mor. Shkruaj një emër vendi të dallueshëm.` dhe u shfaq saktësia `37 m`. Fusha mbeti bosh dhe vendtakimi i konfirmuar mbeti `Ende nuk është zgjedhur`.

**Skedari dhe funksioni që e shpjegojnë:** `components/Vendtakimi.tsx`, funksioni `perdorVendndodhjen()`, në callback-un e suksesit ruan vetëm saktësinë me `setAccuracy(Math.round(position.coords.accuracy))` dhe kalon gjendjen në `success`. Ai nuk e plotëson fushën dhe nuk thërret `setVendtakimi`. Vendtakimi konfirmohet vetëm nga `konfirmo()` pasi përdoruesi shkruan një emër. Në `app/java-08-test/page.tsx`, funksioni `pozicioniProve()` krijon pozicionin e simuluar me saktësi 37 m dhe dega `skenari === "sukses"` e kthen atë pas 350 ms.

**Çfarë kuptova ose korrigjova:** Korrigjova pritshmërinë time: marrja e koordinatave nuk përcakton emrin e një pike si bibliotekë apo parking. Kjo provë shfaq vetëm saktësinë; emrin e vendtakimit duhet ta shkruaj dhe ta konfirmoj vetë.

## Kontrolli teknik

`npm run build` kaloi dhe përfshiu faqen `/java-08-test`. Konfigurimi i testit është `{"version":1,"path":"/java-08-test"}` te `mobile-week08.json`. Faqja përdor të njëjtin komponent si detajet dhe simulimi i suksesit shfaqi `37 m`. API-ja publike me Neon u verifikua më herët dhe ktheu tri udhëtime; kjo provë nuk ndryshoi të dhënat në databazë. `package-lock.json` është në rrënjë.

## Kufizime të provave

Pranimi dhe refuzimi real u provuan në Safari në localhost; nuk u përdor telefon fizik. Kodi 2, timeout-i dhe mungesa e mbështetjes u provuan përmes simuluesit lokal që thërret degët e callback-ut. Koordinatat e simulimit janë fiktive. Vendtakimi nuk dërgohet te shoferi dhe nuk ruhet në databazë.


## Dorëzimi

Skedarët `java-08.md` dhe `mobile-week08.json` janë në rrënjën pranë README. Ndryshimet e Javës 8 janë ende në working tree dhe nuk janë commit/push. Issue i GitHub-it krijohet pas push-it sipas udhëzimit të kursit.
