# Test Etme

Electron'un kod kapsamını yüksek tutmayı hedefliyoruz. Bütün pull request'lerin var olan testleri geçmesini ve ideal olarak değişen kodu ve yeni senaryolarını da kapsaması için yeni testler eklemesini istiyoruz. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

Depo birim ve entegrasyon testlerinin yanı sıra JavaScript ve C++ için linting kuralları ile birlikte geliyor. Electron'un kodlama stili hakkında daha fazlasını öğrenmek için lütfen [coding-style(coding-style.md) dökümanına bakın.

## Linting

JavaScript'inizin Electron'un kodlama stili ile uyumlu olduğundan emin olmak için `npm run lint-js` komutunu çalıştırın. Komut Electron'a ve unit testlere karşı `standard`'ı çalıştıracaktır. Plugin/eklenti sistem içeren bir düzenleyici kullanıyorsanız, Commit'lemeden önce kodlama stili ihlallerinden haberdar olmak için [StandardJS eklentileri](standard-addons)nden birini kullanmak isteyebilirsiniz.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only a selected number of tests, run `npm run test -match=NAME`, replacing the `NAME` with the file name of the test suite you would like to run. As an example: If you want to run only IPC suites, you would run `npm run test -match=ipc`.