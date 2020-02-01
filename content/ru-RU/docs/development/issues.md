# Задачи в Electron

* [Как внести свой вклад в проблемы](#how-to-contribute-to-issues)
* [Просьба об общей помощи](#asking-for-general-help)
* [Отправить отчет об ошибке](#submitting-a-bug-report)
* [Прохождение сообщения об ошибке](#triaging-a-bug-report)
* [Разрешение отчета об ошибке](#resolving-a-bug-report)

## Как внести свой вклад в проблемы

Для любого вопроса есть три основных способа, которыми человек может сделать вклад:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Помогите воспроизвести проблему: Вы можете сделать это либо предоставив вспомогательную информацию (воспроизводимый тестовый случай, который демонстрирует ошибку), либо предложив решить проблему.
3. Помогая решить проблему: это можно сделать, продемонстрировав что проблема не является ошибкой или исправлена; но чаще, открыв запрос на слияние, который изменяет исходник в `electron/electron` в конкретный и рецензируемый способ.

## Просьба об общей помощи

["Finding Support"](../tutorial/support.md#finding-support) имеет список ресурсов для получения помощи по программированию, сообщения о проблемах безопасности, и многое другое. Пожалуйста, используйте трекер ошибок только для ошибок!

## Отправить отчет об ошибке

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

```markdown
<!--
Спасибо за открытие проблемы! Имейте в виду:

- Трекер отслеживания ошибок предназначен только для ошибок и запросов функций.
- Прежде чем сообщать об ошибке, попробуйте повторить вашу проблему на
  последней версии Electron.
- Если вам нужен общий совет, присоединяйтесь к нашему Slack: http://atom-slack.herokuapp.сom
-->

* Версия Electron:
* Операционная система:

### Ожидаемое поведение

<! - Как вы думаете, что должно произойти? -->

### Фактическое поведение

<!-- Что на самом деле происходит? -->

### Как воспроизвести

<! -

Ваш лучший шанс быстро увидеть эту ошибку - это клонировать РЕПОЗИТОРИЙ и запустить.

Вы можете сделать форк https://github.com/electron/electron-quick-start и включить ссылку на ветку с вашими изменениями.

Если вы указали URL, пожалуйста, перечислите команды, необходимые для клонирования/настройки/запуска вашего репозитория и т.д.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Прохождение сообщения об ошибке

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Разрешение отчета об ошибке

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.