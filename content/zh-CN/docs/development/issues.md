# Electron中的问题

* [Issue でコントリビュートする方法](#how-to-contribute-to-issues)
* [Https://crowdin.com/translate/electron/156/en-vi#12327](#asking-for-general-help)
* [提交漏洞报告](#submitting-a-bug-report)
* [鉴定漏洞报告](#triaging-a-bug-report)
* [解决漏洞报告](#resolving-a-bug-report)

## Issue でコントリビュートする方法

对于任何问题，个人可以通过三种方式贡献：

1. 通过打开问题进行讨论：如果您认为您在 Electron 中发现了 新错误，则应通过在 [`electron/electron` 问题跟踪器](https://github.com/electron/electron/issues)中创建新问题来报告它。
2. 通过帮助鉴定问题：您可以通过提供辅助信息（一种可以让漏洞被发现的情况）或提出解决问题的建议。
3. 通过帮助解决问题：这可以通过演示问题不是一个bug或已修复来完成；但更通常，打开一个通过一个具体和可审查的方式改变`electron/electron`中的源代码的拉取请求。

## Https://crowdin.com/translate/electron/156/en-vi#12327

["寻找支持"](../tutorial/support.md#finding-support) 拥有获取编程帮助、报告安全问题、 贡献等 资源列表。 请仅对漏洞使用问题追踪器！

## 提交漏洞报告

要提交错误报告：

当 [`electron/electron` 发行跟踪器](https://github.com/electron/electron/issues/new/choose)中打开新一期时， 用户将收到一个应该填写的模板。

如果你确信自己发现了Electron的bug，请尽可能详细的填写一份表单。

要评估报告需要的两个最重要的部分是漏洞的描述和重现它的简单测试样例。 如果可以复制，则更容易修复 错误。

参见 [如何创建一个最小的，完整的和可验证的例子](https://stackoverflow.com/help/mcve)。

## 鉴定漏洞报告

提出问题经常会出现讨论。 贡献者会有不同的观点，包括提出的情况是一个漏洞还是一个功能。 这些讨论是解决问题的一部分，并且应该保持专注、有用、专业。

没有任何内容和详细信息的简单回复是无用的而且不专业的。 在很多情况下，这些恢复是烦人而且不友好的。

我们鼓励贡献者共同解决问题并互相帮助取得进展。 如果您遇到您认为无效的问题，或包含不正确信息 ，请解释 *为什么* 您在附加支持上下文 有这种感觉，并愿意确信您可能 是错误的。 通过这样做，我们可以更快地得到正确的结果。

## 解决漏洞报告

大部分的问题是通过打开拉取请求解决的。 开放和 审查拉动请求的过程类似于打开和会审问题的过程，但 随之进行必要的审查和批准工作流程，以确保 提议的更改符合 电子项目最低质量和功能准则。
