# Electron 議題管理

# 議題管理

* [如何對議題做出貢獻](#how-to-contribute-in-issues)
* [尋求一般協助](#asking-for-general-help)
* [提交 Bug 報告](#submitting-a-bug-report)
* [分級 Bug 報告](#triaging-a-bug-report)
* [解決 Bug 報告](#resolving-a-bug-report)

## 如何對議題做出貢獻

對任何議題來說，個人可以貢獻的方式基本上有三種:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the `electron/electron` issue tracker.
2. By helping to triage the issue: You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue.
3. By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `electron/electron` in a concrete and reviewable manner.

## 尋求一般協助

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## 提交 Bug 報告

When opening a new issue in the `electron/electron` issue tracker, users will be presented with a template that should be filled in.

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

如果你提供了 URL，請列出複製、設定、執行你的儲存庫的必要指令，例如:

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## 分級 Bug 報告

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## 解決 Bug 報告

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.