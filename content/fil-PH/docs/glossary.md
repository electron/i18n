# Glossary

Ang pahinang ito ay tumutukoy sa mga ilang terminolohiya na karaniwang ginagamit sa pag-unlad ng Electron.

### ASAR

Ang ASAR ay nangahuhulugang Atom Shell Archive Format. Ang isang [ asar ](https://github.com/electron/asar) na archive ay isang simple ` tar ` - na parehong format na naghahusay ng mga file sa isang solong file. Ang Electron ay makakabasa ng mga arbitrary file mula dito nang walang ginagawang pag-unpack ng buong file.

Ang format ng ASAR ay nilikha lalo na upang mapabuti ang pagganap sa Windows... TODO

### Brightray

Ang Brightray  ay isang static library na ginawa [ libchromiumcontent ](#libchromiumcontent) na mas madaling gamitin sa mga application. Ito ay ngayon hindi na ginagamit at isinama sa codebase ng Electron.</p> 

### CRT

Ang C Run-time Library (CRT) ay bahagi ng C ++ Standard Library na isinasama ang karaniwang standard na ISO C99. Ang Visual C ++ na mga aklatan na ipatupad ang suporta ng CRT native code development, at parehong halo-halong katutubong at pinamamahalaang code, at dalisay na pinamamahalaang code para sa .NET development.

### DMG

Ang isang Imahe ng Apple Disk ay isang format ng packaging na ginagamit ng macOS. Ang mga DMG file ay karaniwang ginagamit para sa pamamahagi ng mga "installer" application. [electron-builder](https://github.com/electron-userland/electron-builder) ay sumusuporta `dmg` bilang build target.

### IME

Input Method Editor. Ang isang program na nagpapahintulot sa mga gumagamit na ipasok ang mga character at mga simbolo na hindi natagpuan sa kanilang keyboard. Halimbawa, pinapayagan nito ang mga gumagamit ng Latin na mga keyboard upang mag-input ng mga karakter na Chinese, Japanese, Korean at Indic.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

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

<p>Acronym para sa Mac App Store ng Apple. Para sa mga detalye sa pagsusumite ng iyong app sa
MAS, tingnan ang <a href="tutorial/mac-app-store-submission-guide.md"> Gabay sa Pagsusumite ng Mac App Store </a>.</p>

<h3>Mojo</h3>

<p>An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.</p>

<p>See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md</p>

<h3>mga native module</h3>

<p>Native modules (also called <a href="https://nodejs.org/api/addons.html">addons</a> in
Node.js) are modules written in C or C++ that can be loaded into Node.js or
Electron using the require() function, and used as if they were an
ordinary Node.js module. Ang mga ito ay ginagamit lalo na upang magbigay ng isang interface
sa pagitan ng JavaScript na tumatakbo sa mga library ng Node.js at C/C++.</p>

<p>Ang mga module ng Native Node ay sinusuportahan ng Electron, ngunit dahil ang Electron ay napaka
malamang na gumamit ng ibang bersyon V8 mula sa binary na naka-install sa iyong
system, kailangan mong i-manu-manong tukuyin ang lokasyon ng mga header ng Electron kapag
bumuo ng mga native module.</p>

<p>Tingnan din ang <a href="tutorial/using-native-node-modules.md"> Paggamit ng mga Native Node Modiule </a>.</p>

<h3>NSIS</h3>

<p>Nullsoft Scriptable Install System ay isang script-driven Installer
tool sa pag-author para sa Microsoft Windows. Ito ay inilabas sa ilalim ng isang kumbinasyon ng
libreng mga lisensya ng software, at isang malawakang ginagamit na alternatibo sa komersyo
pagmamay-ari ng mga produkto tulad ng InstallShield. Ang <a href="https://github.com/electron-userland/electron-builder"> elektron-builder </a> ay sumusuporta sa NSIS
bilang isang build target.</p>

<h3>OSR</h3>

<p>Maaaring gamitin ang OSR (Off-screen rendering) para sa paglo-load ng mabibigat na pahina sa
background at pagkatapos ay ipinapakita ito (ito ay magiging mas mabilis).
Pinapayagan ka nitong mag-render ng pahina nang hindi ipinapakita ang screen.</p>

<h3>proseso</h3>

<p>Ang isang proseso ay isang halimbawa ng isang programa sa computer na isinasagawa. Electron
ang mga app na gumagamit ng <a href="#main-process"> main </a> at isa o maraming <a href="#renderer-process"> renderer </a> na proseso na
aktwal na tumatakbo ang ilang mga programa nang sabay-sabay.</p>

<p>Sa Node.js at Electron, ang bawat proseso ng pagpapatakbo ay may isang bagay na <code> proseso `. Ito ay ang bagay na isang pandaigdig na nagbibigay ng impormasyon tungkol sa, at kontrol sa, ang kasalukuyang proseso. Bilang isang pandaigdigan, ito ay laging magagamit sa mga aplikasyon nang walang gamit ang nangangailangan ().

Tingnan din ang: [ pangunahing proseso ](#main-process), [ proseso ng renderer ](#renderer-process)

### proseso ng renderer

Ang proseso ng tagapag-render ay isang window ng browser sa iyong app. Hindi tulad ng pangunahing proseso, maaaring magkaroon ng maraming ng mga ito at ang bawat isa ay tatakbo sa isang hiwalay na proseso. Maaari rin silang maitago.

Sa normal na mga browser, ang mga web page ay karaniwang tumatakbo sa isang sandboxed na kapaligiran at hindi pinapayagan ang pag-access sa mga katutubong mapagkukunan. Gayunpaman, ang mga gumagamit ng elektron ay may kapangyarihan sa gamitin ang mga API ng Node.js sa mga web page na nagpapahintulot sa mas mababang antas ng operating system mga pakikipag-ugnayan.

Tingnan din ang: [ proseso ](#process), [ pangunahing proseso ](#main-process)

### Squirrel

Ang ardilya ay isang open-source framework na nagbibigay-daan sa mga apps ng Electron na awtomatikong i-update bilang mga bagong bersyon ay inilabas. Tingnan ang [ autoUpdater ](api/auto-updater.md) API para sa impormasyon tungkol sa pagsisimula sa ardilya.

### userland

Ang terminong ito ay nagmula sa komunidad ng Unix, kung saan ang "userland" o "userspace" ay tinutukoy ang mga program na tumatakbo sa labas ng kernel ng operating system. Higit pa kamakailan lamang, ang termino ay na-popularized sa node at npm komunidad na makilala sa pagitan ng mga tampok na magagamit sa "Node core" kumpara sa mga pakete inilathala sa npm registry ng mas malaking "user" na komunidad.

Tulad ng Node, ang Electron ay nakatutok sa pagkakaroon ng isang maliit na hanay ng mga API na nagbibigay lahat ng kinakailangang primitibo para sa pagbubuo ng mga application ng multi-platform desktop. Ang pilosopiyang ito ng disenyo ay nagpapahintulot sa Electron na manatiling isang nababaluktot na kasangkapan nang hindi masobrahan ang tanaw tungkol sa kung paano ito dapat gamitin. Binibigyang-daan ng Userland ang mga gumagamit na lumikha at magbahagi ng mga tool na nagbibigay ng karagdagang pag-andar sa ibabaw ng kung ano na magagamit sa "core".

### V8

Ang V8 ay isang open source JavaScript engine ng Google. Ito ay nakasulat sa C++ at ginagamit sa Google Chrome. Maaaring magpatakbo ng V8 standalone, o maaaring ma-embed sa anumang C++ application.

Ang elektron ay nagtatayo ng V8 bilang bahagi ng Chromium at pagkatapos ay tumuturo sa Node sa V8 kung kailan pagbuo nito.

Ang mga numero ng bersyon ng V8 ay laging tumutugma sa mga Google Chrome. Chrome 59 Kasama ang V8 5.9, kasama ang Chrome 58 ng V8 5.8, atbp.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Ang mga tag ng `webview` ay ginagamit upang i-embed ang nilalaman ng 'guest' (tulad ng panlabas na mga web page) ang iyong Electron app. Ang mga ito ay katulad ng ` iframe `s, ngunit naiiba sa bawat isa ang webview ay tumatakbo sa isang hiwalay na proseso. Hindi ito pareho sa mga pahintulot bilang iyong web page at lahat ng mga pakikipag-ugnayan sa pagitan ng iyong app at ang naka-embed na nilalaman ay magiging asynchronous. Pinapanatiling ligtas ang iyong app mula sa naka-embed na nilalaman.