---
title: 'Electron 2.0 și Beyond - Versionare semantică'
author: ape subterane
date: '2017-12-06'
---

O nouă versiune majoră a Electron este în lucru, şi odată cu ea unele modificări ale strategiei noastre de versiune. Începând cu versiunea 2.0.0, Electron va adera strict la Semantic Versioning.

---

Această schimbare înseamnă că veţi vedea mai des varianta cea mai importantă şi de obicei va fi o actualizare majoră la Chromium. Partajările patch-ului vor fi, de asemenea, mai stabile, deoarece acum vor conține doar remedieri ale erorilor fără funcții noi.

**Creșteri ale versiunii majore**

* Actualizări versiune Chromium
* Actualizări majore ale versiunii Node.js
* Electron rupe modificările API

**Versiune minoră Incremente**

* Actualizări minore ale versiunii Node.js
* Modificări ale Electron fără rupere API

**Patch Version Increments**

* Actualizare versiune patch Node.js
* plasturi cu crom fix
* Remedierea bug-ului Electron

Deoarece intervalele semiale ale Electron vor fi acum mai semnificative, recomandăm instalarea Electron folosind steagul implicit `--save-dev` al lui npm, care va prefixa versiunea cu `^`, ține-vă la curent în siguranță cu actualizările minore și patch :

```sh
npm instalare --save-dev electron
```

Pentru dezvoltatorii interesați doar de remedierea erorilor, ar trebui să utilizați prefixul pentru semiful de tilde, ex. `~2. .0`, care nu va introduce niciodată noi caracteristici, doar repară pentru a îmbunătăți stabilitatea.

Pentru mai multe detalii, a se vedea [electronjs.org/documents/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
