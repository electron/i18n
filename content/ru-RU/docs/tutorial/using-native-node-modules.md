# Использование модулей узлов

Модули родного узла.js поддерживаются Electron, но так как Electron имеет другой двоичный интерфейс приложения [(ABI)][abi] от данного узла.js двоичный (из-за различий , таких как использование Chromium BoringSSL вместо OpenSSL), родные модули , которые вы используете, должны быть перекомпилированы для Electron. Иначе, при запуске приложения вы получите следующий класс ошибок:

```sh
Ошибка: Модуль '/path/to/native/module.node'
был скомпилирован с другой версией Node.js, используя
NODE_MODULE_VERSION $XYZ. Эта версия Node.js требует
NODE_MODULE_VERSION $ABC. Попробуйте перекомпилировать или переустановить модуль
(например, `npm rebuild` или `npm install`).
```

## Как установить нативные модули

Существует несколько способов установки нативных модулей:

### Installing modules and rebuilding for Electron

Вы можете установить модули, как и другие проекты узла, а затем восстановить модули для Electron с [`electron-rebuild`][electron-rebuild] пакетом. Этот модуль может автоматически определить версию Electron и выполнить ручные шаги загрузки заголовков и пересборки родных модулей для вашего приложения. Если вы используете [Electron Forge][electron-forge], этот инструмент используется автоматически как в режиме разработки, так и при распространении.

Например, установить автономный инструмент `electron-rebuild` а затем восстановить с ним через командную строку:

```sh
npm установить --сохранить-dev электрон-восстановить

- Каждый раз, когда вы запустите "npm установить", запустить это:
./node_modules/.bin/electron-rebuild

- Если у вас есть проблемы на Windows, попробуйте:
.\node_modules .bin электрон-rebuild.cmd
```

Для получения дополнительной информации об использовании и интеграции с другими инструментами, [Electron Packager][electron-packager], проконсультируйтесь с README проекта.

### При помощи `npm`

Устанавливая несколько переменных среды, вы можете использовать `npm` для непосредственной установки модулей.

Например, для установки всех зависимостей для Electron:

```sh
# Electron's version.
экспорт npm_config_target=1.2.3
# Архитектура Electron, см. https://electronjs.org/docs/tutorial/support#supported-platforms
# для поддерживаемых архитектур.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://electronjs.org/headers
# Говорит node-pre-gyp, что мы собираем для Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Построение для Electron вручную

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` меняет место нахождения заголовков разработчика.
* `--target=1.2.3` является версией Electron.
* `--dist-url=...` указывает, где загружать заголовки.
* `--arch=x64` говорит, что модуль собран для 64-битной системы.

### Создание пользовательской версии Electron вручную

Чтобы составить модули родного узла против пользовательской сборки Electron, которая не соответствует публичному выпуску, поручите `npm` использовать версию узла, которую вы в комплекте с пользовательской сборкой.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Устранение проблем

Если вы установили родной модуль и обнаружили, что он не работает, вам нужно проверить следующие вещи:

* When in doubt, run `electron-rebuild` first.
* Убедитесь, что родной модуль совместим с целевой платформой и архитектурой для вашего приложения Electron.
* Убедитесь, что `win_delay_load_hook` не установлен на `false` в модуле `binding.gyp`.
* After you upgrade Electron, you usually need to rebuild the modules.

### Примечание о `win_delay_load_hook`

По умолчанию в Windows `node-gyp` ссылается на родные модули с `node.dll`. Однако, в Electron 4.x и выше символы, необходимые для использования родными модулями, экспортируются с помощью `электрона. xe`, и нет `узла.dll`. Чтобы загрузить родные модули в Windows, `node-gyp` устанавливает [задержка хук](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) , который запускает при загрузке родного модуля, и перенаправляет узел `. ll` со ссылкой на использование исполняемый файл загрузки вместо поиска узла `. ll` в поиске библиотеки путь (ничего не получится). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

Если вы получаете ошибку, как `Module did not self-register`, или `Указанная процедура
не может быть найдена`, это может означать, что модуль, который вы пытаетесь использовать не правильно включить задержку нагрузки крючок.  Если модуль собран с помощью узла , убедитесь в том, что переменная `win_delay_load_hook` имеет значение `true` в связывании `. yp` файл, и нигде не переопределен.  Если модуль построен с другой системой, вам нужно убедиться, что вы строили с помощью хука с задержкой загрузки в главном `. ode` файл. Ваш `link.exe` вызов должен выглядеть следующим образом:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

В частности, важно, что:

* вы связываетесь с `node.lib` из _Electron_ , а не с узлом. Если вы ссылаетесь на неправильный `node.lib` вы получите ошибки при загрузке модуля в Electron.
* вы включаете флаг `/DELAYLOAD:node.exe`. Если узел `. xe` ссылка не задержка, , то хук задержки не даст шанс выстрелить, а символы узла не будут решены правильно.
* `win_delay_load_hook.obj` напрямую привязан к финалу DLL. Если крюк установлен в зависимом DLL, он не будет стрелять в нужное время.

Смотрите [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) для примера хука задержки загрузки, если вы реализуете свой собственный.

## Модули, полагающиеся на `перед сборкой`

[`prebuild`](https://github.com/prebuild/prebuild) предоставляет возможность публиковать родные модули узлов с предварительно собранными двоичными файлами для нескольких версий узла и Electron.

Если модуль `prebuild`обеспечивает двоичные файлы для использования в Electron, убедитесь, что опустить `--build-from-source` и `npm_config_build_from_source` окружающей среды переменной, с тем чтобы в полной мере воспользоваться заранее встроенных двоичных файлов.

## Модули, полагающиеся на `узлов пред-гипс`

The [`node-pre-gyp` tool][node-pre-gyp] provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Иногда эти модули прекрасно работают под Electron, но когда нет electron-специфических дьят, вам нужно построить из источника. В связи с этим рекомендуется использовать `electron-rebuild` этих модулей.

Если вы следуете `npm` способу установки модулей, вам нужно будет пройти `--build-from-source` `npm`, или установить `npm_config_build_from_source` среду переменной.

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
