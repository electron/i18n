---
title: Suport Apple Silicon
author: MarshallOfSound
date: '2020-10-15'
---

Cu hardware Apple Silicon lansat mai târziu în acest an, cum arată calea pentru tine pentru a face aplicația ta Electron să ruleze pe noul hardware?

---

Cu eliberarea de Electron 11,0.0-beta. , echipa Electron este acum construită de Electron care rulează pe noul hardware Apple Silicon pe care Apple plănuiește să îl transporte mai târziu în acest an. Poți apuca cea mai recentă versiune beta cu `npm instalați electron@beta` sau să o descărcați direct de pe site-ul nostru [lansează](https://electronjs.org/releases/stable).

## Cum funcționează?

Începând cu Electron 11, vom expedia versiuni separate de Electron pentru Intel Macs și Apple Silicon Macs. Înainte de această schimbare, deja livram două artefacte, `darwin-x64` și `mas-x64`, cu cea din urmă utilizare pentru utilizarea compatibilității Mac App Store. Acum livrăm alte două artefacte, `darwin-arm64` și `mas-arm64`, care sunt echivalentele Apple Silicon ale artefactelor menționate anterior.

## Ce trebuie să fac?

Va trebui să expediați două versiuni ale aplicației: una pentru x64 (Intel Mac) și una pentru arm64 (Apple Silicon). Vestea bună este că [`electron-packer`](https://github.com/electron/electron-packager/), [`Electron-rebuild`](https://github.com/electron/electron-rebuild/) și [`electron-forge`](https://github.com/electron-userland/electron-forge/) suportă deja țintind arhitectura `arm64`. Atâta timp cât rulați ultimele versiuni ale acestor pachete, aplicația ta ar trebui să funcționeze fără greșeală odată ce actualizezi arhitectura țintă la `arm64`.

În viitor, vom lansa un pachet care vă permite să "fuzionaţi" aplicaţiile dvs. `arm64` şi `x64` într-un singur binar universal, dar merită menţionat că acest binar ar fi _imens_ şi probabil nu este ideal pentru livrarea către utilizatori.

## Probleme potențiale

### Module native

Pe măsură ce țintești o nouă arhitectură, va trebui să actualizezi mai multe dependențe care pot cauza probleme de construcție. Versiunea minimă a anumitor dependențe este inclusă mai jos pentru referința dvs.

| Dependenţă                  | Cerința Versiunii |
| --------------------------- | ----------------- |
| Xcode                       | `>=12.0.0`     |
| `ciupă`                     | `>=7.1.0`      |
| `reconstruire de electroni` | `>=1.12.0`     |
| `ambalator de electroni`    | `>=15.1.0`     |

Ca urmare a acestor cerințe de versiune de dependență, poate fi necesar să reparați/actualizați anumite module native.  Un lucru de notat este că versiunea Xcode va introduce o nouă versiune a macOS SDK, care poate cauza erori de construire pentru modulele tale native.


## Cum testez asta?

În prezent, aplicațiile Apple Silicon rulează numai pe dispozitivul Apple Silicon hardware, care nu este disponibil în scop comercial la momentul scrierii acestui post de blog. Dacă aveți un [Kit de tranziție pentru dezvoltatori](https://developer.apple.com/programs/universal/), puteți testa aplicația dvs. pe acest lucru. În caz contrar, va trebui să aștepți ca aplicația ta să funcționeze pentru producția de hardware Apple Silicon pentru a testa dacă funcționează.

## Ce se întâmplă cu Rosetta 2?

Rosetta 2 este cea mai recentă iterație a tehnologiei lor [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) , care vă permite să rulați aplicații x64 Intel pe noua lor aplicație arm64 Apple Silicon hardware. Deși credem că x64 de aplicații Electron vor rula sub Rosetta 2, sunt câteva lucruri importante de luat în considerare (şi motivele pentru care ar trebui să livraţi un binar nativ arm64).

* Performanța aplicației tale va fi degradată semnificativ. Electron / V8 folosește compilația [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) pentru JavaScript, și datorită modului în care funcționează Rosetta, veţi rula JIT de două ori (o dată în V8 şi o dată în Rosetta).
* Pierzi beneficiul noii tehnologii în Apple Silicon, cum ar fi dimensiunea mărită a paginilor de memorie.
* Am menţionat că performanţa va fi **semnificativ** degradată?
