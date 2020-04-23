# Тестування

We aim to keep the code coverage of Electron high. We ask that all pull request not only pass all existing tests, but ideally also add new tests to cover changed code and new scenarios. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

This repository comes with linting rules for both JavaScript and C++ – as well as unit and integration tests. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices

#### Додаткові кроки для запуску юніттестів:

1. Visual Studio 2019 повинна бути встановлена.
2. Заголовки вузла необхідно скомпонувати під вашу конфігурацію.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. Electron.lib повинен бути скопійований як node.lib.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Відсутні шрифти

[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:
1. Натисніть кнопку Windows і знайдіть _Керування додатковими функціями_.
2. Натисніть _Додати функцію_.
3. Оберіть _Японські додаткові шрифти_ та натисніть _Встановити_.

#### Pixel measurements

Some tests which rely on precise pixel measurements may not work correctly on devices with Hi-DPI screen settings due to floating point precision errors. To run these tests correctly, make sure the device is set to 100% scaling.

To configure display scaling:
1. Натисніть кнопку Windows і знайдіть _Налаштування монітору_.
2. Under _Scale and layout_, make sure that the device is set to 100%.
