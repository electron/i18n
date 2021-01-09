# Firma Codice

La firma del codice è una tecnologia di sicurezza che usi per certificare che un'app è stata creata da te.

Su macOS il sistema può rilevare ogni modifica all'app, che la modifica sia introdotta accidentalmente o da un codice maligno.

Su Windows il sistema assegna un livello di fiducia al certificato di firma del codice che se non hai, o se il livello di fiducia è basso farà apparire le finestre di sicurezza quando gli utenti iniziano a utilizzare l'applicazione.  Il livello di fiducia costruisce nel tempo quindi è meglio iniziare la firma del codice il prima possibile.

Mentre è possibile distribuire app non firmate, non è raccomandato. Sia Windows che macOS, per impostazione predefinita, preverranno o il download o l'esecuzione di applicazioni non firmate. Iniziando con macOS Catalina (versione 10.15), gli utenti devono passare per passaggi manuali multipli per aprire applicazioni non firmate.

![avviso del Gatekeeper di macOS Catalina: L'app non può essere aperta perché lo sviluppatore non può essere verificato](../images/gatekeeper.png)

Come puoi vedere, gli utenti hanno due opzioni: Spostare l'app direttamente al cestino o annullarne l'esecuzione. Non vuoi che i tuoi utenti vedano quella finestra.

Se stai creando un'app Electron che intendi impacchettare e distribuire, dovrebbe essere firmata nel codice. Gli app store di Mac e Windows non consentono app non firmate.

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

## Notarizzazione

Iniziando con macOS Catalina, Apple richiede che le applicazioni siano notarizzate. "Notarizzazzione", come definito da Apple significa che tu carichi la tua applicazione precedentemente firmata su Apple per una verifica aggiuntiva _prima_ di distribuire l'app ai tuoi utenti.

To automate this process, you can use the [`electron-notarize`][] module. Non devi necessariamente completare questo passaggio per ogni build che fai - solo per le build che intendi spedire agli utenti.

## Negozio App Mac

Vedi la [Guida Mac App Store][].

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
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[certificati di firma]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Guida Mac App Store]: mac-app-store-submission-guide.md
[Guida Windows Store]: windows-store-guide.md
