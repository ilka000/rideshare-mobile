# RideShare · Java 7

Ruaje si **java-07.md**, pranë README në rrënjën e repository-t. Plotëso me vëzhgimet e tua dhe plotëso çdo vend bosh përpara dorëzimit. Ruaj titujt dhe etiketat. Para/Pas janë dy URL të plota commit-esh nga i njëjti repository, me kodin e plotë prej 40 shenjash.

## Rasti im
GitHub: ilka000
Kodi: P7-951
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 1 · Lista dhe detajet
ID i udhëtimit në projektin tim: 2
Të dhënat fiktive të rastit: Pejë → AAB, 10:15, 1 vend; ora e re për provën 10:20. Në projekt, ID 2 ka Fushë Kosovë → AAB, 08:15, 1 vend. Nuk i ndryshova të dhënat në databazë.

## Parashikimi
Parashikimi u shkrua pas korrigjimit në këtë sesion me ndihmën e AI-së, jo para kodimit siç kërkonte udhëzimi. Pritshmëria ime: kur zgjedh një udhëtim në listë, i njëjti ID hap detajet me të njëjtën nisje, destinacion, orë dhe vende. Një ID që nuk ekziston shfaq “Udhëtimi nuk u gjet” dhe lidhjen për t’u kthyer te lista.

## Dy probleme
1. Lista dhe detajet shfaqnin gabimisht “1 vende të lira” kur udhëtimi kishte vetëm një vend.
2. Në listë, udhëtimi me 0 vende përsëri ofronte lidhjen “Shiko detajet”; mungesa e vendeve shihej vetëm pasi hapeshin detajet.

## Korrigjimi
Skedari: components/KartaUdhetimi.tsx
Skedari i faqes së detajeve: app/udhetimi/[id]/page.tsx
Komponenti i kartës shfaq numrin dhe etiketën e vendeve në listë; faqja e detajeve shfaq të njëjtën vlerë për udhëtimin e zgjedhur. Shtova kushtin që përdor njëjësin “vend i lirë” kur vlera është 1 dhe shumësin për vlerat e tjera. Ndryshimi rregullon tekstin pa prekur logjikën e vendeve ose kërkesës.

## Versionet
Para: https://github.com/ilka000/rideshare-mobile/commit/d095dbefe59e6290f2bf7029572b17906c26ed21
Pas: https://github.com/ilka000/rideshare-mobile/commit/d7d0d45f47e106fdbf42f94ad66d08885667e435

## Provat që bëra
Provat u kryen me kërkesa HTTP te serveri lokal Next.js. Të dhënat në aplikacion janë kopja e ruajtur dhe mund të jenë të vjetra. Nuk i ndryshova të dhënat e databazës për t’i bërë të përputhen me P7-951.

### Prova 1
Hapat: Hap listën; shëno ID 2 dhe vlerat; hap `/udhetimi/2`; pastaj provo `/udhetimi/999999`.
Pritshmëria: ID 2 shfaq të njëjtin udhëtim dhe vlerat e listës; ID-ja që mungon shfaq “Udhëtimi nuk u gjet” me lidhjen për te lista.
Vëzhgimi: Lista dhe detajet shfaqën Fushë Kosovë → AAB, 08:15 dhe 1 vend. ID 999999 u përgjigj me 404 dhe shfaqi “Udhëtimi nuk u gjet” me lidhjen për te lista.

### Prova 2
Hapat: Shiko kartën në listë për ID 2 dhe pastaj faqen e detajeve.
Pritshmëria: Të dyja shfaqin “1 vend i lirë”.
Vëzhgimi: Lista dhe detajet shfaqën “1 vend i lirë”.

### Prova 3
Hapat: Hap `/udhetimi/3` që ka 0 vende; pastaj hap `/udhetimi/2/kerkesa`.
Pritshmëria: Për 0 vende, shfaqet mesazhi për mungesën e vendeve dhe veprimi nuk premton rezervim. Kërkesa për udhëtimin me vende shpjegohet si simulim, pa konfirmim real.
Vëzhgimi: `/udhetimi/3` u përgjigj me 200, shfaqi “Nuk ka vende të lira” dhe butonin e çaktivizuar. Faqja e kërkesës shfaqi “Simulim: Në pritje”, “nuk është dërguar te shoferi” dhe shënimin se ruajtja/konfirmimi real shtohen më vonë.

## Ndryshimi i ri
Nuk u demonstrua para kolegut. Në këtë sesion verifikova kodin 0, 1 dhe 2 përmes të dhënave ekzistuese: 0 shfaqi mesazhin pa vende, 1 shfaqi njëjësin pas korrigjimit, dhe 2 përdor shumësin. Për provën P7, ora e re është 10:20, por nuk e ndryshova databazën.

## Ndihma nga AI
AI ndihmoi të identifikohej dhe zbatohej korrigjimi njëjës/shumës, të përgatitej raporti dhe të rregullohej formati sipas përgjigjes së kontrollit automatik. Provat u verifikuan te serveri lokal me HTTP. Parashikimi nuk u shkrua para kodimit pa AI, dhe demonstrimi me koleg nuk u bë.
