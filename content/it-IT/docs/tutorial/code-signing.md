# Firma Codice

Code signing is a security technology that you use to certify that an app was created by you.

Su macOS il sistema può rilevare ogni modifica all'app, che la modifica sia introdotta accidentalmente o da un codice maligno.

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application. Trust level builds over time so it's better to start code signing as early as possible.

While it is possible to distribute unsigned apps, it is not recommended. Sia Windows che macOS, per impostazione predefinita, preverranno o il download o l'esecuzione di applicazioni non firmate. Iniziando con macOS Catalina (versione 10.15), gli utenti devono passare per passaggi manuali multipli per aprire applicazioni non firmate.

![avviso del Gatekeeper di macOS Catalina: L'app non può essere aperta perché lo sviluppatore non può essere verificato](../images/gatekeeper.png)

Come puoi vedere, gli utenti hanno due opzioni: Spostare l'app direttamente al cestino o annullarne l'esecuzione. Non vuoi che i tuoi utenti vedano quella finestra.

Se stai creando un'app Electron che intendi impacchettare e distribuire, dovrebbe essere firmata nel codice. Gli app store di Mac e Windows non consentono app non firmate.

# Signing macOS builds

Prima di firmare le build macOS, devi fare quanto segue:

1. Enroll in the [Apple Developer Program](https://developer.apple.com/programs/) (requires an annual fee)
2. Download and install [Xcode](https://developer.apple.com/xcode)
3. Genera, scarica ed installa [certificati di firma](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Ci sono molti strumenti per firmare la tua app impacchettata:

- [`electron-osx-sign`] is a standalone tool for signing macOS packages.
- [`electron-packager`] bundles `electron-osx-sign`. If you're using `electron-packager`, pass the `--osx-sign=true` flag to sign your build. 
    - [`electron-forge`] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

## Notarizzazione

Iniziando con macOS Catalina, Apple richiede che le applicazioni siano notarizzate. "Notarizzazzione", come definito da Apple significa che tu carichi la tua applicazione precedentemente firmata su Apple per una verifica aggiuntiva *prima* di distribuire l'app ai tuoi utenti.

Per automatizzare questo processo, puoi usare il modulo [`electron-notarize`]. Non devi necessariamente completare questo passaggio per ogni build che fai - solo per le build che intendi spedire agli utenti.

## Negozio App Mac

Vedi la [Guida Mac App Store](mac-app-store-submission-guide.md).

# Signing Windows builds

Prima di firmare le build di Windows, devi fare quanto segue:

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Install Visual Studio 2015/2017 (to get the signing utility)

Puoi ottenere un certificato di firma del codice da molti rivenditori. I prezzi variano, quindi potrebbe valere la pena fare acquisti in giro. I rivenditori popolari includono:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

Ci sono molti strumenti per firmare la tua app impacchettata:

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## Negozio Windows

Vedi la [Guida Windows Store](windows-store-guide.md).