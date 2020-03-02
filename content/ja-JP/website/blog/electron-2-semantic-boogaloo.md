---
title: 'Electron 2.0 以降 - セマンティックバージョニング'
author: groundwater
date: '2017-12-06'
---

新しいメジャーバージョンの Electron が開発中です。そこで、バージョン管理戦略にいくつかの変更を加えます。 バージョン 2.0.0 から、Electron はセマンティックバージョニングに厳密に従います。

---

この変更によりメジャーバージョンが頻繁に上がるようになり、これは通常 Chromium 対応のメジャーアップデートになります。 また、パッチリリースにはバグ修正のみが含まれ、新機能を含みません。そのため、パッチリリースの安定性も向上します。

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

Electron の semver 範囲がより意味を持つようになるため、Electron をインストールする時は npm 既定の `--save-dev` フラグの使用を推奨します。これにより、バージョンの前に `^` が付けられ、マイナーやパッチの更新を安全にできます。

```sh
npm install --save-dev electron
```

バグ修正にのみ関心がある開発者は、チルダを前に付けた semver を使用するとよいでしょう。`~2.0.0` は、新機能は導入せずに安定性を改善する修正のみを導入します。

詳細は、[electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning) を参照してください。
