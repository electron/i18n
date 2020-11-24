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

## Https://crowdin.com/translate/electron/156/en-vi#12327

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. 请仅对漏洞使用问题追踪器！

## 提交漏洞报告

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with [a template](https://github.com/electron/electron/blob/master/.github/ISSUE_TEMPLATE/Bug_report.md) that should be filled in.

如果你确信自己发现了Electron的bug，请尽可能详细的填写一份表单。

要评估报告需要的两个最重要的部分是漏洞的描述和重现它的简单测试样例。 It is easier to fix a bug if it can be reproduced.

参见 [如何创建一个最小的，完整的和可验证的例子](https://stackoverflow.com/help/mcve)。

## 鉴定漏洞报告

提出问题经常会出现讨论。 贡献者会有不同的观点，包括提出的情况是一个漏洞还是一个功能。 这些讨论是解决问题的一部分，并且应该保持专注、有用、专业。

没有任何内容和详细信息的简单回复是无用的而且不专业的。 在很多情况下，这些恢复是烦人而且不友好的。

我们鼓励贡献者共同解决问题并互相帮助取得进展。 If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. 通过这样做，我们可以更快地得到正确的结果。

## 解决漏洞报告

大部分的问题是通过打开拉取请求解决的。 The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.
