---
title: 'Electron 2.0 以降 - セマンティックバージョニング'
author: groundwater
date: '2017-12-06'
---

新しいメジャーバージョンの Electron が開発中です。そこで、バージョン管理戦略にいくつかの変更を加えます。 バージョン 2.0.0 から、Electron はセマンティックバージョニングに厳密に従います。

---

This change means you'll see the major version bump more often, and it will usually be a major update to Chromium. Patch releases will also be more stable, as they will now only contain bug fixes with no new features.

**メジャーバージョンの単位**

* Chromium のバージョン更新
* Node.js のメジャーバージョン更新
* 互換性を破る Electron API の変更

**マイナーバージョンの単位**

* Node.js のマイナーバージョン更新
* 互換性を破らない Electron API の変更

**パッチバージョンの単位**

* Node.js のパッチバージョン更新
* Chromium パッチの修正関連
* Electron のバグ修正

Because Electron's semver ranges will now be more meaningful, we recommend installing Electron using npm's default `--save-dev` flag, which will prefix your version with `^`, keeping you safely up to date with minor and patch updates:

```sh
npm install --save-dev electron
```

For developers interested only in bug fixes, you should use the tilde semver prefix e.g. `~2.0.0`, which which will never introduce new features, only fixes to improve stability.

For more details, see [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
