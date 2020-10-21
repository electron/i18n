# Electron Versioning

> O analiză detaliată a politicii noastre de versionare și a punerii sale în aplicare.

Începând cu versiunea 2.0.0, Electron urmează [semver](#semver). Următoarea comandă va instala cea mai recentă versiune stabilă de Electron:

```sh
npm instalare --save-dev electron
```

Pentru a actualiza un proiect existent pentru a utiliza cea mai recentă versiune stabilă:

```sh
npm instalare --save-dev electron@latest
```

## Versiunea 1.x

Versiuni Electron *< 2.* nu s-a conformat specificațiilor [semiver](http://semver.org) : versiuni majore corespondente modificărilor API ale utilizatorului final, Versiunile minore au corespuns versiunilor majore Chromium, iar versiunile patch-ului au corespuns noilor caracteristici și remedierii erorilor. Deși este convenabil pentru dezvoltatori să fuzioneze caracteristici, creează probleme pentru dezvoltatorii aplicațiilor cu care se confruntă clienții. Ciclurile de testare a QA ale unor aplicații majore precum Slack, Stride, Teams, Skype, VS Code, Atom, și Desktop pot fi lungi, iar stabilitatea este un rezultat foarte dorit. Există un risc mare în adoptarea noilor caracteristici în timp ce se încearcă absorbirea remediilor erorilor.

Iată un exemplu de strategie 1.x:

![](../images/versioning-sketch-0.png)

O aplicație dezvoltată cu `1.8.1` nu poate lua `1. .3` rezolvare bug fără a absorbi `1. .2` caracteristică, sau prin backportarea reparației și menținerea unei noi linii de eliberare.

## Versiunea 2.0 şi Dincolo de

Mai jos sunt prezentate câteva schimbări majore ale strategiei noastre de 1,x. Fiecare modificare este menită să satisfacă nevoile și prioritățile dezvoltatorilor/întreținătorilor și dezvoltatorilor de aplicații.

1. Utilizarea strictă a materialului seminal
2. Introducere tag-uri semiconforme `-beta`
3. Introducere [mesaje convenționale de comitere](https://conventionalcommits.org/)
4. Ramuri de stabilizare bine definite
5. Filiala `master` este lipsită de versiuni; numai sucursalele de stabilizare conțin informații despre versiune

Vom prezenta în detaliu modul în care git ramifică funcționează, modul în care funcționează marcarea npm, ceea ce ar trebui să se aștepte dezvoltatorii să vadă și cum se poate schimba cineva în spatele lui.

# semver

Începând de la 2.0, Electron va urma semiconductor.

Mai jos este un tabel care mapează în mod explicit tipurile de modificări la categoria corespunzătoare de material seminal (de exemplu, major, minor, patch).

| Creșteri ale versiunii majore            | Versiune minoră Incremente               | Patch Version Increments           |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------- |
| Electron rupe modificările API           | Modificări ale Electron fără rupere API  | Remedierea bug-ului Electron       |
| Actualizări majore ale versiunii Node.js | Actualizări minore ale versiunii Node.js | Actualizare versiune patch Node.js |
| Actualizări versiune Chromium            |                                          | plasturi cu crom fix               |


Țineți cont că majoritatea actualizărilor de Chromium vor fi considerate spargere. Rezolvările care pot fi backportate vor fi probabil selectate ca patch-uri.

# Stabilizarea ramurilor

Sucursalele de stabilizare sunt sucursale care rulează paralel cu stăpânul, luând numai comitete de tip cherry alese care sunt legate de securitate sau stabilitate. Aceste ramuri nu sunt niciodată fuzionate în stăpân.

![](../images/versioning-sketch-1.png)

De la Electron 8, ramurile de stabilizare sunt întotdeauna **importante** linii de versiuni, și numit împotriva următorului șablon `$MAJOR-x-y` e. . `8-x-y`.  Înainte de aceasta, am folosit **linii de versiune minore** și le-am numit ca `$MAJOR-$MINOR-x` ex. `2-0-x`

Permitem ca mai multe sucursale de stabilizare să existe simultan, și intenționează să sprijine cel puțin două în paralel în orice moment, reparațiile de securitate backporting, dacă este necesar. ![](../images/versioning-sketch-2.png)

Liniile mai vechi nu vor fi suportate de GitHub, dar alte grupuri își pot asuma responsabilitatea și pot susține stabilitatea și soluțiile de securitate pe cont propriu. Noi descurajăm acest lucru, dar recunoaştem că face viaţa mai uşoară pentru mulţi dezvoltatori de aplicaţii.

# Lansări beta și fixări de erori

Dezvoltatorii vor să știe care versiuni sunt _sigure_ pentru a fi folosite. Chiar şi caracteristici aparent nevinovate pot introduce regrese în aplicaţii complexe. În acelaşi timp, blocarea la o versiune fixă este periculoasă deoarece ignorați patch-urile de securitate și remedierile erorilor care ar fi putut să iasă din versiunea dvs. Obiectivul nostru este de a permite următoarele intervale standard de semiver în `package.json`:

* Folosiți `~2.0.0` pentru a admite doar probleme legate de stabilitate sau securitate la versiunea `2.0.0`.
* Utilizați `^2.0.0` pentru a admite că funcția care nu interferează _este destul de stabilă_ precum și funcțiile de securitate și de rezolvare a erorilor.

Ce este important la al doilea punct este că aplicațiile care folosesc `^` ar trebui să se poată aștepta la un nivel rezonabil de stabilitate. Pentru a realiza acest lucru, semiver-ul permite ca un _identificator pre-eliberare_ să indice o anumită versiune nu este încă _sigur_ sau _stabil_.

Orice alegi, va trebui să lovești periodic versiunea din `package.json` deoarece schimbările de rupere sunt o realitate a vieții de Chromium.

Procesul este următorul:

1. Toate liniile de versiuni noi majore şi minore încep cu o serie beta indicată de tag-urile semiversionale ale `beta.`, ex. `2.0.0-beta.1`. După prima beta, eliberarea ulterioară a beta trebuie să îndeplinească toate condiţiile următoare:
    1. Schimbarea este compatibilă cu API înapoi (sunt permise dezaprobări)
    2. Riscul pentru respectarea calendarului nostru de stabilitate trebuie să fie scăzut.
2. Dacă sunt permise, modificările trebuie făcute odată ce o versiune este beta, acestea sunt aplicate și eticheta de pre-eliberare este incrementată, e. . `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. ex. `2.0.0`. După prima stare stabilă, toate modificările trebuie să fie rezolvate de bug compatibil cu versiunile anterioare.
4. Dacă viitoare remedieri ale erorilor sau patch-urile de securitate trebuie făcute odată ce o versiune este stabilă, sunt aplicate, iar versiunea _patch_ este incrementată e. . `2.0.1`.

Mai precis, cele de mai sus înseamnă:

1. Este în regulă să se admită modificări non-breaking-API înainte de Săptămâna 3 în ciclul beta, chiar dacă aceste modificări au potenţialul de a provoca reacţii adverse moderate
2. Admiterea modificărilor marcate cu caracteristici, care altfel nu modifică căile de cod existente, în majoritatea punctelor din ciclul beta este în regulă. Utilizatorii pot activa în mod explicit aceste steaguri în aplicațiile lor.
3. Admiterea de caracteristici de orice fel după Săptămâna 3 în ciclul beta este 👎 fără un motiv foarte bun.

Pentru fiecare umflătură majoră şi minoră, trebuie să vă aşteptaţi să vedeţi următoarele:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Un exemplu de ciclu de viață din imagini:

* O nouă sucursală de lansare este creată care include ultimul set de caracteristici. Este publicat ca `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* O rezolvare a problemei vine în maestru care poate fi backportată la sucursala de lansare. Plasturele se aplică și o versiune beta nouă este publicată ca `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* beta este considerată _în general stabilă_ şi este publicată din nou ca non-beta sub `2.0.0`. ![](../images/versioning-sketch-5.png)
* Mai târziu, un exploit cu zero zile este dezvăluit și o reparație este aplicată stăpânului. Ne întoarcem la linia `2-0-x` și lansăm `2.0.1`. ![](../images/versioning-sketch-6.png)

Câteva exemple privind modul în care diferite serii de semiversuri vor prelua noile versiuni:

![](../images/versioning-sketch-7.png)

# Caracteristici lipsă: Alphas
Strategia noastră are câteva compromisuri pe care le considerăm adecvate. Cel mai important lucru este că noile caracteristici ale maestrului pot dura o vreme înainte de a ajunge la o linie de eliberare stabilă. Dacă vrei să încerci o caracteristică nouă imediat, va trebui să construiești singur Electron.

Ca o perspectivă viitoare, putem introduce una sau ambele dintre următoarele:

* eliberarea de alfa care au constrângeri mai laxe de stabilitate pe pariuri; de exemplu, ar fi permis să admit funcții noi în timp ce un canal de stabilitate este în _alpha_

# Marcaje caracteristici
Steagurile caracteristice sunt o practică obişnuită în Chromium şi sunt bine stabilite în ecosistemul de dezvoltare pe internet. În contextul Electron, un steag al unei funcții sau **ramură soft** trebuie să aibă următoarele proprietăți:

* este activat/dezactivat fie la ora de rulare, fie la timpul de construcție; nu suportăm conceptul de steag al caracteristicilor ajustate la cerere
* segmentează complet trasee noi sau vechi; refactoring old code pentru a suporta o caracteristică nouă _violează_ contractul caracteristică-steag
* steagurile caracteristicilor sunt în cele din urmă eliminate după ce această caracteristică a fost lansată

# Angajamente semantice

Încercăm să sporim claritatea la toate nivelurile procesului de actualizare și de diseminare. Începând cu `2.0.0` vom solicita să tragem cereri de aderare la specificațiile [Commits convențional](https://conventionalcommits.org/) , care pot fi rezumate după cum urmează:

* Comenzi care ar duce la un semiver **major** bump trebuie să pornească corpul cu `REPARTIZARE CHANGE:`.
* Comenzi care ar duce la un semiver **minor** bump trebuie să înceapă cu `feat:`.
* Comenzi care ar duce la un **patch pentru sperma **** bump trebuie să înceapă cu `fix:`.</p></li>

* Permitem strângerea de angajamente, cu condiţia ca mesajul strivit să adere la formatul de mai sus al mesajului.
* Este acceptabil ca unele angajamente într-o cerere pull să nu includă un prefix semantic, atât timp cât titlul cererii pull conţine un mesaj semantic semnificativ.</ul>

# Maestru `versionat`

- Filiala `master` va conține întotdeauna următoarea versiune majoră `X.0.0-nightly.DATĂ` în `package.json`
- Sucursalele de lansare nu sunt niciodată fuzionate la master
- Filialele de lansare _do_ contine versiunea corecta in `package.json`
- De îndată ce o ramură de eliberare este tăiată pentru o componentă majoră, căpitanul trebuie bătut la următorul maior.  `stăpânul` este întotdeauna versionat ca următoarea ramură de lansare teoretică
