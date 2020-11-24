# Utilizarea modulelor Native Node

Modulele Native Node sunt suportate de Electron, dar din moment ce Electron este foarte probabil să folosească o versiune V8 diferită de Node instalată pe sistemul dvs , modulele pe care le utilizaţi vor trebui recompilate pentru Electron. Altfel, vei primi următoarea clasă de eroare atunci când încerci să rulezi aplicația:

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

Poți instala module ca alte proiecte Node și apoi să reconstruiești modulele pentru Electron cu pachetul [`electron-rebuild`](https://github.com/electron/electron-rebuild). Acest modul poate determina automat versiunea Electron și poate gestiona pașii manuali de descărcare a header-urilor și de reconstruire a modulelor native pentru aplicația ta.

De exemplu, pentru a instala `electron-rebuild` și apoi reconstruiește modulele cu ele prin linia de comandă:

```sh
npm install --save-dev electron-rebuild

# De fiecare dată când executați "npm install", executați asta:
./node_modules/. in/electron-rebuild

# pe Windows dacă ai probleme, încerci:
.\node_modules\.bin\electron-rebuild.cmd
```

Pentru mai multe informații despre utilizare și integrare cu alte instrumente, consultați README.

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

Dacă modulele furnizează binare pentru utilizarea în Electron, asigură-te că omite `--build-from-source` și `npm_config_build_from_source` variabila pentru a profita pe deplin de binarele preconstruit.

## Module care se bazează pe `node-pre-gyp`

[`Instrumentul` node-pre-gyp](https://github.com/mapbox/node-pre-gyp) oferă o modalitate de a implementa module native Node cu binare preconstruite, si multe module populare il folosesc.

De obicei, aceste module funcționează bine sub Electron, dar uneori când Electron folosește o versiune mai nouă a V8 decât Node și/sau există schimbări ABI, se pot întâmpla lucruri rele Deci, în general, este recomandat să se construiască întotdeauna module native din codul sursă. `Reconstruirea de electron-reconstruiește` se ocupă automat de asta.

Dacă urmăriți modul `npm` de instalare a modulelor, atunci acest lucru este realizat în mod implicit, dacă nu, trebuie să treci `--build-rom-source` la `npm`, sau setează variabila de mediu `npm_config_build_from_source`.
