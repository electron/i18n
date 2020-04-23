# Test Etme

Electron'un kod kapsamını yüksek tutmayı hedefliyoruz. Bütün pull request'lerin var olan testleri geçmesini ve ideal olarak değişen kodu ve yeni senaryolarını da kapsaması için yeni testler eklemesini istiyoruz. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

Depo birim ve entegrasyon testlerinin yanı sıra JavaScript ve C++ için linting kuralları ile birlikte geliyor. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting
JavaScript'inizin Electron'un kodlama stili ile uyumlu olduğundan emin olmak için `npm run lint-js` komutunu çalıştırın. Komut Electron'a ve unit testlere karşı `standard`'ı çalıştıracaktır. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

`standard`'ı parametrelerle çalıştırmak için,`standard`'a geçirdiğiniz parametrelere takiben `npm run lint-js --` komutunu çalıştırın.

C++ kodunuzun Electron kodlama stiliyle uyumlu olduğundan emin olmak için `cpplint` komut dizisini çalıştıracak olan `npm run lint-cpp` komutunu çalıştırın. `clang-format` kullanmanızı ve [kısa bir tutorial](clang-format.md) hazırlamanızı tavsiye ediyoruz.

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

Bütün birim testlerini koşmak için, `npm run test` komutunu çalıştırın. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.
