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

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.

### Criando um fork personalizado do Electron

Criar um fork personalizado do Electron, na maioria dos casos, não é algo que você precise fazer para criar seu aplicativo, mesmo em aplicativos a "nível de produção". Usando uma ferramenta como o `electron-packager` ou o `electron-forge`, você será capaz de personalizar a marca do produto final sem ter que realizar esses passos.

Você vai precisar criar um fork do Electron caso você tenha código C++ personalizado que você queira inserir diretamente no Electron e que não pode ser publicado/enviado ou foi rejeitado pela versão oficial. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Criando uma distribuição customizada com surf-build

1. Instale [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Crie um novo repositório de armazenamento na nuvem do tipo S3 bucket e, em seguida, crie a estrutura de diretórios conforme abaixo:
    
    ```sh
    - electron/
      - symbols/
      - dist/
    ```

3. Defina as seguintes Variáveis de Ambiente:

* `ELECTRON_GITHUB_TOKEN` - token com permissão para criar distribuições no GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - definem a chave, o repositório e a chave secreta, respectivamente, para onde os arquivos serão carregados
* `ELECTRON_RELEASE` - Definido como `true` para definir se o valor será atualizado durante o upload. Deixe sem definir para que o `surf-build` faça a checagem CI-type a cada pull request.
* `CI` - definer como `true` ou então ele vai falhar
* `GITHUB_TOKEN` - configure com o mesmo valor do `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - definido como `C:\Temp` no Windows para evitar problemas de caminho muito longo
* `TARGET_ARCH` - escolha `ie32` ou `x64`

1. Em `script/upload.py`, você *deve* definir `ELECTRON_REPO` para o seu fork (`MYORG/electron`), especialmente se você é um contribuinte para o Electro apropriado.

2. `surf-build -r https://github.com/MYORG/electron -s SEU_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Aguarde um tempo muito, muito longo para a compilação completar.