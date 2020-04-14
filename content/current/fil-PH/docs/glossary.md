# Glossary

Ang pahinang ito ay tumutukoy sa mga ilang terminolohiya na karaniwang ginagamit sa pag-unlad ng Electron.

### ASAR

Ang ASAR ay nangahuhulugang Atom Shell Archive Format. Ang isang [ asar ](https://github.com/electron/asar) na archive ay isang simple ` tar ` - na parehong format na naghahusay ng mga file sa isang solong file. Ang Electron ay makakabasa ng mga arbitrary file mula dito nang walang ginagawang pag-unpack ng buong file.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

Ang C Run-time Library (CRT) ay bahagi ng C ++ Standard Library na isinasama ang karaniwang standard na ISO C99. Ang Visual C ++ na mga aklatan na ipatupad ang suporta ng CRT native code development, at parehong halo-halong katutubong at pinamamahalaang code, at dalisay na pinamamahalaang code para sa .NET development.

### DMG

Ang isang Imahe ng Apple Disk ay isang format ng packaging na ginagamit ng macOS. Ang mga DMG file ay karaniwang ginagamit para sa pamamahagi ng mga "installer" application. [electron-builder](https://github.com/electron-userland/electron-builder) ay sumusuporta `dmg` bilang build target.

### IME

Input Method Editor. Ang isang program na nagpapahintulot sa mga gumagamit na ipasok ang mga character at mga simbolo na hindi natagpuan sa kanilang keyboard. Halimbawa, pinapayagan nito ang mga gumagamit ng Latin na mga keyboard upang mag-input ng mga karakter na Chinese, Japanese, Korean at Indic.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Isang nakabahaging library na kasama ang [ module ng Nilalaman ng Chromium ](https://www.chromium.org/developers/content-module) at lahat ng mga dependencies (hal., Blink, [ V8 ](#v8), atbp.). Tinutukoy rin bilang "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### pangunahing proseso

Ang pangunahing proseso, karaniwang isang file na pinangalanang ` main.js `, ay ang entry point sa bawat Electron app. Kinokontrol nito ang buhay ng app, mula sa pagbukas hanggang sa pagsara. Ito rin ay namamahala ng mga katutubong element tulad ng Menu, Menu Bar, Dock, Tray, atbp. Ang pangunahing proseso ay responsable para sa paglikha ng bawat bagong proseso ng renderer sa app. Ang buong Node API ay built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Tingnan din ang: [ proseso ](#process), [ proseso ng renderer ](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### mga native module

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Ang mga ito ay ginagamit lalo na upang magbigay ng isang interface sa pagitan ng JavaScript na tumatakbo sa mga library ng Node.js at C/C++.

Ang mga module ng Native Node ay sinusuportahan ng Electron, ngunit dahil ang Electron ay napaka malamang na gumamit ng ibang bersyon V8 mula sa binary na naka-install sa iyong system, kailangan mong i-manu-manong tukuyin ang lokasyon ng mga header ng Electron kapag bumuo ng mga native module.

Tingnan din ang [ Paggamit ng mga Native Node Modiule ](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System ay isang script-driven Installer tool sa pag-author para sa Microsoft Windows. Ito ay inilabas sa ilalim ng isang kumbinasyon ng libreng mga lisensya ng software, at isang malawakang ginagamit na alternatibo sa komersyo pagmamay-ari ng mga produkto tulad ng InstallShield. Ang [ elektron-builder ](https://github.com/electron-userland/electron-builder) ay sumusuporta sa NSIS bilang isang build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### proseso

Ang isang proseso ay isang halimbawa ng isang programa sa computer na isinasagawa. Electron ang mga app na gumagamit ng [ main ](#main-process) at isa o maraming [ renderer ](#renderer-process) na proseso na aktwal na tumatakbo ang ilang mga programa nang sabay-sabay.

Sa Node.js at Electron, ang bawat proseso ng pagpapatakbo ay may isang bagay na ` proseso `. Ito ay ang bagay na isang pandaigdig na nagbibigay ng impormasyon tungkol sa, at kontrol sa, ang kasalukuyang proseso. Bilang isang pandaigdigan, ito ay laging magagamit sa mga aplikasyon nang walang gamit ang nangangailangan ().

Tingnan din ang: [ pangunahing proseso ](#main-process), [ proseso ng renderer ](#renderer-process)

### proseso ng renderer

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Sa normal na mga browser, ang mga web page ay karaniwang tumatakbo sa isang sandboxed na kapaligiran at hindi pinapayagan ang pag-access sa mga katutubong mapagkukunan. Gayunpaman, ang mga gumagamit ng elektron ay may kapangyarihan sa gamitin ang mga API ng Node.js sa mga web page na nagpapahintulot sa mas mababang antas ng operating system mga pakikipag-ugnayan.

Tingnan din ang: [ proseso ](#process), [ pangunahing proseso ](#main-process)

### Squirrel

Ang ardilya ay isang open-source framework na nagbibigay-daan sa mga apps ng Electron na awtomatikong i-update bilang mga bagong bersyon ay inilabas. Tingnan ang [ autoUpdater ](api/auto-updater.md) API para sa impormasyon tungkol sa pagsisimula sa ardilya.

### userland

Ang terminong ito ay nagmula sa komunidad ng Unix, kung saan ang "userland" o "userspace" ay tinutukoy ang mga program na tumatakbo sa labas ng kernel ng operating system. Higit pa kamakailan lamang, ang termino ay na-popularized sa node at npm komunidad na makilala sa pagitan ng mga tampok na magagamit sa "Node core" kumpara sa mga pakete inilathala sa npm registry ng mas malaking "user" na komunidad.

Tulad ng Node, ang Electron ay nakatutok sa pagkakaroon ng isang maliit na hanay ng mga API na nagbibigay lahat ng kinakailangang primitibo para sa pagbubuo ng mga application ng multi-platform desktop. Ang pilosopiyang ito ng disenyo ay nagpapahintulot sa Electron na manatiling isang nababaluktot na kasangkapan nang hindi masobrahan ang tanaw tungkol sa kung paano ito dapat gamitin. Binibigyang-daan ng Userland ang mga gumagamit na lumikha at magbahagi ng mga tool na nagbibigay ng karagdagang pag-andar sa ibabaw ng kung ano na magagamit sa "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Ang elektron ay nagtatayo ng V8 bilang bahagi ng Chromium at pagkatapos ay tumuturo sa Node sa V8 kung kailan pagbuo nito.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Ang mga tag ng `webview` ay ginagamit upang i-embed ang nilalaman ng 'guest' (tulad ng panlabas na mga web page) ang iyong Electron app. Ang mga ito ay katulad ng ` iframe `s, ngunit naiiba sa bawat isa ang webview ay tumatakbo sa isang hiwalay na proseso. Hindi ito pareho sa mga pahintulot bilang iyong web page at lahat ng mga pakikipag-ugnayan sa pagitan ng iyong app at ang naka-embed na nilalaman ay magiging asynchronous. Pinapanatiling ligtas ang iyong app mula sa naka-embed na nilalaman.
