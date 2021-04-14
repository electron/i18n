# Modo Escuro

## Visão Geral

### Atualize automaticamente as interfaces nativas

"Interfaces nativas" incluem o catador de arquivos, borda da janela, diálogos, menus de de contexto e muito mais - qualquer coisa em que a interface do usuário venha do seu sistema operacional e não do seu aplicativo. O comportamento padrão é optar por esse de temática automática do SO.

### Atualize automaticamente suas próprias interfaces

Se o seu aplicativo tiver seu próprio modo escuro, você deve alternar e desligar em sincronia com configuração do modo escuro do sistema. Você pode fazer isso usando o [esquema de cores][] consulta de mídia CSS.

### Atualize manualmente suas próprias interfaces

Se você quiser alternar manualmente entre os modos claro/escuro, você pode fazer isso definindo o modo desejado no tema [Fonte](../api/native-theme.md#nativethemethemesource) propriedade do módulo `nativeTheme` . O valor desta propriedade será propagado ao seu processo de Renderer. Quaisquer regras de CSS relacionadas ao `prefers-color-scheme` serão atualizadas em conformidade.

## configurações do macOS

No macOS 10.14 Mojave, a Apple introduziu um novo [system-wide dark mode][system-wide-dark-mode] para todos computadores macOS. Se o aplicativo Electron tiver um modo escuro, você pode fazê-lo seguir a configuração do modo escuro em todo o sistema usando [ `nativeTheme` api](../api/native-theme.md).

No macOS 10.15 Catalina, a Apple introduziu uma nova opção de modo escuro "automático" para todos os computadores macOS. Para que as APIs `nativeTheme.shouldUseDarkColors` e `Tray` funcionem corretamente neste modo no Catalina, você precisa usar o Electron `>=7.0.0`, ou definir `NSRequiresAquaSystemAppearance` para `false` em seu arquivo `Info.plist` para versões mais antigas. Tanto [][electron-packager] Do Pacote Eletrônico quanto [][electron-forge] De Forja eletrônica têm uma opção [`darwinDarkModeSupport`][packager-darwindarkmode-api] para automatizar as mudanças `Info.plist` durante o tempo de construção do aplicativo.

Se você deseja optar por desativar enquanto usa o Electron &gt; 8.0.0, você deve definir a tecla `NSRequiresAquaSystemAppearance` no arquivo `Info.plist` para `true`. Observe que o Electron 8.0.0 ou acima não permitirá que você opte por deste tema, devido ao uso do macOS 10.14 SDK.

## Exemplo

Começaremos com um aplicativo de trabalho do [Quick Start Guide](quick-start.md) e adicionaremos funcionalidade gradualmente.

Primeiro, vamos editar nossa interface para que os usuários possam alternar entre os modos de claro e escuro.  Esta interface do usuário básica contém botões para alterar a configuração `nativeTheme.themeSource` e um elemento de texto indicando qual `themeSource` valor está selecionado. Por padrão, a Electron segue a preferência do modo escuro do sistema, por isso codificaremos a fonte do tema como "Sistema".

Adicione as seguintes linhas ao arquivo `index.html` :

```html
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World! fonte do tema atual</h1>
    <p> <strong id="theme-source">:  System</strong></p>

    <button id="toggle-dark-mode">Alternar o modo escuro</button>
    <button id="reset-to-system">redefinir para o tema do sistema</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

Em seguida, adicione [ouvintes de eventos](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) que ouvem `click` eventos nos botões de alternância. Como o módulo `nativeTheme` só exposto no processo Principal, você precisa configurar o retorno de chamada de cada ouvinte para usar o IPC para enviar mensagens e lidar com respostas do processo principal :

* quando o botão "Alternar Modo Escuro" é clicado, enviamos a mensagem `dark-mode:toggle` (evento) para dizer ao processo Principal para acionar um tema alterar e atualizar o rótulo "Fonte do Tema Atual" na interface do usuário com base na resposta do processo Principal.
* quando o botão "Reset to System Theme" é clicado, enviamos a mensagem `dark-mode:system` (evento) para dizer ao processo Principal para usar o sistema esquema de cores e atualizar o rótulo "Fonte temática atual" para `System`.

Para adicionar ouvintes e manipuladores, adicione as seguintes linhas ao arquivo `renderer.js` :

```javascript
const { ipcRenderer } = require('electron')

documento.getElementById('modo escuro de alternância').addEventListener('clique', async () => {
  const isDarkMode = await ipcRenderer.invoke ('dark-mode:toggle')
  documento.getElementById ('theme-source').innerHTML = isDarkMode ? 'Escuro' : 'Luz'
})

documento.getElementById('reset-to-system').addEventListener('click', async () => {
  aguardam ipcRenderer.invoke ('dark-mode:system')
  documento.getElementById('theme-source').innerHTML = 'System'
})
```

Se você executar seu código neste momento, verá que seus botões não fazem nada ainda, e seu processo Principal irá produzir um erro como este quando você clicar em seus botões: `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` Isso é esperado — nós realmente não tocamos em nenhum código `nativeTheme` ainda.

Agora que terminamos de ligar o IPC do lado do Renderer, o próximo passo é atualizar o arquivo `main.js` para lidar com eventos do processo Renderer.

Dependendo do evento recebido, atualizamos a propriedade [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) para aplicar o tema desejado nos elementos de interface do usuário nativos do sistema (por exemplo, menus de contexto) e propagar o esquema de cores preferido para o processo renderer :

* Ao receber `dark-mode:toggle`, verificamos se o tema escuro está atualmente ativo usando a propriedade `nativeTheme.shouldUseDarkColors` , e definimos a `themeSource` para o tema oposto.
* Ao receber `dark-mode:system`, redefinimos o `themeSource` para `system`.

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate' , () => {
  se (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

O passo final é adicionar um pouco de estilo para ativar o modo escuro para as partes da Web da interface do usuário, aproveitando o atributo CSS [`prefers-color-scheme`][prefer-color-scheme] . O valor da `prefers-color-scheme` seguirá a configuração do seu `nativeTheme.themeSource` .

Crie um arquivo `styles.css` e adicione as seguintes linhas:

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (prefere esquema de cores: escuro) {
  corpo { fundo: #333; cor: branco; }
}

@media (prefere-cor-esquema: luz) {
  corpo { fundo: #ddd; cor: preto; }
}
```

Depois de iniciar o aplicativo Electron, você pode alterar os modos ou redefinir o tema para o padrão do sistema clicando nos botões correspondentes:

![Modo Escuro](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[esquema de cores]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
