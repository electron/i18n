# Barra de Tarefas Windows

O Electron possui APIs para a configuração do ícone do aplicativo na barra de tarefas do Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## PumpList

O Windows permite que as aplicações definam um menu de contexto personalizado que aparece quando os usuários clicam com o botão direito do mouse no ícone do aplicativo na barra de tarefas. Esse menu de contexto é chamado `JumpList`. Você especifica ações personalizadas na categoria `Tasks` em JumpList, como citado no MSDN:

> Aplicativos definem tarefas com base em recursos do programa e as principais coisas que um usuário espera fazer com eles. As tarefas devem ser livres de contexto, em que o aplicativo não precisa estar rodando para que funcionem. Elas também devem ser as ações mais comuns estatisticamente que um usuário normal executaria em uma aplicação, como compor uma mensagem de e-mail ou abrir o calendário em um programa de correio, criar um novo documento em um processador de texto, inicia um aplicativo em um determinado modo ou executa um de seus subcomandos. Um aplicativo não deve bagunçar o menu com recursos avançados que usuários padrão não precisarão ou ações únicas como registro. Não use tarefas para itens promocionais, como melhorias ou ofertas especiais.
> 
> É altamente recomendável que a lista de tarefas seja estática. Ele deve permanecer o mesmo independente do estado ou status do aplicativo. Enquanto é possível variar a lista dinamicamente, você deve considerar que isso poderia confundir o usuário que não espera que a porção da lista de destino seja alterada .

__Tarefas do Internet Explorer:__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

Ao contrário do menu do dock no macOS que é um menu real, tarefas de usuário no Windows funcionam como atalhos de aplicativos, como quando usuário clica em uma tarefa, um programa será executado com argumentos específicos.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    programa: processo. xecPath,
    argumentos: '--new-window',
    iconPath: processo. xecPath,
    iconIndex: 0,
    título: 'Nova janela', Descrição de
    : 'Criar uma nova janela'
  }
])
```

Para limpar sua lista de tarefas, chame `app.setUserTasks` com um array vazio:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

As tarefas do usuário ainda serão exibidas mesmo após a sua aplicação ser fechada, então o ícone e o caminho do programa especificados para uma tarefa devem existir até que sua aplicação seja desinstalada.


## Thumbnail Toolbars

No Windows, você pode adicionar uma barra de ferramentas em miniatura com botões especificados na barra de tarefas layout de uma janela de aplicativo. Ele fornece aos usuários uma maneira de acessar um comando de em particular janela sem restaurar ou ativar a janela.

Do MSDN, é ilustrado:

> Esta barra de ferramentas é um controle comum padrão para a barra de ferramentas. Tem um máximo de sete botões. ID de cada botão, imagem, dica e estado são definidos em uma estrutura, que é então passada para a barra de tarefas. O aplicativo pode mostrar, habilitar, desabilitar ou ocultar botões da barra de ferramentas de miniatura, conforme exigido pelo seu estado atual.
> 
> Por exemplo, o Windows Media Player pode oferecer controles de mídia padrão como reproduzir, pausar, silenciar e parar.

__Barra de miniaturas do Windows Media Player:__

![jogador](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Para limpar botões da barra de ferramentas da miniatura, basta chamar `BrowserWindow.setThumbarButtons` com um array vazio:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Sobreposições de ícone na barra de tarefas

No Windows, um botão da barra de tarefas pode usar uma pequena sobreposição para exibir o status do aplicativo, como citado no MSDN:

> Camadas com ícone servem como notificação contextual do status, e se destina a a negar a necessidade de um ícone de status de área de notificação separado para comunicar essa informação ao usuário. Por exemplo, o novo status de e-mail na Microsoft Outlook, atualmente mostrado na área de notificação, agora pode ser indicado através de uma sobreposição no botão barra de tarefas. Novamente, você deve decidir durante seu ciclo de desenvolvimento de qual método é melhor para sua aplicação. Ícones de sobreposição destinam-se a fornecer importantes status de longa duração ou notificações tais como o status de rede, o status de mensageiro ou novos e-mails. O usuário não deve ser apresentado com camadas ou animações constantemente alteradas.

__Sobreposição no botão barra de tarefas:__

![Sobreposição no botão barra de tarefas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('caminho/para/overlay.png', 'Descrição para sobreposição')
```


## Flash Frame

No Windows, você pode destacar o botão da barra de tarefas para chamar a atenção do usuário. Isto é semelhante ao ícone do dock no macOS. Da documentação de referência do MSDN:

> Normalmente, uma janela é flash para informar ao usuário que a janela requer atenção, mas que atualmente não possui o foco do teclado.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Não esqueça de chamar o método `flashFrame` com `false` para desligar o flash. No exemplo acima, ele é chamado quando a janela entra em foco, mas você pode usar um tempo limite ou algum outro evento para desativá-lo.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
