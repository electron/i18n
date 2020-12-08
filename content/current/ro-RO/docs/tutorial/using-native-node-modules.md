# Utilizarea modulelor Native Node

Native Node.js modules are supported by Electron, but since Electron has a different [application binary interface (ABI)](https://en.wikipedia.org/wiki/Application_binary_interface) from a given Node.js binary (due to differences such as using Chromium's BoringSSL instead of OpenSSL), the native modules you use will need to be recompiled for Electron. Altfel, vei primi următoarea clasă de eroare atunci când încerci să rulezi aplicația:

```sh
Eroare: modulul '/path/to/native/module.node'
a fost compilat cu o versiune diferită Node.js folosind
NODE_MODULE_VERSION $XYZ. Această versiune de Node.js necesită
NODE_MODULE_VERSION $ABC. Încercați să recompilați sau să reinstalați modulul
(de exemplu, folosind `npm rebuild` sau `npm install`).
```

## Cum se instalează modulele native

Există mai multe moduri diferite de a instala modulele native:

### Se instalează module și se reconstruiesc pentru Electron

Poți instala module ca alte proiecte Node și apoi să reconstruiești modulele pentru Electron cu pachetul [`electron-rebuild`](https://github.com/electron/electron-rebuild). This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app. If you are using [Electron Forge](https://electronforge.io/), this tool is used automatically in both development mode and when making distributables.

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager](https://github.com/electron/electron-packager), consult the project's README.

### Folosind `npm`

Prin setarea câtorva variabile de mediu, puteți utiliza `npm` pentru a instala modulele în mod direct.

De exemplu, pentru a instala toate dependențele pentru Electron:

```sh
# Versiunea Electron.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
exportă npm_config_disturl=https://electronjs.org/headers
# Spune node-pre-gyp că noi construim pentru Electron.
exportă npm_config_runtime=electron
# Spune node-pre-gyp pentru a construi modulul din codul sursă.
exportă npm_config_build_from_source=true
# Instalează toate dependențele și stochează cache la ~/.electron-gyp.
Instalare HOME=~/.electron-gyp npm
```

### Construire manuală pentru Electron

Dacă sunteţi un dezvoltator care dezvoltă un modul nativ şi doriţi să-l testaţi împotriva Electron, ați putea dori să reconstruiți modulul pentru Electron manual. Poți utiliza `node-gyp` direct pentru a construi pentru Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` se modifică unde se găsesc antete pentru dezvoltare.
* `--target=1.2.3` este versiunea Electron.
* `--dist-url=...` specifică unde pot fi descărcate header-urile.
* `--arch=x64` spune că modulul este construit pentru un sistem de 64 de biți.

### Construire manuală pentru o construcție personalizată de Electron

Pentru a compila module native Node contra unei construcții personalizate de Electron care nu se potrivește cu o versiune publică, instruiește `npm` să utilizeze versiunea Node pe care ai inclus-o cu construcția ta personalizată.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Depanare

Dacă ați instalat un modul nativ și ați găsit că acesta nu funcționează, trebuie să verificați următoarele lucruri:

* Când aveți dubii, rulați `electronon-rebuild` mai întâi.
* Asigură-te că modulul nativ este compatibil cu platforma țintă și cu arhitectura aplicației tale Electron.
* Asigură-te că `win_delay_load_hook` nu este setat la `false` din `binding.gyp` al modulului.
* După ce faci upgrade la Electron, de obicei trebuie să reconstruiești modulele.

### O notă despre `win_delay_load_hook`

Pe Windows, în mod implicit, `node-gyp` leagă module native împotriva `node.dll`. Cu toate acestea, în Electron 4.x și mai mare, simbolurile necesare modulelor native sunt exportate de `electron. xe`, și nu există `node.dll`. Pentru a încărca modulele native pe Windows, `node-gyp` instalează [un cârlig cu întârziere de încărcare](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) care declanșează atunci când modulul nativ este încărcat; şi redirecţionează modulul `. ll` referință pentru a utiliza încărcarea executabilului în loc să caute `node. ll` în bibliotecă caută (ceea ce nu va face nimic). Ca atare, pe Electron 4.x și mai mare, `'win_delay_load_hook': 'true'` este necesar pentru a încărca module native.

Dacă primiți o eroare ca `Modulul nu s-a înregistrat singur`, sau `Procedura
specificată nu a putut fi găsită`, ar putea însemna că modulul pe care încercați să îl folosiți nu a inclus corect carligul cu întârzieri.  Daca modulul este construit cu node-gyp, asigură-te că `variabila win_delay_load_hook` este setată să `true` în legendarul `. yp` fişier, şi nu este suprascris nicăieri.  Dacă modulul este construit cu un alt sistem, va trebui să vă asigurați că ați construit cu un cârlig de întârziere instalat în meniul principal `. ode` fișier. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

În special, este important ca:

* conectezi împotriva `node.lib` din _Electron_ și nu Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
* includeți steagul `/DELAYLOAD:node.exe`. Dacă modulul `xe` link-ul nu este întârziat, apoi cârligul de încărcare a întârzierilor nu va avea șansa de a aprinde și simbolurile nu vor fi rezolvate corect.
* `win_delay_load_hook.obj` este legat direct de DL-ul final. Dacă cârligul este configurat într-un DLL dependent, nu va fi aprins la momentul potrivit.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Module care se bazează pe `precompilare`

[`prebuild`](https://github.com/prebuild/prebuild) oferă o modalitate de a publica modulele native Node cu binare preconstruite pentru mai multe versiuni de Node și Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Module care se bazează pe `node-pre-gyp`

[`Instrumentul` node-pre-gyp](https://github.com/mapbox/node-pre-gyp) oferă o modalitate de a implementa module native Node cu binare preconstruite, si multe module populare il folosesc.

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
