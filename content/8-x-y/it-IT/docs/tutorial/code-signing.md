# Firma Codice

La firma del codice è una tecnologia di sicurezza che usi per certificare che un'app è stata creata da te.

On macOS the system can detect any change to the  app, whether the change is introduced accidentally or by malicious code.

Su Windows il sistema assegna un livello di fiducia al certificato di firma del codice che se non hai, o se il livello di fiducia è basso farà apparire le finestre di sicurezza quando gli utenti iniziano a utilizzare l'applicazione.  Il livello di fiducia costruisce nel tempo quindi è meglio iniziare la firma del codice il prima possibile.

Mentre è possibile distribuire app non firmate, non è raccomandato. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. Gli app store di Mac e Windows non consentono app non firmate.

# Firma build macOS

Prima di firmare le build macOS, devi fare quanto segue:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Genera, scarica ed installa [certificati di firma][]

Ci sono molti strumenti per firmare la tua app impacchettata:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Se stai usando `electron-packager`, passa il flag `--osx-sign=true` per firmare la tua costruzione.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Vedi [electron.build/code-signing](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide][].

# Firma di build di Windows

Prima di firmare le build di Windows, devi fare quanto segue:

1. Ottieni un certificato di firma del codice di Windows Authenticode (richiede una tassa annuale)
2. Installare Visual Studio 2015/2017 (per ottenere l'utilità di firma)

Puoi ottenere un certificato di firma del codice da molti rivenditori. I prezzi variano, quindi potrebbe valere la pena fare acquisti in giro. I rivenditori popolari includono:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Tra gli altri, si prega di fare acquisti in giro per trovare uno che si adatta alle vostre esigenze, Google è il vostro amico :)

Ci sono molti strumenti per firmare la tua app impacchettata:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Negozio Windows

Vedi la [Guida Windows Store][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[certificati di firma]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[Guida Windows Store]: windows-store-guide.md
