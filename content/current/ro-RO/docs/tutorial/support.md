# Suport Electron

## Găsire suport

Dacă aveți o preocupare de securitate, consultați [documentul de securitate](https://github.com/electron/electron/tree/master/SECURITY.md).

Dacă căutați ajutor de programare, pentru răspunsuri la întrebări, sau pentru a te alătura discuțiilor cu alți dezvoltatori care folosesc Electron, poți interacționa cu comunitatea în aceste locații:
- [`Electron's Discord`](https://discord.com/invite/electron) has channels for:
  - Getting help
  - Ecosystem apps like [Electron Forge](https://github.com/electron-userland/electron-forge) and [Electron Fiddle](https://github.com/electron/fiddle)
  - Sharing ideas with other Electron app developers
  - And more!
- [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
- `#atom-shell` canal pe Freenode
- `#electron` canal pe [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Rusă)*
- [`electronon-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
- [`electronon-kr`](https://electron-kr.github.io/electron-kr) *(coreeană)*
- [`electron-jp`](https://electron-jp.slack.com) *(japoneză)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turcă)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Polonia)*

Dacă doriți să contribuiți la Electron, vedeți documentul [care contribuie cu](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Dacă ai găsit o eroare în [versiunea suportată](#supported-versions) a Electron, te rugăm să o raportezi cu [trackerul de probleme](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) este o listă de aplicații utile de exemple, unelte și resurse.

## Versiuni suportate

Cele mai recente *stabile* versiuni majore sunt acceptate de echipa Electron. De exemplu, dacă ultima versiune este 6.1.x, atunci și 5.0.x ca și seria 4.2.x sunt acceptate.  Susținem doar ultima versiune minoră pentru fiecare serie de lansare stabilă.  Asta înseamnă că în cazul unei fixări de securitate 6.1. va primi soluția, dar nu vom lansa o nouă versiune de 6.0.x.

Ultima versiune stabilă primește unilateral toate soluțiile de la `master`, și versiunea înainte de aceasta primește marea majoritate a acestor remedieri în funcție de timpul și lățimea de bandă garantată. Cea mai veche linie de lansare acceptată va primi doar reparații de securitate direct.

Toate liniile de lansare acceptate vor accepta cereri externe de tragere pentru a backport reparații îmbinate anterior la `master`, chiar dacă acest lucru se poate realiza de la caz la caz pentru unele linii mai vechi. Toate deciziile contestate legate de eliberarea liniilor backports vor fi rezolvate de [Grupul de lucru](https://github.com/electron/governance/tree/master/wg-releases) pentru lansări, ca un punct de pe ordinea de zi la întâlnirea săptămânală în săptămâna în care este ridicat PR-ul backport-ul.

Când un API este modificat sau eliminat într-un mod care întrerupe funcţionalitatea existentă, funcționalitatea anterioară va fi acceptată pentru un minim de două versiuni majore atunci când este posibil înainte de a fi eliminat. De exemplu, dacă o funcție ia trei argumente, și acel număr este redus la două în versiunea majoră 10, versiunea cu trei argumente ar continua să lucreze până cel puțin la versiunea majoră 12. Treceți pragul minim de două versiuni vom încerca să sprijinim compatibilitate în back-down peste două versiuni până când susținătorii vor simți că sarcina de întreținere este prea mare pentru a continua să facă acest lucru.

### Versiuni acceptate în prezent
- 10,x.y
- 9,x.y
- 8,x.y

### Sfârșit de viață

Atunci când o sucursală de eliberare ajunge la sfârșitul ciclului său de sprijin, seria va fi depreciată în NPM și o versiune finală de sfârșit de suport va fi făcută. Această versiune va adăuga un avertisment pentru a informa că o versiune nesuportată de Electron este în uz.

Acești pași sunt pentru a ajuta dezvoltatorii de aplicații să învețe când o ramură pe care o folosesc devine nesuportată, dar fără a fi excesiv de intruziv pentru utilizatorii finali.

Dacă o aplicație are circumstanțe excepționale și trebuie să rămână pe o serie nesuportată de Electron, dezvoltatorii pot reduce la tăcere avertismentul de închidere a suportului prin omiterea versiunii finale din pachetul de `al aplicației. Fiul` `devendencese`. De exemplu, de la seria 1-6-x s-a încheiat cu un final de suport 1.6. 8 versiuni dezvoltatorii pot alege să rămână în seria 1-6-x fără avertismente cu `devDependency` of `"electron": 1. .0 - 1.6.17`.

## Platforme Suportate

Următoarele platforme sunt sprijinite de Electron:

### macOS

Numai binarele pe 64 de biți sunt furnizate pentru MacOS și versiunea minimă MacOS suportată este MacOS 10.10 (Yosemite).

### Ferestre

Windows 7 și mai târziu sunt acceptate, sistemele de operare mai vechi nu sunt acceptate (și nu funcționează).

Atât `ia32` (`x86`) cât şi `x64` (`amd64`) binare sunt furnizate pentru Windows. [Electron 6.0.8 și ulterior adaugă suport nativ pentru Windows pe Arm (`arm64`) dispozitive](windows-arm.md). Rularea aplicațiilor împachetate cu versiunile anterioare este posibilă folosind binarul ia32.

### Linux

The prebuilt binaries of Electron are built on Ubuntu 18.04.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 18.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 14.04 and newer
* Fedora 24 and newer
* Debian 8 and newer
