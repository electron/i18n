# Glossary

Tinutukoy ng pahinang ito ang ilang terminolohiya na karaniwang ginagamit sa pag-unlad ng Electron.

### ASAR

Ang ibig sabihin ng ASAR ay Atom Shell Archive Format. Ang isang [ asar ](https://github.com/electron/asar) na archive ay isang simple ` tar ` - na parehong format na naghahusay ng mga file sa isang solong file. Ang Electron ay makakabasa ng mga arbitrary file mula dito nang walang ginagawang pag-unpack ng buong file.

Ang format ng ASAR ay nilikha lalo na upang mapabuti ang pagganap sa Windows... TODO

### Brightray

Ang Brightray  ay isang static library na ginawa [ libchromiumcontent ](#libchromiumcontent) na mas madaling gamitin sa mga application. Ito ay ngayon hindi na ginagamit at isinama sa codebase ng Electron.</p> 

### CRT

Ang C Run-time Library (CRT) ay bahagi ng C ++ Standard Library na isinasama ang karaniwang standard na ISO C99. Ang Visual C ++ na mga aklatan na ipatupad ang suporta ng CRT native code development, at parehong halo-halong katutubong at pinamamahalaang code, at dalisay na pinamamahalaang code para sa .NET development.

### DMG

Ang isang Imahe ng Apple Disk ay isang format ng packaging na ginagamit ng macOS. Ang mga DMG file ay karaniwang ginagamit para sa pamamahagi ng mga "installer" application. [electron-builder](https://github.com/electron-userland/electron-builder) ay sumusuporta `dmg` bilang build target.

### IME

Input Method Editor. Ang isang program na nagpapahintulot sa mga gumagamit na ipasok ang mga character at mga simbolo na hindi natagpuan sa kanilang keyboard. Halimbawa, pinapayagan nito ang mga gumagamit ng Latin na mga keyboard upang mag-input ng mga karakter na Chinese, Japanese, Korean at Indic.

### IPC

Ang ibig sabihin ng IPC ay Communication Inter-Process. Ginagamit ng elektron ang IPC upang ipadala ang serialized JSON na mga mensahe sa pagitan ng mga proseso ng  main </ 0> at  renderer </ 1>.</p> 

### libchromiumcontent

Isang nakabahaging library na kasama ang [ module ng Nilalaman ng Chromium ](https://www.chromium.org/developers/content-module) at lahat ng mga dependencies (hal., Blink, [ V8 ](#v8), atbp.). Tinutukoy rin bilang "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### pangunahing proseso

Ang pangunahing proseso, karaniwang isang file na pinangalanang ` main.js `, ay ang entry point sa bawat Electron app. Kinokontrol nito ang buhay ng app, mula sa pagbukas hanggang sa pagsara. Ito rin ay namamahala ng mga katutubong element tulad ng Menu, Menu Bar, Dock, Tray, atbp. Ang pangunahing proseso ay responsable para sa paglikha ng bawat bagong proseso ng renderer sa app. Ang buong Node API ay built in.

Ang pangunahing file sa bawat proseso ng file ay tinukoy sa ` pangunahing ` ari-arian sa ` package.json `. Ito ay kung paano ang ` elektron. </ 0> na alam kung anong file ang magsisimula sa startup.</p>

<p>Sa Chromium, ang prosesong ito ay tinukoy bilang "proseso ng browser". Ito ay
pinalitan ng pangalan sa Electron upang maiwasan ang pagkalito sa mga proseso ng renderer.</p>

<p>Tingnan din ang: <a href="#process"> proseso </a>, <a href="#renderer-process"> proseso ng renderer </a></p>

<h3>MAS</h3>

<p>Acronym for Apple's Mac App Store. For details on submitting your app to the
MAS, see the <a href="tutorial/mac-app-store-submission-guide.md">Mac App Store Submission Guide</a>.</p>

<h3>native modules</h3>

<p>Native modules (also called <a href="https://nodejs.org/api/addons.html">addons</a> in
Node.js) are modules written in C or C++ that can be loaded into Node.js or
Electron using the require() function, and used just as if they were an
ordinary Node.js module. They are used primarily to provide an interface
between JavaScript running in Node.js and C/C++ libraries.</p>

<p>Native Node modules are supported by Electron, but since Electron is very
likely to use a different V8 version from the Node binary installed in your
system, you have to manually specify the location of Electron’s headers when
building native modules.</p>

<p>See also <a href="tutorial/using-native-node-modules.md">Using Native Node Modules</a>.</p>

<h3>NSIS</h3>

<p>Nullsoft Scriptable Install System is a script-driven Installer
authoring tool for Microsoft Windows. It is released under a combination of
free software licenses, and is a widely-used alternative to commercial
proprietary products like InstallShield. <a href="https://github.com/electron-userland/electron-builder">electron-builder</a> supports NSIS
as a build target.</p>

<h3>OSR</h3>

<p>OSR (Off-screen rendering) can be used for loading heavy page in
background and then displaying it after (it will be much faster).
It allows you to render page without showing it on screen.</p>

<h3>process</h3>

<p>A process is an instance of a computer program that is being executed. Electron
apps that make use of the <a href="#main-process">main</a> and one or many <a href="#renderer-process">renderer</a> process are
actually running several programs simultaneously.</p>

<p>In Node.js and Electron, each running process has a <code>process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.