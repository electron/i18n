# Electron中的问题

# 问题

* [如何贡献一个Issue](#how-to-contribute-in-issues)
* [请求一般的帮助](#asking-for-general-help)
* [提交漏洞报告](#submitting-a-bug-report)
* [鉴定漏洞报告](#triaging-a-bug-report)
* [解决漏洞报告](#resolving-a-bug-report)

## 如何贡献一个Issue

对于任何问题，个人可以通过三种方式贡献：

1. 通过新建（提出）问题进行讨论：如果您认为您在Electron中发现问题，您应该在`electron/electron`问题跟踪器中通过创建问题来提出。
2. 通过帮助鉴定问题：您可以通过提供辅助信息（一种可以让漏洞被发现的情况）或提出解决问题的建议。
3. By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `electron/electron` in a concrete and reviewable manner.

## 请求一般性的帮助

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## 提交漏洞报告

当您在`Electron`中提出问题，您需要完成一个模板。

```markdown
<!--
谢谢您提出问题！ 请记住以下几点：

- 问题跟踪器只能用于漏洞和功能的提出。
- 在提出问题之前，请尝试使用最新版本的Electron让您提出的问题重现。
如果您需要一般的问题，请参与我们的Slack: http://atom-slack.herokuapp.com
-->

* Electron版本: 
* 操作系统: 

### 你希望得到的结果

<!-- 你觉得应该发生什么？ -->

### 实际结果

<!-- 实际发生了什么？ -->

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

如果你发现了Electron中的漏洞，请以你的能力填这份表单。

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## 鉴定漏洞报告

提出问题经常会出现讨论。 贡献者会有不同的观点，包括提出的情况是一个漏洞还是一个功能。 这些讨论是解决问题的一部分，并且应该保持专注、有用、专业。

没有任何内容和详细信息的简单回复是无用的而且不专业的。 在很多情况下，这些恢复是烦人而且不友好的。

我们鼓励贡献者共同解决问题并互相帮助取得进展。 如果您遇到觉得包含无效或不正确信息的问题，请使用更多详细信息指出您*为什么*觉得此问题含有无效或不正确信息，并愿意接受您可能是错误的。 通过这样做，我们可以更快地得到正确的结果。

## 解决漏洞报告

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.