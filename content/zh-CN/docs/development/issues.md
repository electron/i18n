# Electron中的问题

* [Issue でコントリビュートする方法](#how-to-contribute-to-issues)
* [Https://crowdin.com/translate/electron/156/en-vi#12327](#asking-for-general-help)
* [提交漏洞报告](#submitting-a-bug-report)
* [鉴定漏洞报告](#triaging-a-bug-report)
* [解决漏洞报告](#resolving-a-bug-report)

## Issue でコントリビュートする方法

对于任何问题，个人可以通过三种方式贡献：

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. 通过帮助鉴定问题：您可以通过提供辅助信息（一种可以让漏洞被发现的情况）或提出解决问题的建议。
3. 通过帮助解决问题：这可以通过演示问题不是一个bug或已修复来完成；但更通常，打开一个通过一个具体和可审查的方式改变`electron/electron`中的源代码的拉取请求。

## 请求一般性的帮助

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. 请仅对漏洞使用问题追踪器！

## 提交漏洞报告

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

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

你可以克隆 https://github.com/electron/electron-quick-start 并包含一个到含有你更改的分支的链接。

如果您提供了一个URL，请列出克隆/设置/运行您的仓库所需要的命令，例如

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## 鉴定漏洞报告

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## 解决漏洞报告

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.