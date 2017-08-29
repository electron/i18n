# Electronのバージョン管理

もしあなたが経験豊富なNodeプログラマなら、SemVer([セマンティックバージョニング](http://semver.org)) のことはご存知でしょう。 これは、ソフトウェア使用者にどのソフトウェアバージョン番号を指定するべきかを知らせるための慣習です。

## セマンティックバージョニングの概要

セマンティックバージョン番号は常に3つの数字から成り立っています：

    major.minor.patch
    

セマンティックバージョン番号は次のルールに従って上げられます：

* **Major**は、後方互換性が壊れる変更がある場合。
* **Minor**は、後方互換性が壊れない新しい機能の場合。
* **Patch** は、バグ修正とその他のマイナーな変更です。

このルールの簡単な覚え方がこうです：

    breaking.feature.fix
    

## Electronのバージョン管理

NodeとChromiumに依存しているため、ElectronはSemVerに完全に従うことが出来ません。 **そのため、いつでも特定バージョンのElectronを指定しないといけません。**

セマンティックバージョン番号は次のルールに従って上げられます：

* **Major**はElectron APIの大きな変更があるときです。例えば、`0.37.0`から`1.0.0`にアップデートした場合、アプリを変更する必要があります。
* **Minor**はChromiumのメジャー番号の変更・Nodeのマイナーアップデート・Electronの大きな変更があった場合です。 If you upgrade from `1.5.0` to `1.6.0`, your app is supposed to still work, but you might have to work around small changes.
* **Patch** is for new features and bug fixes. If you upgrade from `1.6.2` to `1.6.3`, your app will continue to work as-is.

We recommend that you set a fixed version when installing Electron from npm:

```sh
npm install electron --save-exact --save-dev
```

The `--save-exact` flag will add `electron` to your `package.json` file without using a `^` or `~`, e.g. `1.6.2` instead of `^1.6.2`. This practice ensures that all upgrades of Electron are a manual operation made by you, the developer.

Alternatively, you can use the `~` prefix in your SemVer range, like `~1.6.2`. This will lock your major and minor version, but allow new patch versions to be installed.