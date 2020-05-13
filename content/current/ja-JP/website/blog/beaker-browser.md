---
title: '今週のプロジェクト: Beaker ブラウザ'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

今週は、[Beaker ブラウザ](https://beakerbrowser.com/) の作者 [Paul Frazee](http://pfrazee.github.io/) に突撃しました。 Beaker は実験的な P2P ウェブブラウザで、Dat プロトコルでユーザーのデバイスからサイトをホストします。

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Beaker とは何ですか? なぜ作ったのですか?

Beaker は参加型ブラウザです。 個人ハッカー向けのブラウザなのです。

ウェブはオープンソースではありません。 ソーシャルメディアの機能に影響を与えたい場合、Facebook や Twitter に働きかける必要があります。 検索なら、Google です。 この制御は、ユーザー自身ではなく企業が握ってます。

Beaker には、新しいウェブプロトコル [Decentralized Archive Transport](https://datprotocol.com) があります。 "Dat"。それはオンデマンドかつ無料でサイトを作成し、デバイスから共有します。 サーバーは要りません。 これは革命です。

![Beaker のプロトコル](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Beaker で Dat サイトを訪れると、そのファイルをダウンロードします。 これで、このサイトは永遠にあなたのものです。 保存したり、フォークしたり、変更したり、新しいバージョンを無料で共有したりできます。 全てがオープンソースです。

これこそが、私たちがオープンソースウェブサイト向けブラウザを作っているということです。 これをソーシャルハッキングのツールキットにしたいのです。

## どんな人が Beaker を使うべきですか?

ハッカー。 モッダー。 創り手。 弄り回すのが好きな人。

## Dat を使った新規プロジェクトの作り方は?

git + npm のような [bkr というコマンドラインツール](https://github.com/beakerbrowser/bkr) があります。 これで以下のようにしてサイトを作ります。

```bash
$ cd ~/my-site
$ bkr init
$ echo "Hello, world!" > index.html
$ bkr publish
```

そして、サイトのフォークはこのようにします。

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "My fork has no regard for the previous index.html!" > index.html
$ bkr publish
```

これらのサイトは、ブラウザからホストされます。 BitTorrent に少し似た、P2P メッシュでのサイト共有です。

GUI が必要な場合でも、ブラウザにはユーザーランドに押し込んでいる基本的なツールがいくつか組み込まれています。 これによって全て変更可能なユーザーアプリになります。

## Electron で Beaker を構築することにしたのはなぜですか?

このプロジェクトにとっては言うまでもありませんでした。 もし私自身の手で Chrome をフォークしていれば、今頃 C++ を書いていたことでしょう! 誰しもそうはしたくありません。 私はウェブで積み重ねた経験があるので、Electron なら手早く作業できます。 悩むことはありません。

事実、Electron なくして成し遂げられるかどうか分かりませんでした。 これは素晴らしいソフトウェアです。

## Beaker 構築の際に直面した課題はありますか?

半分は、ツールを試してどのくらいまでで打ち切るかを予測しました。

ブラウザ自体の作成は非常に簡単でした。 Electron はブラウザを作るツールキットとも言えます。 ...ブラウザタブを除けば。これが正常に動くまで、かつてないほど時間がかかりました。 ついには挫折して、SVG の動かし方を学びました。 見た目は格段に良くなりましたが、正常になるまで 3、4 回やり直しました。

## Electron はどういった領域で改善されるべきでしょうか?

WebView 内にデベロッパー ツールをドッキングできたら、どんなに素晴らしいでしょうか。

## Beaker の今後の予定は何ですか?

Dat サイトの DNS 名保護。 ["アプリスキーム"](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) というソーシャルで構成可能な URL スキーム。その他 Dat API。

## プロジェクトへの貢献に興味がありそうな人向けに、Beaker はどの領域で助けが必要なのか教えて頂けますか?

未解決の Issue がたくさんあります。 私への連絡を恐れることはありません。 フリーノード上に #beakerbrowser があります。 [コントリビューター向けのページ](https://beakerbrowser.com/docs/team.html) を管理しており、そこに加えます。 オースティンを訪れてくれたら、私がビールを奢りましょう。

## 他の開発者に役立つ Electron のノウハウはありますか?

1. 既製のビルドツールを使用しましょう。 独自の解決方法のせいで苦戦してほしくありません。私を信じてください。 electron-builder を使いましょう。 雛型レポジトリを使いましょう。
2. Electron リポジトリで Issue を開く必要がある場合は、より簡単に再現できるように努めましょう。 より迅速に回答が得られ、そのチームも高く評価します。 さらに言えば、自分で修正してみましょう。 中身を覗くのは本当にとっても面白いです。
3. すべてのガイドと上級者向けドキュメントを 1 回は読みましょう。
4. ただのブラウザを構築しないようにしましょう。それは飽和した市場です。

