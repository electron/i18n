# Firma Codice

La firma del codice è una tecnologia di sicurezza che usi per certificare che un'app è stata creata da te.

Su macOS il sistema può rilevare ogni modifica all'app, che la modifica sia introdotta accidentalmente o da un codice maligno.

Su Windows, il sistema assegna un livello di fiducia al certificato di firma del codice che, se non lo hai, o se il livello di fiducia è basso, farà apparire le finestre di sicurezza quando gli utenti iniziano a utilizzare l'applicazione.  Il livello di fiducia costruisce nel tempo, quindi è meglio iniziare la firma del codice il prima possibile.

Mentre è possibile distribuire app non firmate, non è raccomandato. Sia Windows che macOS eviteranno, per impostazione predefinita, il download o l'esecuzione di applicazioni non firmate. A partire da macOS Catalina (versione 10.15), gli utenti devono passare attraverso più passaggi manuali per aprire applicazioni non firmate.

![macOS Catalina Gatekeeper attenzione: L'applicazione non può essere aperta perché lo sviluppatore
non può essere verificato](../images/gatekeeper.png)

Come puoi vedere, gli utenti hanno due opzioni: Spostare l'app direttamente al cestino o annullarne l'esecuzione. Non vuoi che i tuoi utenti vedano quella finestra.

Se stai creando un'app Electron che intendi impacchettare e distribuire, dovrebbe essere firmata nel codice.

# Firma & notarizzazione delle build di macOS

Preparare correttamente le applicazioni macOS per il rilascio richiede due passaggi: In primo luogo, l'app deve essere firmata in codice. Quindi, l'applicazione deve essere caricata su Apple per un processo chiamato "notarization", dove i sistemi automatizzati verificheranno ulteriormente che la tua app non stia facendo nulla per mettere in pericolo i suoi utenti.

Per avviare il processo, assicurati di soddisfare i requisiti per la firma e notarizzare la tua app:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Scarica e installa [Xcode][] - è richiesto un computer con macOS
3. Genera, scarica ed installa [certificati di firma][]

L'ecosistema di Electron's favorisce la configurazione e la libertà, quindi ci sono diversi modi per ottenere la tua applicazione firmata e notarile.

## `electron-forge`

Se stai usando lo strumento di build preferito di Electron, ottenere la tua applicazione firmata e notarizzata richiede alcune aggiunte alla tua configurazione. [Forge](https://electronforge.io) è una collezione degli strumenti ufficiali di Electron, che utilizza [`electron-packager`][], [`electron-osx-sign`][]e [`electron-notarize`][] sotto il cofano.

Diamo un'occhiata a una configurazione di esempio con tutti i campi richiesti. Non tutti di loro sono richiesti: gli strumenti saranno abbastanza intelligenti per trovare automaticamente una identità `adatta`, per esempio, ma vi raccomandiamo di essere espliciti.

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
          "diritti": "titoli. elenco",
          "titoli-successione": "titoli. list",
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

Il file `plist` referenziato qui ha bisogno dei seguenti diritti specifici per macOS per garantire ai meccanismi di sicurezza Apple che la tua app sta facendo queste cose senza significare alcun danno:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Per vedere tutto questo in azione, controlla il codice sorgente di Electron Fiddle, [in particolare il suo file `electron-forge` configurazione ](https://github.com/electron/fiddle/blob/master/forge.config.js).


## `electron-builder`

Electron Builder è dotato di una soluzione personalizzata per la firma dell'applicazione. Puoi trovare [la sua documentazione qui](https://www.electron.build/code-signing).

## `electron-packager`

Se non stai utilizzando una pipeline di costruzione integrata come Forge o Builder, probabilmente stai usando [`electron-packager`][], che include [`elettron-osx-sign`][] e [`electron-notarize`][].

Se stai usando l'API di Packager, puoi passare [in configurazione che segni e notarili la tua applicazione](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    titoli: 'titoli. lista',
    'diritti-successo': 'titoli. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

Il file `plist` referenziato qui ha bisogno dei seguenti diritti specifici per macOS per garantire ai meccanismi di sicurezza Apple che la tua app sta facendo queste cose senza significare alcun danno:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Negozio App Mac

Vedi la [Guida Mac App Store][].

# Firma di build di Windows

Prima di firmare le build di Windows, devi fare quanto segue:

1. Ottieni un certificato di firma del codice di Windows Authenticode (richiede una tassa annuale)
2. Installa Visual Studio per ottenere l'utilità di firma (è sufficiente [Community Edition](https://visualstudio.microsoft.com/vs/community/) gratuita)

Puoi ottenere un certificato di firma del codice da molti rivenditori. I prezzi variano, quindi potrebbe valere la pena di fare acquisti in giro. I rivenditori popolari includono:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Tra gli altri, si prega di fare acquisti intorno per trovare uno che si adatta alle vostre esigenze, Google è il tuo amico 😄

Ci sono molti strumenti per firmare la tua app impacchettata:

- [`electron-winstaller`][] genererà un installer per Windows e lo firmerà per te
- [`electron-forge`][] può firmare gli installatori che genera attraverso i targets Squirrel.Windows o MSI.
- [`electron-builder`][] can sign some of its windows targets

## Negozio Windows

Vedi la [Guida Windows Store][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`elettron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[certificati di firma]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Guida Mac App Store]: mac-app-store-submission-guide.md
[Guida Windows Store]: windows-store-guide.md
