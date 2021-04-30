# ボイラープレートとCLI

Electron での開発は特定のやり方に固執しておらず、開発、ビルド、パッケージ、リリースに「一つの正しいやり方」はありません。 Electron への追加機能は、ビルドと実行時の両方において、大抵の場合 [npm](https://www.npmjs.com/search?q=electron) 上で独立したパッケージとして見つけられます。開発者は必要なアプリとビルドパイプラインの両方を構築できます。

このレベルのモジュール性と拡張性のために、チーム規模の大小を問わず、Electron を使用しているすべての開発者が、開発ライフサイクル中のいかなる可能なことも不可能なことも決して制限されません。 しかし、多くの開発者にとっては、コミュニティ主導のボイラープレートやコマンドラインツールを使用すると、アプリのコンパイル、パッケージ、リリースが劇的に簡単になるかもしれません。

## ボイラープレート vs CLI

ボイラープレートはアプリケーションを構築するためのスタート地点、いわばカンバスです。 通常、ボイラープレートはクローン可能なレポジトリとして提供され、自分の要求に応じたカスタマイズができます。

一方で、コマンドラインツールは開発からリリースまでをサポートしてくれます。 より多くの点で開発を手助けしてくれますが、コードの構成やビルド方法についての制約を強制します。 *特に初心者はコマンドラインツールを使うのが良いでしょう。*

## electron-forge

"モダンな Electron アプリケーション構築のための完璧なツール"。 Electron Forge は、既存の (よく保守されている) Electron 開発用のビルドツール群をまとまったパッケージに統合しており、誰でもすぐに Electron 開発に着手できるようにします。

Forge には Webpack をバンドラーとして利用するための [即席テンプレート](https://electronforge.io/templates) があります。 Typescript の構成例が含まれており、簡単にカスタマイズできる構成ファイル 2 つが提供されています。 これは より大きな Electron コミュニティ ( [`electron-packager`](https://github.com/electron/electron-packager)など) で使用される同じコア モジュールを使用します – Electron メンテナによって行われた変更 (Slack のような) Forgeのユーザーに利益をもたらします。 俺もだ

詳細とドキュメントは [electronforge.io](https://electronforge.io/) で見ることができます。

## electron-builder

この "Electron アプリをパッケージしてビルドして即配布できる完璧ソリューション" は総合的な経験に焦点を当てています。 [`electron-builder`](https://github.com/electron-userland/electron-builder) は、単純さに重点を置いた単一の依存関係を1つ追加し、他の要件は内部で管理します。

`electron-builder` は、Electron メンテナー (自動更新プログラムなど) が使用する機能やモジュールをカスタムのものに置き換えます。 これらは一般的に緊密に統合されていますが、Atom、Visual Studio Code や、Slack のような人気のある Electron アプリケーションとの共通点は少なくなります。

より詳しい情報やドキュメントは [レポジトリ](https://github.com/electron-userland/electron-builder) にあります。

## electron-react-boilerplate

ツールを使わずにしっかりしたボイラープレートのみを作成する場合、CT Lin の [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) は一見の価値があるかもしれません。 これはコミュニティで非常に人気があり、`electron-builder` は内部で使用しています。

## その他のツール、ボイラープレート

["Awesome Electron" リスト](https://github.com/sindresorhus/awesome-electron#boilerplates) ではより多くのツールやボイラープレートを紹介しています。 リストの長さのあまり探すことに足がすくんでしまう場合は、ツールを追加することも有効な方法であることを忘れないでください。
