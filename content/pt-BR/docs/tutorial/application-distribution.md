# Distribuição de Aplicativos

## Visão Geral

Para distribuir seu aplicativo com o Electron, você precisa empacotar e remarcá-lo. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in the [Quick Start guide](quick-start.md#package-and-distribute-your-application).

## Distribuição manual

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Depois disso, a pasta contendo seu aplicativo deve ser renomeada para `app` e colocada dentro do diretório de recursos (resources) do Electron como mostrado nos seguintes exemplos.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*No macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*No Windows e Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar][] archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Para usar um arquivo `asar` para substituir a pasta `app`, você precisa renomear o arquivo para `app.asar` e colocá-lo dentro da pasta de recursos do Electron como mostrado abaixo, e o Electron irá então ler o arquivo e executar seu app.

*No macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*No Windows e Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository][asar].

### Rebranding with downloaded binaries

Após deixar seu app Electron pronto para usar, você pode querer personalizar os executáveis do Electron antes de distribuí-los aos usuários.

#### macOS

Você pode renomear o `Electron.app` para qualquer nome que você quiser, porém você também deve renomear os campos `CFBundleDisplayName`, `CFBundleIdentifier` e `CFBundleName` nos seguintes arquivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Você também pode renomear o app auxiliar para evitar de mostrar `Electron Helper` no Monitor de Atividade, mas não esqueça de renomear o arquivo executável do app auxiliar.

Veja como ficaria a estrutura de um aplicativo renomeado:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

Você pode renomear o `electron.exe` para qualquer nome que você quiser, além de editar seu ícone e outras informações com ferramentas como o [rcedit](https://github.com/electron/rcedit).

#### Linux

Você pode renomear o executável `electron` para qualquer nome que você quiser.

### Rebranding by rebuilding Electron from source

Também é possível remarcar o Electron mudando o nome do produto e construindo a partir fonte. Para fazer isso, você precisa definir o argumento de compilação correspondente ao nome do produto (`electron_product_name = "NomeDoDoProduto"`) nos `argumentos. n` arquivo e reconstruir.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
