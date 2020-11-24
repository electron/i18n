# Podpisywanie kodu

Code signing is a security technology that you use to certify that an app was created by you.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

W systemie Windows, system przypisuje poziom zaufania do certyfikatu podpisywania kodu , który jeśli nie posiadasz, lub jeśli poziom zaufania jest niski, spowoduje pojawienie się okienek , gdy użytkownicy zaczną korzystać z aplikacji.  Zaufaj poziomowi budować w miarę upływu czasu, aby łatwiej było rozpocząć podpisywanie kodu tak szybko, jak to możliwe.

Chociaż możliwe jest dystrybuowanie niepodpisanych aplikacji, nie jest to zalecane. Zarówno Windows, jak i macOS domyślnie uniemożliwią pobranie lub wykonanie niepodpisanych aplikacji. Począwszy od macOS Catalina (wersja 10.15), użytkownicy muszą przejść przez wiele ręcznych kroków, aby otworzyć aplikacje bez podpisu.

![ostrzeżenie macOS Catalina Gatekeeper: Aplikacja nie może być otwarta, ponieważ
programista nie może zostać zweryfikowana](../images/gatekeeper.png)

Jak widzisz, użytkownicy otrzymują dwie opcje: Przenieś aplikację prosto do kosza lub anuluj uruchamianie. Nie chcesz, aby Twoi użytkownicy widzieli to okno.

Jeśli budujesz aplikację Electrona, którą zamierzasz pakować i rozpowszechniać, powinna być podpisana kod.

# Podpisywanie & notarizowanie kompilacji macOS

Prawidłowe przygotowanie aplikacji macOS do wydania wymaga dwóch kroków: Najpierw aplikacja musi być podpisana z kodem. Następnie aplikacja musi zostać przesłana do Apple w procesie o nazwie "notarializacja", gdzie zautomatyzowane systemy będą dalej weryfikować, czy aplikacja nie robi nic, aby zagrozić jego użytkownikom.

Aby rozpocząć proces, upewnij się, że spełniasz wymagania do podpisywania i notarializowania aplikacji:

1. Zapisz się do [programu programistów Apple](https://developer.apple.com/programs/) (wymaga rocznej opłaty)
2. Pobierz i zainstaluj [Xcode](https://developer.apple.com/xcode) - wymaga to komputera z macOS
3. Generuj, pobierz i zainstaluj [podpisywanie certyfikatów](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Ekosystem Electrona faworyzuje konfigurację i wolność, więc istnieje wiele sposobów na podpisanie i notarializację aplikacji.

## `electron-forge`

Jeśli używasz ulubionego narzędzia do budowy Electrona, uzyskanie podpisu aplikacji i podpisanie jej w notariacie wymaga kilku dodatków do konfiguracji. [Forge](https://electronforge.io) jest kolekcją oficjalnych narzędzi Electrona, używając [`electron-packer`], [`electron-osx-sign`] i [`electron-notarize`] pod kapturkiem.

Spójrzmy na przykładową konfigurację ze wszystkimi wymaganymi polami. Nie wszystkie z nich są wymagane: narzędzia będą na tyle sprytne, aby automatycznie znaleźć odpowiednią `tożsamość`, na przykład, ale zalecamy, abyś był jasny.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          „uprawnienia”: „uprawnienia. wykaz”,
          „uprawnienia-dziedziczenie”: „uprawnienia. lista",
          "signature-flags": "library"
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

`Pplist` plik, do którego odwołano się tutaj, potrzebuje następujących uprawnień specyficznych dla macOSa aby zapewnić mechanizmy bezpieczeństwa Apple'a, że aplikacja robi te rzeczy bez szkody dla wszystkich:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debuger</key>
    <true/>
  </dict>
</plist>
```

Aby zobaczyć to wszystko w akcji, sprawdź kod źródłowy Electron Fiddle, [zwłaszcza jego `electron-forge` configuration ](https://github.com/electron/fiddle/blob/master/forge.config.js).

Jeśli planujesz uzyskać dostęp do mikrofonu lub kamery w aplikacji za pomocą interfejsów API Electrona, musisz również dodać następujące uprawnienia:

```xml
<key>com.apple.security.device.Audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Jeśli nie są one obecne w uprawnieniach Twojej aplikacji podczas wywoływania, na przykład:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Twoja aplikacja może ulec awarii. Zobacz sekcję Dostęp do Zasobów w [Utwardzony Czas Runtime](https://developer.apple.com/documentation/security/hardened_runtime) , aby uzyskać więcej informacji i uprawnień, których możesz potrzebować.

## `electron-builder`

Electron Builder zawiera niestandardowe rozwiązanie do podpisywania aplikacji. znajdziesz [jego dokumentację tutaj](https://www.electron.build/code-signing).

## `electron-packager`

Jeśli nie używasz zintegrowanego rurociągu budowy, takiego jak Forge lub Builder, prawdopodobnie używasz [`electron-packer`], który zawiera [`electron-osx-sign`] i [`electron-notarize`].

Jeśli używasz API Packagera, możesz przekazać [w konfiguracji, która zarówno znakuje jak i notariuje twoją aplikację](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hartowany czas pracy': true,
    uprawnienia: 'uprawnienia. wykaz”,
    „uprawnienia-dziedziczenie”: „uprawnienia”. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

`Pplist` plik, do którego odwołano się tutaj, potrzebuje następujących uprawnień specyficznych dla macOSa aby zapewnić mechanizmy bezpieczeństwa Apple'a, że aplikacja robi te rzeczy bez szkody dla wszystkich:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debuger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Zobacz [Przewodnik Sklepu Mac App](mac-app-store-submission-guide.md).

# Podpisywanie wersji Windows

Przed podpisaniem wersji Windows musisz wykonać następujące czynności:

1. Pobierz certyfikat podpisywania kodu uwierzytelniania Windows (wymaga rocznej opłaty)
2. Zainstaluj Visual Studio, aby uzyskać narzędzie podpisujące (darmowa [Społeczność Edycja](https://visualstudio.microsoft.com/vs/community/) jest wystarczająca)

Możesz otrzymać certyfikat podpisywania kodu od wielu sprzedawców. Ceny są różne, więc może być warte twojego czasu na zakupy. Popularni sprzedawcy to:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Między innymi prosimy o znalezienie takiego, który odpowiada Twoim potrzebom, Google jest Twoim znajomym 😄

Istnieje wiele narzędzi do podpisywania spakowanej aplikacji:

* [`electron-winstaller`] wygeneruje instalator dla okien i podpisze go dla
* [`electron-forge`] może podpisywać instalatorów, które generuje przez Squirrel.Windows lub MSI.
* [`electron-builder`] może podpisać niektóre ze swoich celów w oknach

## Sklep Windows

Zobacz [Przewodnik Sklepu Windows](windows-store-guide.md).
