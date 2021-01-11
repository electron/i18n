# Assinando Código

A assinatura do código é uma tecnologia de segurança que você usa para certificar que um aplicativo foi criado por você.

No macOS, o sistema pode detectar qualquer mudança no aplicativo, se a alteração é introduzida acidentalmente ou por código malicioso.

No Windows, o sistema atribui um nível de confiança ao seu certificado de assinatura de código que se você não tiver, ou se o seu nível de confiança for baixo, fará com que as caixas de diálogo de segurança apareçam quando usuários começam a usar sua aplicação.  Nível de confiança ao longo do tempo, então é melhor começar a codificar a assinatura o mais cedo possível.

Embora seja possível distribuir aplicativos não assinados, não é recomendado. Tanto o Windows como o macOS irão impedir por padrão o download ou a execução de aplicativos não assinados. Começando com o macOS Catalina (versão 10.15), usuários têm que passar por vários passos manuais para abrir aplicativos não assinados.

![SMOS Catalina Gatekeeper warning: O app não pode ser aberto porque o desenvolvedor
não pôde ser verificado](../images/gatekeeper.png)

Como você pode ver, os usuários recebem duas opções: Mova o aplicativo diretamente para a lixeira ou cancele a execução. Você não quer que seus usuários vejam essa caixa de diálogo.

Se você estiver construindo um aplicativo do Electron que você pretende empacotar e distribuir, ele deve ser assinado por código.

# Assinando & notarizando compilações macOS

Para preparar apropriadamente aplicativos macOS para a versão requer dois passos: primeiro, a aplicação precisa ser assinada com código. Em seguida, o aplicativo precisa ser enviado para a Apple para um processo chamado "notarização", onde os sistemas automatizados verificarão ainda mais que seu aplicativo não está fazendo nada para colocar em risco seus usuários.

Para iniciar o processo, certifique-se de cumprir os requisitos para assinatura e notando seu aplicativo:

1. Inscreva-se no [Programa de Desenvolvedor Apple](https://developer.apple.com/programs/) (requer uma taxa anual)
2. Baixar e instalar o [Xcode](https://developer.apple.com/xcode) - isto requer um computador executando o macOS
3. Gerar, baixar e instalar [a assinatura de certificados](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

O ecossistema do Electron favorece a configuração e a liberdade, por isso existem várias maneiras de assinar sua aplicação e notarizar.

## `electron-forge`

Se você estiver usando a ferramenta de compilação favorita do Electron, obter sua aplicação assinada e notarizada requer algumas adições à sua configuração. [Forge](https://electronforge.io) é uma coleção das ferramentas oficiais do Electron, usando [`electron-packager`], [`electron-osx-sign`], e [`electron-notarize`] debaixo do pano.

Vamos dar uma olhada em uma configuração de exemplo com todos os campos obrigatórios. Nem todas as são necessárias: as ferramentas serão inteligentes o suficiente para encontrar automaticamente uma identidade `adequada,`, Por exemplo, mas recomendamos que seja explícito.

```json
{
  "name": "meu-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Application ID do Desenvolvedor: Felix Rieseberg (LT94ZKYDCJ)",
          "rodada-runtime": verdadeiro,
          "entitlements": "entitlements. lista",
          "entitlements-inherit": "entitlements. lista",
          "assinatura-sinalizações": "biblioteca"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "minha-senha-id-apple",
        }
      }
    }
  }
}
```

O arquivo `plist` referenciado aqui precisa dos seguintes direitos específicos do macOS para garantir aos mecanismos de segurança da Apple que seu aplicativo está fazendo essas coisas sem causar qualquer dano:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0///EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. jit llow-</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Para ver tudo isso em ação, confira o código-fonte do Electron Fidd, [especialmente seu `electron-forge` arquivo de configuração ](https://github.com/electron/fiddle/blob/master/forge.config.js).

Se você planeja acessar o microfone ou câmera dentro do seu aplicativo usando a API do Electron, você também precisará adicionar os seguintes títulos:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Se não estão presentes nos direitos do seu aplicativo, quando se invoca, por exemplo:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microfone')
```

Seu aplicativo pode falhar. Veja a seção Acesso de Recursos em [Tempo de Execução](https://developer.apple.com/documentation/security/hardened_runtime) para mais informações e direitos que você pode precisar.

## `electron-builder`

Electron Builder vem com uma solução personalizada para assinar seu aplicativo. Você pode encontrar [sua documentação aqui](https://www.electron.build/code-signing).

## `electron-packager`

Se você não estiver usando um build pipeline integrado como Forge ou Builder, provavelmente está usando [`electron-packager`], que inclui [`electron-osx-sign`] e [`electron-notarize`].

Se você estiver usando a API do Packager, você pode passar [na configuração que assina e notarizes sua aplicação ](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

empacotador({
  dir: '/path/to/my/app',
  osxSign: {
    identidade: 'Aplicativo de ID do Desenvolvedor: Felix Rieseberg (LT94ZKYDCJ)',
    'tempo de execução endurecido': verdadeiro,
    direitos: 'titularidades. lista',
    'entitlements-inherit': 'entitlements. lista',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'minha-apple-id-password'
  }
})
```

O arquivo `plist` referenciado aqui precisa dos seguintes direitos específicos do macOS para garantir aos mecanismos de segurança da Apple que seu aplicativo está fazendo essas coisas sem causar qualquer dano:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0///EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. jit llow-</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Veja o [Guia da Loja para Aplicativos Mac](mac-app-store-submission-guide.md).

# Assinando compilações do Windows

Antes de assinar versões do Windows, faça o seguinte:

1. Obtenha um certificado de assinatura de código do Windows Authenticode (requer uma taxa anual)
2. Instale o Visual Studio para obter o utilitário de assinatura (a [ Edição da Comunidade](https://visualstudio.microsoft.com/vs/community/) é suficiente

Você pode obter um certificado de assinatura de um grande número de revendedores. Os preços variam, então pode valer a pena comprar ao redor. Revendedores populares incluem:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Entre outros, por favor, faça a loja para encontrar uma que se adapte às suas necessidades, o Google é o seu amigo 😄

Existem várias ferramentas para assinar seu aplicativo de pacotes:

* [`electron-winstaller`] irá gerar um instalador para janelas e assiná-lo para você
* [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
* [`Construtor de elétrons`] pode assinar alguns de seus alvos de janelas

## Windows Store

Consulte o [Guia da Windows Store](windows-store-guide.md).
