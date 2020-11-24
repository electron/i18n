# Использование модулей узлов

Electron поддерживает нативные модули Node, но поскольку Electron скорее всего будет использовать версию движка V8, отличную от версии Node установленной в вашей системе, модули необходимо будет перекомпилировать для Electron. Иначе, при запуске приложения вы получите следующий класс ошибок:

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

Вы можете установить модули, как и другие проекты с узлами, а затем перестроить модули для Electron с помощью пакета [`electron-rebuild`](https://github.com/electron/electron-rebuild). Этот модуль может автоматически определить версию Electron и выполнить ручные шаги загрузки заголовков и пересборки родных модулей для вашего приложения.

Например, чтобы установить `electron-rebuild` и затем перестроить модули с ним через командную строку:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

Для получения дополнительной информации об использовании и интеграции с другими инструментами, обратитесь к README проекта .

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

### Manually building for Electron

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` меняет место нахождения заголовков разработчика.
* `--target=1.2.3` является версией Electron.
* `--dist-url=...` указывает, где загружать заголовки.
* `--arch=x64` говорит, что модуль собран для 64-битной системы.

### Manually building for a custom build of Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Устранение проблем

Если вы установили родной модуль и обнаружили, что он не работает, вам нужно проверить следующие вещи:

* When in doubt, run `electron-rebuild` first.
* Убедитесь, что родной модуль совместим с целевой платформой и архитектурой для вашего приложения Electron.
* Убедитесь, что `win_delay_load_hook` не установлен на `false` в модуле `binding.gyp`.
* After you upgrade Electron, you usually need to rebuild the modules.

### A note about `win_delay_load_hook`

По умолчанию в Windows `node-gyp` ссылается на родные модули с `node.dll`. Однако, в Electron 4.x и выше символы, необходимые для использования родными модулями, экспортируются с помощью `электрона. xe`, и нет `узла.dll`. Чтобы загрузить родные модули в Windows, `node-gyp` устанавливает [задержка хук](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) , который запускает при загрузке родного модуля, и перенаправляет узел `. ll` со ссылкой на использование исполняемый файл загрузки вместо поиска узла `. ll` в поиске библиотеки путь (ничего не получится). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook.  Если модуль собран с помощью узла , убедитесь в том, что переменная `win_delay_load_hook` имеет значение `true` в связывании `. yp` файл, и нигде не переопределен.  Если модуль построен с другой системой, вам нужно убедиться, что вы строили с помощью хука с задержкой загрузки в главном `. ode` файл. Ваш `link.exe` вызов должен выглядеть следующим образом:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

В частности, важно, что:

* вы связываетесь с `node.lib` из _Electron_ , а не с узлом. Если вы ссылаетесь на неправильный `node.lib` вы получите ошибки при загрузке модуля в Electron.
* вы включаете флаг `/DELAYLOAD:node.exe`. Если узел `. xe` ссылка не задержка, , то хук задержки не даст шанс выстрелить, а символы узла не будут решены правильно.
* `win_delay_load_hook.obj` напрямую привязан к финалу DLL. Если крюк установлен в зависимом DLL, он не будет стрелять в нужное время.

Смотрите [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) для примера хука задержки загрузки, если вы реализуете свой собственный.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) предоставляет возможность публиковать родные модули узлов с предварительно собранными двоичными файлами для нескольких версий узла и Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Обычно эти модули работают нормально под Electron, но иногда когда Electron использует более новую версию V8, чем узел и/или произошли изменения в ABI, плохие вещи могут произойти. Итак, в общем, рекомендуется всегда строить родные модули из исходного кода. `Электрон-пересборка` обрабатывает это для вас автоматически.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
