---
title: 'Electron 2.0 a Beyond - sémantické verze'
author: podzemní vody
date: '2017-12-06'
---

Nová hlavní verze Electronu je v dílech a s ní některé změny naší strategie verzí. Od verze 2.0.0, Electron bude striktně dodržovat sémantické Versioning.

---

Tato změna znamená, že budete častěji vidět hlavní verzi a obvykle to bude hlavní aktualizace Chromium. Platební verze budou také stabilnější, protože nyní budou obsahovat pouze opravy chyb bez nových funkcí.

**Nárůsty hlavní verze**

* Aktualizace verze Chromium
* Aktualizace hlavních verzí Node.js
* Electron rozbití změn API

**Drobné přírůstky verze**

* Aktualizace menších verzí Node.js
* Electron nerozbitné změny API

**Přírůstky patch verze**

* Aktualizace novější verze Node.js
* fixní chromozómové náplasti
* Opravy chyb Electronu

Because Electron's semver ranges will now be more meaningful, we recommend installing Electron using npm's default `--save-dev` flag, which will prefix your version with `^`, keeping you safely up to date with minor and patch updates:

```sh
npm install --save-dev electron
```

Pro vývojáře, kteří se zajímají pouze o opravy chyb, byste měli použít prefix tilde semver např. `~2. .0`, který nikdy nezavede nové funkce, pouze opraví pro zlepšení stability.

Více informací naleznete v [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
