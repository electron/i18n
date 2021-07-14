# Tester le CDM Widevine

Dans Electron, vous pouvez utiliser le plugin Widevine CDM livré avec le navigateur Chrome.

Widevine Content Decryption Modules (CDMs) are how streaming services protect content using HTML5 video to web browsers without relying on an NPAPI plugin like Flash or Silverlight. Widevine support is an alternative solution for streaming services that currently rely on Silverlight for playback of DRM-protected video content. It will allow websites to show DRM-protected video content in Firefox without the use of NPAPI plugins. The Widevine CDM runs in an open-source CDM sandbox providing better user security than NPAPI plugins.

#### Note on VMP

As of [`Electron v1.8.0 (Chrome v59)`](https://electronjs.org/releases#1.8.1), the below steps are may only be some of the necessary steps to enable Widevine; any app on or after that version intending to use the Widevine CDM may need to be signed using a license obtained from [Widevine](https://www.widevine.com/) itself.

Per [Widevine](https://www.widevine.com/):

> Chrome 59 (and later) includes support for Verified Media Path (VMP). VMP provides a method to verify the authenticity of a device platform. For browser deployments, this will provide an additional signal to determine if a browser-based implementation is reliable and secure.
> 
> The proxy integration guide has been updated with information about VMP and how to issue licenses.
> 
> Widevine recommends our browser-based integrations (vendors and browser-based applications) add support for VMP.

Pour activer la lecture vidéo avec cette nouvelle restriction, [castLabs](https://castlabs.com/open-source/downstream/) a créé un [fork](https://github.com/castlabs/electron-releases) qui a implémenté les modifications nécessaires pour permettre la lecture de Widevine dans une application Electron si on a obtenu les licences nécessaires de widevine.

## Getting the library

Open `chrome://components/` in Chrome browser, find `Widevine Content Decryption Module` and make sure it is up to date, then you can find the library files from the application directory.

### Sur Windows 

Le fichier de bibliothèque `widevinecdm.dll` sera sous `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` dossier

### Sur macOS 

Le fichier de bibliothèque `libwidevinecdm.dylib` sera sous `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` dossier

**Remarque:**Assurez-vous que la version chromée utilisée par Electron est supérieure ou égale à la valeur `min_chrome_version` du composant CDM Widevine de Chrome. The value can be found in `manifest.json` under `WidevineCdm` directory.

## Using the library

After getting the library files, you should pass the path to the file with `--widevine-cdm-path` command line switch, and the library's version with `--widevine-cdm-version` switch. The command line switches have to be passed before the `ready` event of `app` module gets emitted.

Exemple de code :

```javascript
const { app, BrowserWindow } = require('electron')

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// The version of plugin can be got from `chrome://components` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Vérification de la prise en charge de Widevine CDM

Pour vérifier si Widevine fonctionne, vous pouvez utiliser les méthodes suivantes:

* Ouvrez https://shaka-player-demo.appspot.com/ et charger un manifeste qui utilise `Widevine`.
* Ouvrez http://www.dash-player.com/demo/drm-test-area/, vérifier que la page indique `bitdash uses Widevine in your browser`, puis lancez la vidéo.
