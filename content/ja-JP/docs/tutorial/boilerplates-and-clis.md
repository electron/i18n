# ボイラプレートとCLI

Electronでの開発は特定のやり方に固執しておらず、「一つの正しいやり方」はありません。 Electronのビルド、実行時に利用可能な追加的な機能は[npm](https://www.npmjs.com/search?q=electron)で独立したパッケージとして見つけることができるでできるでしょう。そのため、アプリケーションやビルドシステムを開発者が必要に応じて構築できるようになっています。

このモジュール性と拡張性により、Electronを使っている開発者はチームの大小に関わらず、開発ライフサイクルのある時点でできること、あるいはできないことに制限を受けません。 しかし、多くの開発者にとってはコミュニティーが提供するボイラープレートやコマンドラインツールにより劇的にコンパイル、パッケージ化、アプリのリリースが簡単になるのも確かです。

## ボイラープレート vs CLI

ボイラープレートはアプリケーションを構築するためのスタート地点、いわばカンバスです。 通常、ボイラープレートはクローン可能なレポジトリとして提供され、自分の要求に応じたカスタマイズができます。

一方で、コマンドラインツールは開発からリリースまでをサポートしてくれます。 より多くの点で開発を手助けしてくれますが、コードの構成やビルド方法についての制約を強制します。 *特に初心者はコマンドラインツールを使うのが良いでしょう。*

## electron-forge

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a cohesive package so that anyone can jump right in to Electron development.

Forge comes with [ready-to-use templates](https://electronforge.io/templates) for popular frameworks like React, Vue, or Angular. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron-userland/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## その他のツール、ボイラープレート

["Awesome Electron" リスト](https://github.com/sindresorhus/awesome-electron#boilerplates)はより多くのツールやボイラープレートを紹介しています。 If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.