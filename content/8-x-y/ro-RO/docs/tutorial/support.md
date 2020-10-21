# Suport Electron

## Găsire suport

If you have a security concern, please see the [security document](../../SECURITY.md).

Dacă căutați ajutor de programare, pentru răspunsuri la întrebări, sau pentru a te alătura discuțiilor cu alți dezvoltatori care folosesc Electron, poți interacționa cu comunitatea în aceste locații:
- [`categoria electron`](https://discuss.atom.io/c/electron) pe forumurile Atom
- `#atom-shell` canal pe Freenode
- `#electron` canal pe [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Rusă)*
- [`electronon-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
- [`electronon-kr`](https://electron-kr.github.io/electron-kr) *(coreeană)*
- [`electron-jp`](https://electron-jp.slack.com) *(japoneză)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turcă)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Polonia)*

If you'd like to contribute to Electron, see the [contributing document](../../CONTRIBUTING.md).

Dacă ai găsit o eroare în [versiunea suportată](#supported-versions) a Electron, te rugăm să o raportezi cu [trackerul de probleme](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) este o listă de aplicații utile de exemple, unelte și resurse.

## Versiuni suportate

Cele mai recente *stabile* versiuni majore sunt acceptate de echipa Electron. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

Ultima versiune stabilă primește unilateral toate soluțiile de la `master`, și versiunea înainte de aceasta primește marea majoritate a acestor remedieri în funcție de timpul și lățimea de bandă garantată. Cea mai veche linie de lansare acceptată va primi doar reparații de securitate direct.

Toate liniile de lansare acceptate vor accepta cereri externe de tragere pentru a backport reparații îmbinate anterior la `master`, chiar dacă acest lucru se poate realiza de la caz la caz pentru unele linii mai vechi. Toate deciziile contestate legate de eliberarea liniilor backports vor fi rezolvate de [Grupul de lucru](https://github.com/electron/governance/tree/master/wg-releases) pentru lansări, ca un punct de pe ordinea de zi la întâlnirea săptămânală în săptămâna în care este ridicat PR-ul backport-ul.

### Versiuni acceptate în prezent
- 7.x.y
- 6.x.y
- 5.x.y

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

Fișierele preconstruite `ia32` (`i686`) și `x64` (`amd64`) ale Electron sunt construite pe Ubuntu 12. 4, binarul `armv7l` este construit împotriva ARM v7 cu hard-float ABI şi NEON pentru Debian Wheezy.

[Until the release of Electron 2.0][arm-breaking-change], Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Ambele binare sunt identice.

Dacă binarul preconstruit poate rula pe o distribuție depinde de dacă distribuția include bibliotecile la care Electron este conectat pe platforma , doar Ubuntu 12. 4 este garantat că funcționează, dar următoarele platforme sunt verificate, de asemenea, pentru a putea rula binarele preconstruit al Electron:

* Ubuntu 12.04 și mai nou
* Fedora 21
* Debian 8

[arm-breaking-change]: https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets
