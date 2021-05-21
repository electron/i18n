# Combinaciones de teclas

> Definir atajos del teclado.

Los Atajos son strings que pueden contener múltiples modificadores y un único código clave, en combinación con el carácter `+` se utilizan para definir métodos abreviados de teclado a través de su aplicación.

Ejemplos:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Los atajos son registrados con el módulo [`globalShortcut`](global-shortcut.md) usando el método [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback):

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```

## Nota sobre plataformas

En Linux y Windows, la clave `Command` no tiene ningún efecto, así que se utilizar `CommandOrControl` que representa `Command` para macOS y `Control` para Linux y Windows para definir algunos Atajos.

Usa `Alt` en lugar de `Opción`. La clave `Opción` sólo existe en macOS, mientras que la clave `Alt` está disponible en todas las plataformas.

La clave `Super` (o `Meta`) esta asignada a la tecla `Windows` en Windows y linux, `Cmd` en macOS.

## Modificadores disponibles

* `Command` (o `Cmd` resumido)
* `Control` (o `Ctrl` resumido)
* `CommandOrControl` (o `CmdOrCtrl` resumido)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`
* `Meta`

## Códigos de tecla disponibles

* `0` a `9`
* `A` a `Z`
* `F1` a `F24`
* Puntuación como `~`, `!`, `@`, `#`, `$`, etc.
* `Más`
* `Espacio`
* `Tab`
* `Bloq Mayús`
* `Numlock`
* `Bloqueo de desplazamiento`
* `Retroceso`
* `Suprimir`
* `Insertar`
* `Return` (o `Enter` como alias)
* `Arriba`, `Abajo`, `Izquierda` y `Derecha`
* `Home` y `End`
* `PageUp` y `PageDown`
* `Escape` (o `Esc` resumido)
* `VolumeUp`, `VolumeDown` y `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` y `MediaPlayPause`
* `PrintScreen`
* Teclas del teclado numérico
  * `num0` - `num9`
  * `numdec` - clave decimal
  * `numadd` - teclado numérico tecla `+`
  * `numsub` - teclado numérico tecla `-`
  * `nummult` - teclado numérico tecla `*`
  * `numdiv` - teclado numérico tecla `÷`
