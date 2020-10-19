# Prezentare generală a sistemului de generare

Electron utilizează [GN](https://gn.googlesource.com/gn) pentru generarea de proiecte și [ninja](https://ninja-build.org/) pentru construcții. Configurațiile proiectului pot fi găsite în fișierele `.gn` și `.gni`.

## Fișiere GN

Următoarele fişiere `gn` conţin regulile principale pentru construirea Electron:

* `BUILD.gn` definește modul în care Electron este însuși construit și include configurațiile implicite pentru conectarea cu Chromium.
* `build/args/{debug,release,all}.gn` conține argumentele implicite de construire pentru dezvoltarea Electron.

## Componenta Build

Deoarece Chromium este un proiect destul de mare, etapa de legătură poate dura destul de multe minute, ceea ce îngreunează dezvoltarea. Pentru a rezolva aceasta, Chromium a introdus "component build", care construiește fiecare componentă o bibliotecă partajată separată, făcând legătura foarte rapidă, dar sacrificând dimensiunea fișierului și performanța.

Electron moștenește această opțiune de construcție din Chromium. În `Depanare`, binarul va fi legat de o versiune partajată a bibliotecii de componente Chromium pentru a realiza timp de conectare rapidă; pentru `Lansare` construcții, fișierul binar va fi legat de versiunile bibliotecii statice, deci putem avea cea mai bună dimensiune binară posibilă și performanţă.

## Teste

**NB** _această secțiune este învechită și conține informații care nu mai sunt relevante pentru electronul construit GN._

Testați modificările în conformitate cu stilul de codificare a proiectului folosind:

```sh
$ npm run lint
```

Testați funcționalitatea utilizând:

```sh
$ npm test
```

Ori de câte ori faci modificări la codul sursă Electron va trebui să rulezi din nou construcția înainte de teste:

```sh
$ npm run build && npm test
```

Puteți face suita de testare să ruleze mai rapid izolând testul specific sau blocând la care lucrați în prezent utilizând [de teste exclusive](https://mochajs.org/#exclusive-tests) a caracteristicii Mocha. Se aplică `.only` la orice `descrie` sau `` apel de funcție:

```js
describe.only('unele caracteristici', () => {
  // ... doar testele din acest bloc vor fi rulate
})
```

Alternativ, puteți utiliza opțiunea `grep` a mocha pentru a rula doar teste care se potrivesc cu model de expresie regulat dat:

```sh
$ npm test -- --grep child_process
```

Teste care includ module native (de ex. `runas`) nu poate fi executat cu de depanare construi (a se vedea [#2558](https://github.com/electron/electron/issues/2558) pentru detalii), dar ei vor lucra cu versiunea de compilare.

Pentru a rula testele cu lansare construiți utilizați:

```sh
$ npm test -- -R
```
