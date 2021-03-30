# Barra de Tarefas Windows

## Visão Geral

O Electron possui APIs para a configuração do ícone do aplicativo na barra de tarefas do Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## PumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Esse menu de contexto é chamado `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> Aplicativos definem tarefas com base em recursos do programa e as principais coisas que um usuário espera fazer com eles. As tarefas devem ser livres de contexto, em que o aplicativo não precisa estar rodando para que funcionem. Elas também devem ser as ações mais comuns estatisticamente que um usuário normal executaria em uma aplicação, como compor uma mensagem de e-mail ou abrir o calendário em um programa de correio, criar um novo documento em um processador de texto, inicia um aplicativo em um determinado modo ou executa um de seus subcomandos. Um aplicativo não deve bagunçar o menu com recursos avançados que usuários padrão não precisarão ou ações únicas como registro. Não use tarefas para itens promocionais, como melhorias ou ofertas especiais.
> 
> É altamente recomendável que a lista de tarefas seja estática. Ele deve permanecer o mesmo independente do estado ou status do aplicativo. Enquanto é possível variar a lista dinamicamente, você deve considerar que isso poderia confundir o usuário que não espera que a porção da lista de destino seja alterada .

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### Exemplos

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN][msdn-thumbnail]:

> Esta barra de ferramentas é um controle comum padrão para a barra de ferramentas. Tem um máximo de sete botões. ID de cada botão, imagem, dica e estado são definidos em uma estrutura, que é então passada para a barra de tarefas. O aplicativo pode mostrar, habilitar, desabilitar ou ocultar botões da barra de ferramentas de miniatura, conforme exigido pelo seu estado atual.
> 
> Por exemplo, o Windows Media Player pode oferecer controles de mídia padrão como reproduzir, pausar, silenciar e parar.

![jogador](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Exemplos

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Sobreposições de ícone na barra de tarefas

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN][msdn-icon-overlay]:

> Camadas com ícone servem como notificação contextual do status, e se destina a a negar a necessidade de um ícone de status de área de notificação separado para comunicar essa informação ao usuário. Por exemplo, o novo status de e-mail na Microsoft Outlook, atualmente mostrado na área de notificação, agora pode ser indicado através de uma sobreposição no botão barra de tarefas. Novamente, você deve decidir durante seu ciclo de desenvolvimento de qual método é melhor para sua aplicação. Ícones de sobreposição destinam-se a fornecer importantes status de longa duração ou notificações tais como o status de rede, o status de mensageiro ou novos e-mails. O usuário não deve ser apresentado com camadas ou animações constantemente alteradas.

![Sobreposição no botão barra de tarefas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### Exemplo

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN][msdn-flash-frame]:

> Normalmente, uma janela é flash para informar ao usuário que a janela requer atenção, mas que atualmente não possui o foco do teclado.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### Exemplo

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
