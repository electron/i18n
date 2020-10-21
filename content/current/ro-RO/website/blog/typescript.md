---
title: "Anunțând suportul TypeScript în Electron"
author: zeke
date: '2017-06-01'
---

Pachetul `electron` npm include acum un fișier de definiție TypeScript care oferă adnotări detaliate ale întregului API Electon. Aceste adnotări pot îmbunătăți experiența ta de dezvoltare Electron **chiar dacă scrii vanilie JavaScript**. Doar `npm instalați electronul` pentru a obține tipuri Electron actualizate în proiectul dvs.

---

TypeScript este un limbaj de programare open-source creat de Microsoft. It's a superset of JavaScript that extends the language by adding support for static types. Comunitatea TypeScript a crescut rapid în ultimii ani, și TypeScript a fost clasat printre [cele mai iubite limbi de programare](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) într-un Sondaj Stack Overflow dezvoltator.  TypeScript este descris ca "JavaScript that scales" și echipe la [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), și [Microsoft](https://github.com/Microsoft/vscode) folosesc toate aplicațiile pentru a scrie aplicații Electron scalabile care sunt folosite de milioane de oameni.

TypeScript suportă multe dintre noile caracteristici lingvistice din JavaScript, cum ar fi clase, destructurarea obiectului, și async/await, dar caracteristica sa reală de diferențiere este **tipul de adnotări**. Declaring the input and output datatypes expected by your program can [reduce bugs](https://slack.engineering/typescript-at-slack-a81307fa288d) by helping you find errors at compile time, and the annotations can also serve as a formal declaration of [how your program works](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Când bibliotecile sunt scrise în Javascript de vanilie, tipurile sunt adesea vag definite ca un replică la scrierea documentației. Funcţiile pot accepta mai multe tipuri decât ceea ce a fost înregistrat, sau o funcţie poate avea constrângeri invizibile care nu sunt documentate, ceea ce poate duce la erori de rulare.

TypeScript rezolvă această problemă cu **fişierele de definire**. Un fișier cu definiție TypeScript descrie toate funcțiile unei biblioteci și tipurile de intrare și ieșire așteptate. Când biblioteca autori grupează un fișier de definiție TypeScript cu biblioteca lor publicată, consumatorii din biblioteca respectivă pot [explora API chiar în interiorul editorului lor](https://code.visualstudio.com/docs/editor/intellisense) și începe să o folosească imediat, adesea fără a fi nevoie să consultaţi documentaţia a bibliotecii.

Multe proiecte populare precum [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (și acum Electron! compilează propriul fișier de definiție și adaugă-l cu pachetul lor npm publicat. Pentru proiectele care nu își grupează propriul fișier de definiție, există [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), un ecosistem terț de fișiere de definiții întreținute de comunitate.

## Instalare

Începând de la versiunea 1.6.10, fiecare versiune de Electron include propriul său fişier de definiţie TypeScript. When you install the `electron` package from npm, the `electron.d.ts` file is bundled automatically with the installed package.

[Cea mai sigură cale](https://electronjs.org/docs/tutorial/electron-versioning/) de a instala Electron folosește un număr exact de versiune:

```sh
npm instalare electron --save-dev --save-exact
```

Sau dacă folosești [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

Dacă utilizați deja definiții terțe părți, cum ar fi `@types/electron` și `@types/node`, ar trebui să le elimini din proiectul tău Electron pentru a preveni orice coliziuni.

Fișierul de definiție derivă din [documentație API structurată](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), astfel încât să fie întotdeauna în concordanță cu [Documentația API a Electronului](https://electronjs.org/docs/api/). Doar instalați `electron` și veți obține întotdeauna definiții TypeScript care sunt actualizate cu versiunea Electron pe care o folosiți.

## Utilizare

Pentru un rezumat al modului de instalare și utilizare a noilor adnotări TypeScript ale Electron, urmăriți acest scurt ecran demo: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Dacă folosiți [Cod Visual Studio](https://code.visualstudio.com/), deja aveți inclus suport TypeScript. Există, de asemenea, plugin-uri întreţinute de comunitate pentru [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), şi [alţi editori](https://www.typescriptlang.org/index.html#download-links).

Odată ce editorul tău este configurat pentru TypeScript, vei începe să vezi mai multe comportament conștient de contexte, cum ar fi sugestii autocomplete, referință metodă integrată, verificare argument și multe altele.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Completare automată metodă">
  <figcaption>Metoda de autocompletare</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Referință metodă">
  <figcaption>Referință metodă integrată</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Verificare argument">
  <figcaption>Verificare Argument</figcaption>
</figure>

## Cum să începi cu TypeScript

Dacă sunteți nou în TypeScript și doriți să aflați mai multe, acest [video introductiv de la Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) oferă o imagine de ansamblu frumoasă a motivului pentru care a fost creată limba, cum funcționează, cum să o folosească, și încotro se îndreptă.

Există, de asemenea, un [manual](https://www.typescriptlang.org/docs/handbook/basic-types.html) şi un [teren de joacă](https://www.typescriptlang.org/play/index.html) pe site-ul oficial TypeScript.

Deoarece TypeScript este un superset de JavaScript, codul existent JavaScript este deja valid TypeScript. Asta înseamnă că poți trece treptat un proiect JavaScript existent la TypeScript, stropind noi caracteristici lingvistice după cum este necesar.

## Mulțumim

Acest proiect nu ar fi fost posibil fără ajutorul comunității de întreținători open-source a Electron. Mulțumită [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg) [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Forster Brendan](https://github.com/shiftkey), și multe altele pentru remedierea erorilor, îmbunătățirea documentației, și îndrumare tehnică.

## Asistență

Dacă întâmpinați probleme cu noile fișiere de definire TypeScript ale Electron, vă rugăm să introduceți o problemă în depozitul [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

Discriere fericită!
