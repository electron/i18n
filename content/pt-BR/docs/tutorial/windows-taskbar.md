# Barra de Tarefas Windows

## Visão Geral

O Electron possui APIs para a configuração do ícone do aplicativo na barra de tarefas do Windows. Esta de API suporta tanto recursos somente para Windows como [criação de um `JumpList`](#jumplist), miniaturas personalizadas [e barras de ferramentas](#thumbnail-toolbars), [sobreposições de ícones](#icon-overlays-in-taskbar)e o chamado</a>de efeito "Flash Frame", e recursos multiplataforma como [documentos recentes][recent-documents] e [progresso de aplicativos][progress-bar].</p> 



## PumpList

O Windows permite que os aplicativos definam um menu de contexto personalizado que aparece quando os usuários clique com o botão direito do mouse no ícone do aplicativo na barra de tarefas. Esse menu de contexto é chamado `JumpList`. Você especifica ações personalizadas na categoria `Tasks` de JumpList, conforme citado [][msdn-jumplist]MSDN:



> Aplicativos definem tarefas com base em recursos do programa e as principais coisas que um usuário espera fazer com eles. As tarefas devem ser livres de contexto, em que o aplicativo não precisa estar rodando para que funcionem. Elas também devem ser as ações mais comuns estatisticamente que um usuário normal executaria em uma aplicação, como compor uma mensagem de e-mail ou abrir o calendário em um programa de correio, criar um novo documento em um processador de texto, inicia um aplicativo em um determinado modo ou executa um de seus subcomandos. Um aplicativo não deve bagunçar o menu com recursos avançados que usuários padrão não precisarão ou ações únicas como registro. Não use tarefas para itens promocionais, como melhorias ou ofertas especiais.
> 
> É altamente recomendável que a lista de tarefas seja estática. Ele deve permanecer o mesmo independente do estado ou status do aplicativo. Enquanto é possível variar a lista dinamicamente, você deve considerar que isso poderia confundir o usuário que não espera que a porção da lista de destino seja alterada .

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)



> NOTA: A captura de tela acima é um exemplo de tarefas gerais de Internet Explorer

Ao contrário do menu dock no macOS, que é um menu real, as tarefas do usuário no Windows funcionam como atalhos de aplicativos. Por exemplo, quando um usuário clica em uma tarefa, o programa será executado com argumentos especificados.

Para definir as tarefas do usuário para o seu aplicativo, você pode usar [app.setUserTasks][setusertaskstasks] API.



#### Exemplos



##### Definir tarefas do usuário

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript
const { app } = require ('electron')

app.setUserTasks([
  {
    programa: process.execPath,
    argumentos: '-nova-janela',
    iconPath: process.execPath,
    iconIndex: 0,
    título: 'New Window',
    descrição: 'Criar uma nova janela'
  }
])
```




##### Lista de tarefas claras

Para limpar sua lista de tarefas, você precisa chamar `app.setUserTasks` com uma matriz de vazia no arquivo `main.js` .



```javascript
const { app } = require('electron')

app.setUserTasks([])
```




> NOTA: As tarefas do usuário ainda serão exibidas mesmo após o fechamento do aplicativo , de modo que o ícone e o caminho do programa especificados para uma tarefa devem existir até que seu aplicativo seja desinstalado.



### Thumbnail Toolbars

No Windows, você pode adicionar uma barra de ferramentas em miniatura com botões especificados em uma barra de tarefas layout de uma janela de aplicativo. Ele fornece aos usuários uma maneira de acessar um comando de uma janela específica sem restaurar ou ativar a janela.

Conforme citado por [][msdn-thumbnail]MSDN :



> Esta barra de ferramentas é um controle comum padrão para a barra de ferramentas. Tem um máximo de sete botões. ID de cada botão, imagem, dica e estado são definidos em uma estrutura, que é então passada para a barra de tarefas. O aplicativo pode mostrar, habilitar, desabilitar ou ocultar botões da barra de ferramentas de miniatura, conforme exigido pelo seu estado atual.
> 
> Por exemplo, o Windows Media Player pode oferecer controles de mídia padrão como reproduzir, pausar, silenciar e parar.

![jogador](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)



> NOTA: A captura de tela acima é um exemplo de barra de ferramentas em miniatura do Windows Media Player

Para definir a barra de ferramentas em miniatura no seu aplicativo, você precisa usar [BrowserWindow.setThumbarButtons][setthumbarbuttons]



#### Exemplos



##### Definir barra de ferramentas de miniatura

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript
const { BrowserWindow } = require ('electron')
caminho const = require('path')

const win = novo BrowserWindow()

win.setThumbarButtons([
  {
    dica de ferramenta: 'button1',
    ícone: path.join(__dirname, 'button1.png'),
    clique () { console.log('button1 clicked') }
  }, {
    dica de ferramenta: 'button2',
    ícone: path.join (__dirname, 'button2.png'),
    bandeiras: ['ativado', 'dismissonclick'],
    clique () { console.log('button2 clicado.') }
  }
])
```




##### Barra de ferramentas de miniatura clara

Para limpar os botões da barra de ferramentas em miniatura, você precisa chamar `BrowserWindow.setThumbarButtons` com uma matriz vazia no arquivo `main.js` .



```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```




### Sobreposições de ícone na barra de tarefas

No Windows, um botão de barra de tarefas pode usar uma pequena sobreposição para exibir o status do aplicativo.

Conforme citado por [][msdn-icon-overlay]MSDN :



> Camadas com ícone servem como notificação contextual do status, e se destina a a negar a necessidade de um ícone de status de área de notificação separado para comunicar essa informação ao usuário. Por exemplo, o novo status de e-mail na Microsoft Outlook, atualmente mostrado na área de notificação, agora pode ser indicado através de uma sobreposição no botão barra de tarefas. Novamente, você deve decidir durante seu ciclo de desenvolvimento de qual método é melhor para sua aplicação. Ícones de sobreposição destinam-se a fornecer importantes status de longa duração ou notificações tais como o status de rede, o status de mensageiro ou novos e-mails. O usuário não deve ser apresentado com camadas ou animações constantemente alteradas.

![Sobreposição no botão barra de tarefas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)



> NOTA: A captura de tela acima é um exemplo de sobreposição em um botão de barra de tarefas

Para definir o ícone de sobreposição para uma janela, você precisa usar o [BrowserWindow.setOverlayIcon][setoverlayicon] API.



#### Exemplo

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```




### Flash Frame

No Windows, você pode destacar o botão da barra de tarefas para chamar a atenção do usuário. Isso é semelhante ao salto do ícone de doca no macOS.

Conforme citado por [][msdn-flash-frame]MSDN :



> Normalmente, uma janela é flash para informar ao usuário que a janela requer atenção, mas que atualmente não possui o foco do teclado.

Para piscar o botão browserWindow taskbar, você precisa usar o [BrowserWindow.flashFrame][flashframe] API.



#### Exemplo

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow()

win.once('focus', () => win.flashFrame (falso))
win.flashFrame(true)
```




> NOTA: Não se esqueça de ligar para `win.flashFrame(false)` para desligar o flash. No exemplo acima, é chamado quando a janela entra em foco, mas você pode usar um tempo limite ou algum outro evento para desabilitá-lo.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
