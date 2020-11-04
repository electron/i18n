---
title: Fix pentru vulnerabilitate WebPreferences
author: ckerr
date: '2018-08-22'
---

A fost descoperită o vulnerabilitate la execuția codului la distanță, afectând aplicațiile cu capacitatea de a deschide ferestre imbricate pentru copii pe versiunile Electron (3. 0,0-beta.6, 2,0,7, 1,8,7 şi 1,7,15). Această vulnerabilitate a fost atribuită identificatorului CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Platforme afectate

Ești afectat dacă:

1. Ai încorporat _orice_ conținut de utilizator de la distanță, chiar și într-un sandbox
2. Acceptați intrarea utilizatorului cu orice vulnerabilități XSS

_Detalii_

Ești afectat în cazul în care orice utilizator rulează într-un `iframe` / poate crea un `iframe`. Având în vedere posibilitatea unei vulnerabilități XSS, se poate presupune că majoritatea aplicațiilor sunt vulnerabile la acest caz.

Ești de asemenea afectat dacă deschizi oricare dintre ferestrele tale cu opțiunea `nativeWindowOpen: adevărat` sau `sandbox: adevărat`.  Deși această vulnerabilitate necesită și o vulnerabilitate XSS pentru a exista în aplicația dumneavoastră, ar trebui să aplicați în continuare una dintre atenuările de mai jos dacă utilizați oricare dintre aceste opțiuni.

## Atenuare

Am publicat noi versiuni de Electron care includ remedii pentru această vulnerabilitate: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)şi [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Solicităm tuturor dezvoltatorilor Electron să își actualizeze aplicațiile la ultima versiune stabilă imediat.

Dacă dintr-un anumit motiv nu puteți să vă actualizați versiunea Electron, vă puteți proteja aplicația prin apelul generalizat `evenimentul. reventDefault()` pe evenimentul `noua fereastră` pentru toate  `conținutul web`'. Dacă nu utilizați `window.open` sau orice ferestre copil atunci acesta este, de asemenea, o atenuare validă pentru aplicația dvs.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Dacă vă bazaţi pe capacitatea ferestrelor copilului dumneavoastră de a face ferestre nepoate, apoi o a treia strategie de atenuare este de a utiliza următorul cod pe fereastra de nivel superior:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (eveniment, url, cadru,dispunere, opțiuni) => {
      if (!options ebPreferences) {
        opțiuni. ebPreferințe = {}
      }
      Obiect. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      dacă (options.webContents) {
        handle(options ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Acest cod va implementa manual ca ferestrele de nivel superior `webPreferences` să fie aplicate manual la toate ferestrele copil infinit de adâncime.

## Informații suplimentare

Această vulnerabilitate a fost găsită și raportată în mod responsabil la proiectul Electron de către [Matt Austin](https://twitter.com/mattaustin) [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați tutorialul nostru de securitate [](https://electronjs.org/docs/tutorial/security).

Dacă doriți să raportați o vulnerabilitate în Electron, trimiteți un e-mail security@electronjs.org.
