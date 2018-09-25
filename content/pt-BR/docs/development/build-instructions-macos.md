# Instruções para Compilação (macOS)

Siga as instruções abaixo para compilar o Electron no macOS.

## Pré-requisitos

- macOS => 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (externo)
- Python 2.7 com suporte para TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Se está desenvolvendo com Electron e não planeja redistribuir sua construção personalizada, pode pular essa seção.

Para que algumas funcionalidades possam funcionar corretamente, por exemplo pinch-zoom. Você precisa utilizar o SDK 10.10 do macOS.

Oficialmente a compilação do Electron é feita pelo [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), que não contém no SDK 10.0 por padrão. Para obtê-lo, é preciso fazer o download do [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG e executar.

Então, supondo que o Xcode 6.4 MG tenha sido executado no caminho `/Volumes/Xcode` e que o Xcode 8.2.1 esteja instalado no `/Applications/Xcode.app`, execute:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

Você também precisará habilitar o Xcode para compilar junto com 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Definir o `MinimumSDKVersion` para `10.10`
- Salve o arquivo

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).