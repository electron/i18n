---
title: 'Electron 2.0 en verder - Semantic Versioning'
author: grondwater
date: '2017-12-06'
---

Een nieuwe grote versie van Electron is in de werken en daarmee enkele wijzigingen in onze versiestrategie. Vanaf versie 2.0.0 zal Electron strikt aan de Semantic Versioning voldoen.

---

Deze wijziging betekent dat je vaker de grote versiemomp ziet, en het zal meestal een belangrijke update naar Chrome zijn. Patch releases zullen ook stabieler zijn, omdat ze nu alleen bugfixes zonder nieuwe functies bevatten.

**Belangrijke versie stappen**

* Chromium versie updates
* Node.js grote versie updates
* Electron breekt API veranderingen

**Kleine Versie stappen**

* minor version updates Node.js
* Electron onbreekbare API veranderingen

**Patch versie stappen**

* Node.js patch versie updates
* vast-gerelateerde chroom ladingen
* Electron bug fixes

Omdat Electron's semver bereik nu betekenisvoller zal zijn, raden we aan Electron te installeren met behulp van npm's standaard `--save-dev` vlag, die je versie zal voorvoegsel `^`zal voorleggen, en je veilig op de hoogte zal houden met kleine en patch updates:

```sh
npm install --save-dev electron
```

Voor ontwikkelaars die alleen geïnteresseerd zijn in bug fixes, moet je het tilde semver prefix gebruiken, bijvoorbeeld `~2. .0`, die nooit nieuwe functies zal introduceren, alleen oplossingen om de stabiliteit te verbeteren.

Voor meer details, zie [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
