# Atualizando Aplicativos

Existem várias maneiras de atualizar uma aplicação em Electron. A maneira mais fácil, suportada oficialmente é utilizando o framework embutido [Squirrel](https://github.com/Squirrel) e o módulo de [autoUpdater](../api/auto-updater.md) do Electron.

## Usando `update.electronjs.org`

A equipe do Electron mantém [update.electronjs.org][], um webservice gratuito e de código aberto que os aplicativos Electron podem usar para se auto-atualizar. O serviço é projetado para aplicativos Electron que atendem aos seguintes critérios:

- O app roda no macOS ou no Windows
- O app tem um repositório GitHub público
- As Builds são publicadas no GitHub Releases
- Builds são code-signed

A forma mais fácil de usar este serviço é instalando o [update-electron-app][], um módulo Node.js pre-configurado para ser usado com update.electronjs.org.

Instalando o módulo:

```sh
npm install update-electron-app
```

Invocar o atualizador do arquivo de processo principal do aplicativo:

```js
require('update-electron-app')()
```

Por padrão, este módulo irá verificar atualizações na inicialização do aplicativo, e a cada dez minutos. Quando uma atualização for encontrada, ela será baixada automaticamente em segundo plano. Quando o download é concluído, uma caixa de diálogo é exibida permitindo que o usuário reinicie o aplicativo.

Se precisar personalizar sua configuração, você pode [passar opções para `update-electron-app`][update-electron-app] ou [usar o serviço de atualização diretamente][update.electronjs.org].

## Implementando um Servidor de Atualizações

Se você estiver desenvolvendo um aplicativo particular do Electron, ou se não é publicado versões no GitHub Releases, pode ser necessário executar o seu próprio servidor de atualização .

Dependendo de suas necessidades, você pode escolher um destes:

- [Hazel][hazel] - Um servidor de atualizações para aplicativos de código aberto ou privado, e pode ser implantado gratuitamente no [Now][now]. Ele puxa do [GitHub Releases][gh-releases] e utiliza o poder dos GitHub CDN.
- [Nuts][nuts] - Também usar [GitHub Releases][gh-releases], mas armazena em cache as atualizações do app no disco e suporta repositórios.
- [electron-resease-server][electron-release-server] - Fornece um painel para a manipulação de versões e não requer lançamentos que se originam do GitHub.

.</p></li> 
  
  - [Nucleus][nucleus] - Um servidor de atualização completo para Electron apps mantido pela Atlassian. Suporta múltiplas aplicações e canais; usar um armazenamento de arquivo estático para diminuir o custo do servidor.</ul> 



## Implementando Atualizações em Seu App

Uma vez que implantou em seu servidor de atualização, continue com a importação dos módulos em seu código. O código a seguir pode variar para diferentes servidores software, mas ele funciona como descrito ao usar um [Hazel](https://github.com/zeit/hazel).

**Importante:** Certifique-se de que o código abaixo só será executado no aplicativo empacotado e não em desenvolvimento. Você pode usar [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) para verificar o ambiente.



```javascript
const { app, autoUpdater, dialog } = require('electron')
```


Em seguida, construa a URL do servidor de atualização e diga a [autoUpdater](../api/auto-updater.md) sobre ele:



```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```


Como etapa final, verifique se há atualizações. O exemplo abaixo irá verificar a cada minuto:



```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```


Assim que sua aplicação for [empacotada](../tutorial/application-distribution.md), ele receberá uma atualização para cada novo [GitHub Release](https://help.github.com/articles/creating-releases/) que você publicar.



## Aplicando Atualizações

Agora que você configurou o mecanismo de atualização básico para sua aplicação, você precisa garantir que o usuário será notificado quando houver uma atualização. Este pode ser alcançado usando os eventos API do AutoUpdater [](../api/auto-updater.md#events):



```javascript
Autoatualizador. n('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    botões: ['Reiniciar', 'Mais tarde'],
    título: 'Atualização de Aplicativo',
    mensagem: processo. latform === 'ganha32' ? releaseNotes : releaseName,
    detail: 'Uma nova versão foi baixada. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```


Também tenha certeza de que os erros [estão sendo tratados por](../api/auto-updater.md#event-error). Aqui está um exemplo para registrar no `stderr`:



```javascript
autoUpdater.on('error', message => {
  console.error('Erro ao atualizar o aplicativo')
  console.error(message)
})
```




## Atualizações de Disparo Manualmente

Porque as solicitações feitas pela atualização automática não estão sob seu controle direto, você pode achar situações que são difíceis de lidar (como se o servidor de atualização está atrás da autenticação). A `url` campo suporta arquivos, o que significa que, com algum esforço, você pode se esquivar do aspecto de comunicação do servidor do processo. [Aqui está um exemplo de como isso pode funcionar](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
