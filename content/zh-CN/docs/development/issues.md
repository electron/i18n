# Issues In Electron

# 问题

* [如何贡献一个Issue](#how-to-contribute-in-issues)
* [请求一般性的帮助](#asking-for-general-help)
* [提交漏洞报告](#submitting-a-bug-report)
* [Triaging a Bug Report](#triaging-a-bug-report)
* [解决 Bug 报告](#resolving-a-bug-report)

## 如何贡献一个Issue

For any issue, there are fundamentally three ways an individual can contribute:

1. 通过新建（提出）问题进行讨论：如果您认为您在Electron中发现问题，您应该在`electron/electron`问题跟踪器中通过创建问题来提出。
2. By helping to triage the issue: You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue.
3. By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `electron/electron` in a concrete and reviewable manner.

## 请求一般的帮助

Because the level of activity in the `electron/electron` repository is so high, questions or requests for general help using Electron should be directed at the [community slack channel](https://atomio.slack.com) or the [forum](https://discuss.atom.io/c/electron).

## 提交漏洞报告

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

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

如果你发现了Electron中的漏洞，请以你的能力填这份表单。

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Triaging a Bug Report

提出问题经常会出现讨论。 贡献者会有不同的观点，包括提出的情况是一个漏洞还是一个功能。 This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## 解决 Bug 报告

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.