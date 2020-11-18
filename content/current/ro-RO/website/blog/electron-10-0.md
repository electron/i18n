---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguie
date: '2020-08-25'
---

Electron 10.0.0 a fost lansat! Acesta include upgrade-uri la Chromium `85`, V8 `8.5`, şi Node.js `12.16`. Am adăugat câteva noi integrări și îmbunătățiri API. Citește mai jos pentru mai multe detalii!

---

Echipa Electron este încântată să anunțe lansarea Electron 10.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici.

În versiunea Electron 10 am făcut de asemenea o schimbare în notele noastre de lansare. Pentru a face mai ușor să spui ce e nou în Electron 10 și ce s-ar fi putut schimba între Electron 10 și versiunile anterioare, acum includem și modificări care au fost introduse în Electron 10, dar care au fost redirecționate către versiunile anterioare. Sperăm că acest lucru facilitează găsirea de noi caracteristici și remedierea erorilor atunci când se actualizează Electron.

Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

## Modificări notabile

### Schimbări stivă

* Crom `85.0.4183.84`
    * [Nou în Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nou în Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Postare pe blog Node 12.16.3](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [Blog V8 8.4](https://v8.dev/blog/v8-release-84)
    * [Blog V8 8.5](https://v8.dev/blog/v8-release-85)

### Evidențiere caracteristici

* S-a adăugat metoda `contents.getBackgroundThrottling()` și `contents.backgroundThrottling`. [#21036]
* A ieșit modulul `desktopCapturer` în procesul principal. [#23548](https://github.com/electron/electron/pull/23548)
* Poți verifica acum dacă o anumită sesiune `` este persistentă apelând `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Rezolvă problemele de rețea care au împiedicat conectarea apelurilor RTC din cauza modificărilor adreselor IP ale rețelei și ICE. (Emisiunea de crom 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Vezi [notele de lansare 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) pentru o listă completă de caracteristici noi și modificări.

## Ruperea modificărilor

* A modificat valoarea implicită a `enableRemoteModule` la `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Aceasta face parte din planurile noastre pentru a descuraja modulul `remote` și pentru a-l muta pe utilizator. Puteți citi și urmări [această problemă](https://github.com/electron/electron/issues/21408) care detaliază motivele noastre pentru acest lucru și include o propunere de cronologie pentru descurajare.
* A schimbat valoarea implicită a `app.allowRendererProcessReuse` la `true`. [#22336](https://github.com/electron/electron/pull/22336) (de asemenea, în [Electron 9](https://github.com/electron/electron/pull/22401))
   * Acest lucru va împiedica încărcarea modulelor native care nu sunt sensibile la context în procesele de redare.
   * Puteți citi și urmări [această problemă](https://github.com/electron/electron/issues/18397) care detaliază motivele noastre pentru acest lucru și include o propunere de cronologie pentru descurajare.
* A reparat poziționarea butoanelor ferestrei pe macOS atunci când sistemul de operare local este setat pe o limbă RTL (cum ar fi arabă sau ebraică). Este posibil ca aplicațiile pentru ferestre fără cadru să trebuiască să dea socoteală pentru această schimbare în timp ce stilizează ferestrele lor. [#22016](https://github.com/electron/electron/pull/22016)

Mai multe informații despre acestea și schimbările viitoare pot fi găsite pe pagina [Schimbări de rupere planificate](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modificări API

* Sesiune: Poți verifica acum dacă o anumită sesiune `` persistă apelând `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Conţinut: Adăugat `contents.getBackgroundTrottling()` şi `contents.backgroundThrottling` proprietate. [#21036](https://github.com/electron/electron/pull/21036)

### API învechite

Următoarele API sunt acum învechite sau eliminate:

* A eliminat `current tlyLoggingPath` proprietatea `netLog`. În plus, `netLog.stopLogging` nu mai returnează calea către jurnalul înregistrat. [#22732](https://github.com/electron/electron/pull/22732)
* Încărcarea crash nerecomprimat în `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Sfârșitul suportului pentru 7.x.y

Electron 7.x.y a ajuns la sfârșitul suportului conform politicii de sprijin [a proiectului](https://electronjs.org/docs/tutorial/support#supported-versions). Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [11.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines) cartografiază datele cheie din ciclul de dezvoltare Electron 11.0. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Continuă să lucrezi pentru dezactivarea modulului `remote` (în Electron 11)
Am început să lucrăm pentru a elimina modulul de la distanță din [Electron 9](https://www.electronjs.org/blog/electron-9-0) și continuăm planurile de eliminare a modulului `de la distanță`. În Electron 11, plănuim să continuăm activitatea de refactor pentru implementarea [WeakRef](https://v8.dev/features/weak-references) așa cum am făcut în Electron 10. Vă rugăm să citiţi şi să urmaţi [această problemă](https://github.com/electron/electron/issues/21408) pentru planuri complete şi detalii pentru dezaprobare.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
