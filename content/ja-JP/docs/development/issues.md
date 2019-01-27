# Electron の Issue

# 問題

* [コントリビュートの仕方](#how-to-contribute-in-issues)
* [一般的なヘルプ](#asking-for-general-help)
* [バグレポートの送信](#submitting-a-bug-report)
* [バグレポートのトリアージュ](#triaging-a-bug-report)
* [バグレポートの解決](#resolving-a-bug-report)

## コントリビュートの仕方

問題に対してコントリビュートする方法が3つあります：

1. 議論のためにイシューをつくる: もしあなたがElectronの新たな不具合を見つけたと思ったら、`electron/electron`の課題トラッカーに新しいイシューをつくってそれを報告することを推奨します。
2. 問題の選別を手伝う: あなたは補助的な詳細 (不具合を再現することのできるテストケース) を提供したり、この問題に対処するための提案を行うことによって、問題の選別を手伝うことができます。
3. 問題の解決を手伝う: 問題はそれが不具合ではなかったり修正されていると示すことでも解決されますが、より多くは具体的かつレビュー可能な方法で`electron/electron`のソースコードに変更を加えるプルリクエストを送ることによって解決されます。

## 一般的なヘルプ

["Finding Support"](../tutorial/support.md#finding-support) にはプログラミングヘルプ、セキュリティ Issue の報告、貢献などのリソースのリストがあります。 Issue トラッカーはバグにのみ使用してください！

## バグレポートの送信

`electron/electron` Issue トラッカー内で新しい Issue を開くとき、ユーザには記入するべきテンプレートが表示されます。

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

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## バグレポートのトリアージュ

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## バグレポートの解決

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.