# Istruzioni per la compilazione (macOS)

Segui le linee guida sotto per compilare Electron su macOS.

## Prerequisiti

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (esterno)
* Python 2.7 con supporto per TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

Se lo script restituisce che la tua configurazione sta usando un protocollo di sicurezza obsoleto, puoi o aggiornare macOS ad High Sierra o installare una nuova versione di Python 2.7.x. Per aggiornare Python, usa [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Se stai usando Python come fornito da Homebrew, hai anche bisogno di installare i seguenti moduli Python:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Puoi usare `pip` per installarlo:

```sh
$ pip install pyobjc
```

## SDK macOS

Se stai sviluppando Electron e non pianifichi di redistribuire le tue build personalizzate Electron, puoi saltare questa sezione.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the macOS 10.13 SDK.  E' comunque possibile compilare con una SDK più recente, ma le release attualmente usano l'SDK 10.13.

## Compilare Electron

Vedi [Istruzioni di Compilazione: GN](build-instructions-gn.md).
