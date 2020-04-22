# Test Etme

Electron'un kod kapsamını yüksek tutmayı hedefliyoruz. Bütün pull request'lerin var olan testleri geçmesini ve ideal olarak değişen kodu ve yeni senaryolarını da kapsaması için yeni testler eklemesini istiyoruz. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

Depo birim ve entegrasyon testlerinin yanı sıra JavaScript ve C++ için linting kuralları ile birlikte geliyor. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting

JavaScript'inizin Electron'un kodlama stili ile uyumlu olduğundan emin olmak için `npm run lint-js` komutunu çalıştırın. Komut Electron'a ve unit testlere karşı `standard`'ı çalıştıracaktır. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

`standard`'ı parametrelerle çalıştırmak için,`standard`'a geçirdiğiniz parametrelere takiben `npm run lint-js --` komutunu çalıştırın.

C++ kodunuzun Electron kodlama stiliyle uyumlu olduğundan emin olmak için `cpplint` komut dizisini çalıştıracak olan `npm run lint-cpp` komutunu çalıştırın. `clang-format` kullanmanızı ve [kısa bir tutorial](clang-format.md) hazırlamanızı tavsiye ediyoruz.

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

Bütün birim testlerini koşmak için, `npm run test` komutunu çalıştırın. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices

#### Extra steps to run the unit test:

1. Visual Studio 2019 must be installed.
2. Node headers have to be compiled for your configuration.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. The electron.lib has to be copied as node.lib.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Missing fonts

[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:
1. Push the Windows key and search for _Manage optional features_.
2. Click _Add a feature_.
3. Select _Japanese Supplemental Fonts_ and click _Install_.

#### Pixel measurements

Some tests which rely on precise pixel measurements may not work correctly on devices with Hi-DPI screen settings due to floating point precision errors. To run these tests correctly, make sure the device is set to 100% scaling.

To configure display scaling:
1. Push the Windows key and search for _Display settings_.
2. Under _Scale and layout_, make sure that the device is set to 100%.
