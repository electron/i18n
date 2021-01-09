---
title: '今週のプロジェクト: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

今週は GitHub 通知を管理する Electron ベースのツール、[Jasper](https://jasperapp.io) の作者にインタビューを伺いました。

---

## こんにちは! あなたは誰ですか?

私は [Ryo Maruyama](https://github.com/h13i32maru) で日本のソフトウェア開発者です。 [Jasper](https://jasperapp.io) と [ESDoc](https://esdoc.org) を開発しています。

## Jasper とは何ですか?

[Jasper](https://jasperapp.io) は GitHub 向けの柔軟で強力な Issue リーダーです。 github.com や GitHub Enterprise での Issue やプルリクエストに対応しています。

[![Jasper アプリスクリーンショット](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## どうしてこのアプリを制作したのですか?

仕事や OSS の活動で GitHub を使っている人は、毎日のように大量の通知が届く傾向にあります。 通知を受け取る方法として、GitHub ではメールと [ウェブ通知](https://github.com/notifications) を提供しています。 これらは数年前から使用していましたが、以下のような問題に直面しました。

- メンションされた、コメントした、監視している Issue を見落としがちである。
- 後で確認しようと Issue を頭の片隅に置いても、たまに忘れてしまうことがある。
- Issue を忘れないために、ブラウザでタブがたくさん開いたままになる。
- 自分に関係する Issue なのかどうかを全て確認するのは難しい。
- 自分のチームの活動を全て把握しづらい。

こういった問題の対処に時間と労力を費やしていました。そこで効率的に解決するために GitHub 用の Issue リーダーを作ってみようと思い、Jasper の開発を始めました。

## どういった人が Jasper を使用していますか？

Jasper は、GitHub を利用する企業の開発者、デザイナー、マネージャーに利用されています。 もちろん、OSS 開発者の中にも使っている人がいます。 さらに GitHub の人も使っています!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Jasper はどのような仕組みですか?

Jasper の設定を終えると、以下の画面が表示されます。 左から順に、"ストリームリスト"、"Issue リスト"、"Issue 本文" が表示されます。

[![Jasper 起動画面](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

この "ストリーム" は、Jasper の核となる機能です。 例えば、"eceltron/electron リポジトリの @zeke にアサインされた Issue" を見たい場合は、以下のようなストリームを作成します。

```
repo:electron/electron assignee:zeke is:issue
```

[![Jasper 起動画面 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

ストリームを作成して数秒待てば、条件を満たす Issue が表示されます。

[![Jasper 起動画面 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## ストリームではなにができますか?

ストリームにはどのような条件が使えるのかご紹介します。

### ユーザとチーム

| ストリーム                                         | 問題                                                     |
| --------------------------------------------- | ------------------------------------------------------ |
| `mentions:cat mentions:dog`                   | `cat` か `dog` のユーザをメンションした Issue                       |
| `author:cat author:dog`                       | `cat` か `dog` が作成した Issue                              |
| `assignee:cat assignee:dog`                   | `cat` か `dog` がアサインされた Issue                           |
| `commenter:cat commenter:dog`                 | `cat` か `dog` がコメントした Issue                            |
| `involves:cat involves:dog`                   | `cat` か `bob` が "関わりのある" Issue                         |
| `team:animal/white-cat team:animal/black-dog` | `animal/white-cat` か `animal/black-dog` をメンションした Issue |

`involves` というのは `mention`、`author`、`assignee`、`commenter` のいずれかであるということです。

### レポジトリと Organization

| ストリーム                            | 問題                                   |
| -------------------------------- | ------------------------------------ |
| `repo:cat/jump repo:dog/run`     | `cat/jump` か `dog/run` 内での Issue     |
| `org:electron user:cat user:dog` | `electron` か `cat` か `dog` 内での Issue |

`org` と `user` は同じです

### 属性

| ストリーム                                             | 問題                                               |
| ------------------------------------------------- | ------------------------------------------------ |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | `cat/jump` 内で `v1.0.0` か `v1.0.1` に割り当てられた Issue |
| `repo:cat/jump label:bug label:blocker`           | `cat/jump` 内で `bug` **と** `blocker` を割り当てた Issue |
| `electron OR atomshell`                           | `electron` か `atomshell` を含む Issue               |

### レビュー状況

| ストリーム                        | 問題                                                      |
| ---------------------------- | ------------------------------------------------------- |
| `is:pr review:required`      | `cat/jump` 内のレビューが必要な Issue                             |
| `is:pr review-requested:cat` | `cat` のレビューが必要な Issue。 <br/> まだレビューされていないものになります。 |
| `is:pr reviewed-by:cat`      | `cat` がレビューした Issue                                     |

<br/>

これらを見てお気づきかもしれませんが、ストリームには GitHub の検索クエリが使えます。 ストリームや検索クエリの使い方については、以下の URL を参照してください。

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper には、未読 Issue 管理、未読コメント管理、お気に入り、更新の通知、Issue のフィルタリング、キーボードショートカットなどの機能もあります。

## Jasper は有料製品ですか? おいくらですか?

Jasper は $12 です。 また、30 日間の [無料体験版](https://jasperapp.io/) もあります。

## Electron で Jasper を構築することにしたのはなぜですか?

Electron のこういったところが気に入っています。

- JavaScript/CSS/HTML でアプリを開発できる。
- Windows、Mac、Linux プラットフォーム向けに構築できる。
- Electron は活発に開発されており大きなコミュニティがある。

これらの特長により、迅速にシンプルなデスクトップアプリケーションが開発できます。 素晴らしいことです! あなたもプロダクトのアイデアがあれば、是非 Electron の利用を検討してみてください。

## Jasper 開発の際に直面した課題はありますか?

"ストリーム" の概念を考え出すところで苦労しました。 最初は GitHub の [Notifications API](https://developer.github.com/v3/activity/notifications/) を使おうと考えました。 しかし、特定のユースケースに対応していないと気づきました。 その後 Notification API に加えて、[Issues API](https://developer.github.com/v3/issues/) と [Pull Requests API](https://developer.github.com/v3/pulls/) の利用も検討しました。 それでも、望んでいたものにはなりませんでした。 そこで、いろいろな方法を考えていくうちに、GitHub の[Search API](https://developer.github.com/v3/search/) をポーリングするのが最も柔軟だと気づきました。 ここまでに約 1 ヶ月の実験期間を要しましたが、その後 2 日でストリームの概念を取り入れた Jasper のプロトタイプを実装しました。

注: ポーリングは最大で 10 秒に 1 回までとなっています。 GitHub API の制限からすれば余裕を持たせてあります。

## 今後の予定は何ですか?

今後は以下のような機能を開発予定です。

- **フィルタ付きストリーム**: ストリーム内の Issue をフィルタリングするような、フィルタを付けたストリームです。 SQL のビューのようなものです。
- **複数アカウント**: github.com と GHE の両方を利用できるようにします。
- **パフォーマンス改善**: 今のところ WebView での Issue 読み込みは通常のブラウザよりも遅くなっています。

更新情報は [@jasperappio](https://twitter.com/jasperappio) の Twitter を確認してください。

