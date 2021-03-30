# Electron の Issue

* [Issue でコントリビュートする方法](#how-to-contribute-to-issues)
* [一般的なヘルプ](#asking-for-general-help)
* [バグレポートの送信](#submitting-a-bug-report)
* [バグレポートのトリアージュ](#triaging-a-bug-report)
* [バグレポートの解決](#resolving-a-bug-report)

## Issue でコントリビュートする方法

問題に対してコントリビュートする方法が3つあります：

1. 議論のための issue を開く: 新たな Electron の不具合を見つけたと思ったら、[`electron/electron`の issue トラッカー](https://github.com/electron/electron/issues) に新しい issue を作って報告することを推奨します。
2. 問題の選別を手伝う: あなたは補助的な詳細 (不具合を再現することのできるテストケース) を提供したり、この問題に対処するための提案を行うことによって、問題の選別を手伝うことができます。
3. 問題の解決を手伝う: 問題はそれが不具合ではなかったり修正されていると示すことでも解決されますが、より多くは具体的かつレビュー可能な方法で`electron/electron`のソースコードに変更を加えるプルリクエストを送ることによって解決されます。

## 一般的なヘルプ

["Finding Support"](../tutorial/support.md#finding-support) にはプログラミングヘルプ、セキュリティ Issue の報告、貢献などのリソースのリストがあります。 Issue トラッカーはバグにのみ使用してください！

## バグレポートの送信

バグレポートを送信するには:

[`electron/electron` Issue トラッカー](https://github.com/electron/electron/issues/new/choose) 内で新しい Issue を開くとき、ユーザには記入するべきテンプレートが表示されます。

```markdown
<!--
Thanks for opening an issue! A few things to keep in mind:

- The issue tracker is only for bugs and feature requests.
- Before reporting a bug, please try reproducing your issue against
  the latest version of Electron.
- If you need general advice, join our Slack: http://atom-slack.herokuapp.com
-->

* Electron version:
* Operating system:

### Expected behavior

<!-- What do you think should happen? -->

### Actual behavior

<!-- What actually happens? -->

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

Electron にバグが見つかったと思われる場合は、できる限りこのフォームを埋めてください。

レポートを評価するために必要な、2つの最も重要な情報は、バグの説明とそれを再現するための簡単なテストケースです。 再現できる場合は、バグを修正することがより簡単になります。

[簡潔、完璧、検証可能な例の作り方](https://stackoverflow.com/help/mcve) を参照してください。

## バグレポートのトリアージュ

未解決の Issue には議論が伴うのが一般的です。 コントリビュータらは、その振る舞いがバグか機能かなどで意見が異なるでしょう。 この議論はプロセスの一部であり、集中し、有用で、専門的になるべきです。

補足の文脈も裏付けとなる詳細も示さない簡潔な回答は、役に立たず専門的ではありません。 多くの人にとって、そのようなレスポンスは面倒で不親切です。

コントリビュータは、問題を共同で解決し互いに進歩するのを手助けすることが奨励されます。 無効、または誤った情報が含まれていると思われる Issue に遭遇した場合は、その *理由* をあなたが間違っている可能性も考えて説明してください。 そうすることで、大抵の場合正しい結論に早く到達することができます。

## バグレポートの解決

ほとんどの Issue はプルリクエストを開くことで解決されます。 プルリクエストを開いてレビューするプロセスは、問題をオープンして優先順位付けするプロセスと似ています。しかし、提案された変更が Electron プロジェクトの最低限の品質と機能のガイドラインを満たすことを確実にするために必要な、レビューと承認のワークフローを伴います。
