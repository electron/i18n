# Distribuição de Aplicativos

## Visão Geral

Para distribuir seu aplicativo com o Electron, você precisa empacotar e remarcá-lo. Para fazer isso, você pode usar ferramentas especializadas ou abordagens manuais.

## Com ferramentas

Você pode usar as seguintes ferramentas para distribuir seu aplicativo:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Essas ferramentas cuidarão de todas as etapas que você precisa tomar para acabar com uma aplicação eletrônica distribuível, como agrupar sua aplicação, rebranding do executável e definir os ícones certos.

Você pode verificar o exemplo de como empacotar seu aplicativo com `electron-forge` em nosso [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Distribuição manual

### Com binários p reconstruídos

Para distribuir seu aplicativo manualmente, você precisa baixar os binários [da Electron](https://github.com/electron/electron/releases). Depois disso, a pasta contendo seu aplicativo deve ser renomeada para `app` e colocada dentro do diretório de recursos (resources) do Electron como mostrado nos seguintes exemplos.

> *NOTA:* a localização dos binários prebuilt da Electron é indicada com `electron/` nos exemplos abaixo.

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

Em seguida, execute `Electron.app` no macOS, `electron` no Linux ou `electron.exe` no Windows, e a Electron começará como seu aplicativo. O diretório `electron` será, então, sua distribuição para entregar aos usuários.

### Com um arquivo de código fonte do aplicativo

Em vez de enviar seu aplicativo copiando todos os seus arquivos de origem, você pode empacotar seu aplicativo em um [][] arquivo para melhorar o desempenho da leitura de arquivos em plataformas como o Windows, se você ainda não estiver usando um bundler como Parcel ou Webpack.

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

Você pode encontrar mais detalhes sobre como usar `asar` no</a>do repositório

`electron/asar` .</p> 



### Rebranding com binários baixados

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



### Rebranding reconstruindo Elétron da fonte

Também é possível remarcar o Electron mudando o nome do produto e construindo a partir fonte. Para fazer isso, você precisa definir o argumento de compilação correspondente ao nome do produto (`electron_product_name = "NomeDoDoProduto"`) nos `argumentos. n` arquivo e reconstruir.

[1]: https://github.com/electron/asar

[2]: https://github.com/electron/asar
