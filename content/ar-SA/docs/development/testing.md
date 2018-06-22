# اختبار

We aim to keep the code coverage of Electron high. We ask that all pull request not only pass all existing tests, but ideally also add new tests to cover changed code and new scenarios. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

This repository comes with linting rules for both JavaScript and C++ – as well as unit and integration tests. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## وحدة الإختبارات

لتشغيل جميع وحدات الاختبارات، نفذ `npm run test`. وحدات الإختبارات هي تطبيق إلكترون (مفاجأة!) يمكن العثور عليها بداخل مجلد `spec`. لاحظ أن لديها `package.json` الخاص بها، وبالتالي لا يتم تعريف التبعيات الخاصة بها في `package.json` الخاصة المستوى الأعلى.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.