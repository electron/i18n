## Klase: TouchBarPopover

> Gumawa ng isang popover sa touch bar para sa mga aplikasyon ng katutubong macOS

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarPopover(pagpipilian)` *Pangeksperimento*

* `pagpipilian` Bagay 
  * `label` Pisi (opsyonal) - Popover na pindutan ng teksto.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Popover button icon.
  * `mga aytem` [TouchBar](touch-bar.md) (opsyonal) - Mga item na ipapakita sa popover.
  * `showCloseButton` Boolean (opsyonal) - `tunay` magdispley ng isang pindutan para pindutan na pangsara malapit sa kaliwa ng popover, `mali` upang hindi ito ipakita. Default ay `Totoo`.

### Katangian ng pagkakataon

The following properties are available on instances of `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.