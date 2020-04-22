# Combinaciones de teclas

> Definir atajos del teclado.

Los Atajos son strings que pueden contener múltiples modificadores y un único código clave, en combinación con el carácter `+` se utilizan para definir métodos abreviados de teclado a través de su aplicación.

Ejemplos:

* `CommandOControl+A`
* `CommandOControl+Shift+Z`

Los atajos son registrados con el módulo e [`globalShortcut`](global-shortcut.md) usando el método [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), ejemplo.

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Registrar un grabador de atajo 'CommandOControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Hacer algo cuando se presiona tanto Tecla Command o Control + Y.
  })
})
```

## Nota sobre plataformas

En Linux y Windows, la clave `Command` no tiene ningún efecto, así que se utilizar `CommandOrControl` que representa `Command` para macOS y `Control` para Linux y Windows para definir algunos Aceleradores.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

La clave `Super` esta asignada a la tecla `Windows` en Windows y Linux y `Cmd` para macOS.

## Modificadores disponibles

* `Command` (o `Cmd` resumido)
* `Control` (o `Ctrl` resumido)
* `ComandoOControl` (o `CmdOrCtrl` resumido)
* `Alt`
* `Opción`
* `Alt derecha`
* `Shift`
* `Super`

## Códigos claves disponibles

* `0` a `9`
* `A` a `Z`
* `F1` a `F24`
* Signos de puntuación como `~`, `!`, `@`, `#`, `` $, etcétera.
* `Más`
* `Espacio`
* `Tab`
* `Bloq Mayús`
* `Numlock`
* `Bloqueo de desplazamiento`
* `Retroceso`
* `Delete`
* `Insert`
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
