# Boilerplates și CLI-uri

Dezvoltarea de Electron este fără aviz - nu există un "mod adevărat" de a dezvolta, construi, pachetului, sau de a elibera o aplicație Electron. Caracteristici suplimentare pentru Electron, atât pentru construcție cât și pentru rulare în timp, pot fi găsite de obicei pe [npm](https://www.npmjs.com/search?q=electron) în pachete individuale, permite dezvoltatorilor să construiască atât aplicația cât și conducta de care au nevoie.

Acest nivel de modularitate şi extindere asigură că toţi dezvoltatorii care lucrează cu Electron, atât mare cât şi mică în echipă, nu sunt niciodată restricționate în ceea ce pot sau nu pot face în orice moment pe durata ciclului lor de dezvoltare. Cu toate acestea, pentru mulți dezvoltatori, una dintre boilerplatele sau linia de comandă conduse de comunitate ar putea face compilația mult mai ușoară ambalare și lansare aplicație.

## Boilerplate vs CLI

Un boilerplate este doar un punct de plecare - o pânză, ca să vorbim - de unde îți construiești aplicația. De obicei vin sub forma unui depozit pe care poți clona și personaliza conținutul inimii tale.

Pe de altă parte, o linie de comandă continuă să te sprijine pe tot parcursul dezvoltării și lansării. Acestea sunt mai utile și de sprijin, dar pun în aplicare orientările referitoare la modul în care codul dvs. ar trebui să fie structurat și construit. *Mai ales pentru începători, este posibil ca folosirea unei linii de comandă să fie utilă*.

## electron-forge

Un "instrument complet pentru construirea aplicaţiilor Electron moderne". Electron Forge unifică instrumentele existente (și bine întreținute) de construcție pentru dezvoltarea Electron într-un pachet coeziv astfel încât oricine să poată sări direct la dezvoltarea Electron .

Forge vine cu [un şablon gata de utilizare](https://electronforge.io/templates) folosind Webpack ca un pachet. Acesta include un exemplu de configurare tip cript și oferă două fișiere de configurare pentru a activa personalizarea ușoară. Utilizează aceleași module de bază folosite de comunitatea mai mare Electron (cum ar fi [`electron-packer`](https://github.com/electron/electron-packager)) – modificări făcute de administratorii Electron (cum ar fi Slack) beneficiază de pe urma utilizatorilor Forge; de asemenea.

Poți găsi mai multe informații și documentație pe [electronforge.io](https://electronforge.io/).

## electron-builder

O "soluţie completă pentru pachet şi pentru a construi o aplicaţie Electron gata de distribuţie" care se concentrează pe o experienţă integrată. [`electron-builder`](https://github.com/electron-userland/electron-builder) adaugă o singură dependență concentrată pe simplitate și gestionează toate cerințele suplimentare pe plan intern.

`electron-builder` înlocuiește caracteristicile și modulele folosite de întreținătorii Electron (cum ar fi auto-actualizarea) cu unele personalizate. În general sunt mai bine integrate, dar vor avea mai puţine în comun cu aplicaţii Electron populare precum Atom, Cod Visual Studio sau Slack.

Mai multe informații și documente pot fi găsite în [depozitul](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Dacă nu vrei unelte din care să construiești doar un boilerplate solid, CT lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) ar putea valora o privire. It's quite popular in the community and uses `electron-builder` internally.

## Alte instrumente și Boilerplates

Lista ["Electron" pentru Awesome](https://github.com/sindresorhus/awesome-electron#boilerplates) conține mai multe unelte și boilerplați din care să alegi. Dacă consideri lungimea listei intimidează, nu uita că adăugarea de instrumente pe măsură ce mergi este o abordare validă.
