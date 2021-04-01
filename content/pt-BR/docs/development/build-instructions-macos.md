# Instruções para Compilação (macOS)

Siga as instruções abaixo para compilar o Electron no macOS.

## Pré-requisitos

* >macOS = 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (externo)
* Python 2.7 com suporte para TLS 1.2

## Python

Certifique-se também de que seu sistema e versão Python suportam pelo menos o TLS 1.2. Isso depende tanto da sua versão do macOS quanto do Python. Para um teste rápido, execute:

```sh
$ npx @electron/check-python-tls
```

Se o script retornar que sua configuração está usando um protocolo de de segurança desatualizado, você pode atualizar o macOS para High Sierra ou instalar uma nova versão do Python 2.7.x. Para atualizar o Python, use [Homebrew](https://brew.sh/):

```sh
$ brew instalar python@2 && brew link python@2 --force
```

Se você estiver usando python conforme fornecido pelo Homebrew, você também precisa instalar os seguintes módulos Python:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Você pode usar `pip` para instalá-lo:

```sh
$ pip instalar pyobjc
```

## macOS SDK

Se está desenvolvendo com Electron e não planeja redistribuir sua construção personalizada, pode pular essa seção.

As compilações oficiais da Electron são construídas com [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip)e o macOS 11.0 SDK. Compilar com um SDK mais recente também funciona, mas os lançamentos atualmente usam o SDK 11.0.

## Construindo Electron

Veja [Instruções de build: GN](build-instructions-gn.md).
