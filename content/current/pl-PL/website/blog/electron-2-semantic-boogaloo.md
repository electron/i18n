---
title: 'Electron 2.0 i więcej - wersja semantyczna'
author: wody podziemne
date: '2017-12-06'
---

W pracach znajduje się nowa ważna wersja Electrona, a wraz z nią wprowadzono pewne zmiany w naszej strategii wersji. Od wersji 2.0.0, Electron będzie ściśle przestrzegać semantycznego wersioningu.

---

Ta zmiana oznacza, że częściej będziesz widzieć uderzenie w wersję i zazwyczaj będzie to poważna aktualizacja Chromium. Wydania Patch będą również bardziej stabilne, ponieważ teraz będą zawierać tylko poprawki błędów bez nowych funkcji.

**Większe przyrost wersji**

* Aktualizacje wersji Chromium
* Node.js główne aktualizacje wersji
* Interfejs API Electrona

**Drobne przyrost wersji**

* Aktualizacje wersji Node.js
* Nieniszczące zmiany API Electron

**Przyrost wersji**

* Aktualizacje wersji Node.js
* stałe plastry chromowane
* Poprawki błędów Electron

Ponieważ zakresy semver Electron będą teraz bardziej znaczące, zalecamy zainstalowanie Electrona używając domyślnej flagi `--save-dev` , który prefiks twojej wersji z `^`, bezpiecznie aktualizuje Cię z drobnymi aktualizacjami :

```sh
npm install --save-dev electron
```

Dla deweloperów zainteresowanych tylko poprawkami błędów, powinieneś użyć przedrostka tilde semver np. `~2. .0`, który nigdy nie wprowadzi nowych funkcji, tylko poprawki mające na celu poprawę stabilności.

Aby uzyskać więcej informacji, zobacz [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
