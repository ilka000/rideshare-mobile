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

### Hyrje e re · Suksesi i GPS-it nuk e konfirmon vetë vendtakimin

**Hyrja që provova:** Në `/java-08-test` zgjodha `Simulim: pozicioni u mor` dhe shtypa **Përdor vendndodhjen time**.

**Parashikimi im para klikimit:** Mendova se pas marrjes së pozicionit do të plotësohej automatikisht fusha ose do të shfaqej një vendtakim i konfirmuar.

**Çfarë pashë realisht:** Për pak kohë u shfaq `Po kërkojmë vendndodhjen…` dhe butoni u çaktivizua. Pastaj u shfaq `Pozicioni u mor. Saktësia rreth 42 m. Shkruaj një emër vendi të dallueshëm.` Fusha mbeti bosh dhe vendtakimi i konfirmuar mbeti `Ende nuk është zgjedhur`.

**Skedari dhe funksioni që e shpjegojnë:** Te `components/Vendtakimi.tsx`, funksioni `perdorVendndodhjen()` e merr `position.coords.accuracy` dhe e përdor vetëm në mesazh. Callback-u i suksesit nuk i lexon koordinatat për t’i kthyer në emër vendi dhe nuk thërret `setVendtakimi`; emrin duhet ta shkruajë e konfirmojë përdoruesi me `konfirmo()`. Skenari lokal që e shkaktoi është te `app/java-08-test/page.tsx`, te `pozicioniProve()` dhe dega `skenari === "sukses"`.

**Çfarë kuptova ose korrigjova:** GPS-i këtu ndihmon vetëm me saktësinë e pozicionit; nuk identifikon vetë një vend si bibliotekë apo parking. Pritshmërinë time e korrigjova: duhet të shkruaj një emër të dallueshëm dhe ta konfirmoj manualisht. Kjo përputhet me tekstin udhëzues në mesazhin e aplikacionit.

## Kontrolli teknik

`npm run build` kaloi dhe përfshiu faqen `/java-08-test`. API-ja publike me Neon u verifikua më herët dhe ktheu tri udhëtime; kjo provë nuk ndryshoi të dhënat në databazë. `package.json` dhe `package-lock.json` nuk kërkuan ndryshime.

## Kufizime të provave

Pranimi dhe refuzimi real u provuan në Safari në localhost; nuk u përdor telefon fizik. Kodi 2, timeout-i dhe mungesa e mbështetjes u provuan përmes simuluesit lokal që thërret degët e callback-ut. Koordinatat e simulimit janë fiktive. Vendtakimi nuk dërgohet te shoferi dhe nuk ruhet në databazë.


## Dorëzimi

Skedarët `java-08.md` dhe `mobile-week08.json` janë në rrënjën pranë README. Ndryshimet e Javës 8 janë ende në working tree dhe nuk janë commit/push. Issue i GitHub-it krijohet pas push-it sipas udhëzimit të kursit.
