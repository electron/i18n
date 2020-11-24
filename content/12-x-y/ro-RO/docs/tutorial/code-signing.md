# Semnarea codului

Semnarea codului este o tehnologie de securitate pe care o utilizați pentru a certifica faptul că o aplicație a fost creată de dvs.

Pe macOS, sistemul poate detecta orice modificare a aplicației, indiferent dacă aceasta este introdusă accidental sau prin cod răuvoitor.

Pe Windows, sistemul atribuie un nivel de încredere certificatului tău de semnare cod pe care dacă nu îl ai, sau în cazul în care nivelul dvs. de încredere este scăzut, va face ca dialogurile de securitate să apară atunci când utilizatorii încep să folosească aplicația.  Nivelul de încredere construiește în timp, astfel încât este mai bine să începi semnarea codului cât mai curând posibil.

Deşi este posibilă distribuirea aplicaţiilor nesemnate, aceasta nu este recomandată. Atât Windows cât și macOS vor preveni, în mod implicit, fie descărcarea, fie executarea aplicațiilor nesemnate. Începând cu macOS Catalina (versiunea 10.15), utilizatorii trebuie să parcurgă mai mulți pași manuali pentru a deschide aplicații nesemnate.

![atenționarea macOS Catalina Gatekeeper: Aplicația nu poate fi deschisă deoarece dezvoltatorul
nu poate fi verificat](../images/gatekeeper.png)

După cum vedeți, utilizatorii primesc două opțiuni: Mută aplicația direct la gunoi sau anulează rularea. Nu vrei ca utilizatorii să vadă acest dialog.

Dacă construiești o aplicație Electron pe care intenționezi să o ambalezi și să o distribuiești, aceasta ar trebui să fie semnată cu cod.

# Semnarea & notarizând versiunile macOS

Pregătirea adecvată a aplicațiilor macOS pentru lansare necesită doi pași: Mai întâi, aplicația trebuie să fie semnată cu cod. Apoi, aplicația trebuie să fie încărcată în Apple pentru un proces numit "notarization", atunci când sistemele automatizate vor verifica în continuare că aplicația dvs. nu face nimic pentru a-i pune în pericol utilizatorii.

Pentru a începe procesul, asigurați-vă că îndepliniți cerințele pentru semnare și notarizând aplicația dvs.:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Descărcați și instalați [Xcode][] - este nevoie de un calculator care să ruleze macOS
3. Generate, download, and install [signing certificates][]

Ecosistemul Electron favorizează configurarea și libertatea, așa că există mai multe modalități de a obține aplicația ta semnată și notarizată.

## `electron-forge`

Dacă folosești unealta de construcție favorită a Electron, obținerea semnării aplicației tale și notarizarea necesită câteva completări la configurația ta. [Forge](https://electronforge.io) este o colecție de instrumente Electron oficiale, folosind [`electron-packer`][], [`electron-osx-sign`][]și [`electron-notarize`][] sub hood.

Hai să aruncăm o privire la o configurație cu toate câmpurile necesare. Nu toate sunt necesare: instrumentele vor fi suficient de inteligente pentru a găsi automat o identitate `potrivită`, de exemplu, dar vă recomandăm să fiţi explicit.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "timp durat": adevărat,
          "drepturi": "drepturi. listează",
          "drepturi-moştenire": "drepturi. listă",
          "semnătură-steaguri": "bibliotecă"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

Fișierul `plist` la care se face referire aici are nevoie de următoarele drepturi specifice macOS pentru a asigura mecanismele Apple de securitate că aplicația ta face aceste lucruri fără să însemne vreo vătămare:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple///DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memorie</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Pentru a vedea toate acestea în acțiune, verificați codul sursă Electron Fiddle, [în special fișierul `electron-forge` configurație ](https://github.com/electron/fiddle/blob/master/forge.config.js).

Dacă plănuiești să accesezi microfonul sau camera foto din cadrul aplicației tale folosind API-urile Electron, va trebui de asemenea să adaugi următoarele drepturi:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

În cazul în care acestea nu sunt prezente în aplicația dvs., de exemplu:

```js
const { systemPreferences } = require('electron')

const microfon = systemPreferences.askForMediaAccess('microfon')
```

Aplicația ta se poate bloca. Vezi secțiunea Acces la Resurse din [Execuție întărită](https://developer.apple.com/documentation/security/hardened_runtime) pentru mai multe informații și drepturi de care ai nevoie.

## `electron-builder`

Electron Builder vine cu o soluție personalizată pentru semnarea aplicației tale. puteţi găsi [documentaţia sa aici](https://www.electron.build/code-signing).

## `ambalator de electroni`

Dacă nu folosiți o conductă de construcție integrată cum ar fi Forge sau Constructor, este posibil să utilizezi [`electron-packer`][], care include [`electron-osx-semn`][] și

[`electron-notarize`][].</p> 

Dacă utilizați API-ul Packager, puteți transmite [în configurație că ambele semne și notarizează aplicația dvs. ](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).



```js
ambalator const = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identitate: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    „timp silențios”: adevărat,
    drepturi: „drepturi. listează”,
    „drepturi-moștenite”: „drepturi. lista',
    'semnătură-steaguri': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```


Fișierul `plist` la care se face referire aici are nevoie de următoarele drepturi specifice macOS pentru a asigura mecanismele Apple de securitate că aplicația ta face aceste lucruri fără să însemne vreo vătămare:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple///DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memorie</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```




## Magazin de aplicații Mac

See the [Mac App Store Guide][].



# Versiuni de semnare Windows

Înainte de a semna versiuni Windows, trebuie să faceți următoarele:

1. Obține un certificat de semnare a codului de autentificare Windows (necesită o taxă anuală)
2. Instalați Visual Studio pentru a obține utilitatea semnării ( [Comunitatea gratuită Ediția](https://visualstudio.microsoft.com/vs/community/) este suficientă)

Poți obține un certificat de cod de la o mulțime de distribuitori. Preţurile variază, deci merită timp să faci cumpărături. Revânzătorii populari includ:

* [digicerat](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Printre altele, vă rugăm să faceți cumpărături pentru a găsi unul care se potrivește nevoilor dvs., Google este prietenul dvs. 😄

Există o serie de unelte pentru semnarea aplicației tale împachetate:

- [`electron-winstaller`][] va genera un instalator pentru ferestre și îl va semna pentru 

- [`electron-forge`][] poate semna instalatori pe care îi generează prin intermediul țintelor Squirrel.Windows sau MSI.

- [`electron-builder`][] can sign some of its windows targets



## Magazin Windows

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-osx-semn`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packer`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
