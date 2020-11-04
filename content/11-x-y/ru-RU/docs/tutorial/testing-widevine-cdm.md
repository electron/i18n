# Тестирование Widevine CDM

В Electron можно использовать библиотеку CDM Widevine, поставляемую через браузер Chrome.

Widevine Content Decryption Modules (CDMs) are how streaming services protect content using HTML5 video to web browsers without relying on an NPAPI plugin like Flash or Silverlight. Широкая поддержка - это альтернативное решение для сервисов потокового вещания, которые в настоящее время полагаются на Silverlight для воспроизведения защищённого DRM-видео контента. Это позволит веб-сайтам отображать содержимое защищённого DRM-видео в Firefox без использования NPAPI плагинов. The Widevine CDM runs in an open-source CDM sandbox providing better user security than NPAPI plugins.

#### Note on VMP

Начиная с [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), нижеследующие шаги могут быть только некоторыми из необходимых шагов для включения Widevine; Любое приложение на этой версии или после нее, предназначенное для использования МЧР Widevine, может потребоваться подписать с использованием лицензии, полученной в [Widevine](https://www.widevine.com/)сам .

За [Широкая](https://www.widevine.com/):

> Chrome 59 (и выше) включает в себя поддержку Verified Media Path (VMP). VMP предоставляет метод проверки подлинности платформы устройства. For browser deployments, this will provide an additional signal to determine if a browser-based implementation is reliable and secure.
> 
> Руководство по интеграции прокси было обновлено с информацией о VMP и способах выдачи лицензий.
> 
> Widevine recommends our browser-based integrations (vendors and browser-based applications) add support for VMP.

Чтобы включить воспроизведение видео с этим новым ограничением, [castLabs](https://castlabs.com/open-source/downstream/) создал [](https://github.com/castlabs/electron-releases) , который реализовал необходимые изменения, чтобы включить игру Widevine в приложении Electron, если один получил необходимые лицензии от широкого распространения.

## Getting the library

Открыть `chrome://components/` в браузере Chrome, найдите `модуль расшифровки содержимого Widevine` и убедитесь, что он обновлен, , то вы можете найти файлы библиотеки из каталога приложения .

### На Windows

The library file `widevinecdm.dll` will be under `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` directory.

### На macOS

The library file `libwidevinecdm.dylib` will be under `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` directory.

**Note:** Make sure that chrome version used by Electron is greater than or equal to the `min_chrome_version` value of Chrome's widevine cdm component. Значение может быть найдено в `manifest.json` в каталоге `WidevineCdm`.

## Using the library

После получения файлов библиотеки, вы должны передать путь к файлу с помощью командной строки `--widevine-cdm-path` , и библиотека с помощью переключателя `--widevine-cdm-version`. The command line switches have to be passed before the `ready` event of `app` module gets emitted.

Example code:

```javascript
const { app, BrowserWindow } = require('electron')

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Версия плагина может быть получена на странице `chrome://components` в Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Проверка поддержки CDM Widevine

To verify whether widevine works, you can use following ways:

* Откройте https://shaka-player-demo.appspot.com/ и загрузите манифест, который использует `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.
