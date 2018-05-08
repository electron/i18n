# Instruções para Compilação (macOS)

Siga as instruções abaixo para compilar o Electron no macOS.

## Pré-requisitos

- macOS => 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (externo)

Se você esta usando o Python baixado pelo o Homebrew, você precisa instalar o seguinte modulo:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

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

## Obtendo o Código Fonte

```sh
$ git clone https://github.com/electron/electron
```

## Inicialização

O script de inicialização irá baixar todas as dependências necessárias e criar a compilação do projeto. Observe que nós usamos o [ninja](https://ninja-build.org/) para compilar o Electron, mas não existe nenhum projeto Xcode gerado.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## Compilando

Compilar `Release` e `Debug`:

```sh
$ ./script/build.py
```

Você pode também compilar somente o `Debug`:

```sh
$ ./script/build.py -c D
```

Após a finalização da compilação, você pode encontrar `Electron.app` no caminho `out/D`.

## Suporte 32bits

Electron pode somente compilar para 64bit no macOS, não existe nenhum plano para suportar a compilação de 32bits no futuro.

## Excluindo

Para excluir os arquivos de compilação:

```sh
$ npm run clean
```

Para excluir somente os diretórios `out` e `dist`:

```sh
$ npm run clean-build
```

**Nota:** Os dois comandos exigem que seja executado o `bootstrap` novamente antes da compilação.

## Testes

Veja [Visão Geral do Sistema: Testes](build-system-overview.md#tests)