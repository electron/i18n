# Aceleradores

> Definem atalhos de teclado.

Aceleradores são Strings que podem conter múltiplos modificadores e códigos de teclas combinados pelo '`+`' e que são utilizados para definir atalhos de teclado para sua aplicação.

Exemplos:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Os atalhos são registrados com o módulo [`globalShortcut`](global-shortcut.md) usando o método [`registrar`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ou seja:

```javascript
const {app, globalShortcut} = require('electron') 

app.on('ready', () => {
// Registrar um 'listener' para o atalho 'CommandOrControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
  // Fazer algo quando Y e Command ou Control forem pressionados.
  }) 
})
```

## Aviso de plataforma

No Linux e no Windows, a tecla `Command` não tem nenhum efeito, então, para definir alguns aceleradores é recomendado utilizar `CommandOrControl` que representa `Command` no macOS e `Control` no Linux e no Windows.

Utilize `Alt` ao invés de `Option`. A tecla `Option` só existe no macOS, em compensação, a tecla `Alt` está disponível em todas as plataformas.

A tecla `Super` é mapeada para a tecla `Windows` no Windows e no Linux e para a tecla `Cmd` no macOS.

## Modificadores disponíveis

* `Command` (ou `Cmd`)
* `Control` (ou `Ctrl`)
* `CommandOrControl` (ou `CmdOrCtrl`)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Códigos de tecla disponíveis

* `0` a `9`
* `A` a `Z`
* `F1` a `F24`
* Pontuações como `~`, `!`, `@`, `#`, `$` e etc.
* `Plus (+)`
* `Space (Espaço)`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (ou `Enter`)
* `Up`, `Down`, `Left` e `Right` (Setas do teclado: cima, baixo, esquerda e direita respectivamente)
* `Home` e `End`
* `PageUp` e `PageDown`
* `Escape` (ou `Esc`)
* `VolumeUp`, `VolumeDown` e `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` e `MediaPlayPause`
* `PrintScreen`