# Testarea Widevine CDM

În Electron poți folosi biblioteca Widevine CDM expediată cu browserul Chrom.

Modulele de decriptare a conținutului Widevine (CDMs) sunt modul în care serviciile de streaming protejează conținutul folosind HTML5 video în browsere web fără a se baza pe un plugin NPAPI cum ar fi Flash sau Silverlight. Suportul larg este o soluție alternativă pentru serviciile de streaming care se bazează în prezent pe Silverlight pentru redarea conținutului video protejat prin DRM. Acesta va permite site-urilor web să afișeze conținut video protejat prin DRM în Firefox fără utilizarea plugin-urilor NPAPI. Widevine CDM rulează într-un sandbox open-source CDM care oferă o securitate mai bună utilizatorilor decât plugin-urile NPAPI.

#### Notă pe VMP

Începând cu [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), pașii de mai jos pot fi doar câțiva dintre pașii necesari pentru a permite pe scară largă; orice aplicație pe sau după acea versiune care intenționează să folosească Widevine CDM poate avea nevoie să fie semnată folosind o licență obținută de la [Widevine](https://www.widevine.com/) în sine.

Pe [Widevin](https://www.widevine.com/):

> Chrome 59 (și ulterior) include suport pentru verificarea traiectoriei media (VMP). VMP oferă o metodă de verificare a autenticității platformei dispozitivului. Pentru implementările browser-ului, acesta va oferi un semnal suplimentar pentru a determina dacă o implementare bazată pe browser este fiabilă și sigură.
> 
> Ghidul de integrare proxy a fost actualizat cu informații despre VMP și cum să eliberați licențe.
> 
> Widevine recomandă integrările noastre bazate pe browser (vendori și aplicații bazate pe browser) adaugă suport pentru VMP.

Pentru a activa redarea video cu această nouă restricție, [castLabs](https://castlabs.com/open-source/downstream/) a creat [fork](https://github.com/castlabs/electron-releases) care a implementat modificările necesare pentru a permite aplicației Widevine să fie redată într-o aplicație Electron dacă una a obținut licențele necesare de la widevine.

## Obţinerea bibliotecii

Open `chrome://components/` in Chrome browser, find `Widevine Content Decryption Module` and make sure it is up to date, then you can find the library files from the application directory.

### Pe Windows

Fișierul bibliotecii `widevinecdm.dll` va fi sub `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific_win_(x86<unk> x64)/` director.

### On MacOS

Fișierul librăriei `libwidevinecdm.dylib` va fi sub `/Aplicații/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86<unk> x64)/` director.

**Notă:** Asigurați-vă că versiunea chrome folosită de Electron este mai mare sau egală cu valoarea `min_chrome_version` a componentei widevine cdm a lui Chrom. Valoarea poate fi găsită în directorul `manifest.json` sub `WidevineCdm`.

## Utilizarea bibliotecii

După ce obții biblioteca, ar trebui să treci calea către fișierul cu `--widevine-cdm-path` comandă comutator linie, şi comutatorul</code> al bibliotecii cu `--widevine-cdm-versiune. Comutatoarele liniei de comandă trebuie să fie
trecute înainte ca <code>evenimentul` gata `al modulului` să fie emis.

Exemplu de cod:

```javascript
const { app, BrowserWindow } = require('electron')

// Trebuie să pasezi directorul care conține biblioteca widevine aici, este
// * `libwidevinecdm. ylib` pe macOS,
// * `widevinecdm.dll` pe Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Versiunea plugin-ului poate fi obținută de la pagina `chrome://components` din Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Verificare suport Widevine CDM

Pentru a verifica dacă widevine funcţional, puteţi utiliza următoarele moduri:

* Deschide https://shaka-player-demo.appspot.com/ și încarcă un manifest care folosește `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.
