# Java 7 · Provo, korrigjo dhe shpjego RideShare-in

## Rasti im

**Skenari:** Rasti 1 · Lista dhe detajet.  
**Kodi personal P7-951** (llogaria GitHub `ilka000`): Pejë → AAB, ora fillestare 10:15, 1 vend; ora e re për provën 10:20. Në projekt provova ID 2 me të dhënat fiktive ekzistuese: Fushë Kosovë → AAB, 08:15, 1 vend. Nuk i ndryshova të dhënat e databazës.
**Parashikimi:** Kur zgjedh një udhëtim në listë, ID-ja në adresë duhet të hapë po atë udhëtim me të njëjtat nisje, destinacion, orë dhe vende. Një ID që nuk ekziston duhet të shfaqë faqen “Udhëtimi nuk u gjet” me lidhje për t’u kthyer te lista.

## Dy probleme ose paqartësi

1. Lista dhe faqja e detajeve shfaqnin “1 vende të lira”, që është gabim gramatikor.
2. Udhëtimi me 0 vende në listë kishte të njëjtën lidhje “Shiko detajet” si udhëtimet me vende. Përdoruesi duhej të hapte detajet për të parë se nuk kishte vende; kjo mund të sqarohet që në kartë.

## Korrigjimi

**Skedarët:** `components/KartaUdhetimi.tsx` dhe `app/udhetimi/[id]/page.tsx`.  
**Ndryshimi:** Etiketa e vendeve tani është njëjës (“1 vend i lirë”) kur ka saktësisht një vend, dhe shumës (“N vende të lira”) në rastet e tjera.  
**Arsyeja:** Teksti përputhet me numrin në të dy ekranet dhe nuk ndryshon logjikën e udhëtimit.

## Tri prova

Provat u kryen me kërkesa HTTP te serveri lokal Next.js. Të dhënat e shfaqura ishin kopja e ruajtur nga aplikacioni, e cila mund të jetë e vjetër.

### Prova 1 · Rrjedha e listës te detajet

**Hapat:** Hape listën, shëno ID-në dhe vlerat e një udhëtimi; kliko “Shiko detajet”; provo gjithashtu një ID që mungon, p.sh. `/udhetimi/999999`.

**Pritshmëria:** Detajet tregojnë ID-në/udhëtimin e zgjedhur dhe të njëjtat vlera. ID-ja që mungon tregon “Udhëtimi nuk u gjet” dhe lidhjen për te lista.

**Vëzhgimi:** Lista shfaqi udhëtimin ID 2 “Fushë Kosovë – AAB”, ora 08:15 dhe 1 vend. Faqja `/udhetimi/2` shfaqi po ato të dhëna. `/udhetimi/999999` u përgjigj me 404 dhe shfaqi “Udhëtimi nuk u gjet” me lidhjen për te lista.

### Prova 2 · Etiketa e korrigjuar

**Hapat:** Me një udhëtim që ka 1 vend të lirë, shiko kartën në listë dhe pastaj faqen e detajeve.

**Pritshmëria:** Të dyja shfaqin “1 vend i lirë”. Për 0 ose 2 vende, përdoret “vende të lira”.

**Vëzhgimi:** Lista dhe detajet e ID 2 shfaqën “1 vend i lirë”.

### Prova 3 · Një hyrje tjetër

**Hapat:** Hap një udhëtim me 0 vende në detaje.

**Pritshmëria:** Shfaqen 0 vende dhe kontrolli “Nuk ka vende të lira” është joaktiv; nuk premtohet rezervim.

**Vëzhgimi:** Faqja `/udhetimi/3` u përgjigj me 200, shfaqi “Nuk ka vende të lira” dhe butonin e çaktivizuar. Te `/udhetimi/2/kerkesa` u shfaq “Simulim: Në pritje”, “nuk është dërguar te shoferi” dhe shënimi se ruajtja/konfirmimi real do të shtohen më vonë.

## Ndryshimi i ri

Korrigjimi u demonstrua përmes përgjigjeve të serverit lokal, por jo para kolegut. Kushti `udhetim.vende === 1` zgjedh formën njëjës; vlerat e tjera përdorin shumësin.

## Commit-et

**Para:** https://github.com/ilka000/rideshare-mobile/commit/d095dbefe59e6290f2bf7029572b17906c26ed21  
**Pas:** https://github.com/ilka000/rideshare-mobile/commit/d7d0d45f47e106fdbf42f94ad66d08885667e435

## Ndihma nga AI

AI ndihmoi në identifikimin e etiketës njëjës/shumës, në zbatimin e ndryshimit dhe në hartimin e raportit. Provat e raportuara janë përgjigjet që u morën nga serveri lokal.
