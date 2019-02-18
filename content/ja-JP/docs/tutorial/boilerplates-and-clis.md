# ボイラープレートとCLI

Electronでの開発は特定のやり方に固執しておらず、「一つの正しいやり方」はありません。 Electronのビルド、実行時に利用可能な追加的な機能は[npm](https://www.npmjs.com/search?q=electron)で独立したパッケージとして見つけることができるでしょう。そのため、アプリケーションやビルドシステムを開発者が必要に応じて構築できるようになっています。

このモジュール性と拡張性により、Electronを使っている開発者はチームの大小に関わらず、開発ライフサイクルのある時点でできること、あるいはできないことに制限を受けません。 しかし、多くの開発者にとってはコミュニティが提供するボイラープレートやコマンドラインツールにより劇的にコンパイル、パッケージ化、アプリのリリースが簡単になるのも確かです。

## ボイラープレート vs CLI

ボイラープレートはアプリケーションを構築するためのスタート地点、いわばカンバスです。 通常、ボイラープレートはクローン可能なレポジトリとして提供され、自分の要求に応じたカスタマイズができます。

一方で、コマンドラインツールは開発からリリースまでをサポートしてくれます。 より多くの点で開発を手助けしてくれますが、コードの構成やビルド方法についての制約を強制します。 *特に初心者はコマンドラインツールを使うのが良いでしょう。*

## electron-forge

モダンなElectronアプリケーションを作成するための完璧なツールです。 Electron Forgeは既存の(メンテナンスされている) Electronアプリ開発用のビルドツール群を、誰でもElectronアプリ開発にすぐ着手できるようにまとめてパッケージにしたものです。

ForgeにはReact、VueJS、Angularのような人気フレームワークを利用するための[ready-to-use templates](https://electronforge.io/templates)があります。 Electronコミュニティで使われているのと同様の([`electron-packager`](https://github.com/electron-userland/electron-packager)のような) コアモジュールを採用しています。更新は(Slackのような) Electronメンテナー達が行っており、Forgeユーザーにも利益をもたらしています。

[electronforge.io](https://electronforge.io/)でもっと詳細が分かります。

## electron-builder

この「頒布準備の整った Electron アプリをパッケージ化して構築するための完璧なソリューション」は、総合的な経験に焦点を当てたものです。 [`electron-builder`](https://github.com/electron-userland/electron-builder) は、単純さに重点を置いた単一の依存関係を1つ追加し、他の要件は内部で管理します。

`electron-builder` は、Electron メンテナー (自動更新プログラムなど) が使用する機能やモジュールをカスタムのものに置き換えます。 これらは一般的に緊密に統合されていますが、Atom、Visual Studio Code や、Slack のような人気のある Electron アプリケーションとの共通点は少なくなります。

より詳しい情報やドキュメントは [レポジトリ](https://github.com/electron-userland/electron-builder) にあります。

## electron-react-boilerplate

ツールを使わずにしっかりしたボイラープレートのみを作成する場合、CT Lin の [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) は一見の価値があるかもしれません。 これはコミュニティで非常に人気があり、`electron-builder` は内部で使用しています。

## その他のツール、ボイラープレート

["Awesome Electron" リスト](https://github.com/sindresorhus/awesome-electron#boilerplates) ではより多くのツールやボイラープレートを紹介しています。 リストの長さのあまり探すことに足がすくんでしまう場合は、ツールを追加することも有効な方法であることを忘れないでください。