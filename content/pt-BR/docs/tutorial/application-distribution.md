# Distribuição de Aplicativos

Para distribuir seu aplicativo com Electron, você precisa baixar os [binários pré-compilados](https://github.com/electron/electron/releases) do Electron. Depois disso, a pasta contendo seu aplicativo deve ser renomeada para `app` e colocada dentro do diretório de recursos (resources) do Electron como mostrado nos seguintes exemplos. Note que a localização dos binários pré-compilados do Electron está indicada com `electron/` nos exemplos abaixo.

No macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

No Windows e Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Então, execute o `Electron.app` (ou `electron` no Linux, `electron.exe` no Windows), e o Electron vai iniciar seu aplicativo. O diretório `electron` será então a distribuição a ser entregue aos usuários finais.

## Distribuindo seu app como apenas um arquivo

Além de poder distribuir seu app copiando todo o seu código fonte, você também pode empacotar seu aplicativo em um arquivo [asar](https://github.com/electron/asar) para impedir que usuários possam ver o código fonte.

Para usar um arquivo `asar` para substituir a pasta `app`, você precisa renomear o arquivo para `app.asar` e colocá-lo dentro da pasta de recursos do Electron como mostrado abaixo, e o Electron irá então ler o arquivo e executar seu app.

No macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

No Windows e Linux:

```text
electron/resources/
└── app.asar
```

Você pode encontrar mais detalhes em [Empacotamento de Aplicativos](application-packaging.md).

## Colocando sua marca nos binários baixados

Após deixar seu app Electron pronto para usar, você pode querer personalizar os executáveis do Electron antes de distribuí-los aos usuários.

### Windows

Você pode renomear o `electron.exe` para qualquer nome que você quiser, além de editar seu ícone e outras informações com ferramentas como o [rcedit](https://github.com/atom/rcedit).

### macOS

Você pode renomear o `Electron.app` para qualquer nome que você quiser, porém você também deve renomear os campos `CFBundleDisplayName`, `CFBundleIdentifier` e `CFBundleName` nos seguintes arquivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Você também pode renomear o app auxiliar para evitar de mostrar `Electron Helper` no Monitor de Atividade, mas não esqueça de renomear o arquivo executável do app auxiliar.

Veja como ficaria a estrutura de um aplicativo renomeado:

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

Você pode renomear o executável `electron` para qualquer nome que você quiser.

## Ferramentas de empacotamento

Além de empacotar seu aplicativo manualmente, você também pode escolher usar ferramentas de terceiros para empacotar o app para você:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Personalizar a marca recompilando o Electron direto da fonte

Também é possível personalizar a marca dos aplicativos alterando o nome do produto e compilando ele direto do código fonte. Para isso, você precisa modificar o arquivo `atom.gyp` executar uma recompilação limpa.

### Criando um fork personalizado do Electron

Criar um fork personalizado do Electron, na maioria dos casos, não é algo que você precise fazer para criar seu aplicativo, mesmo em aplicativos a "nível de produção". Usando uma ferramenta como o `electron-packager` ou o `electron-forge`, você será capaz de personalizar a marca do produto final sem ter que realizar esses passos.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
    ```sh
    - atom-shell/
      - symbols/
      - dist/
    ```

3. Set the following Environment Variables:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64`

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.