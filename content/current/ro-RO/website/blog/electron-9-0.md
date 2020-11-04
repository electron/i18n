---
title: Electron 9.0.0
author:
  - sofianguie
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 a fost lansat! Acesta include upgrade-uri la Chromium `83`, V8 `8.3`, şi Node.js `12.14`. Am adăugat câteva noi integrări API pentru caracteristica noastră de verificator de detalii, am activat vizualizatorul PDF și multe altele!

---

Echipa Electron este încântată să anunțe lansarea Electron 9.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici. Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

## Modificări notabile

### Schimbări stivă

* Crom `83.0.4103.64`
    * [Nou în Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 a fost omis](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Nou în Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Postare pe blog Node 12.14.1](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [Postare pe blog V8 8.1](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 postare pe blog](https://v8.dev/blog/v8-release-83)

### Evidențiere caracteristici

* Îmbunătățiri multiple ale funcției de verificare a ortografiei. Vezi mai multe detalii în [#22128](https://github.com/electron/electron/pull/22128) şi [#22368](https://github.com/electron/electron/pull/22368).
* Gestionar îmbunătățit de evenimente pe Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Activare vizualizator PDF. [#22131](https://github.com/electron/electron/pull/22131).

Vezi [notele de lansare 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) pentru o listă completă de caracteristici noi și modificări.

## Ruperea modificărilor

* Avertisment de dezaburire atunci când utilizați `remote` fără `enableRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Acesta este primul pas în planurile noastre pentru a descuraja modulul `remote` și a-l muta către utilizatori. Puteți citi și urmări [această problemă](https://github.com/electron/electron/issues/21408) care detaliază motivele noastre pentru acest lucru și include o propunere de cronologie pentru descurajare.
* Setați `app.enableRendererProcessReuse` la adevărat implicit. [#22336](https://github.com/electron/electron/pull/22336)
    * Acest lucru este în continuare de lucru pentru o cerință viitoare ca modulele native Node încărcate în procesul de redare să fie [N-API](https://nodejs.org/api/n-api.html) sau [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informațiile complete și calendarul propus sunt detaliate în [această problemă](https://github.com/electron/electron/issues/18397).
* Trimiterea de obiecte non-JavaScript peste IPC aruncă acum o excepție. [#21560](https://github.com/electron/electron/pull/21560)
    * Acest comportament a fost depreciat în Electron 8.0. În Electron 9.0, vechiul algoritm de serializare a fost eliminat, iar trimiterea unor astfel de obiecte neserializabile va arunca o eroare de tipul "obiectul nu a putut fi clonat".

Mai multe informații despre acestea și schimbările viitoare pot fi găsite pe pagina [Schimbări de rupere planificate](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modificări API

* `shell` Se schimbă API:
   * API `shell.openItem` a fost înlocuit cu o `shell.openPath API`. [propunere](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `Sesiunea`Se schimbă API:
   * Adăugat `session.listWordsFromSpellCheckerDictionary` API pentru a afișa cuvinte personalizate în dicționar. [#22128](https://github.com/electron/electron/pull/22128)
   * Adăugat `session.removeWordFromSpellCheckerDictionary` API pentru a elimina cuvinte personalizate din dicționar. [#22368](https://github.com/electron/electron/pull/22368)
   * A adăugat `session.serviceWorkerContext` API pentru a accesa informațiile de bază ale lucrătorului serviciu și pentru a primi jurnale de consolă de la lucrătorii de servicii. [#22313](https://github.com/electron/electron/pull/22313)
* `app` API modificări:
   * Adăugat un nou parametru de forță la `app.focus()` pe macOS pentru a permite aplicațiilor să se focalizeze forțat. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` se modifică API:
   * Suport adăugat pentru accesul proprietății la unele perechi getter/setter pe `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### API învechite

Următoarele API sunt acum învechite sau eliminate:

* `shell.openItem` API este depreciat și înlocuit cu o `shell.openPath API`.
* `<webview>.getWebContent`, care a fost învechit în Electron 8.0, este acum eliminat.
* `webFrame.setLayoutZoomLevelLimits`, care a fost învechit în Electron 8.0, este acum eliminat.

## Sfârșit de suport pentru 6.x.y

Electron 6.x.y a ajuns la finalul suportului conform politicii [a proiectului,](https://electronjs.org/docs/tutorial/support#supported-versions). Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [10.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines) cartografiază datele cheie din ciclul de dezvoltare Electron 10.0. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Schimbă contextul implicit `contextIsolation` de la `false` la `true` (Pornind în Electron 10)

Fără contextIsolare, orice cod care rulează într-un dispozitiv de redare poate ajunge foarte ușor în Electron internals sau în scriptul de preîncărcare al aplicației. Acest cod poate efectua acțiuni privilegiate pe care Electron vrea să le mențină restricționat.

Schimbarea implicită îmbunătățește securitatea implicită a aplicațiilor Electron, astfel încât aplicațiile vor trebui să opteze în mod deliberat pentru un comportament nesigur. Electron will depreciate the current default of `contextIsolation` in Electron 10.0, and change to the new default (`true`) in Electron 12.0.

Pentru mai multe informații despre contextul `Isolation`, cum să îl activezi cu uşurinţă şi este un beneficiu de securitate, vă rugăm să consultaţi [Context Isolation Document](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
