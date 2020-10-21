---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

După mai mult de patru luni de dezvoltare, opt versiuni beta, și teste la nivel mondial din eșalonări ale mai multor aplicații, eliberarea Electron 2. .0 este acum disponibil de la [electronjs.org](https://electronjs.org/).

---

## Procesul de lansare

Începând cu 2.0.0, versiunile Electron vor urma [versionarea semantică](https://electronjs.org/blog/electron-2-semantic-boogaloo). Aceasta înseamnă că versiunea majoră se va lovi mai des şi va fi, de obicei, o actualizare majoră la Chromium. Versiunile de patch-uri ar trebui să fie mai stabile deoarece vor conține doar remedieri de erori de înaltă prioritate.

Electron 2.0.0 reprezintă, de asemenea, o îmbunătățire a modului în care Electron este stabilizat înainte de o eliberare majoră. Câteva aplicații Electron la scară mare au inclus 2,0.0 betas în rollouturile în etape, oferind cea mai bună buclă de feedback pe care Electron a avut-o vreodată pentru o serie beta.

## Modificări / Caracteristici noi

 * Bule majore în mai multe părți importante din lanțul de instrumente al Electron, inclusiv Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 pe Linux, vânzător de veveriță actualizat și veveriță.
 * [Achizițiile în aplicații](https://electronjs.org/blog/in-app-purchases) sunt acum acceptate pe MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * API nou pentru încărcarea fișierelor. [#11565](https://github.com/electron/electron/pull/11565)
 * API nou pentru a activa/dezactiva o fereastră. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Suport nou pentru logarea mesajelor IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Evenimente de meniu nou. [#11754](https://github.com/electron/electron/pull/11754)
 * Adaugă un eveniment `închide` la powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Adaugă opțiunea `afinity` pentru colectarea mai multor BrowserWindows într-un singur proces. [#11501](https://github.com/electron/electron/pull/11501)
 * Adăugați posibilitatea pentru saveDialog la lista de extensii disponibile. [#11873](https://github.com/electron/electron/pull/11873)
 * Suport pentru acțiuni de notificare suplimentare [#11647](https://github.com/electron/electron/pull/11647)
 * Capacitatea de a seta titlul butonului de închidere macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Adăugați condiționat pentru menu.popup(fereastră, callback)
 * Îmbunătățiri ale memoriei în elementele barei de acces. [#12527](https://github.com/electron/electron/pull/12527)
 * Îmbunătățirea listei de verificare a recomandărilor de securitate.
 * Adaugă semne de carte pentru App-Scoped. [#11711](https://github.com/electron/electron/pull/11711)
 * Adaugă abilitatea de a seta argumente arbitrare într-un proces de redare. [#11850](https://github.com/electron/electron/pull/11850)
 * Adaugă vizualizare accesoriu pentru selectorul de formate. [#11873](https://github.com/electron/electron/pull/11873)
 * Condiție de delegare a cursei de rețea fixă. [#12053](https://github.com/electron/electron/pull/12053)
 * Sterge suportul pentru arcul `mips64el` pe Linux. Electron necesită lanțul de unelte C+14, care nu a fost disponibil pentru acel arc la momentul lansării. Sperăm să aducem din nou sprijin în viitor.

## Ruperea modificărilor API

 * [API învechite](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), inclusiv:
   * S-a schimbat semnătura `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Eliminat `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Eliminat `webContents.setZoomLevelLimits` și `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Metode `clipboard` șterse. [#11973](https://github.com/electron/electron/pull/11973)
   * Suport eliminat pentru parametrii boolean pentru `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Probleme rezolvate

 * Schimbat pentru a vă asigura că `webContents.isOffscreen()` este întotdeauna disponibil. [#12531](https://github.com/electron/electron/pull/12531)
 * S-a rezolvat `BrowserWindow.getFocusedWindow()` când DevTools este detașat și concentrat. [#12554](https://github.com/electron/electron/pull/12554)
 * Preîncărcare fixă care nu se încarcă în redarea cu sandbox, dacă calea de preîncărcare conține caractere speciale. [#12643](https://github.com/electron/electron/pull/12643)
 * Corectați implicit allowRunningInsecureContent ca per documente. [#12629](https://github.com/electron/electron/pull/12629)
 * Transparență fixă pentru nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * S-a rezolvat problema cu `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Opțiunile de menu.popup confirmate sunt obiecte. [#12330](https://github.com/electron/electron/pull/12330)
 * S-a eliminat o condiție de cursă între crearea de noi procese și eliberarea contextului. [#12361](https://github.com/electron/electron/pull/12361)
 * Actualizează regiunile draggable când schimbi BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Remediat menubar toggle detectare alt cheie la focalizare. [#12235](https://github.com/electron/electron/pull/12235)
 * Au fost remediate avertismente incorecte în vizualizări web. [#12236](https://github.com/electron/electron/pull/12236)
 * Fixează moștenirea opțiunii 'show' de la ferestrele părinte. [#122444](https://github.com/electron/electron/pull/122444)
 * Asigurați-vă că `getLastCrashReport()` este de fapt ultimul raport privind erorile. [#12255](https://github.com/electron/electron/pull/12255)
 * Necesită fixă pe calea de partajare a rețelei. [#12287](https://github.com/electron/electron/pull/12287)
 * S-a remediat clic pe callback. [#12170](https://github.com/electron/electron/pull/12170)
 * S-a remediat poziția meniului popup. [#12181](https://github.com/electron/electron/pull/12181)
 * Curățare îmbunătățită a buvului libuv. [#11465](https://github.com/electron/electron/pull/11465)
 * Reparat `hexColorDWORDToRGBA` pentru culori transparente. [#11557](https://github.com/electron/electron/pull/11557)
 * Depășirea indicatorului nul reparată cu getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * S-a remediat o referință ciclică în delegatul meniului. [#11967](https://github.com/electron/electron/pull/11967)
 * Filtrarea protocolului fix al net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits setează acum constrângerile de scară ale agentului de utilizator [#12510](https://github.com/electron/electron/pull/12510)
 * Setați opțiunile implicite pentru webview-uri. [#12292](https://github.com/electron/electron/pull/12292)
 * Suport de vibrații îmbunătățit. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * S-a rezolvat problema cronometrare in fixtura singleton.
 * S-a reparat cache-ul de producție stricat în NotifierSupportsActions()
 * Made MenuElement roluri compatibile camelCasa. [#11532](https://github.com/electron/electron/pull/11532)
 * Îmbunătățește actualizările barei de atingere. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Separatoare de meniu suplimentare eliminate [#11827](https://github.com/electron/electron/pull/11827)
 * S-a remediat eroarea alegerii Bluetooth. Închide [#11399](https://github.com/electron/electron/pull/11399).
 * Mmacos macos Întreg Ecran Comutare etichetă meniu [#11633](https://github.com/electron/electron/pull/11633)
 * Ascundere îmbunătățită a tooltip-ului atunci când o fereastră este dezactivată. [#11644](https://github.com/electron/electron/pull/11644)
 * Metoda de vizualizare web învechită migrată. [#11798](https://github.com/electron/electron/pull/11798)
 * S-a reparat închiderea unei ferestre deschise dintr-un browser. [#11799](https://github.com/electron/electron/pull/11799)
 * S-a remediat eroarea alegerii Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Updated to use task scheduler for app.getFileIcon API. (Automatic Copy) [#11595](https://github.com/electron/electron/pull/11595)
 * Eveniment `consolă-mesaj` schimbat la foc chiar și atunci când se redă offscreen. [#11921](https://github.com/electron/electron/pull/11921)
 * S-a remediat descărcarea din protocoalele personalizate folosind `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Ferestre transparente reparate pierd transparența atunci când se detașează unelte. [#11956](https://github.com/electron/electron/pull/11956)
 * S-a reparat că aplicațiile Electron anulează repornirea sau închiderea. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * S-a reparat scurgerea evenimentului la reutilizarea elementului bară de atingere. [#12624](https://github.com/electron/electron/pull/12624)
 * Tăvița fixă evidențiată în modul întunecat. [#12398](https://github.com/electron/electron/pull/12398)
 * S-a reparat blocarea procesului principal pentru dialogul async. [#12407](https://github.com/electron/electron/pull/12407)
 * Reparat `setTitle` crash. [#12356](https://github.com/electron/electron/pull/12356)
 * S-a remediat crash când se setează meniul dock. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Notificări Linux desktop mai bune. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Suport mai bun pentru tema GTK+ pentru meniuri. [#12331](https://github.com/electron/electron/pull/12331)
 * Ieșiți grațios pe linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Folosește numele aplicației ca indiciul implicit al pictogramei de tăviță. [#12393](https://github.com/electron/electron/pull/12393)

### Ferestre
 * Suport vizual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * S-a stabilit trecerea excepției la handler pentru accidentele de sistem. [#12259](https://github.com/electron/electron/pull/12259)
 * S-a remediat ascunderea sfaturilor de unelte din fereastra minimizată. [#11644](https://github.com/electron/electron/pull/11644)
 * S-a remediat `desktopCapturer` pentru a captura ecranul corect. [#11664](https://github.com/electron/electron/pull/11664)
 * Remediat `dezactivați eHardwareAcceleration` cu transparență. [#11704](https://github.com/electron/electron/pull/11704)

# Ce urmează

Echipa Electron lucrează din greu pentru a sprijini versiuni mai noi ale Chromium, Node și v8. Așteptați 3.0.0-beta.1 în curând!
